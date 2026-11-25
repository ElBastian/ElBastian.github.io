import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Contacto from '../components/Contacto.jsx'
import Letras from '../components/Letras.jsx'
import ResumenAcerca from '../components/ResumenAcerca.jsx'
import logoLuma from '../assets/logo-luma.jpg'
import equipofut from '../assets/Equipofut.jpeg'
import futbol from '../assets/futbol.jpeg'
import ajedrez from '../assets/Ajedrez.jpeg'
import miDibujo from '../assets/miDibujo.jpeg'
import misiones from '../assets/misiones.jpeg'
import pasos from '../assets/pasos.jpeg'
import vice from '../assets/vice.jpeg'
import fotoCoparmex from '../assets/fotoCOPARMEX.jpeg'
import liturgia from '../assets/Liturgia.jpeg'
import viaje from '../assets/Viaje.jpeg'

function ImagenAcerca({ src, alt }) {
  const [abierta, setAbierta] = useState(false)

  useEffect(() => {
    if (!abierta) return
    const cerrarConEscape = (e) => {
      if (e.key === 'Escape') setAbierta(false)
    }
    window.addEventListener('keydown', cerrarConEscape)
    return () => window.removeEventListener('keydown', cerrarConEscape)
  }, [abierta])

  return (
    <>
      <div className="imagen-acerca">
        {src ? (
          <img src={src} alt={alt} decoding="async" onClick={() => setAbierta(true)} />
        ) : (
          <span>Imagen</span>
        )}
      </div>

      {abierta && (
        <div className="imagen-ampliada-fondo" onClick={() => setAbierta(false)}>
          <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}

function Acerca() {
  return (
    <>
    <ResumenAcerca />
    <div className="contenedor-acerca">
      <div className="marco-acerca1">

        <h1><Letras>¡Hola!</Letras></h1>

        <h2><Letras>
          Soy estudiante de Ingeniería en Sistemas y Seguridad Informática, actualmente en quinto semestre.
          Me considero una persona multipotencial, curiosa, activa y con ganas de aprender constantemente.
        </Letras></h2>

        <p><Letras>
          Me gusta explorar diferentes áreas, aprender cosas nuevas y encontrar formas de utilizar la tecnología para crear
          soluciones.
        </Letras></p>
        <p><Letras>
          Desde pequeño me han apasionado los videojuegos, y una de mis principales metas es algún día desarrollar mis
          propios juegos. Actualmente me interesa especialmente el desarrollo web y la programación, trabajando con
          tecnologías como Java, PHP, HTML, CSS y bases de datos. Disfruto crear y diseñar páginas web, así como
          desarrollar pequeños proyectos que me permitan seguir aprendiendo.
        </Letras></p>
      </div>

      <div className="marco-acerca2">
        <p><Letras>
          Uno de los proyectos en los que participo actualmente es el desarrollo, junto con algunos amigos, de una
          aplicación enfocada en la prevención de la depresión. Este proyecto me ha permitido conocer otra parte de la
          tecnología: utilizar lo que aprendemos para intentar generar un impacto positivo en las personas.
        </Letras>{' '}
          <Link className="ver-mas" to="/proyectos" state={{ seccion: 'luma' }}>
            <Letras>Ver más en proyectos</Letras>
          </Link>
        </p>
        <ImagenAcerca src={logoLuma} alt="logo luma" />
      </div>

      <div className="marco-acerca3">
        <p><Letras>
          Fuera de la programación, desde pequeño los deportes forman una parte importante de mi vida. He practicado taekwondo,
          fútbol y natación.
        </Letras></p>
        <ImagenAcerca src={equipofut} alt="equipo de fútbol" />
      </div>

      <div className="marco-acerca4">
        <p><Letras>
          Actualmente como pasatiempo disfruto practicar fútbol, básquetbol, natación y gimnasio cuando no estoy en la universidad, trabajando en mis proyectos o estudiando.
        </Letras></p>
        <ImagenAcerca src={futbol} alt="fútbol" />
      </div>

      <div className="marco-acerca5">
        <p><Letras>
          Además, desde el 2023 formo parte del selectivo de ajedrez de la UVAQ hasta la actualidad y he participado en diferentes torneos tanto locales como estatales, obteniendo buenos resultados y aprendiendo mucho de cada experiencia.
        </Letras></p>
        <ImagenAcerca src={ajedrez} alt="ajedrez" />
      </div>

      <div className="marco-acerca6">
        <p><Letras>
          También me gusta dibujar, los videojuegos de mundo abierto, ver peliculas, series o anime y escuchar música de diferentes géneros, especialmente los boleros.
        </Letras></p>
        <ImagenAcerca src={miDibujo} alt="mi dibujo" />
      </div>

      <div className="marco-acerca7">
        <p><Letras>
          Algo que disfruto es participar en actividades y proyectos dentro y fuera de la universidad como misiones de semana santa o la peregrinación juvenil a Cristo Rey al cerro del cubilete en Silao Guanajuato.
        </Letras></p>
        <ImagenAcerca src={misiones} alt="misiones" />
      </div>

      <div className="marco-acerca8">
        <p><Letras>
          He formado parte de Pastoral UVAQ y Grupos Universitarios, donde actualmente soy jefe del capitulo Universitario COPARMEX de la UVAQ y también he
          participado en actividades en el grupo de primeros auxilios.
        </Letras></p>
        <ImagenAcerca src={fotoCoparmex} alt="foto coparmex" />
      </div>

      <div className="marco-acerca9">
        <p><Letras>
          Por parte de mi carrera en IEEE UVAQ, donde
          actualmente desempeño el cargo de vicepresidente.
        </Letras></p>
        <ImagenAcerca src={vice} alt="vice" />
      </div>

      <div className="marco-acerca10">
        <p><Letras>
          Fuera de la universidad he participado en grupos y proyectos como Testimonio y Esperanza, un moviminto juvenil católico, Pasos por la Vida, es una asociación civil y movimiento ciudadano en México que defiende el valor de la vida humana desde la concepción hasta la muerte natural y The X Makers, una incubadora de proyectos sociales.
        </Letras></p>
        <ImagenAcerca src={pasos} alt="pasos" />
      </div>

      <div className="marco-acerca11">
        <p><Letras>
          Me gusta trabajar en equipo, aportar ideas, ayudar a los demás y participar activamente en los proyectos en
          los que estoy involucrado. Para mí es importante que lo que hago no solo tenga un beneficio personal, sino
          que también pueda contribuir al bien común.
        </Letras></p>
        <ImagenAcerca src={liturgia} alt="liturgia" />
      </div>

      <div className="marco-acerca12">
        <p><Letras>
          A futuro, quiero dedicarme profesionalmente a lo que estoy estudiando, idealmente mediante un trabajo que me
          permita trabajar de forma remota y viajar por el mundo. Quiero seguir aprendiendo, desarrollar mis propias
          ideas y demostrar que la tecnología también puede ser una herramienta para ayudar a los demás.
        </Letras></p>
        <ImagenAcerca src={viaje} alt="viaje" />
      </div>
    </div>
    <Contacto />
    </>
  )
}

export default Acerca
