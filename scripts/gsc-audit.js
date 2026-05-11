#!/usr/bin/env bun
/**
 * GSC SEO Audit Script
 * Pulls Search Console data and surfaces optimization opportunities.
 *
 * Usage: node scripts/gsc-audit.js
 * First run: node scripts/gsc-auth.js
 */

import { google } from 'googleapis'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const SITE_URL = 'https://finmoconf.diveinvest.net/'
const CLIENT_FILE = join(ROOT, 'gsc-oauth-client.json')
const TOKEN_FILE = join(ROOT, 'gsc-token.json')
const DAYS = 28

function getAuthClient() {
  const clientSecret = JSON.parse(readFileSync(CLIENT_FILE, 'utf8'))
  const { client_id, client_secret } = clientSecret.installed
  const tokens = JSON.parse(readFileSync(TOKEN_FILE, 'utf8'))

  const oauth2Client = new google.auth.OAuth2(client_id, client_secret)
  oauth2Client.setCredentials(tokens)

  // Persist refreshed tokens automatically
  oauth2Client.on('tokens', (newTokens) => {
    const current = JSON.parse(readFileSync(TOKEN_FILE, 'utf8'))
    writeFileSync(TOKEN_FILE, JSON.stringify({ ...current, ...newTokens }, null, 2))
  })

  return oauth2Client
}

function getDateRange(days) {
  const end = new Date()
  end.setDate(end.getDate() - 2) // GSC data has a ~2-day delay
  const start = new Date(end)
  start.setDate(start.getDate() - days)
  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
  }
}

async function fetchRows(sc, dimensions, rowLimit = 1000) {
  const { startDate, endDate } = getDateRange(DAYS)
  const res = await sc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: { startDate, endDate, dimensions, rowLimit },
  })
  return res.data.rows || []
}

async function main() {
  console.log('🔍 Connecting to Google Search Console...')

  const auth = getAuthClient()
  const sc = google.searchconsole({ version: 'v1', auth })

  const { startDate, endDate } = getDateRange(DAYS)
  console.log(`\n📅 Period: ${startDate} → ${endDate} (last ${DAYS} days)\n`)

  console.log('📄 Fetching page data...')
  const pageRows = await fetchRows(sc, ['page'])

  console.log('🔤 Fetching query data...')
  const queryRows = await fetchRows(sc, ['query'])

  // Pages with high impressions but low CTR — easiest wins via title/description rewrites
  const lowCtrPages = pageRows
    .filter(r => r.impressions > 50 && r.ctr < 0.03)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20)

  // Queries ranking 5–20 — closest to page 1 and worth targeting
  const rankingOpportunities = queryRows
    .filter(r => r.position >= 5 && r.position <= 20 && r.impressions > 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 30)

  // Queries already in top 3 — monitor to protect rankings
  const topKeywords = queryRows
    .filter(r => r.position <= 3 && r.impressions > 50)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20)

  const topPages = pageRows
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 20)

  const report = {
    generatedAt: new Date().toISOString(),
    period: { startDate, endDate, days: DAYS },
    summary: {
      totalPages: pageRows.length,
      totalClicks: pageRows.reduce((s, r) => s + r.clicks, 0),
      totalImpressions: pageRows.reduce((s, r) => s + r.impressions, 0),
      avgCtr: pageRows.length
        ? (pageRows.reduce((s, r) => s + r.ctr, 0) / pageRows.length * 100).toFixed(2) + '%'
        : 'N/A',
      avgPosition: pageRows.length
        ? (pageRows.reduce((s, r) => s + r.position, 0) / pageRows.length).toFixed(1)
        : 'N/A',
    },
    opportunities: {
      lowCtrHighImpression: lowCtrPages.map(r => ({
        page: r.keys[0],
        impressions: r.impressions,
        clicks: r.clicks,
        ctr: (r.ctr * 100).toFixed(2) + '%',
        position: r.position.toFixed(1),
        action: 'Rewrite title/description to improve CTR',
      })),
      rankingOpportunities: rankingOpportunities.map(r => ({
        keyword: r.keys[0],
        position: r.position.toFixed(1),
        impressions: r.impressions,
        clicks: r.clicks,
        action: `Strengthen content or internal links to move from #${Math.round(r.position)} to top 3`,
      })),
    },
    topPages: topPages.map(r => ({
      page: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: (r.ctr * 100).toFixed(2) + '%',
      position: r.position.toFixed(1),
    })),
    topKeywords: topKeywords.map(r => ({
      keyword: r.keys[0],
      position: r.position.toFixed(1),
      clicks: r.clicks,
      impressions: r.impressions,
    })),
  }

  const outputPath = join(ROOT, 'scripts', 'gsc-report.json')
  writeFileSync(outputPath, JSON.stringify(report, null, 2))

  console.log('\n════════════════════════════════════════')
  console.log('📊 GSC Audit Summary')
  console.log('════════════════════════════════════════')
  console.log(`Total clicks:      ${report.summary.totalClicks.toLocaleString()}`)
  console.log(`Total impressions: ${report.summary.totalImpressions.toLocaleString()}`)
  console.log(`Avg CTR:           ${report.summary.avgCtr}`)
  console.log(`Avg position:      ${report.summary.avgPosition}`)

  if (lowCtrPages.length > 0) {
    console.log('\n🎯 Low CTR / High Impression pages (rewrite title+desc for quick wins):')
    lowCtrPages.slice(0, 5).forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.keys[0]}`)
      console.log(`     Impressions: ${r.impressions} | CTR: ${(r.ctr * 100).toFixed(2)}% | Pos: ${r.position.toFixed(1)}`)
    })
  }

  if (rankingOpportunities.length > 0) {
    console.log('\n📈 Ranking opportunities (pos 5–20, push to top 3):')
    rankingOpportunities.slice(0, 5).forEach((r, i) => {
      console.log(`  ${i + 1}. "${r.keys[0]}" → pos ${r.position.toFixed(1)} | impressions ${r.impressions}`)
    })
  }

  if (topKeywords.length > 0) {
    console.log('\n🏆 Top 3 keywords (protect these rankings):')
    topKeywords.slice(0, 5).forEach((r, i) => {
      console.log(`  ${i + 1}. "${r.keys[0]}" → pos ${r.position.toFixed(1)} | clicks ${r.clicks}`)
    })
  }

  console.log(`\n✅ Full report saved to: scripts/gsc-report.json`)
}

main().catch(err => {
  if (err.code === 'ENOENT' && err.path?.includes('token')) {
    console.error('\n❌ Token not found. Run authorization first:')
    console.error('   node scripts/gsc-auth.js')
  } else if (err.status === 403) {
    console.error('\n❌ Forbidden. Make sure your Google account has GSC access.')
  } else {
    console.error('\n❌ Error:', err.message)
  }
  process.exit(1)
})
