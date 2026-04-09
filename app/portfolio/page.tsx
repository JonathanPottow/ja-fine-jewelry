import type { Metadata } from 'next'
import PortfolioFull from './PortfolioFull'

export const metadata: Metadata = {
  title: 'Portfolio | Custom Engagement Rings & Bespoke Jewelry | Jonathan Alistair Fine Jewelry',
  description:
    'Explore the full portfolio of bespoke fine jewelry commissions by Jonathan Pottow — custom engagement rings, wedding bands, anniversary pieces and heirloom redesigns crafted in Charlotte, NC.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio | Jonathan Alistair Fine Jewelry',
    description:
      'A look inside Jonathan Pottow\'s custom commissions — engagement rings, wedding bands, and bespoke fine jewelry.',
    url: 'https://www.jafinejewelry.com/portfolio',
  },
}

const portfolioBreadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jafinejewelry.com' },
    { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://www.jafinejewelry.com/portfolio' },
  ],
}

export default function PortfolioPage() {
  return (
    <main style={{ padding: '8rem 2rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioBreadcrumbJsonLd) }}
      />
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
          CAD Renderings · Bespoke Commissions
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, marginBottom: '1rem' }}>
          Full Portfolio
        </h1>
        <div style={{ width: '100%', height: '1px', background: 'var(--charcoal)', opacity: 0.15, marginBottom: '1rem' }} />
        <p style={{ maxWidth: '520px', lineHeight: 1.7, opacity: 0.7 }}>
          Every piece begins with a conversation. Hover to see each commission come to life.
        </p>
      </div>
      <PortfolioFull />
    </main>
  )
}
