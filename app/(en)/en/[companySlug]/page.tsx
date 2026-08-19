import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatQuarterLabel, getCompanySlugs, getMemosByCompany } from '@/lib/content/en-memos'
import { generateEnCompanyMetadata } from '@/lib/seo-en'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return getCompanySlugs().map((companySlug) => ({ companySlug }))
}

export async function generateMetadata({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params
  const memos = getMemosByCompany(companySlug)
  if (memos.length === 0) return {}
  return generateEnCompanyMetadata(companySlug, memos[0].companyName, memos[0].ticker, memos.length)
}

export default async function CompanyArchivePage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params
  const memos = getMemosByCompany(companySlug)
  if (memos.length === 0) notFound()

  const { companyName, ticker } = memos[0]

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
      <nav className="text-sm text-slate-500">
        <Link href="/en" className="hover:text-slate-800">English</Link>
        <span className="mx-2">/</span>
        <span>{companyName}</span>
      </nav>
      <header className="mt-8 border-b border-slate-300 pb-10">
        <h1 className="font-[family-name:var(--font-en-serif)] text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-slate-900 md:text-[3rem]">
          {companyName} ({ticker})
        </h1>
        <p className="mt-5 text-xl leading-relaxed text-slate-600">
          English earnings memos. {memos.length} briefing{memos.length === 1 ? '' : 's'} on file.
        </p>
      </header>
      <ul className="mt-10 divide-y divide-slate-200">
        {memos.map((memo) => (
          <li key={memo.quarter} className="group py-7 first:pt-2">
            <Link href={`/en/${memo.companySlug}/${memo.quarter}`}>
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                {memo.reportingPeriod || formatQuarterLabel(memo.quarter)} · {memo.eventDate}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-en-serif)] text-2xl leading-snug text-slate-900 group-hover:underline group-hover:decoration-slate-300 group-hover:underline-offset-4">
                {memo.title}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">{memo.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
