import { IBM_Plex_Sans, Source_Serif_4 } from 'next/font/google'
import { AdSenseScript } from '@/components/ads/adsense-script'
import '../globals.css'

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-en-sans',
})

const serif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-en-serif',
})

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plex.variable} ${serif.variable} antialiased`}>
      <body className="min-h-screen bg-[#f4f1ea] font-[family-name:var(--font-en-sans)]">
        {children}
        <AdSenseScript />
      </body>
    </html>
  )
}
