'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export function AdSenseScript() {
  const [isClient, setIsClient] = useState(false)
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID 
  const isProduction = process.env.NODE_ENV === 'production'
  const forceTestAds = process.env.NEXT_PUBLIC_ADSENSE_TEST_MODE === 'true'
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // 只有在有 AdSense ID 且是生產環境或測試模式時才載入
  if (!isClient || !adsenseId || (!isProduction && !forceTestAds)) {
    return null
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={() => {
        console.log('AdSense script loaded successfully')
      }}
      onError={(error) => {
        console.error('AdSense script failed to load:', error)
      }}
    />
  )
}