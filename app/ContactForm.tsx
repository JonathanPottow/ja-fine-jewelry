'use client'
import { useState, useCallback } from 'react'
import Turnstile, { Honeypot } from '@/app/Turnstile'
import InspirationUpload from '@/app/InspirationUpload'
import styles from './page.module.css'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  const [startedAt] = useState(() => Date.now())
  const [website, setWebsite] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [captchaKey, setCaptchaKey] = useState(0)
  const [images, setImages] = useState<File[]>([])
  const onToken = useCallback((t: string) => setTurnstileToken(t), [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const formData = new FormData()
      formData.append('data', JSON.stringify({ ...form, website, startedAt, turnstileToken }))
      images.forEach(img => formData.append('images', img))
      const res = await fetch('/api/contact', { method: 'POST', body: formData })
      if (res.ok) {
        setStatus('sent')
        trackEvent(ANALYTICS_EVENTS.LEAD_FORM_SUBMIT, { location: 'homepage' })
      } else {
        setStatus('error')
        setTurnstileToken('')
        setCaptchaKey(k => k + 1)
      }
    } catch { setStatus('error') }
  }

  if (status === 'sent') return (
    <div className={styles.formSuccess}>
      <p className={styles.eyebrow}>Message received</p>
      <h3 className={styles.formSuccessTitle}>Thank you, {form.name.split(' ')[0]}.</h3>
      <p className={styles.formSuccessText}>Jonathan will be in touch personally within 48 hours.</p>
    </div>
  )

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Your Name</label>
        <input
          type="text"
          required
          placeholder="Full name"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Email</label>
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Tell me a little about what you have in mind</label>
        <textarea
          rows={5}
          placeholder="A vision, a feeling, a story — whatever comes to mind."
          value={form.message}
          onChange={e => setForm({...form, message: e.target.value})}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Inspiration images <span style={{ textTransform: 'none', letterSpacing: 0, opacity: 0.7 }}>(optional, up to 3)</span></label>
        <InspirationUpload files={images} onChange={setImages} />
      </div>
      <Honeypot value={website} onChange={setWebsite} />
      <Turnstile key={captchaKey} onToken={onToken} />
      {status === 'error' && <p className={styles.formError}>Something went wrong. Please try again.</p>}
      <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send My Inquiry'}
      </button>
    </form>
  )
}
