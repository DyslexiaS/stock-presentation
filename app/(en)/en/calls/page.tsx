import { EnBreadcrumb } from '@/components/en/breadcrumb'
import { JsonLd } from '@/components/en/json-ld'
import { MemoCard } from '@/components/en/memo-card'
import { EN_PAGE_WIDTH } from '@/components/en/site-chrome'
import { getAllMemos } from '@/lib/content/en-memos'
import { generateEnCallsJsonLd, generateEnCallsMetadata } from '@/lib/seo-en'

export const metadata = generateEnCallsMetadata()
export const dynamic = 'force-static'

export default function EnglishCallsPage() {
  const memos = getAllMemos()

  return (
    <div className={`${EN_PAGE_WIDTH} py-14`}>
      <JsonLd data={generateEnCallsJsonLd()} />
      <EnBreadcrumb items={[{ label: 'All calls' }]} />
      <header className="mt-8">
        <h1 className="font-[family-name:var(--font-en-serif)] text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-slate-900 md:text-[3rem]">
          All earnings calls
        </h1>
        <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-600">
          {memos.length} English notes, newest first.
        </p>
      </header>
      <ul className="mt-10 space-y-4">
        {memos.map((memo) => (
          <li key={`${memo.companySlug}-${memo.quarter}`}>
            <MemoCard memo={memo} />
          </li>
        ))}
      </ul>
    </div>
  )
}
