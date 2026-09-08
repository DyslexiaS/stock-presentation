import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // This app has no Server Actions. Bots POST `next-action: x` (or similar
  // junk IDs). If those reach Next.js, it logs "Failed to find Server Action"
  // and can abort the response stream (`transformAlgorithm is not a function`).
  // Matcher below keeps this off GET pages so SSG stays intact.
  if (request.headers.has('next-action')) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    {
      source: '/:path*',
      has: [{ type: 'header', key: 'next-action' }],
    },
  ],
}
