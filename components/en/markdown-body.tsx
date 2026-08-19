import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const serif = 'font-[family-name:var(--font-en-serif)]'

export function MarkdownBody({ content }: { content: string }) {
  return (
    <article className="text-[1.1875rem] leading-[1.75] text-slate-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => (
            <h1 className={`${serif} mt-14 mb-5 text-[2rem] font-semibold leading-tight tracking-tight text-slate-900 first:mt-0`} {...props} />
          ),
          h2: (props) => (
            <h2 className={`${serif} mt-14 mb-4 text-[1.6rem] font-semibold leading-snug tracking-tight text-slate-900 first:mt-0`} {...props} />
          ),
          h3: (props) => (
            <h3 className={`${serif} mt-10 mb-3 text-[1.3rem] font-semibold leading-snug text-slate-900`} {...props} />
          ),
          h4: (props) => (
            <h4 className="mt-8 mb-2 text-base font-semibold uppercase tracking-wide text-slate-500" {...props} />
          ),
          p: (props) => <p className="my-6" {...props} />,
          ul: (props) => <ul className="my-6 list-disc space-y-3 pl-6 marker:text-slate-400" {...props} />,
          ol: (props) => <ol className="my-6 list-decimal space-y-3 pl-6 marker:text-slate-400" {...props} />,
          li: (props) => <li className="pl-1.5 leading-[1.7]" {...props} />,
          strong: (props) => <strong className="font-semibold text-slate-900" {...props} />,
          em: (props) => <em className="italic" {...props} />,
          a: (props) => (
            <a className="font-medium text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-[3px] transition-colors hover:decoration-slate-900" {...props} />
          ),
          blockquote: (props) => (
            <blockquote className={`${serif} my-8 border-l-2 border-slate-900 py-1 pl-6 text-[1.3rem] leading-relaxed text-slate-800`} {...props} />
          ),
          hr: () => <hr className="my-12 border-t border-slate-200" />,
          table: (props) => (
            <div className="my-8 overflow-x-auto">
              <table className="w-full border-collapse text-[0.95rem]" {...props} />
            </div>
          ),
          thead: (props) => <thead className="border-b-2 border-slate-900" {...props} />,
          tbody: (props) => <tbody className="divide-y divide-slate-200" {...props} />,
          th: (props) => (
            <th className="px-3 py-2.5 text-left align-bottom font-semibold text-slate-900" {...props} />
          ),
          td: (props) => <td className="px-3 py-2.5 align-top text-slate-700" {...props} />,
          code: (props) => (
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800" {...props} />
          ),
          pre: (props) => (
            <pre className="my-8 overflow-x-auto rounded-lg bg-slate-900 p-5 text-[0.9rem] leading-relaxed text-slate-100" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
