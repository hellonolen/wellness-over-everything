'use client'
import Link from 'next/link'

const IMGS = '/dld-dynamics/images'

const values = [
  { title:'Made for Women', icon:'♀', body:'Every formula is designed around women\'s biology. No proprietary blends hiding weak doses — just clean, premium ingredients at amounts that actually move the needle.' },
  { title:'Science First', icon:'⚗', body:'Backed by published research. We source the highest-quality raw ingredients and work only with certified manufacturers to guarantee potency and purity in every capsule.' },
  { title:'Real Life Ready', icon:'⚡', body:'Supplements that fit your schedule, not the other way around. Simple daily routines designed for the woman who is always on the move and refuses to slow down.' },
  { title:'Transparent Always', icon:'◎', body:'We list every ingredient, every dose, every time. You deserve to know exactly what you\'re putting in your body — no fillers, no tricks, no fine print.' },
  { title:'Results You Feel', icon:'✓', body:'We stand behind every product with a 30-day satisfaction guarantee. If you don\'t feel the difference, we\'ll make it right. That\'s a promise, not a policy.' },
  { title:'Community Driven', icon:'❤', body:'5,000+ women across the US trust DLD Dynamics. We listen, iterate, and build every new formula around real feedback from real customers in our community.' },
]

const milestones = [
  { year:'2026', event:'Continuing the mission — launching new formulas and expanding the community' },
  { year:'2025', event:'DLD enters the digital-first era — full e-commerce launch and national shipping' },
  { year:'2024', event:'Expanded to 16 premium formulas across Wellness, Beauty, and Performance' },
  { year:'2023', event:'5,000 women join the DLD family — community grows coast to coast' },
  { year:'2022', event:'First five products launch, all selling out within weeks of release' },
  { year:'2021', event:'DLD Dynamics founded — driven by a personal health journey and a gap in the market' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:'var(--dark)', padding:'100px 72px 80px', color:'var(--white)' }}>
        <p className="section-tag" style={{ color:'var(--lime)', marginBottom:'16px' }}>— Our Story</p>
        <h1 style={{ fontFamily:"'Schibsted Grotesk',sans-serif", fontSize:'clamp(48px,6vw,96px)', fontWeight:900, letterSpacing:'-0.03em', lineHeight:1, maxWidth:'800px' }}>
          Built for the woman <em style={{ color:'var(--pink)', fontStyle:'italic' }}>who does it all.</em>
        </h1>
        <p style={{ fontSize:'18px', opacity:0.65, marginTop:'24px', maxWidth:'560px', lineHeight:1.6 }}>
          DLD Dynamics isn't just a supplement brand. It's a daily commitment to showing up — for yourself, for your goals, for your life.
        </p>
      </section>

      {/* Founder Images */}
      <section style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', height:'480px' }}>
        {[
          { src:'owner-morning.png', pos:'center top' },
          { src:'owner-elegant.png', pos:'center top' },
          { src:'owner-gym.png',     pos:'center top' },
        ].map((img, i) => (
          <div key={i} style={{ overflow:'hidden', position:'relative' }}>
            <img
              src={`${IMGS}/${img.src}`}
              alt="DLD Dynamics founder"
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition: img.pos, display:'block', filter:'brightness(1.05) contrast(0.97) saturate(0.95)' }}
              onError={e => { e.target.style.display='none'; e.target.parentElement.style.background='var(--pink)' }}
            />
          </div>
        ))}
      </section>

      {/* Mission */}
      <section style={{ padding:'96px 72px', background:'var(--cream)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'start' }}>
        <div>
          <p className="section-tag" style={{ marginBottom:'16px' }}>— The mission</p>
          <h2 style={{ fontFamily:"'Schibsted Grotesk',sans-serif", fontSize:'clamp(36px,4vw,60px)', fontWeight:900, letterSpacing:'-0.02em', lineHeight:1.1, color:'var(--dark)' }}>
            Wellness that <em style={{ color:'var(--pink)', fontStyle:'italic' }}>actually works.</em>
          </h2>
        </div>
        <div>
          <p style={{ fontSize:'17px', lineHeight:1.8, color:'rgba(45,16,37,0.7)', marginBottom:'24px' }}>
            I started DLD Dynamics because I was tired of supplements that promised everything and delivered nothing. As a woman who trains hard, works harder, and is always on the move — I needed products that kept up with me.
          </p>
          <p style={{ fontSize:'17px', lineHeight:1.8, color:'rgba(45,16,37,0.7)' }}>
            Every product in the DLD line has been personally tested and trusted. No guesswork — just clean, effective formulas made for real life.
          </p>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding:'96px 72px', background:'var(--white)' }}>
        <p className="section-tag" style={{ marginBottom:'16px' }}>— What we stand for</p>
        <h2 style={{ fontFamily:"'Schibsted Grotesk',sans-serif", fontSize:'clamp(36px,4vw,56px)', fontWeight:900, letterSpacing:'-0.02em', marginBottom:'56px' }}>
          Our <em style={{ color:'var(--pink)', fontStyle:'italic' }}>values.</em>
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'32px' }}>
          {values.map((v, i) => (
            <div key={i} style={{ background:'var(--cream)', borderRadius:'24px', padding:'40px' }}>
              <div style={{ fontSize:'28px', marginBottom:'16px' }}>{v.icon}</div>
              <h3 style={{ fontFamily:"'Schibsted Grotesk',sans-serif", fontSize:'22px', fontWeight:900, marginBottom:'16px', color:'var(--dark)' }}>{v.title}</h3>
              <p style={{ fontSize:'15px', lineHeight:1.7, color:'rgba(45,16,37,0.65)' }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lifestyle images */}
      <section style={{ display:'grid', gridTemplateColumns:'1fr 1fr', height:'500px' }}>
        <div style={{ overflow:'hidden' }}>
          <img src={`${IMGS}/owner-airplane.png`} alt="DLD Dynamics lifestyle" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} onError={e => { e.target.style.display='none'; e.target.parentElement.style.background='var(--lime)' }} />
        </div>
        <div style={{ overflow:'hidden' }}>
          <img src={`${IMGS}/wellness-lifestyle.png`} alt="Wellness lifestyle" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} onError={e => { e.target.style.display='none'; e.target.parentElement.style.background='var(--dark)' }} />
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding:'96px 72px', background:'var(--dark)', color:'var(--white)' }}>
        <p className="section-tag" style={{ color:'var(--lime)', marginBottom:'16px' }}>— The journey</p>
        <h2 style={{ fontFamily:"'Schibsted Grotesk',sans-serif", fontSize:'clamp(36px,4vw,56px)', fontWeight:900, letterSpacing:'-0.02em', marginBottom:'56px' }}>
          How we got <em style={{ color:'var(--pink)', fontStyle:'italic' }}>here.</em>
        </h2>
        <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
          {milestones.map((m, i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap:'32px', padding:'28px 0', borderBottom: i < milestones.length-1 ? '1px solid rgba(255,255,255,0.1)' : 'none', alignItems:'center' }}>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'13px', color:'var(--lime)', letterSpacing:'0.06em', fontWeight:500 }}>{m.year}</div>
              <div style={{ fontSize:'17px', lineHeight:1.5, opacity:0.8 }}>{m.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:'var(--pink)', padding:'96px 72px', textAlign:'center', color:'var(--white)' }}>
        <h2 style={{ fontFamily:"'Schibsted Grotesk',sans-serif", fontSize:'clamp(36px,5vw,72px)', fontWeight:900, letterSpacing:'-0.03em', marginBottom:'24px' }}>
          Ready to start?
        </h2>
        <p style={{ fontSize:'18px', opacity:0.85, marginBottom:'40px' }}>Shop the full DLD Dynamics collection.</p>
        <Link href="/shop" className="btn btn-white" style={{ fontSize:'16px', padding:'18px 40px' }}>Shop All Products →</Link>
      </section>
    </>
  )
}
