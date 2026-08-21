'use client'

import { useEffect, useId, useState } from 'react'

type MermaidDiagramProps = {
  chart: string
}

function mermaidId(reactId: string) {
  return `en-mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const reactId = useId()
  const [svg, setSvg] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    const source = chart.trim()
    if (!source) return

    const run = async () => {
      const mermaid = (await import('mermaid')).default
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'base',
        themeVariables: {
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          primaryColor: '#fffbeb',
          primaryTextColor: '#0f172a',
          primaryBorderColor: '#0f172a',
          lineColor: '#475569',
          secondaryColor: '#f1f5f9',
          tertiaryColor: '#ffffff',
          clusterBkg: '#f8fafc',
          clusterBorder: '#cbd5e1',
        },
        flowchart: {
          htmlLabels: true,
          curve: 'basis',
          padding: 12,
          nodeSpacing: 28,
          rankSpacing: 36,
        },
      })

      try {
        const { svg: rendered } = await mermaid.render(mermaidId(reactId), source)
        if (!cancelled) {
          setSvg(rendered)
          setFailed(false)
        }
      } catch {
        if (!cancelled) {
          setSvg(null)
          setFailed(true)
        }
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [chart, reactId])

  if (failed) {
    return (
      <pre className="my-10 overflow-x-auto rounded-lg bg-slate-900 p-6 text-[0.9rem] leading-relaxed text-slate-100">
        {chart}
      </pre>
    )
  }

  return (
    <figure className="my-10 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-4 py-6">
      {svg ? (
        <div
          className="flex justify-center [&_svg]:h-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <p className="text-center text-sm text-slate-500">Architecture diagram</p>
      )}
    </figure>
  )
}
