'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './piece.module.css'
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics'
import {
  METAL_OPTIONS,
  LAB_DIAMOND_PRICES,
  LAB_INQUIRE_CARAT,
  settingPrice,
  labDiamondPrice,
  formatUSD,
  type MetalKey,
} from '@/lib/pricing'

interface Props {
  slug: string
  name: string
  category: string
  mixedMetals?: boolean
  defaultMetal: MetalKey
  base14k: number | null
  offersCenterStone: boolean
}

export default function PieceConfigurator({
  slug,
  name,
  category,
  mixedMetals,
  defaultMetal,
  base14k,
  offersCenterStone,
}: Props) {
  const [metal, setMetal] = useState<MetalKey>(defaultMetal)
  const [lab, setLab] = useState(0)
  const [diamondType, setDiamondType] = useState<'unset' | 'lab' | 'natural'>('unset')
  const [stickyVisible, setStickyVisible] = useState(false)
  const ctaRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.PORTFOLIO_PIECE_VIEW, { piece: slug, piece_name: name, category })
  }, [slug, name, category])

  useEffect(() => {
    const el = ctaRowRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const setting = base14k === null ? null : settingPrice(base14k, metal)
  const total = setting === null ? null : setting + labDiamondPrice(lab)
  const metalLabel = METAL_OPTIONS.find((m) => m.key === metal)?.label ?? ''

  const params = new URLSearchParams({ piece: slug, metal })
  if (diamondType === 'lab' && lab) params.set('lab', String(lab))
  if (diamondType === 'natural') params.set('diamond', 'natural')

  const naturalParams = new URLSearchParams({ piece: slug, metal, diamond: 'natural' })

  return (
    <div className={styles.config}>
      <div className={styles.field}>
        <label htmlFor="metal" className={styles.fieldLabel}>Metal</label>
        <div className={styles.selectWrap}>
          <select
            id="metal"
            className={styles.select}
            value={metal}
            onChange={(e) => setMetal(e.target.value as MetalKey)}
          >
            {METAL_OPTIONS.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
                {m.key === defaultMetal ? ' (as pictured)' : ''}
              </option>
            ))}
          </select>
        </div>
        <p className={styles.fieldHint}>
          Yellow, white, or rose gold available.
          {mixedMetals ? ' Pictured with mixed metals; details are tailored to you.' : ''}
        </p>
      </div>

      {setting !== null ? (
        <div className={styles.priceBlock} aria-live="polite">
          <p className={styles.priceLabel}>Setting from</p>
          <p className={styles.price}>{formatUSD(setting)}</p>
          <p className={styles.priceNote}>
            {metalLabel} · {offersCenterStone ? 'setting only, center diamond priced separately' : 'approximate starting price'}
          </p>
        </div>
      ) : (
        <div className={styles.priceBlock}>
          <p className={styles.priceLabel}>Investment</p>
          <p className={styles.priceText}>Quoted individually, based on the stones you choose.</p>
        </div>
      )}

      {offersCenterStone && setting !== null && (
        <>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Center diamond</span>
            <div className={styles.diamondChoice}>
              <button
                type="button"
                className={`${styles.diamondOption} ${diamondType === 'lab' ? styles.diamondOptionActive : ''}`}
                onClick={() => setDiamondType('lab')}
                aria-pressed={diamondType === 'lab'}
              >
                <span className={styles.diamondOptionTitle}>Lab Grown</span>
                <span className={styles.diamondOptionSub}>Priced instantly, 1&ndash;5 ct below</span>
              </button>
              <button
                type="button"
                className={`${styles.diamondOption} ${diamondType === 'natural' ? styles.diamondOptionActive : ''}`}
                onClick={() => setDiamondType('natural')}
                aria-pressed={diamondType === 'natural'}
              >
                <span className={styles.diamondOptionTitle}>Natural</span>
                <span className={styles.diamondOptionSub}>Sourced personally for you</span>
              </button>
            </div>
          </div>

          {diamondType === 'lab' && (
            <div className={styles.field}>
              <label htmlFor="lab" className={styles.fieldLabel}>Carat weight</label>
              <div className={styles.selectWrap}>
                <select
                  id="lab"
                  className={styles.select}
                  value={lab}
                  onChange={(e) => setLab(Number(e.target.value))}
                >
                  <option value={0}>Setting only &mdash; choose a size</option>
                  {LAB_DIAMOND_PRICES.map((d) => (
                    <option key={d.carat} value={d.carat}>
                      {d.carat} ct · {formatUSD(d.price)}
                    </option>
                  ))}
                  <option value={LAB_INQUIRE_CARAT}>{LAB_INQUIRE_CARAT} ct and up · inquire</option>
                </select>
              </div>
              <p className={styles.fieldHint}>
                Any shape · E–F color · VVS1–VVS2 clarity · IGI certified
              </p>
            </div>
          )}

          {diamondType === 'lab' && lab === LAB_INQUIRE_CARAT && (
            <div className={styles.totalBlock} aria-live="polite">
              <p className={styles.priceLabel}>Complete ring</p>
              <p className={styles.priceText}>Inquire for pricing</p>
              <p className={styles.priceNote}>
                Lab grown diamonds of {LAB_INQUIRE_CARAT} ct and larger are quoted individually. Jonathan will send exact options.
              </p>
            </div>
          )}

          {diamondType === 'lab' && lab > 0 && lab !== LAB_INQUIRE_CARAT && total !== null && (
            <div className={styles.totalBlock} aria-live="polite">
              <p className={styles.priceLabel}>Complete ring from</p>
              <p className={styles.totalPrice}>{formatUSD(total)}</p>
              <p className={styles.priceNote}>
                {formatUSD(setting)} setting + {formatUSD(labDiamondPrice(lab))} for a {lab} ct lab grown diamond
              </p>
            </div>
          )}

          {diamondType === 'natural' && (
            <div className={styles.naturalNote}>
              <p className={styles.naturalTitle}>A diamond chosen just for you</p>
              <p className={styles.naturalBody}>
                Every natural diamond is one of a kind, which is exactly why it is never priced
                from a dropdown. Jonathan hand-sources a short list of natural stones that fit
                your vision, your size, and your budget, and walks you through each one in
                person &mdash; nothing is chosen until you have seen and compared your options.
              </p>
              <Link href={`/contact?${naturalParams.toString()}`} className={styles.naturalCta}>
                Start a Natural Diamond Consultation
              </Link>
            </div>
          )}
        </>
      )}

      <p className={styles.disclaimer}>
        All prices are approximate starting points in USD. The final investment depends on
        design details, metal, and stones, and is always agreed with you before anything begins.
      </p>

      <div className={styles.ctaRow} ref={ctaRowRef}>
        <Link href={`/contact?${params.toString()}`} className={styles.ctaPrimary}>
          Begin a Conversation About This Design
        </Link>
        <Link href="/portfolio" className={styles.ctaSecondary}>
          ← Back to Portfolio
        </Link>
      </div>

      <div className={`${styles.stickyCta} ${stickyVisible ? styles.stickyCtaVisible : ''}`}>
        <Link href={`/contact?${params.toString()}`} className={styles.stickyCtaBtn}>
          Begin a Conversation
        </Link>
      </div>
    </div>
  )
}
