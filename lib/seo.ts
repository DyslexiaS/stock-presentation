import { Presentation } from '@/types'

export function generateSEOTitle(presentation: Presentation): string {
  const date = new Date(presentation.eventDate).toLocaleDateString('zh-TW')
  return `${presentation.companyName}(${presentation.companyCode}) 法說會簡報 - ${date} | 台股投資人說明會`
}

export function generateSEODescription(presentation: Presentation): string {
  const date = new Date(presentation.eventDate).toLocaleDateString('zh-TW')
  const typeLabel = {
    sii: '上市',
    otc: '上櫃', 
    rotc: '興櫃'
  }[presentation.typek]
  
  return `${presentation.companyName}(${presentation.companyCode})${date}法說會簡報PDF下載。${typeLabel}公司最新財報說明會、投資人簡報資料，包含中英文版本法人說明會內容。`
}

export function generateCompanyPageTitle(companyCode: string, companyName: string): string {
  return `${companyName}(${companyCode}) 法說會簡報 | ${companyCode}投資人說明會 | 台股法說會搜尋`
}

export function generateCompanyPageDescription(companyCode: string, companyName: string, totalPresentations: number): string {
  return `${companyName}(${companyCode})歷年法說會簡報總覽，共${totalPresentations}場投資人說明會。提供${companyCode}最新財報法說會PDF下載，包含中英文版法人說明會資料。`
}

// 生成超強力SEO關鍵字 - 涵蓋所有可能的搜尋模式
export function generateKeywords(presentation: Presentation): string[] {
  const { companyName, companyCode, typek } = presentation
  const date = new Date(presentation.eventDate)
  const year = date.getFullYear()
  const quarter = Math.ceil((date.getMonth() + 1) / 3)
  
  const typeLabels = {
    sii: ['上市', '台股上市', '證交所上市'],
    otc: ['上櫃', '台股上櫃', '櫃買中心'], 
    rotc: ['興櫃', '台股興櫃', '興櫃市場']
  }[typek] || []

  const baseKeywords = [
    // 核心關鍵字
    '台股法說會',
    '法人說明會',
    '財報說明會',
    '投資人說明會',
    '法說會簡報',
    '投資人簡報',
    
    // 公司相關
    companyName,
    companyCode,
    `${companyName}法說會`,
    `${companyCode}法說會`,
    `${companyName}法說會簡報`,
    `${companyCode}法說會簡報`,
    `${companyName}投資人說明會`,
    `${companyCode}投資人說明會`,
    `${companyName}財報說明會`,
    `${companyCode}財報說明會`,
    `${companyName}簡報`,
    `${companyCode}簡報`,
    
    // 時間相關
    `${year}年法說會`,
    `${year}法說會`,
    `Q${quarter}法說會`,
    `${companyName}${year}法說會`,
    `${companyCode}${year}法說會`,
    `${companyName}${year}年法說會`,
    `${companyCode}${year}年法說會`,
    `${companyName}法說會${year}`,
    `${companyCode}法說會${year}`,
    `${year}${companyName}法說會`,
    `${year}${companyCode}法說會`,
    
    // PDF相關
    `${companyName}法說會PDF`,
    `${companyCode}法說會PDF`,
    `${companyName}簡報PDF`,
    `${companyCode}簡報PDF`,
    `${companyName}投資人簡報PDF`,
    `${companyCode}投資人簡報PDF`,
    
    // 下載相關
    `${companyName}法說會下載`,
    `${companyCode}法說會下載`,
    `${companyName}簡報下載`,
    `${companyCode}簡報下載`,
    
    // 組合關鍵字
    `${companyName}股票代碼${companyCode}`,
    `股票代碼${companyCode}${companyName}`,
    `${companyCode}股價法說會`,
    `${companyName}股價法說會`,
    
    // 新增長尾關鍵字
    `${companyName}最新法說會`,
    `${companyCode}最新法說會`,
    `${companyName}近期法說會`,
    `${companyCode}近期法說會`,
    `${companyName}業績發表會`,
    `${companyCode}業績發表會`,
    `${companyName}營運報告`,
    `${companyCode}營運報告`,
    `${companyName}股東會`,
    `${companyCode}股東會`,
    `${companyName}財務報告`,
    `${companyCode}財務報告`,
    `${companyName}經營績效`,
    `${companyCode}經營績效`,
    `${companyName}投資策略`,
    `${companyCode}投資策略`,
    `${companyName}公司簡介`,
    `${companyCode}公司簡介`,
    `${companyName}股價分析`,
    `${companyCode}股價分析`,
    `${companyName}投資亮點`,
    `${companyCode}投資亮點`,
    `${companyCode}股票`,
    `${companyName}股票`,
    `${companyCode}投資`,
    `${companyName}投資`,
    
    // 產業通用詞
    '台灣股市法說會',
    '台股投資人說明會',
    '上市公司法說會',
    '股市法說會',
    '證券法說會'
  ]

  // 類型相關關鍵字
  const typeSpecificKeywords = typeLabels.flatMap(label => [
    `${label}公司法說會`,
    `${label}公司簡報`,
    `${companyName}${label}`,
    `${companyCode}${label}`,
    `${label}${companyName}法說會`,
    `${label}${companyCode}法說會`
  ])

  return [...baseKeywords, ...typeSpecificKeywords]
}

// 為公司頁面生成專用關鍵字
export function generateCompanyKeywords(companyCode: string, companyName: string, typek: string): string[] {
  const typeLabels = {
    sii: ['上市', '台股上市', '證交所上市'],
    otc: ['上櫃', '台股上櫃', '櫃買中心'], 
    rotc: ['興櫃', '台股興櫃', '興櫃市場']
  }[typek] || []

  const keywords = [
    // 公司核心關鍵字
    `${companyName}法說會`,
    `${companyCode}法說會`,
    `${companyName}法說會簡報`,
    `${companyCode}法說會簡報`,
    `${companyName}投資人說明會`,
    `${companyCode}投資人說明會`,
    `${companyName}財報說明會`,
    `${companyCode}財報說明會`,
    
    // 歷年相關
    `${companyName}歷年法說會`,
    `${companyCode}歷年法說會`,
    `${companyName}法說會記錄`,
    `${companyCode}法說會記錄`,
    `${companyName}法說會總覽`,
    `${companyCode}法說會總覽`,
    
    // 最新相關
    `${companyName}最新法說會`,
    `${companyCode}最新法說會`,
    `${companyName}近期法說會`,
    `${companyCode}近期法說會`,
    
    // PDF和下載
    `${companyName}法說會PDF`,
    `${companyCode}法說會PDF`,
    `${companyName}簡報下載`,
    `${companyCode}簡報下載`,
    
    // 股票相關
    `${companyName}股票法說會`,
    `${companyCode}股票法說會`,
    `股票代碼${companyCode}法說會`,
    `${companyCode}股價簡報`,
    
    // 通用詞
    companyName,
    companyCode,
    '台股法說會',
    '法人說明會',
    '投資人簡報'
  ]

  // 添加類型相關關鍵字
  const typeSpecificKeywords = typeLabels.flatMap(label => [
    `${label}${companyName}`,
    `${label}${companyCode}`,
    `${companyName}${label}法說會`,
    `${companyCode}${label}法說會`
  ])

  return [...keywords, ...typeSpecificKeywords]
}

export function generateStructuredData(presentation: Presentation) {
  const eventDate = new Date(presentation.eventDate)
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${presentation.companyName}(${presentation.companyCode}) 法說會簡報`,
    description: generateSEODescription(presentation),
    startDate: eventDate.toISOString(),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    organizer: {
      '@type': 'Organization',
      name: presentation.companyName,
      identifier: presentation.companyCode,
      url: `${process.env.NEXTAUTH_URL}/company/${presentation.companyCode}`
    },
    about: {
      '@type': 'Organization',
      name: presentation.companyName,
      identifier: presentation.companyCode,
      sameAs: [
        `https://www.twse.com.tw/zh/listed/company/${presentation.companyCode}`,
        `${process.env.NEXTAUTH_URL}/company/${presentation.companyCode}`
      ]
    },
    url: `${process.env.NEXTAUTH_URL}/presentation/${presentation._id}`,
    workFeatured: [
      {
        '@type': 'CreativeWork',
        name: `${presentation.companyName}法說會簡報 (中文版)`,
        url: presentation.presentationTWUrl,
        encodingFormat: 'application/pdf',
        description: `${presentation.companyName}(${presentation.companyCode})中文版法說會簡報PDF`
      },
      ...(presentation.presentationEnUrl ? [{
        '@type': 'CreativeWork',
        name: `${presentation.companyName}法說會簡報 (英文版)`,
        url: presentation.presentationEnUrl,
        encodingFormat: 'application/pdf',
        description: `${presentation.companyName}(${presentation.companyCode})英文版法說會簡報PDF`
      }] : [])
    ]
  }
}

// 為公司頁面生成結構化數據
export function generateCompanyStructuredData(companyCode: string, companyName: string, presentations: Presentation[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyName,
    identifier: companyCode,
    url: `${process.env.NEXTAUTH_URL}/company/${companyCode}`,
    sameAs: [
      `https://www.twse.com.tw/zh/listed/company/${companyCode}`
    ],
    event: presentations.map(p => ({
      '@type': 'Event',
      name: `${companyName} 法說會`,
      startDate: new Date(p.eventDate).toISOString(),
      url: `${process.env.NEXTAUTH_URL}/presentation/${p._id}`
    }))
  }
}

export function generateBreadcrumbData(presentation: Presentation) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '台股法說會搜尋',
        item: process.env.NEXTAUTH_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${presentation.companyName}(${presentation.companyCode})`,
        item: `${process.env.NEXTAUTH_URL}/company/${presentation.companyCode}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${new Date(presentation.eventDate).toLocaleDateString('zh-TW')} 法說會簡報`,
        item: `${process.env.NEXTAUTH_URL}/presentation/${presentation._id}`
      }
    ]
  }
}

// 為公司頁面生成麵包屑
export function generateCompanyBreadcrumbData(companyCode: string, companyName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '台股法說會搜尋',
        item: process.env.NEXTAUTH_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${companyName}(${companyCode}) 法說會簡報`,
        item: `${process.env.NEXTAUTH_URL}/company/${companyCode}`
      }
    ]
  }
}