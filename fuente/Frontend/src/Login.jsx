import { useState } from 'react'
import './Login.css'
import Boton from '../modules/boton'
import Contenedor from '../modules/contenedor'
import Entrada from '../modules/Entrada'
import Logo from '../modules/Logo'
import Aviso from '../modules/aviso.jsx'
import { useNavigate } from 'react-router-dom'
import { post } from './api.js'

function Login() {
    const navigate = useNavigate()
    const [toast, setToast] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [campos, setCampos] = useState({ email: '', password: '' });
    const [errores, setErrores] = useState({ email: false, password: false });

    const handleChange = (campo) => (e) => {
        const valor = e.target.value;
        setCampos(prev => ({ ...prev, [campo]: valor }));
        setErrores(prev => ({ ...prev, [campo]: !valor }));
    };

    const handleIngresar = async () => {
        const nuevosErrores = {
            email: !campos.email,
            password: !campos.password,
        };
        setErrores(nuevosErrores);

        if (Object.values(nuevosErrores).some(Boolean)) {
            setToast({ tipo: 'error', titulo: 'Error al ingresar',
                       mensaje: 'Por favor ingrese su correo y contraseña.' });
            return;
        }

        setCargando(true);
        try {
            const response = await post('/auth/login', {
                email: campos.email,
                password: campos.password,
            });
            // Guardar token y usuario en localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/Menu');
        } catch (error) {
            setToast({ tipo: 'error', titulo: 'Error al ingresar',
                       mensaje: error.message });
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className='Login-container'>
            <Contenedor width="30rem" height="25rem" backColor="red">
                <Logo size='40px'/>
                <h1 className='text'>EASYCOW</h1>
                <p className='subtext'>Ingrese sus datos para continuar</p>
                <Entrada
                    label="Ingrese su Correo"
                    type="email"
                    texto="ejemplo@correo.com"
                    value={campos.email}
                    onChange={handleChange('email')}
                    error={errores.email}
                />
                <Entrada
                    label="Ingrese su contraseña"
                    type='password'
                    texto="••••••••"
                    value={campos.password}
                    onChange={handleChange('password')}
                    error={errores.password}
                />
                <Boton
                    color="white"
                    backgroundColor="rgb(16, 150, 58)"
                    hoverColor="rgb(7, 112, 40)"
                    onClick={handleIngresar}
                    disabled={cargando}
                >
                    {cargando ? 'Ingresando...' : 'Ingresar'}
                </Boton>
            </Contenedor>

            {toast && (
                <div className="toast-wrapper">
                    <Aviso tipo={toast.tipo} titulo={toast.titulo}
                           mensaje={toast.mensaje} onClose={() => setToast(null)} />
                </div>
            )}
        </div>
    )
}

export default Login