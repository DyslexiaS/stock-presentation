import Link from 'next/link'
import { getMemosByTag, type EnTopic } from '@/lib/content/en-memos'

function folio(index: number) {
  return String(index + 1).padStart(2, '0')
}

export function TopicIndex({ topics }: { topics: EnTopic[] }) {
  const five = topics.length === 5

  return (
    <ul
      className={`mt-5 grid gap-px overflow-hidden border border-slate-300 bg-slate-300 ${
        five ? 'md:grid-cols-6' : 'md:grid-cols-3'
      }`}
    >
      {topics.map((topic, index) => {
        const count = getMemosByTag(topic.slug).length
        const featured = five && index === 0
        return (
          <li
            key={topic.slug}
            className={featured ? 'md:col-span-4' : five ? 'md:col-span-2' : undefined}
          >
            <Link
              href={`/en/topics/${topic.slug}`}
              className={`group relative flex h-full flex-col bg-[#f4f1ea] p-5 transition-colors hover:bg-white focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                featured ? 'md:p-7' : ''
              }`}
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-0 bg-[#e4b41a] transition-[width] duration-200 group-hover:w-1 group-focus-visible:w-1 motion-reduce:transition-none"
              />
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-[family-name:var(--font-en-serif)] text-xs tabular-nums tracking-[0.18em] text-slate-400">
                  {folio(index)}
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                  {count} note{count === 1 ? '' : 's'}
                </span>
              </div>
              <h3
                className={`mt-3 font-[family-name:var(--font-en-serif)] leading-tight tracking-tight text-slate-900 ${
                  featured ? 'text-2xl md:text-[1.85rem]' : 'text-xl'
                }`}
              >
                {topic.title}
              </h3>
              {topic.description ? (
                <p
                  className={`mt-2 text-sm leading-6 text-slate-600 ${
                    featured ? 'md:line-clamp-4 md:max-w-xl' : 'line-clamp-3'
                  }`}
                >
                  {topic.description}
                </p>
              ) : null}
              <span className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 group-hover:text-slate-900">
                Open hub
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
