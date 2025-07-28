import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Presentation from '@/lib/models/Presentation'

interface MongoFilter {
  typek?: string
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type')

    const query: MongoFilter = {}
    
    // Filter by type if specified
    if (type && ['sii', 'otc', 'rotc'].includes(type)) {
      query.typek = type
    }

    const presentations = await Presentation.find(query)
      .sort({ eventDate: -1, createdAt: -1 })
      .limit(limit)
      .lean()

    return NextResponse.json({
      data: presentations,
      total: presentations.length
    })

  } catch (error) {
    console.error('Recent presentations API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}