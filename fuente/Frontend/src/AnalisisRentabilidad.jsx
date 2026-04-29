import { useState } from 'react'
import Atras from '../modules/atras'
import Boton from '../modules/boton'
import Contenedor from '../modules/contenedor'
import Navegar from '../modules/navegar'
import TituloPestana from '../modules/tituloPestana'
import Entrada from '../modules/Entrada'
import Aviso from '../modules/aviso.jsx'
import iconoProductivo from '../images/productivo.svg'
import './AnalisisRentabilidad.css'
import { post } from './api.js'
import { VALIDATION_RANGES, isFutureDate, isNumberInRange } from './formValidation.js'

const currencyFormatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 2,
})

function AnalisisRentabilidad() {
    const [toast, setToast] = useState(null)
    const [cargando, setCargando] = useState(false)
    const [campos, setCampos] = useState({
        fechaInicio: '',
        fechaFin: '',
        precioPorLitro: '',
        costoTotal: '',
    })
    const [errores, setErrores] = useState({
        fechaInicio: false,
        fechaFin: false,
        precioPorLitro: false,
        costoTotal: false,
    })
    const [resultado, setResultado] = useState(null)

    const handleChange = (campo) => (e) => {
        const valor = e.target.value
        setCampos((prev) => ({ ...prev, [campo]: valor }))
        if (campo in errores) {
            setErrores((prev) => ({ ...prev, [campo]: false }))
        }
    }

    const handleAnalizar = async () => {
        const fechaInicioFutura = isFutureDate(campos.fechaInicio)
        const fechaFinFutura = isFutureDate(campos.fechaFin)
        const rangoInvertido = campos.fechaInicio && campos.fechaFin && campos.fechaInicio > campos.fechaFin
        const precioValido = isNumberInRange(campos.precioPorLitro, {
            min: VALIDATION_RANGES.PRECIO_LECHE_POR_LITRO.min,
            max: VALIDATION_RANGES.PRECIO_LECHE_POR_LITRO.max,
        })
        const costoValido = isNumberInRange(campos.costoTotal, {
            min: VALIDATION_RANGES.COSTO_TOTAL_PERIODO.min,
            max: VALIDATION_RANGES.COSTO_TOTAL_PERIODO.max,
        })

        const nuevosErrores = {
            fechaInicio: !campos.fechaInicio || fechaInicioFutura || rangoInvertido,
            fechaFin: !campos.fechaFin || fechaFinFutura || rangoInvertido,
            precioPorLitro: !campos.precioPorLitro || !precioValido,
            costoTotal: !campos.costoTotal || !costoValido,
        }
        setErrores(nuevosErrores)

        if (Object.values(nuevosErrores).some(Boolean)) {
            let mensaje = 'Debe completar correctamente todos los datos para calcular la rentabilidad.'
            if (fechaInicioFutura || fechaFinFutura) {
                mensaje = 'Las fechas del análisis no pueden ser futuras.'
            } else if (rangoInvertido) {
                mensaje = 'La fecha inicial no puede ser mayor a la fecha final.'
            } else if (!precioValido) {
                mensaje = `El precio por litro debe estar entre ${VALIDATION_RANGES.PRECIO_LECHE_POR_LITRO.min} y ${VALIDATION_RANGES.PRECIO_LECHE_POR_LITRO.max} COP.`
            } else if (!costoValido) {
                mensaje = `El costo total debe estar entre ${VALIDATION_RANGES.COSTO_TOTAL_PERIODO.min} y ${VALIDATION_RANGES.COSTO_TOTAL_PERIODO.max} COP.`
            }

            setToast({ tipo: 'error', titulo: 'Error en el análisis', mensaje })
            return
        }

        setCargando(true)
        try {
            const response = await post('/produccion/rentabilidad', {
                ...campos,
                precioPorLitro: Number(campos.precioPorLitro),
                costoTotal: Number(campos.costoTotal),
            })
            setResultado(response.data)
        } catch (error) {
            setResultado(null)
            setToast({ tipo: 'error', titulo: 'Error en el análisis', mensaje: error.message })
        } finally {
            setCargando(false)
        }
    }

    return (
        <div className="analisisrentabilidad">
            <Navegar activo="productivo" />
            <Atras />
            <Contenedor width="auto" height="auto">
                <TituloPestana
                    imagen={iconoProductivo}
                    textoGrande="Análisis de Rentabilidad"
                    textoPequeno="Calcule el desempeño económico de la producción de leche"
                    color="rgba(239, 68, 68, 0.18)"
                />

                <div className="rentabilidad-grid">
                    <Entrada
                        label="Fecha Inicial *"
                        type="date"
                        value={campos.fechaInicio}
                        onChange={handleChange('fechaInicio')}
                        error={errores.fechaInicio}
                    />
                    <Entrada
                        label="Fecha Final *"
                        type="date"
                        value={campos.fechaFin}
                        onChange={handleChange('fechaFin')}
                        error={errores.fechaFin}
                    />
                    <Entrada
                        label="Precio por Litro (COP) *"
                        type="number"
                        texto="Ej: 1800"
                        value={campos.precioPorLitro}
                        onChange={handleChange('precioPorLitro')}
                        error={errores.precioPorLitro}
                        min={VALIDATION_RANGES.PRECIO_LECHE_POR_LITRO.min}
                        max={VALIDATION_RANGES.PRECIO_LECHE_POR_LITRO.max}
                        step="0.01"
                    />
                    <Entrada
                        label="Costo Total del Periodo (COP) *"
                        type="number"
                        texto="Ej: 2500000"
                        value={campos.costoTotal}
                        onChange={handleChange('costoTotal')}
                        error={errores.costoTotal}
                        min={VALIDATION_RANGES.COSTO_TOTAL_PERIODO.min}
                        max={VALIDATION_RANGES.COSTO_TOTAL_PERIODO.max}
                        step="0.01"
                    />
                </div>

                <div className="acciones-analisis">
                    <Boton
                        onClick={handleAnalizar}
                        color="white"
                        backgroundColor="rgb(220, 38, 38)"
                        disabled={cargando}
                    >
                        {cargando ? 'Calculando...' : 'Calcular Rentabilidad'}
                    </Boton>
                </div>

                {resultado ? (
                    <>
                        <div className="resumen-periodo">
                            Periodo analizado: {new Date(resultado.periodo.fechaInicio).toLocaleDateString('es-CO')} - {new Date(resultado.periodo.fechaFin).toLocaleDateString('es-CO')}
                        </div>

                        <div className="indicadores-grid">
                            <div className="indicador-card">
                                <p className="indicador-label">Producción total</p>
                                <p className="indicador-valor">{resultado.totalLitros} L</p>
                            </div>
                            <div className="indicador-card">
                                <p className="indicador-label">Ingreso bruto</p>
                                <p className="indicador-valor">{currencyFormatter.format(resultado.ingresoBruto)}</p>
                            </div>
                            <div className="indicador-card">
                                <p className="indicador-label">Costo total</p>
                                <p className="indicador-valor">{currencyFormatter.format(resultado.costoTotal)}</p>
                            </div>
                            <div className="indicador-card">
                                <p className="indicador-label">Utilidad neta</p>
                                <p className="indicador-valor">{currencyFormatter.format(resultado.utilidadNeta)}</p>
                            </div>
                            <div className="indicador-card">
                                <p className="indicador-label">Margen de rentabilidad</p>
                                <p className="indicador-valor">{resultado.margenRentabilidad} %</p>
                            </div>
                            <div className="indicador-card">
                                <p className="indicador-label">Costo por litro</p>
                                <p className="indicador-valor">{currencyFormatter.format(resultado.costoPorLitro)} / L</p>
                            </div>
                        </div>

                        <div className="detalle-rentabilidad">
                            <div className="detalle-item">
                                <span className="detalle-label">Animales en producción</span>
                                <span className="detalle-valor">{resultado.animalesEnProduccion} animales</span>
                            </div>
                            <div className="detalle-item">
                                <span className="detalle-label">Registros evaluados</span>
                                <span className="detalle-valor">{resultado.cantidadRegistros} registros</span>
                            </div>
                            <div className="detalle-item">
                                <span className="detalle-label">Precio aplicado</span>
                                <span className="detalle-valor">{currencyFormatter.format(resultado.precioPorLitro)} / L</span>
                            </div>
                            <div className="detalle-item">
                                <span className="detalle-label">Ingreso promedio por animal</span>
                                <span className="detalle-valor">{currencyFormatter.format(resultado.ingresoPromedioPorAnimal)}</span>
                            </div>
                        </div>
                    </>
                ) : null}

                {toast && (
                    <div className="toast-wrapper">
                        <Aviso
                            tipo={toast.tipo}
                            titulo={toast.titulo}
                            mensaje={toast.mensaje}
                            onClose={() => setToast(null)}
                        />
                    </div>
                )}
            </Contenedor>
        </div>
    )
}

export default AnalisisRentabilidad