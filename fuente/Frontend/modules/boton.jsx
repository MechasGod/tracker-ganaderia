import './styles/Boton.css'

function Boton({ children, onClick, color = "black", backgroundColor = "white", hoverColor = "rgb(206, 205, 205)"}) {
    return (
        <button
            className="btn"
            onClick={onClick}
            style={{ color, 
                backgroundColor,
                '--hover-color': hoverColor 
            }}
        >
            {children}
        </button>
    )
}

export default Boton