import { NextRequest } from 'next/server'
import dbConnect from '@/lib/mongodb'
import PresentationModel from '@/lib/models/Presentation'

const CHUNK_SIZE = 10000

// Tell Next.js about the dynamic segment
export const dynamic = 'force-dynamic'

export async function GET(
  _request: NextRequest,
  context: any
) {
  const params = await context.params as { page: string }
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://finmoconf.diveinvest.net')

  const page = parseInt(params.page)

  try {
    await dbConnect()
    const presentations = await PresentationModel
      .find({})
      .sort({ createdAt: -1 })
      .skip(page * CHUNK_SIZE)
      .limit(CHUNK_SIZE)
      .lean()

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${presentations.map((p: any) => `  <url>
    <loc>${baseUrl}/presentation/${p._id}</loc>
    <lastmod>${new Date(p.createdAt || p.eventDate).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch (error) {
    console.error('Error generating presentations sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}
