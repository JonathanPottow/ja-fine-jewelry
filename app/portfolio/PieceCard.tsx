'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './PieceCard.module.css'
import { pieceStill, type PortfolioPiece } from '@/lib/portfolio-pieces'
import { settingPrice, formatUSD } from '@/lib/pricing'

/**
 * One portfolio tile. Shows a lightweight still image; the video only loads
 * while the visitor hovers (or focuses) the tile. Tapping opens the piece page.
 */
export default function PieceCard({
  piece,
  className = '',
  showPrice = true,
  priority = false,
}: {
  piece: PortfolioPiece
  className?: string
  showPrice?: boolean
  priority?: boolean
}) {
  const [playing, setPlaying] = useState(false)
  const still = pieceStill(piece)

  return (
    <Link
      href={`/portfolio/${piece.slug}`}
      className={`${styles.card} ${className}`}
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      onFocus={() => setPlaying(true)}
      onBlur={() => setPlaying(false)}
      aria-label={`${piece.name} — view details`}
    >
      <div className={styles.frame}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.media}
        src={still}
        alt={piece.alt}
        width={1000}
        height={1000}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      {playing && (
        <video
          className={`${styles.media} ${styles.video}`}
          src={`/portfolio/${encodeURIComponent(piece.file)}`}
          poster={still}
          muted
          playsInline
          loop
          autoPlay
          aria-hidden="true"
        />
      )}
      </div>
      <div className={styles.overlay}>
        <span className={styles.name}>{piece.name}</span>
        {showPrice && piece.base14k !== null && (
          <span className={styles.price}>
            Setting from {formatUSD(settingPrice(piece.base14k, piece.defaultMetal))}
          </span>
        )}
      </div>
    </Link>
  )
}
