/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static.wixstatic.com', 'images.unsplash.com'],
  },
  async redirects() {
    return [
      { source: '/portfolio/the-linville', destination: '/portfolio/the-stellenbosch', permanent: true },
      { source: '/portfolio/the-meridian', destination: '/portfolio/the-clifton', permanent: true },
      { source: '/portfolio/the-clemence', destination: '/portfolio/the-protea', permanent: true },
      { source: '/portfolio/the-ashford', destination: '/portfolio/the-paarl', permanent: true },
      { source: '/portfolio/the-crescent', destination: '/portfolio/the-knysna', permanent: true },
      { source: '/portfolio/the-mercer', destination: '/portfolio/the-franschhoek', permanent: true },
      { source: '/portfolio/the-cascade', destination: '/portfolio/the-hermanus', permanent: true },
      { source: '/portfolio/the-halcyon', destination: '/portfolio/the-elgin', permanent: true },
      { source: '/portfolio/the-vance', destination: '/portfolio/the-karoo', permanent: true },
      { source: '/portfolio/the-belmont', destination: '/portfolio/the-bantry', permanent: true },
      { source: '/portfolio/the-dilworth', destination: '/portfolio/the-winelands', permanent: true },
      { source: '/portfolio/the-piedmont', destination: '/portfolio/the-camps-bay', permanent: true },
      { source: '/portfolio/the-biltmore', destination: '/portfolio/the-kirstenbosch', permanent: true },
    ]
  },
}

module.exports = nextConfig
