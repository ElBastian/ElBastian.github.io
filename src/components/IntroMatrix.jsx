import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// Las constantes SOLO_PRIMERA_VEZ y DURACION están en el script de index.html
const TAM_FUENTE = 18 // px
const MS_POR_CUADRO = 45 // velocidad de caída, igual en cualquier monitor
const MS_SALIDA = 1200 // debe coincidir con la transición de #intro-matrix

// Crea una capa nueva para repetir la intro
function crearCapa() {
  const capa = document.createElement('div')
  capa.id = 'intro-matrix'
  capa.setAttribute('aria-hidden', 'true')
  capa.appendChild(document.createElement('canvas'))
  document.body.prepend(capa)
  return capa
}

// Anima una capa y la elimina al terminar; devuelve la función para detenerla
function animar(capa, alTerminar) {
  const canvas = capa.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const duracion = Number(document.documentElement.dataset.introDuracion) || 2000
  let gotas = []
  let raf = 0
  let ultimo = 0
  let timerSalida = 0
  let timerRespaldo = 0

  // Marca la intro como vista
  try {
    localStorage.setItem('introVista', '1')
  } catch {
    // Sin localStorage la intro simplemente se repite
  }

  // Ajusta el canvas a la ventana y conserva las columnas que ya caían
  const ajustar = () => {
    const dpr = window.devicePixelRatio || 1
    const ancho = window.innerWidth
    const alto = window.innerHeight
    canvas.width = Math.floor(ancho * dpr)
    canvas.height = Math.floor(alto * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.font = `${TAM_FUENTE}px monospace`
    ctx.textBaseline = 'top'

    const columnas = Math.ceil(ancho / TAM_FUENTE)
    const filas = Math.ceil(alto / TAM_FUENTE)
    gotas = Array.from({ length: columnas }, (_, i) =>
      gotas[i] ?? -Math.floor(Math.random() * filas * 0.6),
    )
  }

  // Pinta un cuadro: estela semitransparente y un dígito por columna
  const pintar = (tiempo) => {
    raf = requestAnimationFrame(pintar)
    if (tiempo - ultimo < MS_POR_CUADRO) return
    ultimo = tiempo

    const ancho = window.innerWidth
    const alto = window.innerHeight
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
    ctx.fillRect(0, 0, ancho, alto)

    gotas.forEach((fila, i) => {
      ctx.fillStyle = Math.random() < 0.1 ? '#b6ffb6' : '#00ff41'
      ctx.fillText(String(Math.floor(Math.random() * 10)), i * TAM_FUENTE, fila * TAM_FUENTE)
      // Al salir de la pantalla, la columna reinicia en un momento aleatorio
      gotas[i] = fila * TAM_FUENTE > alto && Math.random() > 0.95 ? 0 : fila + 1
    })
  }

  const detener = () => {
    cancelAnimationFrame(raf)
    clearTimeout(timerSalida)
    clearTimeout(timerRespaldo)
    window.removeEventListener('resize', ajustar)
    capa.removeEventListener('transitionend', terminar)
  }

  // Detiene todo y quita la capa del DOM
  function terminar(evento) {
    if (evento && (evento.target !== capa || evento.propertyName !== 'clip-path')) return
    detener()
    capa.remove()
    alTerminar()
  }

  ajustar()
  window.addEventListener('resize', ajustar)
  capa.addEventListener('transitionend', terminar)
  raf = requestAnimationFrame(pintar)

  // Inicia la salida; el respaldo cubre pestañas en segundo plano sin transitionend
  timerSalida = setTimeout(() => {
    capa.classList.add('saliendo')
    timerRespaldo = setTimeout(() => terminar(), MS_SALIDA + 200)
  }, duracion)

  return detener
}

// Muestra la intro al cargar (si index.html lo decidió) y al usar la flecha de regresar
function IntroMatrix() {
  const { key } = useLocation()
  const tipoNavegacion = useNavigationType()
  const posicion = useRef(null)

  // Recuerda la posición tras un clic; las flechas las registra alCambiarHistorial
  useEffect(() => {
    if (tipoNavegacion !== 'POP' || posicion.current === null) {
      posicion.current = window.history.state?.idx ?? null
    }
  }, [key, tipoNavegacion])

  useEffect(() => {
    let detener = null
    const limpiar = () => {
      detener = null
    }

    // Reinicia con una capa nueva, aunque otra intro siga en curso
    const repetir = () => {
      detener?.()
      document.getElementById('intro-matrix')?.remove()
      detener = animar(crearCapa(), limpiar)
    }

    // React Router numera el historial: un número menor significa "regresar"
    const alCambiarHistorial = () => {
      const nueva = window.history.state?.idx ?? null
      if (nueva !== null && posicion.current !== null && nueva < posicion.current) repetir()
      posicion.current = nueva
    }

    // Regreso desde otro sitio cuando el navegador restaura la página de su caché
    const alMostrarPagina = (evento) => {
      if (evento.persisted) repetir()
    }

    const capaInicial = document.getElementById('intro-matrix')
    if (capaInicial && !capaInicial.hidden) detener = animar(capaInicial, limpiar)

    window.addEventListener('popstate', alCambiarHistorial)
    window.addEventListener('pageshow', alMostrarPagina)

    return () => {
      detener?.()
      window.removeEventListener('popstate', alCambiarHistorial)
      window.removeEventListener('pageshow', alMostrarPagina)
    }
  }, [])

  return null
}

export default IntroMatrix
