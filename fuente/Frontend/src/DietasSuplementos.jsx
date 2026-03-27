import Navegar from "../modules/navegar"
import imagenP5 from '../images/apple.svg'
import Atras from "../modules/atras"
import Contenedor from "../modules/contenedor"
import TituloPestana from "../modules/tituloPestana"
import BotonPestana from "../modules/botonPestana"
import Entrada from "../modules/Entrada"
import Selector from "../modules/seleccion"
import './DietasSuplementos.css'
 
function DietasSuplementos(){
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
                        />
                    </div>
 
                    {/* Fila 2 */}
                    <Entrada
                        label="Fecha de Registro *"
                        texto="dd/mm/aaaa"
                        type="date"
                    />
                    <Selector
                        label="Tipo de Dieta *"
                        opciones={["Pastoreo", "Semi-estabulado", "Estabulado", "Dieta Especial"]}
                    />
 
                    {/* Fila 3 */}
                    <Entrada
                        label="Alimento Base *"
                        texto="Ej: Pasto estrella, concentrado"
                    />
                    <Entrada
                        label="Cantidad (kg/día) *"
                        texto="Ej: 25"
                        type="number"
                    />
 
                    {/* Fila 4 */}
                    <Selector
                        label="Frecuencia de Alimentación *"
                        opciones={["1 vez al día", "2 veces al día", "3 veces al día", "Continuo"]}
                    />
                    <Selector
                        label="Objetivo de la Dieta *"
                        opciones={["Mantenimiento", "Engorde", "Producción de leche", "Gestación", "Recuperación"]}
                    />
 
                    {/* Fila 5 */}
                    <div className="formulario-full">
                        <Entrada
                            label="Suplementos y Minerales"
                            texto="Liste los suplementos, vitamínicos, minerales, sales, etc..."
                        />
                    </div>
 
                    {/* Fila 6 */}
                    <div className="formulario-full">
                        <Entrada
                            label="Observaciones"
                            texto="Preferencias alimentarias, alergias, respuesta a la dieta..."
                        />
                    </div>
 
                </div>
 
                <BotonPestana
                    opcion="Registrar Dieta"
                    imagen={imagenP5}
                    color="white"
                    backgroundColor="rgba(255, 115, 0, 0.95)"
                />
            </Contenedor>
        </div>
    )
}
 
export default DietasSuplementos