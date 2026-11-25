import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Sube el scroll al inicio cada vez que cambia la pestaña (ruta)
function ScrollArriba() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default ScrollArriba
