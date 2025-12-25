import { MetadataRoute } from 'next'

// Ensure robots.txt always points to the primary canonical domain
// Prefer NEXT_PUBLIC_SITE_URL; fallback to deployment envs, then hardcoded primary
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://finmoconf.diveinvest.net')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${BASE_URL}/sitemap-index.xml`,
  }
}