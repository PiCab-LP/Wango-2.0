import { useEffect } from 'react'

function Toast({ message, onClose, showConfetti = false }) {
  useEffect(() => {

    const timer = setTimeout(() => {
      onClose()
    }, 2000)

    // Crear confeti si es necesario
    if (showConfetti) {
      createConfetti()
    }

    return () => clearTimeout(timer)
  }, [onClose, showConfetti])

  const createConfetti = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa07a', '#98d8c8', '#f7dc6f']
    
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'confeti'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.animationDelay = Math.random() * 0.5 + 's'
      document.body.appendChild(confetti)
      
      setTimeout(() => confetti.remove(), 3000)
    }
  }

  return (
    <div className="notificacion-toast mostrar">
      {message}
    </div>
  )
}

export default Toast
