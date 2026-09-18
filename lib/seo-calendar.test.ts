import { describe, expect, test } from 'bun:test'
import { generateCalendarJsonLd, generateCalendarMetadata } from './seo'

describe('calendar SEO keywords', () => {
  test('puts the requested phrases in title, description and keywords', () => {
    const meta = generateCalendarMetadata({
      rangeLabel: '9/7–9/13',
      mondayYmd: '2026-09-07',
      count: 70,
      isCurrentWeek: true,
      companyPreview: ['台積電(2330)'],
    })

    expect(String(meta.title)).toContain('法說會行事曆')
    expect(String(meta.title)).toContain('法說會時間表')
    expect(String(meta.title)).toContain('近期法說會一覽表')
    expect(String(meta.description)).toContain('台股行事曆 2026')
    expect(String(meta.description)).toContain('近期法說會一覽表')
    expect(String(meta.description)).toContain('公開資訊觀測站法說會一覽表')
    expect(String(meta.keywords)).toContain('法說會行事曆')
    expect(String(meta.keywords)).toContain('公開資訊觀測站法說會一覽表')
    expect(String(meta.keywords)).toContain('台股行事曆 2026')
  })

  test('JSON-LD collection name is 法說會行事曆', () => {
    const jsonLd = generateCalendarJsonLd({
      rangeLabel: '9/7–9/13',
      mondayYmd: '2026-09-07',
      count: 2,
      presentations: [],
    })
    const page = jsonLd['@graph'][0] as { name: string; description: string }
    expect(page.name).toContain('法說會行事曆')
    expect(page.description).toContain('台股行事曆 2026')
    expect(page.description).toContain('公開資訊觀測站法說會一覽表')
  })
})
