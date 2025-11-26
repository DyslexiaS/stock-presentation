# FinmoConf - 台股法說會搜尋平台

一個專注於台灣股市法人說明會資料的搜尋平台，提供快速搜尋、PDF下載和SEO優化的使用者體驗。FinmoAI 系列產品，與 FinmoAI 收益電話轉錄服務互補。

## 專案特色

- 🔍 **智能搜尋**: 支援公司代碼、名稱、日期多維度搜尋
- 📄 **PDF下載**: 快速下載中英文版法說會資料
- 🎵 **音訊錄音**: 提供法說會音訊錄音連結 (若有提供)
- 📱 **響應式設計**: 手機、平板、桌面完美適配
- 🚀 **SEO優化**: 針對搜尋引擎優化，獲取自然流量
- ⚡ **高效能**: 快速載入和搜尋回應
- 🤖 **FinmoAI 整合**: 與 FinmoAI 收益電話轉錄服務完美互補
- 🎯 **服務器端渲染**: SEO友善的首頁渲染
- 📊 **結構化數據**: 完整的 JSON-LD 標記
- 🤖 **AI 友善**: LLMs.txt 標準支援
 - 📈 **年度趨勢圖**: 公司頁面內建「每年法說會次數」長條圖（零 JS）
 - 📝 **Markdown 內容展示**: 支援法說會內容 Markdown 格式渲染，提升閱讀體驗與 SEO

## 技術架構

### 前端技術棧
- **Next.js 15** - React 全端框架 (使用 App Router)
- **TypeScript** - 型別安全
- **Tailwind CSS v4** - 現代化樣式框架
- **shadcn/ui** - UI 組件庫
- **react-pdf** - PDF 處理功能
- **React Hooks** - 狀態管理

### 後端技術棧
- **Next.js API Routes** - API 端點
- **MongoDB** - 主要資料庫
- **Mongoose** - ODM 框架

### 開發工具
- **Bun** - 快速的 JavaScript 運行時和套件管理器
- **ESLint** - 程式碼檢查
- **PostCSS** - CSS 處理工具

### 資料結構

```javascript
{
  _id: "687b18f1a2ef6df0427f27e4",
  companyCode: "1101",                    // 公司代碼
  companyName: "台泥",                    // 公司名稱
  eventDate: "2025-05-19T00:00:00.000Z", // 法說會日期
  presentationTWUrl: "https://...",      // 中文PDF連結
  presentationEnUrl: "https://...",      // 英文PDF連結
  audioLinkUrl: "https://...",           // 音訊錄音連結 (可選)
  typek: "sii",                          // sii(上市) | otc(上櫃) | rotc(興櫃)
  createdAt: "2025-07-19T12:02:57.055Z"
}
```

## 快速開始

### 環境需求
- **Node.js 18+** 或 **Bun 1.0+** (推薦使用 Bun)
- **MongoDB 4.4+**

### 安裝步驟

1. **克隆專案**
```bash
git clone <repository-url>
cd stock-presentation
```

2. **安裝依賴**
```bash
# 使用 Bun (推薦)
bun install

# 或使用 npm
npm install
```

3. **環境變數設定**
```bash
cp .env.example .env.local
```

編輯 `.env.local` 檔案：
```env
# MongoDB 連接字串
MONGODB_URI=mongodb://localhost:27017/stock-presentation

# Next.js 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google AdSense (可選)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-9797466100759078

# Replace these with your actual AdSense ad unit IDs from your AdSense dashboard
# Header Banner Ad Unit ID
NEXT_PUBLIC_ADSENSE_HEADER_SLOT=6322775233

# Sidebar Ad Unit ID  
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=9966506770

# Content Banner Ad Unit ID
NEXT_PUBLIC_ADSENSE_CONTENT_SLOT=1138747228
```

### AdSense 廣告位說明

本平台使用 3 種主要廣告位類型，可透過環境變數靈活配置：

- **NEXT_PUBLIC_ADSENSE_HEADER_SLOT**: 頁首橫幅廣告
  - 位置：所有頁面的頁首區域
  - 格式：horizontal (728x90 建議)
  - 使用頁面：首頁、公司頁面、法說會詳細頁

- **NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT**: 側邊廣告
  - 位置：頁面右側邊欄
  - 格式：rectangle (300x250 建議)
  - 使用頁面：首頁、公司頁面、法說會詳細頁

- **NEXT_PUBLIC_ADSENSE_CONTENT_SLOT**: 內容區廣告
  - 位置：內容區域中間及底部
  - 格式：horizontal (728x90 建議)
  - 使用頁面：首頁、公司頁面

**總計廣告位數量：**
- 首頁：6 個廣告位
- 公司頁面：3 個廣告位  
- 法說會詳細頁：2 個廣告位

4. **啟動開發伺服器**
```bash
# 使用 Bun (推薦)
bun dev

# 或使用 npm
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

## 配置說明

### Tailwind CSS v4 配置

專案使用最新的 Tailwind CSS v4，配置檔案：

**postcss.config.mjs**
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

**app/globals.css**
```css
@import "tailwindcss";

@layer base {
  :root {
    --background: 250 250 250;
    --foreground: 15 23 42;
    /* ... 其他 CSS 變數 */
  }
}
```

### Next.js 15 配置

**next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
}

export default nextConfig
```

**package.json**
```json
{
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

## API 文檔

### 搜尋 API

#### GET `/api/presentations/search`

搜尋法說會資料

**Query Parameters:**
- `q` (string): 搜尋關鍵字
- `companyCode` (string): 公司代碼
- `companyName` (string): 公司名稱
- `dateFrom` (string): 開始日期 (YYYY-MM-DD)
- `dateTo` (string): 結束日期 (YYYY-MM-DD)
- `type` (string): 類型 (`sii` | `otc` | `rotc`)
- `page` (number): 頁碼 (預設: 1)
- `limit` (number): 每頁數量 (預設: 20)

**回應範例:**
```json
{
  "data": [
    {
      "_id": "687b18f1a2ef6df0427f27e4",
      "companyCode": "1101",
      "companyName": "台泥",
      "eventDate": "2025-05-19T00:00:00.000Z",
      "presentationTWUrl": "https://...",
      "presentationEnUrl": "https://...",
      "audioLinkUrl": "https://...",
      "typek": "sii"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

#### GET `/api/presentations/[id]`

取得單一法說會詳細資料

#### GET `/api/presentations/company/[companyCode]`

取得特定公司的所有法說會資料

#### GET `/api/presentations/recent`

取得最新法說會資料

### AI 系統資訊

#### GET `/llms.txt`

提供給 AI 系統的結構化平台資訊，包含：
- 平台描述和核心功能
- 技術架構和開發哲學  
- 目標用戶和使用情境
- API 端點和資料結構
- SEO 策略和內容分類
- 更新頻率和聯絡方式

**回應格式**: 純文字 (text/plain)
**快取設定**: 1 小時

## 專案結構

```
stock-presentation/
├── app/                    # Next.js App Router
│   ├── (routes)/          # 路由頁面
│   ├── api/               # API 路由
│   └── globals.css        # 全域樣式
├── components/            # React 組件
│   ├── ui/               # shadcn/ui 組件
│   ├── search/           # 搜尋相關組件
│   └── pdf/              # PDF 預覽組件
├── lib/                  # 工具函數
│   ├── mongodb.ts        # 資料庫連接
│   ├── models/           # Mongoose 模型
│   ├── seo.ts           # SEO 工具函數
│   └── utils.ts          # 共用工具
├── public/               # 靜態資源
├── types/                # TypeScript 型別定義
├── postcss.config.mjs    # PostCSS 配置
├── tailwind.config.js    # Tailwind CSS 配置
└── next.config.js        # Next.js 配置
```

## SEO 策略

### 頁面結構
- `/` - 首頁 (搜尋界面，包含熱門公司法說會簡報)
- `/company/[companyCode]` - 公司專頁 (按年份分組顯示)
- `/presentation/[id]` - 法說會詳細頁

### 年度趨勢圖（SEO 友善）
- 公司頁面在列表上方展示「年度法說會次數」長條圖
- 使用伺服器端渲染的 SVG，無額外 JS 依賴，首次渲染快速
- 顏色遵循全站設計系統：`--primary`、`--foreground`、`--muted-foreground`
- 可讀性與可及性：
  - `role="img"` 與 `aria-label`，並提供 `sr-only` 文字摘要
  - 寬度自適應容器，行動裝置可水平滾動
  
元件位置：
`app/company/[companyCode]/yearly-chart.tsx`

匯入與使用（摘要）：
```tsx
<YearlyCallsChart data={[{ year: 2021, count: 5 }]} companyName="台達電" />
```

### 強力SEO關鍵字策略
每個公司頁面自動生成包含以下模式的關鍵字：
- **FinmoConf 品牌關鍵字**: `FinmoConf`、`FinmoConf 法說會`、`FinmoConf 台股`
- **公司名稱 + 法說會簡報**: `台積電法說會簡報`、`鴻海法說會簡報`
- **公司代碼 + 法說會簡報**: `2330法說會簡報`、`2317法說會簡報`
- **公司名稱 + 代碼組合**: `台積電(2330)法說會簡報`
- **PDF 下載相關**: `台積電法說會PDF`、`2330法說會下載`
- **投資人相關**: `台積電法人說明會`、`2330財報說明會`
- **時間相關**: `台積電2025法說會`、`2330年度法說會`
- **股票相關**: `股票代碼2330法說會`、`台積電股價法說會`

### 優化特色
- **FinmoConf 品牌整合**: 在所有關鍵字中融入 FinmoConf 品牌名稱
- **超強關鍵字覆蓋**: 每個法說會頁面包含 50+ 個相關關鍵字
- **公司專頁SEO**: 為每家公司建立獨立 Landing Page
- **動態 Meta Tags**: 針對每個公司和法說會自動生成 SEO 友善標題和描述
- **結構化數據 (JSON-LD)**: Event、Organization、BreadcrumbList schema
  - Event fields covered: `name`, `description`, `startDate`, `endDate`, `eventStatus`, `eventAttendanceMode`, `isAccessibleForFree`, `inLanguage`, `location`, `image`, `organizer`, `performer`, `offers.url`, `offers.price`, `offers.priceCurrency`, `offers.availability`, `offers.validFrom`, `url`, `about`, `workFeatured`
- **XML Sitemap 自動生成**: 包含所有公司頁面和法說會頁面
- **內容SEO**: 自然融入關鍵字的內容描述
- **麵包屑導航**: 完整的頁面層級結構
- **圖片 Alt 標籤優化**
- **頁面載入速度優化**
- **服務器端渲染**: 首頁使用 SSR 提升 SEO 效果

## 部署

### Vercel (推薦)
1. 連接 GitHub 專案到 Vercel
2. 設定環境變數
3. 自動部署

### Docker
```bash
docker build -t stock-presentation .
docker run -p 3000:3000 stock-presentation
```

## 開發指令

```bash
# 開發模式 (使用 Bun)
bun dev

# 建置生產版本
bun run build

# 啟動生產伺服器
bun start

# 程式碼檢查
bun run lint

# 型別檢查
bun run type-check
```

## 故障排除

### 常見問題

1. **模組語法錯誤 (module is not defined)**
   - 確保 `package.json` 包含 `"type": "module"`
   - 配置檔案使用 ES module 語法 (`export default`)

2. **Tailwind CSS 類別無效**
   - 確認使用 Tailwind CSS v4 語法
   - 檢查 `postcss.config.mjs` 配置
   - 確保 CSS 變數在 `globals.css` 中正確定義

3. **Next.js 15 參數型別錯誤**
   - API 路由參數現在是 `Promise<{ param: string }>`
   - 使用 `await params` 來解析參數

4. **PDF 預覽問題**
   - **iframe 模式載入失敗**: 某些 PDF 來源可能不支援跨域內嵌，使用「外部開啟」功能
   - **進階模式無法顯示**: 檢查網路連線，PDF.js 需要載入外部資源
   - **行動裝置顯示異常**: 預覽模式已針對手機優化，確保使用最新瀏覽器
   - **PDF 載入緩慢**: 大型 PDF 檔案需要較長時間，可使用下載功能

### PDF 預覽功能說明

專案提供兩種 PDF 預覽模式：

#### 簡易預覽模式 (預設)
- 使用 iframe 內嵌 PDF
- 相容性佳，載入速度快
- 支援瀏覽器原生 PDF 工具列
- 適合大部分使用場景

#### 進階預覽模式
- 使用 react-pdf 庫渲染
- 自訂控制介面
- 支援頁面導航和縮放
- 更好的整合體驗

**使用建議**：優先使用簡易模式，如遇到載入問題再切換至進階模式或外部開啟。

## 貢獻指南

1. Fork 此專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)  
5. 開啟 Pull Request

## 授權

MIT License - 詳見 [LICENSE](LICENSE) 檔案

## 最近優化 (Latest Improvements)

### 結構化數據修復 🔧 (2025-09-10)
- **修復 Event Schema Location 問題**: 將 `VirtualLocation` 改為符合 Schema.org 標準的 `Place` 類型
- **新增 Offers URL 欄位**: 在所有 Event 結構化數據的 `offers` 中加入必要的 `url` 欄位
- **完善 PostalAddress**: 為 Location 新增完整的地址結構，包含 `addressCountry` 屬性
- **Search Console 兼容性**: 解決 Google Search Console 回報的 2 項「活動結構化資料」問題
- **SEO 優化提升**: 確保所有法說會頁面的結構化數據符合最新的 Schema.org 規範

### 404 錯誤修復 🔧 (2025-01-28)
- **移除問題重定向規則**: 移除 `next.config.js` 中可能導致 URL 末尾出現 `$` 字符的複雜正則表達式重定向
- **新增自訂 404 頁面**: 建立美觀的 404 錯誤頁面，包含 AdSense 廣告位和結構化數據
- **SEO 友善錯誤處理**: 404 頁面包含適當的元數據和麵包屑導航
- **用戶體驗優化**: 提供清晰的錯誤說明和返回首頁的便捷連結

### Open Graph API 移除 🔧 (2025-01-28)
- **簡化 SEO 配置**: 移除 Open Graph 自訂圖片 API 依賴，改用預設社群分享預覽
- **減少複雜度**: 移除不必要的動態圖片生成端點，簡化系統架構
- **維持 robots.txt 封鎖**: 保持 `/api/` 路徑封鎖，避免 API 端點被搜尋引擎索引
- **效能優化**: 減少服務器負載，提升整體系統效能

### SEO 與索引優化 🚀 (2025-01-27)
- **完整 Sitemap 實作**: 建立動態 XML sitemap，包含所有公司頁面和法說會頁面
- **服務器端渲染**: 將首頁從客戶端渲染轉換為服務器端渲染，大幅提升 SEO 效果
- **結構化數據增強**: 新增完整的 JSON-LD 結構化數據，包含 WebSite、Organization、Dataset schema
- **動態 Meta 標籤**: 每個頁面都有針對性的 SEO 友善標題和描述
- **關鍵字策略優化**: 超過 50+ 相關關鍵字覆蓋，提升搜尋引擎可見度
- **頁面載入效能**: 靜態內容服務器端預渲染，動態功能客戶端載入

### LLMs.txt 實作 🤖
- **AI 友善**: 實作 `llms.txt` 標準，讓 AI 系統能更好地理解平台內容
- **動態生成**: 使用 Next.js API Route 動態生成 AI 系統所需的結構化資訊
- **全面描述**: 包含平台目的、技術架構、API 端點、SEO 策略等完整資訊
- **自動更新**: 內容包含最後更新日期，確保資訊即時性
- **快取優化**: 設定 1 小時快取，平衡效能與資料新鮮度

### 程式碼清理與優化 ✨
- **修復 TypeScript 錯誤**: 移除不必要的 `any` 型別轉換，使用正確的型別定義
- **移除重複程式碼**: 清理重複的 DOMMatrix polyfill 和 PDF.js 設定
- **集中化管理**: PDF 設定統一管理在 `lib/pdf-setup.ts`
- **改善型別安全**: 所有 Mongoose 查詢結果都有正確的型別定義
- **程式碼品質提升**: 通過所有 ESLint 檢查，零警告零錯誤
- **架構優化**: 分離服務器端和客戶端組件，提升渲染效能

### 新增功能 🆕
- **公司專頁**: 為每家公司建立獨立頁面，按年份分組顯示法說會
- **音訊錄音支援**: 支援法說會音訊錄音連結 (若有提供)
- **麵包屑導航**: 完整的頁面層級結構，提升使用者體驗
- **響應式搜尋**: 優化的搜尋介面，支援多種篩選條件

這些優化大幅提升了搜尋引擎索引效果，預期網站在 Google 等搜尋引擎的可見度將顯著改善。

## 聯絡方式

如有問題或建議，請開啟 Issue 或聯絡專案維護者。

---

**目標**: 透過 SEO 優化獲取台股法說會搜尋的自然流量，並通過 Google AdSense 實現變現。FinmoConf 作為 FinmoAI 系列產品，與 FinmoAI 收益電話轉錄服務形成完整的投資研究解決方案。