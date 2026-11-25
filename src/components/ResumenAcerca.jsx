import { Fragment } from 'react'
import Letras from './Letras.jsx'
import logoUvaq from '../assets/logoUVAQ.png'

// Contenido tomado del CV
const tecnicas = [
  {
    titulo: 'Lenguajes',
    icono: 'codigo',
    lista: [
      { nombre: 'JavaScript' },
      { nombre: 'PHP' },
      { nombre: 'HTML' },
      { nombre: 'CSS' },
      { nombre: 'Java' },
      { nombre: 'Python' },
    ],
  },
  {
    titulo: 'Bases de datos y herramientas',
    icono: 'datos',
    lista: [
      { nombre: 'MySQL' },
      { nombre: 'Git' },
      { nombre: 'GitHub' },
      { nombre: 'Docker', nivel: 'básico' },
    ],
  },
]

const blandas = [
  { nombre: 'Liderazgo', icono: 'bandera' },
  { nombre: 'Comunicación', icono: 'mensaje' },
  { nombre: 'Trabajo en equipo', icono: 'equipo' },
  { nombre: 'Empatía', icono: 'corazon' },
  { nombre: 'Proactividad', icono: 'rayo' },
  { nombre: 'Organización de eventos', icono: 'calendario' },
]

// "periodo" y "puntos" son opcionales: si se llenan, aparecen en la tarjeta
const educacion = [
  {
    carrera: 'Ingeniería en Sistemas y Seguridad Informática',
    institucion: 'Universidad Vasco de Quiroga (UVAQ)',
    periodo: '2024 – 2028 (esperado)',
    puntos: [
      {
        icono: 'codigo',
        partes: [
          'Construyo software en',
          { resaltar: 'Java, Python y JavaScript' },
          'pensando en la',
          { resaltar: 'seguridad' },
          'desde la primera línea de código.',
        ],
      },
      {
        icono: 'red',
        partes: [
          'Diseño y administro',
          { resaltar: 'redes' },
          'con routers y switches para que cada dato llegue a su destino.',
        ],
      },
      {
        icono: 'candado',
        partes: [
          'Exploro la',
          { resaltar: 'criptografía y la seguridad informática' },
          'para cifrar y proteger la información que más importa.',
        ],
      },
    ],
  },
  {
    carrera: 'Bachillerato Físico-Matemático',
    institucion: 'Universidad Vasco de Quiroga (UVAQ), campus Santo Tomás',
    periodo: 'Ingreso en 2021 – 2024',
    puntos: [
      {
        icono: 'funcion',
        partes: [
          'Me formé en',
          { resaltar: 'cálculo, geometría analítica, álgebra y física' },
          'llevando la teoría a la práctica en el laboratorio.',
        ],
      },
      {
        icono: 'idea',
        partes: [
          'Ahí fortalecí mi',
          { resaltar: 'pensamiento lógico' },
          'y mi forma de resolver problemas, y descubrí la',
          { resaltar: 'programación' },
          'por primera vez.',
        ],
      },
    ],
  },
]

// Trazos de los íconos (SVG propio, sin librerías)
const ICONOS = {
  codigo: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  datos: 'M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3ZM4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  bandera: 'M5 21V4M5 4h13l-3 4 3 4H5',
  mensaje: 'M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.8A8 8 0 1 1 21 12Z',
  equipo: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20a6.5 6.5 0 0 1 13 0M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.3a6.5 6.5 0 0 1 3.5 5.7',
  corazon: 'M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11Z',
  rayo: 'M13 2 4 14h7l-1 8 9-12h-7Z',
  calendario: 'M7 3v4M17 3v4M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
  libro: 'M12 6.5C10.5 5 8 4 4 4v15c4 0 6.5 1 8 2.5 1.5-1.5 4-2.5 8-2.5V4c-4 0-6.5 1-8 2.5ZM12 6.5v15',
  escuela: 'M3 21h18M5 21v-9M10 21v-9M14 21v-9M19 21v-9M3 9l9-6 9 6Z',
  red: 'M9 3h6v5H9ZM3 16h6v5H3ZM15 16h6v5h-6ZM12 8v4M6 16v-4h12v4',
  candado: 'M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1ZM8 11V7a4 4 0 0 1 8 0v4',
  funcion: 'M14 4c-2.5-.5-3.5 1-4 3l-2 10c-.4 2-1.6 3.4-4 3M6 10h7M15 13l5 6M20 13l-5 6',
  idea: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.2 1.1 2.2h5c0-1 .4-1.6 1.1-2.2A6 6 0 0 0 12 3Z',
}

function Icono({ nombre, tam = 20 }) {
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

// Encabezado de sección con su ícono
function Titulo({ icono, texto }) {
  return (
    <h2 className="resumen-titulo">
      <span className="resumen-titulo-icono">
        <Icono nombre={icono} tam={24} />
      </span>
      <Letras texto={texto} />
    </h2>
  )
}

// Habilidades y educación, arriba de la presentación en Acerca de mí
function ResumenAcerca() {
  return (
    <div className="resumen-acerca">
      <section>
        <Titulo icono="codigo" texto="Habilidades técnicas" />
        <div className="resumen-columnas">
          {tecnicas.map((grupo) => (
            <article className="resumen-tarjeta" key={grupo.titulo}>
              <h3>
                <span className="resumen-icono">
                  <Icono nombre={grupo.icono} />
                </span>
                <Letras texto={grupo.titulo} />
              </h3>
              <div className="resumen-linea" />
              <ul className="resumen-chips">
                {grupo.lista.map(({ nombre, nivel }) => (
                  <li key={nombre}>
                    <Letras texto={nombre} />
                    {nivel && (
                      <small>
                        <Letras texto={nivel} />
                      </small>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <Titulo icono="corazon" texto="Habilidades blandas" />
        <ul className="resumen-blandas">
          {blandas.map(({ nombre, icono }) => (
            <li className="resumen-tarjeta" key={nombre}>
              <span className="resumen-icono">
                <Icono nombre={icono} />
              </span>
              <Letras texto={nombre} />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Titulo icono="libro" texto="Educación" />
        <div className="educacion-lista">
          {educacion.map(({ carrera, institucion, periodo, puntos }) => (
            <article className="resumen-tarjeta resumen-educacion" key={carrera}>
              <div className="educacion-cabecera">
                <span className="educacion-logo">
                  <img src={logoUvaq} alt="Logo de la Universidad Vasco de Quiroga" />
                </span>
                <div>
                  <h3>
                    <Letras texto={carrera} />
                  </h3>
                  <p className="educacion-escuela">
                    <Icono nombre="escuela" tam={18} />
                    <Letras texto={institucion} />
                  </p>
                  {periodo && (
                    <span className="educacion-periodo">
                      <Icono nombre="calendario" tam={16} />
                      <Letras texto={periodo} />
                    </span>
                  )}
                </div>
              </div>

              {puntos && (
                <>
                  <div className="resumen-linea" />
                  <ul className="educacion-puntos">
                    {puntos.map(({ icono, partes }) => (
                      <li key={icono}>
                        <span className="resumen-icono">
                          <Icono nombre={icono} />
                        </span>
                        <span>
                          {partes.map((parte, i) => (
                            <Fragment key={i}>
                              {i > 0 && ' '}
                              {typeof parte === 'string' ? (
                                <Letras texto={parte} />
                              ) : (
                                <strong><Letras texto={parte.resaltar} /></strong>
                              )}
                            </Fragment>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ResumenAcerca
