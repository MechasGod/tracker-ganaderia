import { useNavigate } from 'react-router-dom'
import Boton from "./boton";
import './styles/botonPestana.css';

function BotonPestana({ opcion, imagen, color, backgroundColor, onClick }) {
    const Navigate = useNavigate()
    return (
        <div className="botonPestana">
            <Boton color={color} backgroundColor={backgroundColor} onClick={onClick}>
                <img className="imagen" src={imagen} alt={opcion} />
                {opcion}
            </Boton>
            <Boton onClick={()=>Navigate('/Menu')}>
                Cancelar
            </Boton>
        </div>
    )
}

export default BotonPestana