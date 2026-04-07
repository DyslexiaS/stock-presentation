import { Metadata } from 'next'
import Link from 'next/link'
import { Map } from 'lucide-react'

export const metadata: Metadata = {
  title: '台股產業地圖 | FinmoConf - 依產業瀏覽法說會',
  description: '依產業分類瀏覽台灣上市櫃公司法說會簡報。半導體、金融、電子等各產業法人說明會資料一覽，快速掌握產業動態。',
  robots: { index: false, follow: false },
}

export default function IndustryPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <nav className="text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-700 transition-colors">
              FinmoConf - 台股法說會搜尋
            </Link>
            <span className="mx-2">→</span>
            <span className="text-slate-900 font-medium">產業地圖</span>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-8">
            <Map className="w-7 h-7 text-slate-400" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">台股產業地圖</h1>
          <p className="text-slate-500 leading-relaxed mb-8">
            依產業分類瀏覽台灣上市櫃公司，涵蓋半導體、金融、電子、傳產等各大產業，
            快速掌握各產業版圖與法說會動態。
            <br /><br />
            此功能正在開發中，敬請期待。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-500 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              即將推出
            </span>
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors underline underline-offset-4"
            >
              返回法說會搜尋
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 py-6 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} FinmoConf · 台股法說會搜尋平台
          </p>
        </div>
      </footer>
    </div>
  )
}
