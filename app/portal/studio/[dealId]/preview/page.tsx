import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { ownerEmail } from '@/lib/portal/owner'
import { getStudioDeal } from '@/lib/portal/hubspot'
import { greeting } from '@/lib/portal/copy'
import PortalView from '../../../PortalView'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Client preview | Jonathan Alistair Fine Jewelry', robots: { index: false, follow: false } }

// Shows this one commission exactly as the client's portal renders it.
export default async function ClientPreview({ params }: { params: { dealId: string } }) {
  if (!ownerEmail()) redirect('/portal/login?studio=1')
  const deal = await getStudioDeal(params.dealId)
  if (!deal) notFound()
  return <PortalView firstName={deal.client?.firstName || ''} greeting={greeting()} deals={[deal]} preview={{ backHref: `/portal/studio/${deal.id}` }} />
}
