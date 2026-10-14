import Link from 'next/link'
import styles from './PieceCard.module.css'
import { pieceStill, type PortfolioPiece } from '@/lib/portfolio-pieces'
import { settingPrice, formatUSD } from '@/lib/pricing'

/**
 * One portfolio tile: a lightweight still image (no video), name and starting price.
 * The full turntable video lives on the piece page.
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
  return (
    <Link
      href={`/portfolio/${piece.slug}`}
      className={`${styles.card} ${className}`}
      aria-label={`${piece.name}, view details`}
    >
      <div className={styles.frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.media}
          src={pieceStill(piece)}
          alt={piece.alt}
          width={1000}
          height={1000}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
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
