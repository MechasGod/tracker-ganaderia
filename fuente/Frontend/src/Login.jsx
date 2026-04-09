import { useState } from 'react'
import './Login.css'
import Boton from '../modules/boton'
import Contenedor from '../modules/contenedor'
import Entrada from '../modules/Entrada'
import Logo from '../modules/Logo'
import Aviso from '../modules/aviso.jsx'
import { useNavigate } from 'react-router-dom'
 
function Login() {
    const Navigate = useNavigate()
    const [toast, setToast] = useState(null);
    const [campos, setCampos] = useState({ correo: '', contrasena: '' });
    const [errores, setErrores] = useState({ correo: false, contrasena: false });
 
    const handleChange = (campo) => (e) => {
        const valor = e.target.value;
        setCampos(prev => ({ ...prev, [campo]: valor }));
        setErrores(prev => ({ ...prev, [campo]: !valor }));
    };
 
    const handleIngresar = () => {
        const nuevosErrores = {
            correo:     !campos.correo,
            contrasena: !campos.contrasena,
        };
        setErrores(nuevosErrores);
 
        if (Object.values(nuevosErrores).some(Boolean)) {
            setToast({
                tipo: 'error',
                titulo: 'Error al ingresar',
                mensaje: 'Por favor ingrese su correo y contraseña.'
            });
            return;
        }
        Navigate('/Menu');
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
                    value={campos.correo}
                    onChange={handleChange('correo')}
                    error={errores.correo}
                />
                <Entrada
                    label="Ingrese su contraseña"
                    type='password'
                    texto="••••••••"
                    value={campos.contrasena}
                    onChange={handleChange('contrasena')}
                    error={errores.contrasena}
                />
                <Boton
                    color="white"
                    backgroundColor="rgb(16, 150, 58)"
                    hoverColor="rgb(7, 112, 40)"
                    onClick={handleIngresar}
                >
                    Ingresar
                </Boton>
            </Contenedor>
 
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
        </div>
    )
}
 
export default Login