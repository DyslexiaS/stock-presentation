'use client'

import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SearchBarProps {
  onSearch: (params: {
    q?: string
    companyCode?: string
    type?: 'sii' | 'otc' | 'rotc'
  }) => void
  isLoading?: boolean
}

const companyTypes = [
  { value: 'all', label: '全部類型', description: '顯示所有類型' },
  { value: 'sii', label: '上市', description: '台灣證券交易所' },
  { value: 'otc', label: '上櫃', description: '櫃買中心' },
  { value: 'rotc', label: '興櫃', description: '興櫃市場' },
] as const

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState<'all' | 'sii' | 'otc' | 'rotc'>('all')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({
      q: query.trim() || undefined,
      type: selectedType === 'all' ? undefined : selectedType as 'sii' | 'otc' | 'rotc',
    })
  }

  const handleTypeSelect = (type: 'all' | 'sii' | 'otc' | 'rotc') => {
    setSelectedType(type)
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Enhanced Search Input with Button */}
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
              className="h-14 px-8 text-base font-semibold flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
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

          {/* Enhanced Filter Types */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-600 font-semibold">篩選類型:</span>
            <div className="flex flex-wrap gap-2">
              {companyTypes.map((type) => (
                <Badge
                  key={type.value}
                  variant={selectedType === type.value ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 px-4 py-2 text-sm font-medium rounded-lg hover:scale-105 ${
                    selectedType === type.value 
                      ? "bg-slate-800 text-white hover:bg-slate-700 shadow-md" 
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => handleTypeSelect(type.value)}
                >
                  {type.label}
                </Badge>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}