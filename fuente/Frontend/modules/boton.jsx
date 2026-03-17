import './styles/Boton.css'
function Boton ({children, color, hoverColor}){
return(
    <button className="btn" style={
        {
            backgroundColor: color,
            '--hover-color':hoverColor
        }
    }>
        {children}
    </button>
)
}
export default Boton