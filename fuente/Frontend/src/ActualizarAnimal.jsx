import { useState } from 'react'
import Atras from "../modules/atras"
import Contenedor from "../modules/contenedor"
import Navegar from "../modules/navegar"
import TituloPestana from "../modules/tituloPestana"
import imagenP2 from '../images/reload.svg'
import BotonPestana from "../modules/botonPestana"
import Entrada from "../modules/Entrada"
import Selector from "../modules/seleccion"
import Aviso from '../modules/aviso.jsx'
import './ActualizarAnimal.css'
 
function ActualizarAnimal(){
    const [toast, setToast] = useState(null);
    const [campos, setCampos] = useState({
        animal: '', fechaInicio: '', medicamento: '',
        dosis: '', frecuencia: '', duracion: '',
        viaAdmin: '', veterinario: '', estadoTratamiento: '', observaciones: ''
    });
    const [errores, setErrores] = useState({
        fechaInicio: false, medicamento: false,
        dosis: false, frecuencia: false, duracion: false, viaAdmin: false
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
            fechaInicio:  !campos.fechaInicio,
            medicamento:  !campos.medicamento,
            dosis:        !campos.dosis,
            frecuencia:   !campos.frecuencia,
            duracion:     !campos.duracion,
            viaAdmin:     !campos.viaAdmin,
        };
        setErrores(nuevosErrores);
 
        if (Object.values(nuevosErrores).some(Boolean)) {
            setToast({
                tipo: 'error',
                titulo: 'Error al actualizar',
                mensaje: 'No se han ingresado los datos obligatorios.'
            });
            return;
        }
        setToast({
            tipo: 'success',
            titulo: 'Animal actualizado exitosamente',
            mensaje: `El tratamiento de ${campos.animal} ha sido guardado en el sistema.`
        });
    };
 
    return(
        <div className="actualizaranimal">
            <Navegar/>
            <Atras/>
            <Contenedor width="auto" height="auto">
                <TituloPestana
                    imagen={imagenP2}
                    textoGrande="Actualizar Animal"
                    textoPequeno="Seleccione un animal y actualice su información de tratamiento"
                    color="rgba(0, 153, 255, 0.25)"
                />
 
                <div className="formulario-grid">
 
                    {/* Fila 1 */}
                    <div className="formulario-full">
                        <Selector
                            label="Animal en Tratamiento"
                            opciones={["Lolita", "lola", "LoL"]}
                            value={campos.animal}
                            onChange={handleChange('animal')}
                        />
                    </div>
 
                    {/* Formulario visible solo cuando se escoge un animal */}
                    {campos.animal && (<>
 
                        {/* Fila 2 */}
                        <Entrada
                            label="Fecha de Inicio *"
                            texto="mes / año"
                            type="month"
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
                            texto="Ej: 10ml"
                            value={campos.dosis}
                            onChange={handleChange('dosis')}
                            error={errores.dosis}
                        />
                        <Selector
                            label="Frecuencia *"
                            opciones={["Diaria", "Semanal", "Mensual"]}
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
                            opciones={["Oral", "Subcutáneo"]}
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
                            label="Estado del Tratamiento"
                            opciones={["En Proceso", "Finalizado", "Detenido"]}
                            value={campos.estadoTratamiento}
                            onChange={handleChange('estadoTratamiento')}
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
 
                        <div className="formulario-full">
                            <BotonPestana
                                opcion="Guardar Cambios"
                                imagen={imagenP2}
                                color="white"
                                backgroundColor="rgba(0, 153, 255, 0.95)"
                                onClick={handleGuardar}
                            />
                        </div>
 
                    </>)}
 
                </div>
 
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
 
export default ActualizarAnimal