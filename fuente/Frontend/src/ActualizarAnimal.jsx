import { useState, useEffect } from 'react'
import Atras from "../modules/atras"
import Contenedor from "../modules/contenedor"
import Navegar from "../modules/navegar"
import TituloPestana from "../modules/tituloPestana"
import imagenP2 from '../images/reload.svg'
import BotonPestana from "../modules/botonPestana"
import Entrada from "../modules/Entrada"
import Selector from "../modules/seleccion"
import Aviso from '../modules/aviso.jsx'
import './ActualizarAnimal.css'
import { post, get } from './api.js'

function ActualizarAnimal(){
    const [toast, setToast] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [animales, setAnimales] = useState([]);
    const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
    const [campos, setCampos] = useState({
        animalId: '', fechaInicio: '', medicamento: '',
        dosis: '', frecuencia: '', duracion: '',
        viaAdministracion: '', veterinario: '', estadoTratamiento: '', observaciones: ''
    });
    const [errores, setErrores] = useState({
        fechaInicio: false, medicamento: false,
        dosis: false, frecuencia: false, duracion: false, viaAdministracion: false
    });

    // Cargar lista de animales al montar
    useEffect(() => {
        const cargarAnimales = async () => {
            try {
                const res = await get('/animales');
                setAnimales(res.data);
            } catch (error) {
                setToast({ tipo: 'error', titulo: 'Error', mensaje: 'No se pudo cargar la lista de animales' });
            }
        };
        cargarAnimales();
    }, []);

    const handleChange = (campo) => (e) => {
        const valor = e.target.value;
        setCampos(prev => ({ ...prev, [campo]: valor }));
        if (campo in errores) {
            setErrores(prev => ({ ...prev, [campo]: !valor }));
        }
    };

    const handleAnimalChange = (e) => {
        const animalId = e.target.value;
        setAnimalSeleccionado(animalId);
        setCampos(prev => ({ ...prev, animalId }));
    };

    const handleGuardar = async () => {
        const nuevosErrores = {
            fechaInicio:  !campos.fechaInicio,
            medicamento:  !campos.medicamento,
            dosis:        !campos.dosis,
            frecuencia:   !campos.frecuencia,
            duracion:     !campos.duracion,
            viaAdministracion: !campos.viaAdministracion,
        };
        setErrores(nuevosErrores);

        if (Object.values(nuevosErrores).some(Boolean) || !campos.animalId) {
            setToast({ tipo: 'error', titulo: 'Error al guardar',
                       mensaje: 'No se han ingresado los datos obligatorios.' });
            return;
        }

        setCargando(true);
        try {
            await post('/tratamientos', campos);
            setToast({ tipo: 'success', titulo: 'Tratamiento guardado exitosamente',
                       mensaje: `El tratamiento ha sido registrado en el sistema.` });
        } catch (error) {
            setToast({ tipo: 'error', titulo: 'Error al guardar',
                       mensaje: error.message });
        } finally {
            setCargando(false);
        }
    };

    // Preparar opciones para el selector de animales
    const opcionesAnimales = animales.map(animal => ({
        value: animal._id || animal.id,
        label: `${animal.identificacion} - ${animal.nombre || 'Sin nombre'}`
    }));

    return(
        <div className="actualizaranimal">
            <Navegar/>
            <Atras/>
            <Contenedor width="auto" height="auto">
                <TituloPestana
                    imagen={imagenP2}
                    textoGrande="Actualizar Tratamiento"
                    textoPequeno="Seleccione un animal y registre un nuevo tratamiento"
                    color="rgba(0, 153, 255, 0.25)"
                />

                <div className="formulario-grid">
                    <div className="formulario-full">
                        <Selector 
                            label="Animal en Tratamiento *"
                            opciones={opcionesAnimales}
                            value={campos.animalId} 
                            onChange={handleAnimalChange}
                        />
                    </div>

                    {campos.animalId && (<>
                        <Entrada label="Fecha de Inicio *" type="date"
                            value={campos.fechaInicio} onChange={handleChange('fechaInicio')}
                            error={errores.fechaInicio} />
                        <Entrada label="Medicamento *" texto="Ej: Penicilina G"
                            value={campos.medicamento} onChange={handleChange('medicamento')}
                            error={errores.medicamento} />

                        <Entrada label="Dosis *" texto="Ej: 10ml"
                            value={campos.dosis} onChange={handleChange('dosis')} error={errores.dosis} />
                        <Selector label="Frecuencia *" 
                            opciones={[
                                { value: 'cada_6h', label: 'Cada 6 horas' },
                                { value: 'cada_8h', label: 'Cada 8 horas' },
                                { value: 'cada_12h', label: 'Cada 12 horas' },
                                { value: 'cada_24h', label: 'Cada 24 horas' },
                                { value: 'cada_48h', label: 'Cada 48 horas' }
                            ]}
                            value={campos.frecuencia} onChange={handleChange('frecuencia')}
                            error={errores.frecuencia} />

                        <Entrada label="Duración (días) *" texto="Ej: 7" type="number"
                            value={campos.duracion} onChange={handleChange('duracion')}
                            error={errores.duracion} />
                        <Selector label="Vía de Administración *" 
                            opciones={[
                                { value: 'intramuscular', label: 'Intramuscular' },
                                { value: 'intravenosa', label: 'Intravenosa' },
                                { value: 'subcutanea', label: 'Subcutánea' },
                                { value: 'oral', label: 'Oral' },
                                { value: 'topica', label: 'Tópica' }
                            ]}
                            value={campos.viaAdministracion} onChange={handleChange('viaAdministracion')}
                            error={errores.viaAdministracion} />

                        <Entrada label="Veterinario Responsable" texto="Nombre del veterinario"
                            value={campos.veterinario} onChange={handleChange('veterinario')} />
                        <Selector label="Estado del Tratamiento"
                            opciones={[
                                { value: 'en_curso', label: 'En Curso' },
                                { value: 'completado', label: 'Completado' },
                                { value: 'suspendido', label: 'Suspendido' },
                                { value: 'actualizar', label: 'Actualizar Existente' }
                            ]}
                            value={campos.estadoTratamiento} onChange={handleChange('estadoTratamiento')} />

                        <div className="formulario-full">
                            <Entrada label="Observaciones y Evolución"
                                texto="Efectividad del tratamiento, efectos secundarios, mejoras observadas..."
                                value={campos.observaciones} onChange={handleChange('observaciones')} />
                        </div>

                        <div className="formulario-full">
                            <BotonPestana
                                opcion={cargando ? 'Guardando...' : 'Guardar Tratamiento'}
                                imagen={imagenP2} color="white"
                                backgroundColor="rgba(0, 153, 255, 0.95)"
                                onClick={handleGuardar}
                                disabled={cargando}
                            />
                        </div>
                    </>)}
                </div>

                {toast && (
                    <div className="toast-wrapper">
                        <Aviso tipo={toast.tipo} titulo={toast.titulo}
                               mensaje={toast.mensaje} onClose={() => setToast(null)} />
                    </div>
                )}
            </Contenedor>
        </div>
    )
}

export default ActualizarAnimal