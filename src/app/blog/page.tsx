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
  const posts = await getBlogPosts();
  const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Thoughts, stories, and ideas about technology, development, and more.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <button className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium">
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">Featured Posts</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">All Posts</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="aspect-[16/9] relative overflow-hidden">
        <Image 
          src={post.image || '/vercel.svg'} 
          alt={`${post.title} cover`} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full mb-3">
            {post.category}
          </span>
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
            <Link href={`/blog/${post.slug}`} className="hover:text-blue-200 transition-colors">
              {post.title}
            </Link>
          </h3>
          <div className="flex items-center text-white/80 text-sm">
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group rounded-2xl overflow-hidden bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image 
          src={post.image || '/vercel.svg'} 
          alt={`${post.title} cover`} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs font-medium rounded">
            {post.category}
          </span>
          {post.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs font-medium rounded">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm line-clamp-2">
          {post.description}
        </p>
        <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-500">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </article>
  );
}
