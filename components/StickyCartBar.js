'use client'
import { useCart } from './CartProvider'
import { useEffect, useState } from 'react'

export default function StickyCartBar() {
  const { addToCart } = useCart()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`sticky-cart${visible ? ' visible' : ''}`} aria-live="polite">
      <img
        src="/wellness-over-everything/images/magnesium.jpg"
        alt=""
        style={{width:'48px',height:'48px',borderRadius:'12px',objectFit:'contain',background:'var(--cream)',padding:'4px',flexShrink:0}}
      />
      <div className="sticky-cart-info">
        <div className="sticky-cart-name">Magnesium Glycinate</div>
        <div className="sticky-cart-price">$26.90 · Bestseller</div>
      </div>
      <button
        className="btn btn-pink sticky-cart-btn"
        style={{fontSize:'12px',padding:'10px 18px'}}
        onClick={() => addToCart({name:'Magnesium Glycinate', price:'$26.90', img:'/wellness-over-everything/images/magnesium.jpg'})}
      >
        Add to cart
      </button>
    </div>
  )
}
