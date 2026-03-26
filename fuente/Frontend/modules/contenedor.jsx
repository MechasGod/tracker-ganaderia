import "./styles/Contenedor.css"

function Contenedor({children, width, height}){

    return (
        <div
        className="contenedor"
        style={
            {
                width,
                height
            }
        }
        >
            {children}
        </div>
    )
}
export default Contenedor