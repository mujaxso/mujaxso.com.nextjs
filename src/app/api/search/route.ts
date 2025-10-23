import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  type: 'blog' | 'project' | 'page';
}

// Since we can't use fs in Edge Runtime, we'll need to find another approach
// For now, let's just search static pages and return them
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results: SearchResult[] = [];

    // Add static pages
    const pages = [
      { title: 'Home', description: 'Welcome to my portfolio', href: '/', type: 'page' as const },
      { title: 'Projects', description: 'View my projects and work', href: '/projects', type: 'page' as const },
      { title: 'Blog', description: 'Read my latest thoughts and insights', href: '/blog', type: 'page' as const },
      { title: 'About', description: 'Learn more about me', href: '/about', type: 'page' as const },
      { title: 'Contact', description: 'Get in touch with me', href: '/contact', type: 'page' as const }
    ];

    for (const page of pages) {
      if (page.title.toLowerCase().includes(query) || 
          page.description.toLowerCase().includes(query)) {
        results.push(page);
      }
    }

    // Note: To search blog posts and projects in Edge Runtime, you would need to:
    // 1. Pre-build a search index at build time and include it in your bundle
    // 2. Use an external search service
    // 3. Change the runtime to 'nodejs' (not recommended for Edge)
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [] });
  }
}
