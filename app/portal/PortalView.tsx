import type { CSSProperties } from 'react'
import { STEPS, STAGE_STEP, type PortalDeal } from '@/lib/portal/hubspot'
import { STEP_NOTES } from '@/lib/portal/copy'
import ResponseButtons from './ResponseButtons'
import Gallery from './Gallery'
import styles from './portal.module.css'

const usd = (n: number | null) => (n === null ? '—' : n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }))
const fmtDate = (s: string) => {
  const d = new Date(/^\d+$/.test(s) ? Number(s) : s)
  return isNaN(+d) ? '' : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}
const rise = (i: number) => ({ '--i': i } as CSSProperties)

// preview: owner's "View as client" mode. Shows a banner, and review buttons send nothing.
export default function PortalView({ firstName, greeting, deals, preview }: { firstName: string; greeting: string; deals: PortalDeal[]; preview?: { backHref: string } }) {
  return (
    <div className={styles.shell}>
      {preview && (
        <div className={styles.previewBar}>
          <span>Preview: this is what {firstName || 'your client'} sees</span>
          <a href={preview.backHref}>Back to studio</a>
        </div>
      )}
      <main className={styles.page}>
        <div className={`${styles.top} ${styles.rise}`} style={rise(0)}>
          <span className={styles.eyebrow}>Private Client Portal</span>
          {!preview && <form action="/api/portal/logout" method="post"><button className={styles.signOut}>Sign out</button></form>}
        </div>
        <h1 className={`${styles.title} ${styles.rise}`} style={rise(1)}>
          {firstName ? <>{greeting}, <em>{firstName}</em></> : <>Your <em>commissions</em></>}
        </h1>
        <p className={`${styles.intro} ${styles.rise}`} style={rise(2)}>
          {deals.length > 1 ? 'Here is where each of your pieces stands.' : 'Here is where your piece stands.'} Review designs, see your quote, and reach Jonathan whenever you like.
        </p>

        {deals.length === 0 && (
          <section className={`${styles.card} ${styles.empty} ${styles.rise}`} style={rise(3)}>
            <p>No active projects are showing yet. If this seems wrong, please reach out to Jonathan directly.</p>
          </section>
        )}

        {deals.map((d, n) => {
          const step = STAGE_STEP[d.stageId] ?? 0
          const due = fmtDate(d.dueDate)
          const paidShare = d.quoted && d.paid !== null ? Math.min(d.paid / d.quoted, 1) : null
          const reviewing = step === 2 || step === 3
          return (
            <section key={d.id} className={`${styles.card} ${styles.rise}`} style={rise(3 + n)}>
              <div className={styles.cardHead}>
                <div>
                  <span className={styles.kicker}>Your commission</span>
                  <h2 className={styles.dealName}>{d.piece || d.name}</h2>
                </div>
                {due && (
                  <div className={styles.due}>
                    <span className={styles.kicker}>Target date</span>
                    <span className={styles.dueDate}>{due}</span>
                  </div>
                )}
              </div>

              <div className={styles.journey}>
                <div className={styles.trackWrap}>
                  <span className={styles.trackFill} style={{ '--p': step / (STEPS.length - 1) } as CSSProperties} aria-hidden />
                <ol className={styles.track} aria-label="Progress">
                  {STEPS.map((s, i) => (
                    <li key={s} className={`${styles.stop} ${i < step ? styles.stopDone : ''} ${i === step ? styles.stopNow : ''}`} aria-current={i === step ? 'step' : undefined}>
                      <span className={styles.gem} aria-hidden />
                      <span className={styles.stopLabel}>{s}</span>
                    </li>
                  ))}
                </ol>
                </div>
                <div className={styles.chapter}>
                  <span className={styles.chapterNum}>Step {step + 1} of {STEPS.length} · {STEPS[step]}</span>
                  <span className={styles.chapterText}>{STEP_NOTES[step]}</span>
                </div>
              </div>

              {(d.message || d.nextStep) && (
                <div className={styles.letter}>
                  {d.message && (<>
                    <span className={styles.label}>A note from Jonathan</span>
                    <p className={styles.letterBody}>{d.message}</p>
                    <p className={styles.signature}>Jonathan</p>
                  </>)}
                  {d.nextStep && (
                    <div className={d.message ? styles.nextUp : undefined}>
                      <span className={styles.label}>What happens next</span>
                      <p>{d.nextStep}</p>
                    </div>
                  )}
                </div>
              )}

              {d.cadUrls.length > 0 && (
                <div className={styles.galleryWrap}>
                  <span className={styles.label}>Designs for your review</span>
                  <Gallery urls={d.cadUrls} name={d.piece || d.name} />
                </div>
              )}

              {(d.quoted !== null || d.paid !== null) && (<>
                <div className={styles.ledger}>
                  <div><span className={styles.label}>Quote</span><strong>{usd(d.quoted)}</strong></div>
                  <div><span className={styles.label}>Paid</span><strong>{usd(d.paid)}</strong></div>
                  <div><span className={styles.label}>Balance</span><strong>{usd(d.owed)}</strong></div>
                </div>
                {paidShare !== null && (<>
                  <div className={styles.paidBar} aria-hidden><span style={{ '--paid': paidShare } as CSSProperties} /></div>
                  <p className={styles.paidNote}>{paidShare >= 1 ? 'Paid in full. Thank you.' : `${Math.round(paidShare * 100)}% paid`}</p>
                </>)}
              </>)}

              {d.quoteUrl && <a className={styles.quoteLink} href={d.quoteUrl} target="_blank" rel="noopener noreferrer">View your full quote <span aria-hidden>→</span></a>}

              {reviewing && <ResponseButtons dealId={d.id} stage={step === 2 ? 'design' : 'quote'} preview={!!preview} />}
            </section>
          )
        })}

        <div className={`${styles.contact} ${styles.rise}`} style={rise(3 + deals.length)}>
          <p className={styles.contactText}>A question, or just <em>a thought?</em></p>
          <div className={styles.contactLinks}>
            <a className={styles.link} href="mailto:jonathan@jafinejewelry.com">Email Jonathan</a>
            <a className={styles.link} href="/contact">Get in touch</a>
          </div>
        </div>
      </main>
    </div>
  )
}
