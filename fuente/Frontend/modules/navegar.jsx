import { Link } from "react-router-dom";
import './styles/navegar.css'
import Logo from './Logo.jsx'
import salirSVG from '../images/salir.svg'

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