import './styles/Entrada.css'
 
function Selector({ label, opciones = [], value, onChange, error }) {
    return (
        <div className="input-group">
            <label style={{ color: error ? '#dc2626' : '' }}>{label}</label>
            <select
                className="input selector"
                value={value}
                onChange={onChange}
                style={{
                    backgroundColor: error ? '#fee2e2' : '',
                    borderColor: error ? '#dc2626' : ''
                }}
            >
                <option value=""> Seleccione </option>
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