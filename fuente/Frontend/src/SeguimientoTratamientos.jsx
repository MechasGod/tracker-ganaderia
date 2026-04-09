import { useState } from 'react'
import Atras from "../modules/atras"
import Contenedor from "../modules/contenedor"
import Navegar from "../modules/navegar"
import TituloPestana from "../modules/tituloPestana"
import imagenP4 from '../images/pill.svg'
import BotonPestana from "../modules/botonPestana"
import Entrada from "../modules/Entrada"
import Selector from "../modules/seleccion"
import Aviso from '../modules/aviso.jsx'
import './SeguimientoTratamientos.css'
 
function SeguimientoTratamientos(){
    const [toast, setToast] = useState(null);
    const [campos, setCampos] = useState({
        animal: '', fechaInicio: '', medicamento: '',
        dosis: '', frecuencia: '', duracion: '',
        viaAdmin: '', veterinario: '', estadoTratamiento: '', observaciones: ''
    });
    const [errores, setErrores] = useState({
        animal: false, fechaInicio: false, medicamento: false,
        dosis: false, frecuencia: false, duracion: false,
        viaAdmin: false, estadoTratamiento: false
    });
 
    const handleChange = (campo) => (e) => {
        const valor = e.target.value;
        setCampos(prev => ({ ...prev, [campo]: valor }));
        if (campo in errores) {
            setErrores(prev => ({ ...prev, [campo]: !valor }));
        }
    };
 
    const handleGuardar = () => {
        const nuevosErrores = {
            animal:            !campos.animal,
            fechaInicio:       !campos.fechaInicio,
            medicamento:       !campos.medicamento,
            dosis:             !campos.dosis,
            frecuencia:        !campos.frecuencia,
            duracion:          !campos.duracion,
            viaAdmin:          !campos.viaAdmin,
            estadoTratamiento: !campos.estadoTratamiento,
        };
        setErrores(nuevosErrores);
 
        if (Object.values(nuevosErrores).some(Boolean)) {
            setToast({
                tipo: 'error',
                titulo: 'Error al guardar',
                mensaje: 'No se han ingresado los datos obligatorios.'
            });
            return;
        }
        setToast({
            tipo: 'success',
            titulo: 'Tratamiento guardado exitosamente',
            mensaje: 'El tratamiento ha sido registrado en el sistema.'
        });
    };
 
    return(
        <div className="seguimientotratamientos">
            <Navegar/>
            <Atras/>
            <Contenedor width="auto" height="auto">
                <TituloPestana
                    imagen={imagenP4}
                    textoGrande="Seguimiento de Tratamientos"
                    textoPequeno="Registre y actualice los tratamientos aplicados a los animales"
                    color="rgba(43, 255, 0, 0.25)"
                />
 
                <div className="formulario-grid">
 
                    {/* Fila 1 */}
                    <div className="formulario-full">
                        <Selector
                            label="Animal en Tratamiento *"
                            opciones={["Lolita", "Lola", "LoL"]}
                            value={campos.animal}
                            onChange={handleChange('animal')}
                            error={errores.animal}
                        />
                    </div>
 
                    {/* Fila 2 */}
                    <Entrada
                        label="Fecha de Inicio *"
                        texto="dd/mm/aaaa"
                        type="date"
                        value={campos.fechaInicio}
                        onChange={handleChange('fechaInicio')}
                        error={errores.fechaInicio}
                    />
                    <Entrada
                        label="Medicamento *"
                        texto="Ej: Penicilina G"
                        value={campos.medicamento}
                        onChange={handleChange('medicamento')}
                        error={errores.medicamento}
                    />
 
                    {/* Fila 3 */}
                    <Entrada
                        label="Dosis *"
                        texto="Ej: 10 ml"
                        value={campos.dosis}
                        onChange={handleChange('dosis')}
                        error={errores.dosis}
                    />
                    <Selector
                        label="Frecuencia *"
                        opciones={["Cada 6 horas", "Cada 8 horas", "Cada 12 horas", "Cada 24 horas", "Cada 48 horas"]}
                        value={campos.frecuencia}
                        onChange={handleChange('frecuencia')}
                        error={errores.frecuencia}
                    />
 
                    {/* Fila 4 */}
                    <Entrada
                        label="Duración (días) *"
                        texto="Ej: 7"
                        type="number"
                        value={campos.duracion}
                        onChange={handleChange('duracion')}
                        error={errores.duracion}
                    />
                    <Selector
                        label="Vía de Administración *"
                        opciones={["Intramuscular", "Intravenosa", "Subcutánea", "Oral", "Tópica"]}
                        value={campos.viaAdmin}
                        onChange={handleChange('viaAdmin')}
                        error={errores.viaAdmin}
                    />
 
                    {/* Fila 5 */}
                    <Entrada
                        label="Veterinario Responsable"
                        texto="Nombre del veterinario"
                        value={campos.veterinario}
                        onChange={handleChange('veterinario')}
                    />
                    <Selector
                        label="Estado del Tratamiento *"
                        opciones={["En Curso", "Completado", "Suspendido", "Actualizar Existente"]}
                        value={campos.estadoTratamiento}
                        onChange={handleChange('estadoTratamiento')}
                        error={errores.estadoTratamiento}
                    />
 
                    {/* Fila 6 */}
                    <div className="formulario-full">
                        <Entrada
                            label="Observaciones y Evolución"
                            texto="Efectividad del tratamiento, efectos secundarios, mejoras observadas..."
                            value={campos.observaciones}
                            onChange={handleChange('observaciones')}
                        />
                    </div>
 
                </div>
 
                <BotonPestana
                    opcion="Guardar Tratamiento"
                    imagen={imagenP4}
                    color="white"
                    backgroundColor="rgb(37, 156, 47)"
                    onClick={handleGuardar}
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
 
export default SeguimientoTratamientos