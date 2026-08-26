import Link from 'next/link'
import { GooglePreferredSource } from '@/components/google-preferred-source'

export const EN_PAGE_WIDTH = 'mx-auto max-w-6xl px-6 md:px-10'

export function EnHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950 text-slate-100">
      <div className={`flex items-center justify-between gap-6 py-4 ${EN_PAGE_WIDTH}`}>
        <Link href="/en" className="group">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-400">
            FinmoConf
          </p>
          <p className="font-[family-name:var(--font-en-serif)] text-lg leading-tight text-white group-hover:text-slate-200">
            Taiwan Semiconductor Earnings
          </p>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm" aria-label="English site">
          <Link href="/en/topics/nvidia-800v" className="text-slate-300 hover:text-white">
            800V topic
          </Link>
          <Link href="/en/topics/liquid-cooling" className="text-slate-300 hover:text-white">
            Liquid cooling
          </Link>
          <Link href="/en/topics/sic-gan" className="text-slate-300 hover:text-white">
            SiC / GaN
          </Link>
          <Link href="/en/topics/rack-odm" className="text-slate-300 hover:text-white">
            Rack ODM
          </Link>
          <Link href="/en/companies" className="text-slate-300 hover:text-white">
            Companies
          </Link>
          <Link href="/en/calls" className="text-slate-300 hover:text-white">
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
      <div className={`py-8 text-sm text-slate-500 ${EN_PAGE_WIDTH}`}>
        <div className="mb-4">
          <GooglePreferredSource lang="en" />
        </div>
        <p>English notes on Taiwan-listed company earnings calls, known locally as investor conferences. Not investment advice.</p>
        <p className="mt-2">
          <Link href="/" className="underline decoration-slate-300 underline-offset-4 hover:text-slate-800">
            FinmoConf Chinese IR decks
          </Link>
          {' · '}
          <Link href="/en/companies" className="underline decoration-slate-300 underline-offset-4 hover:text-slate-800">
            Company directory
          </Link>
          {' · '}
          <Link href="/en/topics/nvidia-800v" className="underline decoration-slate-300 underline-offset-4 hover:text-slate-800">
            NVIDIA 800V hub
          </Link>
          {' · '}
          <Link href="/en/topics/liquid-cooling" className="underline decoration-slate-300 underline-offset-4 hover:text-slate-800">
            Liquid cooling hub
          </Link>
          {' · '}
          <Link href="/en/topics/sic-gan" className="underline decoration-slate-300 underline-offset-4 hover:text-slate-800">
            SiC / GaN hub
          </Link>
          {' · '}
          <Link href="/en/topics/rack-odm" className="underline decoration-slate-300 underline-offset-4 hover:text-slate-800">
            Rack ODM hub
          </Link>
        </p>
      </div>
    </footer>
  )
}
