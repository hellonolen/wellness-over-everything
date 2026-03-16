'use client'
import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    // Mark body as JS-ready so .reveal CSS animation activates
    document.body.classList.add('js-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(el => {
          if (el.isIntersecting) {
            el.target.classList.add('visible')
            observer.unobserve(el.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    // Small delay to let React paint first
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    }, 100)

    return () => { clearTimeout(timer); observer.disconnect() }
  }, [])

  return null
}
