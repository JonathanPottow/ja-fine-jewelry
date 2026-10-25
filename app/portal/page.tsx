import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { verifyToken, SESSION_COOKIE } from '@/lib/portal/session'
import { findContact, getDeals } from '@/lib/portal/hubspot'
import PortalView from './PortalView'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Client Portal | Jonathan Alistair Fine Jewelry', robots: { index: false, follow: false } }

// Time-of-day greeting in Charlotte time.
function greeting() {
  const h = Number(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: 'America/New_York' }).format(new Date()))
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

export default async function Portal() {
  const email = verifyToken(cookies().get(SESSION_COOKIE)?.value, 'session')
  if (!email) redirect('/portal/login')
  const contact = await findContact(email)
  const deals = contact ? await getDeals(contact.id) : []
  return <PortalView firstName={contact?.firstName || ''} greeting={greeting()} deals={deals} />
}
