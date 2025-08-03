'use client'

import { useState, useEffect } from 'react'
import { SearchBar } from '@/components/search/search-bar'
import { SearchResults } from '@/components/search/search-results'
import { SimplePDFViewer } from '@/components/pdf/simple-pdf-viewer'
import { AdBanner } from '@/components/ads/ad-banner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, FileText, Search, Globe, Bell } from 'lucide-react'
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
    icon: Bell,
    title: 'Telegram 通知',
    description: '每晚8點推送最新法說會資訊'
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
    setHasSearched(true)
    await fetchPresentations(1, params)
  }

  const handlePageChange = async (page: number) => {
    await fetchPresentations(page, searchParams)
    
    // 滾動到頂部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetToAllPresentations = async () => {
    setSearchParams({})
    setHasSearched(false)
    await fetchPresentations(1, {})
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-card border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            {/* Main Title with Gradient */}
            <div className="relative">
              <div className="mb-6">
                {/* Decorative elements */}
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent w-32"></div>
                  <div className="mx-4 w-2 h-2 bg-slate-400 rounded-full"></div>
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent w-32"></div>
                </div>
                
                {/* Main title with enhanced typography */}
                <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                  <span className="block text-slate-800 mb-2">台股法說會資料庫</span>
                </h1>
                
                {/* Subtle accent line */}
                <div className="mx-auto mt-8 w-16 h-px bg-slate-400"></div>
              </div>
            </div>
            
            {/* Subtitle with enhanced styling */}
            <div className="relative max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed tracking-wide">
                <span className="font-medium text-slate-700">最完整的</span>
                <span className="mx-2 text-slate-500">·</span>
                <span className="font-medium text-slate-700">台灣上市櫃公司</span>
                <span className="mx-2 text-slate-500">·</span>
                <span className="inline-block relative">
                  <span className="font-semibold text-slate-800">法說會資料庫</span>
                  <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-blue-500 to-slate-500 opacity-60"></div>
                </span>
              </p>
              
              {/* Feature badges with minimal design */}
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <span className="inline-flex items-center px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-full hover:bg-slate-50 transition-colors">
                  <FileText className="w-4 h-4 mr-2 text-slate-500" />
                  PDF 下載
                </span>
                <span className="inline-flex items-center px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-full hover:bg-slate-50 transition-colors">
                  <Search className="w-4 h-4 mr-2 text-slate-500" />
                  智能搜尋
                </span>
                <span className="inline-flex items-center px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-full hover:bg-slate-50 transition-colors">
                  <Bell className="w-4 h-4 mr-2 text-slate-500" />
                  即時通知
                </span>
                <span className="inline-flex items-center px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-full hover:bg-slate-50 transition-colors">
                  <TrendingUp className="w-4 h-4 mr-2 text-slate-500" />
                  即時更新
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 頁首橫幅廣告 */}
        <div className="container mx-auto px-4 pb-4">
          <AdBanner
            slot={process.env.NEXT_PUBLIC_ADSENSE_HEADER_SLOT || "1234567888"}
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

            {/* FinmoAI Memo Generator Promotion */}
            <div className="mt-6 text-center">
              <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-emerald-600 mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">🤖 FinmoAI 智能備忘錄生成器</h3>
                    <span className="ml-2 px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">BETA</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    運用 AI 人工智慧技術，自動分析法說會簡報內容，生成重點摘要和投資備忘錄，
                    讓您快速掌握關鍵投資要點！
                  </p>
                  <a
                    href="https://finmoai.diveinvest.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    體驗 AI 備忘錄生成器
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Ad after Features Section */}
            <div className="mt-8">
              <AdBanner
                slot={process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT || "1234567894"}
                format="horizontal"
                className="w-full max-w-4xl mx-auto"
                style={{ minHeight: '90px' }}
              />
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
                  本平台提供台灣股市完整的法說會簡報資料，包含台積電(2330)法說會簡報、鴻海(2317)法說會簡報、
                  台塑(1301)法說會簡報等上市、上櫃、興櫃公司的投資人說明會資料。
                </p>
                <p>
                  所有法說會簡報均提供 PDF 下載連結，支援公司代碼搜尋，如搜尋「2330」即可找到台積電法說會簡報，
                  搜尋「2317」可查看鴻海法說會簡報。涵蓋財報說明會、年度投資人說明會、季度法人說明會等各類簡報資料。
                </p>
                <p>
                  適合投資人、分析師、研究人員使用，提供台股投資決策參考。所有法說會簡報資料均來自公開資訊觀測站，
                  確保資料的準確性和即時性。
                </p>
                <p className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-3 rounded-r">
                  <strong>📱 即時通知服務</strong>：加入我們的 Telegram 機器人 
                  <a href="https://t.me/diveinvest_bot" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium mx-1">
                    @diveinvest_bot
                  </a>
                  ，每晚 8 點自動推送最新法說會簡報，讓您隨時掌握重要投資訊息，不錯過任何關鍵的法人說明會資料。
                </p>
                <p className="border-l-4 border-emerald-500 pl-4 bg-emerald-50 p-3 rounded-r">
                  <strong>🤖 AI 智能分析</strong>：體驗我們的 
                  <a href="https://finmoai.diveinvest.net/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 font-medium mx-1">
                    FinmoAI 備忘錄生成器
                  </a>
                  ，運用人工智慧技術自動分析法說會簡報內容，生成重點摘要和投資要點，協助投資人快速理解複雜的財務資訊和公司策略。
                </p>
              </CardContent>
            </Card>

            {/* Ad after SEO Content Section */}
            <div className="mt-8">
              <AdBanner
                slot={process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT || "1234567895"}
                format="horizontal"
                className="w-full max-w-4xl mx-auto"
                style={{ minHeight: '90px' }}
              />
            </div>
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
                  slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || "1234567889"}
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
              slot={process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT || "1234567890"}
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
          {/* Footer Ad */}
          <div className="mb-8">
            <AdBanner
              slot={process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT || "1234567896"}
              format="horizontal"
              className="w-full max-w-4xl mx-auto"
              style={{ minHeight: '90px' }}
            />
          </div>
          
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