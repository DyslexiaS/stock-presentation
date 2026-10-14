'use client'

import { useEffect, useRef } from 'react'

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
  const adRef = useRef<HTMLModElement>(null)
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID
  const isProduction = process.env.NODE_ENV === 'production'
  const forceTestAds = process.env.NEXT_PUBLIC_ADSENSE_TEST_MODE === 'true'
  
  useEffect(() => {
    const el = adRef.current
    if (!el || !adsenseId || (!isProduction && !forceTestAds)) return
    // One request per ad slot. A second push on the same <ins> is an invalid ad request.
    if (el.dataset.adInitialized === 'true' || el.getAttribute('data-adsbygoogle-status')) return

    try {
      el.dataset.adInitialized = 'true'
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch (error) {
      el.dataset.adInitialized = 'false'
      console.error('AdSense error:', error)
    }
  }, [adsenseId, isProduction, forceTestAds])

  // 如果沒有 AdSense ID，顯示錯誤提示
  if (!adsenseId) {
    const placeholderStyles = {
      backgroundColor: '#fee2e2',
      border: '2px dashed #dc2626',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#dc2626',
      fontSize: '14px',
      fontWeight: '500',
      minHeight: style.minHeight || '100px',
      ...style
    }

    return (
      <div className={`ad-placeholder ${className}`} style={placeholderStyles}>
        ❌ 請設定 NEXT_PUBLIC_ADSENSE_ID
      </div>
    )
  }

  // 開發環境下的處理
  if (!isProduction && !forceTestAds) {
    const placeholderStyles = {
      backgroundColor: '#f1f5f9',
      border: '2px dashed #cbd5e1',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      color: '#64748b',
      fontSize: '14px',
      fontWeight: '500',
      minHeight: style.minHeight || '100px',
      padding: '16px',
      textAlign: 'center' as const,
      ...style
    }

    return (
      <div className={`ad-placeholder ${className}`} style={placeholderStyles}>
        <div>📱 廣告位置 ({format})</div>
        <div style={{ fontSize: '12px', marginTop: '4px' }}>
          Slot: {slot}
        </div>
        <div style={{ fontSize: '11px', marginTop: '4px', color: '#94a3b8' }}>
          設定 NEXT_PUBLIC_ADSENSE_TEST_MODE=true 測試真實廣告
        </div>
      </div>
    )
  }

  // 生產環境或測試模式下顯示真實廣告。
  // 高度限制與 overflow 會裁切廣告，點擊區可能蓋到旁邊的按鈕，所以不要套到廣告容器上。
  const boxStyle = { ...style }
  delete boxStyle.maxHeight
  delete boxStyle.height
  delete boxStyle.overflow
  const adContainerStyle = {
    width: '100%',
    maxWidth: '100%',
    minHeight: boxStyle.minHeight || '100px',
    ...boxStyle
  }

  return (
    <div className={className} style={adContainerStyle}>
      <p className="mb-2 text-xs text-slate-400">廣告</p>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
        data-adtest={(forceTestAds || !isProduction) ? 'on' : undefined}
      />
    </div>
  )
}