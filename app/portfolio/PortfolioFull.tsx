'use client'
import { useState } from 'react'
import styles from './PortfolioFull.module.css'
import PieceCard from './PieceCard'
import {
  publishedPortfolioPieces,
  portfolioCategories,
  type PortfolioCategory,
} from '@/lib/portfolio-pieces'

export default function PortfolioFull() {
  const [active, setActive] = useState<PortfolioCategory | 'All'>('All')

  const categories = portfolioCategories.filter((c) =>
    publishedPortfolioPieces.some((p) => p.category === c),
  )
  const shown =
    active === 'All'
      ? publishedPortfolioPieces
      : publishedPortfolioPieces.filter((p) => p.category === active)

  return (
    <>
      {categories.length > 1 && (
        <div className={styles.filters} role="group" aria-label="Filter the portfolio">
          {(['All', ...categories] as const).map((c) => {
            const count =
              c === 'All'
                ? publishedPortfolioPieces.length
                : publishedPortfolioPieces.filter((p) => p.category === c).length
            return (
              <button
                key={c}
                type="button"
                className={`${styles.chip} ${active === c ? styles.chipActive : ''}`}
                aria-pressed={active === c}
                onClick={() => setActive(c)}
              >
                {c} <span className={styles.chipCount}>{count}</span>
              </button>
            )
          })}
        </div>
      )}
      <div className={styles.grid}>
        {shown.map((piece, i) => (
          <PieceCard key={piece.slug} piece={piece} priority={i < 3} />
        ))}
      </div>
    </>
  )
}
