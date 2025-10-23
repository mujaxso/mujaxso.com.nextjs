import { promises as fs } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import BlogPageClient from './page-client';
import { Hero } from '../components/Hero';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
  featured?: boolean;
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDirectory = join(process.cwd(), 'src', 'content', 'blog');
  
  try {
    const files = await fs.readdir(blogDirectory);
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, '');
          const fullPath = join(blogDirectory, file);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          
          return {
            slug,
            title: data.title || `Blog Post ${slug}`,
            description: data.description || 'No description available.',
            date: data.date || 'Unknown date',
            image: data.image || '/vercel.svg',
            category: data.category || 'Uncategorized',
            tags: data.tags || [],
            readingTime: calculateReadingTime(content),
            featured: data.featured || false,
          };
        })
    );
    
    // Sort posts by date in descending order
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  try {
    const posts = await getBlogPosts();
    // Ensure posts is always an array
    const safePosts = Array.isArray(posts) ? posts : [];
    return (
      <div className="container mx-auto px-4 py-20">
        <Hero 
          title="My Blog" 
          subtitle="Personal Musings" 
          description="Exploring technology, development, and creative ideas through writing"
        />
        <BlogPageClient posts={safePosts} />
      </div>
    );
  } catch (error) {
    console.error('Error in BlogPage:', error);
    // Return empty array to prevent crashes
    return (
      <div className="container mx-auto px-4 py-20">
        <Hero 
          title="Blog" 
          subtitle="Latest Insights" 
          description="Thoughts, ideas, and insights on software engineering, AI, and technology"
        />
        <BlogPageClient posts={[]} />
      </div>
    );
  }
}

// Revalidate every hour for ISR
export const revalidate = 3600;
