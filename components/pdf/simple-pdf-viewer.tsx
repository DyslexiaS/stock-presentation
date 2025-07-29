'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Download, X, AlertCircle, Loader2 } from 'lucide-react'
import { Presentation } from '@/types'

interface SimplePDFViewerProps {
  presentation: Presentation
  onClose: () => void
}

export function SimplePDFViewer({ presentation, onClose }: SimplePDFViewerProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [onClose])

  const handleIframeLoad = () => {
    setLoading(false)
    setError(null)
  }

  const handleIframeError = () => {
    setLoading(false)
    setError('無法在瀏覽器中預覽此 PDF。某些 PDF 檔案可能不支援內嵌預覽。')
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
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0 relative">
          {/* Loading State */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
              <div className="flex items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>載入 PDF 中...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50">
              <AlertCircle className="h-16 w-16 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">PDF 預覽遇到問題</h3>
              <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
              <div className="flex gap-2">
                <Button asChild>
                  <a
                    href={presentation.presentationTWUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    在新視窗開啟
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={presentation.presentationTWUrl}
                    download
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    下載 PDF
                  </a>
                </Button>
              </div>
            </div>
          )}

          {/* PDF Iframe */}
          {!error && (
            <iframe
              src={`${presentation.presentationTWUrl}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-full border-0"
              title={`${presentation.companyName} 法說會`}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              // Remove problematic sandbox restrictions
              allow="fullscreen"
            />
          )}
        </CardContent>

        <div className="flex-shrink-0 border-t p-4 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button variant="outline" asChild>
              <a
                href={presentation.presentationTWUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                在新視窗開啟
              </a>
            </Button>
            
            <Button asChild>
              <a
                href={presentation.presentationTWUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                下載 PDF
              </a>
            </Button>

            {presentation.presentationEnUrl && (
              <Button variant="outline" asChild>
                <a
                  href={presentation.presentationEnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  英文版
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}