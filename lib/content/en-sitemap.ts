import { EN_BASE_URL, getAllMemos, getAllTags, getCompanySlugs } from '@/lib/content/en-memos'

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Sitemap lastmod must be W3C datetime. Date-only is valid; do not emit a fresh "today" on every request. */
export function toSitemapDate(value: string): string {
  const parsed = new Date(value)
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10)
  const match = value.match(/^(\d{4}-\d{2}-\d{2})/)
  return match ? match[1] : value.slice(0, 10)
}

function urlEntry(loc: string, lastmod: string, changefreq: string, priority: string) {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${toSitemapDate(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export function collectEnSitemapUrls() {
  const memos = getAllMemos()
  const tags = getAllTags()
  const slugs = [...getCompanySlugs()].sort()
  const latest = memos[0]?.eventDate ?? '2026-01-01'

  const latestByCompany = new Map<string, string>()
  for (const memo of memos) {
    if (!latestByCompany.has(memo.companySlug)) {
      latestByCompany.set(memo.companySlug, memo.eventDate)
    }
  }

  return {
    latest,
    urls: [
      urlEntry(`${EN_BASE_URL}/en`, latest, 'weekly', '0.9'),
      urlEntry(`${EN_BASE_URL}/en/companies`, latest, 'weekly', '0.8'),
      urlEntry(`${EN_BASE_URL}/en/calls`, latest, 'weekly', '0.8'),
      ...tags.map((tag) => urlEntry(`${EN_BASE_URL}/en/topics/${tag}`, latest, 'weekly', '0.8')),
      ...slugs.map((slug) =>
        urlEntry(`${EN_BASE_URL}/en/${slug}`, latestByCompany.get(slug) ?? latest, 'monthly', '0.7')
      ),
      ...memos.map((memo) =>
        urlEntry(
          `${EN_BASE_URL}/en/${memo.companySlug}/${memo.quarter}`,
          memo.eventDate,
          'yearly',
          '0.8'
        )
      ),
    ],
  }
}

export function buildEnSitemapXml(): string {
  const { urls } = collectEnSitemapUrls()
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`
}
