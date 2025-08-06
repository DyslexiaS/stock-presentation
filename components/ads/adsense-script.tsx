'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export function AdSenseScript() {
  const [isClient, setIsClient] = useState(false)
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID 
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || process.env.NODE_ENV !== 'production' || !adsenseId) {
    return null
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}