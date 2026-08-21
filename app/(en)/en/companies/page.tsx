import { EnBreadcrumb } from '@/components/en/breadcrumb'
import { CompanyDirectoryList } from '@/components/en/company-index'
import { JsonLd } from '@/components/en/json-ld'
import { EN_PAGE_WIDTH } from '@/components/en/site-chrome'
import { getCompanySummaries } from '@/lib/content/en-memos'
import { generateEnCompaniesJsonLd, generateEnCompaniesMetadata } from '@/lib/seo-en'

export const metadata = generateEnCompaniesMetadata()
export const dynamic = 'force-static'

export default function EnglishCompaniesPage() {
  const companies = getCompanySummaries()

  return (
    <div className={`${EN_PAGE_WIDTH} py-14`}>
      <JsonLd data={generateEnCompaniesJsonLd()} />
      <EnBreadcrumb items={[{ label: 'Companies' }]} />
      <header className="mt-8">
        <h1 className="font-[family-name:var(--font-en-serif)] text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-slate-900 md:text-[3rem]">
          Companies
        </h1>
        <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-600">
          {companies.length} Taiwan-listed companies with English earnings-call notes. Topics so far: NVIDIA 800V HVDC and AI-rack liquid cooling.
        </p>
      </header>
      <CompanyDirectoryList companies={companies} />
    </div>
  )
}
