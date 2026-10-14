/**
 * Single source of truth for the portfolio.
 *
 * Every piece below is rendered:
 *   1. As a card on the homepage portfolio preview (PortfolioGrid)
 *   2. As a card on the full /portfolio listing page (PortfolioFull)
 *   3. As its own page at /portfolio/[slug]
 *   4. As a URL in sitemap.xml
 *
 * Workflow for adding real content:
 *   - Open the JAFJ portfolio spreadsheet
 *   - Fill in: name, slug, category, metals, stones, year, story, alt
 *   - Update this file (or import from generated data)
 *
 * Slug rules:
 *   - All lowercase, hyphenated, no spaces, no special chars
 *   - Stable URLs — once a piece is live, prefer adding a redirect over
 *     changing its slug.
 */

import type { MetalKey } from './pricing'

export type PortfolioCategory =
  | 'Engagement Rings'
  | 'Bridal Sets'
  | 'Wedding Bands'
  | 'Anniversary Pieces'
  | 'Pendants'
  | 'Heirloom Redesigns'
  | 'Uncategorized'

export interface PortfolioPiece {
  /** Internal reference number from the studio */
  ref: string
  /** URL slug — appears in /portfolio/[slug] */
  slug: string
  /** Display name shown to visitors */
  name: string
  /** Category — drives the filter buttons on /portfolio */
  category: PortfolioCategory
  /** Metal(s) used */
  metals?: string
  /** Stone(s) used */
  stones?: string
  /** Year created */
  year?: number
  /** Short narrative — 2-3 sentences max */
  story?: string
  /** Filename inside /public/portfolio */
  file: string
  /** Time in seconds to seek to for the still thumbnail */
  thumbTime: number
  /** Descriptive alt text for accessibility and SEO */
  alt: string
  /** Metal the piece is pictured in (also the default in the metal dropdown) */
  defaultMetal: MetalKey
  /** Starting price of the SETTING ONLY in 14k gold, USD. null = priced individually */
  base14k: number | null
  /** Engagement-style pieces offer the lab grown center add-on and the natural diamond note */
  offersCenterStone: boolean
  /** Pictured with mixed metals (e.g. gold band + platinum prongs) */
  mixedMetals?: boolean
  /** Set false to hide from listing pages while keeping the file */
  published: boolean
}

export const portfolioPieces: PortfolioPiece[] = [
  {
    ref: '252856',
    slug: 'the-stellenbosch',
    name: 'The Stellenbosch',
    category: 'Engagement Rings',
    metals: 'Yellow gold',
    story:
      'A round cut diamond gives off timeless sparkle with a silhouette that never goes out of style. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by a classic solitaire — letting the center stone speak for itself. Set in warm yellow gold on a clean, slender band, the design is simple on purpose: nothing competes with the diamond.',
    file: 'converted_#252856.mp4',
    thumbTime: 0,
    alt: 'The Stellenbosch — a large round brilliant diamond solitaire in yellow gold, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: 2500,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: '252862',
    slug: 'the-clifton',
    name: 'The Clifton',
    category: 'Engagement Rings',
    metals: 'Yellow gold',
    story:
      'A radiant cut diamond delivers the brilliance of a round in a modern elongated shape. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by the clean geometry of a bezel setting, holding the center stone flush against a warm yellow gold band. A single accent stone sits to one side — a small asymmetry that gives the ring a distinct, modern character.',
    file: 'converted_#252862.mp4',
    thumbTime: 0,
    alt: 'The Clifton — a bezel-set radiant cut diamond in yellow gold with accent side stone, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: 2800,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: '251880',
    slug: 'the-tulbagh',
    name: 'The Tulbagh',
    category: 'Engagement Rings',
    metals: 'Yellow gold and platinum',
    story:
      'An elongated cushion diamond offers a soft, vintage silhouette that flatters the finger. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by the idea of contrast, pairing a warm yellow gold band with cool platinum prongs at the head. The two-tone construction keeps the center stone feeling bright and modern while the band wears warm and timeless.',
    file: 'converted_#251880.mp4',
    thumbTime: 0,
    alt: 'The Tulbagh — an elongated cushion diamond solitaire in yellow gold with platinum prongs, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: 2700,
    offersCenterStone: true,
    mixedMetals: true,
    published: true,
  },
  {
    ref: '251941',
    slug: 'the-protea',
    name: 'The Protea',
    category: 'Wedding Bands',
    metals: 'Yellow gold',
    story:
      'A diamond-set wedding band adds a quiet shimmer to the stack without competing with the engagement ring. This custom band by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by a rhythmic alternation of round and pear-shaped diamonds, set in warm yellow gold along the top half of the band. Delicate enough to wear daily, distinctive enough to catch the light every time.',
    file: 'converted_#251941.mp4',
    thumbTime: 0,
    alt: 'The Protea — a delicate yellow gold wedding band with alternating round and pear-shaped diamonds, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: null,
    offersCenterStone: false,
    published: true,
  },
  {
    ref: '252224',
    slug: 'the-paarl',
    name: 'The Paarl',
    category: 'Engagement Rings',
    metals: 'Platinum',
    story:
      'An emerald cut diamond offers architectural beauty with clean step-cut lines and unmatched clarity. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by classic Art Deco geometry, pairing the center stone with two tapered baguettes that run flush along the finger. Set in platinum for its strength and cool tone, the result is understated, formal, and built to wear every day.',
    file: 'converted_#252224.mp4',
    thumbTime: 0,
    alt: 'The Paarl — a platinum three-stone ring with an emerald cut center and tapered baguette side stones, custom commission by Jonathan Alistair',
    defaultMetal: 'platinum',
    base14k: 3200,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: '252421',
    slug: 'the-atlantic',
    name: 'The Atlantic',
    category: 'Engagement Rings',
    metals: 'Platinum',
    story:
      'An oval diamond set east-to-west breaks from convention while still feeling effortlessly elegant. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by a wearer wanting something distinctive and minimal. Set horizontally in platinum on a fine band, the oval spans the finger rather than the length of the hand — a small rotation that changes everything about how the ring feels.',
    file: 'converted_#252421.mp4',
    thumbTime: 0,
    alt: 'The Atlantic — a platinum east-west oval diamond solitaire, custom commission by Jonathan Alistair',
    defaultMetal: 'platinum',
    base14k: 2600,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: '252470',
    slug: 'the-knysna',
    name: 'The Knysna',
    category: 'Pendants',
    metals: 'Platinum',
    stones: 'Blue sapphire',
    story:
      'Designed for a nurse who needed a way to keep her engagement ring with her through long hospital shifts, this custom pendant by Charlotte-based Jonathan Alistair Fine Jewelry pairs a wishbone silhouette with a selection of sapphires chosen specifically for their Duke blue color. Crafted in platinum and finished on a delicate chain, it\'s a quiet daily piece built for a life that doesn\'t always allow a ring on the finger — a practical commission made personal.',
    file: 'converted_#252470.mp4',
    thumbTime: 0,
    alt: 'The Knysna — a platinum wishbone pendant set with Duke blue sapphires, designed to carry an engagement ring during hospital shifts, custom commission by Jonathan Alistair',
    defaultMetal: 'platinum',
    base14k: null,
    offersCenterStone: false,
    published: true,
  },
  {
    ref: '252489',
    slug: 'the-savannah',
    name: 'The Savannah',
    category: 'Engagement Rings',
    metals: 'Yellow gold',
    story:
      'A three-stone ring tells a story of past, present, and future — a classic symbol with endless room for interpretation. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by a softer take on the silhouette: an oval center flanked by half-moon side stones, with pavé diamonds trailing down the shoulders. Set in warm yellow gold, it reads romantic without feeling heavy.',
    file: 'converted_#252489.mp4',
    thumbTime: 0,
    alt: 'The Savannah — a yellow gold three-stone ring with oval center, half-moon side stones, and pavé shoulders, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: 3800,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: '252722',
    slug: 'the-franschhoek',
    name: 'The Franschhoek',
    category: 'Engagement Rings',
    metals: 'Platinum',
    story:
      'An elongated cushion diamond offers the soft edges of a vintage cut with the presence of a modern solitaire. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by pared-back minimalism — a single center stone held above a clean platinum band with nothing else to distract. A ring for someone who wants every detail to matter, but not many details at all.',
    file: 'converted_#252722.mp4',
    thumbTime: 0,
    alt: 'The Franschhoek — an elongated cushion diamond solitaire in platinum with a minimalist band, custom commission by Jonathan Alistair',
    defaultMetal: 'platinum',
    base14k: 2500,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: '252844',
    slug: 'the-hermanus',
    name: 'The Hermanus',
    category: 'Engagement Rings',
    metals: 'Yellow gold',
    story:
      'An oval diamond framed by a bypass halo creates the illusion of flowing movement across the finger. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by the asymmetry of a halo that doesn\'t fully enclose the center stone, giving it a more organic, hand-drawn feel. Set in warm yellow gold, the design looks both contemporary and effortlessly feminine.',
    file: 'converted_#252844.mp4',
    thumbTime: 0,
    alt: 'The Hermanus — a yellow gold oval diamond engagement ring with a flowing bypass halo, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: 3200,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: '252896',
    slug: 'the-elgin',
    name: 'The Elgin',
    category: 'Engagement Rings',
    metals: 'Yellow gold',
    story:
      'A three-stone ring with a radiant center and pear-shaped side stones balances geometry and softness in a single silhouette. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by the interplay between the step-cut brilliance of the radiant and the tapered curve of the pears. Set in warm yellow gold, the whole piece reads as confident and unmistakably personal.',
    file: 'converted_#252896.mp4',
    thumbTime: 0,
    alt: 'The Elgin — a yellow gold three-stone ring with radiant center and pear-shaped side stones, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: 3400,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: '241070',
    slug: 'the-fynbos',
    name: 'The Fynbos',
    category: 'Engagement Rings',
    metals: 'Yellow gold',
    story:
      'A three-stone ring carries the weight of past, present, and future in its silhouette. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by a delicate take on the classic — an oval center with pear-shaped sides held in fine prongs on a slender yellow gold band. Named for the wild flora of the Cape, it\'s designed to feel light on the hand and lasting on the finger.',
    file: 'converted_241070.mp4',
    thumbTime: 0,
    alt: 'The Fynbos — a delicate yellow gold three-stone ring with oval center and pear side stones, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: 3200,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: '241554 & 241555',
    slug: 'the-drakensberg',
    name: 'The Drakensberg',
    category: 'Bridal Sets',
    metals: 'Yellow gold',
    story:
      'A matched bridal set brings a sense of cohesion to the stack from day one. This custom pair by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by an oval three-stone engagement ring partnered with a shared-prong diamond band that sits flush against it. Both crafted in warm yellow gold, the set was designed to read as a single, continuous piece of jewelry on the finger.',
    file: 'converted_241554 & 241555.mp4',
    thumbTime: 0,
    alt: 'The Drakensberg — a yellow gold bridal pair featuring an oval three-stone engagement ring and matching shared-prong diamond band, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: null,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: '241587',
    slug: 'the-karoo',
    name: 'The Karoo',
    category: 'Engagement Rings',
    metals: 'Yellow gold and platinum',
    story:
      'A marquise diamond elongates the finger with a silhouette that feels both regal and distinctly modern. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by a contrast in metals — a warm yellow gold band meeting cool platinum prongs at the head, holding the center stone secure at its delicate points. A design built for someone drawn to classical shapes worn with a contemporary edge.',
    file: 'converted_241587.mp4',
    thumbTime: 0,
    alt: 'The Karoo — a marquise diamond solitaire in yellow gold with platinum prongs, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: 2700,
    offersCenterStone: true,
    mixedMetals: true,
    published: true,
  },
  {
    ref: '241606',
    slug: 'the-bantry',
    name: 'The Bantry',
    category: 'Engagement Rings',
    metals: 'Yellow gold',
    story:
      'A substantial oval diamond deserves a setting that gives it room to breathe. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by the hidden halo — a ring of small diamonds tucked under the center stone that add quiet sparkle visible only from the side. Set in warm yellow gold on a fine band, the design keeps the focus exactly where it belongs.',
    file: 'converted_241606.mp4',
    thumbTime: 0,
    alt: 'The Bantry — a substantial oval diamond solitaire in yellow gold with a hidden halo, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: 3000,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: '252025',
    slug: 'the-winelands',
    name: 'The Winelands',
    category: 'Bridal Sets',
    metals: 'Yellow gold',
    story:
      'An oval diamond with a hidden halo offers the presence of a larger stone and the sparkle to match. This custom set by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by the idea of designing the engagement ring and the wedding band as a single piece from the start — the matching band sits flush and carries the same warm yellow gold finish. Designed to wear as one continuous shape.',
    file: 'converted_252025.mp4',
    thumbTime: 0,
    alt: 'The Winelands — a yellow gold oval diamond engagement ring with hidden halo and a stacked matching band, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: null,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: '252734',
    slug: 'the-camps-bay',
    name: 'The Camps Bay',
    category: 'Bridal Sets',
    metals: 'Yellow gold and white gold',
    story:
      'A cushion diamond brings soft edges and romantic proportions to a classic solitaire silhouette. This custom bridal set by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by the idea of pairing warm and cool metals — a yellow gold solitaire sitting alongside a white gold eternity band. The contrast in tone gives the stack visual depth while keeping both rings easy to wear on their own.',
    file: 'converted_252734.mp4',
    thumbTime: 0,
    alt: 'The Camps Bay — a two-tone bridal set featuring a cushion diamond solitaire in yellow gold with a white gold eternity band, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: null,
    offersCenterStone: true,
    mixedMetals: true,
    published: true,
  },
  {
    ref: '241120',
    slug: 'the-kirstenbosch',
    name: 'The Kirstenbosch',
    category: 'Engagement Rings',
    metals: 'Platinum',
    story:
      'An elongated cushion diamond reads as both vintage and modern depending on how it catches the light. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by a pavé-set band with a hidden halo — subtle sparkle at every angle without crowding the center stone. Set in platinum for its cool tone and lasting durability, it\'s designed to be worn every day for a lifetime.',
    file: 'converted_JA 241120 .mp4',
    thumbTime: 0,
    alt: 'The Kirstenbosch — an elongated cushion diamond in platinum with a pavé-set band and hidden halo, custom commission by Jonathan Alistair',
    defaultMetal: 'platinum',
    base14k: 3400,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: '241126',
    slug: 'the-constantia',
    name: 'The Constantia',
    category: 'Engagement Rings',
    metals: 'Yellow gold',
    story:
      'A classic oval solitaire is the quietest way to make a statement. This custom ring by Charlotte-based Jonathan Alistair Fine Jewelry was inspired by pure simplicity — a single oval diamond held in fine prongs above a slender yellow gold band. Named for one of the oldest neighborhoods of the Cape, it\'s a design built to feel like an heirloom from the day it\'s first put on.',
    file: 'converted_JA 241126.mp4',
    thumbTime: 0,
    alt: 'The Constantia — a classic oval diamond solitaire in yellow gold on a slender band, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: 2500,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: 'Cape · Plat',
    slug: 'the-cape-platinum',
    name: 'The Cape — Platinum',
    category: 'Bridal Sets',
    metals: 'Platinum',
    story:
      'An oval diamond rests on a slender platinum band, paired with a full diamond eternity band that wears as one continuous line of light. This custom bridal set by Charlotte-based Jonathan Alistair Fine Jewelry was designed to be worn together from the first day: cool, clean, and quietly brilliant from every angle.',
    file: 'converted_Stewart Plat.mp4',
    thumbTime: 2,
    alt: 'The Cape — Platinum — an oval diamond ring with a matching diamond eternity band in platinum, custom commission by Jonathan Alistair',
    defaultMetal: 'platinum',
    base14k: null,
    offersCenterStone: true,
    published: true,
  },
  {
    ref: 'Cape · YG',
    slug: 'the-cape-two-tone',
    name: 'The Cape — Two-Tone',
    category: 'Bridal Sets',
    metals: 'Yellow gold and platinum',
    story:
      'An oval diamond set on a warm yellow gold band, paired with a diamond eternity band in cool white metal. The two-tone pairing lets the center stone glow while the band catches the light all the way around. This custom bridal set by Charlotte-based Jonathan Alistair Fine Jewelry was made to be worn together, every day.',
    file: 'converted_Stewart TT.mp4',
    thumbTime: 2,
    alt: 'The Cape — Two-Tone — an oval diamond ring on a yellow gold band with a diamond eternity band, custom commission by Jonathan Alistair',
    defaultMetal: '18k',
    base14k: null,
    offersCenterStone: true,
    mixedMetals: true,
    published: true,
  },
]

/**
 * Convenience: only the pieces that should appear publicly.
 */
export const publishedPortfolioPieces = portfolioPieces.filter((p) => p.published)

/**
 * Look up a single piece by its slug.
 */
export function getPieceBySlug(slug: string): PortfolioPiece | undefined {
  return portfolioPieces.find((p) => p.slug === slug)
}

/**
 * Get up to N other pieces, preferring same category.
 */
export function getRelatedPieces(slug: string, limit = 3): PortfolioPiece[] {
  const current = getPieceBySlug(slug)
  if (!current) return []
  const others = publishedPortfolioPieces.filter((p) => p.slug !== slug)
  const sameCategory = others.filter((p) => p.category === current.category)
  const otherCategory = others.filter((p) => p.category !== current.category)
  return [...sameCategory, ...otherCategory].slice(0, limit)
}

export const portfolioCategories: PortfolioCategory[] = [
  'Engagement Rings',
  'Bridal Sets',
  'Wedding Bands',
  'Anniversary Pieces',
  'Pendants',
  'Heirloom Redesigns',
]

/** Square still image for a piece (generated from the video, so no separate clipping needed). */
export function pieceStill(piece: Pick<PortfolioPiece, 'slug'>): string {
  return `/portfolio/stills/${piece.slug}.jpg`
}
