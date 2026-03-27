import Link from 'next/link'
import styles from './about.module.css'

export const metadata = {
  title: 'About Jonathan Pottow | Bespoke Jeweler Charlotte NC | Jonathan Alistair Fine Jewelry',
}

export default function AboutPage() {
  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>The Story Behind the Craft</p>
          <h1 className={styles.heroTitle}>
            Born from <em>heritage.</em><br />
            Built on <em>trust.</em>
          </h1>
          <p className={styles.heroSubtext}>
            Jonathan Pottow is a private jeweler based in Charlotte, NC — creating bespoke fine jewelry
            through a deeply personal process. Every commission begins with a conversation and ends with
            a piece that means something.
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
            <blockquote className={styles.pullQuote}>
              "My grandfather did not just collect beautiful things — he taught me how to see them."
            </blockquote>
            <p>
              Jonathan Pottow grew up in South Africa watching his grandfather — a lifelong collector of fine goods —
              handle objects with a reverence that had nothing to do with price. It was about craftsmanship.
              Intention. The idea that something made well, made with purpose, carries meaning that outlasts its maker.
            </p>
            <p>
              That early education shaped everything. Not just an appreciation for quality, but a deep belief that
              the things we choose to wear and give say something real about who we are and who we love. It became
              the quiet foundation of everything Jonathan would later build — a standard he has never lowered,
              regardless of budget, occasion, or timeline.
            </p>
            <p>
              When he entered the jewelry industry in 2013, he wasn't chasing a career — he was following
              something he had understood since childhood. That fine jewelry, done right, is one of the most
              personal things in the world. And that most people never get to experience what it truly feels like
              to have something made just for them.
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
              title: 'Charlotte, Community & Growth',
              desc: 'Jonathan and his wife are raising two sons — Deacan and Finnley — in Charlotte. He is a founding board member of Charlotte ETA and a six-year member of CYPG, investing in his community as genuinely as he invests in every client. His practice continues to grow entirely through word of mouth — built on the only currency that has ever mattered to him: the trust of the people he serves.',
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
              dealers and stone cutters, which means his clients see options and quality levels that simply
              aren't available on a retail sales floor. You get a jeweler who is genuinely on your side —
              helping you make the most informed, confident decision possible, with full transparency at every step.
            </p>
            <p>
              The goal has always been simple: to be the last jeweler you ever need. The person you call when
              you get engaged, when you celebrate an anniversary, when you want to redesign an heirloom, when
              you simply want something beautiful and meaningful that no one else has. A relationship built
              over years, not a transaction completed in an afternoon.
            </p>
          </div>
          <div className={styles.philosophyStats}>
            <div className={styles.statCard}>
              <span className={styles.statNum}>10+</span>
              <span className={styles.statLabel}>Years in the industry</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>2013</span>
              <span className={styles.statLabel}>Started in fine jewelry</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>2020</span>
              <span className={styles.statLabel}>Founded Jonathan Alistair</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>Word of mouth growth</span>
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
            sons, investing his time, and building something that lasts. As a founding board member of
            Charlotte ETA and a six-year member of CYPG, he shows up for this city the same way he shows
            up for every client: with intention, consistency, and genuine care.
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
