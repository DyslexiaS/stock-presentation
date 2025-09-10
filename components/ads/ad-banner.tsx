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
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID
  const isProduction = process.env.NODE_ENV === 'production'
  const forceTestAds = process.env.NEXT_PUBLIC_ADSENSE_TEST_MODE === 'true'
  
  useEffect(() => {
    if (typeof window !== 'undefined' && adsenseId && (isProduction || forceTestAds)) {
      try {
        // 初始化 adsbygoogle 數組
        window.adsbygoogle = window.adsbygoogle || []
        // 推送廣告配置
        window.adsbygoogle.push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
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
      minHeight: '100px',
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
      minHeight: '100px',
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

  // 生產環境或測試模式下顯示真實廣告
  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
        data-adtest={(forceTestAds || !isProduction) ? 'on' : undefined}
      />
    </div>
  )
}