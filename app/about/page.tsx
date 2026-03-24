import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About Jonathan Pottow | Bespoke Jeweler Charlotte NC',
  description: 'Meet Jonathan Pottow — South African-born, Charlotte-based fine jewelry consultant and founder of Jonathan Alistair Fine Jewelry. 10+ years experience, GIA trained, founding board member of Charlotte ETA.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Jonathan Pottow | Jonathan Alistair Fine Jewelry Charlotte NC',
    description: 'The story behind Jonathan Alistair Fine Jewelry — from a South African grandfathers collection to a bespoke jewelry business built on trust, heritage and white-glove service in Charlotte, NC.',
    url: 'https://www.jafinejewelry.com/about',
  },
}

export default function About() {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>The Story Behind the Craft</p>
          <h1 className={styles.heroTitle}>
            Born from <em>heritage.</em><br />
            Built on <em>trust.</em>
          </h1>
        </div>
        <div className={styles.heroImagePlaceholder}>
          <span className={styles.photoLabel}>Jonathan Pottow</span>
        </div>
      </section>

      {/* Origin Story */}
      <section className={styles.storySection}>
        <div className={styles.storySidebar}>
          <p className={styles.eyebrow}>The Beginning</p>
          <div className={styles.sidebarLine} />
        </div>
        <div className={styles.storyBody}>
          <p className={styles.pullQuote}>
            "My grandfather did not just collect beautiful things —
            he taught me how to see them."
          </p>
          <p>
            Growing up in South Africa, Jonathan Pottow was introduced to the world
            of fine goods through his grandfather — an avid collector whose eye for
            quality and appreciation for craftsmanship left a permanent mark. It was not
            just about diamonds or gold. It was about the meaning behind objects made
            to last a lifetime.
          </p>
          <p>
            That sense of heritage — of honoring where something comes from and why it
            matters — became the quiet foundation of everything Jonathan would later build.
          </p>
        </div>
      </section>

      {/* Career Timeline */}
      <section className={styles.timelineSection}>
        <div className={styles.timelineHeader}>
          <h2 className={styles.sectionTitle}>The Journey</h2>
          <div className={styles.sectionLine} />
        </div>
        <div className={styles.timeline}>
          {[
            {
              year: '2013',
              title: 'a premier luxury jewelry group, Raleigh',
              desc: 'Started at the front desk and within six months moved into sales as a diamond consultant — learning the craft from the ground up, one client at a time.'
            },
            {
              year: '2017',
              title: 'General Manager, St. Louis',
              desc: 'Promoted to lead the opening of a new a premier luxury jewelry group acquisition in St. Louis, Missouri. Spent two years building a team and a culture from scratch.'
            },
            {
              year: '2019',
              title: 'Back to Charlotte',
              desc: 'Returned home to Charlotte to be closer to family as his wife was expecting their first son, Deacan. Some decisions are easier than they look.'
            },
            {
              year: '2020',
              title: 'Jonathan Alistair Fine Jewelry is Born',
              desc: 'In the midst of a pandemic, Jonathan saw an opportunity: create a safe, intimate, and entirely personal way for clients to still access fine jewelry. The bespoke, white-glove experience that would become Jonathan Alistair Fine Jewelry was born.'
            },
            {
              year: 'Today',
              title: 'Charlotte, Community & Growth',
              desc: 'With two sons — Deacan and Finnley — Jonathan is deeply rooted in Charlotte. A founding board member of Charlotte ETA and a six-year member of CYPG, he believes in giving back as much as building forward.'
            },
          ].map((item) => (
            <div key={item.year} className={styles.timelineItem}>
              <div className={styles.timelineYear}>{item.year}</div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>{item.title}</h3>
                <p className={styles.timelineDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className={styles.philosophySection}>
        <div className={styles.philosophyInner}>
          <p className={styles.eyebrow}>The Philosophy</p>
          <h2 className={styles.philosophyTitle}>
            Not your jeweler.<br />
            <em>Your expert.</em>
          </h2>
          <div className={styles.philosophyGrid}>
            <div className={styles.philosophyCard}>
              <h3>Your Guide, Not a Salesperson</h3>
              <p>
                Jonathan sits on your side of the table. With over a decade of experience,
                he brings the knowledge you need to make a decision you will feel confident
                about for the rest of your life.
              </p>
            </div>
            <div className={styles.philosophyCard}>
              <h3>Bespoke from the First Conversation</h3>
              <p>
                No two clients are the same. No two pieces should be either. Every
                commission begins with listening — to your story, your vision, the
                person you are buying for — before a single sketch is made.
              </p>
            </div>
            <div className={styles.philosophyCard}>
              <h3>Heritage in Every Detail</h3>
              <p>
                Raised in South Africa with a deep appreciation for craftsmanship
                passed down through generations, Jonathan brings an eye for quality
                and meaning that goes beyond the transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Charlotte */}
      <section className={styles.charlotteSection}>
        <div className={styles.charlotteText}>
          <p className={styles.eyebrow}>Rooted in Charlotte</p>
          <h2 className={styles.charlotteTitle}>More than a business.<br />A community.</h2>
          <p>
            Charlotte is not just where Jonathan works — it is where he is raising his
            family, investing his time, and building something that lasts. As a founding
            board member of Charlotte ETA and a longtime member of CYPG, he is as
            committed to this city as he is to every client who walks through his door.
          </p>
          <p>
            When you work with Jonathan Alistair Fine Jewelry, you are working with someone who has
            chosen Charlotte — and who believes the best businesses are built on
            genuine relationships, not transactions.
          </p>
        </div>
        <div className={styles.charlotteStat}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>10+</span>
            <span className={styles.statLabel}>Years in the industry</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>6</span>
            <span className={styles.statLabel}>Years with CYPG</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNum}>1</span>
            <span className={styles.statLabel}>Focus: you</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <p className={styles.eyebrow}>Ready to begin?</p>
        <h2 className={styles.ctaTitle}>
          Every great piece starts<br />with a conversation.
        </h2>
        <Link href="/contact" className={styles.ctaBtn}>
          Book a Consultation
        </Link>
      </section>

    </div>
  )
}
