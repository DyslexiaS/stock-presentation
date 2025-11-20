import type { Metadata } from 'next'
import { Presentation } from '@/types'

// 搜尋意圖分類
enum SearchIntent {
  INFORMATIONAL = 'informational',
  NAVIGATIONAL = 'navigational',
  TRANSACTIONAL = 'transactional',
  COMMERCIAL = 'commercial'
}

// 關鍵字重要性權重
enum KeywordPriority {
  PRIMARY = 'primary',    // 最高優先級 - 核心關鍵字
  SECONDARY = 'secondary', // 次要優先級 - 支援關鍵字
  LONG_TAIL = 'long_tail'  // 長尾關鍵字 - 精準流量
}

interface SEOKeyword {
  keyword: string
  priority: KeywordPriority
  intent: SearchIntent
  volume?: 'high' | 'medium' | 'low' // 估計搜尋量
}

interface SEOConfig {
  baseUrl: string
  siteName: string
  defaultTitle: string
  defaultDescription: string
}

// SEO 配置 - 可從環境變數或配置文件讀取
const seoConfig: SEOConfig = {
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://finmoconf.diveinvest.net'),
  siteName: '台股法說會資料庫',
  defaultTitle: '台股法說會資料庫 | 台灣上市櫃公司法人說明會簡報下載',
  defaultDescription: '提供台股上市櫃公司最新法說會簡報PDF下載，包含財報分析、投資亮點、未來展望等完整法人說明會資料。'
}

// 增強版SEO標題生成 - 更符合搜尋習慣
export function generateSEOTitle(presentation: Presentation): string {
  const date = new Date(presentation.eventDate)
  const year = date.getFullYear()
  const quarter = Math.ceil((date.getMonth() + 1) / 3)
  const yearQuarter = `${year}Q${quarter}`
  const monthDay = date.toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit' })

  // 優化標題結構：主要關鍵字前置，重要信息突出
  return `${presentation.companyName}(${presentation.companyCode}) ${yearQuarter}法說會簡報PDF下載 | ${monthDay}法人說明會`
}

// 增強版描述 - 包含更多語義關鍵字和CTA
export function generateSEODescription(presentation: Presentation): string {
  const date = new Date(presentation.eventDate)
  const year = date.getFullYear()
  const quarter = Math.ceil((date.getMonth() + 1) / 3)
  const yearQuarter = `${year}Q${quarter}`
  const dateStr = date.toLocaleDateString('zh-TW')
  const typeLabel = {
    sii: '上市',
    otc: '上櫃',
    rotc: '興櫃'
  }[presentation.typek]

  // 結構化描述：公司信息 + 時間 + 內容描述 + CTA
  return `【${typeLabel}】${presentation.companyName}(${presentation.companyCode}) ${yearQuarter}財報法說會完整簡報。${dateStr}最新法人說明會PDF免費下載，包含營收獲利分析、未來展望、中英文版法人說明會資料。立即查看${presentation.companyName}股價投資亮點！`
}

// 智能關鍵字生成系統 - 基於搜尋意圖和優先級
export function generateSmartKeywords(presentation: Presentation): SEOKeyword[] {
  const { companyName, companyCode, typek } = presentation
  const date = new Date(presentation.eventDate)
  const year = date.getFullYear()
  const quarter = Math.ceil((date.getMonth() + 1) / 3)
  const yearQuarter = `${year}Q${quarter}`

  const typeLabel = {
    sii: '上市',
    otc: '上櫃',
    rotc: '興櫃'
  }[typek]

  const keywords: SEOKeyword[] = [
    // PRIMARY 關鍵字 - 最重要的核心詞
    { keyword: `${companyName}法說會`, priority: KeywordPriority.PRIMARY, intent: SearchIntent.NAVIGATIONAL, volume: 'high' },
    { keyword: `${companyCode}法說會`, priority: KeywordPriority.PRIMARY, intent: SearchIntent.NAVIGATIONAL, volume: 'high' },
    { keyword: `${companyName}${yearQuarter}法說會`, priority: KeywordPriority.PRIMARY, intent: SearchIntent.INFORMATIONAL, volume: 'medium' },
    { keyword: `${companyCode}${yearQuarter}法說會`, priority: KeywordPriority.PRIMARY, intent: SearchIntent.INFORMATIONAL, volume: 'medium' },

    // SECONDARY 關鍵字 - 支援性關鍵字
    { keyword: `${companyName}法人說明會`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.INFORMATIONAL, volume: 'medium' },
    { keyword: `${companyCode}法人說明會`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.INFORMATIONAL, volume: 'medium' },
    { keyword: `${companyName}財報說明會`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.INFORMATIONAL, volume: 'medium' },
    { keyword: `${companyCode}財報說明會`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.INFORMATIONAL, volume: 'medium' },
    { keyword: `${companyName}法說會簡報`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.TRANSACTIONAL, volume: 'medium' },
    { keyword: `${companyCode}法說會簡報`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.TRANSACTIONAL, volume: 'medium' },

    // 時間相關關鍵字
    { keyword: `${year}年法說會`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.INFORMATIONAL, volume: 'low' },
    { keyword: `Q${quarter}法說會`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.INFORMATIONAL, volume: 'low' },
    { keyword: `${yearQuarter}法說會簡報`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.TRANSACTIONAL, volume: 'medium' },

    // PDF和下載相關 - 高轉化意圖
    { keyword: `${companyName}法說會PDF`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.TRANSACTIONAL, volume: 'medium' },
    { keyword: `${companyCode}法說會PDF`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.TRANSACTIONAL, volume: 'medium' },
    { keyword: `${companyName}法說會下載`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.TRANSACTIONAL, volume: 'medium' },
    { keyword: `${companyCode}法說會下載`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.TRANSACTIONAL, volume: 'medium' },

    // LONG_TAIL 關鍵字 - 精準流量，高轉化
    { keyword: `${companyName} ${yearQuarter} 法說會 PDF 下載`, priority: KeywordPriority.LONG_TAIL, intent: SearchIntent.TRANSACTIONAL, volume: 'low' },
    { keyword: `${companyCode} ${yearQuarter} 法人說明會 簡報`, priority: KeywordPriority.LONG_TAIL, intent: SearchIntent.TRANSACTIONAL, volume: 'low' },
    { keyword: `${companyName} 最新 財報 法說會 ${year}`, priority: KeywordPriority.LONG_TAIL, intent: SearchIntent.INFORMATIONAL, volume: 'low' },
    { keyword: `${companyCode} ${typeLabel} 公司 法說會 資料`, priority: KeywordPriority.LONG_TAIL, intent: SearchIntent.INFORMATIONAL, volume: 'low' },
    { keyword: `${companyName} 股價 投資 亮點 法說會`, priority: KeywordPriority.LONG_TAIL, intent: SearchIntent.COMMERCIAL, volume: 'low' },
    { keyword: `${companyCode} 營收 獲利 分析 簡報`, priority: KeywordPriority.LONG_TAIL, intent: SearchIntent.COMMERCIAL, volume: 'low' },
    { keyword: `${companyName} 未來 展望 投資人 說明會`, priority: KeywordPriority.LONG_TAIL, intent: SearchIntent.INFORMATIONAL, volume: 'low' },

    // 競爭優勢關鍵字
    { keyword: `${companyName} vs 同業 法說會 比較`, priority: KeywordPriority.LONG_TAIL, intent: SearchIntent.COMMERCIAL, volume: 'low' },
    { keyword: `${companyCode} 投資 價值 分析 報告`, priority: KeywordPriority.LONG_TAIL, intent: SearchIntent.COMMERCIAL, volume: 'low' },

    // 即時性關鍵字
    { keyword: `${companyName} 最新 法說會 ${year}`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.INFORMATIONAL, volume: 'medium' },
    { keyword: `${companyCode} 近期 法說會 簡報`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.INFORMATIONAL, volume: 'medium' },

    // 問題導向關鍵字 - 符合語音搜尋趨勢
    { keyword: `${companyName} 法說會 什麼時候`, priority: KeywordPriority.LONG_TAIL, intent: SearchIntent.INFORMATIONAL, volume: 'low' },
    { keyword: `${companyCode} 法說會 在哪裡看`, priority: KeywordPriority.LONG_TAIL, intent: SearchIntent.NAVIGATIONAL, volume: 'low' },
    { keyword: `${companyName} 法說會 重點 摘要`, priority: KeywordPriority.LONG_TAIL, intent: SearchIntent.INFORMATIONAL, volume: 'low' },
  ]

  // 根據公司類型添加特定關鍵字
  if (typeLabel) {
    keywords.push(
      { keyword: `${typeLabel} ${companyName} 法說會`, priority: KeywordPriority.SECONDARY, intent: SearchIntent.INFORMATIONAL, volume: 'medium' },
      { keyword: `${typeLabel} 公司 ${companyCode} 投資 簡報`, priority: KeywordPriority.LONG_TAIL, intent: SearchIntent.COMMERCIAL, volume: 'low' }
    )
  }

  return keywords
}

// 根據優先級生成關鍵字字串 - 用於meta keywords
export function generatePrioritizedKeywords(keywords: SEOKeyword[], maxCount: number = 50): string {
  // 按優先級排序，然後按搜尋量排序
  const priorityOrder = [KeywordPriority.PRIMARY, KeywordPriority.SECONDARY, KeywordPriority.LONG_TAIL]
  const volumeOrder = ['high', 'medium', 'low']

  const sortedKeywords = keywords.sort((a, b) => {
    const priorityDiff = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
    if (priorityDiff !== 0) return priorityDiff

    const volumeA = volumeOrder.indexOf(a.volume || 'low')
    const volumeB = volumeOrder.indexOf(b.volume || 'low')
    return volumeA - volumeB
  })

  return sortedKeywords
    .slice(0, maxCount)
    .map(k => k.keyword)
    .join(', ')
}

// Next.js 13+ App Router Metadata 生成
export function generatePresentationMetadata(presentation: Presentation): Metadata {
  const title = generateSEOTitle(presentation)
  const description = generateSEODescription(presentation)
  const keywords = generateSmartKeywords(presentation)
  const keywordString = generatePrioritizedKeywords(keywords, 30)
  const url = `${seoConfig.baseUrl}/presentation/${presentation._id}`
  // Removed OG image API - using default social preview

  return {
    title,
    description,
    keywords: keywordString,
    authors: [{ name: presentation.companyName }],
    publisher: seoConfig.siteName,
    alternates: {
      canonical: url,
      languages: {
        'zh-TW': url,
        'x-default': url,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: seoConfig.siteName,
      type: 'article',
      locale: 'zh_TW',
      publishedTime: new Date(presentation.eventDate).toISOString(),
      modifiedTime: new Date(presentation.updatedAt || presentation.eventDate).toISOString(),
      // Removed custom OG images - using default social preview
    },
    other: {
      'article:published_time': new Date(presentation.eventDate).toISOString(),
      'article:modified_time': new Date(presentation.updatedAt || presentation.eventDate).toISOString(),
      'article:author': presentation.companyName,
    },
  }
}

// 公司頁面 Metadata 生成
export function generateCompanyMetadata(
  companyCode: string,
  companyName: string,
  totalPresentations: number,
  typek: string
): Metadata {
  const title = `${companyName}(${companyCode}) 法說會簡報 | ${companyCode}法人說明會 | ${seoConfig.siteName}`
  const description = `${companyName}(${companyCode})歷年法說會簡報總覽，共${totalPresentations}場法人說明會。提供${companyCode}最新財報法說會PDF下載，包含中英文版法人說明會資料。`
  const url = `${seoConfig.baseUrl}/company/${companyCode}`
  // Removed OG image API - using default social preview

  const typeLabel = {
    sii: '上市',
    otc: '上櫃',
    rotc: '興櫃'
  }[typek] || ''

  const keywords = [
    `${companyName}法說會`,
    `${companyCode}法說會`,
    `${companyName}法人說明會`,
    `${companyCode}法人說明會`,
    `${companyName}歷年法說會`,
    `${companyCode}歷年法說會`,
    `${typeLabel}${companyName}`,
    `${typeLabel}${companyCode}`,
    '台股法說會',
    '投資人簡報'
  ].join(', ')

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        'zh-TW': url,
        'x-default': url,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: seoConfig.siteName,
      type: 'website',
      locale: 'zh_TW',
      // Removed custom OG images - using default social preview
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // Removed custom OG images - using default social preview
    },
  }
}

// 首頁 Metadata 生成
export function generateHomeMetadata(): Metadata {
  const title = seoConfig.defaultTitle
  const description = seoConfig.defaultDescription
  const url = seoConfig.baseUrl
  // Removed OG image API - using default social preview

  // 2025年熱門搜尋關鍵字
  const trendingKeywords = [
    '台股法說會', '法人說明會', '財報簡報', '法說會搜尋', '台灣股市', '上市公司簡報', '法人說明會',
    '2025法說會', 'Q1法說會', '台積電2330法說會', '鴻海2317法說會', '聯發科2454法說會',
    '台塑1301法說會', '中華電2412法說會', '富邦金2881法說會', '國泰金2882法說會',
    'AI概念股法說會', '半導體法說會', '電動車法說會', '5G法說會', 'ESG法說會',
    '法說會PDF下載', '免費法說會簡報', '股票投資分析', '財報解讀', '投資研究報告'
  ].join(', ')

  return {
    title,
    description,
    keywords: trendingKeywords,
    alternates: {
      canonical: url,
      languages: {
        'zh-TW': url,
        'x-default': url,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: seoConfig.siteName,
      type: 'website',
      locale: 'zh_TW',
      // Removed custom OG images - using default social preview
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // Removed custom OG images - using default social preview
    },
  }
}

// 生成結構化數據 JSON-LD
export function generatePresentationJsonLd(presentation: Presentation) {
  const eventDate = new Date(presentation.eventDate)
  const year = eventDate.getFullYear()
  const quarter = Math.ceil((eventDate.getMonth() + 1) / 3)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Event',
        '@id': `${seoConfig.baseUrl}/presentation/${presentation._id}#event`,
        name: `${presentation.companyName}(${presentation.companyCode}) ${year}Q${quarter}法說會`,
        description: generateSEODescription(presentation),
        startDate: eventDate.toISOString(),
        endDate: new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString(),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        isAccessibleForFree: true,
        inLanguage: ['zh-TW', 'en-US'],
        // Location - prefer VirtualLocation for online events per Google guidance
        location: {
          '@type': 'VirtualLocation',
          url: `${seoConfig.baseUrl}/presentation/${presentation._id}`
        },
        // Image - simplified to URL array to satisfy validators
        image: [`${seoConfig.baseUrl}/FinmoAI-brand.png`],
        // Enhanced organizer with complete object instead of just reference
        organizer: {
          '@type': 'Organization',
          '@id': `${seoConfig.baseUrl}/company/${presentation.companyCode}`,
          name: presentation.companyName,
          identifier: presentation.companyCode,
          url: `${seoConfig.baseUrl}/company/${presentation.companyCode}`,
          sameAs: [
            `https://www.twse.com.tw/zh/index.html`
          ]
        },
        // Performer - using organization as performer for corporate events
        performer: {
          '@type': 'Organization',
          name: presentation.companyName,
          identifier: presentation.companyCode,
          url: `${seoConfig.baseUrl}/company/${presentation.companyCode}`
        },
        // Offers - For free access events
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'TWD',
          availability: 'https://schema.org/InStock',
          validFrom: eventDate.toISOString(),
          description: '免費查閱法說會簡報資料',
          url: `${seoConfig.baseUrl}/presentation/${presentation._id}`
        },
        about: {
          '@id': `${seoConfig.baseUrl}/company/${presentation.companyCode}#organization`
        },
        url: `${seoConfig.baseUrl}/presentation/${presentation._id}`,
        workFeatured: [
          {
            '@type': 'DigitalDocument',
            '@id': `${seoConfig.baseUrl}/presentation/${presentation._id}#document-tw`,
            name: `${presentation.companyName} ${year}Q${quarter}法說會簡報 (中文版)`,
            url: presentation.presentationTWUrl,
            encodingFormat: 'application/pdf',
            inLanguage: 'zh-TW',
            datePublished: eventDate.toISOString(),
            publisher: {
              '@id': `${seoConfig.baseUrl}/company/${presentation.companyCode}#organization`
            }
          },
          ...(presentation.presentationEnUrl ? [{
            '@type': 'DigitalDocument',
            '@id': `${seoConfig.baseUrl}/presentation/${presentation._id}#document-en`,
            name: `${presentation.companyName} ${year}Q${quarter} Investor Presentation (English)`,
            url: presentation.presentationEnUrl,
            encodingFormat: 'application/pdf',
            inLanguage: 'en-US',
            datePublished: eventDate.toISOString(),
            publisher: {
              '@id': `${seoConfig.baseUrl}/company/${presentation.companyCode}#organization`
            }
          }] : [])
        ]
      },
      {
        '@type': 'Organization',
        '@id': `${seoConfig.baseUrl}/company/${presentation.companyCode}#organization`,
        name: presentation.companyName,
        identifier: presentation.companyCode,
        url: `${seoConfig.baseUrl}/company/${presentation.companyCode}`,
        sameAs: [
          `https://www.twse.com.tw/zh/listed/company/${presentation.companyCode}`,
          `https://mops.twse.com.tw/mops/web/t57sb01_q1?TYPEK=${presentation.typek}&step=show&co_id=${presentation.companyCode}`
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${seoConfig.baseUrl}/presentation/${presentation._id}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: seoConfig.siteName,
            item: seoConfig.baseUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: `${presentation.companyName}(${presentation.companyCode})`,
            item: `${seoConfig.baseUrl}/company/${presentation.companyCode}`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${year}Q${quarter} 法說會簡報`,
            item: `${seoConfig.baseUrl}/presentation/${presentation._id}`
          }
        ]
      }
    ]
  }
}

// 生成公司頁面結構化數據
export function generateCompanyJsonLd(
  companyCode: string,
  companyName: string,
  presentations: Presentation[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyName,
    identifier: companyCode,
    url: `${seoConfig.baseUrl}/company/${companyCode}`,
    sameAs: [
      `https://www.twse.com.tw/zh/listed/company/${companyCode}`,
      `https://mops.twse.com.tw/mops/web/t57sb01_q1?TYPEK=sii&step=show&co_id=${companyCode}`
    ],
    event: presentations.slice(0, 5).map(p => {
      const eventDate = new Date(p.eventDate)
      const year = eventDate.getFullYear()
      const quarter = Math.ceil((eventDate.getMonth() + 1) / 3)

      return {
        '@type': 'Event',
        '@id': `${seoConfig.baseUrl}/presentation/${p._id}#event`,
        name: `${companyName}(${companyCode}) ${year}Q${quarter}法說會`,
        description: `${companyName}於${eventDate.toLocaleDateString('zh-TW')}舉辦的${year}年第${quarter}季度法人說明會，提供投資人財報與營運概況說明。`,
        startDate: eventDate.toISOString(),
        endDate: new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString(),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        isAccessibleForFree: true,
        inLanguage: ['zh-TW', 'en-US'],
        location: {
          '@type': 'VirtualLocation',
          url: `${seoConfig.baseUrl}/presentation/${p._id}`
        },
        image: [`${seoConfig.baseUrl}/FinmoAI-brand.png`],
        organizer: {
          '@type': 'Organization',
          name: companyName,
          identifier: companyCode,
          url: `${seoConfig.baseUrl}/company/${companyCode}`
        },
        performer: {
          '@type': 'Organization',
          name: companyName,
          identifier: companyCode,
          url: `${seoConfig.baseUrl}/company/${companyCode}`
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'TWD',
          availability: 'https://schema.org/InStock',
          validFrom: eventDate.toISOString(),
          description: '免費查閱法說會簡報資料',
          url: `${seoConfig.baseUrl}/presentation/${p._id}`
        },
        url: `${seoConfig.baseUrl}/presentation/${p._id}`
      }
    })
  }
}

// 向後相容性函數
export function generateKeywords(presentation: Presentation): string[] {
  const smartKeywords = generateSmartKeywords(presentation)
  return smartKeywords.map(k => k.keyword)
}

// 舊函數保持向後相容
export function generateCompanyPageTitle(companyCode: string, companyName: string): string {
  return `${companyName}(${companyCode}) 法說會簡報 | ${companyCode}法人說明會 | ${seoConfig.siteName}`
}

export function generateCompanyPageDescription(companyCode: string, companyName: string, totalPresentations: number): string {
  return `${companyName}(${companyCode})歷年法說會簡報總覽，共${totalPresentations}場法人說明會。提供${companyCode}最新財報法說會 PDF 下載，包含中英文版法人說明會資料。`
}

export function generateCompanyKeywords(companyCode: string, companyName: string, typek: string): string[] {
  const typeLabel = {
    sii: '上市',
    otc: '上櫃',
    rotc: '興櫃'
  }[typek] || ''

  return [
    `${companyName}法說會`,
    `${companyCode}法說會`,
    `${companyName}法人說明會`,
    `${companyCode}法人說明會`,
    `${companyName}歷年法說會`,
    `${companyCode}歷年法說會`,
    `${typeLabel}${companyName}`,
    `${typeLabel}${companyCode}`,
    '台股法說會',
    '投資人簡報'
  ]
}

// 別名導出以保持向後相容
export const generateStructuredData = generatePresentationJsonLd
export const generateCompanyStructuredData = generateCompanyJsonLd

// 麵包屑數據
export function generateBreadcrumbData(presentation: Presentation) {
  const year = new Date(presentation.eventDate).getFullYear()
  const quarter = Math.ceil((new Date(presentation.eventDate).getMonth() + 1) / 3)

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: seoConfig.siteName,
        item: seoConfig.baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${presentation.companyName}(${presentation.companyCode})`,
        item: `${seoConfig.baseUrl}/company/${presentation.companyCode}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${year}Q${quarter} 法說會簡報`,
        item: `${seoConfig.baseUrl}/presentation/${presentation._id}`
      }
    ]
  }
}

export function generateCompanyBreadcrumbData(companyCode: string, companyName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: seoConfig.siteName,
        item: seoConfig.baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${companyName}(${companyCode}) 法說會簡報`,
        item: `${seoConfig.baseUrl}/company/${companyCode}`
      }
    ]
  }
}