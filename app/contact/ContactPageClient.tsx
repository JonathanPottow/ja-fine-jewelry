'use client'
import { useState } from 'react'
import styles from './page.module.css'

const faqs = [
  { q: 'Do you offer lab grown diamonds?', a: 'Yes. Jonathan works with both natural and lab grown diamonds and will walk you through the honest differences — in appearance, origin, and value — so you can make the decision that is right for you. There is no agenda either way. The right stone is whichever one you feel best about.' },
  { q: 'Can you source watches?', a: 'Yes. Jonathan has access to a curated network of luxury watch sources and can assist clients looking for specific timepieces — whether a grail watch, a gift, or an addition to a collection. Reach out with what you have in mind and he will let you know what is possible.' },
  { q: 'Can you work with my existing jewelry or stones?', a: 'Absolutely — and heirloom redesigns are among the most meaningful commissions Jonathan takes on. Whether it is your grandmother\'s diamond, a ring that no longer fits your life, or stones sitting in a drawer, Jonathan can reimagine them into something you will wear every day. The history stays. The piece becomes new.' },
  { q: 'Can we work together if I am not in Charlotte?', a: 'Yes — and many of Jonathan\'s clients are not local. The process begins with a private consultation by phone or video, and finished pieces are shipped securely and insured across the United States. For clients who can visit Charlotte, an in-person appointment is always available and warmly welcomed.' },
  { q: 'What happens after my piece is delivered?', a: 'Jonathan stands behind every piece he creates. If something is not right — a fit issue, a sizing adjustment, anything at all — reach out and it will be taken care of. The relationship does not end at delivery. For many clients, it is just the beginning.' },
  { q: 'How do I get started?', a: 'Reach out through the form below and tell Jonathan a little about what you have in mind — even if the idea is still forming. He responds personally to every inquiry within 48 hours. No sales pitch, no pressure. Just a conversation.' },
]

export default function ContactPageClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

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
      <p className={styles.thankYouText}>Jonathan will be in touch personally within 48 hours to begin your conversation.</p>
    </div>
  )

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <p className={styles.eyebrow}>Private Commissions</p>
        <h1 className={styles.pageTitle}>Begin Your<br /><em>Journey</em></h1>
        <p className={styles.pageIntro}>Every commission starts with a conversation. Tell Jonathan a little about what you have in mind.</p>
      </div>

      <div className={styles.faqSection}>
        <p className={styles.eyebrow}>Before you reach out</p>
        <h2 className={styles.faqTitle}>A few things clients often ask</h2>
        <div className={styles.faqGrid}>
          {faqs.map((item, i) => (
            <div key={i} className={styles.faqItem}>
              <h3 className={styles.faqQ}>{item.q}</h3>
              <p className={styles.faqA}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formWrap}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Your Name</label>
            <input type="text" required placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label>Phone</label>
            <input type="tel" placeholder="Your phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className={styles.formGroup}>
            <label>Tell me a little about what you have in mind</label>
            <textarea rows={5} placeholder="A vision, a feeling, a story — whatever comes to mind." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
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
