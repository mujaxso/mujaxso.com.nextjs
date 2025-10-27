import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  const host = request.headers.get('host') || ''
  
  // Only handle www redirects for the main domain, not subdomains
  if (host === 'www.mujaxso.com') {
    const redirectUrl = new URL(request.url)
    redirectUrl.host = 'mujaxso.com'
    return NextResponse.redirect(redirectUrl, 301)
  }
  
  // Extract subdomain from hostname
  const hostname = host.split(':')[0] // Remove port
  const parts = hostname.split('.')
  
  let subdomain: string | null = null
  
  // For localhost: blog.localhost
  if (hostname.includes('localhost') || hostname === 'localhost') {
    if (parts.length > 1 && parts[0] !== 'localhost') {
      subdomain = parts[0]
    }
  } 
  // For production: blog.mujaxso.com
  else if (hostname.endsWith('mujaxso.com')) {
    if (parts.length >= 3 && parts[0] !== 'www') {
      subdomain = parts[0]
    }
  }
  
  console.log('Subdomain:', subdomain)
  
  // Handle blog subdomain
  if (subdomain === 'blog') {
    if (!url.pathname.startsWith('/blog')) {
      const newPath = url.pathname === '/' ? '/blog' : `/blog${url.pathname}`
      url.pathname = newPath
      console.log('Rewriting to:', newPath)
      return NextResponse.rewrite(url)
    }
    console.log('Already on /blog path')
    return NextResponse.next()
  }
  
  // Handle projects subdomain
  if (subdomain === 'projects') {
    if (!url.pathname.startsWith('/projects')) {
      const newPath = url.pathname === '/' ? '/projects' : `/projects${url.pathname}`
      url.pathname = newPath
      console.log('Rewriting to:', newPath)
      return NextResponse.rewrite(url)
    }
    console.log('Already on /projects path')
    return NextResponse.next()
  }
  
  // Handle music subdomain
  if (subdomain === 'music') {
    if (!url.pathname.startsWith('/music')) {
      const newPath = url.pathname === '/' ? '/music' : `/music${url.pathname}`
      url.pathname = newPath
      console.log('Rewriting to:', newPath)
      return NextResponse.rewrite(url)
    }
    console.log('Already on /music path')
    return NextResponse.next()
  }
  
  // Handle funmacs subdomain
  if (subdomain === 'funmacs') {
    if (!url.pathname.startsWith('/funmacs')) {
      const newPath = url.pathname === '/' ? '/funmacs' : `/funmacs${url.pathname}`
      url.pathname = newPath
      console.log('Rewriting to:', newPath)
      return NextResponse.rewrite(url)
    }
    console.log('Already on /funmacs path')
    return NextResponse.next()
  }
  
  // Handle mujaos subdomain
  if (subdomain === 'mujaos') {
    if (!url.pathname.startsWith('/mujaos')) {
      const newPath = url.pathname === '/' ? '/mujaos' : `/mujaos${url.pathname}`
      url.pathname = newPath
      console.log('Rewriting to:', newPath)
      return NextResponse.rewrite(url)
    }
    console.log('Already on /mujaos path')
    return NextResponse.next()
  }
  
  // No subdomain or unknown - serve main site
  console.log('No subdomain match, serving main site')
  console.log('=== END DEBUG ===\n')
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
