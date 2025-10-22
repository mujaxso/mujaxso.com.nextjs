import { promises as fs } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import BlogPage from './page';

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

export default async function BlogPageWrapper() {
  try {
    const posts = await getBlogPosts();
    // Ensure posts is always an array
    const safePosts = Array.isArray(posts) ? posts : [];
    return <BlogPage posts={safePosts} />;
  } catch (error) {
    console.error('Error in BlogPageWrapper:', error);
    // Return empty array to prevent crashes
    return <BlogPage posts={[]} />;
  }
}
