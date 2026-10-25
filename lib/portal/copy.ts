// Client-facing words shared by the portal page and portal emails.

// One warm line per client-facing step (matches STEPS in hubspot.ts).
export const STEP_NOTES = [
  'Your idea has arrived, and we are getting to know it.',
  'Time to talk through your vision, stones and details together.',
  'Your piece is taking shape in design.',
  'Your quote is ready to review whenever you are.',
  'Your piece is at the bench, being made by hand.',
  'Your piece is finished and waiting for you.',
  'It is yours. Thank you for trusting us with it.',
]

// Time-of-day greeting in Charlotte time.
export function greeting() {
  const h = Number(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: 'America/New_York' }).format(new Date()))
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}
