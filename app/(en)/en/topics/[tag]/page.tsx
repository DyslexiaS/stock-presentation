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
  getAllTags,
  getMemosByTag,
  getTopic,
  withTwTickers,
} from '@/lib/content/en-memos'
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
  const pageUrl = `${EN_BASE_URL}/en/topics/${tag}`

  return (
    <div className={`${EN_PAGE_WIDTH} py-14`}>
      <JsonLd data={generateEnTopicJsonLd(jsonLdTopic, memos)} />
      <EnBreadcrumb items={[{ label: 'Topics' }]} />
      <header className="mt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="font-[family-name:var(--font-en-serif)] text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-slate-900 md:text-[3rem]">
            {title}
          </h1>
          <ShareLinks title={title} url={pageUrl} />
        </div>
        {description && <p className="mt-5 max-w-4xl text-xl leading-relaxed text-slate-600">{description}</p>}
      </header>

      <EnSectionRule />

      {topic?.content && (
        <div>
          <MarkdownBody content={topic.content} />
        </div>
      )}

      <section>
        <h2 className="en-section-heading text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Earnings calls in this topic
        </h2>
        <ul className="mt-4 space-y-4">
          {memos.map((memo) => (
            <li key={`${memo.companySlug}-${memo.quarter}`}>
              <Link href={`/en/${memo.companySlug}/${memo.quarter}`} className="block bg-white p-5 shadow-sm hover:shadow-md">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {memo.companyName} {formatTwTickerLabel(memo.ticker)} · {memo.reportingPeriod || formatQuarterLabel(memo.quarter)}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-en-serif)] text-xl text-slate-900">{withTwTickers(memo.title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{withTwTickers(memo.description)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
