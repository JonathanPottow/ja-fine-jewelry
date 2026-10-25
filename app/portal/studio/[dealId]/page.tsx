import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { ownerEmail } from '@/lib/portal/owner'
import { getStudioDeal, STAGES, STAGE_STEP, STEPS } from '@/lib/portal/hubspot'
import StudioEditor from '../StudioEditor'
import styles from '../studio.module.css'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Studio | Jonathan Alistair Fine Jewelry', robots: { index: false, follow: false } }

export default async function StudioDeal({ params }: { params: { dealId: string } }) {
  if (!ownerEmail()) redirect('/portal/login')
  const deal = await getStudioDeal(params.dealId)
  if (!deal) notFound()
  const stages = STAGES.map((s) => ({ ...s, clientSees: `Step ${(STAGE_STEP[s.id] ?? 0) + 1} · ${STEPS[STAGE_STEP[s.id] ?? 0]}` }))
  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <a className={styles.quiet} href="/portal/studio">← All commissions</a>
        <a className={styles.quiet} href={`/portal/studio/${deal.id}/preview`}>View as client</a>
      </div>
      <StudioEditor deal={deal} stages={stages} />
    </main>
  )
}
