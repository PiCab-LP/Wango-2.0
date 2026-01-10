import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Toast from '../components/Toast'
import UserInfoModal from '../components/UserInfoModal'

export default function Settings() {
  const [settings, setSettings] = useState({
    ayuda: true,
    promociones: true,
    ofertas: true
  })
  const [toast, setToast] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showUserModal, setShowUserModal] = useState(false)

  // LocalStorage
  useEffect(() => {
    const ayuda = localStorage.getItem('config-ayuda')
    const promociones = localStorage.getItem('config-promociones')
    const ofertas = localStorage.getItem('config-ofertas')

    setSettings({
      ayuda: ayuda === null ? true : ayuda === 'true',
      promociones: promociones === null ? true : promociones === 'true',
      ofertas: ofertas === null ? true : ofertas === 'true'
    })

    // Guardar valores por defecto si no existen
    if (ayuda === null) localStorage.setItem('config-ayuda', 'true')
    if (promociones === null) localStorage.setItem('config-promociones', 'true')
    if (ofertas === null) localStorage.setItem('config-ofertas', 'true')

    setIsLoading(false)
  }, [])

  //Guardar cambios con notis
  const handleToggle = (key) => {
    if (isLoading) return

    const newValue = !settings[key]
    setSettings(prev => ({
      ...prev,
      [key]: newValue
    }))
    localStorage.setItem(`config-${key}`, newValue.toString())

    //Mensajes de notis
    const messages = {
      ayuda: {
        on: '✅ Ya estás recibiendo consejos sobre Wango',
        off: '🔕 Dejaste de recibir consejos sobre Wango'
      },
      promociones: {
        on: '🎉 Ya estás recibiendo promociones de Wango',
        off: '🔕 Dejaste de recibir promociones de Wango'
      },
      ofertas: {
        on: '🎁 Ya estás recibiendo ofertas exclusivas de Wango',
        off: '🔕 Dejaste de recibir ofertas de Wango'
      }
    }

    const message = newValue ? messages[key].on : messages[key].off
    setToast({ message, showConfetti: false })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onUserClick={() => setShowUserModal(true)} />
      <Nav />
      
      <main className="contenido-configuracion" style={{ flex: 1 }}>
        <h2>Configuración</h2>
        <p>Gestiona los ajustes de Wango. Puedes cambiar tus preferencias en cualquier momento.</p>

        <section className="seccion-correo">
          <h3>Correo</h3>

          {/* Opción 1: Ayuda y solución de problemas */}
          <div className="opcion-toggle">
            <div className="texto-opcion">
              <h4>Ayuda y solución de problemas de Wango</h4>
              <p>
                Recibe consejos para solucionar problemas e información útil sobre cómo usar Wango, 
                además de cómo pagar online de forma rápida y segura
              </p>
            </div>
            <label className="switch-toggle">
              <input 
                type="checkbox" 
                checked={settings.ayuda}
                onChange={() => handleToggle('ayuda')}
              />
              <span className="slider-toggle"></span>
            </label>
          </div>

          {/* Opción 2: Novedades y promociones */}
          <div className="opcion-toggle">
            <div className="texto-opcion">
              <h4>Novedades y promociones en Wango</h4>
              <p>
                Recibe contenido promocional, recomendaciones y novedades en función de tu actividad en Wango
              </p>
            </div>
            <label className="switch-toggle">
              <input 
                type="checkbox" 
                checked={settings.promociones}
                onChange={() => handleToggle('promociones')}
              />
              <span className="slider-toggle"></span>
            </label>
          </div>

          {/* Opción 3: Novedades y ofertas */}
          <div className="opcion-toggle">
            <div className="texto-opcion">
              <h4>Novedades y ofertas de Wango</h4>
              <p>
                Recibe ofertas exclusivas, promociones y novedades sobre las funciones de Wango
              </p>
            </div>
            <label className="switch-toggle">
              <input 
                type="checkbox" 
                checked={settings.ofertas}
                onChange={() => handleToggle('ofertas')}
              />
              <span className="slider-toggle"></span>
            </label>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal de información del usuario */}
      {showUserModal && (
        <UserInfoModal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
        />
      )}

      {/* Toast de notificaciones */}
      {toast && (
        <Toast
          message={toast.message}
          showConfetti={toast.showConfetti}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
