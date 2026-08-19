import type { Metadata } from 'next'
import {
  EN_BASE_URL,
  EN_SITE_NAME,
  type EnMemo,
  type EnTopic,
  formatQuarterLabel,
} from '@/lib/content/en-memos'

const OG_IMAGE = {
  url: `${EN_BASE_URL}/FinmoAI-brand.png`,
  width: 1200,
  height: 630,
  alt: 'FinmoConf English — Taiwan semiconductor earnings calls',
  type: 'image/png',
} as const

const EN_ROBOTS: Metadata['robots'] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

function toIsoDate(value: string): string {
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString()
}

function englishHreflang(url: string): Metadata['alternates'] {
  return {
    canonical: url,
    languages: {
      en: url,
    },
  }
}

function englishSocial(title: string, description: string, url: string, type: 'website' | 'article' = 'website'): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      title,
      description,
      url,
      siteName: EN_SITE_NAME,
      type,
      locale: 'en_US',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
  }
}

export function generateEnLayoutMetadata(): Metadata {
  const url = `${EN_BASE_URL}/en`
  return {
    title: {
      default: 'Taiwan Semiconductor Earnings Calls | FinmoConf English',
      template: '%s',
    },
    description:
      'English notes on Taiwan semiconductor earnings calls, including the NVIDIA 800V HVDC supply chain. Taiwan investor conferences, summarised for overseas investors.',
    keywords: [
      'Taiwan semiconductor earnings call',
      'Taiwan earnings call',
      'Taiwan investor conference',
      'NVIDIA 800V HVDC',
      'NVIDIA 800V supply chain Taiwan',
      'AI data center power',
    ],
    robots: EN_ROBOTS,
    alternates: englishHreflang(url),
    ...englishSocial(
      'Taiwan Semiconductor Earnings Calls | FinmoConf English',
      'English notes on Taiwan semiconductor earnings calls.',
      url
    ),
  }
}

export function memoUrl(memo: EnMemo): string {
  return `${EN_BASE_URL}/en/${memo.companySlug}/${memo.quarter}`
}

export function generateEnHomeMetadata(): Metadata {
  const url = `${EN_BASE_URL}/en`
  const title = 'Taiwan Semiconductor Earnings Calls | FinmoConf English'
  const description =
    'English notes on Taiwan semiconductor earnings calls. Start with the NVIDIA 800V HVDC supply chain: Delta, Lite-On, BizLink, Foxconn and peers.'

  return {
    title,
    description,
    keywords: [
      'Taiwan semiconductor earnings call',
      'Taiwan earnings call',
      'Taiwan investor conference',
      'NVIDIA 800V HVDC Taiwan',
      'NVIDIA 800V supply chain',
    ],
    alternates: englishHreflang(url),
    robots: EN_ROBOTS,
    ...englishSocial(title, description, url),
  }
}

export function generateEnMemoMetadata(memo: EnMemo): Metadata {
  const url = memoUrl(memo)
  const title = `${memo.title} | FinmoConf`
  const quarterLabel = formatQuarterLabel(memo.quarter)
  const keywords = [
    `${memo.companyName} earnings call`,
    `${memo.companyName} ${quarterLabel} earnings`,
    `${memo.companyName} ${quarterLabel} earnings call`,
    `${memo.ticker} earnings call`,
    'Taiwan investor conference',
    'NVIDIA 800V HVDC',
  ]
  const social = englishSocial(memo.title, memo.description, url, 'article')

  return {
    title,
    description: memo.description,
    keywords,
    alternates: englishHreflang(url),
    robots: EN_ROBOTS,
    openGraph: {
      title: memo.title,
      description: memo.description,
      url,
      siteName: EN_SITE_NAME,
      type: 'article',
      locale: 'en_US',
      publishedTime: toIsoDate(memo.eventDate),
      images: [OG_IMAGE],
    },
    twitter: social.twitter,
  }
}

export function generateEnCompanyMetadata(
  companySlug: string,
  companyName: string,
  ticker: string,
  count: number
): Metadata {
  const url = `${EN_BASE_URL}/en/${companySlug}`
  const title = `${companyName} (${ticker}) Earnings Call Notes in English | FinmoConf`
  const description = `${count} English note${count === 1 ? '' : 's'} on ${companyName} (${ticker}) earnings calls, covering results, guidance, management Q&A and NVIDIA 800V HVDC exposure.`

  return {
    title,
    description,
    keywords: [
      `${companyName} earnings call`,
      `${companyName} earnings`,
      `${ticker} earnings call`,
      'Taiwan investor conference',
      'NVIDIA 800V HVDC',
    ],
    alternates: englishHreflang(url),
    robots: EN_ROBOTS,
    ...englishSocial(title, description, url),
  }
}

export function generateEnTopicMetadata(topic: EnTopic, count: number): Metadata {
  const url = `${EN_BASE_URL}/en/topics/${topic.slug}`
  const title = topic.title.includes('FinmoConf') ? topic.title : `${topic.title} | FinmoConf`
  const description =
    topic.description ||
    `${count} English notes on Taiwan earnings calls covering ${topic.title}.`

  return {
    title,
    description,
    keywords: [
      'NVIDIA 800V HVDC',
      'NVIDIA 800V supply chain Taiwan',
      'Taiwan semiconductor earnings',
      'AI data center power Taiwan',
      topic.title,
    ],
    alternates: englishHreflang(url),
    robots: EN_ROBOTS,
    ...englishSocial(title, description, url),
  }
}

export function generateEnMemoJsonLd(memo: EnMemo) {
  const url = memoUrl(memo)
  const published = toIsoDate(memo.eventDate)
  const quarterLabel = formatQuarterLabel(memo.quarter)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: memo.title,
        description: memo.description,
        datePublished: published,
        dateModified: published,
        inLanguage: 'en',
        url,
        author: {
          '@type': 'Organization',
          name: 'FinmoAI',
          url: EN_BASE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: EN_SITE_NAME,
          url: `${EN_BASE_URL}/en`,
        },
        image: OG_IMAGE.url,
        about: {
          '@type': 'Organization',
          name: memo.companyName,
          identifier: memo.ticker,
        },
        keywords: [
          `${memo.companyName} earnings call`,
          `${memo.companyName} ${quarterLabel} earnings`,
          'NVIDIA 800V HVDC',
          'Taiwan investor conference',
          memo.ticker,
        ].join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'English', item: `${EN_BASE_URL}/en` },
          { '@type': 'ListItem', position: 2, name: `${memo.companyName} (${memo.ticker})`, item: `${EN_BASE_URL}/en/${memo.companySlug}` },
          { '@type': 'ListItem', position: 3, name: memo.reportingPeriod || quarterLabel, item: url },
        ],
      },
    ],
  }
}
