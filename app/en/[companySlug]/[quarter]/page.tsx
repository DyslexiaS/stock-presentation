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
    <div className="mx-auto max-w-3xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm text-slate-500">
        <Link href="/en" className="hover:text-slate-800">English</Link>
        <span className="mx-2">/</span>
        <Link href={`/en/${memo.companySlug}`} className="hover:text-slate-800">{memo.companyName}</Link>
        <span className="mx-2">/</span>
        <span>{memo.reportingPeriod || formatQuarterLabel(memo.quarter)}</span>
      </nav>

      <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        {memo.companyName} ({memo.ticker}) · call date {memo.eventDate}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-en-serif)] text-4xl font-semibold tracking-tight text-slate-900">
        {memo.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">{memo.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {memo.tags.map((tag) => (
          <Link
            key={tag}
            href={`/en/topics/${tag}`}
            className="rounded-full bg-slate-900 px-3 py-1 text-xs uppercase tracking-wide text-white hover:bg-slate-700"
          >
            {tag}
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-white p-6 shadow-sm md:p-10">
        <MarkdownBody content={memo.content} />
      </div>

      {archive.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">More {memo.companyName} memos</h2>
          <ul className="mt-3 space-y-2">
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
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Related 800V memos</h2>
          <ul className="mt-3 space-y-2">
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
