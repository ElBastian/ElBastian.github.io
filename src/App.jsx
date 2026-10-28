import { HashRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Inicio from './pages/Inicio.jsx'
import Acerca from './pages/Acerca.jsx'
import Proyectos from './pages/Proyectos.jsx'
import CV from './pages/CV.jsx'

function App() {
  return (
    <HashRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<><title>Página shida de Bastian</title><Inicio /></>} />
        <Route path="/acerca" element={<><title>Acerca de mí</title><Acerca /></>} />
        <Route path="/proyectos" element={<><title>Proyectos</title><Proyectos /></>} />
        <Route path="/cv" element={<><title>CV</title><CV /></>} />
      </Routes>
    </HashRouter>
  )
}

export default App
