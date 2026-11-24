import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: 'Page not found | Jonathan Alistair Fine Jewelry',
}

// Shown for any address that doesn't exist on the site.
export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Page not found</p>
        <h1 className={styles.title}>
          This page has <em>moved on.</em>
        </h1>
        <span className={styles.line} aria-hidden="true" />
        <p className={styles.text}>
          The page you were looking for isn&rsquo;t here. Have a look through the portfolio, or start a conversation
          with Jonathan. He is always happy to help.
        </p>
        <div className={styles.actions}>
          <Link href="/contact" className={styles.primary}>Let&rsquo;s Talk</Link>
          <Link href="/portfolio" className={styles.secondary}>View Portfolio</Link>
          <Link href="/" className={styles.secondary}>Home</Link>
        </div>
      </div>
    </main>
  )
}
