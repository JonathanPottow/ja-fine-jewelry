'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styles from './Nav.module.css'

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)

  const navLink = (href: string, label: string) => {
    const handleAnchorClick = (e: React.MouseEvent) => {
      e.preventDefault()
      setMenuOpen(false)
      const id = href.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = `/${href}`
      }
    }

    if (href.startsWith('#')) {
      return (
        <a href={href} className={styles.link} onClick={handleAnchorClick}>
          {label}
        </a>
      )
    }
    return (
      <Link href={href} className={styles.link} onClick={() => setMenuOpen(false)}>
        {label}
      </Link>
    )
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Jonathan <em>Alistair</em>
        </Link>

        {/* Desktop links */}
        <div className={styles.links}>
          {navLink('#about', 'About')}
          {navLink('#process', 'Process')}

          {navLink('#testimonials', 'Stories')}
          <Link href="/experience" className={styles.link} onClick={() => setMenuOpen(false)}>Experience</Link>
          <Link href="/portfolio" className={styles.link}>Full Portfolio</Link>
          <Link href="/shop" className={styles.link}>Shop</Link>
          <a href={isHome ? '#contact' : '/#contact'} className={styles.cta} onClick={() => setMenuOpen(false)}>
            Begin Your Journey
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? styles.barTop + ' ' + styles.barTopOpen : styles.barTop} />
          <span className={menuOpen ? styles.barMid + ' ' + styles.barMidOpen : styles.barMid} />
          <span className={menuOpen ? styles.barBot + ' ' + styles.barBotOpen : styles.barBot} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLink('#about', 'About')}
          {navLink('#process', 'Process')}

          {navLink('#testimonials', 'Client Stories')}
          <Link href="/experience" className={styles.link} onClick={() => setMenuOpen(false)}>Experience</Link>
          <Link href="/portfolio" className={styles.link} onClick={() => setMenuOpen(false)}>Full Portfolio</Link>
          <a href={isHome ? '#contact' : '/#contact'} className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
            Begin Your Journey
          </a>
        </div>
      )}
    </header>
  )
}
