import { useState } from 'react'
import Contenedor from "../modules/contenedor"
import Navegar from "../modules/navegar"
import Atras from "../modules/atras"
import imagenP3 from '../images/warning.svg'
import TituloPestana from "../modules/tituloPestana"
import BotonPestana from "../modules/botonPestana"
import Entrada from "../modules/Entrada"
import Selector from "../modules/seleccion"
import Aviso from '../modules/aviso.jsx'
import './RegistrarEnfermo.css'
 
function RegistrarEnfermo(){
    const [toast, setToast] = useState(null);
    const [campos, setCampos] = useState({
        animalAfectado: '', fechaDeteccion: '', enfermedad: '',
        temperatura: '', estadoGeneral: '', sintomas: '', observaciones: ''
    });
    const [errores, setErrores] = useState({
        fechaDeteccion: false, enfermedad: false,
        temperatura: false, sintomas: false
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
            fechaDeteccion: !campos.fechaDeteccion,
            enfermedad:     !campos.enfermedad,
            temperatura:    !campos.temperatura,
            sintomas:       !campos.sintomas,
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
            titulo: 'Registro exitoso',
            mensaje: 'El animal enfermo ha sido registrado en el sistema.'
        });
    };
 
    return(
        <div className="registrarenfermo">
            <Navegar activo="pulseLine"/>
            <Atras/>
            <Contenedor width="auto" height="auto">
                <TituloPestana
                    imagen={imagenP3}
                    textoGrande="Registrar Ganado Enfermo"
                    textoPequeno="Registre los animales que presenten alguna enfermedad"
                    color="rgba(255, 51, 0, 0.25)"
                />
 
                <div className="formulario-grid">
 
                    {/* Fila 1 */}
                    <div className="formulario-full">
                        <Selector
                            label="Animal Afectado"
                            opciones={["Lolita", "Lola", "LoL"]}
                            value={campos.animalAfectado}
                            onChange={handleChange('animalAfectado')}
                        />
                    </div>
 
                    {/* Fila 2 */}
                    <Entrada
                        label="Fecha de Detección *"
                        texto="dd/mm/aaaa"
                        type="date"
                        value={campos.fechaDeteccion}
                        onChange={handleChange('fechaDeteccion')}
                        error={errores.fechaDeteccion}
                    />
                    <Selector
                        label="Enfermedad / Diagnóstico *"
                        opciones={["Mastitis", "Fiebre Aftosa", "Brucelosis"]}
                        value={campos.enfermedad}
                        onChange={handleChange('enfermedad')}
                        error={errores.enfermedad}
                    />
 
                    {/* Fila 3 */}
                    <Entrada
                        label="Temperatura *"
                        texto="Ej: 39.5"
                        type="number"
                        value={campos.temperatura}
                        onChange={handleChange('temperatura')}
                        error={errores.temperatura}
                    />
                    <Selector
                        label="Estado General"
                        opciones={["Crítico", "Grave", "Moderado", "Leve"]}
                        value={campos.estadoGeneral}
                        onChange={handleChange('estadoGeneral')}
                    />
 
                    {/* Fila 4 */}
                    <div className="formulario-full">
                        <Entrada
                            label="Síntomas Observados *"
                            texto="Describa los síntomas que presenta el animal..."
                            value={campos.sintomas}
                            onChange={handleChange('sintomas')}
                            error={errores.sintomas}
                        />
                    </div>
 
                    {/* Fila 5 */}
                    <div className="formulario-full">
                        <Entrada
                            label="Observaciones Adicionales"
                            texto="Información adicional relevante"
                            value={campos.observaciones}
                            onChange={handleChange('observaciones')}
                        />
                    </div>
 
                </div>
 
                <BotonPestana
                    opcion="Registrar"
                    imagen={imagenP3}
                    color="white"
                    backgroundColor="rgb(200, 50, 20)"
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
 
export default RegistrarEnfermo