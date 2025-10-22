"use client";

import Link from "next/link";
import Image from "next/image";
import { promises as fs } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [regularPosts, setRegularPosts] = useState<BlogPost[]>([]);
  const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];

  useEffect(() => {
    async function loadPosts() {
      const loadedPosts = await getBlogPosts();
      setPosts(loadedPosts);
      setFilteredPosts(loadedPosts);
      setFeaturedPosts(loadedPosts.filter(post => post.featured));
      setRegularPosts(loadedPosts.filter(post => !post.featured));
    }
    loadPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
    setFeaturedPosts(filtered.filter(post => post.featured));
    setRegularPosts(filtered.filter(post => !post.featured));
  }, [searchQuery, posts]);

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

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts, tags, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>

        {/* Categories - Display Only */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <div className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium">
            All Posts ({posts.length})
          </div>
          {categories.map((category) => (
            <div
              key={category}
              className="px-4 py-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium"
            >
              {category} ({posts.filter(post => post.category === category).length})
            </div>
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
          <h2 className="text-2xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">
            {searchQuery ? `Search Results (${filteredPosts.length})` : 'All Posts'}
          </h2>
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-zinc-400 dark:text-zinc-500 text-lg mb-4">
                No posts found matching your search.
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="group relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image 
            src={post.image || '/vercel.svg'} 
            alt={`${post.title} cover`} 
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full mb-3">
              {post.category}
            </span>
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-200 transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center text-white/80 text-sm">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="group rounded-2xl overflow-hidden bg-white dark:bg-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full flex flex-col">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image 
            src={post.image || '/vercel.svg'} 
            alt={`${post.title} cover`} 
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded">
              {post.category}
            </span>
            {post.tags?.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs font-medium rounded">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2 flex-1">
            {post.title}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-500 mt-auto">
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
