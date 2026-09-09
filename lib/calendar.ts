/** Taipei calendar helpers. Taiwan has no DST; civil dates are UTC+8. */

export const TAIPEI_TZ = 'Asia/Taipei'

const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
export const WEEKDAY_ZH = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'] as const

export type CalendarDay = {
  ymd: string
  weekday: number
  weekdayZh: string
  monthDay: string
  isToday: boolean
  isWeekend: boolean
}

export type CalendarWeek = {
  mondayYmd: string
  sundayYmd: string
  start: Date
  end: Date
  days: CalendarDay[]
  rangeLabel: string
  isCurrentWeek: boolean
}

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

export function formatTaipeiYmd(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TAIPEI_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

export function taipeiWeekday(date: Date): number {
  const short = new Intl.DateTimeFormat('en-US', {
    timeZone: TAIPEI_TZ,
    weekday: 'short',
  }).format(date)
  const index = WEEKDAY_SHORT.indexOf(short as (typeof WEEKDAY_SHORT)[number])
  return index === -1 ? 0 : index
}

export function addCalendarDays(ymd: string, days: number): string {
  const [year, month, day] = ymd.split('-').map(Number)
  const next = new Date(Date.UTC(year, month - 1, day + days))
  return `${next.getUTCFullYear()}-${pad2(next.getUTCMonth() + 1)}-${pad2(next.getUTCDate())}`
}

export function taipeiDayStart(ymd: string): Date {
  return new Date(`${ymd}T00:00:00+08:00`)
}

export function getWeekMondayYmd(anchor: Date): string {
  const ymd = formatTaipeiYmd(anchor)
  const weekday = taipeiWeekday(anchor)
  const offset = weekday === 0 ? -6 : 1 - weekday
  return addCalendarDays(ymd, offset)
}

export function parseWeekAnchor(from?: string | null): Date | null {
  if (!from) return null
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from)) return null
  const date = new Date(`${from}T12:00:00+08:00`)
  if (Number.isNaN(date.getTime())) return null
  const year = Number(from.slice(0, 4))
  if (year < 2010 || year > 2035) return null
  return date
}

export function getCalendarWeek(anchor: Date = new Date(), now: Date = new Date()): CalendarWeek {
  const mondayYmd = getWeekMondayYmd(anchor)
  const sundayYmd = addCalendarDays(mondayYmd, 6)
  const start = taipeiDayStart(mondayYmd)
  const end = taipeiDayStart(addCalendarDays(mondayYmd, 7))
  const todayYmd = formatTaipeiYmd(now)
  const currentMonday = getWeekMondayYmd(now)

  const days: CalendarDay[] = Array.from({ length: 7 }, (_, i) => {
    const ymd = addCalendarDays(mondayYmd, i)
    const weekday = taipeiWeekday(taipeiDayStart(ymd))
    const [, month, day] = ymd.split('-')
    return {
      ymd,
      weekday,
      weekdayZh: WEEKDAY_ZH[weekday],
      monthDay: `${Number(month)}/${Number(day)}`,
      isToday: ymd === todayYmd,
      isWeekend: weekday === 0 || weekday === 6,
    }
  })

  return {
    mondayYmd,
    sundayYmd,
    start,
    end,
    days,
    rangeLabel: `${days[0].monthDay}–${days[6].monthDay}`,
    isCurrentWeek: mondayYmd === currentMonday,
  }
}

/** 9月7–13日；跨月時寫成 8月31日–9月6日 */
export function formatWeekRangeZh(mondayYmd: string, sundayYmd: string): string {
  const [y1, m1, d1] = mondayYmd.split('-').map(Number)
  const [y2, m2, d2] = sundayYmd.split('-').map(Number)
  if (y1 !== y2) return `${y1}年${m1}月${d1}日–${y2}年${m2}月${d2}日`
  if (m1 !== m2) return `${m1}月${d1}日–${m2}月${d2}日`
  return `${m1}月${d1}–${d2}日`
}

export function groupByTaipeiDay<T extends { eventDate: string | Date }>(items: T[]): Map<string, T[]> {
  const grouped = new Map<string, T[]>()
  for (const item of items) {
    const ymd = formatTaipeiYmd(new Date(item.eventDate))
    const list = grouped.get(ymd)
    if (list) list.push(item)
    else grouped.set(ymd, [item])
  }
  return grouped
}
