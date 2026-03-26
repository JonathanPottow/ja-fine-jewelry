'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styles from './Nav.module.css'

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Jonathan <em>Alistair</em>
        </Link>

        {/* Desktop links */}
        <div className={styles.links}>
          <Link href="/about" className={styles.link} onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/experience" className={styles.link} onClick={() => setMenuOpen(false)}>Experience</Link>
          <Link href="/portfolio" className={styles.link} onClick={() => setMenuOpen(false)}>Full Portfolio</Link>
          <a href='/contact' className={styles.cta} onClick={() => setMenuOpen(false)}>
            Let's Talk
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
          <Link href="/about" className={styles.link} onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/experience" className={styles.link} onClick={() => setMenuOpen(false)}>Experience</Link>
          <Link href="/portfolio" className={styles.link} onClick={() => setMenuOpen(false)}>Full Portfolio</Link>
          <a href='/contact' className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
            Let's Talk
          </a>
        </div>
      )}
    </header>
  )
}
