import Link from 'next/link'
import { CompanyIndexGrid } from '@/components/en/company-index'
import { JsonLd } from '@/components/en/json-ld'
import { MemoCard } from '@/components/en/memo-card'
import { EN_PAGE_WIDTH } from '@/components/en/site-chrome'
import { TopicIndex } from '@/components/en/topic-index'
import {
  EN_HOME_LATEST_COUNT,
  getAllMemos,
  getAllTopics,
  getCompanySummaries,
} from '@/lib/content/en-memos'
import { generateEnHomeJsonLd, generateEnHomeMetadata } from '@/lib/seo-en'

export const metadata = generateEnHomeMetadata()
export const dynamic = 'force-static'

export default function EnglishHomePage() {
  const memos = getAllMemos()
  const latest = memos.slice(0, EN_HOME_LATEST_COUNT)
  const topics = getAllTopics().filter((topic) => topic.description || topic.content)
  const companies = getCompanySummaries()

  return (
    <div className={`${EN_PAGE_WIDTH} py-12`}>
      <JsonLd data={generateEnHomeJsonLd()} />
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Overseas research desk</p>
      <h1 className="mt-3 font-[family-name:var(--font-en-serif)] text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
        Taiwan Semiconductor Earnings Calls
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Notes on Taiwan investor conferences, written in English for overseas investors. {companies.length} companies and {memos.length} calls, starting with NVIDIA&apos;s 800 VDC architecture, the liquid-cooling loop in the same rack, the SiC/GaN devices that have to switch that voltage, the ODMs that assemble the cabinet, and TSMC CoWoS under the GPU.
      </p>

      <section className="mt-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Topics</h2>
          <p className="text-xs tabular-nums text-slate-400">{topics.length} hubs</p>
        </div>
        <TopicIndex topics={topics} />
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Companies</h2>
          <Link href="/en/companies" className="text-xs uppercase tracking-[0.14em] text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-slate-800 hover:decoration-slate-800">
            Full directory
          </Link>
        </div>
        <p className="mt-2 text-sm text-slate-500">
          Ticker first, A–Z by name. The number is how many English notes we have.
        </p>
        <CompanyIndexGrid companies={companies} />
      </section>

      <section className="mt-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Latest earnings calls</h2>
          <Link href="/en/calls" className="text-xs uppercase tracking-[0.14em] text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-slate-800 hover:decoration-slate-800">
            Browse all {memos.length} calls
          </Link>
        </div>
        <ul className="mt-4 space-y-4">
          {latest.map((memo) => (
            <li key={`${memo.companySlug}-${memo.quarter}`}>
              <MemoCard memo={memo} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
