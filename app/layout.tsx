import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import { AdSenseScript } from '@/components/ads/adsense-script'
import './globals.css'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finmoconf.diveinvest.net'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'FinmoConf - 台股法說會資料庫 | 台積電、鴻海等上市櫃公司法說會簡報',
  description: 'FinmoConf 提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。FinmoAI 系列產品，支援公司代碼搜尋、PDF 快速下載，最新財報說明會、投資人簡報一應俱全。',
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = (await headers()).get('x-locale') === 'en' ? 'en' : 'zh-TW'

  return (
    <html lang={locale} className="antialiased">
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": locale === 'en' ? 'FinmoConf English - Taiwan Semiconductor Earnings' : 'FinmoConf - 台股法說會資料庫',
              "alternateName": locale === 'en' ? 'FinmoConf English' : 'FinmoConf - 台灣股市法說會簡報資料庫',
              "url": locale === 'en' ? `${baseUrl}/en` : baseUrl,
              "description": locale === 'en'
                ? 'English earnings-call briefings on Taiwan semiconductor and AI infrastructure companies.'
                : 'FinmoConf 提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。FinmoAI 系列產品，支援公司代碼搜尋、PDF 快速下載，最新財報說明會、投資人簡報一應俱全。',
              "inLanguage": locale === 'en' ? 'en' : 'zh-TW',
              "publisher": {
                "@type": "Organization",
                "name": "FinmoAI",
                "url": baseUrl
              },
              ...(locale === 'en' ? {
                about: {
                  "@type": "Thing",
                  name: "Taiwan semiconductor earnings",
                  description: "English briefings of Taiwan-listed company earnings calls",
                },
              } : {
                about: {
                  "@type": "Thing",
                  name: "台股法說會",
                  description: "台灣上市櫃公司法人說明會簡報資料",
                },
                audience: {
                  "@type": "Audience",
                  audienceType: "投資人、分析師、研究人員",
                },
                mainEntity: {
                  "@type": "Dataset",
                  name: "FinmoConf 台股法說會簡報資料集",
                  description: "FinmoConf 提供台積電(2330)、鴻海(2317)等台灣上市櫃興櫃公司完整法說會簡報資料。FinmoAI 系列產品，支援公司代碼搜尋、PDF快速下載，最新財報說明會、投資人簡報一應俱全。涵蓋超過1000家公司的歷年法說會資料，為投資人、分析師提供完整的台股投資參考資訊。",
                  keywords: "FinmoConf,台股,法說會,法人說明會,財報,簡報,PDF",
                  creator: {
                    "@type": "Organization",
                    name: "FinmoAI",
                    url: baseUrl,
                  },
                  license: "https://creativecommons.org/licenses/by-nc/4.0/",
                },
              }),
            })
          }}
        />
      </head>
      <body className={`${locale === 'en' ? '' : inter.className} min-h-screen ${locale === 'en' ? 'bg-[#f4f1ea]' : 'bg-neutral-50'}`}>
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