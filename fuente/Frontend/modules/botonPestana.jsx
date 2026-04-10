import { useNavigate } from 'react-router-dom'
import Boton from "./boton";
import './styles/botonPestana.css';

function BotonPestana({ opcion, imagen, color, backgroundColor, onClick, disabled = false }) {
    const Navigate = useNavigate()
    return (
        <div className="botonPestana">
            <Boton color={color} backgroundColor={backgroundColor} onClick={onClick} disabled={disabled}>
                <img className="imagen" src={imagen} alt={opcion} />
                {opcion}
            </Boton>
            <Boton onClick={()=>Navigate('/Menu')} disabled={disabled}>
                Cancelar
            </Boton>
        </div>
    )
}

export default BotonPestana