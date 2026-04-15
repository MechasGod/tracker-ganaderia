import './styles/Entrada.css'
 
function Entrada({ label, texto, type = "text", value, onChange, error, ...rest }) {
    return (
        <div className="input-group">
            <label style={{ color: error ? '#dc2626' : '' }}>{label}</label>
            <input
                className="input"
                type={type}
                placeholder={texto}
                value={value}
                onChange={onChange}
                style={{
                    backgroundColor: error ? '#fee2e2' : '',
                    borderColor: error ? '#dc2626' : ''
                }}
                {...rest}
            />
        </div>
    )
}
export default Entrada