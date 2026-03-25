import { useLocation } from 'react-router-dom'
import './App.css'
import Navegar from '../modules/navegar'

function App() {
  const location = useLocation()
  const showNavbar = location.pathname !== '/login'

  return (
    <>
      {showNavbar && <Navegar />}
    </>
  )
}

export default App
