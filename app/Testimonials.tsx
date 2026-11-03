'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import styles from './page.module.css'

const reviews = [
  {
    headline: "Jonathan will be my jeweler for life!",
    body: "He is always a pleasure to work with and makes himself available to his clients, I would recommend him to anyone. We first met with Jonathan because he was the only jeweler that could see the vision of our engagement ring. He listens, consults, and helps his clients make the difficult design decisions.",
    name: 'Bryant S.',
    piece: 'Engagement Ring, Wedding Bands & Bracelet',
  },
  {
    headline: "We couldn\u2019t be more grateful to have found our family jeweler!",
    body: "He has taken care of every major milestone in our lives\u2014from an engagement ring and our wedding bands to a special push present. \u2026 Having a private, dedicated jeweler rather than going to a big-box retail store makes all the difference in quality and personal care.",
    name: 'Devin S.',
    piece: 'Engagement Ring, Wedding Bands & Push Present',
  },
  {
    headline: "I cannot recommend Jonathan more!",
    body: "I came in with just a vision of what I wanted, and he brought it to life. His consultative style of business is terrific. Never once did I feel pressured to go in a certain direction. He gave me the options and all the information I needed to make my vision come to life.",
    name: 'Matthew D.',
    piece: 'Engagement Ring',
  },
  {
    headline: "Incredible work!",
    body: "My wife and I both had custom wedding rings made and we absolutely love them. Jonathan did an excellent job guiding us through the process, designing the bands, selecting the perfect stones and everything else along the way.",
    name: 'David A.',
    piece: 'Custom Wedding Rings',
  },
  {
    headline: "She gets compliments on it all the time!",
    body: "Jonathan was so awesome to work with during the design process! He took meticulous notes during our conversations and helped blend my ideas together. \u2026 We are a blended family, so he gave her ring a more personal touch by adding 4 small birthstones on the inside of the band representing our combined 4 kids\u2019 birthstones.",
    name: 'Justin C.',
    piece: 'Engagement Ring',
  },
  {
    headline: "I cannot imagine getting jewelry anywhere else.",
    body: "Jonathan is a dream to work with! He made my engagement ring and our wedding bands \u2014 we got to be involved start to finish and he well exceeded our expectations. \u2026 I\u2019ve already sent multiple friends his way and they\u2019re all thrilled.",
    name: 'Bella T.',
    piece: 'Engagement Ring & Wedding Bands',
  },
  {
    headline: "I couldn\u2019t be happier with my experience and my dream ring!",
    body: "From the very beginning, he took the time to listen to the style I was looking for and made sure I felt comfortable throughout the entire process. He was patient, knowledgeable, and never made me feel pressured or rushed into making a decision.",
    name: 'Eileen B.',
    piece: 'Engagement Ring',
  },
  {
    headline: "He is our family jeweler.",
    body: "Jonathan has helped our family secure very meaningful pieces of fine jewelry. His enthusiasm and sincerity in delivering the jewelry you seek is outstanding. Creative. Great resources. Once his work for you is delivered, he stands behind it.",
    name: 'Steve B.',
    piece: 'Fine Jewelry',
  },
  {
    headline: "I had an incredible experience working with Jonathan to create a custom engagement ring.",
    body: "He took the time to understand exactly what I was looking for and made the entire process seamless and stress-free \u2014 something that\u2019s rare when designing something as personal and important as an engagement ring.",
    name: 'Marco V.',
    piece: 'Engagement Ring',
  },
]

export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    const card = el.children[0] as HTMLElement | undefined
    if (!card) return
    const step = card.offsetWidth + 16
    setIndex(Math.round(el.scrollLeft / step))
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    el.addEventListener('scroll', update, { passive: true })
    return () => el.removeEventListener('scroll', update)
  }, [update])

  const go = (dir: number) => {
    const el = track.current
    if (!el) return
    const card = el.children[0] as HTMLElement
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' })
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselTrack} ref={track} tabIndex={0} aria-label="Client reviews">
        {reviews.map((t, i) => (
          <figure key={i} className={styles.reviewCard}>
            <div className={styles.reviewStars} role="img" aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote className={styles.reviewQuote}>
              <p className={styles.reviewHeadline}>&ldquo;{t.headline}&rdquo;</p>
              <p className={styles.reviewBody}>{t.body}</p>
            </blockquote>
            <figcaption className={styles.testimonialMeta}>
              <span className={styles.testimonialName}>{t.name}</span>
              <span className={styles.testimonialPiece}>{t.piece} · Google review</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className={styles.carouselControls}>
        <button type="button" className={styles.carouselBtn} onClick={() => go(-1)} aria-label="Previous reviews">←</button>
        <span className={styles.carouselCount}>{Math.min(index + 1, reviews.length)} / {reviews.length}</span>
        <button type="button" className={styles.carouselBtn} onClick={() => go(1)} aria-label="Next reviews">→</button>
      </div>
    </div>
  )
}
