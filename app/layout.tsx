import type { Metadata } from 'next'
import './globals.css'
import RaeganChat from '@/components/RaeganChat'
import Animations from '@/components/Animations'

export const metadata: Metadata = {
  title: 'Jonathan Alistair Fine Jewelry | Bespoke Fine Jewelry Charlotte NC',
  description: 'Jonathan Pottow creates heirloom-quality bespoke fine jewelry in Charlotte, NC.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Animations />
        {children}
        <RaeganChat />
      </body>
    </html>
  )
}
