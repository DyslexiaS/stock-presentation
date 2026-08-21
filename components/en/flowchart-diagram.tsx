type FlowEdge = { from: string; to: string }

export function parseMermaidFlowchart(source: string): {
  direction: 'TD' | 'LR'
  labels: Map<string, string>
  edges: FlowEdge[]
} {
  const labels = new Map<string, string>()
  const edges: FlowEdge[] = []
  let direction: 'TD' | 'LR' = 'TD'

  const nodeToken = String.raw`([A-Za-z0-9_-]+)(?:\["([^"]*)"\])?`
  const edgeRe = new RegExp(`^${nodeToken}\\s*-->\\s*${nodeToken}$`)

  for (const raw of source.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('```')) continue

    const header = line.match(/^flowchart\s+(TD|TB|LR|RL)\b/i)
    if (header) {
      const dir = header[1].toUpperCase()
      direction = dir === 'LR' || dir === 'RL' ? 'LR' : 'TD'
      continue
    }

    const edge = line.match(edgeRe)
    if (!edge) continue

    const from = edge[1]
    const fromLabel = edge[2]
    const to = edge[3]
    const toLabel = edge[4]
    remember(labels, from, fromLabel)
    remember(labels, to, toLabel)
    edges.push({ from, to })
  }

  return { direction, labels, edges }
}

function remember(labels: Map<string, string>, id: string, label?: string) {
  const clean = (label ?? labels.get(id) ?? id).replace(/<br\s*\/?>/gi, '\n')
  if (!labels.has(id) || label) labels.set(id, clean)
}

function rankNodes(labels: Map<string, string>, edges: FlowEdge[]): string[][] {
  const ids = Array.from(labels.keys())
  const indegree = new Map(ids.map((id) => [id, 0]))
  const outgoing = new Map(ids.map((id) => [id, [] as string[]]))

  for (const { from, to } of edges) {
    outgoing.get(from)?.push(to)
    indegree.set(to, (indegree.get(to) ?? 0) + 1)
  }

  let frontier = ids.filter((id) => (indegree.get(id) ?? 0) === 0)
  const ranks: string[][] = []
  const seen = new Set<string>()

  while (frontier.length > 0) {
    ranks.push(frontier)
    const next: string[] = []
    for (const id of frontier) {
      seen.add(id)
      for (const dest of outgoing.get(id) ?? []) {
        const remaining = (indegree.get(dest) ?? 0) - 1
        indegree.set(dest, remaining)
        if (remaining === 0) next.push(dest)
      }
    }
    frontier = next
  }

  const leftover = ids.filter((id) => !seen.has(id))
  if (leftover.length) ranks.push(leftover)
  return ranks
}

function FlowBox({ label }: { label: string }) {
  return (
    <div className="min-w-[10rem] max-w-[18rem] rounded-md border border-slate-900 bg-amber-50 px-3 py-2.5 text-center text-sm font-medium leading-snug text-slate-900 whitespace-pre-line">
      {label}
    </div>
  )
}

function FlowArrow({ direction }: { direction: 'TD' | 'LR' }) {
  return (
    <div
      aria-hidden="true"
      className={
        direction === 'LR'
          ? 'px-1 text-lg text-slate-400'
          : 'py-1 text-lg leading-none text-slate-400'
      }
    >
      {direction === 'LR' ? '→' : '↓'}
    </div>
  )
}

export function FlowchartDiagram({ chart }: { chart: string }) {
  const parsed = parseMermaidFlowchart(chart)
  const ranks = rankNodes(parsed.labels, parsed.edges)
  const isRow = parsed.direction === 'LR'

  if (ranks.length === 0) {
    return (
      <pre className="my-10 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-6 text-[0.9rem] leading-relaxed text-slate-700">
        {chart}
      </pre>
    )
  }

  return (
    <figure className="my-10 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-4 py-6">
      <div className={isRow ? 'flex min-w-max items-center gap-1' : 'flex flex-col items-center'}>
        {ranks.map((rank, index) => (
          <div key={rank.join('-')} className="flex flex-col items-center">
            {index > 0 ? <FlowArrow direction={parsed.direction} /> : null}
            <div className={isRow ? 'flex flex-col items-center gap-2' : 'flex flex-wrap items-center justify-center gap-2'}>
              {rank.map((id) => (
                <FlowBox key={id} label={parsed.labels.get(id) ?? id} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </figure>
  )
}
