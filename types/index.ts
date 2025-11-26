export interface Presentation {
  _id: string
  companyCode: string
  companyName: string
  eventDate: string
  presentationTWUrl: string
  presentationEnUrl: string
  audioLinkUrl?: string
  typek: 'sii' | 'otc' | 'rotc'
  createdAt: string
  updatedAt?: string
  slug?: string
  keywords?: string[]
  description?: string
  presentationContent?: string
}

export interface SearchParams {
  q?: string
  companyCode?: string
  companyName?: string
  dateFrom?: string
  dateTo?: string
  type?: 'sii' | 'otc' | 'rotc'
  page?: number
  limit?: number
}

export interface SearchResponse {
  data: Presentation[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface CompanyType {
  value: 'sii' | 'otc' | 'rotc'
  label: string
  description: string
}