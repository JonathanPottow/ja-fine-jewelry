import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { signToken, isOwner, MAGIC_TTL_SECONDS } from '@/lib/portal/session'
import { findContact, getDeals } from '@/lib/portal/hubspot'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  // Always answer the same way so nobody can probe which emails are clients.
  const ok = NextResponse.json({ ok: true })
  try {
    const { email } = await req.json()
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return ok

    const origin = process.env.PORTAL_BASE_URL || new URL(req.url).origin
    const token = signToken(email, 'magic', MAGIC_TTL_SECONDS)
    const link = `${origin}/api/portal/verify?token=${encodeURIComponent(token)}`
    const resend = new Resend(process.env.RESEND_API_KEY)

    if (isOwner(email)) {
      await resend.emails.send({
        from: 'JAFJ Client Portal <hello@jafinejewelry.com>',
        to: email,
        subject: 'Your studio sign-in link',
        html: `<p>Open the client studio: <a href="${link}">sign in</a>. This link expires in 15 minutes.</p>`,
      })
      return ok
    }

    const contact = await findContact(email)
    if (!contact) return ok
    const deals = await getDeals(contact.id)
    if (!deals.length) return ok // only people with an active job get in
    const name = contact.firstName ? `, ${contact.firstName.replace(/[<>&"]/g, '')}` : ''

    await resend.emails.send({
      from: 'Jonathan Alistair Fine Jewelry <hello@jafinejewelry.com>',
      to: email,
      replyTo: 'jonathan@jafinejewelry.com',
      subject: 'Your private client portal link',
      html: `<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;color:#0f2240;padding:24px">
        <p style="letter-spacing:.2em;font-size:12px;color:#a08030;text-transform:uppercase">Jonathan Alistair Fine Jewelry</p>
        <h2 style="font-weight:300">Welcome back${name}</h2>
        <p>Tap below to open your private client portal. This link expires in 15 minutes and is only for you. Please don't forward it.</p>
        <p style="margin:28px 0"><a href="${link}" style="background:#0f2240;color:#f5f0e8;padding:14px 28px;text-decoration:none;letter-spacing:.15em;font-size:12px;text-transform:uppercase">Open my portal</a></p>
        <p style="font-size:13px;color:#555">If you didn't request this, you can safely ignore this email.</p></div>`,
    })
  } catch (e) {
    console.error('portal login error', e)
  }
  return ok
}
