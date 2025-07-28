import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Presentation from '@/lib/models/Presentation'
import mongoose from 'mongoose'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()

    const { id } = await params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid presentation ID' },
        { status: 400 }
      )
    }

    const presentation = await Presentation.findById(id).lean()

    if (!presentation) {
      return NextResponse.json(
        { error: 'Presentation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: presentation })

  } catch (error) {
    console.error('Get presentation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}