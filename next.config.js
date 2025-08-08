/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  async redirects() {
    // Force canonical host to primary domain
    const canonical = process.env.NEXT_PUBLIC_SITE_URL || 'https://finmoconf.diveinvest.net'
    const canonicalHost = new URL(canonical).host

    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: `((?!${canonicalHost.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}).)*`,
          },
        ],
        destination: `${canonical}/:path*`,
        permanent: true,
      },
    ]
  },
}

export default nextConfig