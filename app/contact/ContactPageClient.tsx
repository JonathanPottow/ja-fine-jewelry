'use client'
import { useState } from 'react'
import styles from './page.module.css'

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', piece: '', story: '', timeline: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('data', JSON.stringify(form))
    const res = await fetch('/api/contact', { method: 'POST', body: formData })
    if (res.ok) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.thankYou}>
        <p className={styles.eyebrow}>Message received</p>
        <h1 className={styles.thankYouTitle}>Thank you, {form.name.split(' ')[0]}.</h1>
        <p className={styles.thankYouText}>
          Jonathan will be in touch personally within 48 hours to begin your conversation.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <p className={styles.eyebrow}>Private Commissions</p>
        <h1 className={styles.pageTitle}>Begin Your<br /><em>Journey</em></h1>
        <p className={styles.pageIntro}>
          Every commission starts with a conversation. Tell Jonathan about your vision,
          the occasion, and the person who will wear this piece.
        </p>
      </div>

      <div className={styles.formWrap}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Your Name</label>
              <input type="text" required placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input type="tel" required placeholder="Your phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Type of Piece</label>
              <select value={form.piece} onChange={e => setForm({ ...form, piece: e.target.value })}>
                <option value="">Select one...</option>
                <option>Engagement Ring</option>
                <option>Wedding Band</option>
                <option>Anniversary Piece</option>
                <option>Pendant</option>
                <option>Heirloom Redesign</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Your Story</label>
            <textarea required rows={5} placeholder="Tell Jonathan about the piece you have in mind, the occasion, and the person who will wear it..." value={form.story} onChange={e => setForm({ ...form, story: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label>Timeline</label>
            <select value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })}>
              <option value="">When do you need it?</option>
              <option>Within 1 month</option>
              <option>1-3 months</option>
              <option>3-6 months</option>
              <option>6+ months / no rush</option>
            </select>
          </div>
          <button type="submit" className={styles.submitBtn}>Send My Inquiry</button>
        </form>

        <div className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <p className={styles.eyebrow}>What to expect</p>
            <ul className={styles.expectList}>
              <li>Personal response within 48 hours</li>
              <li>Confidential, no-pressure conversation</li>
              <li>Custom quote based on your vision</li>
              <li>Full creative collaboration throughout</li>
            </ul>
          </div>
          <div className={styles.sidebarQuote}>
            <p>"I work with a small number of clients at a time, giving every commission my full attention."</p>
            <cite>— Jonathan Pottow</cite>
          </div>
        </div>
      </div>
    </div>
  )
}
