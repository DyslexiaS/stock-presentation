import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AdSenseScript } from '@/components/ads/adsense-script'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'

const baseUrl = process.env.NEXTAUTH_URL
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '台股法說會簡報搜尋 - 台積電、鴻海等上市櫃公司投資人說明會PDF下載',
  description: '提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。支援公司代碼搜尋、PDF快速下載，最新財報說明會、投資人簡報一應俱全。',
  keywords: [
    '台股法說會', '法說會簡報', '台積電法說會簡報', '2330法說會簡報', '鴻海法說會簡報', '2317法說會簡報',
    '法人說明會', '投資人說明會', '財報說明會', '台灣股市法說會', '上市公司法說會', '上櫃公司法說會',
    '法說會 PDF', '法說會下載', '投資人簡報', '財報簡報', '股票法說會', '公司法說會',
    '台股投資人說明會', '證券法說會', '股市簡報', '上市簡報', '櫃買簡報', '興櫃簡報', "法說會行事曆", "法說會時間"
  ],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    title: '台股法說會簡報資料庫',
    description: '最完整的台灣股市法說會簡報資料庫',
    type: 'website',
    locale: 'zh_TW',
    url: baseUrl,
      images: [
      {
        url: `${baseUrl}/FinmoAI-brand.png`,
        width: 1200,
        height: 630,
        alt: "台股法說會簡報資料庫",
        type: "image/png",
      },
    ],
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
      </head>
      <body className={`${inter.className} min-h-screen bg-neutral-50`}>
        {children}
      </body>
    </html>
  )
}