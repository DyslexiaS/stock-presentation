import { MetadataRoute } from 'next'
import dbConnect from '@/lib/mongodb'
import PresentationModel from '@/lib/models/Presentation'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://stock.diveinvest.net')
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  try {
    // Connect to database and get all presentations
    await dbConnect()
    const presentations = await PresentationModel.find({}).lean()
    
    // Get unique companies
    const companies = new Map()
    presentations.forEach((p: any) => {
      if (!companies.has(p.companyCode)) {
        companies.set(p.companyCode, {
          companyCode: p.companyCode,
          companyName: p.companyName,
          typek: p.typek,
          lastUpdate: p.createdAt || p.eventDate
        })
      } else {
        const existing = companies.get(p.companyCode)
        const currentDate = new Date(p.createdAt || p.eventDate)
        const existingDate = new Date(existing.lastUpdate)
        if (currentDate > existingDate) {
          companies.set(p.companyCode, {
            ...existing,
            lastUpdate: p.createdAt || p.eventDate
          })
        }
      }
    })

    // Add company pages
    companies.forEach((company) => {
      routes.push({
        url: `${baseUrl}/company/${company.companyCode}`,
        lastModified: new Date(company.lastUpdate),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })

    // Add presentation detail pages
    presentations.forEach((presentation: any) => {
      routes.push({
        url: `${baseUrl}/presentation/${presentation._id}`,
        lastModified: new Date(presentation.createdAt || presentation.eventDate),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })

    // Add search page
    routes.push({
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    })

  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return basic sitemap if database fails
  }

  return routes
}
