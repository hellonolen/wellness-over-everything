'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../../components/CartProvider'
import { showToast } from '../../components/Toast'

const IMGS = '/dld-dynamics/images'

const wellness = [
  { name:'Magnesium Glycinate', price:'$26.90', badge:'Bestseller', img:'magnesium.jpg', caps:'120 capsules' },
  { name:'Vitamin D3 Bone Support', price:'$19.90', badge:'Bone Health', badgeCls:'lime', img:'multivitamin.jpg', caps:'60 capsules' },
  { name:'Complete Daily Multivitamin', price:'$32.90', img:'multivitamin.jpg', caps:'60 capsules' },
  { name:'Organic Ashwagandha', price:'$23.90', badge:'Stress Relief', badgeCls:'lime', img:'beauty.jpg', caps:'60 capsules' },
  { name:'Digestive Enzyme Support', price:'$28.90', img:'multivitamin.jpg', caps:'60 capsules', bg:'#FFF3EB' },
  { name:'Vision Support', price:'$28.85', img:'magnesium.jpg', caps:'30 capsules', bg:'#9BFDF0' },
  { name:'Multivitamin Gummies', price:'$19.90', img:'beauty.jpg', caps:'60 gummies', bg:'#FFF3EB' },
]

const beauty = [
  { name:'Beauty Hair Skin', price:'$32.90', badge:'Glow Up', img:'beauty.jpg', caps:'60 capsules' },
  { name:'Hair Skin Nails Essentials', price:'$32.90', img:'beauty.jpg', caps:'60 capsules', bg:'#FFF3EB' },
  { name:'Cranberry Energy Oral Strips', price:'$36.50', img:'nitricshock.jpg', caps:'30 strips', bg:'#E0F269' },
]

const performance = [
  { name:'Creatine Monohydrate', price:'$33.90', img:'creatine.jpg', caps:'300g powder' },
  { name:'Nitric Shock Workout Powder', price:'$38.90', img:'nitricshock.jpg', caps:'240g powder', bg:'#4760FF' },
  { name:'Fat Burner with MCT', price:'$33.90', img:'fatburner.jpg', caps:'90 capsules', bg:'#2D1025' },
  { name:'Fruit Punch Energy Powder', price:'$34.99', img:'creatine.jpg', caps:'240g powder', bg:'#E0F269' },
  { name:'Ginkgo Ginseng Energy', price:'$29.90', img:'multivitamin.jpg', caps:'60 capsules', bg:'#9BFDF0' },
  { name:'Lions Mane Brain', price:'$33.90', img:'fatburner.jpg', caps:'60 capsules', bg:'#4760FF' },
]

const filters = ['All Products', 'Wellness', 'Performance', 'Beauty', 'Cognitive', 'Energy', 'Stress Relief', 'Under $25']

function ProductCard({ p }) {
  const { addToCart } = useCart()
  return (
    <article className="product-card reveal">
      <div className="product-card-image" style={p.bg ? { background: p.bg } : {}}>
        <img
          src={`${IMGS}/${p.img}`}
          alt={p.name}
          style={p.bg ? { width:'100%', height:'100%', objectFit:'contain', padding:'24px' } : {}}
          onError={e => { e.target.style.display = 'none' }}
        />
        {p.badge && <span className={`product-badge${p.badgeCls ? ' '+p.badgeCls : ''}`}>{p.badge}</span>}
      </div>
      <div className="product-card-body">
        <p className="product-card-capsules">{p.caps}</p>
        <h3 className="product-card-title">{p.name}</h3>
        <div className="product-card-bottom">
          <span className="product-price">{p.price}</span>
          <button className="btn-add-cart" onClick={() => {
            addToCart({ name: p.name, price: p.price, img: `${IMGS}/${p.img}` })
            showToast(`${p.name} added to cart`)
          }}>Add to cart</button>
        </div>
      </div>
    </article>
  )
}

export default function ShopPage() {
  const [active, setActive] = useState('All Products')

  const scrollTo = (label) => {
    setActive(label)
    const id = { Wellness: 'wellness-section', Performance: 'performance-section', Beauty: 'beauty-section' }[label]
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else if (label === 'All Products') document.getElementById('wellness-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className="shop-hero">
        <p className="section-tag" style={{ color: 'var(--lime)', marginBottom: '16px' }}>— All Products</p>
        <h1>Shop the <em>full collection.</em></h1>
        <p>16 premium formulas. Zero compromises. Built for real life.</p>
      </div>

      <div className="filter-bar" role="navigation" aria-label="Product filters">
        {filters.map(f => (
          <button key={f} className={`filter-pill${active === f ? ' active' : ''}`} onClick={() => scrollTo(f)}>{f}</button>
        ))}
      </div>

      {/* Wellness */}
      <div className="category-header" id="wellness-section">
        <h2>Wellness <em>&amp; Balance</em></h2>
      </div>
      <div className="shop-grid">
        {wellness.map(p => <ProductCard key={p.name} p={p} />)}
      </div>

      {/* Beauty */}
      <div className="category-header" id="beauty-section">
        <h2>Beauty <em>&amp; Glow</em></h2>
      </div>
      <div className="shop-grid">
        {beauty.map(p => <ProductCard key={p.name} p={p} />)}
      </div>

      {/* Performance */}
      <div className="category-header" id="performance-section">
        <h2>Performance <em>&amp; Energy</em></h2>
      </div>
      <div className="shop-grid">
        {performance.map(p => <ProductCard key={p.name} p={p} />)}
      </div>

      {/* Newsletter */}
      <section className="newsletter-section reveal">
        <p className="section-tag" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>— Stay in the loop</p>
        <h2 className="newsletter-title">Join the DLD family.</h2>
        <p className="newsletter-sub">Get 10% off your first order, early access, and wellness tips that work.</p>
        <form className="newsletter-form" onSubmit={e => { e.preventDefault(); showToast('Thanks! Check your inbox.') }}>
          <input className="newsletter-input" type="email" placeholder="Your email address" required />
          <button type="submit" className="btn btn-white">Subscribe →</button>
        </form>
      </section>
    </>
  )
}
