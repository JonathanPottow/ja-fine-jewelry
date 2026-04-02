import Link from 'next/link'
import styles from './page.module.css'
import ContactForm from './ContactForm'
import SubscribeForm from '@/components/SubscribeForm'
import PortfolioGrid from './PortfolioGrid'

export default function Home() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section id="home" className={styles.hero}>
        <div className={styles.heroText}>
          <p className={`${styles.eyebrow} hero-word`} style={{animationDelay: "0s"}}>Bespoke Fine Jewelry · Private Commission</p>
          <h1 className={styles.headline}>
            <span className="hero-word">Your jeweler.</span>
            <br />
            <em className="hero-word" style={{animationDelay: '0.85s'}}>For life.</em>
          </h1>
          <p className={`${styles.subhead} hero-word`} style={{animationDelay: "1s"}}>
            Jonathan Pottow creates heirloom-quality pieces through a deeply
            personal process — from first conversation to final setting.
          </p>
          <div className={`${styles.ctaRow} hero-word`} style={{animationDelay: "1.2s"}}>
            <a href="/contact" className={styles.ctaPrimary}>Let's Talk</a>
            <a href="#portfolio" className={styles.ctaSecondary}>View Portfolio</a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroImage} style={{overflow: 'hidden'}}>
            <img
              src="/hero-rings.jpg"
              alt="Bespoke fine jewelry by Jonathan Alistair"
              style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block'}}
            />
          </div>
          <div className={styles.heroTag}>
            <span className={styles.tagLabel}>Currently accepting</span>
            <span className={styles.tagValue}>New commissions</span>
          </div>
        </div>

            </section>

      {/* ─── MARQUEE ─── */}
      <div className={styles.marquee}>
        <div className={styles.marqueeInner}>
          {['Engagement Rings', 'Custom Pendants', 'Anniversary Pieces', 'Heirloom Redesigns', 'Wedding Bands', 'Bespoke Commissions', 'Engagement Rings', 'Custom Pendants', 'Anniversary Pieces', 'Heirloom Redesigns', 'Wedding Bands', 'Bespoke Commissions', 'Engagement Rings', 'Custom Pendants', 'Anniversary Pieces', 'Heirloom Redesigns', 'Wedding Bands', 'Bespoke Commissions', 'Engagement Rings', 'Custom Pendants', 'Anniversary Pieces', 'Heirloom Redesigns', 'Wedding Bands', 'Bespoke Commissions'].map((item, i) => (
            <span key={i}>{item} &nbsp;·&nbsp; </span>
          ))}
        </div>
        <div className={styles.marqueeInner} aria-hidden="true">
          {['Engagement Rings', 'Custom Pendants', 'Anniversary Pieces', 'Heirloom Redesigns', 'Wedding Bands', 'Bespoke Commissions', 'Engagement Rings', 'Custom Pendants', 'Anniversary Pieces', 'Heirloom Redesigns', 'Wedding Bands', 'Bespoke Commissions', 'Engagement Rings', 'Custom Pendants', 'Anniversary Pieces', 'Heirloom Redesigns', 'Wedding Bands', 'Bespoke Commissions', 'Engagement Rings', 'Custom Pendants', 'Anniversary Pieces', 'Heirloom Redesigns', 'Wedding Bands', 'Bespoke Commissions'].map((item, i) => (
            <span key={i}>{item} &nbsp;·&nbsp; </span>
          ))}
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <section id="about" className={styles.section}>
        <div className={`${styles.sectionHeader} fade-up`}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.sectionLine} />
          <Link href="/about" className={styles.sectionLink}>Full story →</Link>
        </div>
        <div className={styles.aboutGrid}>
          <div className={`${styles.aboutImagePlaceholder} fade-up`} style={{padding: 0, overflow: 'hidden'}}>
            <img src="/jonathan-homepage.jpg" alt="Jonathan Pottow" style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block'}} />
          </div>
          <div className={`${styles.aboutContent} fade-up delay-2`}>
            <p className={styles.eyebrow}>South African born. Charlotte rooted. Built on trust.</p>
            <h3 className={styles.aboutTitle}>
              More than a jeweler.<br /><em>Your expert.</em>
            </h3>
            <p>
              Jonathan Pottow's passion for fine jewelry began long before his career — it started
              with his grandfather, a South African collector whose deep appreciation for fine goods
              and exceptional craftsmanship shaped the way Jonathan sees the world. That early
              education in quality, meaning, and heritage became the quiet foundation of everything
              he would later build.
            </p>
            <p>
              Jonathan entered the industry in 2013 at a premier luxury jewelry group in Raleigh, working his way
              from the front desk to diamond consultant, then to General Manager of a new St. Louis
              location by 2017. In 2019, with his wife expecting their first son Deacan, he returned
              home to Charlotte — a city he loves deeply and has no intention of leaving.
            </p>
            <p>
              In 2020, during the uncertainty of the pandemic, Jonathan saw an opportunity: to create
              something that didn't exist in the market. A safe, deeply personal, entirely bespoke
              experience for clients who deserved better than the generic jewelry store. Jonathan Alistair Fine Jewelry was born from that belief.
            </p>
            <p>
              Today Jonathan is a founding board member of Charlotte ETA and a six-year member of
              CYPG — investing in his community as genuinely as he invests in every client. His
              role is simple: to be your guide, your expert, and your advocate — sitting on your
              side of the table from the first conversation to the final piece.
            </p>
            <div className={styles.aboutCredentials}>
              <div className={styles.credential}>
                <span className={styles.credentialNum}><span className="count-up" data-target="10" data-suffix="+">10+</span></span>
                <span className={styles.credentialLabel}>Years in the industry</span>
              </div>
              <div className={styles.credential}>
                <span className={styles.credentialNum}><span className="count-up" data-target="2013">2013</span></span>
                <span className={styles.credentialLabel}>Started at a premier luxury jewelry group</span>
              </div>
              <div className={styles.credential}>
                <span className={styles.credentialNum}><span className="count-up" data-target="2020">2020</span></span>
                <span className={styles.credentialLabel}>Founded Jonathan Alistair Fine Jewelry</span>
              </div>
            </div>
            <a href="/about" className={styles.aboutCta}>Read the full story →</a>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="process" className={styles.processSection}>
        <div className={styles.processSectionInner}>
          <div className={`${styles.sectionHeader} fade-up`}>
            <h2 className={styles.sectionTitleLight}>The Process</h2>
            <div className={styles.sectionLineDark} />
          </div>
          <div className={styles.processGrid}>
            {[
              { num: '01', title: 'Discovery', delay: 'delay-1', desc: 'A private conversation to understand your vision, story, and the person who will wear this piece for a lifetime.' },
              { num: '02', title: 'Design', delay: 'delay-2', desc: 'Detailed CAD renderings crafted specifically for you — precise, three-dimensional representations of your piece so you can see exactly what it will look like before anything is made. Refined until every detail is exactly right.' },
              { num: '03', title: 'Creation', delay: 'delay-3', desc: 'Handcrafted in the USA using ethically sourced materials. Every stone selected, every setting placed with intention and precision.' },
              { num: '04', title: 'Delivery', delay: 'delay-4', desc: 'A moment as special as the piece itself. Your commission is presented personally, with the full story of its making.' },
            ].map((step: {num: string, title: string, desc: string, delay: string}) => (
              <div key={step.num} className={`${styles.processCard} fade-up ${step.delay}`}>
                <span className={styles.processNum}>{step.num}</span>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section className={styles.quoteSection}>
        <blockquote className={`${styles.quote} fade-up`}>
          "Every piece begins as a feeling — a story that hasn't yet found its form."
        </blockquote>
        <cite className={styles.quoteAttr}>— Jonathan Pottow, Founder</cite>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section id="portfolio" className={styles.section}>
        <div className={`${styles.sectionHeader} fade-up`}>
          <h2 className={styles.sectionTitle}>Portfolio</h2>
          <div className={styles.sectionLine} />
          <Link href="/portfolio" className={styles.sectionLink}>View all →</Link>
        </div>
        <PortfolioGrid />
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className={styles.testimonialsSection}>
        <div className={styles.testimonialsSectionInner}>
          <div className={`${styles.sectionHeader} fade-up`}>
            <h2 className={styles.sectionTitleLight}>Client Stories</h2>
            <div className={styles.sectionLineDark} />
          </div>
          <div className={styles.testimonialsGrid}>
            {[
              {
                quote: "Jonathan was so awesome to work with during the design process! He took meticulous notes during our conversations and helped blend my ideas together. My wife LOVES her engagement ring — he gave it a more personal touch by adding 4 small birthstones on the inside of the band representing our combined 4 kids. She gets compliments on it all the time.",
                name: "Justin C.",
                piece: "Engagement Ring · Charlotte, NC"
              },
              {
                quote: "I had an incredible experience working with Jonathan to create a custom engagement ring. He took the time to understand exactly what I was looking for and made the entire process seamless and stress-free — something that's rare when designing something as personal and important as an engagement ring.",
                name: "Marco V.",
                piece: "Engagement Ring · Charlotte, NC"
              },
              {
                quote: "Jonathan is a dream to work with! He made my engagement ring and our wedding bands — we got to be involved start to finish and he well exceeded our expectations. I cannot imagine getting jewelry anywhere else. I've already sent multiple friends his way and they're all thrilled.",
                name: "Bella T.",
                piece: "Engagement Ring & Wedding Bands · Charlotte, NC"
              },
            ].map((t, i) => (
              <div key={i} className={`${styles.testimonialCard} fade-up delay-${i+1}`}>
                <p className={styles.testimonialQuote}>"{t.quote}"</p>
                <div className={styles.testimonialMeta}>
                  <span className={styles.testimonialName}>{t.name}</span>
                  <span className={styles.testimonialPiece}>{t.piece}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─── SUBSCRIBE ─── */}
      <section id="subscribe" className={styles.subscribeSection}>
        <SubscribeForm />
      </section>
    </>
  )
}
