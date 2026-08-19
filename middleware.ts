import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const locale = request.nextUrl.pathname === '/en' || request.nextUrl.pathname.startsWith('/en/')
    ? 'en'
    : 'zh-TW'

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  if (locale === 'en') {
    response.headers.set('Content-Language', 'en')
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
