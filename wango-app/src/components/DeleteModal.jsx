function DeleteModal({ isOpen, onClose, onConfirm, cardNumber }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay activo">
      <div className="modal-contenido modal-confirmar" onClick={(e) => e.stopPropagation()}>
        <button className="cerrar-modal" onClick={onClose}>✕</button>
        <h3>¿Eliminar método de pago?</h3>
        <p>¿Estás seguro de que deseas eliminar la tarjeta terminada en {cardNumber?.slice(-4)}?</p>
        
        <div className="botones-confirmar">
          <button className="boton-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="boton-eliminar" onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal

