import { EN_BASE_URL, getAllMemos, getAllTopics, getCompanyProfile, getCompanySlugs } from '@/lib/content/en-memos'

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function urlEntry(loc: string, changefreq: string, priority: string, updatedAt?: string) {
  const lastmod = updatedAt ? `\n    <lastmod>${updatedAt}</lastmod>` : ''
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>${lastmod}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export function buildEnSitemapXml(): string {
  const slugs = [...getCompanySlugs()].sort()
  const urls = [
    urlEntry(`${EN_BASE_URL}/en`, 'weekly', '0.9'),
    urlEntry(`${EN_BASE_URL}/en/companies`, 'weekly', '0.8'),
    urlEntry(`${EN_BASE_URL}/en/calls`, 'weekly', '0.8'),
    ...getAllTopics().map((topic) =>
      urlEntry(`${EN_BASE_URL}/en/topics/${topic.slug}`, 'weekly', '0.8', topic.updatedAt)
    ),
    ...slugs.map((slug) =>
      urlEntry(`${EN_BASE_URL}/en/${slug}`, 'monthly', '0.7', getCompanyProfile(slug)?.updatedAt)
    ),
    ...getAllMemos().map((memo) =>
      urlEntry(`${EN_BASE_URL}/en/${memo.companySlug}/${memo.quarter}`, 'yearly', '0.8', memo.updatedAt)
    ),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`
}
