import fotoPerfil from '../assets/fotoPerfil.jpeg'

function Inicio() {
  return (
    <>
      <div className="marco-portafolio">
        <div className="foto">
          <img src={fotoPerfil} alt="Mi foto" />
        </div>

        <div className="informacion">
          <h1>Sebastián Lara</h1>

          <h2>
            Hola, soy un futuro Ingeniero en Sistemas Computacionales
            y Seguridad Informática, apasionado por viajar por el mundo✈️, los videojuegos🕹️, y los deportes♟️.
          </h2>
        </div>
      </div>

      <div className="pie">
        <p>Página creada por Sebastián.</p>

        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">
          Haz click aquí!!!
        </a>
      </div>
    </>
  )
}

export default Inicio
