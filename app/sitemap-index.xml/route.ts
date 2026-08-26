import { buildSitemapIndexXml } from '@/lib/sitemaps/index-xml'

export const revalidate = 86400

export async function GET() {
  const xml = await buildSitemapIndexXml()

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
