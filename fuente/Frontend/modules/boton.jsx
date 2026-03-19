import './styles/Boton.css'
function Boton ({children, onClick}){
return(
    <button className="btn" 
    onClick={onClick}
    >
        {children}
    </button>
)
}
export default Boton