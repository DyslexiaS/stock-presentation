import { AdBanner } from '@/components/ads/ad-banner'
import PresentationModel from '@/lib/models/Presentation'
import dbConnect from '@/lib/mongodb'
import { generateHomeMetadata } from '@/lib/seo'
import { Presentation as PresentationType } from '@/types'
import { Suspense } from 'react'
import HomePageClient from './homepage-client'

// Generate metadata for homepage
export const metadata = generateHomeMetadata()

// Fetch initial presentations data on server
async function getInitialPresentations(): Promise<{
  presentations: PresentationType[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
    hasNext: boolean
    hasPrev: boolean
  }
}> {
  try {
    await dbConnect()
    
    const limit = 20
    const page = 1
    const skip = (page - 1) * limit
    
    // Get latest presentations
    const presentations = await PresentationModel.find({})
      .sort({ eventDate: -1, createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean()
      .exec()
    
    const total = await PresentationModel.countDocuments({})
    const pages = Math.ceil(total / limit)
    
    return {
      presentations: presentations.map((p: any) => ({
        ...p,
        _id: p._id.toString(),
        eventDate: p.eventDate.toISOString(),
        createdAt: p.createdAt?.toISOString() || p.eventDate.toISOString(),
        updatedAt: p.updatedAt?.toISOString()
      })),
      pagination: {
        page,
        limit,
        total,
        pages,
        hasNext: page < pages,
        hasPrev: page > 1
      }
    }
  } catch (error) {
    console.error('Error fetching presentations:', error)
    // Return mock data as fallback
    return {
      presentations: [{
    _id: '687b18f1a2ef6df0427f27e4',
    companyCode: '1101',
    companyName: '台泥',
    eventDate: '2025-05-19T00:00:00.000Z',
    presentationTWUrl: 'https://mopsov.twse.com.tw/nas/STR/110120250519M001.pdf',
    presentationEnUrl: 'https://mopsov.twse.com.tw/nas/STR/110120250519E001.pdf',
    typek: 'sii',
    createdAt: '2025-07-19T12:02:57.055Z'
      }],
      pagination: {
        page: 1,
        limit: 20,
        total: 1,
        pages: 1,
        hasNext: false,
        hasPrev: false
      }
    }
  }
}

// Server-side rendered homepage
export default async function HomePage() {
  // Fetch initial data on the server
  const { presentations, pagination } = await getInitialPresentations()

  return (
    <div className="min-h-screen bg-slate-50">{/* Changed to match homepage-client.tsx background */}

      {/* Client-side interactive components */}
      <Suspense fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">載入中...</div>
        </div>
      }>
        <HomePageClient 
          initialPresentations={presentations}
          initialPagination={pagination}
        />
      </Suspense>

      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://finmoconf.diveinvest.net/#website",
                "url": "https://finmoconf.diveinvest.net/",
                "name": "FinmoConf - 台股法說會資料庫",
                "description": "FinmoConf 提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。FinmoAI 家族產品，支援公司代碼搜尋、PDF 快速下載，最新財報說明會、投資人簡報一應俱全。",
                "publisher": {
                  "@id": "https://finmoconf.diveinvest.net/#organization"
                },
                "inLanguage": "zh-TW",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://finmoconf.diveinvest.net/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "Organization",
                "@id": "https://finmoconf.diveinvest.net/#organization",
                "name": "FinmoAI",
                "url": "https://finmoconf.diveinvest.net/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://finmoconf.diveinvest.net/FinmoAI-brand.png"
                }
              },
              {
                "@type": "Dataset",
                "@id": "https://finmoconf.diveinvest.net/#dataset",
                "name": "FinmoConf 台股法說會簡報資料集",
                "description": "FinmoConf 提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。FinmoAI 相關產品，涵蓋超過 2000 家公司的歷年法說會資料，為投資人、分析師提供完整的台股投資參考資訊。",
                "keywords": "FinmoConf,台股,法說會,法人說明會,財報,簡報,PDF,台積電,鴻海,台塑,2330,2317,1301",
                "creator": {
                  "@id": "https://finmoconf.diveinvest.net/#organization"
                },
                "publisher": {
                  "@id": "https://finmoconf.diveinvest.net/#organization"
                },
                "license": "https://creativecommons.org/licenses/by-nc/4.0/",
                "distribution": {
                  "@type": "DataDownload",
                  "encodingFormat": "application/pdf",
                  "contentUrl": "https://finmoconf.diveinvest.net/"
                }
              }
            ]
          })
        }}
      />

      {/* FAQPage Structured Data for keyword intents like 法說會查詢/簡報/行事曆/是什麼 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "法說會是什麼？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "法說會（法人說明會）是公司向投資人與分析師說明財務與營運的重要公開會議。FinmoConf 匯整各公司歷年法說會簡報與音訊，方便投資人快速查詢。"
                }
              },
              {
                "@type": "Question",
                "name": "法說會查詢要去哪裡？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "您可在 FinmoConf 以公司代碼、公司名稱或日期直接進行法說會查詢，並快速存取 PDF 簡報與音訊連結。"
                }
              },
              {
                "@type": "Question",
                "name": "法說會簡報在哪裡下載？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "在 FinmoConf 的法說會詳細頁可直接下載中文版與英文版法說會簡報（若有提供），並支援外部開啟原始 PDF。"
                }
              },
              {
                "@type": "Question",
                "name": "哪裡可以看法說會行事曆？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "FinmoConf 會即時收錄最新活動日期，您可透過搜尋條件（日期與公司）查看近期法說會時間表與歷史紀錄。"
                }
              },
              {
                "@type": "Question",
                "name": "公開資訊觀測站法說會一覽表與 FinmoConf 有何不同？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "公開資訊觀測站提供官方公告，FinmoConf 在此基礎上進一步整合 PDF 下載、雙語檔案、音訊連結與快搜功能，以更友善的方式協助投資研究。"
                }
              },
              {
                "@type": "Question",
                "name": "線上法說會哪裡看？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "若公司提供線上直播或錄音，我們會在 FinmoConf 詳細頁附上連結，您可直接前往收看或收聽。"
                }
              }
            ]
          })
        }}
      />

      {/* Enhanced Footer - Server-side rendered */}
      <footer className="relative bg-gradient-to-t from-slate-50 to-white border-t border-slate-200/50 mt-20 overflow-hidden">
        {/* Subtle footer decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-50 rounded-full blur-2xl"></div>
          <div className="absolute top-0 right-1/3 w-20 h-20 bg-gradient-to-br from-slate-50 to-white rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-16">
          {/* Footer Ad */}
          <div className="mb-12">
            <AdBanner
              slot={process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT || "1234567896"}
              format="horizontal"
              className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden"
              style={{ minHeight: '90px' }}
            />
          </div>

          <div className="text-center">
            <p className="text-slate-600 text-base font-medium">
              © 2025 FinmoConf - 台股法說會搜尋平台 - 提供最完整的法人說明會資料
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}