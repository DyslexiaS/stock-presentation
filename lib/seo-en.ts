import type { Metadata } from 'next'
import {
  EN_BASE_URL,
  EN_SITE_NAME,
  type EnMemo,
  type EnTopic,
  formatQuarterLabel,
} from '@/lib/content/en-memos'

export function memoUrl(memo: EnMemo): string {
  return `${EN_BASE_URL}/en/${memo.companySlug}/${memo.quarter}`
}

export function generateEnHomeMetadata(): Metadata {
  const url = `${EN_BASE_URL}/en`
  const title = 'Taiwan Semiconductor Earnings Memos | FinmoConf English'
  const description =
    'English earnings-call briefings on Taiwan semiconductor and AI infrastructure suppliers. Start with NVIDIA 800V HVDC supply-chain memos from Lite-On, Chang Wah, Voltronic and peers.'

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: url },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: EN_SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export function generateEnMemoMetadata(memo: EnMemo): Metadata {
  const url = memoUrl(memo)
  return {
    title: `${memo.title} | FinmoConf`,
    description: memo.description,
    alternates: {
      canonical: url,
      languages: { en: url },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: memo.title,
      description: memo.description,
      url,
      siteName: EN_SITE_NAME,
      type: 'article',
      locale: 'en_US',
      publishedTime: memo.eventDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: memo.title,
      description: memo.description,
    },
  }
}

export function generateEnCompanyMetadata(
  companySlug: string,
  companyName: string,
  ticker: string,
  count: number
): Metadata {
  const url = `${EN_BASE_URL}/en/${companySlug}`
  const title = `${companyName} (${ticker}) English Earnings Memos | FinmoConf`
  const description = `${count} English earnings-call memo${count === 1 ? '' : 's'} on ${companyName} (${ticker}), including NVIDIA 800V HVDC and Taiwan AI infrastructure exposure.`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: url },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: EN_SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
  }
}

export function generateEnTopicMetadata(topic: EnTopic, count: number): Metadata {
  const url = `${EN_BASE_URL}/en/topics/${topic.slug}`
  const title = topic.title.includes('FinmoConf') ? topic.title : `${topic.title} | FinmoConf`
  const description =
    topic.description ||
    `${count} English earnings memos tagged ${topic.slug}.`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: url },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: EN_SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
  }
}

export function generateEnMemoJsonLd(memo: EnMemo) {
  const url = memoUrl(memo)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: memo.title,
        description: memo.description,
        datePublished: memo.eventDate,
        dateModified: memo.eventDate,
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
        about: {
          '@type': 'Organization',
          name: memo.companyName,
          identifier: memo.ticker,
        },
        keywords: [...memo.tags, memo.companyName, memo.ticker, formatQuarterLabel(memo.quarter)].join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'English', item: `${EN_BASE_URL}/en` },
          { '@type': 'ListItem', position: 2, name: `${memo.companyName} (${memo.ticker})`, item: `${EN_BASE_URL}/en/${memo.companySlug}` },
          { '@type': 'ListItem', position: 3, name: memo.reportingPeriod || formatQuarterLabel(memo.quarter), item: url },
        ],
      },
    ],
  }
}
