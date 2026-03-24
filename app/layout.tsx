import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Animations from '@/components/Animations'
import Raegan from '@/components/Raegan'

export const metadata: Metadata = {
  title: {
    default: 'Jonathan Alistair Fine Jewelry | Bespoke Fine Jewelry Charlotte NC | Jonathan Pottow',
    template: '%s | Jonathan Alistair Fine Jewelry Charlotte NC'
  },
  description: 'Jonathan Alistair Fine Jewelry offers bespoke, white-glove fine jewelry commissions in Charlotte, NC. Engagement rings, wedding bands, heirloom redesigns and luxury pendants. Private consultations with Jonathan Pottow — GIA trained with 10+ years experience.',
  keywords: [
    'bespoke jewelry Charlotte NC',
    'custom engagement rings Charlotte',
    'fine jewelry Charlotte North Carolina',
    'private jeweler Charlotte',
    'engagement rings Charlotte NC',
    'wedding bands Charlotte NC',
    'heirloom jewelry redesign Charlotte',
    'luxury jewelry consultant Charlotte',
    'Jonathan Alistair Fine Jewelry',
    'Jonathan Pottow jeweler',
    'diamond consultant Charlotte NC',
    'bespoke engagement ring Charlotte',
  ],
  authors: [{ name: 'Jonathan Pottow', url: 'https://www.jafinejewelry.com' }],
  creator: 'Jonathan Pottow',
  publisher: 'Jonathan Alistair Fine Jewelry',
  metadataBase: new URL('https://www.jafinejewelry.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jafinejewelry.com',
    siteName: 'Jonathan Alistair Fine Jewelry',
    title: 'Jonathan Alistair Fine Jewelry | Bespoke Fine Jewelry Charlotte NC',
    description: 'Private, white-glove bespoke jewelry commissions in Charlotte, NC. Engagement rings, wedding bands, heirloom redesigns. Consult with Jonathan Pottow — 10+ years of luxury jewelry expertise.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jonathan Alistair Fine Jewelry — Bespoke Fine Jewelry Charlotte NC',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jonathan Alistair Fine Jewelry | Bespoke Fine Jewelry Charlotte NC',
    description: 'Private, white-glove bespoke jewelry commissions in Charlotte, NC. Engagement rings, wedding bands, heirloom redesigns.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'add-your-google-search-console-verification-here',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.jafinejewelry.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JewelryStore",
              "name": "Jonathan Alistair Fine Jewelry",
              "alternateName": "Jonathan Alistair Fine Jewelry",
              "description": "Bespoke, white-glove fine jewelry commissions in Charlotte, NC. Private consultations for engagement rings, wedding bands, heirloom redesigns and luxury pendants.",
              "founder": {
                "@type": "Person",
                "name": "Jonathan Pottow",
                "jobTitle": "Founder & Fine Jewelry Consultant",
                "alumniOf": "Gemological Institute of America"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Charlotte",
                "addressRegion": "NC",
                "addressCountry": "US"
              },
              "url": "https://www.jafinejewelry.com",
              "telephone": "",
              "priceRange": "$$$",
              "servesCuisine": null,
              "openingHours": "Mo-Fr 09:00-17:00",
              "areaServed": ["Charlotte, NC", "United States"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Bespoke Fine Jewelry",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Engagement Rings" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Wedding Bands" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Anniversary Pieces" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Pendants" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Heirloom Redesigns" } }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "82",
                "bestRating": "5"
              }
            })
          }}
        />
      </head>
      <body>
        <Nav />
        <Animations />
        <main>{children}</main>
        <Footer />
        <Raegan />
      </body>
    </html>
  )
}
