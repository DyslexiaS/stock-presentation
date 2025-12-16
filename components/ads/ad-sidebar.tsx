'use client'

import { AdBanner } from './ad-banner'

interface AdSidebarProps {
  className?: string
}

export function AdSidebar({ className = '' }: AdSidebarProps) {
  return (
    <aside className={`space-y-6 ${className}`}>
      {/* 側邊廣告 - 矩形 */}
      <div className="sticky top-4">
        <AdBanner
          slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || "1234567890"}
          format="auto"
          className="w-full"
          style={{ minHeight: '250px' }}
        />
      </div>

      {/* 側邊廣告 - 直立式 */}
      {/* <AdBanner
        slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || "1234567891"}
        format="auto"
        className="w-full"
        style={{ minHeight: '600px' }}
      /> */}
    </aside>
  )
}