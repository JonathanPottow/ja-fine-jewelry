import crypto from 'crypto'

// Signed, expiring tokens (no database needed). Used for both the emailed
// magic link (short-lived) and the login session cookie (longer-lived).
export const SESSION_COOKIE = 'jafj_portal'
export const MAGIC_TTL_SECONDS = 15 * 60
export const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60

type Payload = { email: string; kind: 'magic' | 'session'; exp: number }

function secret(): string {
  const s = process.env.PORTAL_SECRET
  if (!s || s.length < 32) throw new Error('PORTAL_SECRET missing or too short')
  return s
}

const b64 = (b: Buffer | string) => Buffer.from(b).toString('base64url')

export function signToken(email: string, kind: Payload['kind'], ttlSeconds: number): string {
  const payload: Payload = {
    email: email.trim().toLowerCase(),
    kind,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  }
  const body = b64(JSON.stringify(payload))
  const sig = crypto.createHmac('sha256', secret()).update(body).digest('base64url')
  return `${body}.${sig}`
}

export function verifyToken(token: string | undefined, kind: Payload['kind']): string | null {
  if (!token || token.length > 2000) return null
  const [body, sig] = token.split('.')
  if (!body || !sig) return null
  let expected: string
  try {
    expected = crypto.createHmac('sha256', secret()).update(body).digest('base64url')
  } catch {
    return null
  }
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null
  try {
    const p = JSON.parse(Buffer.from(body, 'base64url').toString()) as Payload
    if (p.kind !== kind || p.exp < Math.floor(Date.now() / 1000)) return null
    return p.email
  } catch {
    return null
  }
}
