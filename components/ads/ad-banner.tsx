'use client'

import { useEffect } from 'react'

interface AdsByGoogleItem {
  [key: string]: unknown
}

declare global {
  interface Window {
    adsbygoogle: AdsByGoogleItem[]
  }
}

interface AdBannerProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
}

export function AdBanner({ 
  slot, 
  format = 'auto',
  responsive = true,
  className = '',
  style = {} 
}: AdBannerProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      try {
        // 確保 AdSense 腳本已載入
        const adsbygoogle = window.adsbygoogle || []
        adsbygoogle.push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [])

  // 開發環境下顯示佔位符
  if (process.env.NODE_ENV !== 'production') {
    const placeholderStyles = {
      backgroundColor: '#f1f5f9',
      border: '2px dashed #cbd5e1',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#64748b',
      fontSize: '14px',
      fontWeight: '500',
      minHeight: '100px',
      ...style
    }

    return (
      <div className={`ad-placeholder ${className}`} style={placeholderStyles}>
        廣告位置 (開發環境)
      </div>
    )
  }

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}