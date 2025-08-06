'use client'

import { AdBanner } from '@/components/ads/ad-banner'
import { SearchBar } from '@/components/search/search-bar'
import { SearchResults } from '@/components/search/search-results'
import { PromotionCards } from '@/components/ui/promotion-cards'
import { Presentation } from '@/types'
import { Bell, ChevronRight, FileText, Search, TrendingUp } from 'lucide-react'
import { useState } from 'react'

interface PaginationData {
  page: number
  limit: number
  total: number
  pages: number
  hasNext: boolean
  hasPrev: boolean
}

interface HomePageClientProps {
  initialPresentations: Presentation[]
  initialPagination: PaginationData
}

export default function HomePageClient({
  initialPresentations,
  initialPagination
}: HomePageClientProps) {
  const [presentations, setPresentations] = useState<Presentation[]>(initialPresentations)
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState<PaginationData>(initialPagination)
  const [searchParams, setSearchParams] = useState<{
    q?: string
    companyCode?: string
    type?: 'sii' | 'otc' | 'rotc'
  }>({})
  const [hasSearched, setHasSearched] = useState(false)

  // 載入法說會資料
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
        setPagination(data.pagination || initialPagination)
      } else {
        console.error('Failed to fetch presentations:', response.statusText)
        // 使用初始資料作為後備
        setPresentations(initialPresentations)
        setPagination(initialPagination)
      }
    } catch (error) {
      console.error('Fetch presentations error:', error)
      // 使用初始資料作為後備
      setPresentations(initialPresentations)
      setPagination(initialPagination)
    } finally {
      setIsLoading(false)
    }
  }

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
    setPresentations(initialPresentations)
    setPagination(initialPagination)
  }

  return (
    <>
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 bg-slate-50 min-h-screen">
        {/* Hero Section */}
        {!hasSearched && (
          <section className="relative mb-20 overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-1/3 w-24 h-24 bg-slate-100/40 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute bottom-10 right-1/3 w-32 h-32 bg-slate-50/60 rounded-full blur-2xl opacity-40"></div>
            </div>
            
            <div className="relative max-w-5xl mx-auto px-6">
              {/* Main Headline - Improved typography */}
              <div className="text-center mb-12">
                <div className="mb-6">
                  <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                    FinmoConf - 台股法說會資料庫
                  </h1>
                  <div className="w-16 h-0.5 bg-slate-300 mx-auto mb-8"></div>
                </div>
                
                <div className="max-w-4xl mx-auto">
                  <p className="text-xl md:text-2xl text-slate-600 mb-4 leading-relaxed font-light">
                    收錄台灣股市完整法說會資料庫，涵蓋 
                    <span className="font-medium text-slate-800 mx-1">2330 台積電</span>、
                    <span className="font-medium text-slate-800 mx-1">2317 鴻海</span>、
                    <span className="font-medium text-slate-800 mx-1">1301 台塑</span>
                    等 <span className="font-semibold text-slate-700">2000+</span> 家上市櫃公司的投資人說明會簡報。
                  </p>
                </div>
              </div>

              {/* Enhanced Search Section */}
              <div className="mb-2">
                <div className="max-w-3xl mx-auto">
                  <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Enhanced Search Section for search results */}
        {hasSearched && (
          <section className="mb-12">
            <div className="max-w-5xl mx-auto">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </section>
        )}

        {/* Features & Info Section - Clean & Simple */}
        {!hasSearched && (
          <section className="mb-16">
            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Search className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="text-base font-medium text-slate-800 mb-2">智能搜尋</h3>
                <p className="text-sm text-slate-500">公司代碼、名稱快速搜尋</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FileText className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="text-base font-medium text-slate-800 mb-2">PDF 下載</h3>
                <p className="text-sm text-slate-500">快速下載，支援中英文版</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Bell className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="text-base font-medium text-slate-800 mb-2">Telegram 通知</h3>
                <p className="text-sm text-slate-500">每晚8點推送最新資訊</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="text-base font-medium text-slate-800 mb-2">即時更新</h3>
                <p className="text-sm text-slate-500">最新法說會資料同步</p>
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-slate-50 rounded-lg p-6 mb-6">
              <p className="text-base text-slate-600 text-center">
                所有資料來源於<span className="font-medium text-slate-700">公開資訊觀測站</span>，
                涵蓋 <span className="font-semibold text-slate-700">2000+ 上市櫃公司</span>，
                支援中英文版本下載
              </p>
            </div>
          </section>
        )}

        {/* Results Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="mb-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        {hasSearched ? '搜尋結果' : 'FinmoConf 最新台股法說會簡報'}
                      </h2>
                      <div className="w-12 h-0.5 bg-slate-300"></div>
                    </div>
                    {hasSearched && (
                      <button
                        onClick={resetToAllPresentations}
                        className="group px-4 py-2 text-sm text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all duration-200 border border-slate-200 hover:border-slate-300"
                      >
                        <span className="flex items-center gap-2">
                          <span>顯示所有法說會</span>
                          <ChevronRight className="h-4 w-4 transform rotate-180" />
                        </span>
                      </button>
                    )}
                  </div>
              </div>
              <SearchResults
                results={presentations}
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
            
            {/* 側邊欄 */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                {/* Subtle floating decoration */}
                <div className="absolute -top-2 left-4 w-2 h-2 bg-slate-200 rounded-full opacity-60 animate-pulse"></div>

                {/* Promotion Cards */}
                <PromotionCards />

                {/* 側邊廣告 */}
                <AdBanner
                  slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || "1234567889"}
                  format="rectangle"
                  className="w-full"
                  style={{ minHeight: '250px' }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}