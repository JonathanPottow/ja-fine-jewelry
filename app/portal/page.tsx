import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { verifyToken, SESSION_COOKIE } from '@/lib/portal/session'
import { findContact, getDeals, STEPS, STAGE_STEP } from '@/lib/portal/hubspot'
import ResponseButtons from './ResponseButtons'
import styles from './portal.module.css'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Client Portal | Jonathan Alistair Fine Jewelry', robots: { index: false, follow: false } }

const usd = (n: number | null) => (n === null ? '—' : n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }))
const fmtDate = (s: string) => {
  const d = new Date(/^\d+$/.test(s) ? Number(s) : s)
  return isNaN(+d) ? '' : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

export default async function Portal() {
  const email = verifyToken(cookies().get(SESSION_COOKIE)?.value, 'session')
  if (!email) redirect('/portal/login')
  const contact = await findContact(email)
  const deals = contact ? await getDeals(contact.id) : []

  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <span className={styles.eyebrow}>Private Client Portal</span>
        <form action="/api/portal/logout" method="post"><button className={`${styles.btn} ${styles.btnGhost}`}>Sign out</button></form>
      </div>
      <h1 className={styles.title}>{contact?.firstName ? <>Hello, <em>{contact.firstName}</em></> : <>Your <em>projects</em></>}</h1>
      <p className={styles.intro}>Follow every step of your piece, review designs and quotes, and reach Jonathan any time.</p>

      {deals.length === 0 && <div className={styles.card}><p>No active projects are showing yet. If this seems wrong, please contact Jonathan directly.</p></div>}

      {deals.map((d) => {
        const step = STAGE_STEP[d.stageId] ?? 0
        const due = fmtDate(d.dueDate)
        return (
          <section key={d.id} className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={styles.dealName}>{d.piece || d.name}</h2>
              {due && <span className={styles.due}>Target date: {due}</span>}
            </div>
            <ol className={styles.steps}>
              {STEPS.map((s, i) => <li key={s} className={`${styles.step} ${i < step ? styles.stepDone : ''} ${i === step ? styles.stepNow : ''}`}>{s}</li>)}
            </ol>
            {(d.message || d.nextStep) && (
              <div className={styles.next}>
                {d.message && <p><span className={styles.label}>A note from Jonathan</span>{d.message}</p>}
                {d.nextStep && <p><span className={styles.label}>What happens next</span>{d.nextStep}</p>}
              </div>
            )}
            {d.cadUrls.length > 0 && (<>
              <span className={styles.label}>Designs for your review</span>
              <div className={styles.gallery}>{d.cadUrls.map((u) => <a key={u} href={u} target="_blank" rel="noopener noreferrer"><img src={u} alt="Design render" loading="lazy" /></a>)}</div>
            </>)}
            {(d.quoted !== null || d.paid !== null) && (
              <div className={styles.money}>
                <div><span className={styles.label}>Quote</span><strong>{usd(d.quoted)}</strong></div>
                <div><span className={styles.label}>Paid</span><strong>{usd(d.paid)}</strong></div>
                <div><span className={styles.label}>Balance</span><strong>{usd(d.owed)}</strong></div>
              </div>
            )}
            {d.quoteUrl && <p style={{ marginBottom: '1.25rem' }}><a className={styles.link} href={d.quoteUrl} target="_blank" rel="noopener noreferrer">View your full quote</a></p>}
            {step === 2 || step === 3 ? <ResponseButtons dealId={d.id} /> : null}
          </section>
        )
      })}
      <p>Questions? Text or email <a className={styles.link} href="mailto:jonathan@jafinejewelry.com">jonathan@jafinejewelry.com</a>.</p>
    </main>
  )
}
