// 測試 API 端點
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const Presentation = require('../lib/models/Presentation.ts').default

const MONGODB_URI = process.env.MONGODB_URI

async function testAPI() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected!')

    // 測試基本查詢
    console.log('\n=== 測試基本查詢 ===')
    const allCount = await Presentation.countDocuments()
    console.log(`總共有 ${allCount} 筆資料`)

    // 測試搜尋台泥
    console.log('\n=== 搜尋台泥 ===')
    const taiwanCementResults = await Presentation.find({
      $or: [
        { companyCode: { $regex: '1101', $options: 'i' } },
        { companyName: { $regex: '台泥', $options: 'i' } },
      ]
    }).limit(5)
    
    console.log(`找到 ${taiwanCementResults.length} 筆結果:`)
    taiwanCementResults.forEach(result => {
      console.log(`- ${result.companyCode} ${result.companyName} (${new Date(result.eventDate).toLocaleDateString()})`)
    })

    // 測試類型篩選
    console.log('\n=== 上市公司統計 ===')
    const siiCount = await Presentation.countDocuments({ typek: 'sii' })
    const otcCount = await Presentation.countDocuments({ typek: 'otc' })
    const rotcCount = await Presentation.countDocuments({ typek: 'rotc' })
    
    console.log(`上市 (sii): ${siiCount} 筆`)
    console.log(`上櫃 (otc): ${otcCount} 筆`)
    console.log(`興櫃 (rotc): ${rotcCount} 筆`)

    // 測試最新資料
    console.log('\n=== 最新 5 筆法說會 ===')
    const recentResults = await Presentation.find({})
      .sort({ eventDate: -1, createdAt: -1 })
      .limit(5)
    
    recentResults.forEach(result => {
      console.log(`- ${result.companyCode} ${result.companyName} (${new Date(result.eventDate).toLocaleDateString()})`)
    })

  } catch (error) {
    console.error('❌ 測試失敗:', error)
  } finally {
    await mongoose.disconnect()
    console.log('\n斷開連接')
  }
}

testAPI()