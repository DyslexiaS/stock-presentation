import { expect, test } from 'bun:test'
import { EN_BASE_URL, getTopic } from './en-memos'
import { buildEnSitemapXml } from './en-sitemap'

test('the English sitemap uses the content update date and leaves undated URLs listed', () => {
  const updatedAt = getTopic('nvidia-800v')?.updatedAt
  expect(updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)

  const xml = buildEnSitemapXml()
  expect(xml).toContain(
    `<loc>${EN_BASE_URL}/en/topics/nvidia-800v</loc>\n    <lastmod>${updatedAt}</lastmod>`
  )
  expect(xml).toContain(
    `<loc>${EN_BASE_URL}/en/calls</loc>\n    <changefreq>weekly</changefreq>`
  )
})
