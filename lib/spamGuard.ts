import { NextRequest } from 'next/server'

// Returns null if the submission looks human, otherwise a short reason.
export async function checkSpam(req: NextRequest, data: any): Promise<null | { reason: string; silent: boolean }> {
  // 1. Hidden trap field was filled in -> bot
  if (data?.website) return { reason: 'honeypot', silent: true }

  // 2. Form sent too fast (under 3 seconds) or without the page timer -> bot
  const startedAt = Number(data?.startedAt)
  if (!startedAt || Date.now() - startedAt < 3000) return { reason: 'too-fast', silent: true }

  // 3. Cloudflare Turnstile check (only when the secret key is set in Vercel)
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (secret) {
    const token = String(data?.turnstileToken || '')
    if (!token) return { reason: 'no-captcha', silent: false }
    const body = new URLSearchParams({ secret, response: token })
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    if (ip) body.append('remoteip', ip)
    try {
      const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
      const result = await res.json()
      if (!result?.success) return { reason: 'captcha-failed', silent: false }
    } catch {
      return { reason: 'captcha-unreachable', silent: false }
    }
  }
  return null
}
