import Link from 'next/link'
import { EN_BREADCRUMB_ROOT } from '@/lib/content/en-memos'

export function EnBreadcrumb({
  items,
}: {
  items: { href?: string; label: string }[]
}) {
  const crumbs = [{ href: '/en', label: EN_BREADCRUMB_ROOT }, ...items]

  return (
    <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
      {crumbs.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {index > 0 && <span className="mx-2">/</span>}
          {item.href && index < crumbs.length - 1 ? (
            <Link href={item.href} className="hover:text-slate-800">
              {item.label}
            </Link>
          ) : (
            <span className={index === crumbs.length - 1 ? 'text-slate-700' : undefined}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
