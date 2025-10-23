import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  type: 'blog' | 'project' | 'page';
}

// Pre-built search index (this would ideally be generated at build time)
// For now, we'll hardcode some example blog posts and projects
const searchIndex: SearchResult[] = [
  // Static pages
  { title: 'Home', description: 'Welcome to my portfolio', href: '/', type: 'page' },
  { title: 'Projects', description: 'View my projects and work', href: '/projects', type: 'page' },
  { title: 'Blog', description: 'Read my latest thoughts and insights', href: '/blog', type: 'page' },
  { title: 'About', description: 'Learn more about me', href: '/about', type: 'page' },
  { title: 'Contact', description: 'Get in touch with me', href: '/contact', type: 'page' },
  
  // Example blog posts (replace with actual content)
  { title: 'Getting Started with Next.js', description: 'Learn how to build modern web applications with Next.js', href: '/blog/getting-started-with-nextjs', type: 'blog' },
  { title: 'React Best Practices', description: 'Essential patterns and practices for React development', href: '/blog/react-best-practices', type: 'blog' },
  { title: 'Machine Learning Fundamentals', description: 'Introduction to core concepts in machine learning and AI', href: '/blog/machine-learning-fundamentals', type: 'blog' },
  
  // Example projects (replace with actual content)
  { title: 'E-commerce Platform', description: 'Full-stack e-commerce solution with React and Node.js', href: '/projects/ecommerce-platform', type: 'project' },
  { title: 'AI Chat Application', description: 'Real-time chat application with AI-powered responses', href: '/projects/ai-chat-app', type: 'project' },
  { title: 'Data Visualization Dashboard', description: 'Interactive dashboard for data analysis and visualization', href: '/projects/data-dashboard', type: 'project' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = searchIndex.filter(item => {
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
