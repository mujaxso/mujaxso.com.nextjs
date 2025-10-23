import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

// Use Node.js runtime to access file system
export const runtime = 'nodejs';

async function getBlogPosts() {
  const blogDirectory = join(process.cwd(), 'src', 'content', 'blog');
  
  try {
    const files = await fs.readdir(blogDirectory);
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, '');
          const filePath = join(blogDirectory, file);
          const content = await fs.readFile(filePath, 'utf-8');
          
          // Parse the full frontmatter
          const { data } = matter(content);
          
          // Skip draft posts
          if (data.draft === true) {
            return null;
          }
          
          return {
            slug,
            title: data.title || slug,
            description: data.description || '',
          };
        })
    );
    
    return posts;
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

export async function GET() {
  try {
    const posts = await getBlogPosts();
    // Filter out null values from draft posts
    const filteredPosts = posts.filter(post => post !== null);
    return NextResponse.json(filteredPosts);
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
