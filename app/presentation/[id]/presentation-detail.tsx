'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PDFViewer } from '@/components/pdf/pdf-viewer'
import { SimplePDFViewer } from '@/components/pdf/simple-pdf-viewer'
import { 
  ArrowLeft, 
  Calendar, 
  Building2, 
  FileText, 
  ExternalLink,
  Download
} from 'lucide-react'
import { Presentation } from '@/types'

interface Props {
  presentation: Presentation
}

const typeLabels: Record<string, { label: string; color: string }> = {
  sii: { label: '上市', color: 'bg-blue-100 text-blue-800' },
  otc: { label: '上櫃', color: 'bg-green-100 text-green-800' },
  rotc: { label: '興櫃', color: 'bg-purple-100 text-purple-800' },
}

export default function PresentationDetailPage({ presentation }: Props) {
  const [showPDFViewer, setShowPDFViewer] = useState(false)
  const [viewerType, setViewerType] = useState<'advanced' | 'simple'>('simple')

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
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
            <nav className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">首頁</Link>
              <span className="mx-2">/</span>
              <Link 
                href={`/company/${presentation.companyCode}`}
                className="hover:text-foreground"
              >
                {presentation.companyName}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">法說會詳情</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">
                    {presentation.companyName} 法人說明會
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
                  <span>
                    {new Date(presentation.eventDate).toLocaleDateString('zh-TW', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>法人說明會</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setViewerType('advanced')
                  setShowPDFViewer(true)
                }}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                進階預覽模式
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
                  >
                    <ExternalLink className="h-4 w-4" />
                    英文版 PDF
                  </a>
                </Button>
              )}
            </div>

            {/* Company Info */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">公司資訊</h3>
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
                  <span className="font-medium">
                    {new Date(presentation.eventDate).toLocaleDateString('zh-TW')}
                  </span>
                </div>
              </div>
            </div>

            {/* Related Actions */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">相關連結</h3>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/company/${presentation.companyCode}`}>
                    查看更多 {presentation.companyName} 法說會
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/search?type=${presentation.typek}`}>
                    瀏覽{typeLabels[presentation.typek]?.label}公司法說會
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* PDF Viewer Modal */}
      {showPDFViewer && viewerType === 'simple' && (
        <SimplePDFViewer
          presentation={presentation}
          onClose={() => setShowPDFViewer(false)}
        />
      )}
      
      {showPDFViewer && viewerType === 'advanced' && (
        <PDFViewer
          presentation={presentation}
          onClose={() => setShowPDFViewer(false)}
        />
      )}
    </div>
  )
}