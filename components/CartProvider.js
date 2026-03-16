'use client'
import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const addToCart = useCallback((product) => {
    setCart(prev => [...prev, product])
    setTimeout(() => setIsOpen(true), 300)
  }, [])

  const removeFromCart = useCallback((index) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const total = cart.reduce((sum, item) => {
    return sum + (parseFloat(item.price?.replace(/[^0-9.]/g, '')) || 0)
  }, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, openCart, closeCart, isOpen, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
