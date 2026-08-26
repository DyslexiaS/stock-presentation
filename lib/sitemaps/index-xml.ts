import PresentationModel from '@/lib/models/Presentation'
import dbConnect from '@/lib/mongodb'
import { collectEnSitemapUrls, toSitemapDate } from '@/lib/content/en-sitemap'
import { withTimeout } from '@/lib/with-timeout'

const CHUNK_SIZE = 10000
const MONGO_BUDGET_MS = 2500

function sitemapEntry(loc: string, lastmod: string): string {
  return `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`
}

/** English + industry sitemaps are static. Presentation/company counts wait on Mongo with a hard cap. */
export async function buildSitemapIndexXml(): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finmoconf.diveinvest.net'
  const enLatest = toSitemapDate(collectEnSitemapUrls().latest)
  const today = new Date().toISOString()

  let totalPages = 0
  let includeMongoSitemaps = false

  try {
    totalPages = await withTimeout(
      (async () => {
        await dbConnect()
        const totalPresentations = await PresentationModel.countDocuments({}).maxTimeMS(MONGO_BUDGET_MS)
        return Math.ceil(totalPresentations / CHUNK_SIZE)
      })(),
      MONGO_BUDGET_MS,
      'Sitemap Mongo count'
    )
    includeMongoSitemaps = true
  } catch (error) {
    console.error('Sitemap index skipping Mongo-backed URLs:', error)
  }

  const entries = [
    sitemapEntry(`${baseUrl}/en-sitemap.xml`, enLatest),
    sitemapEntry(`${baseUrl}/industry-sitemap.xml`, today),
  ]

  if (includeMongoSitemaps) {
    entries.splice(
      1,
      0,
      sitemapEntry(`${baseUrl}/companies-sitemap.xml`, today)
    )
    for (let i = 0; i < totalPages; i++) {
      entries.push(sitemapEntry(`${baseUrl}/presentations-sitemap/${i}`, today))
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</sitemapindex>`
}
