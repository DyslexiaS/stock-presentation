import Link from 'next/link'
import { formatTwTickerLabel, type EnCompanySummary } from '@/lib/content/en-memos'

export function CompanyIndexGrid({ companies }: { companies: EnCompanySummary[] }) {
  return (
    <ul className="mt-4 grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <li key={company.slug} className="bg-white">
          <Link href={`/en/${company.slug}`} className="block px-4 py-2.5 hover:bg-slate-50">
            <span className="text-slate-900">{company.name}</span>{' '}
            <span className="text-slate-400">{formatTwTickerLabel(company.ticker)}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function CompanyDirectoryList({ companies }: { companies: EnCompanySummary[] }) {
  return (
    <ul className="mt-4 grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2">
      {companies.map((company) => (
        <li key={company.slug} className="bg-white">
          <Link href={`/en/${company.slug}`} className="flex items-baseline justify-between gap-4 px-4 py-2.5 hover:bg-slate-50">
            <span className="text-slate-900">
              {company.name} <span className="text-slate-400">{formatTwTickerLabel(company.ticker)}</span>
            </span>
            <span className="shrink-0 text-sm text-slate-500">
              {company.count} call{company.count === 1 ? '' : 's'}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
