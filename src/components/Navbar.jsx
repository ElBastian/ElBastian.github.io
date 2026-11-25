import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { NavLink } from 'react-router-dom'
import { cambiarTemaConTinta, precalcularTinta } from '../utils/tinta'
import Letras from './Letras.jsx'

const enlaces = [
  { ruta: '/', texto: 'Inicio', icono: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z' },
  { ruta: '/acerca', texto: 'Acerca de mí', icono: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0' },
  { ruta: '/proyectos', texto: 'Proyectos', icono: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z' },
  { ruta: '/cv', texto: 'CV', icono: 'M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1ZM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18' },
]

let audio = null

function sonarClic() {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)()
    const ahora = audio.currentTime
    const duracion = 0.025

    const muestras = Math.floor(audio.sampleRate * duracion)
    const buffer = audio.createBuffer(1, muestras, audio.sampleRate)
    const datos = buffer.getChannelData(0)
    for (let i = 0; i < muestras; i++) {
      datos[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / muestras, 4)
    }

    const ruido = audio.createBufferSource()
    ruido.buffer = buffer

    const filtro = audio.createBiquadFilter()
    filtro.type = 'bandpass'
    filtro.frequency.value = 3500
    filtro.Q.value = 1.2

    const volumen = audio.createGain()
    volumen.gain.value = 0.8

    ruido.connect(filtro).connect(volumen).connect(audio.destination)
    ruido.start(ahora)
  } catch {
  }
}

function temaInicial() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function Navbar() {
  const [tema, setTema] = useState(temaInicial)
  const botonTema = useRef(null)

  useEffect(() => {
    const preparar = () => precalcularTinta(botonTema.current)
    preparar()
    window.addEventListener('resize', preparar)
    return () => window.removeEventListener('resize', preparar)
  }, [])

  const cambiarTema = (evento) => {
    sonarClic()
    const nuevo = tema === 'dark' ? 'light' : 'dark'

    const aplicar = () => {
      document.documentElement.dataset.theme = nuevo
      try {
        localStorage.setItem('tema', nuevo)
      } catch {
      }
      flushSync(() => setTema(nuevo))
    }

    cambiarTemaConTinta(aplicar, evento.currentTarget)
  }

  return (
    <nav className="barra-navegacion">
      <div className="nav-enlaces">
        {enlaces.map(({ ruta, texto, icono }) => (
          <NavLink
            key={ruta}
            to={ruta}
            end={ruta === '/'}
            className={({ isActive }) => `boton-retro${isActive ? ' sumido' : ''}`}
            onClick={sonarClic}
          >
            <svg
              className="nav-icono"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={icono} />
            </svg>
            <Letras texto={texto} />
          </NavLink>
        ))}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={tema === 'dark'}
        className={`switch-tema${tema === 'dark' ? ' oscuro' : ''}`}
        ref={botonTema}
        onClick={cambiarTema}
        onPointerEnter={() => precalcularTinta(botonTema.current)}
        aria-label="Modo oscuro"
        title={tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        <svg className="switch-icono sol" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
          <path
            d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <svg className="switch-icono luna" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="currentColor" />
        </svg>
        <span className="switch-perilla" aria-hidden="true" />
      </button>
    </nav>
  )
}

export default Navbar