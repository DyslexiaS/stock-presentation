import { ALL_SUB_INDUSTRIES } from '@/lib/data/industry-map'

export const revalidate = false // static — never revalidate

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finmoconf.diveinvest.net'

  const today = new Date().toISOString().split('T')[0]

  const urls = [
    // Industry index page
    `  <url>
    <loc>${baseUrl}/industry</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    // Each sub-industry page
    ...ALL_SUB_INDUSTRIES.map(
      (industry) => `  <url>
    <loc>${baseUrl}/industry/${industry.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    ),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
