import Link from 'next/link'
import { CompanyIndexGrid } from '@/components/en/company-index'
import { JsonLd } from '@/components/en/json-ld'
import { MemoCard } from '@/components/en/memo-card'
import { EN_PAGE_WIDTH } from '@/components/en/site-chrome'
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
        Notes on Taiwan investor conferences, written in English for overseas investors. {companies.length} companies and {memos.length} calls, starting with NVIDIA&apos;s 800 VDC architecture and the liquid-cooling loop in the same rack.
      </p>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Topics</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/en/topics/${topic.slug}`}
              className="border-l-4 border-slate-900 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="font-[family-name:var(--font-en-serif)] text-xl text-slate-900">{topic.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Companies</h2>
          <Link href="/en/companies" className="text-sm text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-slate-800 hover:decoration-slate-800">
            View directory
          </Link>
        </div>
        <CompanyIndexGrid companies={companies} />
      </section>

      <section className="mt-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Latest earnings calls</h2>
          <Link href="/en/calls" className="text-sm text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-slate-800 hover:decoration-slate-800">
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
