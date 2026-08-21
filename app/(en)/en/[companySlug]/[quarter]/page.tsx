import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EnBreadcrumb } from '@/components/en/breadcrumb'
import { JsonLd } from '@/components/en/json-ld'
import { MarkdownBody } from '@/components/en/markdown-body'
import { EnSectionRule } from '@/components/en/section-rule'
import { ShareLinks } from '@/components/en/share-links'
import { EN_PAGE_WIDTH } from '@/components/en/site-chrome'
import {
  EN_BASE_URL,
  formatQuarterLabel,
  formatTwTickerLabel,
  getAllMemos,
  getMemo,
  getMemosByCompany,
  getRelatedMemos,
  withTwTickers,
} from '@/lib/content/en-memos'
import { generateEnMemoJsonLd, generateEnMemoMetadata } from '@/lib/seo-en'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return getAllMemos().map((memo) => ({
    companySlug: memo.companySlug,
    quarter: memo.quarter,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ companySlug: string; quarter: string }>
}) {
  const { companySlug, quarter } = await params
  const memo = getMemo(companySlug, quarter)
  if (!memo) return {}
  return generateEnMemoMetadata(memo)
}

export default async function MemoPage({
  params,
}: {
  params: Promise<{ companySlug: string; quarter: string }>
}) {
  const { companySlug, quarter } = await params
  const memo = getMemo(companySlug, quarter)
  if (!memo) notFound()

  const related = getRelatedMemos(memo)
  const archive = getMemosByCompany(companySlug).filter((m) => m.quarter !== quarter)
  const jsonLd = generateEnMemoJsonLd(memo)
  const pageUrl = `${EN_BASE_URL}/en/${memo.companySlug}/${memo.quarter}`
  const displayTitle = withTwTickers(memo.title)

  return (
    <div className={`${EN_PAGE_WIDTH} py-14`}>
      <JsonLd data={jsonLd} />
      <EnBreadcrumb
        items={[
          { href: `/en/${memo.companySlug}`, label: memo.companyName },
          { label: memo.reportingPeriod || formatQuarterLabel(memo.quarter) },
        ]}
      />

      <header className="mt-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          {memo.companyName} {formatTwTickerLabel(memo.ticker)} · call date {memo.eventDate}
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="font-[family-name:var(--font-en-serif)] text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-slate-900 md:text-[3rem]">
            {displayTitle}
          </h1>
          <ShareLinks title={displayTitle} url={pageUrl} />
        </div>
        <p className="mt-5 max-w-4xl text-xl leading-relaxed text-slate-600">{withTwTickers(memo.description)}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {memo.tags.map((tag) => (
            <Link
              key={tag}
              href={`/en/topics/${tag}`}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs uppercase tracking-wide text-slate-600 transition-colors hover:border-slate-900 hover:text-slate-900"
            >
              {tag}
            </Link>
          ))}
        </div>
      </header>

      <EnSectionRule />

      <div>
        <MarkdownBody content={memo.content} />
      </div>

      {archive.length > 0 && (
        <section>
          <EnSectionRule />
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">More {memo.companyName} earnings calls</h2>
          <ul className="mt-4 space-y-3">
            {archive.map((item) => (
              <li key={item.quarter}>
                <Link href={`/en/${item.companySlug}/${item.quarter}`} className="text-slate-800 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-800">
                  {withTwTickers(item.title)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <EnSectionRule />
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Related 800V companies</h2>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={`${item.companySlug}-${item.quarter}`}>
                <Link href={`/en/${item.companySlug}/${item.quarter}`} className="text-slate-800 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-800">
                  {item.companyName}: {withTwTickers(item.title)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
