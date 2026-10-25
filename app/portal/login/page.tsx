'use client'
import { useEffect, useState } from 'react'
import styles from '../portal.module.css'

export default function PortalLogin() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [expired, setExpired] = useState(false)
  const [studio, setStudio] = useState(false) // /portal/studio sends Jonathan here with ?studio
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    setExpired(q.has('expired'))
    setStudio(q.has('studio'))
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    await fetch('/api/portal/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }).catch(() => {})
    setState('sent')
  }

  return (
    <div className={styles.shell}>
      <main className={styles.loginPage}>
        <div className={`${styles.loginCard} ${styles.rise}`}>
          <svg className={styles.ring} viewBox="0 0 64 64" aria-hidden>
            <defs>
              <linearGradient id="stoneFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fffdf9" /><stop offset=".6" stopColor="#f1e4bd" /><stop offset="1" stopColor="#c8a84b" />
              </linearGradient>
            </defs>
            <circle className={styles.band} cx="32" cy="38" r="17" />
            <path className={styles.stone} d="M24 18l4-6h8l4 6-8 8z" />
            <circle className={styles.twinkle} cx="46" cy="12" r="1.6" />
            <circle className={styles.twinkle} cx="17" cy="15" r="1.2" style={{ animationDelay: '1.4s' }} />
          </svg>
          <span className={styles.eyebrow}>{studio ? 'Client Studio' : 'Private Client Portal'}</span>
          <h1 className={styles.title}>{studio ? <>Studio <em>sign-in</em></> : <>Welcome <em>back</em></>}</h1>

          {state === 'sent' ? (
            <div className={styles.sent} role="status">
              <p className={styles.sentTitle}>Your link is on its way</p>
              <p>{studio ? 'If that is the studio email, a sign-in link titled "Your studio sign-in link" will arrive shortly.' : 'If that email is on file with an active project, a private sign-in link will arrive shortly.'} It expires in 15 minutes. If you do not see it, please check your spam folder.</p>
              <button className={styles.again} onClick={() => setState('idle')}>Use a different email</button>
            </div>
          ) : (<>
            <p className={styles.intro}>{studio ? 'Enter your studio email and we will send you a sign-in link. No password needed.' : 'Enter the email you use with Jonathan and we will send you a private sign-in link. No password needed.'}</p>
            <form className={styles.form} onSubmit={submit}>
              <input className={styles.input} type="email" required placeholder="you@email.com" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              <button className={`${styles.btn} ${styles.btnGold}`} disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send my link'}</button>
            </form>
            {expired && <p className={styles.note}>That link has expired. Please request a new one.</p>}
          </>)}
          <p className={styles.private}>{studio ? 'For Jonathan only.' : 'Private and secure. For our clients only.'}</p>
        </div>
      </main>
    </div>
  )
}
