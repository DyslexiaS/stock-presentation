# FinmoConf - 台股法說會資料庫

收錄台灣 2,000+ 家上市櫃公司法人說明會簡報的搜尋平台。FinmoAI 系列產品。

**核心目標**：透過 Programmatic SEO 策略，以台股法說會相關關鍵字取得大量自然流量，並透過 Google AdSense 變現。

---

## 技術架構

| 層級 | 技術 |
|---|---|
| 框架 | Next.js 16 (App Router, SSR + ISR) |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS v4 + shadcn/ui |
| 資料庫 | MongoDB + Mongoose |
| 部署 | Vercel |
| 套件管理 | Bun |

---

## 快速開始

```bash
bun install
cp .env.example .env.local
bun dev
```

`.env.local` 必填項目：

```env
MONGODB_URI=mongodb://localhost:27017/stock-presentation
NEXT_PUBLIC_SITE_URL=https://finmoconf.diveinvest.net
```

---

## 專案結構

```
app/
├── page.tsx                          # 首頁 (SSR + ISR 24h)
├── en/                               # 英文 memo 專區 (SSG)
├── company/[companyCode]/page.tsx    # 公司專頁 (ISR 7d)
├── presentation/[id]/page.tsx        # 法說會詳情頁 (ISR 7d)
├── api/presentations/                # REST API
├── sitemap.ts / robots.ts            # SEO 爬蟲設定
└── sitemap-index.xml/                # Sitemap 架構

content/en/
├── memos/[company]/[quarter].md      # 英文法說會 memo
└── topics/nvidia-800v.md             # 主題 hub

lib/
├── seo.ts                            # 中文頁 metadata
├── seo-en.ts                         # 英文 memo metadata
├── content/en-memos.ts               # Markdown loader
├── models/Presentation.ts            # Mongoose schema
└── mongodb.ts                        # DB 連線
```

---

## 資料結構

```typescript
interface Presentation {
  _id: string
  companyCode: string        // 股票代碼，如 "2330"
  companyName: string        // 公司名稱，如 "台積電"
  eventDate: string          // 法說會日期 (ISO)
  presentationTWUrl: string  // 中文版 PDF
  presentationEnUrl?: string // 英文版 PDF
  audioLinkUrl?: string      // 音訊錄音
  typek: 'sii' | 'otc' | 'rotc'  // 上市 | 上櫃 | 興櫃
  presentationContent?: string    // Markdown 摘要（SEO 用）
}
```

---

## SEO 架構

### 頁面類型與關鍵字策略

| 頁面 | 目標關鍵字範例 | 數量 |
|---|---|---|
| `/` | 台股法說會、法說會查詢 | 1 |
| `/en` | Taiwan semiconductor earnings call | 1 |
| `/en/topics/nvidia-800v` | NVIDIA 800V supply chain Taiwan | 1 |
| `/en/[company]` | Lite-On earnings call English | 30 |
| `/en/[company]/[quarter]` | Lite-On Q2 2026 earnings call | 45 |
| `/company/2330` | 台積電法說會、2330法說會簡報 | ~2,000 |
| `/presentation/[id]` | 台積電2024Q3法說會、2330法人說明會PDF | ~10,000+ |

### Sitemap 三層架構
```
/sitemap-index.xml
  ├── /en-sitemap.xml                 # /en + 主題 + 30 家公司 + 45 篇 memo
  ├── /companies-sitemap.xml          # 所有中文公司頁（~2,000）
  ├── /industry-sitemap.xml           # 產業分類頁
  └── /presentations-sitemap/[page]   # 分頁法說會（每頁 10,000）
```

### 結構化資料（JSON-LD）
- 首頁：`WebSite` + `Organization` + `Dataset` + `FAQPage`
- 法說會頁：`Event` + `Organization` + `BreadcrumbList`
- 公司頁：`Organization` + `Event[]` + `BreadcrumbList`
- 英文 `/en`：`CollectionPage` + `ItemList`（公司）
- 英文公司頁：`CollectionPage` + `ItemList`（季度 notes）
- 英文主題 hub：`CollectionPage` + `ItemList`（該主題 notes）
- 英文 memo：`Article` + `BreadcrumbList`（`lang=en`，不與中文 PDF 頁做 hreflang 配對）

### ISR 快取策略
- 首頁：每 24 小時重新生成
- 公司頁 / 法說會頁：每 7 天重新生成
- Sitemap：每 24 小時重新生成

---

## SEO 成長路線圖

- [x] **英文 memo 專區 `/en`** — Markdown SSG，NVIDIA 800V 供應鏈為第一個主題
- [ ] **AI 批次生成 `presentationContent`** — 將 10,000+ 薄頁面轉為有內容的頁面，最高優先
- [x] **產業分類頁** `/industry/[sector]` — 承接「半導體業法說會」等高搜尋量關鍵字
- [ ] **季度彙整頁** `/quarter/[year-q]` — 承接「2024 Q3 法說會」類查詢
- [ ] **公司頁加 AI 簡介段落** — 增加文字密度，強化公司頁排名
- [ ] **詳情頁同公司相關列表** — 強化內部連結，降低跳出率

---

## 英文 memo（`/en`）

海外投資人專區。公開內容只有英文 briefing，中文逐字稿不上架。檔案放在 git，不進 MongoDB。

目前第一個主題是 NVIDIA 800 VDC：30 家公司、45 篇季度 memo，每家有獨立 company profile。Memo 用 reader-first 結構（At a glance / numbers / 800V read-through / Q&A），公司背景不重複寫進每季。鴻海已補到 2026Q2；奇鋐（液冷）兩篇、良維（NVIDIA 官方名單）一篇。`/llms.txt` 與 `/en-sitemap.xml` 由 loader 動態列出全部英文 URL，新增 memo 不必手改。

新增一篇：

1. 在 `content/en/memos/<company-slug>/<quarter>.md` 寫 Markdown（frontmatter：`title`, `description`, `companySlug`, `ticker`, `companyName`, `quarter`, `eventDate`, `reportingPeriod`, `tags`）
2. 主題用 `tags`（例如 `nvidia-800v`），不要寫進網址
3. 同一季兩場時，第二篇用 `2026-q1-jun` 這種後綴
4. commit 後建置時 SSG 成 `/en/<company-slug>/<quarter>`

---

## API

| Endpoint | 說明 |
|---|---|
| `GET /api/presentations/search` | 搜尋（支援 q, type, page, limit） |
| `GET /api/presentations/[id]` | 單一法說會詳情 |
| `GET /api/presentations/company/[code]` | 公司所有法說會 |
| `GET /api/presentations/recent` | 最新法說會 |

---

## 部署

推薦使用 Vercel，連接 GitHub repo 後設定環境變數即可自動部署。

```bash
bun run build   # 建置
bun start       # 啟動生產伺服器
bun run lint    # 程式碼檢查
```
