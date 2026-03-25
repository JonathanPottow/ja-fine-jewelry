import PortfolioFull from './PortfolioFull'

export default function PortfolioPage() {
  return (
    <main style={{ padding: '8rem 2rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
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
