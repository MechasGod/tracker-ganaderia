import './Login.css'
import Boton from '../modules/boton'
import Contenedor from '../modules/contenedor'
import Entrada from '../modules/Entrada'
import Logo from '../modules/Logo'
import { useNavigate } from 'react-router-dom'

function Login() {
    const Navigate = useNavigate()
    return (
        <div className='container'>
            
            <Contenedor width="30rem" height="25rem" backColor="red">
                <Logo size='40px'/>
                <h1 className='text'>EASYCOW</h1>
                <p className='subtext'>Ingrese sus datos para continuar</p>
                <Entrada label="Ingrese su Correo" type="email" texto ="ejemplo@correo.com" />
                <Entrada label="Ingrese su contraseña" type='password' texto="••••••••"/>
                <Boton onClick={() => Navigate('/Menu')}>
                    Ingresar
                </Boton>
            </Contenedor>
        </div>
    )
}

export default Login