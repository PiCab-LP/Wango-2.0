import { useState } from 'react';
import { useCards } from '../hooks/useCards';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import AddCardModal from '../components/AddCardModal';
import DeleteModal from '../components/DeleteModal';
import ToastConfirmModal from '../components/ToastConfirmModal';
import UserInfoModal from '../components/UserInfoModal';

export default function PaymentMethods() {
  const { cards, addCard, deleteCard, updateCardAlias } = useCards();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showAliasModal, setShowAliasModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  
  const [toast, setToast] = useState(null);
  const [aliasForm, setAliasForm] = useState('');

  const showNotification = (message, showConfetti = false) => {
    setToast({ message, showConfetti });
  };

  const handleAddCard = (cardData) => {
    addCard(cardData);
    setShowAddModal(false);
    showNotification('✅ Tarjeta agregada con éxito', false);
  };

  const handleDeleteCard = () => {
    deleteCard(cardToDelete);
    setShowDeleteModal(false);
    setCardToDelete(null);
    showNotification('✓ Tarjeta eliminada');
  };

  const handleChangeAlias = () => {
    const trimmedAlias = aliasForm.trim();
    
    if (!trimmedAlias) {
      showNotification('⚠️ El alias no puede estar vacío');
      return;
    }

    if (trimmedAlias.length < 3) {
      showNotification('⚠️ El alias debe tener al menos 3 caracteres');
      return;
    }

    updateCardAlias(selectedCard.numero, trimmedAlias);
    
    setShowAliasModal(false);
    setAliasForm('');
    setSelectedCard(null);
    
    showNotification('✓ Alias actualizado con éxito');
  };

  const openDeleteModal = (card) => {
    setCardToDelete(card.numero);
    setShowDeleteModal(true);
  };

  const openBalanceModal = (card) => {
    setSelectedCard(card);
    setShowBalanceModal(true);
  };

  const openAliasModal = (card) => {
    setSelectedCard(card);
    setAliasForm(card.alias || 'Visa Debito Clasica Compras');
    setShowAliasModal(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onUserClick={() => setShowUserModal(true)} />
      <Nav />
      
      <main className="contenido-metodos-pago" style={{ flex: 1 }}>
        <h1>Métodos de pago</h1>
        <p className="descripcion-metodos">
          Añade, consulta y gestiona los métodos de pago guardados en Wango
        </p>

        <button 
          className="boton-agregar-metodo"
          onClick={() => setShowAddModal(true)}
        >
          Añadir método de pago
        </button>

        {cards.length > 0 && (
          <div className="lista-tarjetas">
            {cards.map(card => (
              <div key={card.numero} className="tarjeta-item">
                <div className="tarjeta-info">
                  <div className="tarjeta-icono">
                    <img src="/logos and imgs/tarjeta-de-credito.png" alt="Tarjeta" />
                  </div>
                  <div className="tarjeta-detalles">
                    <h3>{card.alias || 'Visa Debito Clasica Compras'}</h3>
                    <p>•••• •••• •••• {card.numero.slice(-4)}</p>
                    <p className="tarjeta-fecha">{card.fecha}</p>
                  </div>
                </div>
                <div className="tarjeta-acciones">
                  <button onClick={() => openBalanceModal(card)}>
                    💰 Ver saldo
                  </button>
                  <button onClick={() => openAliasModal(card)}>
                    ✏️ Editar alias
                  </button>
                  <button onClick={() => openDeleteModal(card)} className="boton-eliminar">
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <aside className="nota-informativa">
          <svg style={{width: '30px', height: '30px', flexShrink: 0, marginTop: '0.25rem'}} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p>Todos los métodos de pagos que coloques o veas en la lista serán usados para sumar a tu balance general en la aplicación.</p>
        </aside>
      </main>

      <Footer />

      {showUserModal && (
        <UserInfoModal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
        />
      )}

      {showAddModal && (
        <AddCardModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCard}
          existingCards={cards}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteCard}
          cardNumber={cardToDelete}
        />
      )}

    {showBalanceModal && selectedCard && (
    <div className="modal-overlay activo">
        <div className="modal-contenido modal-contenido-pequeño" onClick={(e) => e.stopPropagation()}>
        <button className="cerrar-modal" onClick={() => setShowBalanceModal(false)}>✕</button>
        <h2>Saldo de la tarjeta</h2>
        <div style={{ padding: '20px 0' }}>
            <p style={{ marginBottom: '10px', color: '#666' }}>
            {selectedCard.alias || 'Visa Debito Clasica Compras'} •••• {selectedCard.numero.slice(-4)}
            </p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2ecc71' }}>
            S/. {selectedCard.saldo.toFixed(2)}
            </p>
        </div>
        <button 
            className="boton-confirmar" 
            onClick={() => setShowBalanceModal(false)}
            style={{ width: '100%' }}
        >
            Cerrar
        </button>
        </div>
    </div>
    )}
      {showAliasModal && (
        <ToastConfirmModal
          title="Editar alias"
          onClose={() => {
            setShowAliasModal(false);
            setAliasForm('');
            setSelectedCard(null);
          }}
          onConfirm={handleChangeAlias}
        >
          <input
            type="text"
            placeholder="Nuevo alias (mínimo 3 caracteres)"
            value={aliasForm}
            onChange={(e) => setAliasForm(e.target.value)}
            className="input-modal"
            autoFocus
          />
        </ToastConfirmModal>
      )}

      {toast && (
        <Toast
          message={toast.message}
          showConfetti={toast.showConfetti}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
