'use client'
import { useEffect, useState } from 'react'
import styles from './PortfolioFull.module.css'
import PieceCard from './PieceCard'
import { getSavedDesigns, onFavoritesChanged } from '@/lib/favorites'
import {
  publishedPortfolioPieces,
  portfolioCategories,
  type PortfolioCategory,
} from '@/lib/portfolio-pieces'

type Filter = PortfolioCategory | 'All' | 'Saved'

export default function PortfolioFull() {
  const [active, setActive] = useState<Filter>('All')
  const [savedSlugs, setSavedSlugs] = useState<string[]>([])

  useEffect(() => {
    setSavedSlugs(getSavedDesigns())
    return onFavoritesChanged(() => setSavedSlugs(getSavedDesigns()))
  }, [])

  const categories = portfolioCategories.filter((c) =>
    publishedPortfolioPieces.some((p) => p.category === c),
  )

  const shown =
    active === 'All'
      ? publishedPortfolioPieces
      : active === 'Saved'
        ? publishedPortfolioPieces.filter((p) => savedSlugs.includes(p.slug))
        : publishedPortfolioPieces.filter((p) => p.category === active)

  const showFilters = categories.length > 1 || savedSlugs.length > 0

  return (
    <>
      {showFilters && (
        <div className={styles.filters} role="group" aria-label="Filter the portfolio">
          {categories.length > 1 &&
            (['All', ...categories] as const).map((c) => {
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
          {savedSlugs.length > 0 && (
            <button
              type="button"
              className={`${styles.chip} ${styles.chipSaved} ${active === 'Saved' ? styles.chipActive : ''}`}
              aria-pressed={active === 'Saved'}
              onClick={() => setActive(active === 'Saved' ? 'All' : 'Saved')}
            >
              &#9825; Saved <span className={styles.chipCount}>{savedSlugs.length}</span>
            </button>
          )}
        </div>
      )}
      {active === 'Saved' && shown.length === 0 ? (
        <p className={styles.emptySaved}>
          Nothing saved yet. Tap the heart on any design to shortlist it for comparison.
        </p>
      ) : (
        <div className={styles.grid}>
          {shown.map((piece, i) => (
            <PieceCard key={piece.slug} piece={piece} priority={i < 3} />
          ))}
        </div>
      )}
    </>
  )
}
