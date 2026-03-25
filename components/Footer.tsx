import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>Jonathan <em>Alistair</em></span>
          <p>Private commissions by appointment.<br />Jonathan Pottow.</p>
        </div>
        <div className={styles.links}>
          <Link href="/about">About</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/contact">Begin Your Journey</Link>
        </div>
        <div className={styles.copy}>
          <p>© {new Date().getFullYear()} Jonathan Alistair Fine Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
