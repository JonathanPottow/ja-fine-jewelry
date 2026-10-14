'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './piece.module.css'

/**
 * Turntable video the visitor can "spin" by hand.
 * - Plays on a loop at normal speed.
 * - Drag left/right anywhere on the video to rotate the piece (one full width = one full turn).
 * - Drag or click the bar underneath to jump to any angle.
 * - A quick tap toggles play / pause. After a drag it stays paused on that angle.
 */
export default function PieceVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ mode: 'stage' | 'bar'; x: number; y: number; t: number; moved: boolean; id: number } | null>(null)
  const pending = useRef<number | null>(null)
  const seeking = useRef(false)
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [hint, setHint] = useState(true)
  const [dragging, setDragging] = useState(false)

  const duration = () => {
    const d = videoRef.current?.duration
    return d && isFinite(d) ? d : 0
  }

  // Seek without flooding the decoder: keep only the latest requested time.
  const seekTo = useCallback((time: number) => {
    const v = videoRef.current
    const d = duration()
    if (!v || !d) return
    const wrapped = ((time % d) + d) % d
    setProgress(wrapped / d)
    if (seeking.current) {
      pending.current = wrapped
      return
    }
    seeking.current = true
    v.currentTime = wrapped
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onSeeked = () => {
      seeking.current = false
      if (pending.current !== null) {
        const t = pending.current
        pending.current = null
        seeking.current = true
        v.currentTime = t
      }
    }
    let raf = 0
    const tick = () => {
      const d = duration()
      if (d && !drag.current && !v.paused) setProgress(v.currentTime / d)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    v.addEventListener('seeked', onSeeked)
    return () => {
      cancelAnimationFrame(raf)
      v.removeEventListener('seeked', onSeeked)
    }
  }, [])

  const pause = () => {
    videoRef.current?.pause()
    setPlaying(false)
  }
  const play = () => {
    videoRef.current?.play().catch(() => {})
    setPlaying(true)
  }

  const barTime = (clientX: number) => {
    const r = barRef.current?.getBoundingClientRect()
    if (!r) return 0
    return Math.min(Math.max((clientX - r.left) / r.width, 0), 0.9999) * duration()
  }

  const onPointerDown = (mode: 'stage' | 'bar') => (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const v = videoRef.current
    if (!v) return
    drag.current = { mode, x: e.clientX, y: e.clientY, t: v.currentTime, moved: false, id: e.pointerId }
    setHint(false)
    if (mode === 'bar') {
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
      pause()
      setDragging(true)
      drag.current.moved = true
      seekTo(barTime(e.clientX))
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const g = drag.current
    if (!g || g.id !== e.pointerId) return
    if (g.mode === 'bar') {
      seekTo(barTime(e.clientX))
      return
    }
    const dx = e.clientX - g.x
    const dy = e.clientY - g.y
    if (!g.moved) {
      // Only take over once the gesture is clearly sideways, so phones can still scroll the page.
      if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy)) return
      g.moved = true
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
      pause()
      setDragging(true)
    }
    const w = stageRef.current?.clientWidth || 600
    seekTo(g.t - (dx / w) * duration())
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const g = drag.current
    if (!g || g.id !== e.pointerId) return
    drag.current = null
    setDragging(false)
    if (g.mode === 'stage' && !g.moved) {
      // A plain tap (no drag): toggle play / pause.
      if (videoRef.current?.paused) play()
      else pause()
      return
    }
    if (g.moved) {
      // Finished dragging (stage or bar): resume the normal rotation from here.
      play()
    }
  }

  const onKey = (e: React.KeyboardEvent) => {
    const v = videoRef.current
    if (!v) return
    const step = duration() / 36
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      pause()
      setHint(false)
      seekTo(v.currentTime + (e.key === 'ArrowRight' ? step : -step))
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      if (v.paused) play()
      else pause()
    }
  }

  return (
    <div className={styles.player}>
      <div
        ref={stageRef}
        className={`${styles.stage} ${dragging ? styles.stageDragging : ''}`}
        onPointerDown={onPointerDown('stage')}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <video
          ref={videoRef}
          className={styles.video}
          src={src}
          muted
          playsInline
          loop
          autoPlay
          poster={poster}
          preload="auto"
          aria-label={alt}
          disablePictureInPicture
        />
        <div className={`${styles.hint} ${hint ? '' : styles.hintHidden}`} aria-hidden="true">
          <span className={styles.hintArrows}>&#8592; &#8594;</span> Drag to rotate
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.playBtn}
          onClick={() => (playing ? pause() : play())}
          aria-label={playing ? 'Pause rotation' : 'Play rotation'}
        >
          {playing ? (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="3" y="2" width="3.2" height="12" fill="currentColor" /><rect x="9.8" y="2" width="3.2" height="12" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 2l10 6-10 6z" fill="currentColor" /></svg>
          )}
        </button>
        <div
          ref={barRef}
          className={styles.bar}
          role="slider"
          tabIndex={0}
          aria-label="Rotate the piece"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          onPointerDown={onPointerDown('bar')}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKey}
        >
          <div className={styles.barTrack} />
          <div className={styles.barFill} style={{ width: `${progress * 100}%` }} />
          <div className={styles.barThumb} style={{ left: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  )
}
