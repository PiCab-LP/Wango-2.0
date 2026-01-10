import { useState, useEffect } from 'react'

function LoadingScreen() {
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Verificar si ya se mostró antes (en esta sesión)
    if (sessionStorage.getItem('cargaCompletada')) {
      setShow(false)
      return
    }

    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 500)

    const hideTimer = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('cargaCompletada', 'true')
    }, 1000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!show) return null

  return (
    <div className={`pantalla-carga ${fadeOut ? 'ocultar' : ''}`}>
      <div className="contenedor-logo">
        <img src="/logos and imgs/ewallet.png" alt="logo-wango" />
        <h1>Wango</h1>
      </div>
    </div>
  )
}

export default LoadingScreen
