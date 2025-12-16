import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PromotionCards } from '@/components/ui/promotion-cards'
import {
  ArrowLeft,
  Calendar,
  Building2,
  Volume2,
  Download,
  FileText
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Presentation } from '@/types'
import { AdBanner } from '@/components/ads/ad-banner'

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
      <div className="w-full max-w-screen-2xl mx-auto">
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

              {/* Presentation Content - Markdown Rendered */}
              {presentation.presentationContent && (
                <Card className="mt-6">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <CardTitle>法說會簡報重點與營運摘要</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <article className="prose prose-slate max-w-none dark:prose-invert prose-sm">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ node, ...props }) => <h1 className="text-xl font-bold tracking-tight mb-2 mt-4 first:mt-0" {...props} />,
                          h2: ({ node, ...props }) => <h2 className="border-b pb-1.5 text-lg font-semibold tracking-tight mb-2 mt-4 first:mt-0" {...props} />,
                          h3: ({ node, ...props }) => <h3 className="text-base font-semibold tracking-tight mb-2 mt-3" {...props} />,
                          h4: ({ node, ...props }) => <h4 className="text-sm font-semibold tracking-tight mb-2 mt-3" {...props} />,
                          p: ({ node, ...props }) => <p className="text-sm leading-6 [&:not(:first-child)]:mt-2" {...props} />,
                          ul: ({ node, ...props }) => <ul className="my-3 ml-6 list-disc [&>li]:mt-1 text-sm" {...props} />,
                          ol: ({ node, ...props }) => <ol className="my-3 ml-6 list-decimal [&>li]:mt-1 text-sm" {...props} />,
                          li: ({ node, ...props }) => <li className="leading-6" {...props} />,
                          blockquote: ({ node, ...props }) => <blockquote className="mt-3 border-l-2 pl-4 italic text-sm" {...props} />,
                          table: ({ node, ...props }) => <div className="my-4 w-full overflow-y-auto"><table className="w-full border-collapse text-sm" {...props} /></div>,
                          thead: ({ node, ...props }) => <thead className="bg-muted/50 [&_tr]:border-b" {...props} />,
                          tbody: ({ node, ...props }) => <tbody className="[&_tr:last-child]:border-0" {...props} />,
                          tr: ({ node, ...props }) => <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" {...props} />,
                          th: ({ node, ...props }) => <th className="h-8 px-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-sm" {...props} />,
                          td: ({ node, ...props }) => <td className="py-1.5 px-3 align-middle [&:has([role=checkbox])]:pr-0 text-sm" {...props} />,
                          a: ({ node, ...props }) => <a className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 text-sm" {...props} />,
                        }}
                      >
                        {presentation.presentationContent}
                      </ReactMarkdown>
                    </article>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar with Promotion Cards and Ad - Client-side with Suspense */}
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
        </main>
      </div >
    </div >
  )
}