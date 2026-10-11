'use client'
import { useEffect, useRef } from 'react'

// Cloudflare Turnstile widget (the "I'm human" check).
// Only shows when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set in Vercel.
declare global {
  interface Window { turnstile?: any }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

export default function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!SITE_KEY || !ref.current) return
    let widgetId: string | undefined
    let cancelled = false

    const render = () => {
      if (cancelled || !ref.current || !window.turnstile || widgetId) return
      widgetId = window.turnstile.render(ref.current, {
        sitekey: SITE_KEY,
        theme: 'light',
        callback: (token: string) => onToken(token),
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
      })
    }

    if (window.turnstile) {
      render()
    } else {
      let script = document.querySelector<HTMLScriptElement>('script[data-turnstile]')
      if (!script) {
        script = document.createElement('script')
        script.src = SCRIPT_SRC
        script.async = true
        script.defer = true
        script.dataset.turnstile = '1'
        document.head.appendChild(script)
      }
      script.addEventListener('load', render)
    }

    return () => {
      cancelled = true
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
    }
  }, [onToken])

  if (!SITE_KEY) return null
  return <div ref={ref} style={{ margin: '8px 0 16px', minHeight: 65 }} />
}

// Hidden "trap" field: people never see it, bots fill it in.
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={e => onChange(e.target.value)} />
      </label>
    </div>
  )
}
