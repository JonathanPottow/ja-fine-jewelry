'use client'
import { useEffect, useState } from 'react'
import styles from './PortfolioGrid.module.css'
import PieceCard from './portfolio/PieceCard'
import { publishedPortfolioPieces, type PortfolioPiece } from '@/lib/portfolio-pieces'

export default function PortfolioGrid() {
  const [picks, setPicks] = useState<PortfolioPiece[]>([])

  useEffect(() => {
    // Feature rings and bridal sets on the homepage; shuffle so repeat visitors see variety
    const pool = publishedPortfolioPieces.filter((p) => p.category !== 'Pendants')
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    setPicks(shuffled.slice(0, 3))
  }, [])

  if (picks.length === 0) return null

  return (
    <div className={styles.grid}>
      <PieceCard piece={picks[0]} className={styles.featured} showPrice={false} priority />
      <PieceCard piece={picks[1]} showPrice={false} />
      <PieceCard piece={picks[2]} showPrice={false} />
    </div>
  )
}
