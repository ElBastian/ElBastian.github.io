import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="barra-navegacion">
      <Link to="/">Inicio</Link>
      <Link to="/acerca">Acerca de mí</Link>
      <Link to="/proyectos">Proyectos</Link>
      <Link to="/cv">CV</Link>
    </nav>
  )
}

export default Navbar
