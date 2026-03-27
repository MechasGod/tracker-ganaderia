import Atras from "../modules/atras"
import Contenedor from "../modules/contenedor"
import Navegar from "../modules/navegar"
import TituloPestana from "../modules/tituloPestana"
import imagenP2 from '../images/reload.svg'
import './ActualizarAnimal.css'
import Selector from "../modules/seleccion"

function ActualizarAnimal(){
    return(
        <div className="actualizaranimal">
            <Navegar/>
            <Atras/>
            <Contenedor width="auto" height="auto">
                <TituloPestana
                    imagen={imagenP2}
                    textoGrande="Registrar Ganado Enfermo"
                    textoPequeno="Registre los animales que presenten alguna enfermedad"
                    color="rgba(0, 153, 255, 0.25)"
                />
                <Selector
                    label="Seleccionar Animal *"
                    opciones={["Lolita", "lola", "LoL"]}
                />
            </Contenedor>
        </div>
        
    )
}
export default ActualizarAnimal