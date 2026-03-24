import { Metadata } from 'next'
import ShopClient from './ShopClient'

export const metadata: Metadata = {
  title: 'The Shop | Jonathan Alistair Fine Jewelry',
  description: 'Fine jewelry worth keeping. Ready-to-ship pieces curated by Jonathan Alistair. Ships anywhere in the USA.',
}

async function getProducts() {
  try {
    const res = await fetch('https://www.wixapis.com/stores/v3/products/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.WIX_API_KEY || '',
        'wix-site-id': process.env.WIX_SITE_ID || '',
      },
      body: JSON.stringify({ query: { filter: { visible: true }, paging: { limit: 50 } }, fields: ['PLAIN_DESCRIPTION', 'URL', 'CURRENCY'] }),
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.products || []
  } catch { return [] }
}

export default async function ShopPage() {
  const products = await getProducts()
  return <ShopClient products={products} />
}
