// HubSpot access for the client portal. Clients only read; their responses add a note
// (addDealNote). The owner studio may change stage and portal fields (updateStudioDeal).
// Both approved by Jonathan 2026-10-25.
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

const DEAL_PROPS = [
  'dealname', 'dealstage', 'piece', 'hs_next_step', 'job_due_date',
  'quoted_amount', 'paid_amount', 'owed_amount',
  'portal_cad_urls', 'portal_quote_url', 'portal_message',
]
const https = (s: string) => /^https:\/\/[^\s]+$/.test(s)

function toDeal(d: any): PortalDeal {
  const p = d.properties || {}
  const quoted = num(p.quoted_amount)
  const paid = num(p.paid_amount)
  let owed = num(p.owed_amount)
  if (owed === null && quoted !== null && paid !== null) owed = Math.max(quoted - paid, 0)
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
  }
}

async function readDeals(ids: string[], extra: string[] = []): Promise<any[]> {
  if (!ids.length) return []
  const r = await fetch(`${API}/crm/v3/objects/deals/batch/read`, {
    method: 'POST',
    headers: headers(),
    cache: 'no-store',
    body: JSON.stringify({ inputs: ids.slice(0, 100).map((id) => ({ id })), properties: [...DEAL_PROPS, ...extra] }),
  })
  if (!r.ok) return []
  return (await r.json()).results || []
}

export async function getDeals(contactId: string): Promise<PortalDeal[]> {
  const a = await fetch(`${API}/crm/v4/objects/contacts/${contactId}/associations/deals`, {
    headers: headers(),
    cache: 'no-store',
  })
  if (!a.ok) return []
  const ids: string[] = ((await a.json()).results || []).map((x: any) => String(x.toObjectId))
  return (await readDeals(ids.slice(0, 50))).map(toDeal).filter((d) => d.stageId !== STAGE_LOST)
}

// ─── Studio (owner only) ───

// Stages Jonathan can pick in the studio, in pipeline order. Lost is left to HubSpot.
export const STAGES = [
  { id: '4488455914', label: 'Lead' },
  { id: '4488455915', label: 'Consult' },
  { id: '4488455916', label: 'Design / CAD' },
  { id: '4488455917', label: 'Quoting' },
  { id: '4488455918', label: 'Approved / In Production' },
  { id: '4490450636', label: 'Needs Appraisal' },
  { id: '4488455920', label: 'Repairs & Servicing' },
  { id: '4488455919', label: 'Ready for Pickup' },
  { id: '4488455921', label: 'Delivered / Paid' },
  { id: '4490481371', label: 'Needs Review' },
]

export type StudioClient = { id: string; firstName: string; lastName: string; email: string }
export type StudioDeal = PortalDeal & { updatedAt: string; client: StudioClient | null }

async function clientsFor(dealIds: string[]): Promise<Record<string, StudioClient>> {
  if (!dealIds.length) return {}
  const a = await fetch(`${API}/crm/v4/associations/deals/contacts/batch/read`, {
    method: 'POST',
    headers: headers(),
    cache: 'no-store',
    body: JSON.stringify({ inputs: dealIds.map((id) => ({ id })) }),
  })
  if (!a.ok) return {}
  const firstContact: Record<string, string> = {}
  for (const row of (await a.json()).results || []) {
    const to = row.to?.[0]?.toObjectId
    if (to) firstContact[String(row.from.id)] = String(to)
  }
  const ids = Array.from(new Set(Object.values(firstContact)))
  if (!ids.length) return {}
  const c = await fetch(`${API}/crm/v3/objects/contacts/batch/read`, {
    method: 'POST',
    headers: headers(),
    cache: 'no-store',
    body: JSON.stringify({ inputs: ids.map((id) => ({ id })), properties: ['firstname', 'lastname', 'email'] }),
  })
  if (!c.ok) return {}
  const byId: Record<string, StudioClient> = {}
  for (const x of (await c.json()).results || []) {
    const p = x.properties || {}
    byId[String(x.id)] = { id: String(x.id), firstName: p.firstname || '', lastName: p.lastname || '', email: p.email || '' }
  }
  const out: Record<string, StudioClient> = {}
  for (const [deal, contact] of Object.entries(firstContact)) if (byId[contact]) out[deal] = byId[contact]
  return out
}

function toStudioDeals(raw: any[], clients: Record<string, StudioClient>): StudioDeal[] {
  return raw.map((d) => ({ ...toDeal(d), updatedAt: d.properties?.hs_lastmodifieddate || d.updatedAt || '', client: clients[String(d.id)] || null }))
}

// Open commissions (not yet delivered), most recently touched first.
export async function listStudioDeals(): Promise<StudioDeal[]> {
  const open = STAGES.filter((s) => STAGE_STEP[s.id] < 6).map((s) => s.id)
  const r = await fetch(`${API}/crm/v3/objects/deals/search`, {
    method: 'POST',
    headers: headers(),
    cache: 'no-store',
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'dealstage', operator: 'IN', values: open }] }],
      sorts: [{ propertyName: 'hs_lastmodifieddate', direction: 'DESCENDING' }],
      properties: [...DEAL_PROPS, 'hs_lastmodifieddate'],
      limit: 100,
    }),
  })
  if (!r.ok) return []
  const raw: any[] = (await r.json()).results || []
  return toStudioDeals(raw, await clientsFor(raw.map((d) => String(d.id))))
}

export async function getStudioDeal(dealId: string): Promise<StudioDeal | null> {
  if (!/^\d+$/.test(dealId)) return null
  const raw = await readDeals([dealId], ['hs_lastmodifieddate'])
  if (!raw.length) return null
  return toStudioDeals(raw, await clientsFor([dealId]))[0]
}

// The only deal fields the studio may change (approved by Jonathan 2026-10-25).
export type StudioUpdate = { stageId: string; message: string; nextStep: string; cadUrls: string[]; quoteUrl: string }

export async function updateStudioDeal(dealId: string, u: StudioUpdate): Promise<boolean> {
  const r = await fetch(`${API}/crm/v3/objects/deals/${dealId}`, {
    method: 'PATCH',
    headers: headers(),
    cache: 'no-store',
    body: JSON.stringify({
      properties: {
        dealstage: u.stageId,
        portal_message: u.message,
        hs_next_step: u.nextStep,
        portal_cad_urls: u.cadUrls.join('\n'),
        portal_quote_url: u.quoteUrl,
      },
    }),
  })
  if (!r.ok) console.error('studio update failed', r.status, await r.text().catch(() => ''))
  return r.ok
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
