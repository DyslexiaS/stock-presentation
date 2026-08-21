import Link from 'next/link'
import {
  formatQuarterLabel,
  formatTwTickerLabel,
  withTwTickers,
  type EnMemo,
} from '@/lib/content/en-memos'

export function MemoCard({ memo }: { memo: EnMemo }) {
  return (
    <Link href={`/en/${memo.companySlug}/${memo.quarter}`} className="block bg-white p-5 shadow-sm hover:shadow-md">
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {memo.companyName} {formatTwTickerLabel(memo.ticker)} · {memo.reportingPeriod || formatQuarterLabel(memo.quarter)}
      </p>
      <h3 className="mt-1 font-[family-name:var(--font-en-serif)] text-xl text-slate-900">{withTwTickers(memo.title)}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{withTwTickers(memo.description)}</p>
    </Link>
  )
}
