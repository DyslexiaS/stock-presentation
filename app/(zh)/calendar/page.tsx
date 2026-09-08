import { AdBanner } from '@/components/ads/ad-banner'
import { PromotionCards } from '@/components/ui/promotion-cards'
import { loadCalendarWeek } from '@/lib/data/calendar-week'
import { addCalendarDays, groupByTaipeiDay } from '@/lib/calendar'
import { generateCalendarJsonLd, generateCalendarMetadata } from '@/lib/seo'
import type { Presentation } from '@/types'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

const DAY_STYLE: Record<number, { header: string; text: string; column: string }> = {
  1: { header: 'bg-blue-100', text: 'text-blue-800', column: 'bg-blue-50/70' },
  2: { header: 'bg-emerald-100', text: 'text-emerald-800', column: 'bg-emerald-50/70' },
  3: { header: 'bg-violet-100', text: 'text-violet-800', column: 'bg-violet-50/70' },
  4: { header: 'bg-amber-100', text: 'text-amber-900', column: 'bg-amber-50/70' },
  5: { header: 'bg-rose-100', text: 'text-rose-800', column: 'bg-rose-50/70' },
  6: { header: 'bg-slate-200', text: 'text-slate-700', column: 'bg-slate-50' },
  0: { header: 'bg-slate-200', text: 'text-slate-700', column: 'bg-slate-50' },
}

const TYPE_LABEL: Record<Presentation['typek'], string> = {
  sii: '上市',
  otc: '上櫃',
  rotc: '興櫃',
}

const CALENDAR_FAQS = [
  {
    question: '本週法說會有哪些？',
    answer:
      '本頁依台灣時間週一至週日，列出本週已收錄的上市櫃法說會簡報。點公司名稱可看該場 PDF，也可從公司頁查看歷年法說會。',
  },
  {
    question: '法說會時程、法說會行事曆在哪裡看？',
    answer:
      'FinmoConf 的 /calendar 就是本週台股法說會時程。資料來自已入庫的活動日期，每小時更新一次。',
  },
  {
    question: '今日法說會怎麼查？',
    answer:
      '打開本週時程頁，標示「今天」的那一欄就是今日法說會。場次在簡報入庫後才會出現。',
  },
  {
    question: '為什麼有些場次還沒出現？',
    answer:
      '這裡列出的是已有簡報可查的場次。公司尚未公告 PDF 的預告場次不會顯示，開完並入庫後就會出現在對應日期。',
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
  const weekdayDays = week.days.filter((day) => !day.isWeekend)
  const weekendDays = week.days.filter((day) => day.isWeekend)
  const weekendCount = weekendDays.reduce((sum, day) => sum + (grouped.get(day.ymd)?.length ?? 0), 0)
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

      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm py-4">
            <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors font-mono">
              FinmoConf
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">本週法說會時程</span>
            <div className="ml-auto hidden sm:flex items-center gap-4 text-sm">
              <Link href="/industry" className="text-slate-400 hover:text-slate-600 transition-colors">
                產業地圖
              </Link>
              <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors">
                搜尋簡報
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 py-10 max-w-7xl">
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
            本週法說會 · 法說會行事曆
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            {week.isCurrentWeek ? '本週台股法說會時程' : `${week.mondayYmd.slice(0, 4)}年當週法說會時程`}
          </h1>
          <p className="text-slate-500 text-base mt-3 leading-relaxed max-w-3xl">
            {week.rangeLabel}（週一至週日，台灣時間）共 {presentations.length} 場已收錄簡報。
            場次在公司公告 PDF 後才會出現，不是尚未開完的預告表。
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Link
              href={`/calendar?from=${prevFrom}`}
              className="text-sm text-slate-500 hover:text-slate-800 border border-slate-200 bg-white rounded-lg px-3 py-1.5"
              rel="nofollow"
            >
              ← 上一週
            </Link>
            {week.isCurrentWeek ? (
              <span className="text-sm font-medium text-slate-800 px-3 py-1.5">本週 {week.rangeLabel}</span>
            ) : (
              <Link
                href="/calendar"
                className="text-sm font-medium text-slate-800 hover:text-slate-950 border border-slate-200 bg-white rounded-lg px-3 py-1.5"
              >
                回到本週
              </Link>
            )}
            <Link
              href={`/calendar?from=${nextFrom}`}
              className="text-sm text-slate-500 hover:text-slate-800 border border-slate-200 bg-white rounded-lg px-3 py-1.5"
              rel="nofollow"
            >
              下一週 →
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <section aria-label="本週一至週五法說會">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
                {weekdayDays.map((day) => {
                  const events = grouped.get(day.ymd) ?? []
                  const style = DAY_STYLE[day.weekday]
                  return (
                    <DayColumn
                      key={day.ymd}
                      weekdayZh={day.weekdayZh}
                      monthDay={day.monthDay}
                      isToday={day.isToday}
                      count={events.length}
                      events={events}
                      headerClass={style.header}
                      textClass={style.text}
                      columnClass={style.column}
                    />
                  )
                })}
              </div>
            </section>

            {weekendCount > 0 && (
              <section aria-label="週末法說會">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">週末場次</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {weekendDays.map((day) => {
                    const events = grouped.get(day.ymd) ?? []
                    const style = DAY_STYLE[day.weekday]
                    return (
                      <DayColumn
                        key={day.ymd}
                        weekdayZh={day.weekdayZh}
                        monthDay={day.monthDay}
                        isToday={day.isToday}
                        count={events.length}
                        events={events}
                        headerClass={style.header}
                        textClass={style.text}
                        columnClass={style.column}
                      />
                    )
                  })}
                </div>
              </section>
            )}

            {presentations.length === 0 && (
              <p className="rounded-xl border border-slate-200 bg-white px-5 py-8 text-center text-slate-500">
                這一週還沒有已收錄的法說會簡報。法說旺季過後常會較少，可看上一週或回首頁搜尋公司。
              </p>
            )}

            <section className="pt-4">
              <h2 className="text-lg font-semibold text-slate-700 mb-4">常見問題</h2>
              <div className="space-y-2">
                {CALENDAR_FAQS.map((faq) => (
                  <details
                    key={faq.question}
                    className="rounded-lg border border-slate-200 bg-white overflow-hidden group"
                  >
                    <summary className="cursor-pointer px-5 py-4 text-base font-medium text-slate-800 select-none list-none flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                      <span>{faq.question}</span>
                      <span className="text-slate-400 shrink-0 group-open:rotate-180 transition-transform duration-200">
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
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <PromotionCards />
              <AdBanner
                slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || '9966506770'}
                format="auto"
                className="w-full"
                style={{ minHeight: '250px', maxHeight: '250px' }}
              />
            </div>
          </aside>
        </div>
      </main>

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

function DayColumn({
  weekdayZh,
  monthDay,
  isToday,
  count,
  events,
  headerClass,
  textClass,
  columnClass,
}: {
  weekdayZh: string
  monthDay: string
  isToday: boolean
  count: number
  events: Presentation[]
  headerClass: string
  textClass: string
  columnClass: string
}) {
  return (
    <section
      className={`rounded-xl border border-slate-200 overflow-hidden ${isToday ? 'ring-2 ring-slate-400 ring-offset-1' : ''}`}
    >
      <header className={`${headerClass} ${textClass} px-3 py-2.5`}>
        <p className="text-sm font-semibold">
          {weekdayZh} {monthDay}
          {isToday ? ' · 今天' : ''}
        </p>
        <p className="text-xs mt-0.5 opacity-80">{count} 場</p>
      </header>
      <div className={`${columnClass} px-2 py-2 min-h-[8rem] space-y-2`}>
        {events.length === 0 ? (
          <p className="text-xs text-slate-400 px-1 py-2">尚無已收錄簡報</p>
        ) : (
          events.map((event) => (
            <Link
              key={event._id}
              href={`/presentation/${event._id}`}
              className="block rounded-lg border border-slate-200/80 bg-white px-2.5 py-2 hover:border-slate-400 hover:shadow-sm transition-colors"
            >
              <p className="text-sm font-semibold text-slate-800 leading-snug">{event.companyName}</p>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                {event.companyCode}
                <span className="mx-1 text-slate-300">·</span>
                {TYPE_LABEL[event.typek]}
              </p>
            </Link>
          ))
        )}
      </div>
    </section>
  )
}
