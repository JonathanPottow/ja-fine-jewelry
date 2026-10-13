import Link from 'next/link'
import styles from './Footer.module.css'
import { socialLinks } from '@/lib/social'

const svgProps = {
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const icons: Record<string, JSX.Element> = {
  instagram: (
    <svg {...svgProps}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  google: (
    <svg {...svgProps}>
      <path d="M12 3.5l2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.4-4.2 6-.9z" />
    </svg>
  ),
  facebook: (
    <svg {...svgProps}>
      <path d="M14.5 21v-7.5h2.5l.5-3h-3V8.7c0-.9.4-1.7 1.7-1.7h1.5V4.3C17.2 4.2 16.3 4 15.2 4c-2.3 0-3.7 1.4-3.7 3.8v2.7H9v3h2.5V21" />
    </svg>
  ),
  linkedin: (
    <svg {...svgProps}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 10.5V16M8 7.7v.1M11.5 16v-5.5M11.5 13c0-1.5 1-2.5 2.3-2.5s2.2 1 2.2 2.5v3" />
    </svg>
  ),
}

export default function Footer() {
  const visibleSocial = socialLinks.filter((s) => s.href)

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>Jonathan <em>Alistair</em></span>
          <p>Private commissions by appointment.<br />Jonathan Pottow.</p>
          {visibleSocial.length > 0 && (
            <ul className={styles.social} aria-label="Follow and review Jonathan Alistair Fine Jewelry">
              {visibleSocial.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                  >
                    {icons[s.key]}
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.links}>
          <Link href="/about">About</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/contact#faq">FAQ</Link>
          <Link href='/contact'>Let's Talk</Link>
        </div>
        <div className={styles.copy}>
          <p>© {new Date().getFullYear()} Jonathan Alistair Fine Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
