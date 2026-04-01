import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'The Experience | Bespoke Jewelry Process Charlotte NC',
  description: 'Discover what it feels like to work with Jonathan Pottow at Jonathan Alistair Fine Jewelry. A private, white-glove bespoke jewelry experience from first conversation to final delivery. Charlotte NC.',
  alternates: { canonical: '/experience' },
  openGraph: {
    title: 'The Bespoke Experience | Jonathan Alistair Fine Jewelry Charlotte NC',
    description: 'From first conversation to final delivery — a private, pressure-free journey to the piece you have always imagined.',
    url: 'https://www.jafinejewelry.com/experience',
  },
}

const steps = [
  {
    num: '01',
    title: 'You Reach Out',
    subtitle: 'No pressure. No pitch.',
    body: 'It starts with a simple message. Tell Jonathan what you have in mind — even if the idea is still forming. There are no wrong answers and no pressure to commit to anything. This is just a conversation.',
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
        <circle cx="40" cy="40" r="30" stroke="#c9b99a" strokeWidth="0.5"/>
        <circle cx="40" cy="40" r="18" stroke="#8a6e4b" strokeWidth="1"/>
        <circle cx="40" cy="40" r="4" fill="#8a6e4b" opacity="0.5"/>
        <line x1="40" y1="10" x2="40" y2="22" stroke="#c9b99a" strokeWidth="0.5"/>
        <line x1="40" y1="58" x2="40" y2="70" stroke="#c9b99a" strokeWidth="0.5"/>
        <line x1="10" y1="40" x2="22" y2="40" stroke="#c9b99a" strokeWidth="0.5"/>
        <line x1="58" y1="40" x2="70" y2="40" stroke="#c9b99a" strokeWidth="0.5"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Your Consultation',
    subtitle: 'Jonathan listens first.',
    body: 'Every commission begins with Jonathan understanding you — your story, the person you are buying for, and what this piece means. He asks questions most jewelers never think to ask. By the end, you will feel heard and confident about the direction.',
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
        <path d="M20 55 Q20 25 40 25 Q60 25 60 45 Q60 62 40 62 Q32 62 26 58 L18 62 Z" stroke="#8a6e4b" strokeWidth="1" fill="none"/>
        <line x1="32" y1="40" x2="48" y2="40" stroke="#c9b99a" strokeWidth="0.5"/>
        <line x1="32" y1="47" x2="44" y2="47" stroke="#c9b99a" strokeWidth="0.5"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'The Design',
    subtitle: 'Your vision, brought to life.',
    body: 'Jonathan creates detailed renderings — sometimes multiple concepts — so you can see exactly what your piece will look like before anything is made. Adjustments are welcome. Nothing moves forward until you love it.',
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
        <rect x="18" y="20" width="44" height="40" rx="2" stroke="#8a6e4b" strokeWidth="1"/>
        <line x1="18" y1="30" x2="62" y2="30" stroke="#c9b99a" strokeWidth="0.5"/>
        <path d="M28 42 L35 35 L42 42 L50 36" stroke="#8a6e4b" strokeWidth="1" fill="none"/>
        <circle cx="50" cy="36" r="2" fill="#8a6e4b" opacity="0.5"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'The Creation',
    subtitle: 'Crafted with intention.',
    body: 'Your piece is handcrafted using ethically sourced materials. Every stone is hand-selected for quality and character. This is not production jewelry — it is made specifically for the person who will wear it, with no shortcuts.',
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
        <polygon points="40,15 50,32 68,35 55,48 58,66 40,57 22,66 25,48 12,35 30,32" stroke="#8a6e4b" strokeWidth="1" fill="none"/>
        <polygon points="40,25 46,35 57,37 49,45 51,56 40,51 29,56 31,45 23,37 34,35" stroke="#c9b99a" strokeWidth="0.5" fill="none"/>
        <circle cx="40" cy="40" r="3" fill="#8a6e4b" opacity="0.4"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'The Delivery',
    subtitle: 'A moment worth remembering.',
    body: 'The handoff is part of the experience. Jonathan presents your piece personally — with the story of how it was made. This is the moment everything comes together, and it is designed to feel as special as what you are holding.',
    svg: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
        <rect x="20" y="35" width="40" height="28" rx="2" stroke="#8a6e4b" strokeWidth="1"/>
        <path d="M28 35 Q28 20 40 20 Q52 20 52 35" stroke="#8a6e4b" strokeWidth="1" fill="none"/>
        <circle cx="40" cy="49" r="5" stroke="#c9b99a" strokeWidth="0.5" fill="none"/>
        <circle cx="40" cy="49" r="2" fill="#8a6e4b" opacity="0.5"/>
        <line x1="40" y1="54" x2="40" y2="60" stroke="#c9b99a" strokeWidth="0.5"/>
      </svg>
    ),
  },
]

const faqs = [
  {
    q: 'What is the investment for a custom piece?',
    a: 'Every commission is different — a bespoke engagement ring with a rare stone is a very different project from a refined anniversary band or a reimagined heirloom. As a guide, most custom commissions begin from $4,000, though the right number depends entirely on your vision, materials, and level of detail. What you will never experience is pressure, hidden costs, or a recommendation that is not genuinely in your best interest. Have a budget in mind? Share it when you reach out — Jonathan will always be honest about what is possible.',
  },
  {
    q: 'Do I need to know exactly what I want before reaching out?',
    a: 'Not at all — and most clients do not. Some arrive with a clear vision. Others come with a feeling, an occasion, or a photograph saved on their phone. A few come with nothing more than a sense that they want something truly one of a kind. All of it is a perfectly fine place to start. Jonathan\'s first job is to listen — to understand you, the person you are creating this for, and what this piece needs to mean.',
  },
  {
    q: 'How long does the process take?',
    a: 'Most commissions move from first conversation to finished piece in four to eight weeks. More intricate designs or rare stone sourcing may take a little longer — Jonathan will give you a clear and honest timeline upfront so there are no surprises. If you are working toward a specific date — a proposal, an anniversary, a birthday — mention it when you reach out.',
  },
  {
    q: 'What does the design process look like?',
    a: 'Once Jonathan understands your vision, he creates detailed CAD renderings — precise, three-dimensional representations of your piece — so you can see exactly what it will look like before a single stone is set or a gram of metal is touched. Nothing moves forward until you love what you see. Revisions are welcomed, not rationed.',
  },
  {
    q: 'Is a deposit required to begin?',
    a: 'Yes. To begin the design and production process, Jonathan requires a 50% deposit, with the remaining balance due upon completion before delivery. This protects your commission and allows Jonathan to source your materials and allocate the time your piece deserves. All deposits and pricing are discussed openly before any commitment is made.',
  },
]

export default function Experience() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>The Jonathan Alistair Fine Jewelry Experience</p>
          <h1 className={styles.heroTitle}>
            From first conversation<br />
            to <em>final piece.</em>
          </h1>
          <p className={styles.heroSubtext}>
            A private, white-glove process designed around you —
            not the other way around.
          </p>
          <Link href="/contact" className={styles.heroCta}>
            Let's Talk
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className={styles.introSection}>
        <div className={styles.introInner}>
          <div className={styles.introQuote}>
            <p>
              "Most people have never experienced what it actually feels like
              to have a piece made just for them. That is exactly what
              Jonathan Alistair Fine Jewelry exists to change."
            </p>
            <cite>— Jonathan Pottow</cite>
          </div>
          <div className={styles.introText}>
            <p>
              Working with a private jeweler should feel different from walking
              into a store. There is no sales floor, no commission pressure,
              no generic options pulled from a case. There is just Jonathan —
              sitting on your side of the table, guiding you through one of
              the most meaningful purchases you will ever make.
            </p>
            <p>
              The process is personal, collaborative, and entirely at your pace.
              Here is what to expect.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className={styles.stepsSection}>
        <div className={styles.stepsInner}>
          {steps.map((step, i) => (
            <div key={step.num} className={`${styles.step} ${i % 2 === 0 ? styles.stepEven : styles.stepOdd}`}>
              <div className={styles.stepVisual}>
                <div className={styles.stepImg}><Image src={`/experience-${['reach-out','consultation','design','creation','delivery'][i]}.jpg`} alt={step.title} fill style={{objectFit:'cover',objectPosition:'center'}} /></div>
                <div className={styles.stepNumBig}>{step.num}</div>
              </div>
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>{step.title}</h2>
                <p className={styles.stepSubtitle}>{step.subtitle}</p>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What makes it different */}
      <section className={styles.differenceSection}>
        <div className={styles.differenceInner}>
          <p className={styles.eyebrow}>What sets this apart</p>
          <h2 className={styles.differenceTitle}>
            This is not a jewelry store.<br />
            <em>This is your jeweler.</em>
          </h2>
          <div className={styles.differenceGrid}>
            {[
              { title: 'One client at a time', body: 'Jonathan works with a small number of clients simultaneously — so every commission receives his full attention from start to finish.' },
              { title: 'No pressure, ever', body: 'There are no sales targets, no upsells, no urgency tactics. The only goal is a piece you will treasure for the rest of your life.' },
              { title: 'Transparent from day one', body: 'Jonathan walks you through pricing, timelines, and options clearly and honestly — so you can make decisions with full confidence.' },
              { title: 'A relationship, not a transaction', body: 'Many of Jonathan\'s clients return for anniversaries, birthdays, and milestones. The first piece is just the beginning.' },
            ].map((card, i) => (
              <div key={i} className={styles.differenceCard}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className={styles.testimonialSection}>
        <div className={styles.testimonialInner}>
          <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="32" style={{margin: '0 auto 2rem', display: 'block', opacity: 0.4}}>
            <path d="M0 40 Q0 10 15 0 L20 8 Q10 15 12 28 L20 28 L20 40 Z" fill="#8a6e4b"/>
            <path d="M30 40 Q30 10 45 0 L50 8 Q40 15 42 28 L50 28 L50 40 Z" fill="#8a6e4b"/>
          </svg>
          <p className={styles.testimonialQuote}>
            "Working with Jonathan felt like working with a trusted friend
            who happened to be an expert. No pressure, no rush —
            just genuine care for getting it exactly right."
          </p>
          <cite className={styles.testimonialCite}>— David R., Anniversary Band</cite>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <p className={styles.eyebrow}>Ready when you are</p>
          <h2 className={styles.ctaTitle}>
            The best time to start<br />
            <em>is right now.</em>
          </h2>
          <p className={styles.ctaText}>
            Whether you have a clear vision or just a feeling — reach out.
            Jonathan responds personally to every inquiry within 48 hours.
          </p>
          <Link href="/contact" className={styles.ctaBtn}>
            Let's Talk
          </Link>
        </div>
      </section>

    </div>
  )
}
