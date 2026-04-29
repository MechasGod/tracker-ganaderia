import { Link } from "react-router-dom";
import './styles/navegar.css'
import Logo from './Logo.jsx'
import salirSVG from '../images/salir.svg'
import home from '../images/home.svg'
import clipboard from '../images/clipboard_Black.svg'
import pulseLine from '../images/pulseLine_black.svg'
import productivo from '../images/productivo.svg'

function Navegar({activo}){
    return(
        <div className="navbar">
      <div className="left">
        <Link to="/menu" className="logo-container">
          <span className="logo-icon">
            <Logo size="3rem" alt="Logo" />
          </span>
          <span className="title">EASYCOW</span>
        </Link>
        <Link to="/menu" className={`eleccion ${activo === "home" ? "activo" : ""}`}>
          <span className="icon">
            <img src={home} alt="home" />
          </span>
          <span className="text">Inicio</span>
        </Link>
        <Link to="/RegistroAnimal" className={`eleccion ${activo === "clipboard" ? "activo" : ""}`}>
          <span className="icon">
            <img src={clipboard} alt="clipboard" />
          </span>
          <span className="text">Inventario</span>
        </Link>
        <Link to="/RegistrarEnfermo" className={`eleccion ${activo === "pulseLine" ? "activo" : ""}`}>
          <span className="icon">
            <img src={pulseLine} alt="pulseLine" />
          </span>
          <span className="text">Control Sanitario</span>
        </Link>
        <Link to="/RegistroProduccion" className={`eleccion ${activo === "productivo" ? "activo-productivo" : ""}`}>
          <span className="icon">
            <img src={productivo} alt="productivo" />
          </span>
          <span className="text">Control Productivo</span>
        </Link>
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