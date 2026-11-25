import Letras from '../components/Letras.jsx'
import fotoPerfil from '../assets/fotoPerfil.jpeg'
import cvEspanol from '../assets/CV_Sebastian_Lara_ES.pdf'
import cvIngles from '../assets/CV_Sebastian_Lara_EN.pdf'
import cvChino from '../assets/CV_Sebastian_Lara_ZH.pdf'
import cvHindi from '../assets/CV_Sebastian_Lara_HI.pdf'

const iconos = {
  birrete: 'M2 9l10-5 10 5-10 5ZM6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 9v6',
  maletin: 'M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1ZM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18',
  codigo: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  mundo: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z',
  estrella: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z',
  documento: 'M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM14 3v5h5M8 13h8M8 17h5',
  flecha: 'M9 6l6 6-6 6',
}

function Icono({ nombre, tam = 22 }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={iconos[nombre]} />
    </svg>
  )
}

const versiones = [
  { codigo: 'ES', etiqueta: 'Español', idioma: 'Español', archivo: cvEspanol },
  { codigo: 'EN', etiqueta: 'English', idioma: 'Inglés', archivo: cvIngles },
  { codigo: 'ZH', etiqueta: '中文', idioma: 'Chino mandarín', archivo: cvChino },
  { codigo: 'HI', etiqueta: 'हिन्दी', idioma: 'Hindi', archivo: cvHindi },
]

const secciones = [
  { icono: 'birrete', texto: 'Formación' },
  { icono: 'maletin', texto: 'Experiencia' },
  { icono: 'codigo', texto: 'Habilidades' },
  { icono: 'mundo', texto: 'Idiomas' },
]

function CV() {
  return (
    <div className="marco-cv">
      <div className="cv-cabecera">
        <div className="cv-ilustracion" aria-hidden="true">
          <div className="cv-hoja">
            <div className="cv-hoja-encabezado">
              <img src={fotoPerfil} alt="" />
              <div>
                <span className="cv-linea ancha fuerte" />
                <span className="cv-linea media" />
              </div>
            </div>
            <span className="cv-linea titulo" />
            <span className="cv-linea" />
            <span className="cv-linea corta" />
            <span className="cv-linea titulo" />
            <span className="cv-linea" />
            <span className="cv-linea media" />
            <div className="cv-hoja-chips">
              <span /><span /><span />
            </div>
          </div>
          <span className="cv-flotante f1"><Icono nombre="birrete" tam={20} /></span>
          <span className="cv-flotante f2"><Icono nombre="codigo" tam={20} /></span>
          <span className="cv-flotante f3"><Icono nombre="estrella" tam={18} /></span>
          <span className="cv-flotante f4"><Icono nombre="maletin" tam={18} /></span>
        </div>

        <div className="cv-info">
          <h1><Letras>Currículum</Letras></h1>

          <div className="cv-versiones">
            {versiones.map((version) => (
              <a className="cv-version" key={version.codigo} href={version.archivo}
                target="_blank" rel="noreferrer" aria-label={`Abrir CV en ${version.idioma}`}>
                <span className="cv-version-icono">
                  <Icono nombre="documento" tam={26} />
                  <b>{version.codigo}</b>
                </span>
                <span className="cv-version-nombre">
                  {version.etiqueta}
                  {version.etiqueta !== version.idioma && <small>{version.idioma}</small>}
                </span>
                <span className="cv-version-flecha"><Icono nombre="flecha" tam={20} /></span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <ul className="cv-secciones">
        {secciones.map((seccion) => (
          <li key={seccion.texto}>
            <span className="cv-seccion-icono"><Icono nombre={seccion.icono} /></span>
            {seccion.texto}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CV
