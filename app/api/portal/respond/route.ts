import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { Resend } from 'resend'
import { verifyToken, SESSION_COOKIE } from '@/lib/portal/session'
import { findContact, getDeals } from '@/lib/portal/hubspot'

export const dynamic = 'force-dynamic'
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!))

export async function POST(req: Request) {
  const email = verifyToken(cookies().get(SESSION_COOKIE)?.value, 'session')
  if (!email) return NextResponse.json({ error: 'auth' }, { status: 401 })
  const { dealId, action, note } = await req.json()
  if (!['approve', 'changes'].includes(action) || typeof dealId !== 'string') {
    return NextResponse.json({ error: 'bad' }, { status: 400 })
  }
  const contact = await findContact(email)
  const deal = contact ? (await getDeals(contact.id)).find((d) => d.id === dealId) : null
  if (!contact || !deal) return NextResponse.json({ error: 'nf' }, { status: 404 })

  const text = typeof note === 'string' ? note.slice(0, 2000) : ''
  const verb = action === 'approve' ? 'APPROVED' : 'requested changes to'
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'JAFJ Client Portal <hello@jafinejewelry.com>',
    to: 'jonathan@jafinejewelry.com',
    replyTo: email,
    subject: `Portal: ${contact.firstName || email} ${verb} ${deal.name}`,
    html: `<p><strong>${esc(contact.firstName || email)}</strong> (${esc(email)}) ${verb} <strong>${esc(deal.name)}</strong> in the client portal.</p>
           ${text ? `<p>Their note:</p><blockquote>${esc(text)}</blockquote>` : ''}
           <p>Reply to this email to answer them directly.</p>`,
  })
  return NextResponse.json({ ok: true })
}
