import { collectEnSitemapUrls, toSitemapDate } from '@/lib/content/en-sitemap'

const CHUNK_SIZE = 10000

export function buildSitemapIndexXml(baseUrl: string, totalPresentations: number | null): string {
  const enLatest = toSitemapDate(collectEnSitemapUrls().latest)
  const now = new Date().toISOString()
  const totalPages = totalPresentations == null ? 0 : Math.ceil(totalPresentations / CHUNK_SIZE)

  const sitemaps = [
    `  <sitemap>
    <loc>${baseUrl}/en-sitemap.xml</loc>
    <lastmod>${enLatest}</lastmod>
  </sitemap>`,
    `  <sitemap>
    <loc>${baseUrl}/pages-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`,
    `  <sitemap>
    <loc>${baseUrl}/companies-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`,
    `  <sitemap>
    <loc>${baseUrl}/industry-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`,
    ...Array.from({ length: totalPages }, (_, i) => `  <sitemap>
    <loc>${baseUrl}/presentations-sitemap/${i}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.join('\n')}
</sitemapindex>`
}

export function sitemapIndexResponse(xml: string) {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
