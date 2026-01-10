import { useState } from 'react'

function AddCardModal({ isOpen, onClose, onSave, existingCards }) {
  const [numero, setNumero] = useState('')
  const [fecha, setFecha] = useState('')
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleNumeroChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    setNumero(value)
  }

  const handleFechaChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    
    if (value.length >= 2) {
      let mes = value.substring(0, 2)
      let anio = value.substring(2, 4)
      
      if (parseInt(mes) < 1) mes = '01'
      if (parseInt(mes) > 12) mes = '12'
      
      value = mes + (anio ? '/' + anio : '')
    }
    
    setFecha(value)
  }

  const handleCodigoChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    setCodigo(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Validaciones
    if (numero.length !== 16) {
      setError('⚠️ Ingresa los 16 dígitos de la tarjeta')
      return
    }

    if (fecha.length !== 5 || !fecha.includes('/')) {
      setError('⚠️ Ingresa la fecha en formato MM/AA')
      return
    }

    const mes = parseInt(fecha.split('/')[0])
    if (mes < 1 || mes > 12) {
      setError('⚠️ El mes debe estar entre 01 y 12')
      return
    }

    if (codigo.length !== 3) {
      setError('⚠️ El código debe tener 3 dígitos')
      return
    }

    // Verificar si la tarjeta ya existe
    if (existingCards.some(card => card.numero === numero)) {
      setError('⚠️ Esta tarjeta ya ha sido agregada')
      return
    }

    // Guardar tarjeta
    onSave({ numero, fecha, codigo })
    
    // Limpiar formulario
    setNumero('')
    setFecha('')
    setCodigo('')
    setError('')
  }

  const handleClose = () => {
    setNumero('')
    setFecha('')
    setCodigo('')
    setError('')
    onClose()
  }

  return (
    <div className="modal-overlay activo">
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <button className="cerrar-modal" onClick={handleClose}>✕</button>
        <h3>Añadir método de pago</h3>
        
        {error && <p style={{color: '#e74c3c', marginBottom: '1rem'}}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <label>Número de tarjeta *</label>
          <input
            type="text"
            value={numero}
            onChange={handleNumeroChange}
            maxLength="16"
            placeholder="1234567890123456"
            required
          />

          <label style={{marginTop: '1rem'}}>Fecha de vencimiento *</label>
          <input
            type="text"
            value={fecha}
            onChange={handleFechaChange}
            placeholder="MM/AA"
            maxLength="5"
            required
          />

          <label style={{marginTop: '1rem'}}>Código de seguridad *</label>
          <input
            type="text"
            value={codigo}
            onChange={handleCodigoChange}
            maxLength="3"
            placeholder="123"
            required
          />

          <button type="submit" className="boton-guardar">Guardar tarjeta</button>
        </form>
      </div>
    </div>
  )
}

export default AddCardModal
