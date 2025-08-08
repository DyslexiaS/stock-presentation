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
                    等 <span className="font-semibold text-slate-700">2000+</span> 家上市櫃公司的法人說明會簡報。
                  </p>
                </div>
              </div>

              {/* Features Pills - Moved under title */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full">
                  <FileText className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">PDF 下載</span>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full">
                  <Search className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">快速搜尋</span>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full">
                  <Bell className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">即時通知</span>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full">
                  <TrendingUp className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">即時更新</span>
                </div>
              </div>

              {/* Simple Info Text */}
              {!hasSearched && (
                <section className="mb-16">
                  <div className="text-center">
                    <p className="text-sm text-slate-500">
                      所有資料來源於<a href="https://mopsov.twse.com.tw/mops/web/index" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-600 hover:text-slate-800 underline decoration-slate-300 hover:decoration-slate-500 transition-colors">公開資訊觀測站</a>，
                      涵蓋 <span className="font-medium text-slate-600">2000+ 上市櫃公司</span>
                    </p>
                  </div>
                </section>
              )}

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

        {/* Keyword-focused help content for user intent coverage */}
        <section className="mb-16">
          <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-3">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">法說會是什麼？</h3>
              <p className="text-slate-600 text-sm leading-6">
                法說會（法人說明會）是公司對投資人與分析師的公開說明，內容涵蓋財報重點、營運展望與投資重點。您可在本平台查詢各公司歷年
                <span className="font-medium text-slate-800">法說會簡報</span> 與（若有提供）音訊連結。
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">如何快速進行法說會查詢</h3>
              <p className="text-slate-600 text-sm leading-6">
                於上方搜尋列輸入公司代碼（如 <span className="font-medium">2330</span>）、公司名稱（如 <span className="font-medium">台積電</span>），
                或設定日期條件，即可快速找到相關 <span className="font-medium text-slate-800">法說會查詢</span> 結果與
                <span className="font-medium text-slate-800"> 法說會簡報</span> PDF 下載。
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">法說會行事曆與時間表</h3>
              <p className="text-slate-600 text-sm leading-6">
                我們持續收錄最新活動日期，您可透過搜尋條件檢視近期 <span className="font-medium text-slate-800">法說會行事曆</span> 與
                <span className="font-medium text-slate-800"> 法說會時間表</span>；若公司提供線上直播或錄音，也會附上「線上法說會哪裡看」的相關連結。
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}