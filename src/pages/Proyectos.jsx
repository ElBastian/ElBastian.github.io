import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Contacto from '../components/Contacto.jsx'
import Letras from '../components/Letras.jsx'
import logoLuma from '../assets/logo-luma.jpg'
import capturaBastianfy from '../assets/proyecto-bastianfy.jpg'
import capturaNova from '../assets/proyecto-nova.jpg'
import capturaBastianGames from '../assets/proyecto-bastian-games.jpg'
import capturaCotizador from '../assets/proyecto-cotizador.jpg'
import capturaClima from '../assets/proyecto-clima.jpg'
import capturaPong from '../assets/proyecto-pong.jpg'
import capturaTamagotchi from '../assets/proyecto-tamagotchi.jpg'

const proyectos = [
  {
    id: 'luma',
    titulo: 'LUMA',
    estado: 'En desarrollo',
    descripcion:
      'Aplicación web enfocada en la detección temprana de ansiedad y depresión y en la prevención del suicidio.',
    puntos: [
      'Detección temprana de ansiedad y depresión',
      'Prevención del suicidio',
      'Desarrollada en un equipo de tres integrantes',
    ],
    tecnologias: ['Aplicación web', 'Proyecto en equipo'],
    imagen: logoLuma,
    sitio: null,
    repositorio: null,
  },
  {
    titulo: 'Nova Academy',
    descripcion: 'Plataforma web de cursos con paneles diferenciados para cada tipo de usuario.',
    puntos: [
      'Registro e inicio de sesión',
      'Paneles para administrador, director, estudiante y ponente',
      'Gestión de cursos y despliegue en línea',
    ],
    tecnologias: ['PHP', 'MySQL', 'CSS', 'Docker'],
    icono: 'curso',
    captura: capturaNova,
    sitio: 'https://novaacademy.onrender.com/principal.php',
    repositorio: 'https://github.com/ElBastian/NovaAcademy',
  },
  {
    titulo: 'Bastian-fy',
    descripcion: 'Reproductor de música web con inicio de sesión y diseño responsivo.',
    puntos: [
      'Controles de reproducción',
      'Barra de progreso interactiva',
      'Lista de canciones con reproducción automática',
    ],
    tecnologias: ['HTML', 'CSS', 'JavaScript'],
    icono: 'musica',
    captura: capturaBastianfy,
    sitio: 'https://elbastian.github.io/Bastian-fy/',
    repositorio: 'https://github.com/ElBastian/Bastian-fy',
  },
  {
    titulo: 'Cotizador web',
    descripcion: 'Cotizador para páginas web.',
    tecnologias: ['HTML', 'CSS'],
    icono: 'calculadora',
    captura: capturaCotizador,
    sitio: 'https://elbastian.github.io/Cotizador-web/',
    repositorio: 'https://github.com/ElBastian/Cotizador-web',
  },
  {
    titulo: 'IA Clima',
    descripcion: 'Página del clima desarrollada con asistencia de IA.',
    tecnologias: ['Página web', 'Asistencia de IA'],
    icono: 'clima',
    captura: capturaClima,
    sitio: 'https://elbastian.github.io/IA-CLIMA/',
    repositorio: 'https://github.com/ElBastian/IA-CLIMA',
  },
  {
    titulo: 'BASTIAN GAMES',
    descripcion: 'Colección de minijuegos web con temática espacial.',
    puntos: [
      'Pong vs Pared: un jugador, con récord guardado',
      'Pong Dual: dos jugadores en línea, en distintas pestañas o dispositivos',
      'Gravity Run: carrera contra la máquina invirtiendo la gravedad',
    ],
    tecnologias: ['Videojuegos web', 'Multijugador en línea'],
    icono: 'pong',
    captura: capturaBastianGames,
    sitio: 'https://elbastian.github.io/BASTIAN-GAMES/public/',
    repositorio: 'https://github.com/ElBastian/BASTIAN-GAMES',
  },
  {
    titulo: 'Pong vs Pared',
    descripcion: 'Videojuego web.',
    tecnologias: ['Videojuego web'],
    icono: 'pong',
    captura: capturaPong,
    sitio: 'https://elbastian.github.io/Pong-vs-Pared/',
    repositorio: 'https://github.com/ElBastian/Pong-vs-Pared',
  },
  {
    titulo: 'Tamagotchi',
    descripcion: 'Videojuego web.',
    tecnologias: ['Videojuego web'],
    icono: 'tamagotchi',
    captura: capturaTamagotchi,
    sitio: 'https://elbastian.github.io/Tamagochi/',
    repositorio: 'https://github.com/ElBastian/Tamagochi',
  },
]

const ICONOS = {
  check: 'M20 6 9 17l-5-5',
  externo: 'M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
  codigo: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  curso: 'M22 10 12 5 2 10l10 5 10-5ZM6 12v5c3 3 9 3 12 0v-5',
  musica: 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  calculadora: 'M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 18.5h.01M12 18.5h.01M16 18.5h.01',
  clima: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z',
  pong: 'M4 5v8M20 11v8M13.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z',
  tamagotchi: 'M12 3c4 0 7 6 7 11a7 7 0 0 1-14 0c0-5 3-11 7-11ZM9.5 13h.01M14.5 13h.01M10 17c1.2 1 2.8 1 4 0',
}

function Icono({ nombre, tam = 18 }) {
  return (
    <svg
      width={tam}
      height={tam}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICONOS[nombre]} />
    </svg>
  )
}

function Captura({ proyecto }) {
  const imagen = (
    <img
      className="proyecto-captura"
      src={proyecto.captura}
      alt={`Captura de pantalla de ${proyecto.titulo}`}
      loading="lazy"
    />
  )

  if (!proyecto.sitio) return imagen

  return (
    <a
      className="proyecto-captura-enlace"
      href={proyecto.sitio}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visitar sitio web de ${proyecto.titulo}`}
    >
      {imagen}
      <span className="proyecto-captura-capa" aria-hidden="true">
        <Icono nombre="externo" />
        Visitar web
      </span>
    </a>
  )
}

function Enlaces({ proyecto }) {
  const mostrarSitio = proyecto.sitio && !proyecto.captura
  if (!mostrarSitio && !proyecto.repositorio) return null

  return (
    <div className="proyecto-enlaces">
      {mostrarSitio && (
        <a
          className="proyecto-boton principal"
          href={proyecto.sitio}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visitar sitio web de ${proyecto.titulo}`}
        >
          <Icono nombre="externo" />
          <Letras texto="Visitar web" />
        </a>
      )}
      {proyecto.repositorio && (
        <a
          className="proyecto-boton"
          href={proyecto.repositorio}
          target="_blank"
          rel="noreferrer"
          aria-label={`Ver repositorio de ${proyecto.titulo}`}
        >
          <Icono nombre="codigo" />
          <Letras texto="Repositorio" />
        </a>
      )}
    </div>
  )
}

function Etiquetas({ lista }) {
  return (
    <ul className="proyecto-etiquetas">
      {lista.map((etiqueta) => (
        <li key={etiqueta}>
          <Letras texto={etiqueta} />
        </li>
      ))}
    </ul>
  )
}

function Proyectos() {
  const { state } = useLocation()

  useEffect(() => {
    if (!state?.seccion) return
    document.getElementById(state.seccion)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [state])

  return (
    <main className="contenedor-proyectos">
      <h1>
        <Letras texto="Proyectos" />
      </h1>

      <div className="lista-proyectos">
        {proyectos.map((proyecto) => (
          <article className="proyecto" id={proyecto.id} key={proyecto.titulo}>
            <div className="proyecto-info">
              <h2 className="proyecto-titulo">
                <Letras texto={proyecto.titulo} />
              </h2>
              <div className="proyecto-linea" />
              <p className="proyecto-descripcion">
                <Letras texto={proyecto.descripcion} />
              </p>

              {proyecto.puntos && (
                <ul className="proyecto-puntos">
                  {proyecto.puntos.map((punto) => (
                    <li key={punto}>
                      <Icono nombre="check" />
                      <Letras texto={punto} />
                    </li>
                  ))}
                </ul>
              )}

              <Etiquetas lista={proyecto.tecnologias} />
            </div>

            <div className="proyecto-panel">
              {proyecto.estado && (
                <span className="proyecto-estado">
                  <Letras texto={proyecto.estado} />
                </span>
              )}
              {proyecto.captura ? (
                <Captura proyecto={proyecto} />
              ) : proyecto.imagen ? (
                <img className="proyecto-logo" src={proyecto.imagen} alt={`Logo de ${proyecto.titulo}`} />
              ) : (
                <span className="proyecto-icono">
                  <Icono nombre={proyecto.icono} tam={52} />
                </span>
              )}
              <Enlaces proyecto={proyecto} />
            </div>
          </article>
        ))}
      </div>

      <Contacto />
    </main>
  )
}

export default Proyectos
