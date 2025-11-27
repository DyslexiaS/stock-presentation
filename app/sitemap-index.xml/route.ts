import dbConnect from '@/lib/mongodb'
import PresentationModel from '@/lib/models/Presentation'

const CHUNK_SIZE = 50000

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://finmoconf.diveinvest.net')

  try {
    await dbConnect()
    const totalPresentations = await PresentationModel.countDocuments()
    const totalPages = Math.ceil(totalPresentations / CHUNK_SIZE)

    const sitemaps = [
      `  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`,
      `  <sitemap>
    <loc>${baseUrl}/companies-sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`,
      ...Array.from({ length: totalPages }, (_, i) => `  <sitemap>
    <loc>${baseUrl}/presentations-sitemap.xml?page=${i}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`)
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.join('\n')}
</sitemapindex>`

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap index:', error)
    return new Response('Error generating sitemap index', { status: 500 })
  }
}
