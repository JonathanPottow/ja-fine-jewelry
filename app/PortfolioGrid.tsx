'use client'
import { useRef } from 'react'
import styles from './PortfolioGrid.module.css'

const pieces = [
  { ref: '252856', file: '252856.mp4' },
  { ref: '252862', file: '252862.mp4' },
  { ref: '251880', file: '#251880.mp4' },
  { ref: '251941', file: '#251941.mp4' },
  { ref: '252224', file: '#252224.mp4' },
  { ref: '252421', file: '#252421.mp4' },
  { ref: '252470', file: '#252470.mp4' },
  { ref: '252489', file: '#252489.mp4' },
  { ref: '252722', file: '#252722.mp4' },
  { ref: '252844', file: '#252844.mp4' },
  { ref: '252896', file: '#252896.mp4' },
  { ref: '241070', file: '241070.mp4' },
  { ref: '241554 & 241555', file: '241554 & 241555.mp4' },
  { ref: '241587', file: '241587.mp4' },
  { ref: '241606', file: '241606.mp4' },
  { ref: '252025', file: '252025.mp4' },
  { ref: '252734', file: '252734.mp4' },
  { ref: '241120', file: 'JA 241120 .mp4' },
  { ref: '241126', file: 'JA 241126.mp4' },
  { ref: 'Stewart · Plat', file: 'Stewart Plat.MOV' },
  { ref: 'Stewart · TT', file: 'Stewart TT.MOV' },
]

function VideoCard({ piece, featured }: { piece: typeof pieces[0], featured?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    videoRef.current?.play()
  }

  const handleMouseLeave = () => {
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
  }

  return (
    <div
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className={styles.video}
        src={`/portfolio/${piece.file}`}
        muted
        playsInline
        loop
        preload="metadata"
      />
      <div className={styles.overlay}>
        <span className={styles.refLabel}>#{piece.ref}</span>
      </div>
    </div>
  )
}

export default function PortfolioGrid() {
  return (
    <div className={styles.grid}>
      {pieces.map((piece, i) => (
        <VideoCard key={piece.ref} piece={piece} featured={i === 0} />
      ))}
    </div>
  )
}
