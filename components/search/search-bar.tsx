'use client'

import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  onSearch: (params: { q?: string }) => void
  isLoading?: boolean
  initialQuery?: string
}

export function SearchBar({ onSearch, isLoading, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({ q: query.trim() || undefined })
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg p-4 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="搜尋公司代碼 (如: 1101) 或公司名稱 (如: 台泥)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-14 text-base border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 rounded-xl bg-slate-50/50 hover:bg-white transition-colors"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-14 px-5 sm:px-8 text-base font-semibold flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
              disabled={isLoading}
              aria-label="搜尋法說會"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="hidden sm:inline">搜尋中</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span className="hidden sm:inline">搜尋法說會</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
