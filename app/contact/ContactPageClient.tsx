'use client'
import { useState } from 'react'
import styles from './page.module.css'

export default function ContactPageClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const formData = new FormData()
      formData.append('data', JSON.stringify(form))
      const res = await fetch('/api/contact', { method: 'POST', body: formData })
      if (res.ok) { setStatus('sent') } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  if (status === 'sent') return (
    <div className={styles.thankYou}>
      <p className={styles.eyebrow}>Message received</p>
      <h1 className={styles.thankYouTitle}>Thank you, {form.name.split(' ')[0]}.</h1>
      <p className={styles.thankYouText}>
        Jonathan will be in touch personally within 48 hours to begin your conversation.
      </p>
    </div>
  )

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <p className={styles.eyebrow}>Private Commissions</p>
        <h1 className={styles.pageTitle}>Begin Your<br /><em>Journey</em></h1>
        <p className={styles.pageIntro}>
          Every commission starts with a conversation. Tell Jonathan a little about what you have in mind.
        </p>
      </div>

      <div className={styles.formWrap}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Your Name</label>
            <input
              type="text"
              required
              placeholder="Full name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone</label>
            <input
              type="tel"
              placeholder="Your phone number"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Tell me a little about what you have in mind</label>
            <textarea
              rows={5}
              placeholder="A vision, a feeling, a story — whatever comes to mind."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
            />
          </div>
          {status === 'error' && <p className={styles.formError}>Something went wrong. Please try again.</p>}
          <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send My Inquiry'}
          </button>
        </form>
      </div>
    </div>
  )
}
