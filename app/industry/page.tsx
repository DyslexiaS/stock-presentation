import { Metadata } from 'next'
import Link from 'next/link'
import { ALL_SUB_INDUSTRIES } from '@/lib/data/industry-map'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://finmoconf.diveinvest.net'

export const metadata: Metadata = {
  title: '台股產業地圖 | FinmoConf - 依產業瀏覽法說會',
  description: '依產業分類瀏覽台灣上市櫃公司法說會簡報。半導體、金融、電子等各產業法人說明會資料一覽，快速掌握產業動態。',
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${BASE_URL}/industry`,
  },
  openGraph: {
    title: '台股產業地圖 | FinmoConf',
    description: '依產業分類瀏覽台灣上市櫃公司法說會簡報。半導體、金融、電子等各產業法人說明會資料一覽。',
    url: `${BASE_URL}/industry`,
    siteName: 'FinmoConf',
    type: 'website',
  },
}

type SectorCfg = {
  dot: string       // Tailwind bg color for the dot
  border: string    // Tailwind border-l color for cards
  tag: string       // Tailwind bg for company chips
  tagText: string   // Tailwind text for company chips
  badge: string     // Tailwind bg for sector badge
  badgeText: string
  index: string
}

const SECTOR: Record<string, SectorCfg> = {
  'IC 產業':      { dot: 'bg-blue-400',   border: 'border-l-blue-400',   tag: 'bg-blue-50',   tagText: 'text-blue-600',   badge: 'bg-blue-50',   badgeText: 'text-blue-500',   index: '01' },
  '電子零組件':   { dot: 'bg-emerald-400', border: 'border-l-emerald-400', tag: 'bg-emerald-50', tagText: 'text-emerald-600', badge: 'bg-emerald-50', badgeText: 'text-emerald-500', index: '02' },
  '電腦產業':     { dot: 'bg-violet-400',  border: 'border-l-violet-400',  tag: 'bg-violet-50',  tagText: 'text-violet-600',  badge: 'bg-violet-50',  badgeText: 'text-violet-500',  index: '03' },
  '通訊產業':     { dot: 'bg-teal-400',    border: 'border-l-teal-400',    tag: 'bg-teal-50',    tagText: 'text-teal-600',    badge: 'bg-teal-50',    badgeText: 'text-teal-500',    index: '04' },
  '顯示器產業':   { dot: 'bg-pink-400',    border: 'border-l-pink-400',    tag: 'bg-pink-50',    tagText: 'text-pink-600',    badge: 'bg-pink-50',    badgeText: 'text-pink-500',    index: '05' },
  '車輛產業':     { dot: 'bg-amber-400',   border: 'border-l-amber-400',   tag: 'bg-amber-50',   tagText: 'text-amber-700',   badge: 'bg-amber-50',   badgeText: 'text-amber-600',   index: '06' },
  '化學原料產業': { dot: 'bg-orange-400',  border: 'border-l-orange-400',  tag: 'bg-orange-50',  tagText: 'text-orange-600',  badge: 'bg-orange-50',  badgeText: 'text-orange-500',  index: '07' },
  '機械產業':     { dot: 'bg-slate-400',   border: 'border-l-slate-400',   tag: 'bg-slate-100',  tagText: 'text-slate-600',   badge: 'bg-slate-100',  badgeText: 'text-slate-500',   index: '08' },
  '材料產業':     { dot: 'bg-red-400',     border: 'border-l-red-400',     tag: 'bg-red-50',     tagText: 'text-red-600',     badge: 'bg-red-50',     badgeText: 'text-red-500',     index: '09' },
  '新興產業':     { dot: 'bg-purple-400',  border: 'border-l-purple-400',  tag: 'bg-purple-50',  tagText: 'text-purple-600',  badge: 'bg-purple-50',  badgeText: 'text-purple-500',  index: '10' },
}

const DEFAULT_CFG: SectorCfg = {
  dot: 'bg-slate-300', border: 'border-l-slate-300', tag: 'bg-slate-50', tagText: 'text-slate-500',
  badge: 'bg-slate-50', badgeText: 'text-slate-400', index: '—',
}

export default function IndustryPage() {
  const grouped = ALL_SUB_INDUSTRIES.reduce<Record<string, typeof ALL_SUB_INDUSTRIES>>(
    (acc, item) => {
      if (!acc[item.parentCategory]) acc[item.parentCategory] = []
      acc[item.parentCategory].push(item)
      return acc
    },
    {}
  )

  const totalCategories = Object.keys(grouped).length
  const totalIndustries = ALL_SUB_INDUSTRIES.length

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Nav */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-6 py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors font-mono text-sm">
                FinmoConf
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-800 font-semibold text-sm">產業地圖</span>
            </nav>

            {/* Sector quick-jump */}
            <nav className="hidden md:flex items-center gap-1 ml-auto" aria-label="產業分類">
              {Object.entries(grouped).map(([cat]) => {
                const cfg = SECTOR[cat] ?? DEFAULT_CFG
                return (
                  <a
                    key={cat}
                    href={`#${cfg.index}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} flex-shrink-0`} />
                    {cat}
                  </a>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div className="flex-1">
              <p className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 tracking-widest uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
                Taiwan Industry Map
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                台股產業地圖
              </h1>
              <p className="text-slate-500 text-base mt-3 leading-relaxed">
                涵蓋半導體、車輛、化工、顯示器等台灣主要產業供應鏈結構與代表廠商
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-6 shrink-0">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900 font-mono tabular-nums">{totalCategories}</p>
                <p className="text-sm text-slate-400 mt-1">大類</p>
              </div>
              <div className="w-px bg-slate-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900 font-mono tabular-nums">{totalIndustries}</p>
                <p className="text-sm text-slate-400 mt-1">子產業</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 container mx-auto px-6 py-10 max-w-5xl">
        <div className="space-y-12">
          {Object.entries(grouped).map(([category, industries]) => {
            const cfg = SECTOR[category] ?? DEFAULT_CFG

            return (
              <section key={category} id={cfg.index}>
                {/* Sector header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-sm font-medium text-slate-400 tabular-nums">
                    {cfg.index}
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot} flex-shrink-0`} />
                  <h2 className="text-xl font-semibold text-slate-800">{category}</h2>
                  <span className={`ml-auto text-xs font-mono px-2.5 py-1 rounded ${cfg.badge} ${cfg.badgeText}`}>
                    {industries.length} 產業
                  </span>
                </div>

                {/* Divider under header */}
                <div className="h-px bg-slate-200 mb-5" />

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {industries.map((industry) => (
                    <Link
                      key={industry.id}
                      href={`/industry/${industry.id}`}
                      className={`group block rounded-lg border border-slate-200 border-l-[3px] ${cfg.border} bg-white px-4 py-3.5 hover:shadow-md hover:border-slate-300 transition-all duration-150`}
                    >
                      <span className="text-base font-semibold text-slate-800 group-hover:text-slate-900 leading-snug block mb-2.5">
                        {industry.name}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {industry.representativeCompanies.slice(0, 3).map((co) => (
                          <span
                            key={co}
                            className={`inline-block text-xs font-mono px-2 py-0.5 rounded ${cfg.tag} ${cfg.tagText}`}
                          >
                            {co}
                          </span>
                        ))}
                        {industry.representativeCompanies.length > 3 && (
                          <span className="inline-block text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-400">
                            +{industry.representativeCompanies.length - 3}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-8">
        <div className="container mx-auto px-6 py-6 text-center">
          <p className="text-xs text-slate-400 font-mono">
            © {new Date().getFullYear()} FinmoConf · 台股法說會搜尋平台
          </p>
        </div>
      </footer>
    </div>
  )
}
