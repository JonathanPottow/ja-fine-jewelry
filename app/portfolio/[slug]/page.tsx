import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  publishedPortfolioPieces,
  getPieceBySlug,
  getRelatedPieces,
  pieceStill,
} from '@/lib/portfolio-pieces'
import PieceVideo from './PieceVideo'
import PieceConfigurator from './PieceConfigurator'
import PieceCard from '../PieceCard'
import FavoriteButton from '../FavoriteButton'
import styles from './piece.module.css'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return publishedPortfolioPieces.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const piece = getPieceBySlug(params.slug)
  if (!piece) {
    return { title: 'Piece Not Found | Jonathan Alistair Fine Jewelry' }
  }

  const desc =
    piece.story ??
    `${piece.name} — a bespoke ${piece.category.toLowerCase()} commission by Jonathan Pottow of Jonathan Alistair Fine Jewelry, Charlotte, NC.`

  const url = `https://www.jafinejewelry.com/portfolio/${piece.slug}`

  return {
    title: `${piece.name} | Custom Commission | Jonathan Alistair Fine Jewelry`,
    description: desc,
    alternates: { canonical: `/portfolio/${piece.slug}` },
    openGraph: {
      title: `${piece.name} | Jonathan Alistair Fine Jewelry`,
      description: desc,
      url,
      type: 'article',
    },
  }
}

export default function PiecePage({ params }: PageProps) {
  const piece = getPieceBySlug(params.slug)
  if (!piece || !piece.published) notFound()

  const related = getRelatedPieces(piece.slug, 3)
  const url = `https://www.jafinejewelry.com/portfolio/${piece.slug}`

  const creativeWorkJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: piece.name,
    description:
      piece.story ?? `Bespoke ${piece.category.toLowerCase()} commission by Jonathan Pottow.`,
    creator: { '@type': 'Person', name: 'Jonathan Pottow', url: 'https://www.jafinejewelry.com/about' },
    brand: { '@type': 'Brand', name: 'Jonathan Alistair Fine Jewelry' },
    url,
    ...(piece.category !== 'Uncategorized' ? { genre: piece.category } : {}),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jafinejewelry.com' },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://www.jafinejewelry.com/portfolio' },
      { '@type': 'ListItem', position: 3, name: piece.name, item: url },
    ],
  }

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className={styles.topBar}>
        <Link href="/portfolio" className={styles.backLink} aria-label="Back to the full portfolio">
          <span aria-hidden="true" className={styles.backArrow}>&#8592;</span> Back
        </Link>
      <nav aria-label="Breadcrumb" className={styles.crumbs}>
        <Link href="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link href="/portfolio">Portfolio</Link>
        <span aria-hidden="true"> / </span>
        <span className={styles.crumbCurrent}>{piece.name}</span>
      </nav>
      </div>

      <article className={styles.layout}>
        <div className={styles.media}>
          <PieceVideo src={`/portfolio/turntable/${piece.slug}.mp4`} poster={pieceStill(piece)} alt={piece.alt} />
        </div>

        <div className={styles.details}>
          <div className={styles.titleRow}>
            <div>
              <p className={styles.eyebrow}>
                {piece.category === 'Uncategorized' ? 'Bespoke Commission' : piece.category}
              </p>
              <h1 className={styles.title}>{piece.name}</h1>
            </div>
            <FavoriteButton slug={piece.slug} name={piece.name} variant="detail" />
          </div>
          <div className={styles.divider} />

          <p className={styles.story}>
            {piece.story ??
              'A private commission crafted by Jonathan Pottow. Every piece begins with a conversation, and ends with something deeply personal, made to be worn for a lifetime.'}
          </p>

          <PieceConfigurator
            slug={piece.slug}
            name={piece.name}
            category={piece.category}
            mixedMetals={piece.mixedMetals}
            defaultMetal={piece.defaultMetal}
            base14k={piece.base14k}
            offersCenterStone={piece.offersCenterStone}
          />
        </div>
      </article>

      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-heading">
          <h2 id="related-heading" className={styles.relatedTitle}>Other Commissions</h2>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
              <PieceCard key={r.slug} piece={r} showPrice={false} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
