import { loadCalendarWeek } from '@/lib/data/calendar-week'
import { addCalendarDays, groupByTaipeiDay, type CalendarDay } from '@/lib/calendar'
import { generateCalendarJsonLd, generateCalendarMetadata } from '@/lib/seo'
import type { Presentation } from '@/types'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

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
      '打開本週時程頁，標示「今天」的那一段就是今日法說會。場次在簡報入庫後才會出現。',
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
  const days = week.days.filter((day) => !day.isWeekend || (grouped.get(day.ymd)?.length ?? 0) > 0)
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
          <nav className="flex items-center gap-2 text-sm py-4 max-w-5xl mx-auto">
            <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors font-mono">
              FinmoConf
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">本週法說會時程</span>
            <div className="ml-auto hidden sm:flex items-center gap-5">
              <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors">
                搜尋簡報
              </Link>
              <Link href="/industry" className="text-slate-400 hover:text-slate-600 transition-colors">
                產業地圖
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div className="flex-1">
              <p className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 tracking-widest uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
                法說會行事曆
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                {week.isCurrentWeek ? '本週法說會時程' : `${week.mondayYmd.slice(0, 4)}年當週時程`}
              </h1>
              <p className="text-slate-500 text-base mt-3 leading-relaxed max-w-xl">
                台灣時間 {week.rangeLabel}。列出已收錄簡報的場次，不是尚未公告的預告。
              </p>
            </div>

            <div className="flex items-end gap-8 shrink-0">
              <div>
                <p className="text-3xl font-bold text-slate-900 font-mono tabular-nums">{presentations.length}</p>
                <p className="text-sm text-slate-400 mt-1">場</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 pt-5 border-t border-slate-100 text-sm">
            <Link href={`/calendar?from=${prevFrom}`} className="text-slate-400 hover:text-slate-800" rel="nofollow">
              上一週
            </Link>
            {week.isCurrentWeek ? (
              <span className="text-slate-800 font-medium">本週 {week.rangeLabel}</span>
            ) : (
              <Link href="/calendar" className="text-slate-800 font-medium hover:text-slate-950">
                回到本週
              </Link>
            )}
            <Link href={`/calendar?from=${nextFrom}`} className="text-slate-400 hover:text-slate-800" rel="nofollow">
              下一週
            </Link>
            {week.isCurrentWeek && (
              <a href="#today" className="ml-auto text-slate-400 hover:text-slate-800">
                跳到今天
              </a>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-6 py-10 max-w-5xl">
        {presentations.length === 0 && (
          <p className="text-slate-500 text-sm mb-8">
            這一週還沒有已收錄的法說會簡報。法說旺季過後常會較少，可看上一週或回首頁搜尋公司。
          </p>
        )}

        <ol className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100">
          {days.map((day) => (
            <DayRow key={day.ymd} day={day} events={grouped.get(day.ymd) ?? []} />
          ))}
        </ol>

        <section className="mt-14">
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

function DayRow({ day, events }: { day: CalendarDay; events: Presentation[] }) {
  return (
    <li
      id={day.isToday ? 'today' : undefined}
      className={`px-5 sm:px-6 py-5 scroll-mt-20 border-l-2 ${
        day.isToday ? 'bg-slate-50/80 border-l-slate-900' : 'border-l-transparent'
      }`}
    >
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h2 className="text-sm font-medium text-slate-800">
          <span className="font-mono text-slate-400 tabular-nums">{day.weekdayZh}</span>
          <span className="ml-3 tabular-nums">{day.monthDay}</span>
          {day.isToday && (
            <span className="ml-2 text-[11px] font-medium tracking-wide text-slate-500">今天</span>
          )}
        </h2>
        <p className="font-mono text-xs tabular-nums text-slate-400">{events.length} 場</p>
      </div>

      {events.length === 0 ? (
        <p className="text-sm text-slate-400">尚無已收錄簡報</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <Link
                href={`/presentation/${event._id}`}
                className="flex items-baseline gap-3 sm:gap-4 py-2 -mx-2 px-2 rounded-md hover:bg-white hover:shadow-[inset_0_0_0_1px_rgb(226_232_240)] transition-colors"
              >
                <span className="flex-1 min-w-0 text-slate-800 font-medium leading-snug">
                  {event.companyName}
                </span>
                <span className="font-mono text-sm tabular-nums text-slate-500 shrink-0">
                  {event.companyCode}
                </span>
                <span className="hidden sm:inline text-xs text-slate-400 w-10 text-right shrink-0">
                  {TYPE_LABEL[event.typek]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
