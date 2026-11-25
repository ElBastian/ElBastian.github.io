/*
 * Transición de tema "tinta que se esparce".
 *
 * La forma de la tinta está inspirada en ink-bleed-theme-changer
 * (https://github.com/codemure-official/ink-bleed-theme-changer, licencia MIT).
 * Aquí no se usa html2canvas ni WebGL: el navegador captura la página real con la
 * View Transitions API y la tinta es un clip-path: path() animado sobre
 * ::view-transition-new(root).
 */

// ===== Ajustes =====
const DURACION = 2000 // ms
const CUADROS = 40 // keyframes precalculados
const PUNTOS = 360 // puntos del contorno principal
const DIRECCIONES = 120 // direcciones donde se calcula la forma grande
const FILAMENTOS = 16
const GOTAS = 30
const TENDRIL_REACH = 0.42 // largo máximo de los filamentos (fracción de R)
const FIBRA_PX = 4 // amplitud del borde rasgado

const SEGMENTOS_FILAMENTO = 12
const LADOS_GOTA = 6

// ===== Ruido de gradiente 2D (Perlin) con semilla fija =====
const perm = new Uint8Array(512)
;(() => {
  const p = Array.from({ length: 256 }, (_, i) => i)
  let s = 1337
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647
    const j = s % (i + 1)
    ;[p[i], p[j]] = [p[j], p[i]]
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]
})()

const GRAD = [
  [1, 0], [-1, 0], [0, 1], [0, -1],
  [0.7071, 0.7071], [-0.7071, 0.7071], [0.7071, -0.7071], [-0.7071, -0.7071],
]
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10)

function perlin(x, y) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const X = xi & 255
  const Y = yi & 255
  const g = (ix, iy, dx, dy) => {
    const v = GRAD[perm[ix + perm[iy]] & 7]
    return v[0] * dx + v[1] * dy
  }
  const u = fade(xf)
  const v = fade(yf)
  const a = g(X, Y, xf, yf) + u * (g(X + 1, Y, xf - 1, yf) - g(X, Y, xf, yf))
  const b = g(X, Y + 1, xf, yf - 1) + u * (g(X + 1, Y + 1, xf - 1, yf - 1) - g(X, Y + 1, xf, yf - 1))
  return a + v * (b - a) // ~[-0.7, 0.7]
}

// fbm con rotación entre octavas (evita artefactos alineados a la rejilla)
const ROT_C = Math.cos(0.6)
const ROT_S = Math.sin(0.6)
function fbm(x, y, octavas) {
  let suma = 0
  let amp = 0.5
  let norma = 0
  for (let o = 0; o < octavas; o++) {
    suma += amp * perlin(x, y)
    norma += amp
    const nx = (x * ROT_C - y * ROT_S) * 2.03 + 17.1
    const ny = (x * ROT_S + y * ROT_C) * 2.03 + 3.7
    x = nx
    y = ny
    amp *= 0.5
  }
  return suma / norma
}

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
const smooth = (t) => {
  t = clamp(t, 0, 1)
  return t * t * (3 - 2 * t)
}

// ===== Construcción de la forma =====
function areaConSigno(pts) {
  let a = 0
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    a += (pts[j][0] - pts[i][0]) * (pts[j][1] + pts[i][1])
  }
  return a
}

function subtrazo(pts) {
  // Mismo sentido de giro en todos los subtrazos: con nonzero se suman y no hacen huecos
  if (areaConSigno(pts) < 0) pts.reverse()
  let d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1)
  for (let i = 1; i < pts.length; i++) {
    d += 'L' + pts[i][0].toFixed(1) + ' ' + pts[i][1].toFixed(1)
  }
  return d + 'Z'
}

function generarCuadros(cx, cy, maxDist) {
  // Variedad por clic
  const ox = Math.random() * 200
  const oy = Math.random() * 200
  const rot = Math.random() * Math.PI * 2

  const filamentos = Array.from({ length: FILAMENTOS }, () => ({
    angulo: Math.random() * Math.PI * 2,
    curl: (Math.random() - 0.5) * 1.4,
    ondas: 1.5 + Math.random() * 1.5,
    fase: Math.random() * Math.PI * 2,
    ancho: 0.7 + Math.random() * 0.6,
    semilla: Math.random() * 100,
    inicio: 0.04 + Math.random() * 0.12,
  }))

  const gotas = Array.from({ length: GOTAS }, () => ({
    angulo: Math.random() * Math.PI * 2,
    dist: (0.08 + Math.random() * 0.85) * maxDist,
    tam: 1.5 + Math.random() * 4,
    giro: Math.random() * Math.PI,
  }))

  // Lóbulos: solo dependen de la dirección (la gota es irregular desde chica)
  const lobulos = new Float32Array(DIRECCIONES)
  for (let i = 0; i < DIRECCIONES; i++) {
    const a = (i / DIRECCIONES) * Math.PI * 2 + rot
    lobulos[i] = fbm(Math.cos(a) * 1.4 + ox, Math.sin(a) * 1.4 + oy, 3)
  }

  // Fibra: ruido fino por punto, también fijo por dirección
  const fibra = new Float32Array(PUNTOS)
  for (let i = 0; i < PUNTOS; i++) {
    const a = (i / PUNTOS) * Math.PI * 2 + rot
    fibra[i] = fbm(Math.cos(a) * 14 + oy, Math.sin(a) * 14 + ox, 3)
  }

  const reach = new Float32Array(DIRECCIONES)
  const cuadros = []

  for (let k = 0; k <= CUADROS; k++) {
    const lin = k / CUADROS
    const avance = 0.45 * lin + 0.55 * easeInOutQuad(lin)
    const R = avance * maxDist * 0.7
    const t = lin * 1.6 // "hervor" de la forma
    const cleanup =
      Math.pow(Math.max(0, (lin - 0.45) / 0.55), 2) * maxDist * 0.4 +
      Math.max(0, (lin - 0.97) / 0.03) * maxDist

    // Forma grande en DIRECCIONES direcciones
    for (let i = 0; i < DIRECCIONES; i++) {
      const a = (i / DIRECCIONES) * Math.PI * 2 + rot
      const qx = Math.cos(a) * 1.8 + ox
      const qy = Math.sin(a) * 1.8 + oy
      const wx = fbm(qx + t * 0.3, qy + 5.2, 3)
      const wy = fbm(qx + 1.7, qy + 9.2 - t * 0.3, 3)
      const blob = fbm(qx + 1.5 * wx + t * 0.2, qy + 1.5 * wy, 5)
      reach[i] = clamp(1 + 0.22 * 1.6 * lobulos[i] + 0.2 * 1.5 * blob, 0.58, 1.42)
    }

    const radioEn = (ang) => {
      let f = ((ang / (Math.PI * 2)) % 1 + 1) % 1
      f *= DIRECCIONES
      const i0 = Math.floor(f) % DIRECCIONES
      const i1 = (i0 + 1) % DIRECCIONES
      const m = f - Math.floor(f)
      return R * (reach[i0] + (reach[i1] - reach[i0]) * m) + cleanup
    }

    const partes = []

    // Contorno principal
    const fibraAmp = FIBRA_PX * Math.min(1, R / 120)
    const principal = []
    for (let i = 0; i < PUNTOS; i++) {
      const a = (i / PUNTOS) * Math.PI * 2
      const r = Math.max(0, radioEn(a) + fibra[i] * 2 * fibraAmp)
      principal.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
    }
    partes.push(subtrazo(principal))

    // Filamentos
    for (const f of filamentos) {
      const gate = smooth((lin - f.inicio) / 0.12) * (1 - smooth((lin - 0.82) / 0.15))
      const n = (fbm(f.semilla, t * 0.8, 2) + 0.7) / 1.4
      const L = TENDRIL_REACH * R * gate * (0.35 + 0.65 * clamp(n, 0, 1))
      const base = Math.max(0, radioEn(f.angulo) - 2)
      const dx = Math.cos(f.angulo)
      const dy = Math.sin(f.angulo)
      const nx = -dy
      const ny = dx
      const anchoBase = (2 + 0.06 * L) * f.ancho
      const izq = []
      const der = []
      for (let s = 0; s <= SEGMENTOS_FILAMENTO; s++) {
        const u = s / SEGMENTOS_FILAMENTO
        const lateral =
          f.curl * L * 0.5 * u * u + Math.sin(u * Math.PI * f.ondas + f.fase + t * 3) * L * 0.09 * u
        const px = cx + dx * (base + u * L) + nx * lateral
        const py = cy + dy * (base + u * L) + ny * lateral
        // Se afina hasta la punta, con un ensanche suave en la base
        const w = (anchoBase * Math.pow(1 - u, 1.2) + anchoBase * 1.2 * Math.exp(-u * 7)) * (L > 0 ? 1 : 0)
        izq.push([px + nx * w, py + ny * w])
        der.push([px - nx * w, py - ny * w])
      }
      partes.push(subtrazo(izq.concat(der.reverse())))
    }

    // Gotitas: fijas en el espacio, aparecen delante del frente y son absorbidas
    const ventana = 18 + 0.06 * R
    for (const g of gotas) {
      const hueco = g.dist - radioEn(g.angulo)
      const visible = hueco > 0 && hueco < ventana && lin < 0.97
      const r = visible ? g.tam * Math.sqrt(1 - hueco / ventana) : 0
      const gx = cx + Math.cos(g.angulo) * g.dist
      const gy = cy + Math.sin(g.angulo) * g.dist
      const pts = []
      for (let s = 0; s < LADOS_GOTA; s++) {
        const a = g.giro + (s / LADOS_GOTA) * Math.PI * 2
        pts.push([gx + Math.cos(a) * r, gy + Math.sin(a) * r])
      }
      partes.push(subtrazo(pts))
    }

    cuadros.push({ offset: lin, clipPath: `path(nonzero, "${partes.join('')}")` })
  }

  return cuadros
}

let enCurso = false

// Los cuadros se calculan por adelantado (en tiempo libre) para que el clic no se trabe
let cache = null

function geometria(botonOrigen) {
  let cx = window.innerWidth / 2
  let cy = window.innerHeight / 2
  if (botonOrigen) {
    const caja = botonOrigen.getBoundingClientRect()
    cx = caja.left + caja.width / 2
    cy = caja.top + caja.height / 2
  }
  const maxDist = Math.hypot(
    Math.max(cx, window.innerWidth - cx),
    Math.max(cy, window.innerHeight - cy),
  )
  return { cx, cy, maxDist, clave: `${Math.round(cx)},${Math.round(cy)},${window.innerWidth},${window.innerHeight}` }
}

const enTiempoLibre = (fn) =>
  window.requestIdleCallback ? window.requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200)

let pendiente = 0
export function precalcularTinta(botonOrigen) {
  if (typeof document === 'undefined') return
  const id = ++pendiente
  enTiempoLibre(() => {
    if (id !== pendiente || enCurso) return
    const g = geometria(botonOrigen)
    if (cache && cache.clave === g.clave) return
    cache = { clave: g.clave, cuadros: generarCuadros(g.cx, g.cy, g.maxDist) }
  })
}

// Color de fondo que tendrá la página con el tema nuevo. El tema se cambia y se regresa
// en el mismo instante, así que no llega a pintarse.
function fondoDelTemaNuevo() {
  const raiz = document.documentElement
  const actual = raiz.getAttribute('data-theme')
  raiz.setAttribute('data-theme', actual === 'light' ? 'dark' : 'light')
  const color = getComputedStyle(document.body).backgroundColor
  if (actual === null) raiz.removeAttribute('data-theme')
  else raiz.setAttribute('data-theme', actual)
  return color
}

// Para navegadores sin View Transitions (Safari < 18, Chrome viejo y los navegadores de
// algunas marcas de celular): una capa del color del tema nuevo se esparce como tinta,
// el tema cambia debajo de ella y la capa se desvanece.
function tintaConCapa(aplicar, botonOrigen, g, cuadros) {
  const capa = document.createElement('div')
  capa.setAttribute('aria-hidden', 'true')
  Object.assign(capa.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '2147483647',
    pointerEvents: 'none',
    backgroundColor: fondoDelTemaNuevo(),
  })
  // En <html> y no en <body>: el filter del body haría que la capa se mueva con el scroll
  document.documentElement.appendChild(capa)

  // Si el navegador no entiende clip-path: path(), la tinta es un círculo que crece
  const conTrazo = window.CSS?.supports?.('clip-path', 'path("M0 0L1 0L1 1Z")')
  const forma = conTrazo
    ? cuadros
    : [
        { clipPath: `circle(0px at ${g.cx}px ${g.cy}px)` },
        { clipPath: `circle(${g.maxDist}px at ${g.cx}px ${g.cy}px)` },
      ]

  let aplicado = false
  const aplicarUnaVez = () => {
    if (!aplicado) aplicar()
    aplicado = true
  }

  capa
    .animate(forma, { duration: DURACION, easing: conTrazo ? 'linear' : 'ease-in-out', fill: 'forwards' })
    .finished.then(() => {
      aplicarUnaVez()
      return capa.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 350,
        easing: 'ease-out',
        fill: 'forwards',
      }).finished
    })
    .catch(aplicarUnaVez)
    .finally(() => {
      capa.remove()
      enCurso = false
      precalcularTinta(botonOrigen)
    })
}

export function cambiarTemaConTinta(aplicar, botonOrigen) {
  if (enCurso) return
  // Navegador sin Web Animations: el tema cambia al instante
  if (!Element.prototype.animate) {
    aplicar()
    return
  }
  enCurso = true

  const g = geometria(botonOrigen)
  const cuadros =
    cache && cache.clave === g.clave ? cache.cuadros : generarCuadros(g.cx, g.cy, g.maxDist)
  cache = null

  if (!document.startViewTransition) {
    tintaConCapa(aplicar, botonOrigen, g, cuadros)
    return
  }

  let animacion = null
  const transicion = document.startViewTransition(aplicar)
  transicion.ready
    .then(() => {
      animacion = document.documentElement.animate(cuadros, {
        duration: DURACION,
        easing: 'linear',
        pseudoElement: '::view-transition-new(root)',
        fill: 'both',
      })
    })
    .catch(() => {})
  transicion.finished.finally(() => {
    // Una animación con fill 'both' se queda viva al terminar; se cancela para que
    // no se acumule y no frene las siguientes transiciones
    if (animacion) animacion.cancel()
    enCurso = false
    // Prepara la siguiente mancha (con otra forma aleatoria)
    precalcularTinta(botonOrigen)
  })
}

if (typeof window !== 'undefined') {
  window.cambiarTemaConTinta = cambiarTemaConTinta
}
