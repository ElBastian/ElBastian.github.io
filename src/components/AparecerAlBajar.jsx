import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const BLOQUES = [
  '.nav-enlaces',
  '.marco-portafolio',
  '.pie',
  '.resumen-titulo',
  '.resumen-tarjeta',
  '.contenedor-acerca > div',
  '.contenedor-proyectos > h1',
  '.proyecto',
  '.marco-cv',
  '.contacto-titulo',
  '.contacto-intro',
  '.contacto-tarjeta',
  '.pie-sitio',
].join(', ')

const SUBIR_BLOQUE = [
  { opacity: 0, transform: 'translateY(48px)' },
  { opacity: 1, transform: 'translateY(0)' },
]
const SUBIR_LETRA = [
  { opacity: 0, transform: 'translateY(1.1em)' },
  { opacity: 1, transform: 'translateY(0)' },
]
const SUAVIZADO = 'cubic-bezier(0.2, 0.7, 0.2, 1)'
const MS_BLOQUE = 700
const MS_LETRA = 520
const PORCION_VISIBLE = 0.15

const yaAparecieron = new WeakSet()

function revelar(bloque) {
  yaAparecieron.add(bloque)
  bloque.classList.remove('por-aparecer')
  bloque.animate(SUBIR_BLOQUE, { duration: MS_BLOQUE, easing: SUAVIZADO })
  bloque.querySelectorAll('.letra').forEach((letra) => {
    letra.animate(SUBIR_LETRA, {
      duration: MS_LETRA,
      delay: Number(letra.dataset.retraso),
      easing: SUAVIZADO,
      fill: 'backwards',
    })
  })
}

function introTerminando() {
  const capa = document.getElementById('intro-matrix')
  return !capa || capa.classList.contains('saliendo')
}

function AparecerAlBajar() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    if (!('IntersectionObserver' in window) || !Element.prototype.animate) return

    const bloques = Array.from(document.querySelectorAll(BLOQUES)).filter(
      (bloque) => !yaAparecieron.has(bloque),
    )
    bloques.forEach((bloque) => bloque.classList.add('por-aparecer'))

    let visor = null
    let espera = null

    const iniciar = () => {
      visor = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return
            visor.unobserve(entrada.target)
            revelar(entrada.target)
          })
        },
        { threshold: PORCION_VISIBLE },
      )
      bloques.forEach((bloque) => visor.observe(bloque))
    }

    const cuadro = requestAnimationFrame(() => {
      if (introTerminando()) {
        iniciar()
        return
      }
      espera = new MutationObserver(() => {
        if (!introTerminando()) return
        espera.disconnect()
        iniciar()
      })
      espera.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class'],
      })
    })

    return () => {
      cancelAnimationFrame(cuadro)
      espera?.disconnect()
      visor?.disconnect()
      bloques.forEach((bloque) => bloque.classList.remove('por-aparecer'))
    }
  }, [pathname])

  return null
}

export default AparecerAlBajar
