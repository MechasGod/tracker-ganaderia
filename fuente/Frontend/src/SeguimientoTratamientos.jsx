import Atras from "../modules/atras"
import Contenedor from "../modules/contenedor"
import Navegar from "../modules/navegar"
import TituloPestana from "../modules/tituloPestana"
import imagenP4 from '../images/pill.svg'
import BotonPestana from "../modules/botonPestana"
import Entrada from "../modules/Entrada"
import Selector from "../modules/seleccion"
import './SeguimientoTratamientos.css'
 
function SeguimientoTratamientos(){
    return(
        <div className="seguimientotratamientos">
            <Navegar/>
            <Atras/>
            <Contenedor width="auto" height="auto">
                <TituloPestana
                    imagen={imagenP4}
                    textoGrande="Seguimiento de Tratamientos"
                    textoPequeno="Registre y actualice los tratamientos aplicados a los animales"
                    color="rgba(43, 255, 0, 0.25)"
                />
 
                <div className="formulario-grid">
 
                    {/* Fila 1 */}
                    <div className="formulario-full">
                        <Selector
                            label="Animal en Tratamiento *"
                            opciones={["Lolita", "Lola", "LoL"]}
                        />
                    </div>
 
                    {/* Fila 2 */}
                    <Entrada
                        label="Fecha de Inicio *"
                        texto="dd/mm/aaaa"
                        type="date"
                    />
                    <Entrada
                        label="Medicamento *"
                        texto="Ej: Penicilina G"
                    />
 
                    {/* Fila 3 */}
                    <Entrada
                        label="Dosis *"
                        texto="Ej: 10 ml"
                    />
                    <Selector
                        label="Frecuencia *"
                        opciones={["Cada 6 horas", "Cada 8 horas", "Cada 12 horas", "Cada 24 horas", "Cada 48 horas"]}
                    />
 
                    {/* Fila 4 */}
                    <Entrada
                        label="Duración (días) *"
                        texto="Ej: 7"
                        type="number"
                    />
                    <Selector
                        label="Vía de Administración *"
                        opciones={["Intramuscular", "Intravenosa", "Subcutánea", "Oral", "Tópica"]}
                    />
 
                    {/* Fila 5 */}
                    <Entrada
                        label="Veterinario Responsable"
                        texto="Nombre del veterinario"
                    />
                    <Selector
                        label="Estado del Tratamiento *"
                        opciones={["En Curso", "Completado", "Suspendido", "Actualizar Existente"]}
                    />
 
                    {/* Fila 6 */}
                    <div className="formulario-full">
                        <Entrada
                            label="Observaciones y Evolución"
                            texto="Efectividad del tratamiento, efectos secundarios, mejoras observadas..."
                        />
                    </div>
 
                </div>
 
                <BotonPestana
                    opcion="Guardar Tratamiento"
                    imagen={imagenP4}
                    color="white"
                    backgroundColor="rgb(37, 156, 47)"
                />
            </Contenedor>
        </div>
    )
}
 
export default SeguimientoTratamientos