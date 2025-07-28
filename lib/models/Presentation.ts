import mongoose from 'mongoose'

export interface IPresentation extends mongoose.Document {
  _id: string
  companyCode: string
  companyName: string
  eventDate: Date
  presentationTWUrl: string
  presentationEnUrl: string
  typek: 'sii' | 'otc' | 'rotc'
  createdAt: Date
  updatedAt?: Date
  slug?: string
  keywords?: string[]
  description?: string
}

const PresentationSchema = new mongoose.Schema<IPresentation>(
  {
    companyCode: {
      type: String,
      required: true,
      index: true,
    },
    companyName: {
      type: String,
      required: true,
      index: true,
    },
    eventDate: {
      type: Date,
      required: true,
      index: true,
    },
    presentationTWUrl: {
      type: String,
      required: true,
    },
    presentationEnUrl: {
      type: String,
      required: false,
    },
    typek: {
      type: String,
      enum: ['sii', 'otc', 'rotc'],
      required: true,
      index: true,
    },
    slug: {
      type: String,
      index: true,
    },
    keywords: [{
      type: String,
    }],
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Create compound indexes for better search performance
PresentationSchema.index({ companyCode: 1, eventDate: -1 })
PresentationSchema.index({ companyName: 'text', companyCode: 'text' })
PresentationSchema.index({ eventDate: -1, typek: 1 })

// Generate slug before saving
PresentationSchema.pre('save', function(next) {
  if (!this.slug) {
    const date = new Date(this.eventDate).toISOString().split('T')[0]
    this.slug = `${this.companyCode}-${date}`.toLowerCase()
  }
  
  // Generate keywords for SEO
  if (!this.keywords || this.keywords.length === 0) {
    this.keywords = [
      this.companyName,
      this.companyCode,
      `${this.companyName}法說會`,
      `${this.companyCode}法說會`,
      '法人說明會',
      '財報說明會'
    ]
  }
  
  // Generate description for SEO
  if (!this.description) {
    const date = new Date(this.eventDate).toLocaleDateString('zh-TW')
    this.description = `${this.companyName}(${this.companyCode})於${date}舉辦的法人說明會資料，提供中英文PDF下載和線上預覽。`
  }
  
  next()
})

export default mongoose.models.Presentation || mongoose.model<IPresentation>('Presentation', PresentationSchema, 'presentation')