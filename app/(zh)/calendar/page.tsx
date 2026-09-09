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
    question: '台股行事曆法說會在哪裡看？',
    answer:
      'FinmoConf 的 /calendar 是台股行事曆法說會與國內法說會時間表。依週一至週日列出已收錄場次，可下載中英文簡報，有影片或錄音也會附上。',
  },
  {
    question: '股市行事曆和法人說明會一覽表有什麼差別？',
    answer:
      '這裡的股市行事曆就是法人說明會一覽表：同一週的上市櫃法說會，依日期排列，並連到該場中英文 PDF。',
  },
  {
    question: '今日法說會怎麼查？',
    answer:
      '打開本頁後點「跳到今天」，或直接看標示「今天」的那一段。場次在簡報入庫後才會出現。',
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

function hasLink(url?: string): boolean {
  return Boolean(url && url.trim())
}

function mediaLabel(url: string): '影片' | '錄音' {
  const lower = url.toLowerCase()
  if (/(youtube|youtu\.be|vimeo|\.mp4|webcast|livest)/.test(lower)) return '影片'
  return '錄音'
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
            <span className="text-slate-800 font-semibold">台股行事曆法說會</span>
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
                國內法說會時間表
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                {week.isCurrentWeek ? '台股行事曆法說會' : `${week.mondayYmd.slice(0, 4)} 年台股行事曆法說會`}
              </h1>
              <p className="text-slate-500 text-base mt-3 leading-relaxed max-w-2xl">
                股市行事曆 · 法人說明會一覽表。台灣時間 {week.rangeLabel}，列出已收錄場次，中英文簡報與影片可直接開啟。
              </p>
            </div>

            <div className="shrink-0">
              <p className="text-3xl font-bold text-slate-900 font-mono tabular-nums">{presentations.length}</p>
              <p className="text-sm text-slate-400 mt-1">場</p>
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

        <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              {week.rangeLabel} 台股行事曆法說會，國內法說會時間表與法人說明會一覽表
            </caption>
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                <th scope="col" className="font-medium px-5 sm:px-6 py-3">
                  公司
                </th>
                <th scope="col" className="font-medium py-3 w-16">
                  代碼
                </th>
                <th scope="col" className="hidden sm:table-cell font-medium py-3 w-12">
                  市場
                </th>
                <th scope="col" className="font-medium py-3 w-[4.75rem]">
                  中文簡報
                </th>
                <th scope="col" className="font-medium py-3 w-[4.75rem]">
                  英文簡報
                </th>
                <th scope="col" className="font-medium py-3 pr-5 sm:pr-6 w-14">
                  影片
                </th>
              </tr>
            </thead>
            {days.map((day) => (
              <DayBody key={day.ymd} day={day} events={grouped.get(day.ymd) ?? []} />
            ))}
          </table>
        </div>

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

function DayBody({ day, events }: { day: CalendarDay; events: Presentation[] }) {
  return (
    <tbody
      id={day.isToday ? 'today' : undefined}
      className={`scroll-mt-20 border-t border-slate-100 ${day.isToday ? 'bg-slate-50/80' : ''}`}
    >
      <tr>
        <th
          colSpan={6}
          scope="colgroup"
          className={`px-5 sm:px-6 pt-4 pb-2 text-left font-medium ${
            day.isToday ? 'border-l-2 border-l-slate-900' : 'border-l-2 border-l-transparent'
          }`}
        >
          <span className="font-mono text-slate-400 tabular-nums">{day.weekdayZh}</span>
          <span className="ml-3 tabular-nums text-slate-800">{day.monthDay}</span>
          {day.isToday && (
            <span className="ml-2 text-[11px] font-medium tracking-wide text-slate-500">今天</span>
          )}
          <span className="ml-3 font-mono text-xs tabular-nums text-slate-400 font-normal">
            {events.length} 場
          </span>
        </th>
      </tr>
      {events.length === 0 ? (
        <tr>
          <td colSpan={6} className="px-5 sm:px-6 pb-4 text-sm text-slate-400">
            尚無已收錄簡報
          </td>
        </tr>
      ) : (
        events.map((event) => (
          <tr key={event._id} className="hover:bg-white/80">
            <td className="px-5 sm:px-6 py-2 align-baseline">
              <Link
                href={`/presentation/${event._id}`}
                className="font-medium text-slate-800 hover:text-slate-950"
              >
                {event.companyName}
              </Link>
            </td>
            <td className="py-2 align-baseline">
              <Link
                href={`/company/${event.companyCode}`}
                className="font-mono tabular-nums text-slate-500 hover:text-slate-800"
              >
                {event.companyCode}
              </Link>
            </td>
            <td className="hidden sm:table-cell py-2 align-baseline text-xs text-slate-400">
              {TYPE_LABEL[event.typek]}
            </td>
            <td className="py-2 align-baseline">
              {hasLink(event.presentationTWUrl) ? (
                <a
                  href={event.presentationTWUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 hover:underline underline-offset-2"
                >
                  中文
                </a>
              ) : (
                <span className="text-slate-300">—</span>
              )}
            </td>
            <td className="py-2 align-baseline">
              {hasLink(event.presentationEnUrl) ? (
                <a
                  href={event.presentationEnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 hover:underline underline-offset-2"
                >
                  英文
                </a>
              ) : (
                <span className="text-slate-300">—</span>
              )}
            </td>
            <td className="py-2 pr-5 sm:pr-6 align-baseline">
              {hasLink(event.audioLinkUrl) ? (
                <a
                  href={event.audioLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 hover:underline underline-offset-2"
                >
                  {mediaLabel(event.audioLinkUrl!)}
                </a>
              ) : (
                <span className="text-slate-300">—</span>
              )}
            </td>
          </tr>
        ))
      )}
    </tbody>
  )
}
