'use client'
import Link from 'next/link'
import { useCart } from '../components/CartProvider'
import { showToast } from '../components/Toast'
import { useState, useEffect } from 'react'
import StickyCartBar from '../components/StickyCartBar'
import { getProducts } from '../lib/shopify'

const IMGS = '/dld-dynamics/images'

const products1 = [
  { name:'Magnesium Glycinate', price:'$26.90', badge:'Bestseller', img:'magnesium.jpg', caps:'120 capsules · relaxation', desc:'Relaxes the body & supports deep, restorative sleep.' },
  { name:'Beauty Hair Skin', price:'$32.90', badge:'Glow Up', badgeCls:'lime', img:'beauty.jpg', caps:'60 capsules · beauty', desc:'Nourishes from within for radiant skin & strong hair.' },
  { name:'Complete Daily Multivitamin', price:'$32.90', badge:'Daily Essential', badgeCls:'lime', img:'multivitamin.jpg', caps:'60 capsules · daily health', desc:'Everything your body needs in one daily capsule.' },
  { name:'Lions Mane Brain', price:'$33.90', badge:'Brain Boost', img:'fatburner.jpg', caps:'60 capsules · cognitive', desc:'Sharpens focus, memory & mental clarity naturally.' },
  { name:'Ashwagandha', price:'$23.90', badge:'Stress Relief', badgeCls:'lime', img:'beauty.jpg', caps:'60 capsules · stress', desc:'Adapts your body\'s stress response, restores calm.' },
  { name:'Vitamin D3', price:'$19.90', badge:'Bone Strong', img:'nitricshock.jpg', caps:'60 capsules · bone health', desc:'Promotes strong bones and immune system resilience.' },
]

const products2 = [
  { name:'Creatine', price:'$33.90', img:'creatine.jpg', caps:'300g powder · performance' },
  { name:'Ginkgo Ginseng', price:'$29.90', img:'multivitamin.jpg', caps:'60 capsules · energy', bg:'#E0F269' },
  { name:'Multivitamin Gummies', price:'$19.90', img:'beauty.jpg', caps:'60 gummies · multivitamin', bg:'#9BFDF0' },
]

const faqs = [
  { q:'Are these supplements safe for women?', a:'Absolutely. Every formula is carefully researched and selected with women\'s specific biological needs in mind. Always consult your healthcare provider before starting any supplement.' },
  { q:'How long does shipping take?', a:'Standard shipping takes 5–7 business days. We offer free shipping on all orders over $50 within the US.' },
  { q:'Can I return a product?', a:'Yes. We offer a 30-day satisfaction guarantee. If you\'re not happy with your purchase for any reason, reach out to our team for a full refund.' },
  { q:'Are there any artificial ingredients?', a:'No fillers, no artificial dyes, no unnecessary additives. We believe in clean formulas that deliver real results.' },
  { q:'Do you ship internationally?', a:'Currently we ship within the United States. International shipping is coming soon.' },
  { q:'How do I take these supplements?', a:'Each product comes with clear dosage instructions on the label. For most capsules, we recommend taking with water and a meal.' },
]

function ProductCard({ product, delay }) {
  const { addToCart } = useCart()
  return (
    <article className="product-card" role="listitem">
      <div className="product-card-image" style={product.bg ? { background: product.bg } : {}}>
        <img
          src={`${IMGS}/${product.img}`}
          alt={product.name}
          style={product.bg ? { width:'100%',height:'100%',objectFit:'contain',padding:'24px' } : {}}
          onError={e => { e.target.style.display='none'; if(product.bg) e.target.parentElement.style.background=product.bg }}
        />
        {product.badge && <span className={`product-badge${product.badgeCls ? ' '+product.badgeCls : ''}`}>{product.badge}</span>}
      </div>
      <div className="product-card-body">
        {product.caps && <p className="product-card-capsules">{product.caps}</p>}
        <h3 className="product-card-title">{product.name}</h3>
        {product.desc && <p style={{fontSize:'13px',color:'rgba(45,16,37,0.55)',lineHeight:'1.55'}}>{product.desc}</p>}
        <div className="product-card-bottom">
          <span className="product-price">{product.price}</span>
          <button className="btn-add-cart" onClick={() => {
            addToCart({ name: product.name, price: product.price, img: `${IMGS}/${product.img}` })
            showToast(`${product.name} added to cart`)
          }}>Add to cart</button>
        </div>
      </div>
    </article>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        {q}
        <span className="faq-icon">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="faq-answer"><p>{a}</p></div>}
    </div>
  )
}

export default function HomePage() {
  const [heroImg, setHeroImg] = useState(null)

  useEffect(() => {
    getProducts().then(products => {
      const img = products?.[0]?.images?.edges?.[0]?.node?.url
      if (img) setHeroImg(img)
    }).catch(() => {})
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-content">
          <span className="hero-tag">✦ Premium Supplements</span>
          <h1 className="hero-headline" id="hero-heading">
            Crafted for<br/>
            <em>real life.</em>
          </h1>
          <p className="hero-sub">
            Science-backed supplements that actually work — formulated for the everyday high performer who refuses to compromise on their health.
          </p>
          <div className="hero-buttons">
            <Link href="/shop" className="btn btn-dark">Shop All Products</Link>
            <Link href="/about" className="btn btn-outline">Our Story</Link>
          </div>
          <div className="hero-stats">
            <div><div className="hero-stat-num heading">16+</div><div className="hero-stat-label">Premium Products</div></div>
            <div><div className="hero-stat-num heading">5,000+</div><div className="hero-stat-label">Happy Customers</div></div>
            <div><div className="hero-stat-num heading">100%</div><div className="hero-stat-label">Verified Nutrients</div></div>
          </div>
        </div>
        <div className="hero-image" style={{background:'#FFFFFF'}}>
          <img
            src={heroImg || `${IMGS}/magnesium.jpg`}
            alt="DLD Dynamics featured supplement"
            style={{objectFit:'contain', objectPosition:'center', padding:'48px 32px', width:'100%', height:'100%'}}
            onError={e => { if (heroImg) { e.target.src = `${IMGS}/magnesium.jpg` } }}
          />
          <div className="hero-image-overlay" />
        </div>
      </section>

      {/* MARQUEE 1 */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          {['Zero effort','Verified nutrients','Free shipping over $50','Science-backed formulas','Real results','Crafted for real life','Premium quality','DLD Dynamics'].map((t,i) => (
            <span key={i}>{t} <span className="marquee-dot" /></span>
          ))}
          {['Zero effort','Verified nutrients','Free shipping over $50','Science-backed formulas','Real results','Crafted for real life','Premium quality','DLD Dynamics'].map((t,i) => (
            <span key={`b${i}`}>{t} <span className="marquee-dot" /></span>
          ))}
        </div>
      </div>

      {/* BESTSELLERS */}
      <section className="section" id="shop" aria-labelledby="shop-heading">
        <div className="section-header">
          <div>
            <p className="section-tag">— Our Collection</p>
            <h2 className="section-title" id="shop-heading">The <em>bestsellers.</em></h2>
          </div>
          <Link href="/shop" className="btn btn-outline">View all products</Link>
        </div>
        <div className="products-grid" role="list">
          {products1.map((p, i) => (
            <ProductCard key={p.name} product={p} delay={i % 3 * 0.1} />
          ))}
        </div>
      </section>

      {/* SPLIT 1 — Real Life */}
      <div className="split-section" id="about">
        <div className="split-image">
          <img src={`${IMGS}/owner-basketball.png`} alt="DLD Dynamics founder lifestyle" style={{objectFit:'cover',objectPosition:'center',width:'100%',height:'100%',display:'block'}} onError={e => { e.target.parentElement.style.background='linear-gradient(160deg,#DF169C,#2D1025)'; e.target.style.display='none' }} />
        </div>
        <div className="split-content bg-lime">
          <p className="section-tag">— The founder</p>
          <h2 className="split-title">Real life. Real results.</h2>
          <p className="split-body">DLD Dynamics was born from a personal journey — understanding that true wellness isn't a one-size-fits-all approach. Every product is chosen because it works for real women living real, full lives.</p>
          <div className="benefits-list">
            <div className="benefit-item"><div className="benefit-icon">—</div><p>Formulated for women's biology</p></div>
            <div className="benefit-item"><div className="benefit-icon">—</div><p>No unnecessary fillers</p></div>
            <div className="benefit-item"><div className="benefit-icon">—</div><span>Built for the woman who does it all</span></div>
          </div>
          <Link href="/shop" className="btn btn-dark">Shop the collection</Link>
        </div>
      </div>

      {/* SPLIT 2 — Performance */}
      <div className="split-section reverse" id="performance">
        <div className="split-image">
          <img src={`${IMGS}/owner-gym.png`} alt="DLD Dynamics gym performance" style={{objectFit:'cover',objectPosition:'center top',width:'100%',height:'100%',display:'block'}} onError={e => { e.target.style.display='none'; e.target.parentElement.style.background='linear-gradient(160deg,#4760FF,#2D1025)' }} />
        </div>
        <div className="split-content bg-blue">
          <p className="section-tag">— Performance line</p>
          <h2 className="split-title" style={{color:'white'}}>Push further.<br/>Recover faster.</h2>
          <p className="split-body">Whether you're crushing workouts or recovering between them — our performance line gives your body exactly what it needs to perform at its peak.</p>
          <div className="benefits-list">
            {['Creatine Monohydrate — $33.90','Nitric Shock Workout Powder — $38.90','Fat Burner Capsule — $33.90','Fruit Punch Energy Powder — $34.99'].map(item => (
              <div className="benefit-item" key={item}><div className="benefit-icon">→</div><span style={{color:'white'}}>{item}</span></div>
            ))}
          </div>
          <Link href="/shop#performance" className="btn btn-lime">Shop performance</Link>
        </div>
      </div>

      {/* FOUNDER SECTION */}
      <section className="founder-section" id="wellness" aria-labelledby="founder-heading">
        <div className="founder-images">
          <div className="founder-img-main">
            <img src={`${IMGS}/owner-elegant.png`} alt="DLD Dynamics founder" style={{objectFit:'cover',objectPosition:'center top',width:'100%',height:'100%',display:'block',borderRadius:'16px'}} onError={e => { e.target.parentElement.style.background='linear-gradient(135deg,#DF169C,#E0F269)'; e.target.style.display='none' }} />
          </div>
          <div className="founder-img-sm">
            <img src={`${IMGS}/owner-morning.png`} alt="Morning wellness routine" style={{objectFit:'cover',objectPosition:'center top',width:'100%',height:'100%',display:'block',borderRadius:'16px'}} onError={e => { e.target.parentElement.style.background='linear-gradient(135deg,#4760FF,#9BFDF0)'; e.target.style.display='none' }} />
          </div>
          <div className="founder-img-sm">
            <img src={`${IMGS}/owner-basketball.png`} alt="DLD lifestyle" style={{objectFit:'cover',objectPosition:'center',width:'100%',height:'100%',display:'block',borderRadius:'16px'}} onError={e => { e.target.parentElement.style.background='linear-gradient(135deg,#2D1025,#DF169C)'; e.target.style.display='none' }} />
          </div>
        </div>
        <div className="founder-content">
          <p className="section-tag">— Our mission</p>
          <h2 className="founder-title" id="founder-heading">Wellness that<br/><em>moves with you.</em></h2>
          <blockquote className="founder-quote">"I created DLD Dynamics because I couldn't find supplements made for women like me — active, ambitious, and living full out."</blockquote>
          <p className="founder-body">DLD Dynamics is more than a supplement brand. It's a daily commitment to showing up for yourself — at the gym, at work, in life. Every capsule, every formula, every product is chosen with intention by a woman who understands the hustle firsthand.</p>
          <Link href="/shop" className="btn btn-pink">Explore the full line</Link>
        </div>
      </section>

      {/* MARQUEE 2 */}
      <div className="marquee-section" style={{background:'var(--pink)'}} aria-hidden="true">
        <div className="marquee-track" style={{animationDirection:'reverse',animationDuration:'32s'}}>
          {['Beauty from within','Hair · Skin · Nails','Cognitive support','Stress relief','Bone health','Energy & focus','DLD Dynamics'].map((t,i) => (
            <span key={i}>{t} <span className="marquee-dot" style={{background:'var(--lime)'}} /></span>
          ))}
          {['Beauty from within','Hair · Skin · Nails','Cognitive support','Stress relief','Bone health','Energy & focus','DLD Dynamics'].map((t,i) => (
            <span key={`b${i}`}>{t} <span className="marquee-dot" style={{background:'var(--lime)'}} /></span>
          ))}
        </div>
      </div>

      {/* MORE PRODUCTS */}
      <section className="section" aria-labelledby="more-heading">
        <div className="section-header">
          <div>
            <p className="section-tag">— More favorites</p>
            <h2 className="section-title" id="more-heading">Keep <em>going.</em></h2>
          </div>
        </div>
        <div className="products-grid" role="list">
          {products2.map((p, i) => (
            <ProductCard key={p.name} product={p} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" aria-labelledby="faq-heading">
        <div className="section-header">
          <div>
            <p className="section-tag">— Got questions?</p>
            <h2 className="section-title" id="faq-heading">We've got <em>answers.</em></h2>
          </div>
        </div>
        <div className="faq-grid">
          {faqs.map(f => <FaqItem key={f.q} {...f} />)}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section" aria-labelledby="newsletter-heading">
        <p className="section-tag" style={{color:'rgba(255,255,255,0.7)',marginBottom:'8px'}}>— Stay in the loop</p>
        <h2 className="newsletter-title" id="newsletter-heading">Join the DLD family.</h2>
        <p className="newsletter-sub">Get 10% off your first order, early access, and wellness tips that work.</p>
        <form className="newsletter-form" onSubmit={e => { e.preventDefault(); showToast('Thanks! Check your inbox.') }}>
          <input className="newsletter-input" type="email" placeholder="Your email address" required />
          <button type="submit" className="btn btn-white">Subscribe →</button>
        </form>
      </section>

      <StickyCartBar />
    </>
  )
}
