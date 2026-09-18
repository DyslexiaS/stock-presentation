import { describe, expect, test } from 'bun:test'
import { generateEnHomeMetadata } from './seo-en'
import { generateHomeMetadata } from './seo'

const BASE_URL = 'https://finmoconf.diveinvest.net'

describe('homepage hreflang', () => {
  test('Chinese homepage points to the English homepage', () => {
    const languages = generateHomeMetadata().alternates?.languages
    expect(languages?.['zh-TW']).toBe(BASE_URL)
    expect(languages?.en).toBe(`${BASE_URL}/en`)
    expect(languages?.['x-default']).toBe(BASE_URL)
  })

  test('English homepage points back to the Chinese homepage', () => {
    const languages = generateEnHomeMetadata().alternates?.languages
    expect(languages?.en).toBe(`${BASE_URL}/en`)
    expect(languages?.['zh-TW']).toBe(BASE_URL)
    expect(languages?.['x-default']).toBe(BASE_URL)
  })
})
