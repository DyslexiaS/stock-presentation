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
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Search Input with Button */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="搜尋公司代碼 (如: 1101) 或公司名稱 (如: 台泥)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 px-6 text-base font-medium flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  搜尋中
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  搜尋法說會
                </>
              )}
            </Button>
          </div>

          {/* Filter Types */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground font-medium">篩選類型:</span>
            {companyTypes.map((type) => (
              <Badge
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1.5 text-sm"
                onClick={() => handleTypeSelect(type.value)}
              >
                {type.label}
              </Badge>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}