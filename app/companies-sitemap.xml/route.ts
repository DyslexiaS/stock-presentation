import dbConnect from '@/lib/mongodb'
import PresentationModel from '@/lib/models/Presentation'

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://finmoconf.diveinvest.net')

  try {
    await dbConnect()
    const presentations = await PresentationModel.find({}).lean()

    const companies = new Map()
    presentations.forEach((p: any) => {
      if (!companies.has(p.companyCode)) {
        companies.set(p.companyCode, {
          companyCode: p.companyCode,
          lastUpdate: p.createdAt || p.eventDate
        })
      } else {
        const existing = companies.get(p.companyCode)
        const currentDate = new Date(p.createdAt || p.eventDate)
        const existingDate = new Date(existing.lastUpdate)
        if (currentDate > existingDate) {
          companies.set(p.companyCode, {
            ...existing,
            lastUpdate: p.createdAt || p.eventDate
          })
        }
      }
    })

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(companies.values()).map(company => `  <url>
    <loc>${baseUrl}/company/${company.companyCode}</loc>
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
