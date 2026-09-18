import { WeekGlance } from '@/components/calendar/week-glance'
import { GooglePreferredSource } from '@/components/google-preferred-source'
import { addCalendarDays, formatWeekRangeZh, groupByTaipeiDay } from '@/lib/calendar'
import { loadCalendarWeek } from '@/lib/data/calendar-week'
import { generateCalendarJsonLd, generateCalendarMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

const CALENDAR_FAQS = [
  {
    question: '法說會行事曆在哪裡看？',
    answer:
      'FinmoConf 的 /calendar 就是法說會行事曆與法說會時間表。依週一至週日列出已收錄場次，可下載中英文簡報，有影片或錄音也會附上。',
  },
  {
    question: '近期法說會一覽表怎麼查？',
    answer:
      '打開本頁即可看本週近期法說會一覽表。電腦版一週五天並排，手機點上方日期。場次在簡報入庫後才會出現。',
  },
  {
    question: '台股行事曆和公開資訊觀測站法說會一覽表有什麼不同？',
    answer:
      '公開資訊觀測站法說會一覽表是官方公告。這裡的台股行事曆只列已有簡報可查的場次，同一頁就能開中英文 PDF，不必再到觀測站另找檔案。',
  },
  {
    question: '今日法說會怎麼查？',
    answer:
      '電腦版看標示「今天」的那一欄。手機先看上方日期列，再點「跳到今天」或「今天」那格。',
  },
]

type PageProps = {
  searchParams: Promise<{ from?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { from } = await searchParams
  const { week, presentations } = await loadCalendarWeek(from)
  return generateCalendarMetadata({
    rangeLabel: week.rangeLabel,
    mondayYmd: week.mondayYmd,
    count: presentations.length,
    isCurrentWeek: week.isCurrentWeek,
    companyPreview: presentations.map((item) => `${item.companyName}(${item.companyCode})`),
  })
}

export default async function CalendarPage({ searchParams }: PageProps) {
  const { from } = await searchParams
  const { week, presentations } = await loadCalendarWeek(from)
  const grouped = groupByTaipeiDay(presentations)
  const days = week.days.map((day) => ({
    ...day,
    events: grouped.get(day.ymd) ?? [],
  }))
  const weekRangeZh = formatWeekRangeZh(week.mondayYmd, week.sundayYmd)
  const year = week.mondayYmd.slice(0, 4)
  const prevFrom = addCalendarDays(week.mondayYmd, -7)
  const nextFrom = addCalendarDays(week.mondayYmd, 7)
  const jsonLd = generateCalendarJsonLd({
    rangeLabel: week.rangeLabel,
    mondayYmd: week.mondayYmd,
    count: presentations.length,
    presentations,
  })
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CALENDAR_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />

      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm py-4 max-w-6xl mx-auto">
            <Link href="/" className="text-slate-500 hover:text-slate-800 transition-colors font-mono">
              FinmoConf
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold">法說會行事曆</span>
            <div className="ml-auto flex items-center gap-3 sm:gap-5">
              <Link href="/" className="hidden sm:inline text-slate-500 hover:text-slate-800 transition-colors">
                搜尋簡報
              </Link>
              <Link href="/industry" className="hidden sm:inline text-slate-500 hover:text-slate-800 transition-colors">
                產業地圖
              </Link>
              <GooglePreferredSource lang="zh-TW" className="flex shrink-0" />
            </div>
          </nav>
        </div>
      </header>

      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-6 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex-1">
              <p className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-2">
                <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                台股行事曆 {year}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                {week.isCurrentWeek ? '法說會行事曆' : `${year} 年法說會行事曆`}
              </h1>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed max-w-2xl">
                法說會時間表 · 近期法說會一覽表。台灣時間 {weekRangeZh}。公開資訊觀測站法說會一覽表是官方公告；這裡列出已有簡報的場次，可直接開啟。
              </p>
            </div>

            <div className="shrink-0">
              <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums">{presentations.length}</p>
              <p className="text-xs text-slate-500 mt-0.5">場</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 pt-4 border-t border-slate-200 text-sm">
            <Link href={`/calendar?from=${prevFrom}`} className="text-slate-600 hover:text-slate-900" rel="nofollow">
              上一週
            </Link>
            {week.isCurrentWeek ? (
              <span className="text-slate-900 font-medium">本週 {weekRangeZh}</span>
            ) : (
              <Link href="/calendar" className="text-slate-900 font-medium hover:text-slate-950">
                回到本週
              </Link>
            )}
            <Link href={`/calendar?from=${nextFrom}`} className="text-slate-600 hover:text-slate-900" rel="nofollow">
              下一週
            </Link>
            {week.isCurrentWeek && (
              <a
                href="#today"
                className="ml-auto inline-flex items-center h-8 px-3 rounded-md border border-slate-300 bg-white text-slate-800 font-medium hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
              >
                跳到今天
              </a>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-6 py-6 max-w-6xl">
        {presentations.length === 0 && (
          <p className="text-slate-600 text-sm mb-6">
            這一週還沒有已收錄的法說會簡報。法說旺季過後常會較少，可看上一週或回首頁搜尋公司。
          </p>
        )}

        <WeekGlance days={days} />

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">常見問題</h2>
          <div className="space-y-2">
            {CALENDAR_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="rounded-lg border border-slate-200 bg-white overflow-hidden group"
              >
                <summary className="cursor-pointer px-5 py-4 text-base font-medium text-slate-800 select-none list-none flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                  <span>{faq.question}</span>
                  <span className="text-slate-500 shrink-0 group-open:rotate-180 transition-transform duration-200">
                    ▾
                  </span>
                </summary>
                <p className="px-5 pb-4 text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-8">
        <div className="container mx-auto px-6 py-6 text-center">
          <p className="text-xs text-slate-500 font-mono">
            © {new Date().getFullYear()} FinmoConf · 台股法說會搜尋平台
          </p>
        </div>
      </footer>
    </div>
  )
}
