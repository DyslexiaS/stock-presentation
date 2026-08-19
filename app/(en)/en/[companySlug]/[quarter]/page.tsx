import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MarkdownBody } from '@/components/en/markdown-body'
import {
  formatQuarterLabel,
  getAllMemos,
  getMemo,
  getMemosByCompany,
  getRelatedMemos,
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

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-slate-500">
        <Link href="/en" className="hover:text-slate-800">English</Link>
        <span className="mx-2">/</span>
        <Link href={`/en/${memo.companySlug}`} className="hover:text-slate-800">{memo.companyName}</Link>
        <span className="mx-2">/</span>
        <span>{memo.reportingPeriod || formatQuarterLabel(memo.quarter)}</span>
      </nav>

      <header className="mt-8 border-b border-slate-300 pb-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          {memo.companyName} ({memo.ticker}) · call date {memo.eventDate}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-en-serif)] text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-slate-900 md:text-[3rem]">
          {memo.title}
        </h1>
        <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-600">{memo.description}</p>
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

      <div className="mt-14">
        <MarkdownBody content={memo.content} />
      </div>

      {archive.length > 0 && (
        <section className="mt-16 border-t border-slate-300 pt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">More {memo.companyName} earnings calls</h2>
          <ul className="mt-4 space-y-3">
            {archive.map((item) => (
              <li key={item.quarter}>
                <Link href={`/en/${item.companySlug}/${item.quarter}`} className="text-slate-800 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-800">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Related 800V companies</h2>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={`${item.companySlug}-${item.quarter}`}>
                <Link href={`/en/${item.companySlug}/${item.quarter}`} className="text-slate-800 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-800">
                  {item.companyName}: {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
