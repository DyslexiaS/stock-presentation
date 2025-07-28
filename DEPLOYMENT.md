# 部署指南

## 快速啟動

### 1. 環境設定

```bash
# 複製環境變數範本
cp .env.example .env.local

# 編輯環境變數
nano .env.local
```

必要的環境變數：
```env
MONGODB_URI=mongodb://localhost:27017/stock-presentation
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### 2. 安裝依賴與啟動

```bash
# 使用 Bun 安裝依賴
bun install

# 啟動開發伺服器
bun run dev
```

訪問 http://localhost:3000 查看結果。

## 數據導入

### 準備 MongoDB 數據

```javascript
// 範例數據結構
db.presentations.insertMany([
  {
    companyCode: "1101",
    companyName: "台泥",
    eventDate: new Date("2025-05-19T00:00:00.000Z"),
    presentationTWUrl: "https://mopsov.twse.com.tw/nas/STR/110120250519M001.pdf",
    presentationEnUrl: "https://mopsov.twse.com.tw/nas/STR/110120250519E001.pdf",
    typeK: "sii",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

### 建立索引

```javascript
// MongoDB 索引設定
db.presentations.createIndex({ companyCode: 1, eventDate: -1 })
db.presentations.createIndex({ companyName: "text", companyCode: "text" })
db.presentations.createIndex({ eventDate: -1, typeK: 1 })
```

## 生產環境部署

### Vercel 部署 (推薦)

1. **連接到 Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **設定環境變數**
   在 Vercel Dashboard 設定：
   - `MONGODB_URI`: MongoDB Atlas 連接字串
   - `NEXTAUTH_URL`: 你的網域名稱
   - `NEXTAUTH_SECRET`: 隨機密鑰
   - `NEXT_PUBLIC_ADSENSE_ID`: Google AdSense ID

3. **MongoDB Atlas 設定**
   - 建立 MongoDB Atlas 免費帳號
   - 建立 Cluster 和 Database
   - 設定網路存取權限
   - 取得連接字串

### Docker 部署

```dockerfile
# Dockerfile
FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]
```

部署指令：
```bash
docker build -t stock-presentation .
docker run -p 3000:3000 --env-file .env.local stock-presentation
```

## SEO 優化檢查清單

### 1. Google Search Console
- 提交 sitemap.xml
- 監控搜尋效能
- 檢查索引狀態

### 2. 網站速度優化
- 檢查 Core Web Vitals
- 優化圖片載入
- 啟用 CDN

### 3. 結構化數據驗證
使用 [Google Rich Results Test](https://search.google.com/test/rich-results) 驗證結構化數據。

## Google AdSense 設定

### 1. 申請 AdSense 帳號
1. 前往 [Google AdSense](https://www.google.com/adsense/)
2. 提交網站審核
3. 獲得 Publisher ID

### 2. 設定廣告單元
1. 建立廣告單元
2. 取得廣告代碼
3. 更新環境變數 `NEXT_PUBLIC_ADSENSE_ID`

### 3. 廣告位置優化
- 頁首橫幅：728x90 或 320x50 (行動版)
- 側邊廣告：300x250
- 內容廣告：728x90
- PDF 預覽旁：300x600

## 監控與維護

### 1. 效能監控
- 設定 Google Analytics
- 監控 API 回應時間
- 設定錯誤追蹤

### 2. 數據更新
建立自動化腳本定期更新法說會資料：

```javascript
// scripts/update-presentations.js
async function updatePresentations() {
  // 從公開資訊觀測站抓取最新資料
  // 更新 MongoDB 資料庫
  // 重新生成 sitemap
}
```

### 3. 備份策略
- MongoDB 定期備份
- 靜態資源 CDN 備份
- 程式碼版本控制

## 擴展功能

### 未來可新增功能
1. **使用者帳號系統** - 收藏、提醒功能
2. **進階搜尋** - 產業別、營收規模篩選
3. **API 服務** - 提供付費 API 給第三方
4. **行動 App** - React Native 或 Flutter
5. **即時通知** - 新法說會發布提醒

### 技術債務處理
1. 實作完整的測試覆蓋
2. 添加 TypeScript 嚴格模式
3. 優化 Bundle Size
4. 實作 Service Worker

## 故障排除

### 常見問題

1. **PDF 預覽無法載入**
   - 檢查 CORS 設定
   - 確認 PDF URL 有效性

2. **搜尋結果為空**
   - 檢查 MongoDB 連接
   - 驗證資料格式

3. **廣告不顯示**
   - 確認 AdSense 審核通過
   - 檢查廣告代碼正確性

4. **SEO 效果不佳**
   - 檢查 robots.txt
   - 驗證 sitemap.xml
   - 確保內容品質

聯絡方式：如有問題請開啟 GitHub Issue。