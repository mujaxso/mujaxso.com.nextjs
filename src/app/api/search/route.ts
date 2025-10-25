import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  type: 'blog' | 'project' | 'page';
}

// Fallback data in case API endpoints fail
const fallbackBlogPosts = [
  { title: 'Getting Started with Next.js', description: 'Learn how to build modern web applications with Next.js', slug: 'getting-started-with-nextjs' },
  { title: 'React Best Practices', description: 'Essential patterns and practices for React development', slug: 'react-best-practices' },
  { title: 'Machine Learning Fundamentals', description: 'Introduction to core concepts in machine learning and AI', slug: 'machine-learning-fundamentals' },
];

const fallbackProjects = [
  { title: 'E-commerce Platform', description: 'Full-stack e-commerce solution with React and Node.js', slug: 'ecommerce-platform' },
  { title: 'AI Chat Application', description: 'Real-time chat application with AI-powered responses', slug: 'ai-chat-app' },
  { title: 'Data Visualization Dashboard', description: 'Interactive dashboard for data analysis and visualization', slug: 'data-dashboard' },
];

const staticPages: SearchResult[] = [
  { title: 'Home', description: 'Welcome to my portfolio', href: '/', type: 'page' },
  { title: 'Projects', description: 'View my projects and work', href: '/projects', type: 'page' },
  { title: 'Blog', description: 'Read my latest thoughts and insights', href: '/blog', type: 'page' },
  { title: 'About', description: 'Learn more about me', href: '/about', type: 'page' },
  { title: 'Contact', description: 'Get in touch with me', href: '/contact', type: 'page' },
];

async function fetchWithFallback(url: string, fallbackData: any[]) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    return fallbackData;
  }
}

const getCachedSearchResults = unstable_cache(
  async (query: string) => {
    const url = new URL('http://localhost'); // Base URL will be constructed differently
    const baseUrl = process.env.NEXTAUTH_URL || 'https://mujaxso.com';
    
    // Fetch blog posts and projects with fallback
    const [blogPosts, projects] = await Promise.all([
      fetchWithFallback(`${baseUrl}/api/blog-posts`, fallbackBlogPosts),
      fetchWithFallback(`${baseUrl}/api/projects`, fallbackProjects)
    ]);

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

    return results;
  },
  ['search-results'],
  {
    revalidate: 300, // 5 minutes - search results can be more dynamic
    tags: ['search'],
  }
);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams } = url;
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await getCachedSearchResults(query);
    return NextResponse.json({ results }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [] });
  }
}
