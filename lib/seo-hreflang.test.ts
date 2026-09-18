import { describe, expect, test } from 'bun:test'
import { getEnglishCompanyByTicker, getMemo } from './content/en-memos'
import {
  chinesePageAlternates,
  companyPageAlternates,
  generateCalendarMetadata,
  generateHomeMetadata,
  homeAlternates,
} from './seo'
import { generateEnCompanyMetadata, generateEnHomeMetadata, generateEnMemoMetadata } from './seo-en'

describe('hreflang clusters', () => {
  test('homepage pairs Chinese home with /en and sets site-wide x-default', () => {
    const languages = generateHomeMetadata().alternates?.languages as Record<string, string> | undefined
    expect(homeAlternates().canonical).toBe('https://finmoconf.diveinvest.net')
    expect(languages?.['zh-TW']).toBe('https://finmoconf.diveinvest.net')
    expect(languages?.en).toBe('https://finmoconf.diveinvest.net/en')
    expect(languages?.['x-default']).toBe('https://finmoconf.diveinvest.net')
  })

  test('calendar is Chinese-only and does not claim to be x-default', () => {
    const meta = generateCalendarMetadata({
      rangeLabel: '9/14–9/20',
      mondayYmd: '2026-09-14',
      count: 146,
      isCurrentWeek: true,
      companyPreview: ['台積電(2330)'],
    })
    const languages = (meta.alternates?.languages ?? {}) as Record<string, string>
    expect(meta.alternates?.canonical).toBe('https://finmoconf.diveinvest.net/calendar')
    expect(languages).toEqual({
      'zh-TW': 'https://finmoconf.diveinvest.net/calendar',
    })
    expect(languages).not.toHaveProperty('x-default')
    expect(chinesePageAlternates('https://example.test/calendar').languages ?? {}).not.toHaveProperty(
      'x-default'
    )
  })

  test('English home points back to the Chinese homepage', () => {
    const languages = (generateEnHomeMetadata().alternates?.languages ?? {}) as Record<string, string>
    expect(languages.en).toBe('https://finmoconf.diveinvest.net/en')
    expect(languages['zh-TW']).toBe('https://finmoconf.diveinvest.net')
    expect(languages['x-default']).toBe('https://finmoconf.diveinvest.net')
  })

  test('company hubs are paired when an English slug exists', () => {
    const liteon = getEnglishCompanyByTicker('2301')
    expect(liteon?.slug).toBe('liteon')
    const languages = (companyPageAlternates('2301', liteon?.slug)?.languages ?? {}) as Record<string, string>
    expect(languages.en).toBe('https://finmoconf.diveinvest.net/en/liteon')
    expect(languages['zh-TW']).toBe('https://finmoconf.diveinvest.net/company/2301')

    const enMeta = generateEnCompanyMetadata('liteon', 'Lite-On', '2301', 4)
    const enLanguages = (enMeta.alternates?.languages ?? {}) as Record<string, string>
    expect(enLanguages['zh-TW']).toBe('https://finmoconf.diveinvest.net/company/2301')
  })

  test('English memos are not paired with Chinese PDF pages', () => {
    const memo = getMemo('liteon', '2026-q2')
    expect(memo).toBeTruthy()
    const languages = (generateEnMemoMetadata(memo!).alternates?.languages ?? {}) as Record<string, string>
    expect(languages.en).toContain('/en/liteon/2026-q2')
    expect(languages).not.toHaveProperty('zh-TW')
    expect(languages['x-default']).toBe('https://finmoconf.diveinvest.net')
  })
})
