import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
      // Add crawl delay to prevent overwhelming the server, but keep it fast
      crawlDelay: 1,
    },
    sitemap: 'https://mujaxso.com/sitemap.xml',
    // Add host to help with canonical URLs
    host: 'https://mujaxso.com',
  }
}
