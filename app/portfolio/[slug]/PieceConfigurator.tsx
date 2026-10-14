'use client'
import { useState, useEffect } from 'react'
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

  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.PORTFOLIO_PIECE_VIEW, { piece: slug, piece_name: name, category })
  }, [slug, name, category])

  const setting = base14k === null ? null : settingPrice(base14k, metal)
  const total = setting === null ? null : setting + labDiamondPrice(lab)
  const metalLabel = METAL_OPTIONS.find((m) => m.key === metal)?.label ?? ''

  const params = new URLSearchParams({ piece: slug, metal })
  if (lab) params.set('lab', String(lab))

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
            <label htmlFor="lab" className={styles.fieldLabel}>Add a lab grown center diamond</label>
            <div className={styles.selectWrap}>
              <select
                id="lab"
                className={styles.select}
                value={lab}
                onChange={(e) => setLab(Number(e.target.value))}
              >
                <option value={0}>No center diamond (setting only)</option>
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

          {lab === LAB_INQUIRE_CARAT && (
            <div className={styles.totalBlock} aria-live="polite">
              <p className={styles.priceLabel}>Complete ring</p>
              <p className={styles.priceText}>Inquire for pricing</p>
              <p className={styles.priceNote}>
                Lab grown diamonds of {LAB_INQUIRE_CARAT} ct and larger are quoted individually. Jonathan will send exact options.
              </p>
            </div>
          )}

          {lab > 0 && lab !== LAB_INQUIRE_CARAT && total !== null && (
            <div className={styles.totalBlock} aria-live="polite">
              <p className={styles.priceLabel}>Complete ring from</p>
              <p className={styles.totalPrice}>{formatUSD(total)}</p>
              <p className={styles.priceNote}>
                {formatUSD(setting)} setting + {formatUSD(labDiamondPrice(lab))} for a {lab} ct lab grown diamond
              </p>
            </div>
          )}

          <div className={styles.naturalNote}>
            <p className={styles.naturalTitle}>Prefer a natural diamond?</p>
            <p className={styles.naturalBody}>
              Natural diamonds vary enormously in size, quality, and value, so we do not
              publish natural diamond pricing online. Choosing one is a private, personal
              conversation: Jonathan sources options to your vision and budget and walks
              you through every choice.
            </p>
          </div>
        </>
      )}

      <p className={styles.disclaimer}>
        All prices are approximate starting points in USD. The final investment depends on
        design details, metal, and stones, and is always agreed with you before anything begins.
      </p>

      <div className={styles.ctaRow}>
        <Link href={`/contact?${params.toString()}`} className={styles.ctaPrimary}>
          Begin a Conversation About This Design
        </Link>
        <Link href="/portfolio" className={styles.ctaSecondary}>
          ← Back to Portfolio
        </Link>
      </div>
    </div>
  )
}
