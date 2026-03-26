import { Link } from "react-router-dom";
import './styles/navegar.css'
import Logo from './Logo.jsx'
import salirSVG from '../images/salir.svg'
import Contenedor from './contenedor.jsx'
import home from '../images/home.svg'
import clipboard from '../images/clipboard_Black.svg'
import pulseLine from '../images/pulseLine_black.svg'

function Navegar(){
    return(
        <div className="navbar">
      <div className="left">
        <Link to="/menu" className="logo-container">
          <span className="logo-icon">
            <Logo size="3rem" alt="Logo" />
          </span>
          <span className="title">EASYCOW</span>
        </Link>
        <div className="eleccion">
          <img src={home} alt="home" />
          <p className="text">Home</p>
        </div>
        <div className="eleccion">
          <img src={clipboard} alt="clipboard" />
          <p className="text">Inventario</p>
        </div>
        <div className="eleccion">
          <img src={pulseLine} alt="pulseLine" />
          <p className="text">Control Sanitario</p>
        </div>
      </div>

      <div className="right">
        <Link to="/" className="salir-link">
          <img src={salirSVG} alt="Salir" className="salir-icono" />
          <span>Salir</span>
        </Link>
      </div>
    </div>
    )
}

export default Navegar;