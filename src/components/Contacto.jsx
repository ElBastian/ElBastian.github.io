import Letras from './Letras.jsx'

const medios = [
  {
    clase: 'whatsapp',
    etiqueta: 'WhatsApp',
    valor: '+52 443 376 3309',
    enlace: 'https://wa.me/524433763309',
    descripcion: 'Escribir por WhatsApp al +52 443 376 3309',
    externo: true,
  },
  {
    clase: 'instagram',
    etiqueta: 'Instagram',
    valor: '@bastian.s.lara',
    enlace: 'https://www.instagram.com/bastian.s.lara',
    descripcion: 'Ver mi perfil de Instagram @bastian.s.lara',
    externo: true,
  },
  {
    clase: 'github',
    etiqueta: 'GitHub',
    valor: 'github.com/ElBastian',
    enlace: 'https://github.com/ElBastian',
    descripcion: 'Ver mi perfil de GitHub',
    externo: true,
  },
  {
    clase: 'correo',
    etiqueta: 'Correo',
    valor: 's.shamed.lara@gmail.com',
    enlace: 'mailto:s.shamed.lara@gmail.com',
    descripcion: 'Enviar un correo a s.shamed.lara@gmail.com',
    externo: false,
  },
]

function IconoContacto({ clase }) {
  if (clase === 'github') {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
      </svg>
    )
  }

  const trazos = {
    whatsapp: 'M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3ZM9.3 8.2c-.4 3.3 3 6.8 6.5 6.6l.9-1.6-2.1-1-1 .8c-1.2-.5-2.2-1.5-2.7-2.7l.8-1-1-2.1Z',
    correo: 'M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1ZM3 7l9 6 9-6',
    instagram: 'M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5ZM12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6ZM17.2 6.8h.01',
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={trazos[clase]} />
    </svg>
  )
}

function Contacto() {
  return (
    <section className="contacto">
      <h2 className="contacto-titulo">
        <span className="resumen-titulo-icono">
          <IconoContacto clase="correo" />
        </span>
        <Letras texto="¡Hablemos!" />
      </h2>
      <p className="contacto-intro">
        <Letras texto="Será un gusto platicar contigo." />
      </p>

      <ul className="contacto-lista">
        {medios.map(({ clase, etiqueta, valor, enlace, descripcion, externo }) => (
          <li key={clase}>
            <a
              className="contacto-tarjeta"
              href={enlace}
              aria-label={descripcion}
              {...(externo ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <span className={`contacto-icono ${clase}`}>
                <IconoContacto clase={clase} />
              </span>
              <span className="contacto-texto">
                <span className="contacto-etiqueta">
                  <Letras texto={etiqueta} />
                </span>
                <span className="contacto-valor">
                  <Letras texto={valor} />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Contacto
