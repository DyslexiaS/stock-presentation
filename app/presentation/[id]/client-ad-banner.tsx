'use client'

import { AdBanner } from '@/components/ads/ad-banner'

interface ClientAdBannerProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function ClientAdBanner(props: ClientAdBannerProps) {
  return <AdBanner {...props} />
}