# 台股法說會搜尋平台

一個專注於台灣股市法人說明會資料的搜尋平台，提供快速搜尋、PDF預覽和SEO優化的使用者體驗。

## 專案特色

- 🔍 **智能搜尋**: 支援公司代碼、名稱、日期多維度搜尋
- 📄 **PDF預覽**: 線上預覽中英文版法說會資料
- 📱 **響應式設計**: 手機、平板、桌面完美適配
- 🚀 **SEO優化**: 針對搜尋引擎優化，獲取自然流量
- ⚡ **高效能**: 快速載入和搜尋回應

## 技術架構

### 前端技術棧
- **Next.js 15** - React 全端框架 (使用 App Router)
- **TypeScript** - 型別安全
- **Tailwind CSS v4** - 現代化樣式框架
- **shadcn/ui** - UI 組件庫
- **react-pdf** - PDF 預覽功能
- **Zustand** - 狀態管理

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
NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxxxxxxxx
```

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
- `/search` - 搜尋結果頁
- `/company/[code]` - 公司專頁 (如 `/company/2330` 台積電法說會簡報專頁)
- `/presentation/[id]` - 法說會詳細頁
- `/sii`, `/otc`, `/rotc` - 分類頁面

### 強力SEO關鍵字策略
每個公司頁面自動生成包含以下模式的關鍵字：
- **公司名稱 + 法說會簡報**: `台積電法說會簡報`、`鴻海法說會簡報`
- **公司代碼 + 法說會簡報**: `2330法說會簡報`、`2317法說會簡報`
- **公司名稱 + 代碼組合**: `台積電(2330)法說會簡報`
- **PDF 下載相關**: `台積電法說會PDF`、`2330法說會下載`
- **投資人相關**: `台積電投資人說明會`、`2330財報說明會`
- **時間相關**: `台積電2025法說會`、`2330年度法說會`
- **股票相關**: `股票代碼2330法說會`、`台積電股價法說會`

### 優化特色
- **超強關鍵字覆蓋**: 每個法說會頁面包含 50+ 個相關關鍵字
- **公司專頁SEO**: 為每家公司建立獨立 Landing Page
- **動態 Meta Tags**: 針對每個公司和法說會自動生成 SEO 友善標題和描述
- **結構化數據 (JSON-LD)**: Event、Organization、BreadcrumbList schema
- **XML Sitemap 自動生成**: 包含所有公司頁面和法說會頁面
- **內容SEO**: 自然融入關鍵字的內容描述
- **麵包屑導航**: 完整的頁面層級結構
- **圖片 Alt 標籤優化**
- **頁面載入速度優化**

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

## 聯絡方式

如有問題或建議，請開啟 Issue 或聯絡專案維護者。

---

**目標**: 透過 SEO 優化獲取台股法說會搜尋的自然流量，並通過 Google AdSense 實現變現。