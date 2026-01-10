function UserInfoModal({ isOpen, onClose }) {
    if (!isOpen) return null

    return (
        <div className="modal-overlay activo">
            <div className="modal-contenido modal-usuario" onClick={(e) => e.stopPropagation()}>
                <button className="cerrar-modal" onClick={onClose}>✕</button>
                
                <div className="usuario-avatar">
                    <img src="/logos and imgs/usuario.png" alt="usuario" />
                </div>
                
                <h3>Luis Pinedo Cabanillas</h3>
                
                <div className="info-usuario">
                    <div className="campo-info">
                        <span className="etiqueta">Dirección:</span>
                        <span className="valor">Av. Los Fresnos 456, Mesa, Arizona</span>
                    </div>
                    
                    <div className="campo-info">
                        <span className="etiqueta">Fecha de creación:</span>
                        <span className="valor">15 de Marzo, 2024</span>
                    </div>
                    
                    <div className="campo-info">
                        <span className="etiqueta">ID de Wango:</span>
                        <span className="valor id-wango">WGO-7834-MXKL-9261</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfoModal

