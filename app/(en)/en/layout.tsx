import { EnFooter, EnHeader } from '@/components/en/site-chrome'
import { generateEnLayoutMetadata } from '@/lib/seo-en'

export const metadata = generateEnLayoutMetadata()

export default function EnglishSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EnHeader />
      <main>{children}</main>
      <EnFooter />
    </>
  )
}
