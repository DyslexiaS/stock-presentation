import Link from 'next/link'
import { AdBanner } from '@/components/ads/ad-banner'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Ad */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="container mx-auto px-4">
          <AdBanner
            slot={process.env.NEXT_PUBLIC_ADSENSE_HEADER_SLOT || "6322775233"}
            format="auto"
            className="w-full max-w-4xl mx-auto"
            style={{ minHeight: '90px' }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">找不到頁面</h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            抱歉，您尋找的頁面不存在。可能是網址輸入錯誤，或頁面已被移除。
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-block bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors"
            >
              返回首頁
            </Link>
            
            <div className="text-sm text-slate-500">
              <p>您可以：</p>
              <ul className="mt-2 space-y-1">
                <li>• 檢查網址是否正確</li>
                <li>• 使用搜尋功能尋找法說會資料</li>
                <li>• 瀏覽最新的法人說明會簡報</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Content Ad */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <AdBanner
            slot={process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT || "1138747228"}
            format="auto"
            className="w-full max-w-4xl mx-auto"
            style={{ minHeight: '90px' }}
          />
        </div>
      </div>

      {/* Structured Data for 404 Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "頁面未找到 - FinmoConf",
            "description": "您尋找的頁面不存在。FinmoConf 台股法說會資料庫提供完整的法人說明會簡報資料。",
            "url": "https://finmoconf.diveinvest.net/404",
            "isPartOf": {
              "@type": "WebSite",
              "name": "FinmoConf - 台股法說會資料庫",
              "url": "https://finmoconf.diveinvest.net/"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "首頁",
                  "item": "https://finmoconf.diveinvest.net/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "頁面未找到"
                }
              ]
            }
          })
        }}
      />
    </div>
  )
}
