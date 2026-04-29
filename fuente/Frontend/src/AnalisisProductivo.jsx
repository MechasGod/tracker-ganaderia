import { useState } from 'react'
import Atras from '../modules/atras'
import Boton from '../modules/boton'
import Contenedor from '../modules/contenedor'
import Navegar from '../modules/navegar'
import TituloPestana from '../modules/tituloPestana'
import Entrada from '../modules/Entrada'
import Aviso from '../modules/aviso.jsx'
import iconoProductivo from '../images/productivo.svg'
import './AnalisisProductivo.css'
import { get } from './api.js'
import { isFutureDate } from './formValidation.js'

function AnalisisProductivo() {
    const [toast, setToast] = useState(null)
    const [cargando, setCargando] = useState(false)
    const [filtros, setFiltros] = useState({ fechaInicio: '', fechaFin: '' })
    const [errores, setErrores] = useState({ fechaInicio: false, fechaFin: false })
    const [resultados, setResultados] = useState([])
    const [mensajeVacio, setMensajeVacio] = useState('')

    const handleChange = (campo) => (e) => {
        const valor = e.target.value
        setFiltros((prev) => ({ ...prev, [campo]: valor }))
        if (campo in errores) {
            setErrores((prev) => ({ ...prev, [campo]: false }))
        }
    }

    const handleConsultar = async () => {
        const rangoIncompleto = (filtros.fechaInicio && !filtros.fechaFin) || (!filtros.fechaInicio && filtros.fechaFin)
        const fechaInicioFutura = isFutureDate(filtros.fechaInicio)
        const fechaFinFutura = isFutureDate(filtros.fechaFin)
        const rangoInvertido = filtros.fechaInicio && filtros.fechaFin && filtros.fechaInicio > filtros.fechaFin

        const nuevosErrores = {
            fechaInicio: rangoIncompleto || fechaInicioFutura || rangoInvertido,
            fechaFin: rangoIncompleto || fechaFinFutura || rangoInvertido,
        }
        setErrores(nuevosErrores)

        if (Object.values(nuevosErrores).some(Boolean)) {
            let mensaje = 'Debe ingresar un rango de fechas completo y válido.'
            if (fechaInicioFutura || fechaFinFutura) {
                mensaje = 'Las fechas del análisis no pueden ser futuras.'
            } else if (rangoInvertido) {
                mensaje = 'La fecha inicial no puede ser mayor a la fecha final.'
            }

            setToast({ tipo: 'error', titulo: 'Error en el análisis', mensaje })
            return
        }

        setCargando(true)
        setMensajeVacio('')
        try {
            const response = await get('/produccion/mas-productivos', {
                fechaInicio: filtros.fechaInicio,
                fechaFin: filtros.fechaFin,
                limit: 10,
            })
            const data = response.data || []
            setResultados(data)
            setMensajeVacio(data.length === 0 ? response.message || 'No hay información disponible.' : '')
        } catch (error) {
            setResultados([])
            setMensajeVacio('')
            setToast({ tipo: 'error', titulo: 'Error en el análisis', mensaje: error.message })
        } finally {
            setCargando(false)
        }
    }

    return (
        <div className="analisisproductivo">
            <Navegar activo="productivo" />
            <Atras />
            <Contenedor width="auto" height="auto">
                <TituloPestana
                    imagen={iconoProductivo}
                    textoGrande="Identificación de Animales Más Productivos"
                    textoPequeno="Consulte el listado ordenado por producción de leche"
                    color="rgba(239, 68, 68, 0.18)"
                />

                <div className="analisis-grid">
                    <Entrada
                        label="Fecha Inicial"
                        type="date"
                        value={filtros.fechaInicio}
                        onChange={handleChange('fechaInicio')}
                        error={errores.fechaInicio}
                    />
                    <Entrada
                        label="Fecha Final"
                        type="date"
                        value={filtros.fechaFin}
                        onChange={handleChange('fechaFin')}
                        error={errores.fechaFin}
                    />
                </div>

                <div className="acciones-analisis">
                    <Boton
                        onClick={handleConsultar}
                        color="white"
                        backgroundColor="rgb(220, 38, 38)"
                        disabled={cargando}
                    >
                        {cargando ? 'Consultando...' : 'Consultar Animales Productivos'}
                    </Boton>
                </div>

                {mensajeVacio ? (
                    <div className="estado-productivo vacio">{mensajeVacio}</div>
                ) : null}

                {resultados.length > 0 ? (
                    <div className="tabla-productivo">
                        <div className="tabla-header">Animal</div>
                        <div className="tabla-header">Identificación</div>
                        <div className="tabla-header">Total Producido</div>
                        <div className="tabla-header">Promedio Diario</div>
                        <div className="tabla-header">Registros</div>
                        <div className="tabla-header">Último Registro</div>

                        {resultados.map((animal) => (
                            <div className="tabla-row-fragment" key={animal.animalId}>
                                <div className="tabla-cell tabla-destacada" key={`${animal.animalId}-nombre`}>
                                    {animal.nombre || 'Sin nombre'}
                                </div>
                                <div className="tabla-cell" key={`${animal.animalId}-identificacion`}>
                                    {animal.identificacion}
                                </div>
                                <div className="tabla-cell" key={`${animal.animalId}-total`}>
                                    {animal.totalLitros} L
                                </div>
                                <div className="tabla-cell" key={`${animal.animalId}-promedio`}>
                                    {animal.promedioLitros} L/día
                                </div>
                                <div className="tabla-cell" key={`${animal.animalId}-registros`}>
                                    {animal.cantidadRegistros}
                                </div>
                                <div className="tabla-cell" key={`${animal.animalId}-fecha`}>
                                    {new Date(animal.ultimaFechaRegistro).toLocaleDateString('es-CO')}
                                </div>
                            </div>
                        ))}
                    </div>
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

export default AnalisisProductivo