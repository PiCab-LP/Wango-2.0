export default function ToastConfirmModal({ title, children, onClose, onConfirm }) {
  return (
    <div className="modal-overlay activo">
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <button className="cerrar-modal" onClick={onClose}>✕</button>
        <h2>{title}</h2>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-acciones-separadas">
          <button className="boton-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="boton-confirmar" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
