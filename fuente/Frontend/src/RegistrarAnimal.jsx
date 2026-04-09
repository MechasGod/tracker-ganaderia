import { useState } from 'react'
import Atras from "../modules/atras"
import Contenedor from "../modules/contenedor"
import Navegar from "../modules/navegar"
import imagenG1 from "../images/plus.svg"
import './RegistrarAnimal.css'
import TituloPestana from "../modules/tituloPestana"
import BotonPestana from "../modules/botonPestana"
import Entrada from "../modules/Entrada"
import Selector from "../modules/seleccion"
import Aviso from '../modules/aviso.jsx'
 
function RegistrarAnimal(){
    const [toast, setToast] = useState(null);
    const [campos, setCampos] = useState({
        identificacion: '', nombre: '', raza: '',
        sexo: '', fechaNacimiento: '', peso: '',
        color: '', procedencia: '', observaciones: ''
    });
    // Guarda qué campos obligatorios tienen error
    const [errores, setErrores] = useState({
        identificacion: false, raza: false,
        sexo: false, fechaNacimiento: false, peso: false
    });
 
    const handleChange = (campo) => (e) => {
        const valor = e.target.value;
        setCampos(prev => ({ ...prev, [campo]: valor }));
        // Si el usuario empieza a escribir, quita el error de ese campo
        if (campo in errores) {
            setErrores(prev => ({ ...prev, [campo]: !valor }));
        }
    };
 
    const handleRegistrar = () => {
        // Detectar cuáles campos obligatorios están vacíos
        const nuevosErrores = {
            identificacion: !campos.identificacion,
            raza:           !campos.raza,
            sexo:           !campos.sexo,
            fechaNacimiento:!campos.fechaNacimiento,
            peso:           !campos.peso,
        };
        setErrores(nuevosErrores);
 
        const hayError = Object.values(nuevosErrores).some(Boolean);
 
        if (hayError) {
            setToast({
                tipo: 'error',
                titulo: 'Error al registrar el animal',
                mensaje: 'No se han ingresado los datos obligatorios.'
            });
            return;
        }
 
        setToast({
            tipo: 'success',
            titulo: 'Animal registrado exitosamente',
            mensaje: `El animal ${campos.nombre || campos.identificacion} ha sido registrado en el sistema.`
        });
    };
 
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
                        value={campos.identificacion}
                        onChange={handleChange('identificacion')}
                        error={errores.identificacion}
                    />
                    <Entrada
                        label="Nombre"
                        texto="Ej: Luna"
                        value={campos.nombre}
                        onChange={handleChange('nombre')}
                    />
 
                    {/* Fila 2 */}
                    <Selector
                        label="Raza *"
                        opciones={["Angus", "Holstein", "Simmental", "Brahman", "Hereford"]}
                        value={campos.raza}
                        onChange={handleChange('raza')}
                        error={errores.raza}
                    />
                    <Selector
                        label="Sexo *"
                        opciones={["Macho", "Hembra"]}
                        value={campos.sexo}
                        onChange={handleChange('sexo')}
                        error={errores.sexo}
                    />
 
                    {/* Fila 3 */}
                    <Entrada
                        label="Fecha de nacimiento *"
                        texto="dd/mm/aaaa"
                        type="date"
                        value={campos.fechaNacimiento}
                        onChange={handleChange('fechaNacimiento')}
                        error={errores.fechaNacimiento}
                    />
                    <Entrada
                        label="Peso (kg) *"
                        texto="Ej: 450"
                        type="number"
                        value={campos.peso}
                        onChange={handleChange('peso')}
                        error={errores.peso}
                    />
 
                    {/* Fila 4 */}
                    <Entrada
                        label="Color"
                        texto="Ej: Negro con manchas blancas"
                        value={campos.color}
                        onChange={handleChange('color')}
                    />
                    <Entrada
                        label="Procedencia"
                        texto="Ej: Finca El Roble"
                        value={campos.procedencia}
                        onChange={handleChange('procedencia')}
                    />
 
                    {/* Fila 5 */}
                    <div className="formulario-full">
                        <Entrada
                            label="Observaciones"
                            texto="Información adicional sobre el animal"
                            value={campos.observaciones}
                            onChange={handleChange('observaciones')}
                        />
                    </div>
 
                </div>
 
                <BotonPestana
                    opcion="Registrar"
                    imagen={imagenG1}
                    color="white"
                    backgroundColor="rgb(15, 74, 235)"
                    onClick={handleRegistrar}
                />
 
                {toast && (
                    <div className="toast-wrapper">
                        <Aviso
                            tipo={toast.tipo}
                            titulo={toast.titulo}
                            mensaje={toast.mensaje}
                            onClose={() => setToast(null)}
                        />
                    </div>
                )}
            </Contenedor>
        </div>
    )
}
 
export default RegistrarAnimal