import type { Metadata } from 'next'
import './globals.css'
import RaeganChat from '@/components/RaeganChat'

export const metadata: Metadata = {
  title: 'Jonathan Alistair Fine Jewelry | Bespoke Fine Jewelry Charlotte NC',
  description: 'Jonathan Pottow creates heirloom-quality bespoke fine jewelry in Charlotte, NC.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, backgroundColor: '#f7f2eb', color: '#2c2416', WebkitFontSmoothing: 'antialiased' }}>
        {children}
        <RaeganChat />
      </body>
    </html>
  )
}
