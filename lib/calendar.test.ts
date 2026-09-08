import { describe, expect, test } from 'bun:test'
import {
  addCalendarDays,
  formatTaipeiYmd,
  getCalendarWeek,
  getWeekMondayYmd,
  parseWeekAnchor,
  taipeiWeekday,
} from './calendar'

describe('Taipei calendar week', () => {
  test('maps Tuesday 8 Sep 2026 Taipei to Monday 7 Sep', () => {
    const tue = new Date('2026-09-08T04:00:00+08:00')
    expect(formatTaipeiYmd(tue)).toBe('2026-09-08')
    expect(taipeiWeekday(tue)).toBe(2)
    expect(getWeekMondayYmd(tue)).toBe('2026-09-07')

    const week = getCalendarWeek(tue, tue)
    expect(week.mondayYmd).toBe('2026-09-07')
    expect(week.sundayYmd).toBe('2026-09-13')
    expect(week.isCurrentWeek).toBe(true)
    expect(week.days.map((d) => d.ymd)).toEqual([
      '2026-09-07',
      '2026-09-08',
      '2026-09-09',
      '2026-09-10',
      '2026-09-11',
      '2026-09-12',
      '2026-09-13',
    ])
    expect(week.days[1].isToday).toBe(true)
    expect(week.start.toISOString()).toBe('2026-09-06T16:00:00.000Z')
    expect(week.end.toISOString()).toBe('2026-09-13T16:00:00.000Z')
  })

  test('keeps Sunday in the week that started the previous Monday', () => {
    const sun = new Date('2026-09-13T23:30:00+08:00')
    expect(getWeekMondayYmd(sun)).toBe('2026-09-07')
  })

  test('starts the next week on Monday', () => {
    const mon = new Date('2026-09-14T00:00:00+08:00')
    expect(getWeekMondayYmd(mon)).toBe('2026-09-14')
  })

  test('addCalendarDays crosses month boundaries', () => {
    expect(addCalendarDays('2026-08-31', 1)).toBe('2026-09-01')
    expect(addCalendarDays('2026-09-07', -7)).toBe('2026-08-31')
  })

  test('parseWeekAnchor rejects junk and out-of-range years', () => {
    expect(parseWeekAnchor(null)).toBeNull()
    expect(parseWeekAnchor('09-08')).toBeNull()
    expect(parseWeekAnchor('1999-01-01')).toBeNull()
    expect(parseWeekAnchor('2026-09-08')?.toISOString()).toBe('2026-09-08T04:00:00.000Z')
  })
})
