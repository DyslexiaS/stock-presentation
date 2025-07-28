import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import dbConnect from '@/lib/mongodb'
import Presentation from '@/lib/models/Presentation'
import { generateSEOTitle, generateSEODescription, generateKeywords, generateStructuredData, generateBreadcrumbData } from '@/lib/seo'
import PresentationDetailPage from './presentation-detail'

interface Props {
  params: Promise<{ id: string }>
}

async function getPresentation(id: string): Promise<any> {
  try {
    await dbConnect()
    const presentation = await Presentation.findById(id).lean()
    return presentation
  } catch (error) {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const presentation = await getPresentation(id)
  
  if (!presentation) {
    return {
      title: '法說會不存在 | 台股法說會搜尋',
      description: '找不到指定的法說會資料'
    }
  }

  const title = generateSEOTitle(presentation)
  const description = generateSEODescription(presentation)
  const keywords = generateKeywords(presentation)

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: presentation.eventDate,
      authors: [presentation.companyName],
      tags: keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}/presentation/${id}`
    }
  }
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