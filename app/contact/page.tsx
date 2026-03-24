import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Book a Consultation | Bespoke Jewelry Charlotte NC',
  description: 'Begin your bespoke jewelry journey with Jonathan Pottow. Private consultations for engagement rings, wedding bands, heirloom redesigns and fine pendants in Charlotte, NC. Jonathan responds personally within 48 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Book a Jewelry Consultation | Jonathan Alistair Fine Jewelry Charlotte NC',
    description: 'Start your bespoke fine jewelry commission with a private consultation. Engagement rings, wedding bands, heirloom redesigns — Charlotte NC and nationwide.',
    url: 'https://www.jafinejewelry.com/contact',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
