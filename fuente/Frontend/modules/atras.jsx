import imagenP6 from '../images/back.svg';
import { Link } from 'react-router-dom';

function Atras() {
    return (
        <div className="atras">
            <Link to="/Menu" className="atras-link">
                <img src={imagenP6} alt="Atrás" className='image' style={{ width: '10px', height: '10px' }} />
            </Link>
            <span className='atras-text'>Volver al Inicio</span>
        </div>
    );
}

export default Atras;