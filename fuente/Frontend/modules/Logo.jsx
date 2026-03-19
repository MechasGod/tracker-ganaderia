import logo from '../images/EASY-COW.jpeg'
import './styles/Logo.css'
function Logo({ size = "70px" }) {
  return (
    <img 
        className='Logo'
        src={logo}
        alt="Logo"
        style={{ width: size }}
    />
  )
}

export default Logo