import { cache } from 'react'
import PresentationModel from '@/lib/models/Presentation'
import dbConnect from '@/lib/mongodb'
import { getCalendarWeek, parseWeekAnchor, type CalendarWeek } from '@/lib/calendar'
import type { Presentation } from '@/types'

export type CalendarWeekData = {
  week: CalendarWeek
  presentations: Presentation[]
}

function serialize(doc: Record<string, unknown>): Presentation {
  const eventDate = doc.eventDate as Date
  const createdAt = (doc.createdAt as Date | undefined) ?? eventDate
  return {
    _id: String(doc._id),
    companyCode: String(doc.companyCode),
    companyName: String(doc.companyName),
    eventDate: eventDate.toISOString(),
    presentationTWUrl: String(doc.presentationTWUrl ?? ''),
    presentationEnUrl: String(doc.presentationEnUrl ?? ''),
    audioLinkUrl: doc.audioLinkUrl ? String(doc.audioLinkUrl) : undefined,
    typek: doc.typek as Presentation['typek'],
    createdAt: createdAt.toISOString(),
    updatedAt: doc.updatedAt ? (doc.updatedAt as Date).toISOString() : undefined,
    slug: doc.slug ? String(doc.slug) : undefined,
    keywords: Array.isArray(doc.keywords) ? (doc.keywords as string[]) : undefined,
    description: doc.description ? String(doc.description) : undefined,
    presentationContent: doc.presentationContent ? String(doc.presentationContent) : undefined,
  }
}

export const loadCalendarWeek = cache(async (from?: string | null): Promise<CalendarWeekData> => {
  const anchor = parseWeekAnchor(from) ?? new Date()
  const week = getCalendarWeek(anchor)

  try {
    await dbConnect()
    const rows = await PresentationModel.find({
      eventDate: { $gte: week.start, $lt: week.end },
    })
      .sort({ eventDate: 1, companyCode: 1 })
      .limit(500)
      .maxTimeMS(5000)
      .lean()
      .exec()

    return {
      week,
      presentations: rows.map((row) => serialize(row as Record<string, unknown>)),
    }
  } catch (error) {
    console.error('Error fetching calendar week:', error)
    return { week, presentations: [] }
  }
})
