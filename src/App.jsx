import { HashRouter, Route, Routes } from 'react-router-dom'
import AparecerAlBajar from './components/AparecerAlBajar.jsx'
import Footer from './components/Footer.jsx'
import IntroMatrix from './components/IntroMatrix.jsx'
import OlaCursor from './components/OlaCursor.jsx'
import Navbar from './components/Navbar.jsx'
import ScrollArriba from './components/ScrollArriba.jsx'
import Inicio from './pages/Inicio.jsx'
import Acerca from './pages/Acerca.jsx'
import Proyectos from './pages/Proyectos.jsx'
import CV from './pages/CV.jsx'

function App() {
  return (
    <HashRouter>
      <ScrollArriba />
      <IntroMatrix />
      <Navbar />

      <Routes>
        <Route path="/" element={<><title>Página shida de Bastian</title><Inicio /></>} />
        <Route path="/acerca" element={<><title>Acerca de mí</title><Acerca /></>} />
        <Route path="/proyectos" element={<><title>Proyectos</title><Proyectos /></>} />
        <Route path="/cv" element={<><title>CV</title><CV /></>} />
      </Routes>

      <Footer />
      <AparecerAlBajar />
      <OlaCursor />
    </HashRouter>
  )
}

export default App
