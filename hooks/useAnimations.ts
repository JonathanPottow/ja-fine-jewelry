'use client'
import { useEffect } from 'react'

export function useScrollAnimations() {
  useEffect(() => {
    // Scroll fade-up observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))

    // Nav scroll transition
    const nav = document.querySelector('header')
    const handleScroll = () => {
      if (window.scrollY > 80) {
        nav?.classList.add('nav-scrolled')
      } else {
        nav?.classList.remove('nav-scrolled')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Count-up animation
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const target = parseInt(el.dataset.target || '0')
            const suffix = el.dataset.suffix || ''
            const duration = 1500
            const start = performance.now()

            const animate = (now: number) => {
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              el.textContent = Math.round(eased * target) + suffix
              if (progress < 1) requestAnimationFrame(animate)
            }
            requestAnimationFrame(animate)
            countObserver.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll('.count-up').forEach((el) => countObserver.observe(el))

    return () => {
      observer.disconnect()
      countObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
