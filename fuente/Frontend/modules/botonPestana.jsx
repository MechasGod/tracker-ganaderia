import Boton from "./boton";
import './styles/botonPestana.css';

function BotonPestana({ opcion, imagen, color, backgroundColor, onClick }) {
    return (
        <div className="botonPestana">
            <Boton color={color} backgroundColor={backgroundColor} onClick={onClick}>
                <img className="imagen" src={imagen} alt={opcion} />
                {opcion}
            </Boton>
            <Boton>
                Cancelar
            </Boton>
        </div>
    )
}

export default BotonPestana