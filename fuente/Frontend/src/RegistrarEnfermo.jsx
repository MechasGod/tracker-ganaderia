import Contenedor from "../modules/contenedor"
import Navegar from "../modules/navegar"
import Atras from "../modules/atras"
import imagenP3 from '../images/warning.svg'
import TituloPestana from "../modules/tituloPestana"
import BotonPestana from "../modules/botonPestana"
import Entrada from "../modules/Entrada"
import Selector from "../modules/seleccion"
import './RegistrarEnfermo.css'
 
function RegistrarEnfermo(){
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
                        />
                    </div>
 
                    {/* Fila 2 */}
                    <Entrada
                        label="Fecha de Detección *"
                        texto="dd/mm/aaaa"
                        type="date"
                    />
                    <Selector
                        label="Enfermedad / Diagnóstico *"
                        opciones={["Mastitis", "Fiebre Aftosa", "Brucelosis"]}
                    />
 
                    {/* Fila 3 */}
                    <Entrada
                        label="Temperatura *"
                        texto="Ej: 39.5"
                        type="number"
                    />
                    <Selector
                        label="Estado General"
                        opciones={["Crítico", "Grave", "Moderado", "Leve"]}
                    />
 
                    {/* Fila 4 */}
                    <div className="formulario-full">
                        <Entrada
                            label="Síntomas Observados *"
                            texto="Describa los síntomas que presenta el animal..."
                        />
                    </div>
 
                    {/* Fila 5 */}
                    <div className="formulario-full">
                        <Entrada
                            label="Observaciones Adicionales"
                            texto="Información adicional relevante"
                        />
                    </div>
 
                </div>
 
                <BotonPestana
                    opcion="Registrar"
                    imagen={imagenP3}
                    color="white"
                    backgroundColor="rgb(200, 50, 20)"
                />
 
            </Contenedor>
        </div>
    )
}
 
export default RegistrarEnfermo