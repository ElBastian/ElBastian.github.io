import { useEffect, useRef } from 'react'

const VIDA_ONDA = 1600
const RADIO_MAXIMO = 150
const MS_ENTRE_ONDAS = 55
const MAX_ONDAS = 60
const DISTANCIA_MINIMA = 2
const MS_PARA_QUIETO = 100
const MS_DESVANECER = 250

const SUAVIDAD_POSICION = 0.35
const SUAVIDAD_GIRO = 0.2
const VELOCIDAD_PARA_GIRAR = 0.6

const CLICABLES = 'a, button, label, select, summary, [role="button"], .boton-retro, .switch-tema, .cv-version'

function hexARgb(hex) {
  const limpio = hex.trim().replace('#', '')
  const valor = parseInt(limpio.length === 3 ? limpio.replace(/./g, '$&$&') : limpio, 16)
  return [(valor >> 16) & 255, (valor >> 8) & 255, valor & 255]
}

function leerColores() {
  const estilos = getComputedStyle(document.documentElement)
  return {
    inicio: hexARgb(estilos.getPropertyValue('--acento') || '#a78bfa'),
    fin: hexARgb(estilos.getPropertyValue('--acento-azul') || '#60a5fa'),
  }
}

function mezclar(a, b, t) {
  return a.map((canal, i) => Math.round(canal + (b[i] - canal) * t)).join(',')
}

function diferenciaAngulo(desde, hasta) {
  return ((hasta - desde + 540) % 360) - 180
}

function OlaCursor() {
  const canvasRef = useRef(null)
  const flechaRef = useRef(null)

  useEffect(() => {
    const conMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    const flecha = flechaRef.current
    if (!conMouse || sinMovimiento || !canvas || !flecha) return

    const raiz = document.documentElement
    raiz.classList.add('cursor-propio')

    const ctx = canvas.getContext('2d')
    let colores = leerColores()
    let ondas = []
    let raf = 0
    let anterior = 0
    let ultimaOnda = 0
    let dentro = false
    let ultimoMovimiento = -Infinity
    let ultimoX = -Infinity
    let ultimoY = -Infinity

    let mouseX = 0
    let mouseY = 0
    let flechaX = 0
    let flechaY = 0
    let angulo = 0
    let anguloObjetivo = 0

    const ajustar = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const moverFlecha = (pasos) => {
      const factor = 1 - Math.pow(1 - SUAVIDAD_POSICION, pasos)
      const dx = (mouseX - flechaX) * factor
      const dy = (mouseY - flechaY) * factor
      flechaX += dx
      flechaY += dy

      if (Math.hypot(dx, dy) / pasos > VELOCIDAD_PARA_GIRAR) {
        anguloObjetivo = (Math.atan2(dy, dx) * 180) / Math.PI + 90
      }
      angulo += diferenciaAngulo(angulo, anguloObjetivo) * (1 - Math.pow(1 - SUAVIDAD_GIRO, pasos))

      flecha.style.transform =
        `translate3d(${flechaX}px, ${flechaY}px, 0) translate(-50%, -50%) rotate(${angulo}deg)`

      return Math.abs(mouseX - flechaX) > 0.1 || Math.abs(mouseY - flechaY) > 0.1
    }

    const pintarOndas = (ahora) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const tiempoQuieto = dentro ? ahora - ultimoMovimiento : Infinity
      const moviendose = tiempoQuieto < MS_PARA_QUIETO
      const intensidad = moviendose ? 1 : Math.max(0, 1 - (tiempoQuieto - MS_PARA_QUIETO) / MS_DESVANECER)

      if (moviendose && ahora - ultimaOnda >= MS_ENTRE_ONDAS) {
        ondas.push({ x: mouseX, y: mouseY, nacio: ahora })
        if (ondas.length > MAX_ONDAS) ondas.shift()
        ultimaOnda = ahora
      }

      ondas = intensidad > 0 ? ondas.filter((onda) => ahora - onda.nacio < VIDA_ONDA) : []

      for (const onda of ondas) {
        const avance = (ahora - onda.nacio) / VIDA_ONDA
        ctx.beginPath()
        ctx.arc(onda.x, onda.y, 2 + avance * RADIO_MAXIMO, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${mezclar(colores.inicio, colores.fin, avance)}, ${Math.pow(1 - avance, 1.6) * 0.7 * intensidad})`
        ctx.lineWidth = 1.4
        ctx.stroke()
      }

      if (intensidad > 0) {
        const brillo = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 90)
        brillo.addColorStop(0, `rgba(${colores.inicio.join(',')}, ${0.22 * intensidad})`)
        brillo.addColorStop(1, `rgba(${colores.inicio.join(',')}, 0)`)
        ctx.fillStyle = brillo
        ctx.fillRect(mouseX - 90, mouseY - 90, 180, 180)
      }

      return intensidad > 0
    }

    const pintar = (ahora) => {
      raf = 0
      const pasos = anterior ? Math.min((ahora - anterior) / (1000 / 60), 4) : 1
      anterior = ahora

      const flechaEnMovimiento = moverFlecha(pasos)
      const ondasActivas = pintarOndas(ahora)

      if (ondasActivas || flechaEnMovimiento) {
        raf = requestAnimationFrame(pintar)
      } else {
        anterior = 0
      }
    }

    const alMover = (evento) => {
      mouseX = evento.clientX
      mouseY = evento.clientY
      if (!dentro && !flecha.classList.contains('visible')) {
        flechaX = mouseX
        flechaY = mouseY
      }
      dentro = true
      if (Math.hypot(mouseX - ultimoX, mouseY - ultimoY) >= DISTANCIA_MINIMA) {
        ultimoX = mouseX
        ultimoY = mouseY
        ultimoMovimiento = performance.now()
      }
      flecha.classList.add('visible')
      flecha.classList.toggle('sobre-clicable', !!evento.target.closest?.(CLICABLES))
      if (!raf) raf = requestAnimationFrame(pintar)
    }

    const alSalir = () => {
      dentro = false
      flecha.classList.remove('visible')
      if (!raf) raf = requestAnimationFrame(pintar)
    }

    const alPresionar = () => flecha.classList.add('presionado')
    const alSoltar = () => flecha.classList.remove('presionado')

    const observador = new MutationObserver(() => {
      colores = leerColores()
    })
    observador.observe(raiz, { attributes: true, attributeFilter: ['data-theme'] })

    ajustar()
    window.addEventListener('resize', ajustar)
    window.addEventListener('mousemove', alMover)
    window.addEventListener('mousedown', alPresionar)
    window.addEventListener('mouseup', alSoltar)
    raiz.addEventListener('mouseleave', alSalir)

    return () => {
      cancelAnimationFrame(raf)
      observador.disconnect()
      window.removeEventListener('resize', ajustar)
      window.removeEventListener('mousemove', alMover)
      window.removeEventListener('mousedown', alPresionar)
      window.removeEventListener('mouseup', alSoltar)
      raiz.removeEventListener('mouseleave', alSalir)
      raiz.classList.remove('cursor-propio')
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="ola-cursor" aria-hidden="true" />
      <div ref={flechaRef} className="flecha-cursor" aria-hidden="true">
        <svg viewBox="0 0 32 36" width="32" height="36">
          <path d="M16 3 L28 32 L16 25 L4 32 Z" />
        </svg>
      </div>
    </>
  )
}

export default OlaCursor
