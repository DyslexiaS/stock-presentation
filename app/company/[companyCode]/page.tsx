import { AdBanner } from '@/components/ads/ad-banner'
import { PromotionCards } from '@/components/ui/promotion-cards'
import PresentationModel from '@/lib/models/Presentation'
import dbConnect from '@/lib/mongodb'
import {
  generateCompanyBreadcrumbData,
  generateCompanyStructuredData,
  generateCompanyMetadata
} from '@/lib/seo'
import { Presentation as PresentationType } from '@/types'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import CompanyPresentations from './company-presentations'
import YearlyCallsChart from './yearly-chart'
import { ArrowUp } from 'lucide-react'

interface Props {
  params: Promise<{ companyCode: string }>
}

interface CompanyData {
  companyCode: string
  companyName: string
  typek: 'sii' | 'otc' | 'rotc'
  presentations: PresentationType[]
  totalPresentations: number
  latestPresentationDate: string
  earliestPresentationDate: string
}

async function getCompanyData(companyCode: string): Promise<CompanyData | null> {
  try {
    await dbConnect()
    
    const presentations = await PresentationModel.find({ companyCode })
      .sort({ eventDate: -1 })
      .lean()
      .exec()

    if (presentations.length === 0) {
      return null
    }

    const firstPresentation = presentations[0]
    const latestDate = new Date(presentations[0].eventDate)
    const earliestDate = new Date(presentations[presentations.length - 1].eventDate)

    // 將 MongoDB 數據序列化為純對象
    const serializedPresentations: PresentationType[] = presentations.map((p: any) => ({
      _id: p._id.toString(),
      companyCode: p.companyCode,
      companyName: p.companyName,
      eventDate: p.eventDate.toISOString(),
      presentationTWUrl: p.presentationTWUrl,
      presentationEnUrl: p.presentationEnUrl,
      audioLinkUrl: p.audioLinkUrl,
      typek: p.typek,
      createdAt: p.createdAt?.toISOString() || p.eventDate.toISOString(),
      updatedAt: p.updatedAt?.toISOString(),
      slug: p.slug,
      keywords: p.keywords,
      description: p.description
    }))

    return {
      companyCode,
      companyName: firstPresentation.companyName,
      typek: firstPresentation.typek,
      presentations: serializedPresentations,
      totalPresentations: presentations.length,
      latestPresentationDate: latestDate.toISOString(),
      earliestPresentationDate: earliestDate.toISOString()
    }
  } catch (error) {
    console.error('Error fetching company data:', error)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { companyCode } = await params
  const companyData = await getCompanyData(companyCode)
  
  if (!companyData) {
    return {
      title: `${companyCode} 公司不存在 | FinmoConf - 台股法說會搜尋`,
      description: '找不到指定公司的法說會資料',
      robots: { index: false, follow: false },
    }
  }

  const { companyName, typek, totalPresentations } = companyData
  return generateCompanyMetadata(companyCode, companyName, totalPresentations, typek)
}

export default async function CompanyPage({ params }: Props) {
  const { companyCode } = await params
  const companyData = await getCompanyData(companyCode)
  
  if (!companyData) {
    notFound()
  }

  const { 
    companyName, 
    typek, 
    presentations, 
    totalPresentations,
    latestPresentationDate,
    earliestPresentationDate
  } = companyData

  const typeLabel = {
    sii: '上市',
    otc: '上櫃',
    rotc: '興櫃'
  }[typek]

  const structuredData = generateCompanyStructuredData(companyCode, companyName, presentations)
  const breadcrumbData = generateCompanyBreadcrumbData(companyCode, companyName)

  // 按年份分組
  const presentationsByYear = presentations.reduce((acc, presentation) => {
    const year = new Date(presentation.eventDate).getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(presentation)
    return acc
  }, {} as Record<number, PresentationType[]>)

  const years = Object.keys(presentationsByYear).map(Number).sort((a, b) => b - a)
  const yearlyData = years.map(year => ({ year, count: presentationsByYear[year].length }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      
      <div id="top" className="min-h-screen bg-white text-gray-900">
        {/* Header */}
        <header className="bg-card border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-4">
              {/* 麵包屑導航 */}
              <nav className="text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground">FinmoConf - 台股法說會搜尋</Link>
                <span className="mx-2">→</span>
                <span className="text-foreground font-medium">
                  {companyName}({companyCode}) 法說會簡報
                </span>
              </nav>
              
              {/* 公司資訊 */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {companyName}({companyCode}) 法說會簡報
                </h1>
                <p className="text-lg text-muted-foreground">
                  {typeLabel}公司法人說明會資料庫 • 收錄從 {new Date(earliestPresentationDate).getFullYear()} 年至 {new Date(latestPresentationDate).getFullYear()} 年，共計 {totalPresentations} 場法說會簡報，包含中英文版本及會議錄音檔案，提供完整的投資研究資訊
                </p>
              </div>
            </div>
          </div>
          
          {/* 頁首橫幅廣告 */}
          {/* <div className="container mx-auto px-4 pb-4">
            <AdBanner
              slot={process.env.NEXT_PUBLIC_ADSENSE_HEADER_SLOT || "6322775233"}
              format="auto"
              className="w-full max-w-4xl mx-auto"
              style={{ minHeight: '90px', maxHeight: '90px' }}
            />
          </div> */}
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">

          {/* 年度趨勢圖 */}
          <section className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <YearlyCallsChart data={yearlyData} companyName={companyName} />
              </div>
            </div>
          </section>

          {/* 法說會列表 */}
          <section className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  
                  {/* 按年份分組顯示 - 使用 Suspense 優化 */}
                  <Suspense fallback={
                    <div className="space-y-6">
                      {years.map(year => (
                        <div key={year} className="space-y-4">
                          <h3 className="text-xl font-semibold text-foreground border-b border-gray-200 pb-2">
                            {year}年 {companyName} 法說會
                          </h3>
                          <div className="space-y-4">
                            {presentationsByYear[year]?.slice(0, 3).map((_, i) => (
                              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2">
                                      <div className="h-5 bg-gray-300 rounded w-32"></div>
                                      <div className="h-5 bg-gray-300 rounded w-16"></div>
                                      <div className="h-5 bg-gray-300 rounded w-12"></div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                  <div className="h-8 bg-gray-300 rounded w-20"></div>
                                  <div className="h-8 bg-gray-300 rounded w-24"></div>
                                  <div className="h-8 bg-gray-300 rounded w-20"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  }>
                    <CompanyPresentations 
                      presentationsByYear={presentationsByYear}
                      years={years}
                      companyName={companyName}
                    />
                  </Suspense>
                </div>
              </div>
              
              {/* 側邊廣告 */}
              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-6">
                  {/* Promotion Cards */}
                  <PromotionCards />

                  <AdBanner
                    slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || "9966506770"}
                    format="auto"
                    className="w-full"
                    style={{ minHeight: '250px', maxHeight: '250px' }}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Back to Top floating button */}
        <a
          href="#top"
          aria-label="返回頂部"
          className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg border border-gray-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowUp className="h-5 w-5" />
          <span className="sr-only">返回頂部</span>
        </a>

        {/* Footer */}
        <footer className="bg-card border-t border-gray-200 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-muted-foreground space-y-2">
              <p>© 2025 FinmoConf - 台股法說會搜尋平台 - 提供{companyName}({companyCode})完整法說會簡報資料</p>
              <p className="text-sm">
                {companyName}法說會、{companyCode}法說會簡報、{companyName}法人說明會PDF下載
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
} 