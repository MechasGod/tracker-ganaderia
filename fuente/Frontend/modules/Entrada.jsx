import './styles/Entrada.css'

function Entrada({texto, type="text"}){
    return(
        <input
            className="input"
            type={type}
            placeholder={texto}
        />
    )
}
export default Entrada