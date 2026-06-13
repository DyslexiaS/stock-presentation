import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_SUB_INDUSTRIES } from '@/lib/data/industry-map'
import { getCompanyCode } from '@/lib/data/tw-company-codes'

// SSG: pre-generate all pages at build time
export async function generateStaticParams() {
  return ALL_SUB_INDUSTRIES.map((s) => ({ slug: s.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = ALL_SUB_INDUSTRIES.find((s) => s.id === slug)
  if (!industry) return {}

  const companyCount = industry.representativeCompanies.length
  return {
    title: `${industry.name} | 台灣產業鏈 - FinmoConf`,
    description: `${industry.name}的供應鏈結構、代表廠商與下游應用。包含${companyCount}家台灣上市公司的法說會資料。`,
    robots: { index: true, follow: true },
    openGraph: {
      title: `${industry.name} | 台灣產業鏈`,
      description: `${industry.name}供應鏈結構與代表廠商`,
    },
  }
}

export default async function IndustrySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = ALL_SUB_INDUSTRIES.find((s) => s.id === slug)
  if (!industry) notFound()

  // Group supply chain by layer → category
  const layerMap = new Map<string, Map<string, { subCategory: string; companies: typeof industry.supplyChain[number]['companies'] }[]>>()
  for (const item of industry.supplyChain) {
    if (!layerMap.has(item.layer)) layerMap.set(item.layer, new Map())
    const categoryMap = layerMap.get(item.layer)!
    if (!categoryMap.has(item.category)) categoryMap.set(item.category, [])
    categoryMap.get(item.category)!.push({
      subCategory: item.subCategory,
      companies: item.companies,
    })
  }

  // Chip-style layers from "A / B / C" string
  const mainLayerChips = industry.mainLayers.split(' / ').map((l) => l.trim()).filter(Boolean)

  // JSON-LD: ItemList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${industry.name} 代表性公司`,
    description: `${industry.name}的供應鏈結構與代表廠商`,
    itemListElement: industry.representativeCompanies.map((name, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name,
      url: `https://finmoconf.com/?q=${encodeURIComponent(name)}`,
    })),
  }

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'FinmoConf', item: 'https://finmoconf.diveinvest.net/' },
      { '@type': 'ListItem', position: 2, name: '台灣產業地圖', item: 'https://finmoconf.diveinvest.net/industry' },
      { '@type': 'ListItem', position: 3, name: industry.parentCategory, item: 'https://finmoconf.diveinvest.net/industry' },
      { '@type': 'ListItem', position: 4, name: industry.name, item: `https://finmoconf.diveinvest.net/industry/${industry.id}` },
    ],
  }

  // FAQ: build questions dynamically from industry data
  const faqs: { question: string; answer: string }[] = [
    {
      question: `台灣${industry.name}有哪些代表性公司？`,
      answer: `台灣${industry.name}的代表性公司包括：${industry.representativeCompanies.join('、')}等。這些企業在台灣產業供應鏈中扮演重要角色。`,
    },
    {
      question: `${industry.name}的主要供應鏈層次是什麼？`,
      answer: `${industry.name}的主要層次包括${industry.mainLayers}。${industry.supplyChain.length > 0 ? `供應鏈共有${industry.supplyChain.length}個細項。` : ''}`,
    },
    ...(industry.downstreamApplications.length > 0
      ? [
          {
            question: `${industry.name}的下游應用有哪些？`,
            answer: `${industry.name}的主要下游應用包括${industry.downstreamApplications.join('、')}。`,
          },
        ]
      : []),
  ]

  // JSON-LD: FAQPage
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* JSON-LD: ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm">
            <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors font-medium">
              FinmoConf
            </Link>
            <svg className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/industry" className="text-slate-400 hover:text-slate-700 transition-colors font-medium">
              產業地圖
            </Link>
            <svg className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/industry" className="text-slate-500 hover:text-slate-700 transition-colors font-medium">
              {industry.parentCategory}
            </Link>
            <svg className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-900 font-semibold" aria-current="page">
              {industry.name}
            </span>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">

        {/* Title */}
        <div className="mb-10">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">
            {industry.parentCategory}
          </p>
          <h1 className="text-4xl font-bold text-slate-900">{industry.name}</h1>
        </div>

        {/* Main layers */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-700 mb-3">主要層次</h2>
          <div className="flex flex-wrap gap-2">
            {mainLayerChips.map((layer) => (
              <span
                key={layer}
                className="inline-block rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700"
              >
                {layer}
              </span>
            ))}
          </div>
        </section>

        {/* Representative companies */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-700 mb-3">代表性公司</h2>
          <div className="flex flex-wrap gap-2">
            {industry.representativeCompanies.map((name) => {
              const code = getCompanyCode(name)
              return code ? (
                <Link
                  key={name}
                  href={`/company/${code}`}
                  className="inline-block rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 hover:border-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  {name}
                </Link>
              ) : (
                <span
                  key={name}
                  className="inline-block rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-500"
                >
                  {name}
                </span>
              )
            })}
          </div>
        </section>

        {/* Downstream applications */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-700 mb-3">下游應用</h2>
          <div className="flex flex-wrap gap-2">
            {industry.downstreamApplications.map((app) => (
              <span
                key={app}
                className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600"
              >
                {app}
              </span>
            ))}
          </div>
        </section>

        {/* Supply chain */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">供應鏈詳細結構</h2>

          {layerMap.size === 0 ? (
            <p className="text-sm text-slate-400 rounded-lg border border-slate-200 bg-white px-5 py-6">
              詳細供應鏈資料即將更新
            </p>
          ) : (
            <div className="space-y-6">
              {Array.from(layerMap.entries()).map(([layer, categoryMap]) => (
                <div key={layer}>
                  {/* Layer header */}
                  <h3 className="text-base font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    {layer}
                  </h3>

                  <div className="rounded-lg border border-slate-200 bg-white overflow-hidden divide-y divide-slate-100">
                    {Array.from(categoryMap.entries()).map(([category, subItems]) => (
                      <div key={category} className="px-5 py-4">
                        <p className="text-base font-medium text-slate-700 mb-2">{category}</p>
                        <div className="space-y-2">
                          {subItems.map(({ subCategory, companies }) => (
                            <div key={subCategory} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              <span className="text-sm text-slate-400 shrink-0">{subCategory}</span>
                              <div className="flex flex-wrap gap-1.5">
                                {companies.map((c) => {
                                  const code = getCompanyCode(c.name)
                                  return code ? (
                                    <Link
                                      key={c.name}
                                      href={`/company/${code}`}
                                      className="inline-block rounded border border-blue-200 bg-blue-50 px-2.5 py-1 text-sm text-blue-700 hover:border-blue-400 hover:bg-blue-100 transition-colors"
                                    >
                                      {c.name}
                                    </Link>
                                  ) : (
                                    <span
                                      key={c.name}
                                      className="inline-block rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm text-slate-500"
                                    >
                                      {c.name}
                                    </span>
                                  )
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FAQ section */}
      <div className="container mx-auto px-6 pb-12 max-w-4xl">
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">常見問題</h2>
          <div className="space-y-2">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-lg border border-slate-200 bg-white overflow-hidden group"
              >
                <summary className="cursor-pointer px-5 py-4 text-base font-medium text-slate-800 select-none list-none flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                  <span>{faq.question}</span>
                  <span className="text-slate-400 shrink-0 group-open:rotate-180 transition-transform duration-200">▾</span>
                </summary>
                <p className="px-5 pb-4 text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>

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
