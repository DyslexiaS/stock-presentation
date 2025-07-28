// 測試 MongoDB 連接
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

console.log('Connecting to:', MONGODB_URI)

const PresentationSchema = new mongoose.Schema({
  companyCode: String,
  companyName: String,
  eventDate: Date,
  presentationTWUrl: String,
  presentationEnUrl: String,
  typeK: String
}, {
  timestamps: true,
  collection: 'presentation' // 明確指定 collection 名稱
})

const Presentation = mongoose.model('Presentation', PresentationSchema, 'presentation')

async function testConnection() {
  try {
    console.log('Attempting to connect...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB successfully!')
    
    // 檢查 collection 是否存在
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log('Available collections:', collections.map(c => c.name))
    
    // 嘗試讀取資料
    const count = await Presentation.countDocuments()
    console.log(`Found ${count} presentations in the collection`)
    
    if (count > 0) {
      const sample = await Presentation.findOne()
      console.log('Sample document:', sample)
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    console.error('Error details:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

testConnection()