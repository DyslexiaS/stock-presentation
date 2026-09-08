/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  serverExternalPackages: ['gray-matter'],
  // Behind a reverse proxy, Origin (public domain) may not match Host
  // (internal). Allow the public host so POSTs are not CSRF-blocked.
  experimental: {
    serverActions: {
      allowedOrigins: [
        'finmoconf.diveinvest.net',
        '*.diveinvest.net',
      ],
    },
  },
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