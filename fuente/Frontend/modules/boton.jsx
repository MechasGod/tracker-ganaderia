import './styles/Boton.css'

function Boton({ children, onClick, color = "black", backgroundColor = "white", hoverColor = "rgb(206, 205, 205)", disabled = false }) {
    return (
        <button
            className="btn"
            onClick={onClick}
            disabled={disabled}
            style={{ color, 
                backgroundColor,
                borderColor: backgroundColor !== 'white' ? backgroundColor : '#e5e7eb',
                '--hover-color': hoverColor 
            }}
        >
            {children}
        </button>
    )
}

export default Boton