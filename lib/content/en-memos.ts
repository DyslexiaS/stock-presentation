import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const MEMOS_DIR = path.join(process.cwd(), 'content/en/memos')
const TOPICS_DIR = path.join(process.cwd(), 'content/en/topics')
const COMPANIES_DIR = path.join(process.cwd(), 'content/en/companies')

export interface EnMemo {
  title: string
  description: string
  companySlug: string
  ticker: string
  companyName: string
  quarter: string
  eventDate: string
  reportingPeriod: string
  tags: string[]
  draft: boolean
  content: string
}

export interface EnTopic {
  slug: string
  title: string
  description: string
  content: string
}

/** Static company background, written once instead of repeated in every quarterly memo. */
export interface EnCompanyProfile {
  slug: string
  tier: string
  role: string
  content: string
}

export interface EnCompanySummary {
  slug: string
  name: string
  ticker: string
  count: number
}

/** Paths that must not collide with /en/[companySlug]. */
export const EN_RESERVED_SLUGS: string[] = ['companies', 'calls', 'topics']

export const EN_HOME_LATEST_COUNT = 10

let memoCache: EnMemo[] | null = null
let topicCache: EnTopic[] | null = null
let profileCache: Map<string, EnCompanyProfile> | null = null

function shouldCache() {
  return process.env.NODE_ENV === 'production'
}

function parseMemoFile(filePath: string, companySlug: string, quarter: string): EnMemo | null {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  if (data.draft === true) return null

  return {
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    companySlug: String(data.companySlug ?? companySlug),
    ticker: String(data.ticker ?? ''),
    companyName: String(data.companyName ?? ''),
    quarter: String(data.quarter ?? quarter),
    eventDate: String(data.eventDate ?? ''),
    reportingPeriod: String(data.reportingPeriod ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: false,
    content: content.trim(),
  }
}

function loadMemos(): EnMemo[] {
  if (shouldCache() && memoCache) return memoCache

  if (!fs.existsSync(MEMOS_DIR)) {
    memoCache = []
    return memoCache
  }

  const memos: EnMemo[] = []

  for (const companySlug of fs.readdirSync(MEMOS_DIR)) {
    const companyDir = path.join(MEMOS_DIR, companySlug)
    if (!fs.statSync(companyDir).isDirectory()) continue

    for (const fileName of fs.readdirSync(companyDir)) {
      if (!fileName.endsWith('.md')) continue
      const quarter = fileName.replace(/\.md$/, '')
      const parsed = parseMemoFile(path.join(companyDir, fileName), companySlug, quarter)
      if (parsed) memos.push(parsed)
    }
  }

  memos.sort((a, b) => b.eventDate.localeCompare(a.eventDate))
  memoCache = memos
  return memos
}

function loadTopics(): EnTopic[] {
  if (shouldCache() && topicCache) return topicCache

  if (!fs.existsSync(TOPICS_DIR)) {
    topicCache = []
    return topicCache
  }

  const topics: EnTopic[] = []
  for (const fileName of fs.readdirSync(TOPICS_DIR)) {
    if (!fileName.endsWith('.md')) continue
    const slug = fileName.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(TOPICS_DIR, fileName), 'utf8')
    const { data, content } = matter(raw)
    topics.push({
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ''),
      content: content.trim(),
    })
  }

  topicCache = topics
  return topics
}

function loadProfiles(): Map<string, EnCompanyProfile> {
  if (shouldCache() && profileCache) return profileCache

  const profiles = new Map<string, EnCompanyProfile>()
  if (fs.existsSync(COMPANIES_DIR)) {
    for (const fileName of fs.readdirSync(COMPANIES_DIR)) {
      if (!fileName.endsWith('.md')) continue
      const slug = fileName.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(COMPANIES_DIR, fileName), 'utf8')
      const { data, content } = matter(raw)
      profiles.set(slug, {
        slug,
        tier: String(data.tier ?? ''),
        role: String(data.role ?? ''),
        content: content.trim(),
      })
    }
  }

  profileCache = profiles
  return profiles
}

export function getCompanyProfile(slug: string): EnCompanyProfile | null {
  return loadProfiles().get(slug) ?? null
}

export function getAllMemos(): EnMemo[] {
  return loadMemos()
}

export function getMemo(companySlug: string, quarter: string): EnMemo | null {
  return loadMemos().find((m) => m.companySlug === companySlug && m.quarter === quarter) ?? null
}

export function getMemosByCompany(companySlug: string): EnMemo[] {
  return loadMemos().filter((m) => m.companySlug === companySlug)
}

export function getMemosByTag(tag: string): EnMemo[] {
  return loadMemos().filter((m) => m.tags.includes(tag))
}

export function getCompanySlugs(): string[] {
  return getCompanySummaries().map((company) => company.slug)
}

export function getCompanySummaries(): EnCompanySummary[] {
  const map = new Map<string, EnCompanySummary>()
  for (const memo of loadMemos()) {
    const existing = map.get(memo.companySlug)
    if (existing) {
      existing.count += 1
    } else {
      map.set(memo.companySlug, {
        slug: memo.companySlug,
        name: memo.companyName,
        ticker: memo.ticker,
        count: 1,
      })
    }
  }
  const summaries: EnCompanySummary[] = []
  map.forEach((company) => summaries.push(company))
  summaries.sort((a, b) => a.name.localeCompare(b.name))
  return summaries
}

export function getAllTags(): string[] {
  return Array.from(new Set(loadMemos().flatMap((m) => m.tags))).sort()
}

export function getTopic(slug: string): EnTopic | null {
  return loadTopics().find((t) => t.slug === slug) ?? null
}

const TOPIC_DISPLAY_ORDER = ['nvidia-800v', 'liquid-cooling', 'sic-gan', 'rack-odm']

function sortTopics(topics: EnTopic[]): EnTopic[] {
  return [...topics].sort((a, b) => {
    const ai = TOPIC_DISPLAY_ORDER.indexOf(a.slug)
    const bi = TOPIC_DISPLAY_ORDER.indexOf(b.slug)
    if (ai === -1 && bi === -1) return a.slug.localeCompare(b.slug)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
}

export function getAllTopics(): EnTopic[] {
  const fromFiles = loadTopics()
  const fileSlugs = new Set(fromFiles.map((t) => t.slug))
  const extra = getAllTags()
    .filter((tag) => !fileSlugs.has(tag))
    .map((slug) => ({
      slug,
      title: slug,
      description: '',
      content: '',
    }))
  return sortTopics([...fromFiles, ...extra])
}

export function getRelatedMemos(memo: EnMemo, limit = 4): EnMemo[] {
  return loadMemos()
    .filter((m) => m.companySlug !== memo.companySlug || m.quarter !== memo.quarter)
    .filter((m) => m.tags.some((tag) => memo.tags.includes(tag)))
    .slice(0, limit)
}

export function formatQuarterLabel(quarter: string): string {
  const half = quarter.match(/^(\d{4})-h([12])$/i)
  if (half) return `H${half[2]} ${half[1]}`
  const match = quarter.match(/^(\d{4})-q(\d)(?:-(.+))?$/i)
  if (!match) return quarter
  const extra = match[3] ? ` (${match[3][0].toUpperCase()}${match[3].slice(1)})` : ''
  return `Q${match[2]} ${match[1]}${extra}`
}

/** Yahoo-style TWSE/TPEx code, e.g. 8255 → 8255.TW */
export function formatTwTicker(ticker: string): string {
  const trimmed = ticker.trim().toUpperCase()
  if (!trimmed) return trimmed
  if (trimmed.endsWith('.TW') || trimmed.endsWith('.TWO')) return trimmed
  return `${trimmed}.TW`
}

export function formatTwTickerLabel(ticker: string): string {
  return `(${formatTwTicker(ticker)})`
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Rewrite (2330), (TW:2330) or TW:2330 to (2330.TW) for known Taiwan tickers. */
export function withTwTickers(text: string, tickers?: string[]): string {
  const codes = Array.from(new Set((tickers ?? loadMemos().map((memo) => memo.ticker)).filter(Boolean)))
  return codes.reduce((out, code) => {
    const raw = code.replace(/\.(TW|TWO)$/i, '').trim()
    if (!raw) return out
    const formatted = `(${raw.toUpperCase()}.TW)`
    return out
      .replace(new RegExp(`\\(${escapeRegExp(raw)}(?:\\.TW|\\.TWO)?\\)`, 'gi'), formatted)
      .replace(new RegExp(`\\(?TW:\\s*${escapeRegExp(raw)}\\)?`, 'gi'), formatted)
  }, text)
}

export const EN_SITE_NAME = 'FinmoConf English'
export const EN_BREADCRUMB_ROOT = 'FinmoConf'
export const EN_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://finmoconf.diveinvest.net'
