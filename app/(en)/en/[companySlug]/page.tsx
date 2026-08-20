import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/en/json-ld'
import { MarkdownBody } from '@/components/en/markdown-body'
import {
  formatQuarterLabel,
  getCompanyProfile,
  getCompanySlugs,
  getMemosByCompany,
} from '@/lib/content/en-memos'
import { generateEnCompanyJsonLd, generateEnCompanyMetadata } from '@/lib/seo-en'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return getCompanySlugs().map((companySlug) => ({ companySlug }))
}

export async function generateMetadata({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params
  const memos = getMemosByCompany(companySlug)
  if (memos.length === 0) return {}
  const profile = getCompanyProfile(companySlug)
  return generateEnCompanyMetadata(companySlug, memos[0].companyName, memos[0].ticker, memos.length, profile)
}

export default async function CompanyArchivePage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params
  const memos = getMemosByCompany(companySlug)
  if (memos.length === 0) notFound()

  const { companyName, ticker } = memos[0]
  const profile = getCompanyProfile(companySlug)

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
      <JsonLd data={generateEnCompanyJsonLd(companySlug, companyName, ticker, memos, profile)} />
      <nav className="text-sm text-slate-500">
        <Link href="/en" className="hover:text-slate-800">English</Link>
        <span className="mx-2">/</span>
        <span>{companyName}</span>
      </nav>
      <header className="mt-8 border-b border-slate-300 pb-10">
        <h1 className="font-[family-name:var(--font-en-serif)] text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-slate-900 md:text-[3rem]">
          {companyName} ({ticker}) Earnings Calls
        </h1>
        <p className="mt-5 text-xl leading-relaxed text-slate-600">
          English notes on {memos.length} Taiwan earnings call{memos.length === 1 ? '' : 's'}.
        </p>
        {profile && (
          <dl className="mt-7 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-[max-content_1fr]">
            {profile.tier && (
              <>
                <dt className="font-semibold uppercase tracking-[0.14em] text-slate-500">Tier</dt>
                <dd className="text-slate-700">{profile.tier}</dd>
              </>
            )}
            {profile.role && (
              <>
                <dt className="font-semibold uppercase tracking-[0.14em] text-slate-500">Role</dt>
                <dd className="text-slate-700">{profile.role}</dd>
              </>
            )}
          </dl>
        )}
      </header>

      {profile?.content && (
        <div className="mt-14">
          <MarkdownBody content={profile.content} />
        </div>
      )}

      <section className="mt-16 border-t border-slate-300 pt-10">
        <h2 className="font-[family-name:var(--font-en-serif)] text-[2rem] font-semibold leading-tight tracking-tight text-slate-900">
          Earnings calls
        </h2>
      </section>
      <ul className="mt-4 divide-y divide-slate-200">
        {memos.map((memo) => (
          <li key={memo.quarter} className="group py-7 first:pt-2">
            <Link href={`/en/${memo.companySlug}/${memo.quarter}`}>
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                {memo.reportingPeriod || formatQuarterLabel(memo.quarter)} · {memo.eventDate}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-en-serif)] text-2xl leading-snug text-slate-900 group-hover:underline group-hover:decoration-slate-300 group-hover:underline-offset-4">
                {memo.title}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">{memo.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
