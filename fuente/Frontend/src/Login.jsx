import { useState } from 'react'
import './Login.css'
import Boton from '../modules/boton'
import Contenedor from '../modules/contenedor'

function Login() {
    return (
        <div className='container'>
            <Contenedor width="10rem" height="12rem" backColor="red">
                <Boton color="aquamarine" hoverColor="darkgreen">
                    Ingresar
                </Boton>
            </Contenedor>
        </div>
        
    )
}

export default Login