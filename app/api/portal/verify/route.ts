import { NextResponse } from 'next/server'
import { verifyToken, signToken, isOwner, SESSION_COOKIE, SESSION_TTL_SECONDS } from '@/lib/portal/session'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const base = process.env.PORTAL_BASE_URL || url.origin
  const email = verifyToken(url.searchParams.get('token') || '', 'magic')
  if (!email) return NextResponse.redirect(`${base}/portal/login?expired=1`)
  const res = NextResponse.redirect(`${base}${isOwner(email) ? '/portal/studio' : '/portal'}`)
  res.cookies.set(SESSION_COOKIE, signToken(email, 'session', SESSION_TTL_SECONDS), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  })
  return res
}
