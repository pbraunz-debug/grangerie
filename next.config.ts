import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Placeholder stock used by the design reference until brand photography lands.
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['@sanity/image-url'],
  },
  async redirects() {
    return [{ source: '/about', destination: '/house', permanent: true }]
  },
}

export default nextConfig
