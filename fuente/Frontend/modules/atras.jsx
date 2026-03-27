import imagenP6 from '../images/back.svg';
import './styles/atras.css'
import { Link } from 'react-router-dom';

function Atras() {
    return (
            <Link to="/Menu" className="atras-link">
                <img src={imagenP6} alt="Atrás" className='image'/>
                <span className='atras-text'>Volver al Inicio</span>
            </Link>
    );
}

export default Atras;