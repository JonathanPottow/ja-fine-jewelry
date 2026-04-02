'use client'
import { useState } from 'react'
import styles from './SubscribeForm.module.css'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (res.ok) { setStatus('sent') } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Stay in the know</p>
        <h2 className={styles.title}>
          Be first to see<br /><em>what&apos;s next.</em>
        </h2>
        <p className={styles.subtext}>
          New commissions, one-of-a-kind pieces, and private events —
          delivered directly to you.
        </p>
        {status === 'sent' ? (
          <p className={styles.success}>You&apos;re on the list. Welcome.</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.input}
              disabled={status === 'sending'}
            />
            <button type="submit" className={styles.btn} disabled={status === 'sending'}>
              {status === 'sending' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && <p className={styles.error}>Something went wrong. Please try again.</p>}
      </div>
    </div>
  )
}
