'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { ExternalLink, FileText, Calendar, Building2, Eye, Volume2 } from 'lucide-react'
import { Presentation } from '@/types'

interface SearchResultsProps {
  results: Presentation[]
  onPreview?: (presentation: Presentation) => void
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
    hasNext: boolean
    hasPrev: boolean
  }
  onPageChange?: (page: number) => void
}

const typeLabels: Record<string, { label: string; color: string }> = {
  sii: { label: '上市', color: 'bg-blue-100 text-blue-800' },
  otc: { label: '上櫃', color: 'bg-green-100 text-green-800' },
  rotc: { label: '興櫃', color: 'bg-purple-100 text-purple-800' },
}

export function SearchResults({ results, pagination, onPageChange }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium text-foreground">找不到相關法說會</h3>
        <p className="mt-2 text-muted-foreground">
          請嘗試調整搜尋條件或關鍵字
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        {pagination ? `總共 ${pagination.total} 筆結果，第 ${pagination.page} 頁 / 共 ${pagination.pages} 頁` : `找到 ${results.length} 筆法說會資料`}
      </div>

      <div className="grid gap-4">
        {results.map((presentation) => (
          <Card key={presentation._id} className="hover:shadow-md transition-shadow">
            {/* Hidden SEO Keywords - kept for accessibility and minor SEO assistance */}
            <div className="sr-only">
              {presentation.companyName} 法說會簡報 {presentation.companyCode} 法說會簡報 
              {presentation.companyName}法說會 {presentation.companyCode}法說會 
              {presentation.companyName}法人說明會 {presentation.companyCode}法人說明會
              {presentation.companyName}財報說明會 {presentation.companyCode}財報說明會
              {presentation.companyName}簡報PDF {presentation.companyCode}簡報PDF
              {presentation.companyName}法說會下載 {presentation.companyCode}法說會下載
              法說會{presentation.companyCode} 法說會{presentation.companyName}
              {presentation.companyName}最新法說會 {presentation.companyCode}最新法說會
              {presentation.companyName}業績發表會 {presentation.companyCode}業績發表會
              {presentation.companyName}營運報告 {presentation.companyCode}營運報告
              股票代碼{presentation.companyCode} {presentation.companyCode}股票
              {presentation.companyName}股價分析 {presentation.companyCode}股價分析
              {new Date(presentation.eventDate).getFullYear()}年{presentation.companyName}法說會
              {new Date(presentation.eventDate).getFullYear()}年{presentation.companyCode}法說會
              Q{Math.ceil((new Date(presentation.eventDate).getMonth() + 1) / 3)}{presentation.companyName}法說會
              Q{Math.ceil((new Date(presentation.eventDate).getMonth() + 1) / 3)}{presentation.companyCode}法說會
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">
                      {presentation.companyName}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {presentation.companyCode}
                    </Badge>
                    <Badge 
                      className={`text-xs ${typeLabels[presentation.typek]?.color}`}
                      variant="secondary"
                    >
                      {typeLabels[presentation.typek]?.label}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(presentation.eventDate).toLocaleDateString('zh-TW')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      法人說明會
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="default"
                  size="sm"
                  asChild
                >
                  <Link
                    href={`/presentation/${presentation._id}`}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    查看詳情
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link
                    href={`/company/${presentation.companyCode}`}
                    className="flex items-center gap-1"
                  >
                    <Building2 className="h-4 w-4" />
                    歷年法說會
                  </Link>
                </Button>
                {presentation.presentationTWUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={presentation.presentationTWUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      中文版 PDF
                    </a>
                  </Button>
                )}
                {presentation.presentationEnUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={presentation.presentationEnUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      英文版 PDF
                    </a>
                  </Button>
                )}
                {presentation.audioLinkUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={presentation.audioLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <Volume2 className="h-4 w-4" />
                      音訊錄音
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {pagination && onPageChange && pagination.pages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={onPageChange}
          className="mt-8"
        />
      )}
    </div>
  )
}