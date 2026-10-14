'use client'
import { useState, useCallback, useEffect } from 'react'
import Turnstile, { Honeypot } from '@/app/Turnstile'
import InspirationUpload from '@/app/InspirationUpload'
import styles from './page.module.css'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'
import { getPieceBySlug, pieceStill, type PortfolioPiece } from '@/lib/portfolio-pieces'
import { METAL_OPTIONS, isMetalKey, isValidLabCarat, LAB_INQUIRE_CARAT, settingPrice, labDiamondPrice, formatUSD } from '@/lib/pricing'

const faqs = [
  { q: 'What is the investment for a custom piece?', a: 'Most custom engagement rings begin around $2,500–$3,000 for the setting, plus the diamond. Complete rings typically start from about $4,000 with a lab grown center stone, and from about $6,500 with a natural diamond. There are no consultation fees. The right number depends on your vision, stone, and level of detail. Share your budget when you reach out and Jonathan will always be honest about what\'s possible.' },
  { q: 'Do I need to know exactly what I want before reaching out?', a: 'Not at all — and most clients do not. Some arrive with a clear vision. Others come with a feeling, an occasion, or a photograph saved on their phone. All of it is a perfectly fine place to start. Jonathan\'s first job is to listen — to understand you, the person you are creating this for, and what this piece needs to mean. The direction finds itself from there.' },
  { q: 'How long does the process take?', a: 'Most commissions move from first conversation to finished piece in four to eight weeks. More intricate designs or rare stone sourcing may take a little longer — Jonathan will give you a clear and honest timeline upfront so there are no surprises. If you are working toward a specific date — a proposal, an anniversary, a birthday — mention it when you reach out.' },
  { q: 'What does the design process look like?', a: 'Once Jonathan understands your vision, he creates detailed CAD renderings — precise, three-dimensional representations of your piece — so you can see exactly what it will look like before a single stone is set or a gram of metal is touched. Nothing moves forward until you love what you see. Revisions are welcomed, not rationed.' },
  { q: 'Is a deposit required to begin?', a: 'Yes. To begin the design and production process, Jonathan requires a 50% deposit, with the remaining balance due upon completion before delivery. This protects your commission and allows Jonathan to source your materials and allocate the time your piece deserves. All deposits and pricing are discussed openly before any commitment is made.' },
  { q: 'Do you offer lab grown diamonds?', a: 'Yes. Jonathan works with both natural and lab grown diamonds and will walk you through the honest differences — in appearance, origin, and value — so you can make the decision that is right for you. There is no agenda either way. The right stone is whichever one you feel best about.' },
  { q: 'Can you source watches?', a: 'Yes. Jonathan has access to a curated network of luxury watch sources and can assist clients looking for specific timepieces — whether a grail watch, a gift, or an addition to a collection. Reach out with what you have in mind and he will let you know what is possible.' },
  { q: 'Can you work with my existing jewelry or stones?', a: 'Absolutely — and heirloom redesigns are among the most meaningful commissions Jonathan takes on. Whether it is your grandmother\'s diamond, a ring that no longer fits your life, or stones sitting in a drawer, Jonathan can reimagine them into something you will wear every day. The history stays. The piece becomes new.' },
  { q: 'Can we work together if I am not in Charlotte?', a: 'Yes — and many of Jonathan\'s clients are not local. The process begins with a private consultation by phone or video, and finished pieces are shipped securely and insured across the United States. For clients who can visit Charlotte, an in-person appointment is always available and warmly welcomed.' },
  { q: 'What happens after my piece is delivered?', a: 'Jonathan stands behind every piece he creates. If something is not right — a fit issue, a sizing adjustment, anything at all — reach out and it will be taken care of. The relationship does not end at delivery. For many clients, it is just the beginning.' },
]

export default function ContactPageClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

  const [startedAt] = useState(() => Date.now())
  const [website, setWebsite] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [captchaKey, setCaptchaKey] = useState(0)
  const [images, setImages] = useState<File[]>([])
  const [designRef, setDesignRef] = useState<{ slug: string; metal?: string; lab?: number } | null>(null)
  const [designPiece, setDesignPiece] = useState<PortfolioPiece | null>(null)
  const onToken = useCallback((t: string) => setTurnstileToken(t), [])

  // Arriving from a portfolio piece page: start the message with what they were looking at.
  // Only values that match known pieces / metals / lab sizes are used, never raw text from the URL.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const piece = getPieceBySlug(params.get('piece') ?? '')
      if (!piece) return
      const metalParam = params.get('metal')
      const metalLabel = isMetalKey(metalParam)
        ? METAL_OPTIONS.find((m) => m.key === metalParam)?.label
        : undefined
      const lab = Number(params.get('lab'))
      const labText = isValidLabCarat(lab)
        ? lab === LAB_INQUIRE_CARAT
          ? `, with a ${lab} ct or larger lab grown center diamond`
          : `, with a ${lab} ct lab grown center diamond`
        : ''
      const text = `I'd love to talk about a design inspired by ${piece.name}${metalLabel ? ` in ${metalLabel}` : ''}${labText}. `
      setForm((f) => (f.message ? f : { ...f, message: text }))
      setDesignRef({
        slug: piece.slug,
        metal: isMetalKey(metalParam) ? metalParam : undefined,
        lab: isValidLabCarat(lab) ? lab : undefined,
      })
      setDesignPiece(piece)
    } catch {
      /* prefill is a convenience only */
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const formData = new FormData()
      formData.append('data', JSON.stringify({ ...form, website, startedAt, turnstileToken, design: designRef }))
      images.forEach(img => formData.append('images', img))
      const res = await fetch('/api/contact', { method: 'POST', body: formData })
      if (res.ok) {
        setStatus('sent')
        trackEvent(ANALYTICS_EVENTS.LEAD_FORM_SUBMIT, {
          location: 'contact_page',
          has_phone: form.phone ? 'yes' : 'no',
          piece: designRef?.slug,
          metal: designRef?.metal,
          lab_ct: designRef?.lab,
        })
      } else {
        setStatus('error')
        setTurnstileToken('')
        setCaptchaKey(k => k + 1)
      }
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

      {designPiece && (
        <div className={styles.designCard}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.designCardImg} src={pieceStill(designPiece)} alt={designPiece.alt} width={96} height={96} />
          <div className={styles.designCardBody}>
            <p className={styles.designCardEyebrow}>You&rsquo;re inquiring about</p>
            <p className={styles.designCardName}>{designPiece.name}</p>
            <p className={styles.designCardDetail}>
              {designRef?.metal
                ? METAL_OPTIONS.find((m) => m.key === designRef.metal)?.label
                : 'Metal not yet chosen'}
              {designRef?.lab
                ? ` · ${designRef.lab}${designRef.lab === LAB_INQUIRE_CARAT ? '+' : ''} ct lab grown center`
                : ''}
              {designPiece.base14k !== null && designRef?.metal && isMetalKey(designRef.metal)
                ? ` · From ${formatUSD(
                    settingPrice(designPiece.base14k, designRef.metal) +
                      (designRef.lab && designRef.lab !== LAB_INQUIRE_CARAT ? labDiamondPrice(designRef.lab) : 0)
                  )}`
                : ''}
            </p>
            <p className={styles.designCardNote}>This will be sent to Jonathan along with your message below.</p>
          </div>
          <button
            type="button"
            className={styles.designCardClear}
            onClick={() => { setDesignPiece(null); setDesignRef(null) }}
            aria-label="Remove this design and send a general inquiry instead"
          >
            Remove
          </button>
        </div>
      )}

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
      </div>

      <div id="faq" className={styles.faqSection}>
        <p className={styles.eyebrow}>Common questions</p>
        <h2 className={styles.faqTitle}>Everything you need to know</h2>
        <div className={styles.faqGrid}>
          {faqs.map((item, i) => (
            <div key={i} className={styles.faqItem}>
              <h3 className={styles.faqQ}>{item.q}</h3>
              <p className={styles.faqA}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
