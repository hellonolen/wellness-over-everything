'use client'
import Link from 'next/link'
import { useCart } from './CartProvider'
import { useEffect, useState } from 'react'

export default function Nav() {
  const { cart, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation">
      <Link href="/" className="nav-logo" aria-label="DLD Dynamics home">
        <svg width="160" height="36" viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="27" fontFamily="'Schibsted Grotesk', Georgia, serif" fontWeight="900" fontSize="26" letterSpacing="-0.5" fill="#2D1025">DLD</text>
          <text x="54" y="27" fontFamily="'Schibsted Grotesk', Georgia, serif" fontWeight="400" fontSize="18" letterSpacing="1.5" fill="#DF169C">DYNAMICS</text>
          <rect x="0" y="31" width="40" height="2.5" rx="1.25" fill="#DF169C"/>
        </svg>
      </Link>
      <ul className="nav-links" role="list">
        <li><Link href="/shop">Shop All</Link></li>
        <li><Link href="/shop#performance">Performance</Link></li>
        <li><Link href="/shop#wellness">Wellness</Link></li>
        <li><Link href="/about">Our Story</Link></li>
      </ul>
      <div className="nav-actions">
        <Link href="/shop" className="btn btn-dark" style={{padding:'10px 20px',fontSize:'13px'}}>Shop Now</Link>
        <div className="cart-btn" id="cartBtn" aria-label="Shopping cart" role="button" onClick={openCart} style={{cursor:'pointer'}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {cart.length > 0 && (
            <span className="cart-count" style={{display:'flex'}}>{cart.length}</span>
          )}
        </div>
      </div>
    </nav>
  )
}
