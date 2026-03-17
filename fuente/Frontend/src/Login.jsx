import { useState } from 'react'
import './Login.css'
import Boton from '../modules/boton'
import Contenedor from '../modules/contenedor'
import Entrada from '../modules/Entrada'

function Login() {
    //const [usuario, setUsuario] = useState("")
    return (
        <div className='container'>
            <h1 className='title'>EASYCOW</h1>
            <Contenedor width="14rem" height="16rem" backColor="red">
                <h2 >Inicio de sesion</h2>
                <Entrada texto ="Usuario" />
                <Entrada type='password' texto="Contraseña"/>
                <Boton color="aquamarine" hoverColor="darkgreen">
                    Ingresar
                </Boton>
            </Contenedor>
        </div>
        
    )
}

export default Login