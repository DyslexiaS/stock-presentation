'use client'

import { AdBanner } from '@/components/ads/ad-banner'
import { SearchBar } from '@/components/search/search-bar'
import { SearchResults } from '@/components/search/search-results'
import { PromotionCards } from '@/components/ui/promotion-cards'
import { Presentation } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const FEATURED_INDUSTRIES = [
  { label: 'IC 設計', slug: 'ic-design',               dot: 'bg-blue-400',   text: 'text-blue-700',   bg: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
  { label: 'AI',      slug: 'ai',                      dot: 'bg-purple-400', text: 'text-purple-700', bg: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
  { label: '伺服器',  slug: 'server',                  dot: 'bg-violet-400', text: 'text-violet-700', bg: 'bg-violet-50 border-violet-200 hover:bg-violet-100' },
  { label: '電動車',  slug: 'ev-car',                  dot: 'bg-amber-400',  text: 'text-amber-700',  bg: 'bg-amber-50 border-amber-200 hover:bg-amber-100' },
  { label: 'PCB',     slug: 'pcb',                     dot: 'bg-emerald-400',text: 'text-emerald-700',bg: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100' },
  { label: '半導體設備', slug: 'semiconductor-equipment', dot: 'bg-teal-400',  text: 'text-teal-700',   bg: 'bg-teal-50 border-teal-200 hover:bg-teal-100' },
]

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
  const urlSearchParams = useSearchParams()
  const initialQ = urlSearchParams.get('q') ?? ''

  const [presentations, setPresentations] = useState<Presentation[]>(initialPresentations)
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState<PaginationData>(initialPagination)
  const [searchParams, setSearchParams] = useState<{
    q?: string
    companyCode?: string
    type?: 'sii' | 'otc' | 'rotc'
  }>(initialQ ? { q: initialQ } : {})
  const [hasSearched, setHasSearched] = useState(!!initialQ)

  useEffect(() => {
    if (initialQ) {
      fetchPresentations(1, { q: initialQ })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchPresentations = async (page: number = 1, params?: {
    q?: string
    companyCode?: string
    type?: 'sii' | 'otc' | 'rotc'
  }) => {
    setIsLoading(true)
    try {
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
        setPresentations(initialPresentations)
        setPagination(initialPagination)
      }
    } catch {
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetSearch = () => {
    setSearchParams({})
    setHasSearched(false)
    setPresentations(initialPresentations)
    setPagination(initialPagination)
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── */}
      <section className="bg-white border-b border-slate-200 adsbygoogle-noablate">
        <div className="container mx-auto px-6">

          {/* Service nav */}
          <nav className="flex items-center gap-8 pt-6 max-w-2xl mx-auto" aria-label="服務選單">
            <span className="inline-flex items-center gap-2.5" aria-current="page">
              <span className="text-[10px] font-mono font-medium text-slate-400 tabular-nums">01</span>
              <span className="text-sm font-semibold text-slate-900 border-b border-slate-900 pb-px leading-snug">
                法說會簡報
              </span>
            </span>
            <Link
              href="/industry"
              className="inline-flex items-center gap-2.5 group transition-opacity hover:opacity-70"
            >
              <span className="text-[10px] font-mono font-medium text-slate-300 tabular-nums">02</span>
              <span className="text-sm text-slate-400 group-hover:text-slate-500 transition-colors leading-snug">
                產業地圖
              </span>
              <span className="text-[9px] font-semibold tracking-widest px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-600 leading-none uppercase">
                New
              </span>
            </Link>
          </nav>

          {/* Headline block */}
          <div className="max-w-2xl mx-auto text-center pt-14 pb-10">
            <p className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
              FinmoAI 系列產品
            </p>

            {/* h1 kept for SEO — matches page <title> */}
            <h1 className="text-4xl md:text-[2.75rem] font-bold text-slate-900 tracking-tight leading-tight mb-4">
              台股法說會資料庫
            </h1>

            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
              收錄{' '}
              <span className="text-slate-700 font-semibold">2,000+</span>{' '}
              家上市櫃公司法人說明會簡報，快速查詢與 PDF 下載一站搞定
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm text-slate-500">
              {[
                { label: 'PDF 下載', dot: 'bg-blue-400' },
                { label: '快速搜尋', dot: 'bg-emerald-400' },
                { label: '即時更新', dot: 'bg-amber-400' },
              ].map(({ label, dot }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto pt-2">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} initialQuery={initialQ} />
          </div>

          {/* Featured industry chips */}
          <div className="max-w-3xl mx-auto pb-8 pt-5 border-t border-slate-100 mt-6">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">熱門產業</p>
            <div className="flex flex-wrap gap-2">
              {FEATURED_INDUSTRIES.map(({ label, slug, dot, text, bg }) => (
                <Link
                  key={slug}
                  href={`/industry/${slug}`}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${bg} ${text}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${dot} flex-shrink-0`} />
                  {label}
                </Link>
              ))}
              <Link
                href="/industry"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"
              >
                查看全部 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main ── */}
      <main className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-3">

            {/* Section label */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                {hasSearched ? '搜尋結果' : '最新法說會'}
              </h2>
              {hasSearched && (
                <button
                  onClick={resetSearch}
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                >
                  ← 返回全部
                </button>
              )}
            </div>

            {/* Recent highlights — shown only before any search */}
            {!hasSearched && presentations.length > 0 && (
              <div className="mb-6 rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">本週速覽</span>
                  <span className="text-[11px] text-slate-400">最近新增</span>
                </div>
                <ul className="divide-y divide-slate-100">
                  {presentations.slice(0, 3).map((p) => {
                    const date = new Date(p.eventDate)
                    const dateStr = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`
                    const typeLabel = p.typek === 'sii' ? '上市' : p.typek === 'otc' ? '上櫃' : '興櫃'
                    const typeColor = p.typek === 'sii' ? 'text-blue-600 bg-blue-50' : p.typek === 'otc' ? 'text-emerald-600 bg-emerald-50' : 'text-purple-600 bg-purple-50'
                    return (
                      <li key={p._id} className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors">
                        <div className="flex-1 min-w-0">
                          <Link href={`/company/${p.companyCode}`} className="font-semibold text-slate-800 hover:text-slate-900 text-sm">
                            {p.companyName}
                          </Link>
                          <span className="ml-2 font-mono text-xs text-slate-400">{p.companyCode}</span>
                        </div>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${typeColor}`}>{typeLabel}</span>
                        <span className="text-xs text-slate-400 font-mono tabular-nums shrink-0">{dateStr}</span>
                        <Link
                          href={p.presentationTWUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          PDF ↗
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            <SearchResults
              results={presentations}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <PromotionCards />
              <AdBanner
                slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || "9966506770"}
                format="auto"
                className="w-full"
                style={{ minHeight: '250px', maxHeight: '250px' }}
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
