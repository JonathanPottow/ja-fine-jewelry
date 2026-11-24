'use client'
import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname, useRouter } from 'next/navigation'

// HubSpot live chat. Visitors chat on the site; Jonathan answers live from the
// HubSpot app on his phone. The chat box itself (colors, greeting, hours, who is
// notified) is set up in HubSpot: Service > Chatflows.
// This also loads HubSpot's visitor tracking, so the privacy policy should mention HubSpot.
const HUBSPOT_ACCOUNT_ID = '247775647' // public account number, not a secret

type HubSpotWidget = { load: (o?: { widgetOpen?: boolean }) => void; open: () => void; remove: () => void; status: () => { loaded: boolean } }
declare global {
  interface Window {
    HubSpotConversations?: { widget: HubSpotWidget }
    hsConversationsOnReady?: Array<() => void>
  }
}

const isPiecePage = (path: string) => /^\/portfolio\/[^/]+/.test(path)

export default function HubSpotChat() {
  const pathname = usePathname() || '/'

  // Lift the chat above the piece pages' bottom bar on phones.
  useEffect(() => {
    document.documentElement.toggleAttribute('data-chat-raised', isPiecePage(pathname))
  }, [pathname])

  return <Script id="hs-script-loader" strategy="afterInteractive" src={`https://js-na2.hs-scripts.com/${HUBSPOT_ACCOUNT_ID}.js`} />
}

// Any "Ask Jonathan" button: opens the live chat, or the contact page if the chat
// is not available (blocked by an ad blocker, or not switched on in HubSpot yet).
export function AskJonathanButton({ className, label = 'Ask Jonathan' }: { className?: string; label?: string }) {
  const router = useRouter()
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const widget = window.HubSpotConversations?.widget
        if (widget && widget.status().loaded) widget.open()
        else router.push('/contact?topic=question')
      }}
    >
      {label}
    </button>
  )
}
