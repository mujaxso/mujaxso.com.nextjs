import Link from "next/link";
import Image from "next/image";
import { promises as fs } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
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
          const { data } = matter(fileContents);
          
          return {
            slug,
            title: data.title || `Blog Post ${slug}`,
            description: data.description || 'No description available.',
            date: data.date || 'Unknown date',
            image: data.image || '/vercel.svg',
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
  const posts = await getBlogPosts();
  
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">Blog</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="group rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 hover:transform hover:scale-[1.02] transition-all">
              <div className="h-48 bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-4 overflow-hidden">
                <Image 
                  src={post.image || '/vercel.svg'} 
                  alt={`${post.title} cover`} 
                  width={400} 
                  height={200} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500 dark:text-zinc-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <Link href={`/blog/${post.slug}`} className="text-blue-500 dark:text-blue-400 hover:underline">
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
