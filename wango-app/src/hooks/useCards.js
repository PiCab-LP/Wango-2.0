import { useState, useEffect } from 'react'

export function useCards() {
  const [cards, setCards] = useState([])
  const [totalBalance, setTotalBalance] = useState(0)

  // Cargar tarjetas desde localStorage al inicio
  useEffect(() => {
    const savedCards = localStorage.getItem('tarjetasWango')
    if (savedCards) {
      const parsedCards = JSON.parse(savedCards)
      setCards(parsedCards)
      
      // Calcular saldo total
      const total = parsedCards.reduce((sum, card) => sum + card.saldo, 0)
      setTotalBalance(total)
    }
  }, [])

  // Agregar tarjeta
  const addCard = (cardData) => {
    const newCard = {
      ...cardData,
      saldo: Math.floor(Math.random() * 1000) + 1, // Saldo aleatorio entre 1-1000
      alias: cardData.alias || 'Visa Debito Clasica Compras'
    }
    
    const updatedCards = [...cards, newCard]
    setCards(updatedCards)
    setTotalBalance(totalBalance + newCard.saldo)
    localStorage.setItem('tarjetasWango', JSON.stringify(updatedCards))
    
    return newCard
  }

  // Eliminar tarjeta
  const deleteCard = (cardNumber) => {
    const cardToDelete = cards.find(c => c.numero === cardNumber)
    const updatedCards = cards.filter(c => c.numero !== cardNumber)
    
    setCards(updatedCards)
    setTotalBalance(totalBalance - cardToDelete.saldo)
    localStorage.setItem('tarjetasWango', JSON.stringify(updatedCards))
  }

  // Actualizar alias de tarjeta
const updateCardAlias = (cardNumber, newAlias) => {
  const updatedCards = cards.map(card =>
    card.numero === cardNumber
      ? { ...card, alias: newAlias }
      : card
  )
  
  setCards(updatedCards)
  localStorage.setItem('tarjetasWango', JSON.stringify(updatedCards))
}

return {
  cards,
  totalBalance,
  addCard,
  deleteCard,
  updateCardAlias,
}
}
