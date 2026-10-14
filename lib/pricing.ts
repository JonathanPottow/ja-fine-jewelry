// Pricing rules for portfolio pieces. Edit the numbers here — every ring page updates automatically.
// All ring prices are SETTING ONLY (the diamond is separate) and are approximate starting points.

export type MetalKey = '14k' | '18k' | 'platinum'

export const METAL_OPTIONS: { key: MetalKey; label: string }[] = [
  { key: '14k', label: '14k gold' },
  { key: '18k', label: '18k gold' },
  { key: 'platinum', label: 'Platinum' },
]

/** Multiplier applied to a piece's 14k starting price. */
export const METAL_MULTIPLIER: Record<MetalKey, number> = {
  '14k': 1,
  '18k': 1.25, // ~25% above 14k
  platinum: 1.25, // ~25% above 14k (see notes: review against today's platinum vs gold spot)
}

/** Lab grown center diamonds — E–F color, VVS1–VVS2 clarity, IGI certified, any shape. */
export const LAB_DIAMOND_PRICES: { carat: number; price: number }[] = [
  { carat: 1, price: 700 },
  { carat: 2, price: 1100 },
  { carat: 3, price: 1500 },
  { carat: 4, price: 1900 },
  { carat: 5, price: 2300 },
]

/** Lab grown diamonds this size and larger are quoted individually. Stored as carat 6 in links and forms. */
export const LAB_INQUIRE_CARAT = 6

export function isValidLabCarat(n: number): boolean {
  return LAB_DIAMOND_PRICES.some((d) => d.carat === n) || n === LAB_INQUIRE_CARAT
}

const roundTo50 = (n: number) => Math.round(n / 50) * 50

export function settingPrice(base14k: number, metal: MetalKey): number {
  return roundTo50(base14k * METAL_MULTIPLIER[metal])
}

export function labDiamondPrice(carat: number): number {
  return LAB_DIAMOND_PRICES.find((d) => d.carat === carat)?.price ?? 0
}

export function formatUSD(n: number): string {
  return '$' + n.toLocaleString('en-US')
}

export function isMetalKey(v: string | null | undefined): v is MetalKey {
  return v === '14k' || v === '18k' || v === 'platinum'
}
