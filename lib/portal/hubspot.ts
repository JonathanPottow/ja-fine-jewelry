// HubSpot access for the client portal. Read-only, except addDealNote
// (approved by Jonathan 2026-10-25: notes only, never stage or property changes).
const API = 'https://api.hubapi.com'

function headers() {
  const t = process.env.HUBSPOT_PRIVATE_APP_TOKEN
  if (!t) throw new Error('HUBSPOT_PRIVATE_APP_TOKEN missing')
  return { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json' }
}

export type PortalDeal = {
  id: string
  name: string
  stageId: string
  piece: string
  nextStep: string
  dueDate: string
  quoted: number | null
  paid: number | null
  owed: number | null
  cadUrls: string[]
  quoteUrl: string
  message: string
}

export type PortalContact = { id: string; firstName: string; email: string }

// Stage ids from the "JAFJ Jobs" pipeline -> client-facing step (0-6).
export const STEPS = ['Inquiry', 'Consultation', 'Design', 'Quote', 'In Production', 'Ready', 'Complete']
export const STAGE_STEP: Record<string, number> = {
  '4488455914': 0, // Lead
  '4488455915': 1, // Consult
  '4488455916': 2, // Design / CAD
  '4488455917': 3, // Quoting
  '4488455918': 4, // Approved / In Production
  '4490450636': 4, // Needs Appraisal
  '4488455919': 5, // Ready for Pickup
  '4488455920': 4, // Repairs & Servicing
  '4488455921': 6, // Delivered / Paid
  '4490481371': 6, // Needs Review
}
export const STAGE_LOST = '4488455922'

export async function findContact(email: string): Promise<PortalContact | null> {
  const r = await fetch(`${API}/crm/v3/objects/contacts/search`, {
    method: 'POST',
    headers: headers(),
    cache: 'no-store',
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email.toLowerCase() }] }],
      properties: ['firstname', 'email'],
      limit: 1,
    }),
  })
  if (!r.ok) return null
  const j = await r.json()
  const c = j.results?.[0]
  if (!c) return null
  return { id: c.id, firstName: c.properties?.firstname || '', email: c.properties?.email || email }
}

const num = (v: unknown) => {
  const n = parseFloat(String(v ?? ''))
  return Number.isFinite(n) ? n : null
}

export async function getDeals(contactId: string): Promise<PortalDeal[]> {
  const a = await fetch(`${API}/crm/v4/objects/contacts/${contactId}/associations/deals`, {
    headers: headers(),
    cache: 'no-store',
  })
  if (!a.ok) return []
  const ids: string[] = ((await a.json()).results || []).map((x: any) => String(x.toObjectId))
  if (!ids.length) return []
  const r = await fetch(`${API}/crm/v3/objects/deals/batch/read`, {
    method: 'POST',
    headers: headers(),
    cache: 'no-store',
    body: JSON.stringify({
      inputs: ids.slice(0, 50).map((id) => ({ id })),
      properties: [
        'dealname', 'dealstage', 'piece', 'hs_next_step', 'job_due_date',
        'quoted_amount', 'paid_amount', 'owed_amount',
        'portal_cad_urls', 'portal_quote_url', 'portal_message',
      ],
    }),
  })
  if (!r.ok) return []
  const results: any[] = (await r.json()).results || []
  return results
    .map((d) => {
      const p = d.properties || {}
      const quoted = num(p.quoted_amount)
      const paid = num(p.paid_amount)
      let owed = num(p.owed_amount)
      if (owed === null && quoted !== null && paid !== null) owed = Math.max(quoted - paid, 0)
      const https = (s: string) => /^https:\/\/[^\s]+$/.test(s)
      return {
        id: String(d.id),
        name: p.dealname || 'Your piece',
        stageId: p.dealstage || '',
        piece: p.piece || '',
        nextStep: p.hs_next_step || '',
        dueDate: p.job_due_date || '',
        quoted, paid, owed,
        cadUrls: String(p.portal_cad_urls || '').split(/\s+/).filter(https),
        quoteUrl: https(String(p.portal_quote_url || '').trim()) ? String(p.portal_quote_url).trim() : '',
        message: p.portal_message || '',
      } as PortalDeal
    })
    .filter((d) => d.stageId !== STAGE_LOST)
}

// Adds a note to the deal's timeline (and the contact's). Creates a note only.
// Association type ids are HubSpot-defined: 214 = note to deal, 202 = note to contact.
export async function addDealNote(dealId: string, contactId: string, html: string): Promise<boolean> {
  const r = await fetch(`${API}/crm/v3/objects/notes`, {
    method: 'POST',
    headers: headers(),
    cache: 'no-store',
    body: JSON.stringify({
      properties: { hs_timestamp: new Date().toISOString(), hs_note_body: html },
      associations: [
        { to: { id: dealId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 214 }] },
        { to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }] },
      ],
    }),
  })
  if (!r.ok) console.error('portal note failed', r.status, await r.text().catch(() => ''))
  return r.ok
}
