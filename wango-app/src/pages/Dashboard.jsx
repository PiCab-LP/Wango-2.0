import { useState, useEffect } from 'react'
import { useCards } from '../hooks/useCards'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen'
import UserInfoModal from '../components/UserInfoModal'
import AddCardModal from '../components/AddCardModal'
import DeleteModal from '../components/DeleteModal'
import Toast from '../components/Toast'

function Dashboard() {
  const { cards, totalBalance, addCard, deleteCard } = useCards()
  
  const [showUserModal, setShowUserModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [cardToDelete, setCardToDelete] = useState(null)
  const [toast, setToast] = useState(null)
  const [saldoOculto, setSaldoOculto] = useState(false)
  const [paymentLink, setPaymentLink] = useState('')

  //  Generar código aleatorio de 7 caracteres
  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code = ''
    for (let i = 0; i < 7; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  }

  // Generar link inicial al cargar el componente
  useEffect(() => {
    setPaymentLink(`Wango.wallet.com/${generateCode()}`)
  }, [])

  const handleAddCard = (cardData) => {
    addCard(cardData)
    setShowAddModal(false)
    setToast({ message: '✅ Tarjeta agregada exitosamente', showConfetti: true })
  }

  const handleDeleteClick = (cardNumber) => {
    setCardToDelete(cardNumber)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    deleteCard(cardToDelete)
    setShowDeleteModal(false)
    setCardToDelete(null)
    setToast({ message: '🗑️ Tarjeta eliminada correctamente', showConfetti: false })
  }

  // Copiar link REAL al portapapeles
  const handleCopiarLink = () => {
    navigator.clipboard.writeText(paymentLink)
      .then(() => {
        setToast({ message: '📋 Link copiado al portapapeles', showConfetti: false })
      })
      .catch(() => {
        setToast({ message: '⚠️ Error al copiar link', showConfetti: false })
      })
  }

  // Generar NUEVO link de pago
  const handleGenerarLink = () => {
    const newLink = `Wango.wallet.com/${generateCode()}`
    setPaymentLink(newLink)
    setToast({ message: '🎉 ¡Has generado otro link de pago con éxito!', showConfetti: true })
  }

  return (
    <>
      <LoadingScreen />
      
      <div className="contenedor-principal">
        <Header onUserClick={() => setShowUserModal(true)} />
        <Nav />

        <main className="contenido-principal">
          <div className="contenido-izquierdo">
            {/* Sección Saldo */}
            <section className="seccion-saldo">
              <p className="saldo-label">Saldo disponible</p>
              <div className="saldo-monto-contenedor">
                <h2 className="saldo-monto">
                  {saldoOculto ? 'S/. ••••••' : `S/. ${totalBalance.toFixed(2)}`}
                </h2>
                <button 
                  className="boton-ocultar-saldo"
                  onClick={() => setSaldoOculto(!saldoOculto)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
              <div className="saldo-acciones">
                <button className="boton-copiar-link" onClick={handleCopiarLink}>
                  Copiar link de pago
                </button>
                <button className="boton-generar-link" onClick={handleGenerarLink}>
                  Generar otro link de pago
                </button>
              </div>
            </section>

            {/* Métodos de Pago */}
            <section className={`seccion-metodos-pago ${cards.length === 0 ? 'vacio' : ''}`}>
              <h2>Métodos de pago</h2>
              <p>Añade, consulta y gestiona los métodos de pago que se pueden usar con Wango</p>
              <div className="contenedor-tarjetas" id="contenedorTarjetas">
                {cards.map((card) => (
                  <div key={card.numero} className="tarjeta-contenedor">
                    <img src="/logos and imgs/tarjeta-de-credito.png" alt="tarjeta" />
                    <div className="tarjeta-info">
                      <p>{card.alias || 'Visa Debito Clasica Compras'} •••• {card.numero.slice(-4)}</p>
                      <p>{card.fecha}</p>
                    </div>
                    <button 
                      className="boton-eliminar-tarjeta"
                      onClick={() => handleDeleteClick(card.numero)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button 
                className="boton-anadir-metodo"
                onClick={() => setShowAddModal(true)}
              >
                Añadir método de pago
              </button>
            </section>

            {/* Transacciones Recientes */}
            <section className="seccion-transacciones">
              <h2>Transacciones recientes</h2>
              <p>No hay transacciones que mostrar. Cuando empieces a hacer transacciones compartidas con Wango, las encontrarás aquí.</p>
              <a href="#">Más información sobre las transacciones</a>
              <img src="/logos and imgs/hora.png" alt="reloj" />
            </section>

            {/* Preguntas Frecuentes */}
            <section className="seccion-preguntas">
              <h2>¿Tienes alguna pregunta?</h2>
              <details className="pregunta-item">
                <summary>¿Qué es Wango y cuál es su principal función?</summary>
                <p>Es una aplicación que genera links de pago temporales y seguros que desaparecen después de cada compra.</p>
              </details>
              <details className="pregunta-item">
                <summary>¿Qué problema busca resolver Wango?</summary>
                <p>Evita tener que ingresar repetidamente los datos de tarjetas en diferentes sitios, reduciendo riesgos de seguridad y ahorrando tiempo.</p>
              </details>
              <details className="pregunta-item">
                <summary>¿Qué tipos de tarjetas puedo agregar en Wango?</summary>
                <p>Acepta todo tipo de tarjetas físicas de cualquier red de pago (Visa, Mastercard, American Express, Diners Club, etc.), excepto tarjetas virtuales.</p>
              </details>
              <details className="pregunta-item">
                <summary>¿En donde puedo utilizar Wango?</summary>
                <p>Puedes usarla en cualquier aplicación, ecommerce o tienda virtual que acepte las mismas redes de pago de tu tarjeta (Visa, Mastercard, etc.)</p>
              </details>
              <details className="pregunta-item">
                <summary>¿Qué funcionalidades principales ofrece Wango al usuario?</summary>
                <p>Permite agregar tarjetas, métodos de pago, revisar información y generar links de pago ilimitadamente.</p>
              </details>
              <details className="pregunta-item">
                <summary>¿Tienes más preguntas?</summary>
                <p>Para los métodos de pago y las transacciones, ve al Centro de Ayuda de Wango. Para las tarjetas de regalo, ve al Centro de Ayuda de Wango.</p>
              </details>
            </section>
          </div>

          {/* Barra Lateral */}
          <aside className="barra-lateral">
            <section className="tarjeta-ayuda">
              <div className="fondo-1">
                <img src="https://www.gstatic.com/gpay/web/upsell_rtp.svg" alt="ilustración" />
              </div>
              <h3>Paga más rápido con Wango</h3>
              <p>No tienes que seguir escribiendo tus datos para pagos. Cuando hayas guardado tus tarjetas, solo genera un link de pago y ¡Listo!</p>
              <a href="#">Ver cómo funciona</a>
            </section>
          </aside>
        </main>

        <Footer />
      </div>

      <UserInfoModal 
        isOpen={showUserModal} 
        onClose={() => setShowUserModal(false)} 
      />
      
      <AddCardModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddCard}
        existingCards={cards}
      />
      
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        cardNumber={cardToDelete}
      />

      {toast && (
        <Toast
          message={toast.message}
          showConfetti={toast.showConfetti}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}

export default Dashboard

