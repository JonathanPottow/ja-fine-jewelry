'use client'
import { useEffect, useState } from 'react'
import { isSaved, toggleSaved, onFavoritesChanged } from '@/lib/favorites'
import styles from './FavoriteButton.module.css'

interface Props {
  slug: string
  name: string
  /** 'tile' sits in the corner of a portfolio card; 'detail' is a labeled button for the piece page. */
  variant?: 'tile' | 'detail'
  className?: string
}

export default function FavoriteButton({ slug, name, variant = 'tile', className = '' }: Props) {
  const [saved, setSaved] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSaved(isSaved(slug))
    return onFavoritesChanged(() => setSaved(isSaved(slug)))
  }, [slug])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSaved(toggleSaved(slug))
  }

  // Avoid a flash of the wrong state before localStorage has been read.
  if (!mounted) {
    return (
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className={`${styles.btn} ${styles[variant]} ${className}`}
      >
        <HeartIcon filled={false} />
      </button>
    )
  }

  const label = saved ? `Remove ${name} from saved designs` : `Save ${name} to your designs`

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className={`${styles.btn} ${styles[variant]} ${saved ? styles.active : ''} ${className}`}
    >
      <HeartIcon filled={saved} />
      {variant === 'detail' && <span className={styles.label}>{saved ? 'Saved' : 'Save Design'}</span>}
    </button>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20.5s-7.5-4.6-10-9.4C.6 7.8 2 4.5 5.2 3.6c2.3-.6 4.3.4 6.8 3 2.5-2.6 4.5-3.6 6.8-3C22 4.5 23.4 7.8 22 11.1c-2.5 4.8-10 9.4-10 9.4z" />
    </svg>
  )
}
