import dbConnect from '@/lib/mongodb'
import PresentationModel from '@/lib/models/Presentation'
import { withTimeout } from '@/lib/with-timeout'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finmoconf.diveinvest.net'

  try {
    await withTimeout(dbConnect(), 2500, 'Companies sitemap connect')
    const companies = await PresentationModel.aggregate<{
      _id: string
      lastUpdate: Date
    }>([
      {
        $group: {
          _id: '$companyCode',
          lastUpdate: { $max: { $ifNull: ['$createdAt', '$eventDate'] } },
        },
      },
    ]).option({ maxTimeMS: 8000 })

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${companies.map((company) => `  <url>
    <loc>${baseUrl}/company/${company._id}</loc>
    <lastmod>${new Date(company.lastUpdate).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch (error) {
    console.error('Error generating companies sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}
