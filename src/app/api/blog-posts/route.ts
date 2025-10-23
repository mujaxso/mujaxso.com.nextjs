import { NextResponse } from 'next/server';

// Use Node.js runtime to access file system
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Import the function that gets blog posts
    // Note: You'll need to make sure this function is available
    const { getBlogPosts } = await import('../../blog/lib/utils');
    const posts = await getBlogPosts();
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Fallback to static data
    const blogPosts = [
      { title: 'Getting Started with Next.js', description: 'Learn how to build modern web applications with Next.js', slug: 'getting-started-with-nextjs' },
      { title: 'React Best Practices', description: 'Essential patterns and practices for React development', slug: 'react-best-practices' },
      { title: 'Machine Learning Fundamentals', description: 'Introduction to core concepts in machine learning and AI', slug: 'machine-learning-fundamentals' },
    ];
    return NextResponse.json(blogPosts);
  }
}
