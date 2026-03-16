'use client'
import { createContext, useContext, useState, useCallback } from 'react'
import { createCheckout } from '../lib/shopify'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [checkingOut, setCheckingOut] = useState(false)

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.findIndex(i => i.name === product.name)
      if (existing >= 0) {
        const next = [...prev]
        next[existing] = { ...next[existing], quantity: (next[existing].quantity || 1) + 1 }
        return next
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setTimeout(() => setIsOpen(true), 300)
  }, [])

  const removeFromCart = useCallback((index) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const checkout = useCallback(async () => {
    if (cart.length === 0) return

    // If any item has a variantId, use real Shopify checkout
    const hasVariantIds = cart.some(i => i.variantId)

    if (hasVariantIds) {
      try {
        setCheckingOut(true)
        const shopifyCheckout = await createCheckout(cart)
        if (shopifyCheckout?.webUrl) {
          window.location.href = shopifyCheckout.webUrl
          return
        }
      } catch (err) {
        console.error('Shopify checkout error:', err)
        // Fall through to Shopify store fallback
      } finally {
        setCheckingOut(false)
      }
    }

    // Fallback: redirect to Shopify store
    window.location.href = 'https://5ad7b8-76.myshopify.com'
  }, [cart])

  const total = cart.reduce((sum, item) => {
    return sum + (parseFloat(item.price?.replace(/[^0-9.]/g, '')) || 0) * (item.quantity || 1)
  }, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, openCart, closeCart, isOpen, total, checkout, checkingOut }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

