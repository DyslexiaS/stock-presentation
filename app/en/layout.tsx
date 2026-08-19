import { IBM_Plex_Sans, Source_Serif_4 } from 'next/font/google'
import { EnFooter, EnHeader } from '@/components/en/site-chrome'
import { generateEnLayoutMetadata } from '@/lib/seo-en'

export const metadata = generateEnLayoutMetadata()

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-en-sans',
})

const serif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-en-serif',
})

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${plex.variable} ${serif.variable} min-h-screen bg-[#f4f1ea] font-[family-name:var(--font-en-sans)]`}>
      <EnHeader />
      <main>{children}</main>
      <EnFooter />
    </div>
  )
}
