import { useState, useEffect } from 'react'
import Contenedor from "../modules/contenedor"
import Navegar from "../modules/navegar"
import Atras from "../modules/atras"
import imagenP3 from '../images/warning.svg'
import TituloPestana from "../modules/tituloPestana"
import BotonPestana from "../modules/botonPestana"
import Entrada from "../modules/Entrada"
import Selector from "../modules/seleccion"
import Aviso from '../modules/aviso.jsx'
import './RegistrarEnfermo.css'
import { post, get } from './api.js'

function RegistrarEnfermo(){
    const [toast, setToast] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [animales, setAnimales] = useState([]);
    const [campos, setCampos] = useState({
        animalId: '', fechaDeteccion: '', enfermedad: '',
        temperatura: '', estadoGeneral: '', sintomas: '', observaciones: ''
    });
    const [errores, setErrores] = useState({
        fechaDeteccion: false, enfermedad: false,
        temperatura: false, sintomas: false
    });

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

    const handleRegistrar = async () => {
        const nuevosErrores = {
            fechaDeteccion: !campos.fechaDeteccion,
            enfermedad:     !campos.enfermedad,
            temperatura:    !campos.temperatura,
            sintomas:       !campos.sintomas,
        };
        setErrores(nuevosErrores);

        if (Object.values(nuevosErrores).some(Boolean) || !campos.animalId) {
            setToast({ tipo: 'error', titulo: 'Error al registrar',
                       mensaje: 'No se han ingresado los datos obligatorios.' });
            return;
        }

        setCargando(true);
        try {
            await post('/enfermedades', campos);
            setToast({ tipo: 'success', titulo: 'Registro exitoso',
                       mensaje: 'El animal enfermo ha sido registrado en el sistema.' });
        } catch (error) {
            setToast({ tipo: 'error', titulo: 'Error al registrar',
                       mensaje: error.message });
        } finally {
            setCargando(false);
        }
    };

    const opcionesAnimales = animales.map(animal => ({
        value: animal.id,
        label: `${animal.identificacion} - ${animal.nombre || 'Sin nombre'}`
    }));

    const opcionesEnfermedad = [
        { value: 'mastitis', label: 'Mastitis' },
        { value: 'fiebre_aftosa', label: 'Fiebre Aftosa' },
        { value: 'brucelosis', label: 'Brucelosis' },
        { value: 'parasitosis', label: 'Parasitosis' },
        { value: 'neumonia', label: 'Neumonía' },
        { value: 'diarrea', label: 'Diarrea' },
        { value: 'cojera', label: 'Cojera' },
        { value: 'otra', label: 'Otra' }
    ];

    const opcionesEstadoGeneral = [
        { value: 'critico', label: 'Crítico' },
        { value: 'grave', label: 'Grave' },
        { value: 'moderado', label: 'Moderado' },
        { value: 'leve', label: 'Leve' }
    ];

    return(
        <div className="registrarenfermo">
            <Navegar activo="pulseLine"/>
            <Atras/>
            <Contenedor width="auto" height="auto">
                <TituloPestana
                    imagen={imagenP3}
                    textoGrande="Registrar Ganado Enfermo"
                    textoPequeno="Registre los animales que presenten alguna enfermedad"
                    color="rgba(255, 51, 0, 0.25)"
                />

                <div className="formulario-grid">
                    <div className="formulario-full">
                        <Selector label="Animal Afectado *"
                            opciones={opcionesAnimales}
                            value={campos.animalId} onChange={handleChange('animalId')} />
                    </div>

                    <Entrada label="Fecha de Detección *" type="date"
                        value={campos.fechaDeteccion} onChange={handleChange('fechaDeteccion')}
                        error={errores.fechaDeteccion} />
                    <Selector label="Enfermedad / Diagnóstico *"
                        opciones={opcionesEnfermedad}
                        value={campos.enfermedad} onChange={handleChange('enfermedad')}
                        error={errores.enfermedad} />

                    <Entrada label="Temperatura (°C)" texto="Ej: 39.5" type="number"
                        value={campos.temperatura} onChange={handleChange('temperatura')}
                        error={errores.temperatura} />
                    <Selector label="Estado General"
                        opciones={opcionesEstadoGeneral}
                        value={campos.estadoGeneral} onChange={handleChange('estadoGeneral')} />

                    <div className="formulario-full">
                        <Entrada label="Síntomas Observados *"
                            texto="Describa los síntomas que presenta el animal..."
                            value={campos.sintomas} onChange={handleChange('sintomas')}
                            error={errores.sintomas} />
                    </div>

                    <div className="formulario-full">
                        <Entrada label="Observaciones Adicionales"
                            texto="Información adicional relevante"
                            value={campos.observaciones} onChange={handleChange('observaciones')} />
                    </div>
                </div>

                <BotonPestana
                    opcion={cargando ? 'Registrando...' : 'Registrar'}
                    imagen={imagenP3} color="white"
                    backgroundColor="rgb(200, 50, 20)"
                    onClick={handleRegistrar}
                    disabled={cargando}
                />

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

export default RegistrarEnfermo