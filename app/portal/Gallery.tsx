'use client'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './portal.module.css'

export default function Gallery({ urls, name }: { urls: string[]; name: string }) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const step = useCallback((by: number) => setActive((a) => (a + by + urls.length) % urls.length), [urls.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, step])

  return (
    <>
      <button type="button" className={styles.featured} onClick={() => setOpen(true)} aria-label="Enlarge design">
        <img src={urls[active]} alt={`${name}, design ${active + 1}`} />
        <span className={styles.zoomHint}>View larger</span>
      </button>
      {urls.length > 1 && (
        <div className={styles.thumbs}>
          {urls.map((u, i) => (
            <button key={u} type="button" className={`${styles.thumb} ${i === active ? styles.thumbOn : ''}`} onClick={() => setActive(i)} aria-label={`Show design ${i + 1}`}>
              <img src={u} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
      {open && createPortal(
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`${name} designs`} onClick={() => setOpen(false)}>
          <img key={active} src={urls[active]} alt={`${name}, design ${active + 1}`} onClick={(e) => e.stopPropagation()} />
          <button type="button" className={`${styles.lbBtn} ${styles.lbClose}`} onClick={() => setOpen(false)} aria-label="Close">×</button>
          {urls.length > 1 && (<>
            <button type="button" className={`${styles.lbBtn} ${styles.lbPrev}`} onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous design">‹</button>
            <button type="button" className={`${styles.lbBtn} ${styles.lbNext}`} onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next design">›</button>
            <span className={styles.lbCount}>{active + 1} / {urls.length}</span>
          </>)}
        </div>,
        document.body,
      )}
    </>
  )
}
