import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const host = request.headers.get('host') || 'mujaxso.com'
  
  console.log('=== MIDDLEWARE DEBUG ===')
  console.log('Host:', host)
  console.log('Original pathname:', url.pathname)
  
  // Extract subdomain from hostname
  const hostname = host.split(':')[0] // Remove port
  const parts = hostname.split('.')
  
  let subdomain: string | null = null
  
  // For localhost: blog.localhost
  if (hostname.includes('localhost')) {
    subdomain = parts.length > 1 ? parts[0] : null
    if (subdomain === 'localhost') subdomain = null
  } 
  // For production: blog.mujaxso.com
  else {
    subdomain = parts.length > 2 ? parts[0] : null
    if (subdomain === 'www') subdomain = null
  }
  
  console.log('Detected subdomain:', subdomain)
  
  // If no subdomain, serve main site
  if (!subdomain) {
    // Don't rewrite if already accessing main paths
    if (url.pathname.startsWith('/(main)') || url.pathname === '/') {
      console.log('Main domain - no rewrite needed')
      return NextResponse.next()
    }
    console.log('Rewriting to main:', url.pathname)
    return NextResponse.next()
  }
  
  // Handle subdomains - rewrite to actual folder paths
  switch (subdomain) {
    case 'blog':
      // If already on blog path, don't rewrite
      if (url.pathname.startsWith('/blog')) {
        console.log('Already on blog path')
        return NextResponse.next()
      }
      url.pathname = `/blog${url.pathname === '/' ? '' : url.pathname}`
      break
      
    case 'projects':
      if (url.pathname.startsWith('/projects')) {
        return NextResponse.next()
      }
      url.pathname = `/projects${url.pathname === '/' ? '' : url.pathname}`
      break
      
    case 'music':
      if (url.pathname.startsWith('/music')) {
        return NextResponse.next()
      }
      url.pathname = `/music${url.pathname === '/' ? '' : url.pathname}`
      break
      
    default:
      // Unknown subdomain, serve main site
      console.log('Unknown subdomain, serving main')
      return NextResponse.next()
  }
  
  console.log('Rewriting to:', url.pathname)
  console.log('=== END DEBUG ===')
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - files with extensions (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
