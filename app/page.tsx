'use client'

import { useState, useEffect } from 'react'
import { SearchBar } from '@/components/search/search-bar'
import { SearchResults } from '@/components/search/search-results'
import { SimplePDFViewer } from '@/components/pdf/simple-pdf-viewer'
import { AdBanner } from '@/components/ads/ad-banner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, FileText, Search, Globe } from 'lucide-react'
import { Presentation } from '@/types'

// Mock data for development - replace with actual API calls
const mockPresentations: Presentation[] = [
  {
    _id: '687b18f1a2ef6df0427f27e4',
    companyCode: '1101',
    companyName: '台泥',
    eventDate: '2025-05-19T00:00:00.000Z',
    presentationTWUrl: 'https://mopsov.twse.com.tw/nas/STR/110120250519M001.pdf',
    presentationEnUrl: 'https://mopsov.twse.com.tw/nas/STR/110120250519E001.pdf',
    typek: 'sii',
    createdAt: '2025-07-19T12:02:57.055Z'
  }
]

const features = [
  {
    icon: Search,
    title: '智能搜尋',
    description: '支援公司代碼、名稱快速搜尋'
  },
  {
    icon: FileText,
    title: 'PDF 下載',
    description: '快速下載，支援中英文版'
  },
  {
    icon: Globe,
    title: '中英對照',
    description: '提供中英文版本切換'
  },
  {
    icon: TrendingUp,
    title: '即時更新',
    description: '最新法說會資料同步'
  }
]

interface PaginationData {
  page: number
  limit: number
  total: number
  pages: number
  hasNext: boolean
  hasPrev: boolean
}

export default function HomePage() {
  const [presentations, setPresentations] = useState<Presentation[]>([])
  const [selectedPresentation, setSelectedPresentation] = useState<Presentation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState<PaginationData | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useState<{
    q?: string
    companyCode?: string
    type?: 'sii' | 'otc' | 'rotc'
  }>({})
  const [hasSearched, setHasSearched] = useState(false)

  // 載入所有法說會資料
  const fetchPresentations = async (page: number = 1, params?: {
    q?: string
    companyCode?: string
    type?: 'sii' | 'otc' | 'rotc'
  }) => {
    setIsLoading(true)
    
    try {
      // 建構查詢參數
      const searchQuery = new URLSearchParams()
      if (params?.q) searchQuery.append('q', params.q)
      if (params?.type) searchQuery.append('type', params.type)
      searchQuery.append('page', page.toString())
      searchQuery.append('limit', '20')
      
      const response = await fetch(`/api/presentations/search?${searchQuery}`)
      
      if (response.ok) {
        const data = await response.json()
        setPresentations(data.data || [])
        setPagination(data.pagination || null)
      } else {
        console.error('Failed to fetch presentations:', response.statusText)
        // 使用 mock 資料作為後備
        setPresentations(mockPresentations)
        setPagination({
          page: 1,
          limit: 20,
          total: mockPresentations.length,
          pages: 1,
          hasNext: false,
          hasPrev: false
        })
      }
    } catch (error) {
      console.error('Fetch presentations error:', error)
      // 使用 mock 資料作為後備
      setPresentations(mockPresentations)
      setPagination({
        page: 1,
        limit: 20,
        total: mockPresentations.length,
        pages: 1,
        hasNext: false,
        hasPrev: false
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 初始載入所有法說會
  useEffect(() => {
    fetchPresentations(1, {}) // 載入第一頁，顯示所有類型
  }, [])

  const handleSearch = async (params: {
    q?: string
    companyCode?: string
    type?: 'sii' | 'otc' | 'rotc'
  }) => {
    setSearchParams(params)
    setCurrentPage(1)
    setHasSearched(true)
    await fetchPresentations(1, params)
  }

  const handlePageChange = async (page: number) => {
    setCurrentPage(page)
    await fetchPresentations(page, searchParams)
    
    // 滾動到頂部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetToAllPresentations = async () => {
    setSearchParams({})
    setCurrentPage(1)
    setHasSearched(false)
    await fetchPresentations(1, {})
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-card border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              台股法說會搜尋
            </h1>
            <p className="text-muted-foreground text-lg">
              最完整的台灣上市櫃公司法說會資料庫
            </p>
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
        {/* Search Section */}
        <section className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {/* Features Section */}
        {!hasSearched && (
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <feature.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* SEO Content Section */}
        {!hasSearched && (
          <section className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle>台股法說會簡報完整資料庫</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  本平台提供台灣股市最完整的法說會簡報資料，包含台積電(2330)法說會簡報、鴻海(2317)法說會簡報、
                  台塑(1301)法說會簡報等上市、上櫃、興櫃公司的投資人說明會資料。
                </p>
                <p>
                  所有法說會簡報均提供PDF下載功能，支援公司代碼搜尋，如搜尋「2330」即可找到台積電法說會簡報，
                  搜尋「2317」可查看鴻海法說會簡報。涵蓋財報說明會、年度投資人說明會、季度法人說明會等各類簡報資料。
                </p>
                <p>
                  適合投資人、分析師、研究人員使用，提供台股投資決策參考。所有法說會簡報資料均來自公開資訊觀測站，
                  確保資料的準確性和即時性。
                </p>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Results Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {hasSearched ? '搜尋結果' : '最新台股法說會簡報'}
                    </h2>
                  </div>
                  {hasSearched && (
                    <button
                      onClick={resetToAllPresentations}
                      className="text-sm text-muted-foreground hover:text-foreground underline whitespace-nowrap"
                    >
                      顯示所有法說會
                    </button>
                  )}
                </div>
              </div>
              <SearchResults
                results={presentations}
                onPreview={setSelectedPresentation}
                pagination={pagination || undefined}
                onPageChange={handlePageChange}
              />
            </div>
            
            {/* 側邊廣告 */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <AdBanner
                  slot="1234567889"
                  format="rectangle"
                  className="w-full"
                  style={{ minHeight: '250px' }}
                />
              </div>
            </div>
          </div>

          {/* 內容中間廣告 */}
          <div className="mt-8">
            <AdBanner
              slot="1234567890"
              format="horizontal"
              className="w-full max-w-4xl mx-auto"
              style={{ minHeight: '90px' }}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2025 台股法說會搜尋平台 - 提供最完整的法人說明會資料</p>
          </div>
        </div>
      </footer>

      {/* PDF Viewer Modal */}
      {selectedPresentation && (
        <SimplePDFViewer
          presentation={selectedPresentation}
          onClose={() => setSelectedPresentation(null)}
        />
      )}
    </div>
  )
}