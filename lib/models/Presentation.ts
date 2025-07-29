import mongoose from 'mongoose'

export interface IPresentation extends mongoose.Document {
  _id: string
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
    },
    presentationTWUrl: {
      type: String,
      required: true,
    },
    presentationEnUrl: {
      type: String,
      required: false,
    },
    audioLinkUrl: {
      type: String,
      required: false,
    },
    typek: {
      type: String,
      enum: ['sii', 'otc', 'rotc'],
      required: true,
    },
    slug: {
      type: String,
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
    const audioText = this.audioLinkUrl ? '，提供中英文PDF下載、線上預覽及音訊錄音。' : '，提供中英文PDF下載和線上預覽。'
    this.description = `${this.companyName}(${this.companyCode})於${date}舉辦的法人說明會資料${audioText}`
  }
  
  next()
})

export default mongoose.models.Presentation || mongoose.model<IPresentation>('Presentation', PresentationSchema, 'presentation')