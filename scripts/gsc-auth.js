#!/usr/bin/env bun
/**
 * One-time GSC OAuth2 authorization script.
 * Opens a browser for consent, then saves the token locally.
 *
 * Usage: node scripts/gsc-auth.js
 */

import { google } from 'googleapis'
import { readFileSync, writeFileSync } from 'fs'
import { createServer } from 'http'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { exec } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CLIENT_FILE = join(ROOT, 'gsc-oauth-client.json')
const TOKEN_FILE = join(ROOT, 'gsc-token.json')
const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']
const PORT = 3001

const clientSecret = JSON.parse(readFileSync(CLIENT_FILE, 'utf8'))
const { client_id, client_secret } = clientSecret.installed

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  `http://localhost:${PORT}/callback`
)

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent',
})

console.log('\n🔐 GSC OAuth2 Authorization')
console.log('══════════════════════════════')
console.log('Opening browser...\n')

exec(`open "${authUrl}"`)

console.log('If the browser did not open, visit:')
console.log(authUrl)
console.log('\nWaiting for authorization...')

const server = createServer(async (req, res) => {
  if (!req.url.startsWith('/callback')) return

  const code = new URL(req.url, `http://localhost:${PORT}`).searchParams.get('code')

  if (!code) {
    res.writeHead(400)
    res.end('Authorization failed: no code received')
    return
  }

  try {
    const { tokens } = await oauth2Client.getToken(code)
    writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2))

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(`
      <html><body style="font-family:sans-serif;text-align:center;padding:60px">
        <h2>✅ Authorization successful!</h2>
        <p>Token saved. You can close this window.</p>
        <p>Run <code>node scripts/gsc-audit.js</code> to start the audit.</p>
      </body></html>
    `)

    console.log('\n✅ Token saved to gsc-token.json')
    console.log('\nRun: node scripts/gsc-audit.js')

    server.close()
    process.exit(0)
  } catch (err) {
    res.writeHead(500)
    res.end('Token exchange failed: ' + err.message)
    console.error('❌ Token exchange failed:', err.message)
    server.close()
    process.exit(1)
  }
})

server.listen(PORT, () => {
  console.log(`(Listening on http://localhost:${PORT}/callback)`)
})
