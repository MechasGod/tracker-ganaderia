import './styles/Entrada.css'
 
function Selector({ label, opciones = [] }) {
    return (
        <div className="input-group">
            <label>{label}</label>
            <select className="input">
                <option value="">-- Seleccione --</option>
                {opciones.map((op, i) => (
                    <option key={i} value={op.value ?? op}>
                        {op.label ?? op}
                    </option>
                ))}
            </select>
        </div>
    )
}
 
export default Selector