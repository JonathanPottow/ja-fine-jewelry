'use client'
import { useState } from 'react'
import styles from '../portal.module.css'

export default function PortalLogin() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const expired = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('expired')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    await fetch('/api/portal/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }).catch(() => {})
    setState('sent')
  }

  return (
    <main className={styles.page}>
      <span className={styles.eyebrow}>Private Client Portal</span>
      <h1 className={styles.title}>Welcome <em>back</em></h1>
      <p className={styles.intro}>Enter the email address you use with Jonathan and we will send you a private sign-in link. No password needed.</p>
      {state === 'sent' ? (
        <p className={styles.note}>If that email is on file with an active project, a sign-in link is on its way. It expires in 15 minutes. Please check your spam folder if you do not see it.</p>
      ) : (
        <form className={styles.form} onSubmit={submit}>
          <input className={styles.input} type="email" required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          <button className={styles.btn} disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send my link'}</button>
        </form>
      )}
      {expired && state !== 'sent' && <p className={styles.note}>That link has expired. Please request a new one.</p>}
    </main>
  )
}
