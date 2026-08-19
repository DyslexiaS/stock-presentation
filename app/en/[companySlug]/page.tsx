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
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/en" className="hover:text-slate-800">English</Link>
        <span className="mx-2">/</span>
        <span>{companyName}</span>
      </nav>
      <h1 className="mt-4 font-[family-name:var(--font-en-serif)] text-4xl font-semibold tracking-tight text-slate-900">
        {companyName} ({ticker})
      </h1>
      <p className="mt-3 text-lg text-slate-600">
        English earnings memos. {memos.length} briefing{memos.length === 1 ? '' : 's'} on file.
      </p>
      <ul className="mt-10 space-y-4">
        {memos.map((memo) => (
          <li key={memo.quarter}>
            <Link href={`/en/${memo.companySlug}/${memo.quarter}`} className="block bg-white p-5 shadow-sm hover:shadow-md">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {memo.reportingPeriod || formatQuarterLabel(memo.quarter)} · {memo.eventDate}
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-en-serif)] text-xl text-slate-900">{memo.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{memo.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
