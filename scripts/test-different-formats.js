// 測試不同的 MongoDB 連接字串格式
const mongoose = require('mongoose')

const formats = [
  // 原始格式
  'mongodb://mongo:qDt8Czha5fm14cw9FxBT0O3Hkj2L7S6b@43.167.237.112:32041/companies',
  
  // URL encoded 密碼
  'mongodb://mongo:qDt8Czha5fm14cw9FxBT0O3Hkj2L7S6b@43.167.237.112:32041/companies',
  
  // 帶 authSource
  'mongodb://mongo:qDt8Czha5fm14cw9FxBT0O3Hkj2L7S6b@43.167.237.112:32041/companies?authSource=companies',
  
  // 帶 admin authSource
  'mongodb://mongo:qDt8Czha5fm14cw9FxBT0O3Hkj2L7S6b@43.167.237.112:32041/companies?authSource=admin',
  
  // 不指定資料庫
  'mongodb://mongo:qDt8Czha5fm14cw9FxBT0O3Hkj2L7S6b@43.167.237.112:32041',
]

async function testFormat(uri, index) {
  console.log(`\n=== Testing format ${index + 1} ===`)
  console.log(`URI: ${uri}`)
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('✅ Connection successful!')
    
    // 列出資料庫
    const admin = mongoose.connection.db.admin()
    const dbs = await admin.listDatabases()
    console.log('Available databases:', dbs.databases.map(db => db.name))
    
    await mongoose.disconnect()
    return true
  } catch (error) {
    console.log('❌ Connection failed:', error.message)
    await mongoose.disconnect()
    return false
  }
}

async function testAllFormats() {
  for (let i = 0; i < formats.length; i++) {
    const success = await testFormat(formats[i], i)
    if (success) {
      console.log(`\n🎉 Successful format found: ${formats[i]}`)
      break
    }
  }
}

testAllFormats()