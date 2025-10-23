import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  type: 'blog' | 'project' | 'page';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Fetch blog posts and projects from their API endpoints
    const [blogPostsResponse, projectsResponse] = await Promise.all([
      fetch(`${process.env.NEXTAUTH_URL || request.nextUrl.origin}/api/blog-posts`),
      fetch(`${process.env.NEXTAUTH_URL || request.nextUrl.origin}/api/projects`)
    ]);

    const blogPosts = await blogPostsResponse.json();
    const projects = await projectsResponse.json();

    // Static pages
    const staticPages: SearchResult[] = [
      { title: 'Home', description: 'Welcome to my portfolio', href: '/', type: 'page' },
      { title: 'Projects', description: 'View my projects and work', href: '/projects', type: 'page' },
      { title: 'Blog', description: 'Read my latest thoughts and insights', href: '/blog', type: 'page' },
      { title: 'About', description: 'Learn more about me', href: '/about', type: 'page' },
      { title: 'Contact', description: 'Get in touch with me', href: '/contact', type: 'page' },
    ];

    // Combine all searchable items
    const allItems: SearchResult[] = [
      ...staticPages,
      ...blogPosts.map((post: any) => ({
        title: post.title,
        description: post.description,
        href: `/blog/${post.slug}`,
        type: 'blog' as const
      })),
      ...projects.map((project: any) => ({
        title: project.title,
        description: project.description,
        href: `/projects/${project.slug}`,
        type: 'project' as const
      }))
    ];

    // Filter results based on query
    const results = allItems.filter(item => {
      const searchableText = `${item.title} ${item.description} ${item.type}`.toLowerCase();
      return searchableText.includes(query);
    });

    // Sort by relevance (simple implementation)
    results.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(query);
      const bTitleMatch = b.title.toLowerCase().includes(query);
      
      // Prioritize title matches over description matches
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      
      return 0;
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [] });
  }
}
