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
          slot="1234567890"
          format="rectangle"
          className="w-full"
          style={{ minHeight: '250px' }}
        />
      </div>

      {/* 側邊廣告 - 直立式 */}
      <AdBanner
        slot="1234567891"
        format="vertical"
        className="w-full"
        style={{ minHeight: '600px' }}
      />
    </aside>
  )
}