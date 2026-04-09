import { useEffect, useState } from 'react'
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
import TituloPestana from "../modules/tituloPestana.jsx"
import { get } from './api.js'
function Menu (){
    const Navigate = useNavigate()
    const [estadisticas, setEstadisticas] = useState({
        totalAnimales: 0,
        enTratamiento: 0,
        actualizadosMes: 0,
        tasaSalud: 0,
    });

    useEffect(() => {
        const cargarEstadisticas = async () => {
            try {
                const response = await get('/dashboard/estadisticas');
                if (response?.data) {
                    setEstadisticas(response.data);
                }
            } catch (error) {
                // Si falla, se conservan los valores por defecto para no bloquear la vista.
            }
        };

        cargarEstadisticas();
    }, []);

    return(
        <div className="menu-body">
            <Navegar activo="home"/>
            <h1 className="titulo">Panel de control</h1>
            <p className="subtext">Gestione su finca ganadera de manera eficiente</p>
            <div className="menu-container" id="opciones">
                <Contenedor width="auto" height="auto">
                        <TituloPestana
                            imagen={imagenG1}
                            textoGrande="Gestión de inventario animal"
                            textoPequeno="Registre y actualice informacion de su ganado"
                            color="rgba(0, 255, 255, 0.247)"
                        />
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
                        <TituloPestana
                            imagen={imagenG2}
                            textoGrande="Control Sanitario"
                            textoPequeno="Monitoree la salud y tratamientos del ganado"
                            color="rgba(11, 180, 87, 0.28)"
                        />
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
                    <p className="text">{estadisticas.totalAnimales}</p>
                    <p className="subtext">Total Animales</p>
                </Contenedor>
                <Contenedor width="auto" height="auto">
                    <p className="text">{estadisticas.enTratamiento}</p>
                    <p className="subtext">En Tratamiento</p>
                </Contenedor>
                <Contenedor width="auto" height="auto">
                    <p className="text">{estadisticas.actualizadosMes}</p>
                    <p className="subtext">Actualizados (mes)</p>
                </Contenedor>
                <Contenedor width="auto" height="auto">
                    <p className="text">{estadisticas.tasaSalud}%</p>
                    <p className="subtext">Tasa de Salud</p>
                </Contenedor>
            </div>
        </div>
    )
}
export default Menu