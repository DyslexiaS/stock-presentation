import { describe, expect, test } from 'bun:test'
import { buildSitemapIndexXml } from './sitemap-index'

describe('sitemap index', () => {
  test('always lists pages-sitemap for /calendar even without presentations', () => {
    const xml = buildSitemapIndexXml('https://finmoconf.diveinvest.net', null)
    expect(xml).toContain('https://finmoconf.diveinvest.net/pages-sitemap.xml')
    expect(xml).toContain('https://finmoconf.diveinvest.net/en-sitemap.xml')
    expect(xml).toContain('https://finmoconf.diveinvest.net/industry-sitemap.xml')
    expect(xml).not.toContain('/presentations-sitemap/')
  })

  test('adds presentation chunks when counts are known', () => {
    const xml = buildSitemapIndexXml('https://finmoconf.diveinvest.net', 10001)
    expect(xml).toContain('/presentations-sitemap/0')
    expect(xml).toContain('/presentations-sitemap/1')
    expect(xml).not.toContain('/presentations-sitemap/2')
  })
})
