# Portafolio de Sebastián Lara

Sitio personal hecho con React + Vite, publicado en GitHub Pages.

## Estructura

```
index.html            Entrada de Vite (no editar el contenido aquí)
public/               Archivos que se copian tal cual (favicon)
src/
  main.jsx            Arranca React
  App.jsx             Rutas del sitio
  components/         Piezas reutilizables (Navbar)
  pages/              Una página por archivo (Inicio, Acerca, Proyectos, CV)
  assets/             Imágenes
  styles/global.css   Estilos del sitio
.github/workflows/    Publica el sitio en GitHub Pages al hacer push a main
```

## Comandos

- `npm install` — instala dependencias
- `npm run dev` — servidor local con recarga automática
- `npm run build` — genera el sitio final en `dist/`
- `npm run lint` — revisa el código
