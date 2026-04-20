import Link from 'next/link'
import styles from './about.module.css'

export const metadata = {
  title: 'About Jonathan Pottow | Private Jeweler & Luxury Broker | Charlotte NC',
  description:
    'Meet Jonathan Pottow — South African-born, Charlotte-based private jeweler, luxury broker, and fine watch dealer. 13+ years in the industry. Bespoke commissions, luxury pieces, and fine timepieces.',
  alternates: { canonical: '/about' },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.jafinejewelry.com/about#jonathan-pottow',
  name: 'Jonathan Pottow',
  jobTitle: 'Founder, Private Jeweler & Luxury Broker',
  description:
    'Jonathan Pottow is a Charlotte, NC based private jeweler, luxury broker, and fine watch dealer. Founder of Jonathan Alistair Fine Jewelry — bespoke commissions, luxury pieces, and fine timepieces through a private, one-on-one process.',
  url: 'https://www.jafinejewelry.com/about',
  image: 'https://www.jafinejewelry.com/jonathan-homepage.jpg',
  worksFor: {
    '@type': 'Organization',
    '@id': 'https://www.jafinejewelry.com/#business',
    name: 'Jonathan Alistair Fine Jewelry',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Charlotte',
    addressRegion: 'NC',
    addressCountry: 'US',
  },
  knowsAbout: [
    'Bespoke Fine Jewelry',
    'Custom Engagement Rings',
    'Diamond Sourcing',
    'Heirloom Redesign',
    'Wedding Bands',
    'Jewelry Appraisal',
    'Luxury Watch Dealing',
    'Fine Jewelry Brokerage',
  ],
}

const aboutBreadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jafinejewelry.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.jafinejewelry.com/about' },
  ],
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumbJsonLd) }}
      />


      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>The Story Behind the Craft</p>
          <h1 className={styles.heroTitle}>
            Born from <em>heritage.</em><br />
            Built on <em>trust.</em>
          </h1>
          <p className={styles.heroSubtext}>
            Jonathan Pottow is a private jeweler, luxury broker, and fine watch dealer based in Charlotte,
            North Carolina — creating bespoke fine jewelry, sourcing luxury pieces, and dealing in fine
            timepieces through a deeply personal, one-on-one process.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className={styles.introSection}>
        <div className={styles.introInner}>
          <div className={styles.introLabel}>
            <p className={styles.eyebrow}>The Beginning</p>
            <div className={styles.verticalLine} />
          </div>
          <div className={styles.introContent}>
            <p>
              Jonathan Pottow grew up surrounded by gemstones and craftsmanship in South Africa. His
              grandfather — a lifelong collector of fine goods — had a deep appreciation for exceptional
              craftsmanship that shaped the way Jonathan sees the world. It was never about price. It was
              about intention — the idea that something made well, made with purpose, carries meaning that
              outlasts its maker.
            </p>
            <p>
              That early education became the foundation of everything Jonathan would later build. Not just
              an eye for quality, but a belief that the things we choose to wear and give say something real
              about who we are and who we love — a standard he has never lowered, regardless of budget,
              occasion, or timeline.
            </p>
            <p>
              Jonathan entered the jewelry industry in 2013 at a premier luxury jewelry group in Raleigh,
              working his way from the front desk to diamond consultant, then to General Manager of a new
              St. Louis location by 2017. In 2019, with his wife expecting their first son Deacan, he
              returned home to Charlotte — a city he loves deeply and has no intention of leaving.
            </p>
            <p>
              In 2020, during the uncertainty of the pandemic, Jonathan saw an opportunity: to create
              something that didn't exist in the market. A safe, deeply personal, entirely bespoke
              experience for clients who deserved better than the generic jewelry store. Jonathan Alistair
              Fine Jewelry was born from that belief — and has since grown from bespoke commissions into a
              full private practice spanning custom jewelry, luxury brokerage, and fine watches.
            </p>
            <p>
              Today Jonathan is a six-year member of CYPG — investing in his community as genuinely as he
              invests in every client. His role is simple: to be your guide, your expert, and your
              advocate — sitting on your side of the table from the first conversation to the final piece.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className={styles.timelineSection}>
        <div className={styles.timelineHeader}>
          <h2 className={styles.timelineTitle}>The Journey</h2>
          <div className={styles.sectionLine} />
        </div>
        <div className={styles.timeline}>
          {[
            {
              year: '2013',
              title: 'A Premier Luxury Jewelry Group, Raleigh',
              desc: 'Started at the front desk and earned his way onto the sales floor within six months — becoming a diamond consultant and learning the craft from the ground up, one client and one conversation at a time. This is where Jonathan developed his deep knowledge of diamonds, gemstones, and fine metals, and where he first understood that the best jewelry experiences are built entirely on trust, not transactions.',
            },
            {
              year: '2017',
              title: 'General Manager, St. Louis',
              desc: 'Promoted to lead the opening of a new acquisition location in St. Louis, Missouri. Built a team, a culture, and a clientele from scratch — proving that the principles he believed in could scale. Two years of leading a luxury retail operation at the highest level gave Jonathan a rare combination of deep product expertise and real business acumen that he now brings to every client relationship.',
            },
            {
              year: '2019',
              title: 'Back to Charlotte',
              desc: 'With his wife expecting their first son Deacan, Jonathan made the decision to come home to Charlotte — a city he loves deeply and had no intention of leaving again. Charlotte has always been home. It is where his roots are, where his family is growing, and where he chose to build something of his own.',
            },
            {
              year: '2020',
              title: 'Jonathan Alistair Fine Jewelry is Born',
              desc: 'In the midst of a pandemic, Jonathan saw a gap in the market and an opportunity to do something he had always believed in: a completely bespoke, white-glove jewelry experience for clients who deserved better than the generic store. No sales floor. No pressure. No commission-driven recommendations. Just one jeweler — sitting on your side of the table, with full access to the finest diamonds and materials in the industry, from the first conversation to the final piece.',
            },
            {
              year: 'Today',
              title: 'Jewelry, Luxury Brokerage & Fine Watches',
              desc: 'What started as bespoke jewelry commissions has grown into a full private practice. Jonathan now creates custom pieces, brokers luxury jewelry, and deals in fine watches — all through the same one-on-one process his clients have come to trust. He and his wife are raising two sons — Deacan and Finnley — in Charlotte, and his practice continues to grow entirely through word of mouth, built on the only currency that has ever mattered to him: the trust of the people he serves.',
            },
          ].map((item, i) => (
            <div key={i} className={styles.timelineItem}>
              <div className={styles.timelineLeft}>
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineDot} />
              </div>
              <div className={styles.timelineRight}>
                <h3 className={styles.timelineTitle2}>{item.title}</h3>
                <p className={styles.timelineDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className={styles.philosophySection}>
        <div className={styles.philosophyInner}>
          <div className={styles.philosophyText}>
            <p className={styles.eyebrow}>The Philosophy</p>
            <h2 className={styles.philosophyTitle}>
              Your jeweler.<br /><em>For life.</em>
            </h2>
            <p>
              Jonathan's approach has never been about volume. It has always been about depth. Every client who
              comes to Jonathan Alistair Fine Jewelry gets his full attention — not a sales associate, not a
              catalog, not a commission-driven recommendation. Just Jonathan, with over a decade of expertise
              and direct access to some of the finest diamonds and materials available, focused entirely on
              what you need and what your budget allows.
            </p>
            <p>
              That industry access matters more than most people realize. Jonathan works directly with diamond
              dealers, stone cutters, and watchmakers, which means his clients see options and quality levels that simply
              aren't available on a retail sales floor. You get a jeweler who is genuinely on your side —
              helping you make the most informed, confident decision possible, with full transparency at every step.
            </p>
            <p>
              The goal has always been simple: to be the last jeweler you ever need. The person you call when
              you get engaged, when you celebrate an anniversary, when you want to redesign an heirloom, when
              you need the right timepiece, or when you simply want something beautiful and meaningful that no one
              else has. A relationship built over years, not a transaction completed in an afternoon.
            </p>
          </div>
          <div className={styles.philosophyStats}>
            <div className={styles.statCard}>
              <span className={styles.statNum}>13+</span>
              <span className={styles.statLabel}>Years in luxury jewelry</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>250+</span>
              <span className={styles.statLabel}>Custom commissions completed</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>By Appt</span>
              <span className={styles.statLabel}>Fully private experience</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>49</span>
              <span className={styles.statLabel}>Five-star Google reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* CHARLOTTE */}
      <section className={styles.charlotteSection}>
        <div className={styles.charlotteInner}>
          <p className={styles.eyebrow}>Rooted in Charlotte</p>
          <h2 className={styles.charlotteTitle}>More than a business.<br /><em>A community.</em></h2>
          <p>
            Charlotte is not just where Jonathan works — it is where he is raising his family, coaching his
            sons, investing his time, and building something that lasts. As a six-year member of CYPG, he
            shows up for this city the same way he shows up for every client: with intention, consistency,
            and genuine care.
          </p>
          <p>
            Jonathan believes the best businesses are extensions of the communities they serve. Every
            referral he receives, every relationship he builds, every piece he creates — it all stays
            here. It all comes back to Charlotte. And that is exactly how he wants it.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <p className={styles.eyebrow}>Ready to begin?</p>
        <h2 className={styles.ctaTitle}>Every great piece starts<br /><em>with a conversation.</em></h2>
        <Link href='/contact' className={styles.ctaBtn}>Let's Talk</Link>
      </section>

    </div>
  )
}
