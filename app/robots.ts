import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://www.jafinejewelry.com/sitemap.xml',
    host: 'https://www.jafinejewelry.com',
  }
}
