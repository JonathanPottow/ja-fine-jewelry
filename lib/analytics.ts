/**
 * Lightweight GA4 event helper.
 * Safe to call from anywhere in the app — no-ops if gtag isn't loaded
 * (e.g. server-side, tests, or if the script hasn't initialized yet).
 *
 * Usage:
 *   import { trackEvent } from '@/lib/analytics'
 *   trackEvent('lead_form_submit', { location: 'contact_page' })
 */

type GtagParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(eventName: string, params: GtagParams = {}): void {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  try {
    window.gtag('event', eventName, params)
  } catch {
    // swallow — analytics should never break the app
  }
}

// Named conversion events used across the site. Keeping these centralized
// so we can rename or extend them in one place.
export const ANALYTICS_EVENTS = {
  LEAD_FORM_SUBMIT: 'lead_form_submit',
  EMAIL_SUBSCRIBE: 'email_subscribe',
  CTA_CLICK: 'cta_click',
} as const
