import Link from 'next/link'

export function EnHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/en" className="group">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-400">
            FinmoConf
          </p>
          <p className="font-[family-name:var(--font-en-serif)] text-lg leading-tight text-white group-hover:text-slate-200">
            Taiwan Semiconductor Earnings
          </p>
        </Link>
        <nav className="flex items-center gap-5 text-sm" aria-label="English site">
          <Link href="/en/topics/nvidia-800v" className="text-slate-300 hover:text-white">
            800V topic
          </Link>
          <Link href="/en" className="text-slate-300 hover:text-white">
            All calls
          </Link>
          <Link href="/" className="rounded border border-slate-600 px-2.5 py-1 text-xs uppercase tracking-wide text-slate-300 hover:border-slate-400 hover:text-white">
            中文原站
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function EnFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-slate-500">
        <p>English notes on Taiwan-listed company earnings calls, known locally as investor conferences. Not investment advice.</p>
        <p className="mt-2">
          <Link href="/" className="underline decoration-slate-300 underline-offset-4 hover:text-slate-800">
            FinmoConf Chinese IR decks
          </Link>
          {' · '}
          <Link href="/en/topics/nvidia-800v" className="underline decoration-slate-300 underline-offset-4 hover:text-slate-800">
            NVIDIA 800V hub
          </Link>
        </p>
      </div>
    </footer>
  )
}
