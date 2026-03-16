'use client'
import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(el => {
          if (el.isIntersecting) {
            el.target.classList.add('visible')
            observer.unobserve(el.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    // Observe all current .reveal elements
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    // Also watch for dynamically added .reveal elements
    const mutation = new MutationObserver(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el))
    })
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => { observer.disconnect(); mutation.disconnect() }
  }, [])

  return null
}
