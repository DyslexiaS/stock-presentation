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
  getCompanyProfile,
  getCompanySlugs,
  getMemosByCompany,
  withTwTickers,
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
  const pageUrl = `${EN_BASE_URL}/en/${companySlug}`
  const pageTitle = `${companyName} ${formatTwTickerLabel(ticker)} Earnings Calls`

  return (
    <div className={`${EN_PAGE_WIDTH} py-14`}>
      <JsonLd data={generateEnCompanyJsonLd(companySlug, companyName, ticker, memos, profile)} />
      <EnBreadcrumb items={[{ label: companyName }]} />
      <header className="mt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="font-[family-name:var(--font-en-serif)] text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-slate-900 md:text-[3rem]">
            {pageTitle}
          </h1>
          <ShareLinks title={pageTitle} url={pageUrl} />
        </div>
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

      <EnSectionRule />

      {profile?.content && (
        <div>
          <MarkdownBody content={profile.content} />
        </div>
      )}

      <section>
        <h2 className="en-section-heading font-[family-name:var(--font-en-serif)] text-[2rem] font-semibold leading-tight tracking-tight text-slate-900">
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
                {withTwTickers(memo.title)}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">{withTwTickers(memo.description)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
