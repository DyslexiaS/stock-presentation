// 種子資料腳本 - 用於插入範例法說會資料
const mongoose = require('mongoose')

// 連接到資料庫
const MONGODB_URI = 'mongodb://mongo:qDt8Czha5fm14cw9FxBT0O3Hkj2L7S6b@43.167.237.112:32041/companies'

const PresentationSchema = new mongoose.Schema({
  companyCode: { type: String, required: true },
  companyName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  presentationTWUrl: { type: String, required: true },
  presentationEnUrl: { type: String },
  typeK: { type: String, enum: ['sii', 'otc', 'rotc'], required: true },
  slug: String,
  keywords: [String],
  description: String
}, {
  timestamps: true
})

const Presentation = mongoose.model('Presentation', PresentationSchema, 'presentation')

// 範例資料
const sampleData = [
  {
    companyCode: '1101',
    companyName: '台泥',
    eventDate: new Date('2025-05-19'),
    presentationTWUrl: 'https://mopsov.twse.com.tw/nas/STR/110120250519M001.pdf',
    presentationEnUrl: 'https://mopsov.twse.com.tw/nas/STR/110120250519E001.pdf',
    typeK: 'sii'
  },
  {
    companyCode: '2330',
    companyName: '台積電',
    eventDate: new Date('2025-01-15'),
    presentationTWUrl: 'https://example.com/tsmc-2025q1-tw.pdf',
    presentationEnUrl: 'https://example.com/tsmc-2025q1-en.pdf',
    typeK: 'sii'
  },
  {
    companyCode: '2317',
    companyName: '鴻海',
    eventDate: new Date('2025-01-20'),
    presentationTWUrl: 'https://example.com/foxconn-2025q1-tw.pdf',
    presentationEnUrl: 'https://example.com/foxconn-2025q1-en.pdf',
    typeK: 'sii'
  },
  {
    companyCode: '6505',
    companyName: '台塑化',
    eventDate: new Date('2025-01-25'),
    presentationTWUrl: 'https://example.com/fpcc-2025q1-tw.pdf',
    typeK: 'sii'
  },
  {
    companyCode: '3008',
    companyName: '大立光',
    eventDate: new Date('2025-02-01'),
    presentationTWUrl: 'https://example.com/largan-2025q1-tw.pdf',
    typeK: 'sii'
  }
]

async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
    
    // 清除現有資料
    await Presentation.deleteMany({})
    console.log('Cleared existing data')
    
    // 插入範例資料
    const results = await Presentation.insertMany(sampleData)
    console.log(`Inserted ${results.length} presentations`)
    
    // 建立索引
    await Presentation.collection.createIndex({ companyCode: 1, eventDate: -1 })
    await Presentation.collection.createIndex({ companyName: 'text', companyCode: 'text' })
    await Presentation.collection.createIndex({ eventDate: -1, typeK: 1 })
    console.log('Created indexes')
    
    console.log('Seed data completed successfully!')
    
  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    await mongoose.disconnect()
  }
}

seedData()