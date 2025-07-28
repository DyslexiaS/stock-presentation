import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dbConnect from '@/lib/mongodb'
import Presentation from '@/lib/models/Presentation'
import { Presentation as PresentationType } from '@/types'
import { 
  generateCompanyPageTitle, 
  generateCompanyPageDescription, 
  generateCompanyKeywords,
  generateCompanyStructuredData,
  generateCompanyBreadcrumbData
} from '@/lib/seo'
import { SearchResults } from '@/components/search/search-results'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdBanner } from '@/components/ads/ad-banner'
import { Building2, Calendar, FileText, TrendingUp } from 'lucide-react'

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
    
    const presentations = await Presentation.find({ companyCode })
      .sort({ eventDate: -1 })
      .lean()

    if (presentations.length === 0) {
      return null
    }

    const firstPresentation = presentations[0]
    const latestDate = new Date(presentations[0].eventDate)
    const earliestDate = new Date(presentations[presentations.length - 1].eventDate)

    return {
      companyCode,
      companyName: firstPresentation.companyName,
      typek: firstPresentation.typek,
      presentations: presentations as unknown as PresentationType[],
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
      title: `${companyCode} 公司不存在 | 台股法說會搜尋`,
      description: '找不到指定公司的法說會資料'
    }
  }

  const { companyName, typek, totalPresentations } = companyData
  const title = generateCompanyPageTitle(companyCode, companyName)
  const description = generateCompanyPageDescription(companyCode, companyName, totalPresentations)
  const keywords = generateCompanyKeywords(companyCode, companyName, typek)

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: '台股法說會搜尋',
      images: [{
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${companyName}(${companyCode}) 法說會簡報`
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}/company/${companyCode}`
    }
  }
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
      
      <div className="min-h-screen bg-white text-gray-900">
        {/* Header */}
        <header className="bg-card border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-4">
              {/* 麵包屑導航 */}
              <nav className="text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground">台股法說會搜尋</Link>
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
                  {typeLabel}公司投資人說明會總覽 • 共 {totalPresentations} 場法說會
                </p>
              </div>
            </div>
          </div>
          
          {/* 頁首橫幅廣告 */}
          <div className="container mx-auto px-4 pb-4">
            <AdBanner
              slot="1234567888"
              format="horizontal"
              className="w-full max-w-4xl mx-auto"
              style={{ minHeight: '90px' }}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* 公司統計資訊 */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">公司代碼</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{companyCode}</div>
                  <p className="text-xs text-muted-foreground">{typeLabel}公司</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">法說會總數</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalPresentations}</div>
                  <p className="text-xs text-muted-foreground">場投資人說明會</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">最新法說會</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Date(latestPresentationDate).toLocaleDateString('zh-TW')}
                  </div>
                  <p className="text-xs text-muted-foreground">最近更新</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">資料範圍</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Date(earliestPresentationDate).getFullYear()} - {new Date(latestPresentationDate).getFullYear()}
                  </div>
                  <p className="text-xs text-muted-foreground">年度覆蓋</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* SEO 關鍵字內容 */}
          <section className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>關於 {companyName}({companyCode}) 法說會簡報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                                 <p>
                   {companyName}(股票代碼：{companyCode})是{typeLabel}公司，本頁面提供{companyName}歷年完整的法說會簡報資料，
                   包含{totalPresentations}場投資人說明會的PDF下載功能。
                 </p>
                <p>
                  您可以在此查看{companyName}各季度財報說明會、年度法人說明會等重要投資人簡報資料。
                  所有{companyCode}法說會簡報均提供中文版PDF下載，部分資料另有英文版本。
                </p>
                <p>
                  {companyName}法說會資料涵蓋{new Date(earliestPresentationDate).getFullYear()}年至{new Date(latestPresentationDate).getFullYear()}年，
                  為投資人、分析師和研究人員提供完整的{companyCode}股票投資參考資訊。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 法說會列表 */}
          <section className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                      {companyName} 法說會簡報列表
                    </h2>
                    <Link 
                      href="/"
                      className="text-sm text-muted-foreground hover:text-foreground underline"
                    >
                      返回搜尋頁面
                    </Link>
                  </div>
                  
                  {/* 按年份分組顯示 */}
                  {years.map(year => (
                    <div key={year} className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground border-b border-gray-200 pb-2">
                        {year}年 {companyName} 法說會
                      </h3>
                                             <SearchResults
                         results={presentationsByYear[year]}
                         onPreview={() => {}}
                       />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 側邊廣告 */}
              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-6">
                  <AdBanner
                    slot="1234567889"
                    format="rectangle"
                    className="w-full"
                    style={{ minHeight: '250px' }}
                  />
                  
                  {/* 相關公司連結 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">相關{typeLabel}公司</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        查看更多{typeLabel}公司法說會資料
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* 內容中間廣告 */}
          <div className="mt-8">
            <AdBanner
              slot="1234567890"
              format="horizontal"
              className="w-full max-w-4xl mx-auto"
              style={{ minHeight: '90px' }}
            />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-gray-200 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-muted-foreground space-y-2">
              <p>© 2025 台股法說會搜尋平台 - 提供{companyName}({companyCode})完整法說會簡報資料</p>
              <p className="text-sm">
                {companyName}法說會、{companyCode}法說會簡報、{companyName}投資人說明會PDF下載
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
} 