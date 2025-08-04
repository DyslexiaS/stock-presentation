import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AdSenseScript } from '@/components/ads/adsense-script'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'

const baseUrl = process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://stock.diveinvest.net')
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '台股法說會資料庫 - 台積電、鴻海等上市櫃公司法說會簡報、影音資訊',
  description: '提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。支援公司代碼搜尋、PDF 快速下載，最新財報說明會、投資人簡報一應俱全。',
  keywords: [
    '台股法說會資料庫', '台股法說會', '法說會簡報', '台積電法說會簡報', '2330 法說會簡報', '鴻海法說會簡報', '2317 法說會簡報',
    '法人說明會', '投資人說明會', '財報說明會', '台灣股市法說會', '上市公司法說會', '上櫃公司法說會',
    '法說會 PDF', '法說會下載', '投資人簡報', '財報簡報', '股票法說會', '公司法說會',
    '台股投資人說明會', '證券法說會', '上市簡報', '櫃買簡報', '興櫃簡報', "法說會行事曆", "法說會時間"
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
    title: '台股法說會資料庫 - 台積電、鴻海等上市櫃公司法說會簡報',
    description: '提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。支援公司代碼搜尋、PDF 快速下載，最新財報說明會、投資人簡報一應俱全。',
    type: 'website',
    locale: 'zh_TW',
    url: baseUrl,
    siteName: '台股法說會資料庫',
    images: [
      {
        url: `${baseUrl}/FinmoAI-brand.png`,
        width: 1200,
        height: 630,
        alt: "台股法說會簡報資料庫 - 台積電鴻海等上市櫃公司投資人說明會",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '台股法說會資料庫 - 台積電、鴻海等法說會簡報',
    description: '最完整的台灣股市法說會簡報資料庫，支援公司代碼搜尋、PDF下載',
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
        <AdSenseScript />
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "台股法說會資料庫",
              "alternateName": "台灣股市法說會簡報資料庫",
              "url": baseUrl,
              "description": "提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。支援公司代碼搜尋、PDF 快速下載，最新財報說明會、投資人簡報一應俱全。",
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
                "description": "台灣上市櫃公司投資人說明會簡報資料"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "投資人、分析師、研究人員"
              },
              "mainEntity": {
                "@type": "Dataset",
                "name": "台股法說會簡報資料集",
                "description": "提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。支援公司代碼搜尋、PDF快速下載，最新財報說明會、投資人簡報一應俱全。涵蓋超過1000家公司的歷年法說會資料，為投資人、分析師提供完整的台股投資參考資訊。",
                "keywords": "台股,法說會,投資人說明會,財報,簡報,PDF",
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
        {children}
      </body>
    </html>
  )
}