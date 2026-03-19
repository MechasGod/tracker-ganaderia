import './styles/Entrada.css'

function Entrada({ label,texto, type = "text" }) {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input
                className="input"
                type={type}
                placeholder={texto}
            />
        </div>
    )
}
export default Entrada