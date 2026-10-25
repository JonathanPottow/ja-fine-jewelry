import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { ownerEmail } from '@/lib/portal/owner'
import { listStudioDeals, STAGES, STAGE_STEP, STEPS } from '@/lib/portal/hubspot'
import styles from './studio.module.css'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Studio | Jonathan Alistair Fine Jewelry', robots: { index: false, follow: false } }

const ago = (iso: string) => {
  const days = Math.floor((Date.now() - +new Date(iso)) / 86400000)
  if (!iso || isNaN(days)) return ''
  return days <= 0 ? 'Updated today' : days === 1 ? 'Updated yesterday' : `Updated ${days} days ago`
}

export default async function Studio() {
  if (!ownerEmail()) redirect('/portal/login?studio=1')
  const deals = await listStudioDeals()

  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <span className={styles.eyebrow}>Client Studio</span>
        <form action="/api/portal/logout" method="post"><button className={styles.quiet}>Sign out</button></form>
      </div>
      <h1 className={styles.title}>Open <em>commissions</em></h1>
      <p className={styles.lede}>Pick a client to add designs, write them a note, or move their piece along. Their page updates as soon as you send.</p>

      {deals.length === 0 && <p className={styles.empty}>No open commissions in HubSpot right now.</p>}

      <ul className={styles.list}>
        {deals.map((d) => {
          const step = STAGE_STEP[d.stageId] ?? 0
          const stage = STAGES.find((s) => s.id === d.stageId)?.label || 'Unknown stage'
          const who = d.client ? `${d.client.firstName} ${d.client.lastName}`.trim() || d.client.email : 'No contact on this deal'
          return (
            <li key={d.id}>
              <a className={styles.row} href={`/portal/studio/${d.id}`}>
                <span className={styles.thumb}>{d.cadUrls[0] ? <img src={d.cadUrls[0]} alt="" /> : <span aria-hidden>◇</span>}</span>
                <span className={styles.rowMain}>
                  <span className={styles.rowName}>{who}</span>
                  <span className={styles.rowPiece}>{d.piece || d.name}</span>
                </span>
                <span className={styles.rowMeta}>
                  <span className={styles.pill}>{stage}</span>
                  <span className={styles.small}>Client sees step {step + 1} · {STEPS[step]}</span>
                  <span className={styles.small}>{ago(d.updatedAt)}</span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
