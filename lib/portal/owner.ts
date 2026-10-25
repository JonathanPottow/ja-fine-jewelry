import { cookies } from 'next/headers'
import { verifyToken, isOwner, SESSION_COOKIE } from './session'

// The signed-in owner's email, or null if the visitor is not an owner.
export function ownerEmail(): string | null {
  const email = verifyToken(cookies().get(SESSION_COOKIE)?.value, 'session')
  return isOwner(email) ? email : null
}
