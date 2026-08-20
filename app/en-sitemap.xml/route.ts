import { buildEnSitemapXml } from '@/lib/content/en-sitemap'

export const revalidate = false

export async function GET() {
  const xml = buildEnSitemapXml()

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
