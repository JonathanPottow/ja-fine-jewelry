import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Animations from '@/components/Animations'

export const metadata: Metadata = {
  title: 'Jonathan Alistair Fine Jewelry | Bespoke Fine Jewelry Charlotte NC',
  description: 'Jonathan Pottow creates heirloom-quality bespoke fine jewelry in Charlotte, NC.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Jonathan Alistair Fine Jewelry',
    description: 'Bespoke fine jewelry. Private commissions. Charlotte, NC.',
    url: 'https://www.jafinejewelry.com',
    siteName: 'Jonathan Alistair Fine Jewelry',
    images: [
      {
        url: 'https://www.jafinejewelry.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jonathan Alistair Fine Jewelry — Bespoke Fine Jewelry Charlotte NC',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jonathan Alistair Fine Jewelry',
    description: 'Bespoke fine jewelry. Private commissions. Charlotte, NC.',
    images: ['https://www.jafinejewelry.com/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PCB802WB2K"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PCB802WB2K');
        `}} />
      </head>
      <body>
        <Animations />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
