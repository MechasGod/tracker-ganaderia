import { Link } from "react-router-dom"
import Contenedor from "../modules/contenedor.jsx"
import Navegar from "../modules/navegar.jsx"
import Boton from '../modules/boton.jsx'
import imagenG1 from '../images/clipboard.svg'
import imagenG2 from '../images/pulseLine.svg'
import imagenP1 from '../images/plus.svg'
import imagenP2 from '../images/reload.svg'
import imagenP3 from '../images/warning.svg'
import imagenP4 from '../images/pill.svg'
import imagenP5 from '../images/apple.svg'
import './Menu.css'
import { useNavigate } from 'react-router-dom'
function Menu (){
    const Navigate = useNavigate()
    return(
        <div className="menu-body">
            <Navegar activo="home"/>
            <h1 className="titulo">Panel de control</h1>
            <p className="subtext">Gestione su finca ganadera de manera eficiente</p>
            <div className="menu-container" id="opciones">
                <Contenedor width="auto" height="auto">
                        <div className="opciontitle">
                            <div className="imagenGrande" id="GestionInventario">
                                <img src={imagenG1} alt="portapapeles"/>
                            </div>
                            <div>
                                <p className="text">Gestión de inventario animal</p>
                                <p className="subtext">Registre y actualice informacion de su ganado</p>
                            </div>
                        </div>
                        
                    <Boton onClick={()=>Navigate('/RegistroAnimal')}>
                        <div className="imagenPeque">
                            <img src={imagenP1} alt="plus"/>
                        </div>
                        Regristrar Nuevo Animal
                    </Boton>
                    <Boton onClick={()=>Navigate('/ActualizarAnimal')}>
                        <div className="imagenPeque">
                            <img src={imagenP2} alt="reload"/>
                        </div>
                        Actualizar Animal
                    </Boton>
                </Contenedor>
                <Contenedor width="auto" height="auto">
                    <div className="opciontitle">
                            <div className="imagenGrande" id="GestionEnfermo">
                                <img src={imagenG2} alt="portapapeles"/>
                            </div>
                            <div>
                                <p className="text">Gestión de inventario animal</p>
                                <p className="subtext">Registre y actualice informacion de su ganado</p>
                            </div>
                        </div>
                        
                    <Boton onClick={()=>Navigate('/RegistrarEnfermo')}>
                        <div className="imagenPeque">
                            <img src={imagenP3} alt="warning"/>
                        </div>
                        Registrar Ganado Enfermo
                    </Boton>
                    <Boton onClick={()=>Navigate('/SeguimientoTratamientos')}>
                        <div className="imagenPeque">
                            <img src={imagenP4} alt="pill"/>
                        </div>
                        Seguimiento de Tratamientos
                    </Boton>
                    <Boton onClick={()=>Navigate('/DietasSuplementos')}>
                        <div className="imagenPeque">
                            <img src={imagenP5} alt="apple"/>
                        </div>
                        Dietas y Suplementos
                    </Boton>
                </Contenedor>
            </div>
            <div className="menu-container" id="estadisticas">
                <Contenedor width="auto" height="auto">
                    <p className="text">0</p>
                    <p className="subtext">Total Animales</p>
                </Contenedor>
                <Contenedor width="auto" height="auto">
                    <p className="text">0</p>
                    <p className="subtext">En Tratamiento</p>
                </Contenedor>
                <Contenedor width="auto" height="auto">
                    <p className="text">0</p>
                    <p className="subtext">Actualizados (mes)</p>
                </Contenedor>
                <Contenedor width="auto" height="auto">
                    <p className="text">0</p>
                    <p className="subtext">Tasa de Salud</p>
                </Contenedor>
            </div>
        </div>
    )
}
export default Menu