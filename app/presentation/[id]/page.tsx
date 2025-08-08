import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import dbConnect from '@/lib/mongodb'
import PresentationModel from '@/lib/models/Presentation'
import { generatePresentationMetadata, generateStructuredData, generateBreadcrumbData } from '@/lib/seo'

import PresentationDetailPage from './presentation-detail'
import { Presentation } from '@/types'

interface Props {
  params: Promise<{ id: string }>
}

async function getPresentation(id: string): Promise<Presentation | null> {
  try {
    await dbConnect()
    const result = await PresentationModel.findById(id).lean()
    
    // Handle the case where result could be null
    if (!result || Array.isArray(result)) return null
    
    // Properly type the Mongoose document without using 'any'
    const doc = result as unknown as {
      _id: { toString(): string }
      companyCode: string
      companyName: string
      eventDate: Date
      presentationTWUrl: string
      presentationEnUrl: string
      audioLinkUrl?: string
      typek: 'sii' | 'otc' | 'rotc'
      createdAt: Date
      updatedAt?: Date
      slug?: string
      keywords?: string[]
      description?: string
    }
    
    // Convert to Presentation type
    return {
      _id: doc._id.toString(),
      companyCode: doc.companyCode,
      companyName: doc.companyName,
      eventDate: doc.eventDate.toISOString(),
      presentationTWUrl: doc.presentationTWUrl,
      presentationEnUrl: doc.presentationEnUrl,
      audioLinkUrl: doc.audioLinkUrl,
      typek: doc.typek,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt?.toISOString(),
      slug: doc.slug,
      keywords: doc.keywords,
      description: doc.description
    }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const presentation = await getPresentation(id)
  
  if (!presentation) {
    return {
      title: '法說會不存在 | FinmoConf - 台股法說會搜尋',
      description: '找不到指定的法說會資料',
      robots: { index: false, follow: false },
    }
  }

  return generatePresentationMetadata(presentation)
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const presentation = await getPresentation(id)
  
  if (!presentation) {
    notFound()
  }

  const structuredData = generateStructuredData(presentation)
  const breadcrumbData = generateBreadcrumbData(presentation)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
      <PresentationDetailPage presentation={presentation} />
    </>
  )
}