/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  // Simplified redirect configuration to avoid regex issues
  async redirects() {
    return [
      // Add specific redirects here if needed
      // The complex canonical host redirect has been removed to prevent URL issues
    ]
  },
  async rewrites() {
    return [
      {
        source: '/presentations-sitemap-:page.xml',
        destination: '/presentations-sitemap/:page',
      },
    ]
  },
}

export default nextConfig