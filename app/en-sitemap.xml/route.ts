import { getAllMemos, getAllTopics, EN_BASE_URL } from '@/lib/content/en-memos'

export const revalidate = false

function urlEntry(loc: string, lastmod: string, priority: string) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export async function GET() {
  const memos = getAllMemos()
  const topics = getAllTopics()
  const companies = Array.from(new Set(memos.map((m) => m.companySlug)))

  const lastmod = (date: string) => date || new Date().toISOString().slice(0, 10)
  const today = new Date().toISOString().slice(0, 10)

  const urls = [
    urlEntry(`${EN_BASE_URL}/en`, today, '0.9'),
    ...topics.map((topic) => urlEntry(`${EN_BASE_URL}/en/topics/${topic.slug}`, today, '0.8')),
    ...companies.map((slug) => {
      const latest = memos.find((m) => m.companySlug === slug)
      return urlEntry(`${EN_BASE_URL}/en/${slug}`, lastmod(latest?.eventDate ?? today), '0.7')
    }),
    ...memos.map((memo) =>
      urlEntry(`${EN_BASE_URL}/en/${memo.companySlug}/${memo.quarter}`, lastmod(memo.eventDate), '0.8')
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
