import './styles/Boton.css'
function Boton ({children}){
return(
    <button className="btn" >
        {children}
    </button>
)
}
export default Boton