'use client'

import { SearchResults } from '@/components/search/search-results'
import { Presentation } from '@/types'

interface CompanyPresentationsProps {
  presentationsByYear: Record<number, Presentation[]>
  years: number[]
  companyName: string
}

export default function CompanyPresentations({ 
  presentationsByYear, 
  years, 
  companyName 
}: CompanyPresentationsProps) {
  return (
    <div className="space-y-6">
      {years.map(year => (
        <div key={year} id={`year-${year}`} className="space-y-4 scroll-mt-24">
          <h3 className="text-xl font-semibold text-foreground border-b border-gray-200 pb-2">
            {year}年 {companyName} 法說會
          </h3>
          <SearchResults
            results={presentationsByYear[year]}
            onPreview={() => {}}
          />
        </div>
      ))}
    </div>
  )
}