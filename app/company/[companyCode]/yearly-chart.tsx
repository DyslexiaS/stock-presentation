import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface YearlyDatum {
  year: number
  count: number
}

interface YearlyCallsChartProps {
  data: YearlyDatum[]
  companyName: string
}

// Server-rendered, zero-JS SVG bar chart for SEO-friendly performance
export default function YearlyCallsChart({ data, companyName }: YearlyCallsChartProps) {
  if (!data || data.length === 0) {
    return null
  }

  const normalizedData = [...data].sort((a, b) => a.year - b.year)
  const maxCount = Math.max(...normalizedData.map(d => d.count)) || 1

  // SVG layout - responsive design
  const width = 800
  const height = 260
  const margin = { top: 10, right: 16, bottom: 40, left: 32 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const barGap = 8
  const barWidth = Math.max(4, Math.floor((innerWidth - (normalizedData.length - 1) * barGap) / normalizedData.length))
  // Leave headroom so the tallest bar and its label never overlap the top edge
  const labelHeadroom = 18
  const maxBarHeight = Math.max(1, innerHeight - labelHeadroom)

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">年度法說會次數</CardTitle>
        <CardDescription>
          {companyName} 每年收錄的法說會數量（含中英文版與音訊）
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Accessible textual data for crawlers/screen readers */}
        <div className="sr-only" aria-live="polite">
          {normalizedData.map(d => `${d.year} 年：${d.count} 場`).join('；')}
        </div>

        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={`${companyName} 歷年法說會次數長條圖`}
            className="w-full h-auto max-w-full"
            style={{ minHeight: '260px', maxHeight: '260px' }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background */}
            <rect x={0} y={0} width={width} height={height} style={{ fill: 'rgb(var(--card))' }} />

            {/* Plot area */}
            <g transform={`translate(${margin.left},${margin.top})`}>
              {/* Horizontal grid lines */}
              {Array.from({ length: 4 }).map((_, i) => {
                const y = (innerHeight / 4) * i
                return (
                  <line
                    key={`grid-${i}`}
                    x1={0}
                    x2={innerWidth}
                    y1={y}
                    y2={y}
                    style={{ stroke: 'rgb(var(--border))', strokeWidth: 1 }}
                  />
                )
              })}

              {/* Bars */}
              {normalizedData.map((d, idx) => {
                const x = idx * (barWidth + barGap)
                const barHeight = Math.round((d.count / maxCount) * maxBarHeight)
                const y = innerHeight - barHeight
                return (
                  <g key={d.year} transform={`translate(${x},0)`}>
                    <a href={`#year-${d.year}`} aria-label={`${d.year} 年 ${d.count} 場`}>
                      <title>{`${d.year} 年：${d.count} 場`}</title>
                      <rect
                        x={0}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        rx={4}
                        style={{ fill: 'rgb(var(--primary))', opacity: 0.9, cursor: 'pointer' }}
                      />
                    </a>
                    {/* Value label */}
                    <text
                      x={barWidth / 2}
                      y={y - 6}
                      textAnchor="middle"
                      style={{ fill: 'rgb(var(--foreground))', fontSize: 11 }}
                    >
                      {d.count}
                    </text>
                    {/* Year tick */}
                    <text
                      x={barWidth / 2}
                      y={innerHeight + 16}
                      textAnchor="middle"
                      style={{ fill: 'rgb(var(--muted-foreground))', fontSize: 11 }}
                    >
                      {d.year}
                    </text>
                  </g>
                )
              })}
            </g>
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}


