'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './shop.module.css'

interface Product {
  id: string
  name: string
  slug?: string
  actualPriceRange?: { minValue?: { amount: string } }
  media?: { mainMedia?: { image?: { url: string } } }
}

const FILTERS = ['All', 'Fine Pieces', 'Consultation Deposit']

function formatPrice(p: Product) {
  const a = p.actualPriceRange?.minValue?.amount
  if (!a) return 'Price on request'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(parseFloat(a))
}

function getCat(p: Product) {
  return p.name.toLowerCase().includes('deposit') ? 'Consultation Deposit' : 'Fine Pieces'
}

export default function ShopClient({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('All')
  const filtered = products.filter(p => filter === 'All' ? true : getCat(p) === filter)
  const deposit = products.find(p => p.name.toLowerCase().includes('deposit'))
  const pieces = products.filter(p => !p.name.toLowerCase().includes('deposit'))
  const featured = filter === 'All' ? pieces[0] : filtered[0]
  const rest = filter === 'All' ? pieces.slice(1, 5) : filtered.slice(1, 5)

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <h1 className={styles.heroTitle}>Fine jewelry.<br /><em>Worth keeping.</em></h1>
        </div>
        <div className={styles.heroRight}>
          <span className={styles.heroEye}>Jonathan Alistair Fine Jewelry</span>
          <p className={styles.heroMeta}>Ships nationwide &middot; 30-day returns</p>
        </div>
      </div>
      <div className={styles.filters}>
        {FILTERS.map(f => (
          <button key={f} className={`${styles.filter} ${filter === f ? styles.filterActive : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <span className={styles.filterCount}>{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</span>
      </div>
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>New pieces arriving soon.</p>
          <p className={styles.emptyText}>Check back shortly or begin a bespoke commission below.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {featured && (
            <Link href={`/shop/${featured.slug || featured.id}`} className={`${styles.cell} ${styles.cellFeatured}`}>
              <div className={styles.cellImg} style={featured.media?.mainMedia?.image?.url ? { backgroundImage: `url(${featured.media.mainMedia.image.url})` } : {}}>
                {!featured.media?.mainMedia?.image?.url && <svg viewBox="0 0 120 120" width="60" height="60" fill="none"><circle cx="60" cy="60" r="35" stroke="#8a6e4b" strokeWidth="1"/><ellipse cx="60" cy="25" rx="10" ry="13" fill="#d4c4af" stroke="#8a6e4b" strokeWidth="1"/></svg>}
                <span className={`${styles.badge} ${styles.badgeFeatured}`}>Featured</span>
              </div>
              <div className={styles.cellBody}>
                <span className={styles.cellCat}>{getCat(featured)}</span>
                <div className={styles.cellName}>{featured.name}</div>
                <div className={styles.cellPrice}>{formatPrice(featured)}</div>
              </div>
            </Link>
          )}
          {rest.map(p => (
            <Link key={p.id} href={`/shop/${p.slug || p.id}`} className={styles.cell}>
              <div className={styles.cellImg} style={p.media?.mainMedia?.image?.url ? { backgroundImage: `url(${p.media.mainMedia.image.url})` } : {}}>
                {!p.media?.mainMedia?.image?.url && <svg viewBox="0 0 80 80" width="40" height="40" fill="none"><circle cx="40" cy="40" r="25" stroke="#8a6e4b" strokeWidth="0.8"/><circle cx="40" cy="40" r="14" stroke="#c9b99a" strokeWidth="0.5"/></svg>}
              </div>
              <div className={styles.cellBody}>
                <span className={styles.cellCat}>{getCat(p)}</span>
                <div className={styles.cellName}>{p.name}</div>
                <div className={styles.cellPrice}>{formatPrice(p)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {deposit && (filter === 'All' || filter === 'Consultation Deposit') && (
        <div className={styles.depositBanner}>
          <div className={styles.depositText}>&ldquo;Gift a bespoke commission &mdash; the most personal thing you can give.&rdquo;</div>
          <Link href={`/shop/${deposit.slug || deposit.id}`} className={styles.depositBtn}>Consultation Deposit &mdash; $500</Link>
        </div>
      )}
      <div className={styles.bespoke}>
        <p className={styles.bespokeText}>Looking for something made just for you?</p>
        <Link href="/contact" className={styles.bespokeBtn}>Begin a Bespoke Commission</Link>
      </div>
    </div>
  )
}
