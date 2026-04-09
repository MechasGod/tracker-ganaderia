import { useState } from 'react'
import Navegar from "../modules/navegar"
import imagenP5 from '../images/apple.svg'
import Atras from "../modules/atras"
import Contenedor from "../modules/contenedor"
import TituloPestana from "../modules/tituloPestana"
import BotonPestana from "../modules/botonPestana"
import Entrada from "../modules/Entrada"
import Selector from "../modules/seleccion"
import Aviso from '../modules/aviso.jsx'
import './DietasSuplementos.css'
 
function DietasSuplementos(){
    const [toast, setToast] = useState(null);
    const [campos, setCampos] = useState({
        animal: '', fechaRegistro: '', tipoDieta: '',
        alimentoBase: '', cantidad: '', frecuencia: '',
        objetivo: '', suplementos: '', observaciones: ''
    });
    const [errores, setErrores] = useState({
        animal: false, fechaRegistro: false, tipoDieta: false,
        alimentoBase: false, cantidad: false, frecuencia: false, objetivo: false
    });
 
    const handleChange = (campo) => (e) => {
        const valor = e.target.value;
        setCampos(prev => ({ ...prev, [campo]: valor }));
        if (campo in errores) {
            setErrores(prev => ({ ...prev, [campo]: !valor }));
        }
    };
 
    const handleRegistrar = () => {
        const nuevosErrores = {
            animal:       !campos.animal,
            fechaRegistro:!campos.fechaRegistro,
            tipoDieta:    !campos.tipoDieta,
            alimentoBase: !campos.alimentoBase,
            cantidad:     !campos.cantidad,
            frecuencia:   !campos.frecuencia,
            objetivo:     !campos.objetivo,
        };
        setErrores(nuevosErrores);
 
        if (Object.values(nuevosErrores).some(Boolean)) {
            setToast({
                tipo: 'error',
                titulo: 'Error al registrar',
                mensaje: 'No se han ingresado los datos obligatorios.'
            });
            return;
        }
        setToast({
            tipo: 'success',
            titulo: 'Dieta registrada exitosamente',
            mensaje: 'La dieta ha sido registrada en el sistema.'
        });
    };
 
    return(
        <div className="dietassuplementos">
            <Navegar/>
            <Atras/>
            <Contenedor width="auto" height="auto">
                <TituloPestana
                    imagen={imagenP5}
                    textoGrande="Registro de Dietas y Suplementos"
                    textoPequeno="Registre la alimentacion y suplementos del ganado"
                    color="rgba(255, 115, 0, 0.25)"
                />
 
                <div className="formulario-grid">
 
                    {/* Fila 1 */}
                    <div className="formulario-full">
                        <Selector
                            label="Animal *"
                            opciones={["Lolita", "Lola", "LoL"]}
                            value={campos.animal}
                            onChange={handleChange('animal')}
                            error={errores.animal}
                        />
                    </div>
 
                    {/* Fila 2 */}
                    <Entrada
                        label="Fecha de Registro *"
                        texto="dd/mm/aaaa"
                        type="date"
                        value={campos.fechaRegistro}
                        onChange={handleChange('fechaRegistro')}
                        error={errores.fechaRegistro}
                    />
                    <Selector
                        label="Tipo de Dieta *"
                        opciones={["Pastoreo", "Semi-estabulado", "Estabulado", "Dieta Especial"]}
                        value={campos.tipoDieta}
                        onChange={handleChange('tipoDieta')}
                        error={errores.tipoDieta}
                    />
 
                    {/* Fila 3 */}
                    <Entrada
                        label="Alimento Base *"
                        texto="Ej: Pasto estrella, concentrado"
                        value={campos.alimentoBase}
                        onChange={handleChange('alimentoBase')}
                        error={errores.alimentoBase}
                    />
                    <Entrada
                        label="Cantidad (kg/día) *"
                        texto="Ej: 25"
                        type="number"
                        value={campos.cantidad}
                        onChange={handleChange('cantidad')}
                        error={errores.cantidad}
                    />
 
                    {/* Fila 4 */}
                    <Selector
                        label="Frecuencia de Alimentación *"
                        opciones={["1 vez al día", "2 veces al día", "3 veces al día", "Continuo"]}
                        value={campos.frecuencia}
                        onChange={handleChange('frecuencia')}
                        error={errores.frecuencia}
                    />
                    <Selector
                        label="Objetivo de la Dieta *"
                        opciones={["Mantenimiento", "Engorde", "Producción de leche", "Gestación", "Recuperación"]}
                        value={campos.objetivo}
                        onChange={handleChange('objetivo')}
                        error={errores.objetivo}
                    />
 
                    {/* Fila 5 */}
                    <div className="formulario-full">
                        <Entrada
                            label="Suplementos y Minerales"
                            texto="Liste los suplementos, vitamínicos, minerales, sales, etc..."
                            value={campos.suplementos}
                            onChange={handleChange('suplementos')}
                        />
                    </div>
 
                    {/* Fila 6 */}
                    <div className="formulario-full">
                        <Entrada
                            label="Observaciones"
                            texto="Preferencias alimentarias, alergias, respuesta a la dieta..."
                            value={campos.observaciones}
                            onChange={handleChange('observaciones')}
                        />
                    </div>
 
                </div>
 
                <BotonPestana
                    opcion="Registrar Dieta"
                    imagen={imagenP5}
                    color="white"
                    backgroundColor="rgba(255, 115, 0, 0.95)"
                    onClick={handleRegistrar}
                />
 
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
 
export default DietasSuplementos