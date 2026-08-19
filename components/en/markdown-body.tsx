import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownBody({ content }: { content: string }) {
  return (
    <article className="prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-en-serif)] prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-xl prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2 prose-p:leading-7 prose-li:leading-7 prose-a:text-slate-900">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
