import Letras from '../components/Letras.jsx'
import cvEspanol from '../assets/CV_Sebastian_Lara_ES.pdf'
import cvIngles from '../assets/CV_Sebastian_Lara_EN.pdf'

const versiones = [
  { etiqueta: 'Español', archivo: cvEspanol },
  { etiqueta: 'English', archivo: cvIngles },
]

function CV() {
  return (
    <div className="marco-cv">
      <h1><Letras>Currículum</Letras></h1>

      <div className="cv-controles">
        <div className="cv-idiomas">
          {versiones.map((version) => (
            <a key={version.etiqueta} href={version.archivo} target="_blank" rel="noreferrer">
              <Letras texto={version.etiqueta} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CV
