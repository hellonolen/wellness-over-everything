'use client'
import { useState } from 'react'
import { showToast } from '../../components/Toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })

  const handleSubmit = (e) => {
    e.preventDefault()
    showToast('Message sent! We\'ll be in touch within 24 hours.')
    setForm({ name:'', email:'', subject:'', message:'' })
  }

  return (
    <>
      {/* Hero */}
      <section style={{ background:'var(--dark)', padding:'100px 72px 80px', color:'var(--white)' }}>
        <p className="section-tag" style={{ color:'var(--lime)', marginBottom:'16px' }}>— Get in touch</p>
        <h1 style={{ fontFamily:"'Schibsted Grotesk',sans-serif", fontSize:'clamp(48px,6vw,80px)', fontWeight:900, letterSpacing:'-0.03em', lineHeight:1 }}>
          We'd love to <em style={{ color:'var(--pink)', fontStyle:'italic' }}>hear from you.</em>
        </h1>
        <p style={{ fontSize:'18px', opacity:0.65, marginTop:'24px', maxWidth:'520px', lineHeight:1.6 }}>
          Whether you have a question about a product, need help with an order, or just want to talk supplements — we're here.
        </p>
      </section>

      {/* Contact grid */}
      <section style={{ padding:'96px 72px', background:'var(--cream)', display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'80px', alignItems:'start' }}>

        {/* Info */}
        <div>
          <h2 style={{ fontFamily:"'Schibsted Grotesk',sans-serif", fontSize:'28px', fontWeight:900, marginBottom:'32px', color:'var(--dark)' }}>
            Contact info
          </h2>
          {[
            { label:'Email', value:'hello@wellnessovereverything.com' },
            { label:'Hours', value:'Mon – Fri, 9am – 6pm EST' },
            { label:'Response time', value:'Within 24 hours' },
          ].map(item => (
            <div key={item.label} style={{ marginBottom:'28px' }}>
              <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'12px', letterSpacing:'0.08em', color:'var(--pink)', marginBottom:'6px', textTransform:'uppercase' }}>{item.label}</p>
              <p style={{ fontSize:'16px', color:'var(--dark)', fontWeight:500 }}>{item.value}</p>
            </div>
          ))}
          <div style={{ marginTop:'40px', padding:'32px', background:'var(--dark)', borderRadius:'20px', color:'var(--white)' }}>
            <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'12px', letterSpacing:'0.08em', color:'var(--lime)', marginBottom:'12px' }}>— QUICK ANSWER</p>
            <p style={{ fontSize:'15px', lineHeight:1.6, opacity:0.8 }}>
              For order tracking and shipping questions, please include your order number in your message and we'll get you sorted fast.
            </p>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 style={{ fontFamily:"'Schibsted Grotesk',sans-serif", fontSize:'28px', fontWeight:900, marginBottom:'32px', color:'var(--dark)' }}>
            Send a message
          </h2>
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
            {[
              { id:'name', label:'Your Name', type:'text', placeholder:'Full name' },
              { id:'email', label:'Email Address', type:'email', placeholder:'your@email.com' },
              { id:'subject', label:'Subject', type:'text', placeholder:'What\'s this about?' },
            ].map(field => (
              <div key={field.id}>
                <label style={{ display:'block', fontFamily:"'IBM Plex Mono',monospace", fontSize:'12px', letterSpacing:'0.06em', marginBottom:'8px', color:'var(--dark)' }}>{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.id]}
                  onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                  required
                  style={{ width:'100%', padding:'16px 20px', border:'1.5px solid rgba(45,16,37,0.15)', borderRadius:'14px', fontSize:'15px', fontFamily:'inherit', outline:'none', background:'white', boxSizing:'border-box' }}
                />
              </div>
            ))}
            <div>
              <label style={{ display:'block', fontFamily:"'IBM Plex Mono',monospace", fontSize:'12px', letterSpacing:'0.06em', marginBottom:'8px', color:'var(--dark)' }}>Message</label>
              <textarea
                placeholder="Tell us what's on your mind..."
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                style={{ width:'100%', padding:'16px 20px', border:'1.5px solid rgba(45,16,37,0.15)', borderRadius:'14px', fontSize:'15px', fontFamily:'inherit', outline:'none', resize:'vertical', background:'white', boxSizing:'border-box' }}
              />
            </div>
            <button type="submit" className="btn btn-dark" style={{ padding:'18px', fontSize:'15px', borderRadius:'14px' }}>
              Send Message →
            </button>
          </form>
        </div>
      </section>

      {/* FAQ link */}
      <section style={{ padding:'64px 72px', background:'var(--white)', textAlign:'center' }}>
        <p style={{ fontSize:'17px', color:'rgba(45,16,37,0.6)', marginBottom:'16px' }}>Looking for quick answers?</p>
        <p style={{ fontSize:'17px', color:'var(--dark)' }}>
          Visit our <a href="/#faq" style={{ color:'var(--pink)', fontWeight:700, textDecoration:'none' }}>FAQ page</a> for answers to the most common questions.
        </p>
      </section>
    </>
  )
}
