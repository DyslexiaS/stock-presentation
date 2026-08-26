import type { Metadata } from 'next'
import {
  EN_BASE_URL,
  EN_BREADCRUMB_ROOT,
  EN_SITE_NAME,
  getAllMemos,
  getCompanySlugs,
  getCompanySummaries,
  type EnCompanyProfile,
  type EnMemo,
  type EnTopic,
  formatQuarterLabel,
  formatTwTicker,
  formatTwTickerLabel,
  withTwTickers,
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

const PUBLISHER = {
  '@type': 'Organization' as const,
  name: EN_SITE_NAME,
  url: `${EN_BASE_URL}/en`,
  logo: {
    '@type': 'ImageObject' as const,
    url: OG_IMAGE.url,
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

function englishSocial(
  title: string,
  description: string,
  url: string,
  type: 'website' | 'article' = 'website'
): Pick<Metadata, 'openGraph' | 'twitter'> {
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

function collectionCounts() {
  const memos = getAllMemos()
  return {
    memoCount: memos.length,
    companyCount: getCompanySlugs().length,
    latestEventDate: memos[0]?.eventDate ?? '',
  }
}

export function generateEnLayoutMetadata(): Metadata {
  const url = `${EN_BASE_URL}/en`
  const { memoCount, companyCount } = collectionCounts()
  const description = `English notes on ${memoCount} Taiwan semiconductor earnings calls across ${companyCount} companies in NVIDIA's 800V HVDC, liquid-cooling, SiC/GaN and rack-ODM AI data-center supply chain.`

  return {
    metadataBase: new URL(EN_BASE_URL),
    title: {
      default: 'Taiwan Semiconductor Earnings Calls | FinmoConf English',
      template: '%s',
    },
    description,
    keywords: [
      'Taiwan semiconductor earnings call',
      'Taiwan earnings call',
      'Taiwan investor conference',
      'NVIDIA 800V HVDC',
      'NVIDIA 800V supply chain Taiwan',
      'AI data center power',
      'AI data center liquid cooling Taiwan',
      'SiC GaN Taiwan',
      'AI rack ODM Taiwan',
    ],
    robots: EN_ROBOTS,
    authors: [{ name: 'FinmoAI' }],
    creator: 'FinmoAI',
    publisher: 'FinmoAI',
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      ],
      shortcut: ['/favicon.ico'],
    },
    alternates: englishHreflang(url),
    ...englishSocial('Taiwan Semiconductor Earnings Calls | FinmoConf English', description, url),
  }
}

export function memoUrl(memo: EnMemo): string {
  return `${EN_BASE_URL}/en/${memo.companySlug}/${memo.quarter}`
}

export function generateEnHomeMetadata(): Metadata {
  const url = `${EN_BASE_URL}/en`
  const { memoCount, companyCount } = collectionCounts()
  const title = 'Taiwan Semiconductor Earnings Calls | FinmoConf English'
  const description = `English notes on ${memoCount} Taiwan semiconductor earnings calls across ${companyCount} listed companies. Topics: NVIDIA 800V HVDC, AI-rack liquid cooling, SiC/GaN and rack ODM — Delta, Lite-On, Auras, Episil, Foxconn, Quanta, Wiwynn and the rest of the power, cooling, compound and assembly stack.`

  return {
    title,
    description,
    keywords: [
      'Taiwan semiconductor earnings call',
      'Taiwan earnings call',
      'Taiwan investor conference',
      'NVIDIA 800V HVDC Taiwan',
      'NVIDIA 800V supply chain',
      'Lite-On earnings call',
      'Delta Electronics earnings call',
      'Foxconn earnings call',
      'Auras Technology earnings call',
      'Lead Wealth earnings call',
      'AI data center liquid cooling Taiwan',
      'SiC GaN Taiwan earnings call',
      'AI rack ODM Taiwan',
      'Quanta Wiwynn Foxconn earnings call',
      'AI data center power Taiwan',
    ],
    alternates: englishHreflang(url),
    robots: EN_ROBOTS,
    ...englishSocial(title, description, url),
  }
}

export function generateEnCompaniesMetadata(): Metadata {
  const url = `${EN_BASE_URL}/en/companies`
  const { memoCount, companyCount } = collectionCounts()
  const title = 'Taiwan Companies with English Earnings Call Notes | FinmoConf'
  const description = `Directory of ${companyCount} Taiwan-listed companies with English earnings-call notes (${memoCount} calls). Topics: NVIDIA 800V HVDC, AI-rack liquid cooling and SiC/GaN.`

  return {
    title,
    description,
    keywords: [
      'Taiwan semiconductor companies',
      'Taiwan earnings call companies',
      'NVIDIA 800V supply chain Taiwan',
      'Taiwan investor conference English',
    ],
    alternates: englishHreflang(url),
    robots: EN_ROBOTS,
    ...englishSocial(title, description, url),
  }
}

export function generateEnCallsMetadata(): Metadata {
  const url = `${EN_BASE_URL}/en/calls`
  const { memoCount, companyCount } = collectionCounts()
  const title = 'All Taiwan Semiconductor Earnings Calls in English | FinmoConf'
  const description = `${memoCount} English earnings-call notes across ${companyCount} Taiwan-listed companies, newest first.`

  return {
    title,
    description,
    keywords: [
      'Taiwan semiconductor earnings calls',
      'Taiwan earnings call English',
      'Taiwan investor conference notes',
    ],
    alternates: englishHreflang(url),
    robots: EN_ROBOTS,
    ...englishSocial(title, description, url),
  }
}

export function generateEnMemoMetadata(memo: EnMemo): Metadata {
  const url = memoUrl(memo)
  const title = `${withTwTickers(memo.title)} | FinmoConf`
  const quarterLabel = formatQuarterLabel(memo.quarter)
  const keywords = [
    `${memo.companyName} earnings call`,
    `${memo.companyName} ${quarterLabel} earnings`,
    `${memo.companyName} ${quarterLabel} earnings call`,
    `${memo.ticker} earnings call`,
    `${formatTwTicker(memo.ticker)} earnings call`,
    `${memo.companyName} investor conference`,
    'Taiwan investor conference',
    'NVIDIA 800V HVDC',
  ]
  const displayTitle = withTwTickers(memo.title)
  const displayDescription = withTwTickers(memo.description)
  const social = englishSocial(displayTitle, displayDescription, url, 'article')

  return {
    title,
    description: displayDescription,
    keywords,
    alternates: englishHreflang(url),
    robots: EN_ROBOTS,
    openGraph: {
      title: displayTitle,
      description: displayDescription,
      url,
      siteName: EN_SITE_NAME,
      type: 'article',
      locale: 'en_US',
      publishedTime: toIsoDate(memo.eventDate),
      modifiedTime: toIsoDate(memo.eventDate),
      images: [OG_IMAGE],
    },
    twitter: social.twitter,
  }
}

export function generateEnCompanyMetadata(
  companySlug: string,
  companyName: string,
  ticker: string,
  count: number,
  profile?: EnCompanyProfile | null
): Metadata {
  const url = `${EN_BASE_URL}/en/${companySlug}`
  const tickerLabel = formatTwTickerLabel(ticker)
  const title = `${companyName} ${tickerLabel} Earnings Call Notes in English | FinmoConf`
  const role = profile?.role ? ` ${profile.role.replace(/\s+/g, ' ').trim()}.` : ''
  const description = `${count} English note${count === 1 ? '' : 's'} on ${companyName} ${tickerLabel} Taiwan earnings calls.${role} Results, guidance, management Q&A and NVIDIA 800V HVDC read-through.`

  return {
    title,
    description,
    keywords: [
      `${companyName} earnings call`,
      `${companyName} earnings`,
      `${ticker} earnings call`,
      `${formatTwTicker(ticker)} earnings call`,
      `${companyName} investor conference`,
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
    `${count} English earnings-call notes on Taiwan-listed companies covering ${topic.title}.`

  return {
    title,
    description,
    keywords: topicKeywords(topic),
    alternates: englishHreflang(url),
    robots: EN_ROBOTS,
    ...englishSocial(title, description, url),
  }
}

function topicKeywords(topic: EnTopic): string[] {
  if (topic.slug === 'liquid-cooling') {
    return [
      'AI data center liquid cooling Taiwan',
      'NVIDIA GB200 NVL72 liquid cooling',
      'Auras Technology liquid cooling',
      'AVC liquid cooling',
      'Jentech Precision liquid cooling',
      'Fositek quick disconnect',
      'Nidec Chaun-Choung liquid cooling',
      'CDU cold plate manifold QD Taiwan',
      'Taiwan semiconductor earnings',
      topic.title,
    ]
  }
  if (topic.slug === 'sic-gan') {
    return [
      'SiC GaN Taiwan',
      'silicon carbide gallium nitride Taiwan',
      'GlobalWafers SiC GaN',
      'Episil earnings call',
      'Episil-Precision GaN epitaxy',
      'Actron SiC module',
      'GEM Services power OSAT',
      'NVIDIA 800V SiC GaN',
      'Taiwan compound semiconductor earnings',
      'Taiwan semiconductor earnings',
      topic.title,
    ]
  }
  if (topic.slug === 'rack-odm') {
    return [
      'AI rack ODM Taiwan',
      'NVIDIA GB200 NVL72 ODM',
      'Quanta AI server',
      'Wiwynn earnings call',
      'Foxconn Kyber rack',
      'Hon Hai AI server',
      'Taiwan server ODM',
      'NVIDIA MGX rack Taiwan',
      'Taiwan semiconductor earnings',
      topic.title,
    ]
  }
  return [
    'NVIDIA 800V HVDC',
    'NVIDIA 800 VDC',
    'NVIDIA 800V supply chain Taiwan',
    'Kyber rack power',
    'AI data center BBU',
    'AI data center liquid cooling Taiwan',
    'Auras Technology liquid cooling',
    'Lead Wealth 800V',
    'Taiwan semiconductor earnings',
    'AI data center power Taiwan',
    topic.title,
  ]
}

function topicCollections(tags: string[]) {
  const collections: { '@type': 'CollectionPage'; '@id': string; name: string }[] = []
  if (tags.includes('nvidia-800v')) {
    collections.push({
      '@type': 'CollectionPage',
      '@id': `${EN_BASE_URL}/en/topics/nvidia-800v`,
      name: 'NVIDIA 800 VDC — Taiwan Supply Chain',
    })
  }
  if (tags.includes('liquid-cooling')) {
    collections.push({
      '@type': 'CollectionPage',
      '@id': `${EN_BASE_URL}/en/topics/liquid-cooling`,
      name: 'Liquid Cooling — Taiwan Supply Chain',
    })
  }
  if (tags.includes('sic-gan')) {
    collections.push({
      '@type': 'CollectionPage',
      '@id': `${EN_BASE_URL}/en/topics/sic-gan`,
      name: 'SiC / GaN — Taiwan Power Semiconductors',
    })
  }
  if (tags.includes('rack-odm')) {
    collections.push({
      '@type': 'CollectionPage',
      '@id': `${EN_BASE_URL}/en/topics/rack-odm`,
      name: 'AI Rack ODM — Taiwan Assemblers',
    })
  }
  if (collections.length === 0) {
    collections.push({
      '@type': 'CollectionPage',
      '@id': `${EN_BASE_URL}/en/topics/nvidia-800v`,
      name: 'NVIDIA 800 VDC — Taiwan Supply Chain',
    })
  }
  return collections.length === 1 ? collections[0] : collections
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
        headline: withTwTickers(memo.title),
        description: withTwTickers(memo.description),
        datePublished: published,
        dateModified: published,
        inLanguage: 'en',
        url,
        mainEntityOfPage: url,
        author: {
          '@type': 'Organization',
          name: 'FinmoAI',
          url: EN_BASE_URL,
        },
        publisher: PUBLISHER,
        image: OG_IMAGE.url,
        about: {
          '@type': 'Organization',
          name: memo.companyName,
          identifier: formatTwTicker(memo.ticker),
        },
        isPartOf: topicCollections(memo.tags),
        keywords: [
          `${memo.companyName} earnings call`,
          `${memo.companyName} ${quarterLabel} earnings`,
          'NVIDIA 800V HVDC',
          ...(memo.tags.includes('liquid-cooling') ? ['AI data center liquid cooling Taiwan'] : []),
          ...(memo.tags.includes('sic-gan') ? ['SiC GaN Taiwan'] : []),
          ...(memo.tags.includes('rack-odm') ? ['AI rack ODM Taiwan'] : []),
          'Taiwan investor conference',
          memo.ticker,
          formatTwTicker(memo.ticker),
        ].join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: EN_BREADCRUMB_ROOT, item: `${EN_BASE_URL}/en` },
          {
            '@type': 'ListItem',
            position: 2,
            name: `${memo.companyName} ${formatTwTickerLabel(memo.ticker)}`,
            item: `${EN_BASE_URL}/en/${memo.companySlug}`,
          },
          { '@type': 'ListItem', position: 3, name: memo.reportingPeriod || quarterLabel, item: url },
        ],
      },
    ],
  }
}

export function generateEnHomeJsonLd() {
  const url = `${EN_BASE_URL}/en`
  const companies = getCompanySummaries()
  const memos = getAllMemos()

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        name: 'Taiwan Semiconductor Earnings Calls',
        description: generateEnHomeMetadata().description,
        url,
        inLanguage: 'en',
        isPartOf: { '@type': 'WebSite', name: EN_SITE_NAME, url },
        about: {
          '@type': 'Thing',
          name: 'NVIDIA 800 VDC, liquid cooling, SiC/GaN and rack ODM Taiwan supply chain',
        },
        publisher: PUBLISHER,
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#companies`,
        name: 'Taiwan companies with English earnings-call notes',
        numberOfItems: companies.length,
        itemListElement: companies.map((company, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${company.name} ${formatTwTickerLabel(company.ticker)}`,
          url: `${EN_BASE_URL}/en/${company.slug}`,
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#notes`,
        name: 'English earnings-call notes',
        numberOfItems: memos.length,
        itemListElement: memos.map((memo, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: withTwTickers(memo.title),
          url: memoUrl(memo),
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [{ '@type': 'ListItem', position: 1, name: EN_BREADCRUMB_ROOT, item: url }],
      },
    ],
  }
}

export function generateEnCompanyJsonLd(
  companySlug: string,
  companyName: string,
  ticker: string,
  memos: EnMemo[],
  profile?: EnCompanyProfile | null
) {
  const url = `${EN_BASE_URL}/en/${companySlug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        name: `${companyName} ${formatTwTickerLabel(ticker)} earnings calls`,
        description: generateEnCompanyMetadata(companySlug, companyName, ticker, memos.length, profile).description,
        url,
        inLanguage: 'en',
        about: {
          '@type': 'Organization',
          name: companyName,
          identifier: formatTwTicker(ticker),
        },
        publisher: PUBLISHER,
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#calls`,
        name: `${companyName} English earnings-call notes`,
        numberOfItems: memos.length,
        itemListElement: memos.map((memo, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: withTwTickers(memo.title),
          url: memoUrl(memo),
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: EN_BREADCRUMB_ROOT, item: `${EN_BASE_URL}/en` },
          { '@type': 'ListItem', position: 2, name: `${companyName} ${formatTwTickerLabel(ticker)}`, item: url },
        ],
      },
    ],
  }
}

export function generateEnTopicJsonLd(topic: EnTopic, memos: EnMemo[]) {
  const url = `${EN_BASE_URL}/en/topics/${topic.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        name: topic.title,
        description: topic.description,
        url,
        inLanguage: 'en',
        about: {
          '@type': 'Thing',
          name:
            topic.slug === 'sic-gan'
              ? 'SiC and GaN power semiconductors Taiwan'
              : topic.slug === 'liquid-cooling'
                ? 'AI data center liquid cooling Taiwan'
                : topic.slug === 'rack-odm'
                  ? 'AI rack ODM Taiwan'
                  : 'NVIDIA 800 VDC',
        },
        publisher: PUBLISHER,
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#notes`,
        name: 'English earnings-call notes in this topic',
        numberOfItems: memos.length,
        itemListElement: memos.map((memo, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: withTwTickers(memo.title),
          url: memoUrl(memo),
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: EN_BREADCRUMB_ROOT, item: `${EN_BASE_URL}/en` },
          { '@type': 'ListItem', position: 2, name: topic.title, item: url },
        ],
      },
    ],
  }
}

export function generateEnCompaniesJsonLd() {
  const url = `${EN_BASE_URL}/en/companies`
  const companies = getCompanySummaries()

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        name: 'Taiwan companies with English earnings-call notes',
        description: generateEnCompaniesMetadata().description,
        url,
        inLanguage: 'en',
        publisher: PUBLISHER,
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#companies`,
        name: 'Taiwan companies with English earnings-call notes',
        numberOfItems: companies.length,
        itemListElement: companies.map((company, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${company.name} ${formatTwTickerLabel(company.ticker)}`,
          url: `${EN_BASE_URL}/en/${company.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: EN_BREADCRUMB_ROOT, item: `${EN_BASE_URL}/en` },
          { '@type': 'ListItem', position: 2, name: 'Companies', item: url },
        ],
      },
    ],
  }
}

export function generateEnCallsJsonLd() {
  const url = `${EN_BASE_URL}/en/calls`
  const memos = getAllMemos()

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#page`,
        name: 'All Taiwan semiconductor earnings calls in English',
        description: generateEnCallsMetadata().description,
        url,
        inLanguage: 'en',
        publisher: PUBLISHER,
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#notes`,
        name: 'English earnings-call notes',
        numberOfItems: memos.length,
        itemListElement: memos.map((memo, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: withTwTickers(memo.title),
          url: memoUrl(memo),
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: EN_BREADCRUMB_ROOT, item: `${EN_BASE_URL}/en` },
          { '@type': 'ListItem', position: 2, name: 'All calls', item: url },
        ],
      },
    ],
  }
}
