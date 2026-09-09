import type { CalendarDay } from '@/lib/calendar'
import type { Presentation } from '@/types'
import Link from 'next/link'

const TYPE_LABEL: Record<Presentation['typek'], string> = {
  sii: '上市',
  otc: '上櫃',
  rotc: '興櫃',
}

const chipClass =
  'inline-flex items-center h-6 px-2 rounded-md border border-slate-300 bg-white text-[11px] font-medium text-slate-800 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-colors'

export type WeekGlanceDay = CalendarDay & {
  events: Presentation[]
}

export function WeekGlance({ days }: { days: WeekGlanceDay[] }) {
  const weekdays = days.filter((day) => !day.isWeekend)
  const weekend = days.filter((day) => day.isWeekend && (day.isToday || day.events.length > 0))

  return (
    <div>
      <nav
        aria-label="本週日期"
        className="md:hidden sticky top-[57px] z-10 -mx-6 px-4 py-2 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200"
      >
        <div className={`grid gap-1 ${weekend.length > 0 ? 'grid-cols-7' : 'grid-cols-5'}`}>
          {[...weekdays, ...weekend].map((day) => (
            <a
              key={day.ymd}
              href={day.isToday ? '#today' : `#day-${day.ymd}`}
              className={`flex flex-col items-center rounded-md py-1.5 px-0.5 text-center leading-tight ${
                day.isToday
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-700'
              }`}
              aria-current={day.isToday ? 'date' : undefined}
            >
              <span className="text-[11px]">{day.weekdayZh.replace('週', '')}</span>
              <span className="font-mono text-xs tabular-nums">{day.monthDay.split('/')[1]}</span>
              <span
                className={`font-mono text-[10px] tabular-nums ${
                  day.isToday ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {day.events.length}
              </span>
            </a>
          ))}
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-5 md:items-start gap-2 md:gap-2 mt-3 md:mt-0">
        {weekdays.map((day) => (
          <DayColumn key={day.ymd} day={day} />
        ))}
      </div>

      {weekend.length > 0 && (
        <div className="mt-2 space-y-2">
          {weekend.map((day) => (
            <DayColumn key={day.ymd} day={day} />
          ))}
        </div>
      )}
    </div>
  )
}

function DayColumn({ day }: { day: WeekGlanceDay }) {
  return (
    <section
      id={day.isToday ? 'today' : `day-${day.ymd}`}
      className={`scroll-mt-28 md:scroll-mt-20 rounded-lg border overflow-hidden ${
        day.isToday ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white'
      }`}
    >
      <header className="flex items-baseline justify-between gap-2 px-3 py-2 border-b border-slate-200 bg-white">
        <h2 className="text-sm font-semibold text-slate-900">
          <span className="text-slate-500">{day.weekdayZh}</span>
          <span className="ml-1.5 font-mono tabular-nums">{day.monthDay}</span>
          {day.isToday && (
            <span className="ml-1.5 inline-flex items-center h-5 px-1.5 rounded bg-slate-900 text-[10px] font-medium tracking-wide text-white align-middle">
              今天
            </span>
          )}
        </h2>
        <p className="font-mono text-xs tabular-nums text-slate-500">{day.events.length}</p>
      </header>

      {day.events.length === 0 ? (
        <p className="px-3 py-2 text-sm text-slate-500">尚無</p>
      ) : (
        <ul className="md:max-h-[min(32rem,60vh)] md:overflow-y-auto">
          {day.events.map((event) => (
            <EventRow key={event._id} event={event} />
          ))}
        </ul>
      )}
    </section>
  )
}

function hasLink(url?: string): boolean {
  return Boolean(url && url.trim())
}

function mediaLabel(url: string): '影片' | '錄音' {
  const lower = url.toLowerCase()
  if (/(youtube|youtu\.be|vimeo|\.mp4|webcast|livest)/.test(lower)) return '影片'
  return '錄音'
}

function EventRow({ event }: { event: Presentation }) {
  const files = [
    hasLink(event.presentationTWUrl) ? { href: event.presentationTWUrl, label: '中文' } : null,
    hasLink(event.presentationEnUrl) ? { href: event.presentationEnUrl, label: '英文' } : null,
    hasLink(event.audioLinkUrl)
      ? { href: event.audioLinkUrl!, label: mediaLabel(event.audioLinkUrl!) }
      : null,
  ].filter((item): item is { href: string; label: string } => item !== null)

  return (
    <li className="px-3 py-2 border-t border-slate-100 first:border-t-0">
      <div className="flex items-baseline gap-1.5 min-w-0">
        <Link
          href={`/presentation/${event._id}`}
          className="font-semibold text-sm text-slate-900 hover:underline underline-offset-2 truncate"
        >
          {event.companyName}
        </Link>
        <Link
          href={`/company/${event.companyCode}`}
          className="font-mono text-xs tabular-nums text-slate-600 hover:text-slate-900 hover:underline underline-offset-2"
        >
          {event.companyCode}
        </Link>
        <span className="text-[11px] text-slate-500">{TYPE_LABEL[event.typek]}</span>
      </div>

      {files.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {files.map((file) => (
            <a
              key={file.label}
              href={file.href}
              target="_blank"
              rel="noopener noreferrer"
              className={chipClass}
            >
              {file.label}
            </a>
          ))}
        </div>
      )}
    </li>
  )
}
