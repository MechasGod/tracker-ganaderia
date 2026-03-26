import Contenedor from "../modules/contenedor"
import Navegar from "../modules/navegar"
import Atras from "../modules/atras"

function RegistrarEnfermo(){
    return(
        <div>
            <Navegar activo="pulseLine"/>
            <Atras/>
            <Contenedor width="auto" height="auto">

            </Contenedor>
        </div>
        
    )
}
export default RegistrarEnfermo