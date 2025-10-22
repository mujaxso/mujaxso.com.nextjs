"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from 'react';
import { Search, Calendar, Clock } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
}

interface BlogPageProps {
  posts: BlogPost[];
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 h-full flex flex-col">
        {post.image && (
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image 
              src={post.image} 
              alt={`${post.title} cover`} 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          {post.category && (
            <span className="text-xs font-medium text-primary mb-3">
              {post.category}
            </span>
          )}
          <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-4 text-sm line-clamp-3 flex-1">
            {post.description}
          </p>
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-4 border-t border-border">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPageClient({ posts }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    
    return posts.filter(post => 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, posts]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, ideas, and insights on software engineering, AI, and technology
          </p>
        </div>

        {/* Simple Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg mb-4">
              {searchQuery ? 'No posts found matching your search.' : 'No posts available yet.'}
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
