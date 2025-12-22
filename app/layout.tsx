import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AdSenseScript } from '@/components/ads/adsense-script'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'

// Single source of truth for canonical origin
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://finmoconf.diveinvest.net')
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'FinmoConf - 台股法說會資料庫 | 台積電、鴻海等上市櫃公司法說會簡報',
  description: 'FinmoConf 提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。FinmoAI 系列產品，支援公司代碼搜尋、PDF 快速下載，最新財報說明會、投資人簡報一應俱全。',
  keywords: [
    'FinmoConf', '台股法說會資料庫', '台股法說會', '法說會簡報', '台積電法說會簡報', '2330 法說會簡報', '鴻海法說會簡報', '2317 法說會簡報',
    '法人說明會', '法人說明會', '財報說明會', '台灣股市法說會', '上市公司法說會', '上櫃公司法說會',
    '法說會 PDF', '法說會下載', '投資人簡報', '財報簡報', '股票法說會', '公司法說會', '最新法說會',
    '台股法人說明會', '證券法說會', '上市簡報', '櫃買簡報', '興櫃簡報', "法說會行事曆", "法說會時間"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'FinmoAI' }],
  creator: 'FinmoAI',
  publisher: 'FinmoAI',
  category: 'Finance',
  classification: 'Finance',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'zh-TW': baseUrl,
      'x-default': baseUrl,
    },
  },
  openGraph: {
    title: 'FinmoConf - 台股法說會資料庫 | 台積電、鴻海等上市櫃公司法說會簡報',
    description: 'FinmoConf 提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。FinmoAI 系列產品，支援公司代碼搜尋、PDF 快速下載，最新財報說明會、投資人簡報一應俱全。',
    type: 'website',
    locale: 'zh_TW',
    url: baseUrl,
    siteName: 'FinmoConf - 台股法說會資料庫',
    images: [
      {
        url: `${baseUrl}/FinmoAI-brand.png`,
        width: 1200,
        height: 630,
        alt: "FinmoConf - 台股法說會簡報資料庫 - 台積電鴻海等上市櫃公司法人說明會",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinmoConf - 台股法說會資料庫 | 台積電、鴻海等法說會簡報',
    description: 'FinmoConf 提供最完整的台灣股市法說會簡報資料庫，FinmoAI 系列產品，支援公司代碼搜尋、PDF 下載',
    images: [`${baseUrl}/FinmoAI-brand.png`],
  },
  verification: {
    google: 'eY_A1hOpUgH61VizjCcMHu_JUGPZsleGNzR-SzeiM0Q'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className="antialiased">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W5JDVDM5');
            `,
          }}
        />
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "FinmoConf - 台股法說會資料庫",
              "alternateName": "FinmoConf - 台灣股市法說會簡報資料庫",
              "url": baseUrl,
              "description": "FinmoConf 提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。FinmoAI 系列產品，支援公司代碼搜尋、PDF 快速下載，最新財報說明會、投資人簡報一應俱全。",
              "inLanguage": "zh-TW",
              "publisher": {
                "@type": "Organization",
                "name": "FinmoAI",
                "url": baseUrl
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${baseUrl}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              },
              "about": {
                "@type": "Thing",
                "name": "台股法說會",
                "description": "台灣上市櫃公司法人說明會簡報資料"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "投資人、分析師、研究人員"
              },
              "mainEntity": {
                "@type": "Dataset",
                "name": "FinmoConf 台股法說會簡報資料集",
                "description": "FinmoConf 提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。FinmoAI 系列產品，支援公司代碼搜尋、PDF快速下載，最新財報說明會、投資人簡報一應俱全。涵蓋超過1000家公司的歷年法說會資料，為投資人、分析師提供完整的台股投資參考資訊。",
                "keywords": "FinmoConf,台股,法說會,法人說明會,財報,簡報,PDF",
                "creator": {
                  "@type": "Organization",
                  "name": "FinmoAI",
                  "url": baseUrl
                },
                "license": "https://creativecommons.org/licenses/by-nc/4.0/"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-neutral-50`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W5JDVDM5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <AdSenseScript />
      </body>
    </html>
  )
}