import Link from 'next/link'

const FOOTER_LINKS = [
  { href: '/', label: '法說會簡報' },
  { href: '/calendar', label: '法說會行事曆' },
  { href: '/industry', label: '產業地圖' },
  { href: '/en', label: 'English earnings calls' },
] as const

export function ZhFooter({ note }: { note?: string }) {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="container mx-auto px-6 py-8 text-center">
        <nav
          aria-label="網站地圖"
          className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm mb-4"
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-600 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {note ? <p className="text-xs text-slate-400 mb-2">{note}</p> : null}
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} FinmoConf · 台股法說會搜尋平台
        </p>
        <p className="text-xs text-slate-300 mt-1">
          資料來源：公開資訊觀測站 · FinmoAI 系列產品
        </p>
      </div>
    </footer>
  )
}
