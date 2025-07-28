import { MetadataRoute } from 'next'
import dbConnect from '@/lib/mongodb'
import Presentation from '@/lib/models/Presentation'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  
  try {
    await dbConnect()
    
    // Get all presentations for dynamic URLs
    const presentations = await Presentation.find({})
      .select('_id companyCode eventDate updatedAt')
      .lean()

    // Static URLs with enhanced SEO
    const staticUrls = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/search`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      },
    ]

    // Dynamic presentation URLs
    const presentationUrls = presentations.map((presentation) => ({
      url: `${baseUrl}/presentation/${presentation._id}`,
      lastModified: presentation.updatedAt || presentation.eventDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Company URLs (unique companies)
    const uniqueCompanies = Array.from(new Set(presentations.map(p => p.companyCode)))
    const companyUrls = uniqueCompanies.map((companyCode) => ({
      url: `${baseUrl}/company/${companyCode}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    // Category URLs
    const categoryUrls = [
      {
        url: `${baseUrl}/sii`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/otc`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/rotc`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.5,
      },
    ]

    return [
      ...staticUrls,
      ...presentationUrls,
      ...companyUrls,
      ...categoryUrls,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Return basic sitemap if database error
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ]
  }
}