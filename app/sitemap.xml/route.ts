import dbConnect from '@/lib/mongodb'
import PresentationModel from '@/lib/models/Presentation'
import { buildSitemapIndexXml, sitemapIndexResponse } from '@/lib/content/sitemap-index'

export const revalidate = 86400

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finmoconf.diveinvest.net'

  try {
    await dbConnect()
    const totalPresentations = await PresentationModel.countDocuments({}).maxTimeMS(5000)
    return sitemapIndexResponse(buildSitemapIndexXml(baseUrl, totalPresentations))
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return sitemapIndexResponse(buildSitemapIndexXml(baseUrl, null))
  }
}
