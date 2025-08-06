import Link from 'next/link'
import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PromotionCards } from '@/components/ui/promotion-cards'
import { 
  ArrowLeft, 
  Calendar, 
  Building2, 
  Volume2,
  Download
} from 'lucide-react'
import { Presentation } from '@/types'
import ClientAdBanner from './client-ad-banner'

interface Props {
  presentation: Presentation
}

const typeLabels: Record<string, { label: string; color: string }> = {
  sii: { label: '上市', color: 'bg-blue-100 text-blue-800' },
  otc: { label: '上櫃', color: 'bg-green-100 text-green-800' },
  rotc: { label: '興櫃', color: 'bg-purple-100 text-purple-800' },
}

// Server Component - 主要內容在服務器端渲染，SEO 友善
export default function PresentationDetailPage({ presentation }: Props) {
  const date = new Date(presentation.eventDate)
  const year = date.getFullYear()
  const quarter = Math.ceil((date.getMonth() + 1) / 3)
  const yearQuarter = `${year}Q${quarter}`
  const formattedDate = date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header - Server-side rendered for SEO */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                返回搜尋
              </Link>
            </Button>
            <div className="h-6 border-l border-muted" />
            
            {/* SEO-friendly breadcrumb navigation */}
            <nav className="text-sm text-muted-foreground" aria-label="麵包屑導航">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="hover:text-foreground">FinmoConf 首頁</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link 
                    href={`/company/${presentation.companyCode}`}
                    className="hover:text-foreground"
                  >
                    {presentation.companyName}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground font-medium" aria-current="page">
                  {yearQuarter} 法說會詳情
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </header>

      {/* Banner Ad - Client-side with Suspense */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Suspense fallback={
            <div 
              className="w-full max-w-4xl mx-auto bg-gray-100 rounded animate-pulse" 
              style={{ minHeight: '90px' }}
              aria-label="廣告載入中"
            />
          }>
            <ClientAdBanner
              slot={process.env.NEXT_PUBLIC_ADSENSE_HEADER_SLOT || "1234567892"}
              format="horizontal"
              className="w-full max-w-4xl mx-auto"
              style={{ minHeight: '90px' }}
            />
          </Suspense>
        </div>
      </div>

      {/* Main Content - Server-side rendered for optimal SEO */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">
                        {presentation.companyName} {yearQuarter} 法人說明會
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-sm">
                          {presentation.companyCode}
                        </Badge>
                        <Badge 
                          className={`text-sm ${typeLabels[presentation.typek]?.color}`}
                          variant="secondary"
                        >
                          {typeLabels[presentation.typek]?.label}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={presentation.eventDate}>
                        {formattedDate}
                      </time>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>法人說明會</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Action Buttons - Enhanced for SEO */}
                <div className="flex gap-3 flex-wrap">
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                  >
                    <a
                      href={presentation.presentationTWUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                      aria-label={`下載 ${presentation.companyName} ${yearQuarter} 中文版法說會簡報 PDF`}
                    >
                      <Download className="h-4 w-4" />
                      中文版 PDF
                    </a>
                  </Button>

                  {presentation.presentationEnUrl && (
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                    >
                      <a
                        href={presentation.presentationEnUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                        aria-label={`下載 ${presentation.companyName} ${yearQuarter} 英文版法說會簡報 PDF`}
                      >
                        <Download className="h-4 w-4" />
                        英文版 PDF
                      </a>
                    </Button>
                  )}

                  {presentation.audioLinkUrl && (
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                    >
                      <a
                        href={presentation.audioLinkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                        aria-label={`收聽 ${presentation.companyName} ${yearQuarter} 法說會音訊錄音`}
                      >
                        <Volume2 className="h-4 w-4" />
                        音訊錄音
                      </a>
                    </Button>
                  )}
                </div>


                {/* Company Info - Enhanced for SEO */}
                {/* <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">公司基本資訊</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">公司名稱：</span>
                      <span className="font-medium">{presentation.companyName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">股票代碼：</span>
                      <span className="font-medium">{presentation.companyCode}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">交易市場：</span>
                      <span className="font-medium">
                        {typeLabels[presentation.typek]?.label}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">法說會日期：</span>
                      <time dateTime={presentation.eventDate} className="font-medium">
                        {shortDate}
                      </time>
                    </div>
                  </div>
                </div> */}

                {/* Related Actions - SEO Friendly */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">相關功能</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link 
                        href={`/company/${presentation.companyCode}`}
                        className="flex items-center gap-2"
                      >
                        <Building2 className="h-4 w-4" />
                        查看 {presentation.companyName} 歷年法說會
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar with Promotion Cards and Ad - Client-side with Suspense */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Promotion Cards */}
              <PromotionCards />
              
              {/* Ad Banner */}
              <Suspense fallback={
                <div 
                  className="w-full bg-gray-100 rounded animate-pulse" 
                  style={{ minHeight: '250px' }}
                  aria-label="廣告載入中"
                />
              }>
                <ClientAdBanner
                  slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || "1234567893"}
                  format="rectangle"
                  className="w-full"
                  style={{ minHeight: '250px' }}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}