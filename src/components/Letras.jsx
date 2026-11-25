const MS_ENTRE_LETRAS = 14
const MS_CASCADA_MAX = 700

const segmentador = typeof Intl !== 'undefined' && Intl.Segmenter
  ? new Intl.Segmenter('es', { granularity: 'grapheme' })
  : null

const separarLetras = (palabra) =>
  segmentador ? Array.from(segmentador.segment(palabra), (s) => s.segment) : Array.from(palabra)

function partirTexto(texto) {
  let indice = 0
  return texto
    .split(/\s+/)
    .filter(Boolean)
    .map((palabra) => separarLetras(palabra).map((letra) => ({ letra, indice: indice++ })))
}

function Letras({ texto, children }) {
  const contenido = String(texto ?? children)
  const palabras = partirTexto(contenido)
  const total = palabras.flat().length
  const paso = Math.min(MS_ENTRE_LETRAS, MS_CASCADA_MAX / Math.max(total, 1))

  return (
    <span className="texto-letras">
      <span className="solo-lector">{contenido}</span>
      <span aria-hidden="true">
        {palabras.map((palabra, p) => (
          <span key={p}>
            <span className="palabra-letras">
              {palabra.map(({ letra, indice }) => (
                <span
                  className="letra"
                  key={indice}
                  data-retraso={Math.round(indice * paso)}
                  style={{ '--avance': total > 1 ? indice / (total - 1) : 0 }}
                >
                  {letra}
                </span>
              ))}
            </span>
            {p < palabras.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </span>
  )
}

export default Letras
