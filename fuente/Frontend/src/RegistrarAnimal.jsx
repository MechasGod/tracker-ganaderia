import Atras from "../modules/atras"
import Contenedor from "../modules/contenedor"
import Navegar from "../modules/navegar"
import imagenG1 from "../images/plus.svg"
import './RegistrarAnimal.css'
import TituloPestana from "../modules/tituloPestana"
import BotonPestana from "../modules/botonPestana"
import Entrada from "../modules/Entrada"
import Selector from "../modules/seleccion"
 
function RegistrarAnimal(){
    return(
        <div className="registraranimal">
            <Navegar activo="clipboard"/>
            <Atras/>
            <Contenedor width="auto" height="auto">
                <TituloPestana
                    imagen={imagenG1}
                    textoGrande="Registrar Nuevo Animal"
                    textoPequeno="Ingrese los datos del animal para agregarlo al inventario"
                    color="rgba(0, 255, 255, 0.4)"
                />
 
                <div className="formulario-grid">
 
                    {/* Fila 1 */}
                    <Entrada
                        label="Identificación *"
                        texto="Ej: 001-2024"
                    />
                    <Entrada
                        label="Nombre"
                        texto="Ej: Luna"
                    />
 
                    {/* Fila 2 */}
                    <Selector
                        label="Raza *"
                        opciones={["Angus", "Holstein", "Simmental", "Brahman", "Hereford"]}
                    />
                    <Selector
                        label="Sexo *"
                        opciones={["Macho", "Hembra"]}
                    />
 
                    {/* Fila 3 */}
                    <Entrada
                        label="Fecha de nacimiento *"
                        texto="dd/mm/aaaa"
                        type="date"
                    />
                    <Entrada
                        label="Peso (kg) *"
                        texto="Ej: 450"
                        type="number"
                    />
 
                    {/* Fila 4 */}
                    <Entrada
                        label="Color"
                        texto="Ej: Negro con manchas blancas"
                    />
                    <Entrada
                        label="Procedencia"
                        texto="Ej: Finca El Roble"
                    />
 
                    {/* Fila 5*/}
                    <div className="formulario-full">
                        <Entrada
                            label="Observaciones"
                            texto="Información adicional sobre el animal"
                        />
                    </div>
 
                </div>
 
                <BotonPestana
                    opcion="Registrar"
                    imagen={imagenG1}
                    color="white"
                    backgroundColor="rgb(15, 74, 235)"
                />
 
            </Contenedor>
        </div>
    )
}
 
export default RegistrarAnimal