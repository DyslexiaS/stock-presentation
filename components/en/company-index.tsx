import Link from 'next/link'
import { formatTwTickerLabel, type EnCompanySummary } from '@/lib/content/en-memos'

export function CompanyIndexGrid({ companies }: { companies: EnCompanySummary[] }) {
  return (
    <ul className="mt-5 grid grid-cols-1 gap-px overflow-hidden border border-slate-300 bg-slate-300 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {companies.map((company) => (
        <li key={company.slug}>
          <Link
            href={`/en/${company.slug}`}
            className="group flex items-baseline justify-between gap-3 bg-[#f4f1ea] px-3.5 py-2.5 transition-colors hover:bg-white focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <span className="min-w-0 truncate">
              <span className="text-[11px] tabular-nums tracking-wide text-slate-500">
                {formatTwTickerLabel(company.ticker)}
              </span>
              <span className="ml-2 text-slate-900 group-hover:underline group-hover:decoration-slate-300 group-hover:underline-offset-4">
                {company.name}
              </span>
            </span>
            <span className="shrink-0 text-[11px] tabular-nums text-slate-400">
              {company.count}
            </span>
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
