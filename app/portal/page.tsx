import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { verifyToken, isOwner, SESSION_COOKIE } from '@/lib/portal/session'
import { findContact, getDeals } from '@/lib/portal/hubspot'
import { greeting } from '@/lib/portal/copy'
import PortalView from './PortalView'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Client Portal | Jonathan Alistair Fine Jewelry', robots: { index: false, follow: false } }

export default async function Portal() {
  const email = verifyToken(cookies().get(SESSION_COOKIE)?.value, 'session')
  if (!email) redirect('/portal/login')
  if (isOwner(email)) redirect('/portal/studio')
  const contact = await findContact(email)
  const deals = contact ? await getDeals(contact.id) : []
  return <PortalView firstName={contact?.firstName || ''} greeting={greeting()} deals={deals} />
}
