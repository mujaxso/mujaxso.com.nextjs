import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const host = request.headers.get('host') || 'mujaxso.com'
  
  // Handle localhost subdomains (blog.localhost:3000)
  if (host.includes('localhost')) {
    const subdomain = host.split('.')[0]
    
    // If accessing localhost directly (no subdomain)
    if (subdomain === 'localhost') {
      url.pathname = `/(main)${url.pathname}`
      return NextResponse.rewrite(url)
    }
    
    // Handle subdomains on localhost
    switch (subdomain) {
      case 'blog':
        url.pathname = `/blog${url.pathname}`
        break
      case 'projects':
        url.pathname = `/projects${url.pathname}`
        break
      case 'music':
        url.pathname = `/music${url.pathname}`
        break
      default:
        // Default to main site for unknown subdomains
        url.pathname = `/(main)${url.pathname}`
        break
    }
    return NextResponse.rewrite(url)
  }

  // Handle production subdomains
  const cleanHostname = host.replace(/:\d+$/, '') // Remove port if present
  const subdomains = cleanHostname.split('.')
  
  // For mujaxso.com, subdomains will be ['subdomain', 'mujaxso', 'com']
  // For subdomain.mujaxso.com, we want the first part
  const currentSubdomain = subdomains.length > 2 ? subdomains[0] : null
  
  // Handle www and main domain
  if (!currentSubdomain || currentSubdomain === 'www') {
    url.pathname = `/(main)${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // Handle other subdomains
  switch (currentSubdomain) {
    case 'blog':
      url.pathname = `/blog${url.pathname}`
      break
    case 'projects':
      url.pathname = `/projects${url.pathname}`
      break
    case 'music':
      url.pathname = `/music${url.pathname}`
      break
    default:
      // Default to main site for unknown subdomains
      url.pathname = `/(main)${url.pathname}`
      break
  }

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
