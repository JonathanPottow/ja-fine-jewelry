import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ownerEmail } from '@/lib/portal/owner'
import { getStudioDeal, updateStudioDeal, STAGES, STAGE_STEP, STEPS } from '@/lib/portal/hubspot'
import { STEP_NOTES } from '@/lib/portal/copy'

export const dynamic = 'force-dynamic'
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!))
const isHttps = (s: unknown): s is string => typeof s === 'string' && /^https:\/\/[^\s]+$/.test(s)
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: Request) {
  if (!ownerEmail()) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 })
  const b = await req.json().catch(() => ({}))
  const dealId = String(b.dealId || '')
  const before = await getStudioDeal(dealId)
  if (!before) return NextResponse.json({ error: 'That deal could not be found in HubSpot.' }, { status: 404 })

  // Keep the current stage if it is one the studio does not list (e.g. Lost).
  const stageId = STAGES.some((s) => s.id === b.stageId) ? String(b.stageId) : before.stageId
  const cadUrls: string[] = (Array.isArray(b.cadUrls) ? b.cadUrls : []).filter(isHttps).slice(0, 30)
  const quoteUrl = isHttps(str(b.quoteUrl, 1000)) ? str(b.quoteUrl, 1000) : ''
  const update = { stageId, cadUrls, quoteUrl, message: str(b.message, 2000), nextStep: str(b.nextStep, 1000) }

  if (!(await updateStudioDeal(dealId, update))) {
    return NextResponse.json({ error: 'HubSpot did not accept the change. Nothing was saved. Please try again.' }, { status: 502 })
  }

  const client = before.client
  if (!b.notify || !client?.email) return NextResponse.json({ ok: true, emailed: false })

  const piece = before.piece || 'piece'
  const newDesigns = cadUrls.some((u) => !before.cadUrls.includes(u))
  const step = STAGE_STEP[stageId] ?? 0
  const moved = stageId !== before.stageId && STAGE_STEP[before.stageId] !== step
  const subject = newDesigns ? `New designs for your ${piece}` : `An update on your ${piece}`
  const lead = newDesigns
    ? 'New designs for your piece are ready in your private portal. Take your time with them, and tell me how they feel.'
    : moved
      ? `Your piece has moved to ${STEPS[step]}. ${STEP_NOTES[step]}`
      : 'There is an update on your piece in your private portal.'
  const origin = process.env.PORTAL_BASE_URL || new URL(req.url).origin
  const name = client.firstName ? `, ${esc(client.firstName)}` : ''

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const r = await resend.emails.send({
      from: 'Jonathan Alistair Fine Jewelry <hello@jafinejewelry.com>',
      to: client.email,
      replyTo: 'jonathan@jafinejewelry.com',
      subject,
      html: `<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;color:#0f2240;padding:24px">
        <p style="letter-spacing:.2em;font-size:12px;color:#a08030;text-transform:uppercase">Jonathan Alistair Fine Jewelry</p>
        <h2 style="font-weight:300">Hello${name}</h2>
        <p>${esc(lead)}</p>
        ${update.message ? `<p style="border-left:2px solid #c8a84b;padding-left:14px;font-style:italic">${esc(update.message).replace(/\n/g, '<br>')}</p>` : ''}
        <p style="margin:28px 0"><a href="${origin}/portal" style="background:#0f2240;color:#f5f0e8;padding:14px 28px;text-decoration:none;letter-spacing:.15em;font-size:12px;text-transform:uppercase">Open my portal</a></p>
        <p>Jonathan</p>
        <p style="font-size:13px;color:#555">You can reply to this email to reach me directly.</p></div>`,
    })
    if (r.error) throw new Error(r.error.message)
    return NextResponse.json({ ok: true, emailed: true })
  } catch (e) {
    console.error('studio client email failed', e)
    return NextResponse.json({ ok: true, emailed: false, emailFailed: true })
  }
}
