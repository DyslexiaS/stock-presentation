import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Presentation from '@/lib/models/Presentation'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyCode: string }> }
) {
  try {
    await dbConnect()

    const { companyCode } = await params
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    const [presentations, total] = await Promise.all([
      Presentation.find({ companyCode })
        .sort({ eventDate: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Presentation.countDocuments({ companyCode })
    ])

    if (presentations.length === 0) {
      return NextResponse.json(
        { error: 'No presentations found for this company' },
        { status: 404 }
      )
    }

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
    console.error('Get company presentations API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}