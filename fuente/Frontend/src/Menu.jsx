import Contenedor from "../modules/contenedor"
import Navegar from "../modules/navegar"
import './Menu.css'
function Menu (){
    return(
        <div>
            <Navegar />
            <h1 className="titulo">Menu</h1>
            <p className="subtext">Gestione su finca ganadera de manera eficiente</p>
            <div className="bloque">
                <Contenedor width="3rem" height="5rem">
                
                </Contenedor>
            </div>
        </div>
    )
}
export default Menu