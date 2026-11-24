import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './privacy.module.css'

export const metadata: Metadata = {
  title: 'Privacy Policy | Jonathan Alistair Fine Jewelry',
  description: 'How Jonathan Alistair Fine Jewelry collects, uses and protects your information.',
  alternates: { canonical: 'https://www.jafinejewelry.com/privacy' },
}

const UPDATED = 'November 24, 2026'
const CONTACT_EMAIL = 'jonathan@jafinejewelry.com'

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Privacy Policy</p>
        <h1 className={styles.title}>
          Your privacy, <em>kept private.</em>
        </h1>
        <p className={styles.updated}>Last updated {UPDATED}</p>

        <p className={styles.lead}>
          Jonathan Alistair Fine Jewelry is a private, appointment-only jeweler based in Charlotte, North Carolina.
          Discretion is part of how we work. This page explains, plainly, what information we collect through this
          website, why, and the choices you have.
        </p>

        <section className={styles.section}>
          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>What you send us.</strong> When you use the inquiry form, live chat or newsletter sign-up, we
              receive what you choose to share: your name, email, phone number, your message, and any inspiration
              images you upload.
            </li>
            <li>
              <strong>How the site is used.</strong> Like most websites, we use cookies and similar tools to understand
              visits (for example, which pages are viewed) and to run the live chat. This information is about browsing,
              not about who you are, unless you tell us.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>How we use it</h2>
          <ul>
            <li>To reply to you and work with you on your piece.</li>
            <li>To keep a record of our conversations, so Jonathan can pick up right where you left off.</li>
            <li>To send our newsletter, only if you signed up. Every email has an unsubscribe link.</li>
            <li>To keep the website working well and free of spam.</li>
          </ul>
          <p>We never sell your personal information, and we do not share it for anyone else&rsquo;s marketing.</p>
        </section>

        <section className={styles.section}>
          <h2>Services we rely on</h2>
          <p>A small number of trusted providers help us run this website. They handle information only to provide their service to us:</p>
          <ul>
            <li><strong>HubSpot</strong>: live chat and client records, plus visit cookies</li>
            <li><strong>Google Analytics</strong>: anonymous visit statistics</li>
            <li><strong>Resend</strong>: delivers inquiry emails</li>
            <li><strong>MailerLite</strong>: sends the newsletter</li>
            <li><strong>Cloudflare Turnstile</strong>: keeps spam out of our forms</li>
            <li><strong>Vercel</strong>: hosts the website</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Cookies and your choices</h2>
          <p>
            When you first visit, a cookie notice lets you accept or decline non-essential cookies. You can also clear
            or block cookies in your browser settings at any time. The site works without them, though the live chat may
            not.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Your rights</h2>
          <p>
            You can ask us at any time to see the information we hold about you, correct it, or delete it. Just email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and Jonathan will take care of it personally.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Keeping it safe</h2>
          <p>
            We keep information only as long as it is useful for our relationship with you or required for our records,
            and we use reputable, secure providers to store it. This website is not intended for children under 13.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Changes and questions</h2>
          <p>
            If this policy changes, we will update this page and the date above. Questions are always welcome at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </section>

        <div className={styles.cta}>
          <p>Have a question about a piece instead?</p>
          <Link href="/contact" className={styles.ctaBtn}>Let&rsquo;s Talk</Link>
        </div>
      </div>
    </main>
  )
}
