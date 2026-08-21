import Link from 'next/link'
import { JsonLd } from '@/components/en/json-ld'
import { EN_PAGE_WIDTH } from '@/components/en/site-chrome'
import {
  getAllMemos,
  getAllTopics,
  formatQuarterLabel,
  formatTwTickerLabel,
  withTwTickers,
} from '@/lib/content/en-memos'
import { generateEnHomeJsonLd, generateEnHomeMetadata } from '@/lib/seo-en'

export const metadata = generateEnHomeMetadata()
export const dynamic = 'force-static'

export default function EnglishHomePage() {
  const memos = getAllMemos()
  const topics = getAllTopics().filter((topic) => topic.description || topic.content)
  const companies = Array.from(
    memos.reduce((map, memo) => {
      if (!map.has(memo.companySlug)) {
        map.set(memo.companySlug, { slug: memo.companySlug, name: memo.companyName, ticker: memo.ticker, count: 0 })
      }
      map.get(memo.companySlug)!.count += 1
      return map
    }, new Map<string, { slug: string; name: string; ticker: string; count: number }>())
      .values()
  )

  return (
    <div className={`${EN_PAGE_WIDTH} py-12`}>
      <JsonLd data={generateEnHomeJsonLd()} />
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Overseas research desk</p>
      <h1 className="mt-3 font-[family-name:var(--font-en-serif)] text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
        Taiwan Semiconductor Earnings Calls
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Notes on Taiwan investor conferences, written in English for overseas investors. First collection: {companies.length} companies and {memos.length} calls tied to NVIDIA&apos;s 800 VDC AI data-center architecture.
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
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Companies</h2>
        <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-200 bg-white">
          {companies.map((company) => (
            <li key={company.slug}>
              <Link href={`/en/${company.slug}`} className="flex items-baseline justify-between gap-4 px-5 py-3 hover:bg-slate-50">
                <span className="text-slate-900">
                  {company.name} <span className="text-slate-400">{formatTwTickerLabel(company.ticker)}</span>
                </span>
                <span className="text-sm text-slate-500">{company.count} call{company.count === 1 ? '' : 's'}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Latest earnings calls</h2>
        <ul className="mt-4 space-y-4">
          {memos.map((memo) => (
            <li key={`${memo.companySlug}-${memo.quarter}`}>
              <Link href={`/en/${memo.companySlug}/${memo.quarter}`} className="block bg-white p-5 shadow-sm hover:shadow-md">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {memo.companyName} {formatTwTickerLabel(memo.ticker)} · {memo.reportingPeriod || formatQuarterLabel(memo.quarter)}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-en-serif)] text-xl text-slate-900">{withTwTickers(memo.title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{withTwTickers(memo.description)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
