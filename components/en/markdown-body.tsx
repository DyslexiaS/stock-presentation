import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { withTwTickers } from '@/lib/content/en-memos'

const serif = 'font-[family-name:var(--font-en-serif)]'

export function MarkdownBody({ content }: { content: string }) {
  return (
    <article className="text-[1.1875rem] leading-[1.8] text-slate-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Major section: gray rule + left-aligned amber bar, then the heading.
          h2: (props) => (
            <h2
              className={`${serif} en-section-heading mb-7 text-[2rem] font-semibold leading-[1.2] tracking-tight text-slate-900`}
              {...props}
            />
          ),
          h3: (props) => (
            <h3 className={`${serif} mt-14 mb-4 text-[1.45rem] font-semibold leading-snug tracking-tight text-slate-900`} {...props} />
          ),
          h4: (props) => (
            <h4 className="mt-10 mb-3 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-slate-500" {...props} />
          ),
          h1: (props) => (
            <h1 className={`${serif} mt-16 mb-7 text-[2.4rem] font-semibold leading-tight tracking-tight text-slate-900 first:mt-0`} {...props} />
          ),
          p: (props) => <p className="my-8" {...props} />,
          ul: (props) => <ul className="my-9 list-disc space-y-4 pl-6 marker:text-slate-400" {...props} />,
          ol: (props) => <ol className="my-9 list-decimal space-y-4 pl-6 marker:text-slate-400" {...props} />,
          li: (props) => <li className="pl-2 leading-[1.75] [&>ul]:my-3 [&>ol]:my-3" {...props} />,
          strong: (props) => <strong className="font-semibold text-slate-900" {...props} />,
          em: (props) => <em className="italic" {...props} />,
          a: (props) => (
            <a
              className="font-medium text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-[3px] transition-colors hover:decoration-slate-900"
              {...props}
            />
          ),
          blockquote: (props) => (
            <blockquote
              className={`${serif} my-10 border-l-2 border-slate-900 py-2 pl-7 text-[1.35rem] leading-[1.6] text-slate-800`}
              {...props}
            />
          ),
          hr: () => <div className="en-section-rule" role="presentation" />,
          table: (props) => (
            <div className="my-10 overflow-x-auto">
              <table className="w-full border-collapse text-[0.95rem] leading-relaxed" {...props} />
            </div>
          ),
          thead: (props) => <thead className="border-b-2 border-slate-900" {...props} />,
          tbody: (props) => <tbody className="divide-y divide-slate-200" {...props} />,
          th: (props) => <th className="px-3 py-3 text-left align-bottom font-semibold text-slate-900" {...props} />,
          td: (props) => <td className="px-3 py-3 align-top text-slate-700" {...props} />,
          code: (props) => (
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800" {...props} />
          ),
          pre: (props) => (
            <pre className="my-10 overflow-x-auto rounded-lg bg-slate-900 p-6 text-[0.9rem] leading-relaxed text-slate-100" {...props} />
          ),
        }}
      >
        {withTwTickers(content)}
      </ReactMarkdown>
    </article>
  )
}
