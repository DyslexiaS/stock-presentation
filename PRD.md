# 台股法說會搜尋平台 - 產品需求文檔 (PRD)

## 1. 產品概述

### 1.1 產品願景
打造台灣股市最權威的法說會資料搜尋平台，透過SEO優化獲取大量自然流量，並通過廣告變現。

### 1.2 目標用戶
- 個人投資者
- 金融分析師
- 投資顧問
- 財經記者
- 學術研究人員

### 1.3 核心價值主張
- **即時更新**：最新的上市、上櫃、興櫃公司法說會資料
- **快速搜尋**：公司代碼、名稱、日期多維度搜尋
- **便捷預覽**：PDF文件線上預覽
- **SEO友善**：搜尋引擎優化，提供最佳的內容發現體驗

## 2. SEO策略與關鍵字規劃

### 2.1 核心關鍵字群組

#### 主要關鍵字 (高搜尋量)
- 台股法說會
- 法人說明會
- 公司法說會
- 台灣股市法說會
- 上市公司法說會
- 財報法說會

#### 長尾關鍵字 (高轉換率)
- [公司名稱] 法說會 2025
- [股票代碼] 法說會 PDF
- [公司名稱] 財報說明會
- 台積電法說會時間
- 鴻海法說會直播
- [產業別] 法說會整理

#### 地理/時間相關關鍵字
- 今日法說會
- 本週法說會
- 2025年法說會時程
- Q1法說會
- 台北法說會

### 2.2 內容SEO策略
1. **動態頁面生成**：每個公司、每個日期都有獨立頁面
2. **結構化數據**：使用 JSON-LD 標記法說會資訊
3. **Meta優化**：動態生成相關的標題和描述
4. **內部連結**：相關公司、產業、時間的交叉連結
5. **網站地圖**：自動生成 XML sitemap
6. **載入速度**：圖片優化、CDN、快取策略

### 2.3 競爭分析
- **公開觀測站 (mops.twse.com.tw)**：官方資料但使用體驗差
- **CMoney、Goodinfo**：有法說會資訊但非專門平台
- **機會點**：專注法說會搜尋，更好的UX和SEO

## 3. 功能需求

### 3.1 核心功能

#### 3.1.1 搜尋功能
- **公司搜尋**：
  - 公司代碼 (如: 1101)
  - 公司名稱 (如: 台泥)
  - 模糊搜尋支援
- **日期搜尋**：
  - 單一日期
  - 日期範圍
  - 本週/本月快速選項
- **分類搜尋**：
  - 上市 (sii)
  - 上櫃 (otc)
  - 興櫃 (rotc)

#### 3.1.2 展示功能
- **列表展示**：
  - 公司基本資訊 (代碼、名稱、日期)
  - 分類標籤 (上市/上櫃/興櫃)
  - PDF下載連結
- **詳細頁面**：
  - 完整公司資訊
  - PDF預覽 (預設中文版)
  - 相關法說會推薦

#### 3.1.3 PDF處理
- **線上預覽**：
  - PDF.js 整合
  - 行動裝置優化
  - 全螢幕模式
  - 中文版 (presentationTWUrl)

### 3.2 輔助功能

#### 3.2.1 使用者體驗
- **響應式設計**：手機、平板、桌面適配
- **深色模式**：可選的暗色主題
- **搜尋歷史**：本地儲存使用者搜尋記錄

#### 3.2.2 效能優化
- **分頁載入**：大量數據分頁顯示
- **快取機制**：API回應快取
- **CDN整合**：靜態資源加速
- **懶載入**：圖片和PDF懶載入

## 4. 技術架構

### 4.1 前端技術棧
- **框架**：Next.js 15
- **樣式**：Tailwind CSS + shadcn/ui
- **狀態管理**：Zustand
- **PDF處理**：react-pdf
- **搜尋UI**：Algolia InstantSearch (可選)

### 4.2 後端技術棧
- **API**：Next.js API Routes
- **資料庫**：MongoDB + Mongoose
- **快取**：Redis (可選)

### 4.3 資料模型

```javascript
// Presentation Schema
{
  _id: ObjectId,
  companyCode: String,    // "1101"
  companyName: String,    // "台泥"
  eventDate: Date,        // 2025-05-19T00:00:00.000+00:00
  presentationTWUrl: String,  // 中文PDF連結
  presentationEnUrl: String,  // 英文PDF連結
  typeK: String,          // "sii" | "otc" | "rotc"
  createdAt: Date,
  updatedAt: Date,
  // SEO相關欄位
  slug: String,           // URL友善格式
  keywords: [String],     // 相關關鍵字
  description: String     // Meta描述
}
```

### 4.4 API設計

#### 4.4.1 搜尋API
```
GET /api/presentations/search
Query Parameters:
- q: 搜尋關鍵字
- companyCode: 公司代碼
- dateFrom: 開始日期
- dateTo: 結束日期
- type: sii|otc|rotc
- page: 頁碼
- limit: 每頁數量
```

#### 4.4.2 詳細資料API
```
GET /api/presentations/[id]
GET /api/presentations/company/[companyCode]
```

## 5. SEO技術實作

### 5.1 頁面結構
- **首頁** (`/`)：搜尋界面 + 最新法說會
- **搜尋結果頁** (`/search?q=...`)：搜尋結果列表
- **公司頁面** (`/company/[companyCode]`)：單一公司所有法說會
- **法說會詳細頁** (`/presentation/[id]`)：單一法說會詳細資訊
- **分類頁面** (`/sii`, `/otc`, `/rotc`)：依類型分類
- **日期頁面** (`/date/[date]`)：特定日期的所有法說會

### 5.2 Meta優化
- **動態標題**：`{公司名稱} ({公司代碼}) 法說會 - {日期} | 台股法說會搜尋`
- **Meta描述**：`查看{公司名稱}最新法說會資料，包含中英文PDF下載和線上預覽。更新日期：{日期}`
- **Open Graph**：社群分享優化
- **結構化數據**：Event、Organization schema

### 5.3 網站地圖
- 自動生成XML sitemap
- 包含所有公司、日期、分類頁面
- 定期更新頻率設定

## 6. 變現策略

### 6.1 廣告配置
- **Google AdSense**：
  - 頁首橫幅 (728x90)
  - 側邊廣告 (300x250)
  - 內容內廣告 (320x50 行動版)
  - PDF預覽旁廣告位

### 6.2 進階功能 (未來)
- **Premium會員**：
  - 批量下載
  - 法說會提醒
  - 進階搜尋篩選
- **API服務**：提供付費API給金融服務商

## 7. 設計系統

### 7.1 色彩配置
- **主背景**：淺灰 (#fafafa)
- **卡片背景**：白色 (#ffffff)
- **邊框**：淺灰 (#e2e8f0)
- **主色調**：專業藍 (#5b7e91)
- **文字**：深灰 (#0f172a)
- **次要文字**：中灰 (#64748b)
- **按鈕**：深色 (#0f172a)

### 7.2 設計原則
- 簡潔優先，可刪就刪
- 使用陰影表示重點強調
- 淺灰底為主背景，白色為區塊底色
- 顏色由左到右代表使用者注意力順序
- 酷炫元素要小而美，不喧賓奪主

## 8. 開發階段

### 8.1 MVP (最小可行產品)
1. 基礎搜尋功能
2. PDF 預覽
3. 響應式設計
4. 基礎SEO優化

### 8.2 迭代功能
1. 進階搜尋
2. 使用者帳號系統
3. 書籤收藏
4. 廣告整合
5. 效能優化

### 8.3 成功指標
- **流量目標**：6個月內達到月活10萬UV
- **SEO目標**：核心關鍵字排名前 5
- **變現目標**：月廣告收入達 $1000 USD
- **技術指標**：頁面載入時間 < 2秒

## 9. 風險評估

### 9.1 技術風險
- PDF 檔案過大導致載入緩慢
- MongoDB 查詢效能問題
- SEO 競爭激烈

### 9.2 商業風險
- 官方政策變更影響資料取得
- 廣告點擊率不如預期
- 競爭對手快速跟進

### 9.3 應對策略
- PDF 快取和 CDN 加速
- 資料庫索引優化
- 多元化關鍵字策略
- 功能差異化競爭