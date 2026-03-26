'use client'
import { useRef, useEffect, useState } from 'react'
import styles from './PortfolioFull.module.css'

const allPieces = [
  { ref: '252856', file: 'converted_#252856.mp4', thumbTime: 0 },
  { ref: '252862', file: 'converted_#252862.mp4', thumbTime: 0 },
  { ref: '251880', file: 'converted_#251880.mp4', thumbTime: 0 },
  { ref: '251941', file: 'converted_#251941.mp4', thumbTime: 0 },
  { ref: '252224', file: 'converted_#252224.mp4', thumbTime: 0 },
  { ref: '252421', file: 'converted_#252421.mp4', thumbTime: 0 },
  { ref: '252470', file: 'converted_#252470.mp4', thumbTime: 0 },
  { ref: '252489', file: 'converted_#252489.mp4', thumbTime: 0 },
  { ref: '252722', file: 'converted_#252722.mp4', thumbTime: 0 },
  { ref: '252844', file: 'converted_#252844.mp4', thumbTime: 0 },
  { ref: '252896', file: 'converted_#252896.mp4', thumbTime: 0 },
  { ref: '241070', file: 'converted_241070.mp4', thumbTime: 0 },
  { ref: '241554 & 241555', file: 'converted_241554 & 241555.mp4', thumbTime: 0 },
  { ref: '241587', file: 'converted_241587.mp4', thumbTime: 0 },
  { ref: '241606', file: 'converted_241606.mp4', thumbTime: 0 },
  { ref: '252025', file: 'converted_252025.mp4', thumbTime: 0 },
  { ref: '252734', file: 'converted_252734.mp4', thumbTime: 0 },
  { ref: '241120', file: 'converted_JA 241120 .mp4', thumbTime: 0 },
  { ref: '241126', file: 'converted_JA 241126.mp4', thumbTime: 0 },
  { ref: 'Stewart · Plat', file: 'converted_Stewart Plat.mp4', thumbTime: 2 },
  { ref: 'Stewart · TT', file: 'converted_Stewart TT.mp4', thumbTime: 2 },
]

function VideoCard({ piece, priority }: { piece: typeof allPieces[0], priority: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(priority)

  useEffect(() => {
    if (priority) return // already loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // start loading 200px before it enters view
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [priority])

  const handleMouseEnter = () => videoRef.current?.play()
  const handleMouseLeave = () => {
    const v = videoRef.current
    if (v) { v.pause(); v.currentTime = piece.thumbTime }
  }

  return (
    <div
      ref={containerRef}
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {shouldLoad && (
        <video
          ref={videoRef}
          className={styles.video}
          src={`/portfolio/${encodeURIComponent(piece.file)}`}
          muted
          playsInline
          loop
          preload={priority ? 'metadata' : 'none'}
          onLoadedMetadata={(e) => {
            (e.target as HTMLVideoElement).currentTime = piece.thumbTime
          }}
        />
      )}
      <div className={styles.overlay}>
        <span className={styles.refLabel}>#{piece.ref}</span>
      </div>
    </div>
  )
}

export default function PortfolioFull() {
  return (
    <div className={styles.grid}>
      {allPieces.map((piece, i) => (
        <VideoCard key={piece.ref} piece={piece} priority={i < 6} />
      ))}
    </div>
  )
}
