'use client'
import { useRef } from 'react'
import styles from './piece.module.css'

export default function PieceVideo({
  file,
  poster,
  alt,
}: {
  file: string
  poster: string
  alt: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleClick = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play()
    else v.pause()
  }

  return (
    <video
      ref={videoRef}
      className={styles.video}
      src={`/portfolio/${encodeURIComponent(file)}`}
      muted
      playsInline
      loop
      autoPlay
      poster={poster}
      preload="metadata"
      aria-label={alt}
      onClick={handleClick}
    />
  )
}
