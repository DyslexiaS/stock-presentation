'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download,
  X,
  Loader2,
  ExternalLink,
  AlertCircle
} from 'lucide-react'
import { Presentation } from '@/types'

// Dynamically import react-pdf components to avoid SSR issues
const Document = dynamic(
  () => import('react-pdf').then((mod) => mod.Document),
  { ssr: false }
)

const Page = dynamic(
  () => import('react-pdf').then((mod) => mod.Page),
  { ssr: false }
)

// Set up PDF.js with polyfills and reliable worker
if (typeof window !== 'undefined') {
  // Polyfill DOMMatrix if not available
  if (typeof DOMMatrix === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).DOMMatrix = class DOMMatrix {
      constructor() {}
      static fromMatrix() { return new DOMMatrix() }
      translate() { return this }
      scale() { return this }
      rotate() { return this }
    }
  }
  
  // Set up PDF.js worker with fallback
  import('react-pdf').then((pdfjs) => {
    const workerVersion = pdfjs.pdfjs.version
    pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = 
      `//unpkg.com/pdfjs-dist@${workerVersion}/build/pdf.worker.min.js`
  }).catch(() => {
    console.warn('PDF.js setup failed')
  })
}

interface PDFViewerProps {
  presentation: Presentation
  onClose: () => void
}

export function PDFViewer({ presentation, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const [loading, setLoading] = useState<boolean>(true)
  const [mounted, setMounted] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [useIframe, setUseIframe] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
    // Auto-adjust scale based on screen size
    const updateScale = () => {
      const width = window.innerWidth
      if (width < 640) setScale(0.6)      // Mobile
      else if (width < 1024) setScale(0.8) // Tablet
      else setScale(1.0)                   // Desktop
    }
    
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [onClose])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
    setError(null)
  }

  function onDocumentLoadError(error: Error) {
    console.error('PDF load error:', error)
    setLoading(false)
    setError('PDF 載入失敗，請使用外部連結或下載功能')
  }

  const goToPrevPage = () => {
    setPageNumber(page => Math.max(1, page - 1))
  }

  const goToNextPage = () => {
    setPageNumber(page => Math.min(numPages, page + 1))
  }

  const zoomIn = () => {
    setScale(scale => Math.min(2.5, scale + 0.15))
  }

  const zoomOut = () => {
    setScale(scale => Math.max(0.4, scale - 0.15))
  }

  const fallbackToIframe = () => {
    setUseIframe(true)
    setError(null)
    setLoading(false)
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 sm:p-4 z-[100] pdf-viewer-modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <Card className="w-full max-w-6xl h-[95vh] flex flex-col shadow-2xl">
        <CardHeader className="flex-shrink-0 border-b bg-white/95 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1 min-w-0 flex-1">
              <CardTitle className="text-base sm:text-lg truncate">
                {presentation.companyName} ({presentation.companyCode})
              </CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {new Date(presentation.eventDate).toLocaleDateString('zh-TW')}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  法人說明會
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="flex-shrink-0 ml-2">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Page Navigation */}
            {!useIframe && !error && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1 || loading}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <span className="text-sm whitespace-nowrap">
                  第 {pageNumber} 頁，共 {numPages} 頁
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages || loading}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {!useIframe && !error && (
                <>
                  <Button variant="outline" size="sm" onClick={zoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  
                  <span className="text-sm">{Math.round(scale * 100)}%</span>
                  
                  <Button variant="outline" size="sm" onClick={zoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </>
              )}

              {error && (
                <Button variant="outline" size="sm" onClick={fallbackToIframe}>
                  嘗試 iframe 模式
                </Button>
              )}
              
              <Button variant="outline" size="sm" asChild>
                <a
                  href={presentation.presentationTWUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="hidden sm:inline">外部開啟</span>
                </a>
              </Button>

              <Button variant="outline" size="sm" asChild>
                <a
                  href={presentation.presentationTWUrl}
                  download
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">下載</span>
                </a>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto p-0 bg-gray-50">
          {/* Error State */}
          {error && !useIframe && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <AlertCircle className="h-16 w-16 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">PDF 載入遇到問題</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <div className="flex gap-2">
                <Button onClick={fallbackToIframe}>
                  嘗試 iframe 模式
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={presentation.presentationTWUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    外部開啟 PDF
                  </a>
                </Button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && !error && (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>載入 PDF 中...</span>
              </div>
            </div>
          )}

          {/* Iframe Fallback */}
          {useIframe && (
            <iframe
              src={presentation.presentationTWUrl}
              className="w-full h-full border-0"
              title={`${presentation.companyName} 法說會`}
              onLoad={() => setLoading(false)}
              onError={() => setError('iframe 也無法載入 PDF')}
            />
          )}
          
          {/* PDF.js Viewer */}
          {mounted && !useIframe && !error && (
            <div className="flex justify-center p-4">
              <Document
                file={presentation.presentationTWUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                options={{
                  cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
                  cMapPacked: true,
                }}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading={
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  }
                  className="shadow-lg"
                />
              </Document>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}