import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/en/json-ld'
import { MarkdownBody } from '@/components/en/markdown-body'
import { formatQuarterLabel, getAllTags, getMemosByTag, getTopic } from '@/lib/content/en-memos'
import { generateEnTopicJsonLd, generateEnTopicMetadata } from '@/lib/seo-en'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const topic = getTopic(tag) ?? { slug: tag, title: tag, description: '', content: '' }
  const memos = getMemosByTag(tag)
  if (memos.length === 0 && !getTopic(tag)) return {}
  return generateEnTopicMetadata(topic, memos.length)
}

export default async function TopicPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const topic = getTopic(tag)
  const memos = getMemosByTag(tag)
  if (memos.length === 0 && !topic) notFound()

  const title = topic?.title ?? tag
  const description = topic?.description ?? ''
  const jsonLdTopic = topic ?? { slug: tag, title, description, content: '' }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
      <JsonLd data={generateEnTopicJsonLd(jsonLdTopic, memos)} />
      <nav className="text-sm text-slate-500">
        <Link href="/en" className="hover:text-slate-800">English</Link>
        <span className="mx-2">/</span>
        <span>Topics</span>
      </nav>
      <header className="mt-8 border-b border-slate-300 pb-10">
        <h1 className="font-[family-name:var(--font-en-serif)] text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-slate-900 md:text-[3rem]">
          {title}
        </h1>
        {description && <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-600">{description}</p>}
      </header>

      {topic?.content && (
        <div className="mt-14">
          <MarkdownBody content={topic.content} />
        </div>
      )}

      <section className="mt-16 border-t border-slate-300 pt-8">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Earnings calls in this topic</h2>
        <ul className="mt-4 space-y-4">
          {memos.map((memo) => (
            <li key={`${memo.companySlug}-${memo.quarter}`}>
              <Link href={`/en/${memo.companySlug}/${memo.quarter}`} className="block bg-white p-5 shadow-sm hover:shadow-md">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {memo.companyName} ({memo.ticker}) · {memo.reportingPeriod || formatQuarterLabel(memo.quarter)}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-en-serif)] text-xl text-slate-900">{memo.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{memo.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
