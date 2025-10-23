// Search index for client-side search functionality
// This can be used for offline search or as a backup

export interface SearchIndexItem {
  title: string;
  description: string;
  href: string;
  type: 'blog' | 'project' | 'page';
}

// Static search index that can be used as fallback
export const staticSearchIndex: SearchIndexItem[] = [
  // Static pages
  { title: 'Home', description: 'Welcome to my portfolio', href: '/', type: 'page' },
  { title: 'Projects', description: 'View my projects and work', href: '/projects', type: 'page' },
  { title: 'Blog', description: 'Read my latest thoughts and insights', href: '/blog', type: 'page' },
  { title: 'About', description: 'Learn more about me', href: '/about', type: 'page' },
  { title: 'Contact', description: 'Get in touch with me', href: '/contact', type: 'page' },
  
  // Blog posts
  { title: 'Getting Started with Next.js', description: 'Learn how to build modern web applications with Next.js', href: '/blog/getting-started-with-nextjs', type: 'blog' },
  { title: 'React Best Practices', description: 'Essential patterns and practices for React development', href: '/blog/react-best-practices', type: 'blog' },
  { title: 'Machine Learning Fundamentals', description: 'Introduction to core concepts in machine learning and AI', href: '/blog/machine-learning-fundamentals', type: 'blog' },
  
  // Projects
  { title: 'E-commerce Platform', description: 'Full-stack e-commerce solution with React and Node.js', href: '/projects/ecommerce-platform', type: 'project' },
  { title: 'AI Chat Application', description: 'Real-time chat application with AI-powered responses', href: '/projects/ai-chat-app', type: 'project' },
  { title: 'Data Visualization Dashboard', description: 'Interactive dashboard for data analysis and visualization', href: '/projects/data-dashboard', type: 'project' },
];

// Search function for client-side usage
export function searchStaticIndex(query: string): SearchIndexItem[] {
  if (!query) return [];
  
  const lowercaseQuery = query.toLowerCase();
  
  const results = staticSearchIndex.filter(item => {
    const searchableText = `${item.title} ${item.description} ${item.type}`.toLowerCase();
    return searchableText.includes(lowercaseQuery);
  });

  // Sort by relevance
  results.sort((a, b) => {
    const aTitleMatch = a.title.toLowerCase().includes(lowercaseQuery);
    const bTitleMatch = b.title.toLowerCase().includes(lowercaseQuery);
    
    // Prioritize title matches over description matches
    if (aTitleMatch && !bTitleMatch) return -1;
    if (!aTitleMatch && bTitleMatch) return 1;
    
    return 0;
  });

  return results;
}
