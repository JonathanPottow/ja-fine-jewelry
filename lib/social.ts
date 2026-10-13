// Single source of truth for social / review links shown on the site.
// To add or change a link, edit this list. Anything with an empty href is hidden automatically.
export type SocialLink = {
  key: 'instagram' | 'google' | 'facebook' | 'linkedin'
  label: string
  href: string
}

export const socialLinks: SocialLink[] = [
  { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/jonathanalistair_fj' },
  { key: 'google', label: 'Review Us on Google', href: 'https://g.page/r/CRDdgkS4jtRDEBM/review' },
  { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/jafinejewelry1' },
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/jonathan-pottow-090aa168/' },
]
