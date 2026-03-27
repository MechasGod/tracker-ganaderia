import './styles/tituloPestana.css'
function TituloPestana({imagen, textoGrande,textoPequeno,color}){
    return(
        <div className="pestanatitulo">
            <div className="imagenGrande"
                style={{
                            backgroundColor:color
                        }
                    }
                >
                <img src={imagen} alt="imagen"/>
            </div>
            <div>
                <p className="text">{textoGrande}</p>
                <p className="subtext">{textoPequeno}</p>
            </div>
        </div>
    )
}
export default TituloPestana