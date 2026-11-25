import Contacto from '../components/Contacto.jsx'
import Letras from '../components/Letras.jsx'
import fotoPerfil from '../assets/fotoPerfil.jpeg'

function Inicio() {
  return (
    <>
      <div className="marco-portafolio">
        <div className="foto">
          <img src={fotoPerfil} alt="Mi foto" />
        </div>

        <div className="informacion">
          <h1><Letras>Sebastián Shamed Lara Juárez</Letras></h1>

          <h2><Letras>
            Hola, soy un futuro Ingeniero en Sistemas Computacionales
            y Seguridad Informática, apasionado por viajar por el mundo✈️, los videojuegos🕹️, y los deportes♟️.
          </Letras></h2>
        </div>
      </div>

      <div className="pie">
        <p><Letras>Página creada por Sebastián.</Letras></p>

        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">
          <Letras>Haz click aquí!!!</Letras>
        </a>
      </div>

      <Contacto />
    </>
  )
}

export default Inicio
