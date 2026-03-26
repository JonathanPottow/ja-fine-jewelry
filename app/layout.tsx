import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
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
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
