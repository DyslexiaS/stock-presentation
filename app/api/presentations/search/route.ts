import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Presentation from '@/lib/models/Presentation'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')
    const companyCode = searchParams.get('companyCode')
    const companyName = searchParams.get('companyName')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const type = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Build search query
    const query: any = {}

    // Text search
    if (q) {
      query.$or = [
        { companyCode: { $regex: q, $options: 'i' } },
        { companyName: { $regex: q, $options: 'i' } },
      ]
    }

    // Company code search
    if (companyCode) {
      query.companyCode = { $regex: companyCode, $options: 'i' }
    }

    // Company name search
    if (companyName) {
      query.companyName = { $regex: companyName, $options: 'i' }
    }

    // Date range search
    if (dateFrom || dateTo) {
      query.eventDate = {}
      if (dateFrom) {
        query.eventDate.$gte = new Date(dateFrom)
      }
      if (dateTo) {
        query.eventDate.$lte = new Date(dateTo + 'T23:59:59.999Z')
      }
    }

    // Type filter
    if (type && ['sii', 'otc', 'rotc'].includes(type)) {
      query.typek = type
    }

    // Execute search with pagination
    const skip = (page - 1) * limit
    
    const [presentations, total] = await Promise.all([
      Presentation.find(query)
        .sort({ eventDate: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Presentation.countDocuments(query)
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      data: presentations,
      pagination: {
        page,
        limit,
        total,
        pages: totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}