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

const faqs = [
  {
    q: 'What is the investment for a custom piece?',
    a: 'Every commission is different — a bespoke engagement ring with a rare stone is a very different project from a refined anniversary band or a reimagined heirloom. As a guide, most custom commissions begin from $4,000, though the right number depends entirely on your vision, materials, and level of detail. What you will never experience is pressure, hidden costs, or a recommendation that is not genuinely in your best interest. Have a budget in mind? Share it when you reach out — Jonathan will always be honest about what is possible.',
  },
  {
    q: 'Do I need to know exactly what I want before reaching out?',
    a: "Not at all — and most clients do not. Some arrive with a clear vision. Others come with a feeling, an occasion, or a photograph saved on their phone. All of it is a perfectly fine place to start. Jonathan's first job is to listen — to understand you, the person you are creating this for, and what this piece needs to mean. The direction finds itself from there.",
  },
  {
    q: 'How long does the process take?',
    a: 'Most commissions move from first conversation to finished piece in four to eight weeks. More intricate designs or rare stone sourcing may take a little longer — Jonathan will give you a clear and honest timeline upfront so there are no surprises. If you are working toward a specific date — a proposal, an anniversary, a birthday — mention it when you reach out.',
  },
  {
    q: 'What does the design process look like?',
    a: 'Once Jonathan understands your vision, he creates detailed CAD renderings — precise, three-dimensional representations of your piece — so you can see exactly what it will look like before a single stone is set or a gram of metal is touched. Nothing moves forward until you love what you see. Revisions are welcomed, not rationed.',
  },
  {
    q: 'Is a deposit required to begin?',
    a: 'Yes. To begin the design and production process, Jonathan requires a 50% deposit, with the remaining balance due upon completion before delivery. This protects your commission and allows Jonathan to source your materials and allocate the time your piece deserves. All deposits and pricing are discussed openly before any commitment is made.',
  },
  {
    q: 'Do you offer lab grown diamonds?',
    a: 'Yes. Jonathan works with both natural and lab grown diamonds and will walk you through the honest differences — in appearance, origin, and value — so you can make the decision that is right for you. There is no agenda either way. The right stone is whichever one you feel best about.',
  },
  {
    q: 'Can you source watches?',
    a: 'Yes. Jonathan has access to a curated network of luxury watch sources and can assist clients looking for specific timepieces — whether a grail watch, a gift, or an addition to a collection. Reach out with what you have in mind and he will let you know what is possible.',
  },
  {
    q: 'Can you work with my existing jewelry or stones?',
    a: 'Absolutely — and heirloom redesigns are among the most meaningful commissions Jonathan takes on. Whether it is your grandmother\'s diamond, a ring that no longer fits your life, or stones sitting in a drawer, Jonathan can reimagine them into something you will wear every day. The history stays. The piece becomes new.',
  },
  {
    q: 'Can we work together if I am not in Charlotte?',
    a: "Yes — and many of Jonathan's clients are not local. The process begins with a private consultation by phone or video, and finished pieces are shipped securely and insured across the United States. For clients who can visit Charlotte, an in-person appointment is always available and warmly welcomed.",
  },
  {
    q: 'What happens after my piece is delivered?',
    a: 'Jonathan stands behind every piece he creates. If something is not right — a fit issue, a sizing adjustment, anything at all — reach out and it will be taken care of. The relationship does not end at delivery. For many clients, it is just the beginning.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jafinejewelry.com' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.jafinejewelry.com/contact' },
  ],
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactPageClient />
    </>
  )
}
