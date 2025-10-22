"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface Author {
  name: string;
  image: string;
  bio: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

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
  author?: Author;
}

interface BlogPageProps {
  posts: BlogPost[];
}

function PostCard({ post, setSelectedTag, setSearchQuery, updateURL }: { 
  post: BlogPost;
  setSelectedTag: (tag: string | null) => void;
  setSearchQuery: (query: string) => void;
  updateURL: (tag: string | null, search: string) => void;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="group rounded-2xl overflow-hidden backdrop-blur-xl bg-card border border-border shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full flex flex-col">
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
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedTag(null);
                setSearchQuery(post.category || '');
                updateURL(null, post.category || '');
              }}
              className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded hover:bg-primary hover:text-white transition-colors"
            >
              {post.category}
            </button>
            {post.tags?.slice(0, 2).map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedTag(tag);
                  setSearchQuery('');
                  updateURL(tag, '');
                }}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded hover:bg-primary hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors line-clamp-2 flex-1">
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
            {post.description}
          </p>
          
          {/* Author Information */}
          {post.author && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
              {post.author.image && post.author.image.trim() !== '' ? (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full border border-primary/20"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center border border-primary/20">
                  <span className="text-white text-xs font-bold">
                    {post.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">
                  {post.author.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {post.author.bio}
                </p>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-4">
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function FeaturedPostCard({ post, setSelectedTag, setSearchQuery, updateURL }: { 
  post: BlogPost;
  setSelectedTag: (tag: string | null) => void;
  setSearchQuery: (query: string) => void;
  updateURL: (tag: string | null, search: string) => void;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="group relative rounded-2xl overflow-hidden backdrop-blur-xl bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image 
            src={post.image || '/vercel.svg'} 
            alt={`${post.title} cover`} 
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedTag(null);
                setSearchQuery(post.category || '');
                updateURL(null, post.category || '');
              }}
              className="inline-block px-3 py-1 bg-primary text-white text-xs font-medium rounded-full mb-3 hover:bg-primary-dark transition-colors"
            >
              {post.category}
            </button>
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
              {post.title}
            </h3>
            
            {/* Author Information for Featured Posts */}
            {post.author && (
              <div className="flex items-center gap-2 mb-3">
                {post.author.image && post.author.image.trim() !== '' ? (
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="rounded-full border border-white/20"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center border border-white/20">
                    <span className="text-white text-xs font-bold">
                      {post.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-white/90 text-sm font-medium">
                  {post.author.name}
                </span>
              </div>
            )}
            
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

function BlogPageContent({ posts }: BlogPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Read URL parameters on component mount
  useEffect(() => {
    const tag = searchParams.get('tag');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (tag) {
      setSelectedTag(tag);
      setSearchQuery('');
    } else if (category) {
      setSelectedTag(null);
      setSearchQuery(category);
    } else if (search) {
      setSelectedTag(null);
      setSearchQuery(search);
    } else {
      setSelectedTag(null);
      setSearchQuery('');
    }
  }, [searchParams]);

  // Function to update URL parameters
  const updateURL = (tag: string | null, search: string) => {
    const params = new URLSearchParams();
    if (tag) {
      params.set('tag', tag);
    } else if (search) {
      params.set('search', search);
    }
    // Update the URL without page reload
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  // Use useMemo to optimize filtering
  const { filteredPosts, featuredPosts, regularPosts, categories, allTags } = useMemo(() => {
    // Ensure posts is always an array
    const safePosts = Array.isArray(posts) ? posts : [];
    
    // First filter by selected tag if any
    let filtered = safePosts;
    if (selectedTag) {
      filtered = filtered.filter(post => 
        post && post.tags?.includes(selectedTag)
      );
    }
    
    // Then filter by search query if any
    if (searchQuery && !selectedTag) {
      filtered = filtered.filter(post => 
        post && 
        (post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Get all unique tags from all posts
    const tags = new Set<string>();
    safePosts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    
    return {
      filteredPosts: filtered,
      featuredPosts: filtered.filter(post => post.featured),
      regularPosts: filtered.filter(post => !post.featured),
      categories: [...new Set(safePosts.map(post => post.category).filter(Boolean))],
      allTags: Array.from(tags)
    };
  }, [searchQuery, selectedTag, posts]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts, ideas, and insights on software engineering, AI, and technology
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts, tags, categories..."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                setSelectedTag(null);
                updateURL(null, value);
              }}
              className="w-full pl-10 pr-4 py-3 backdrop-blur-sm bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-card-foreground placeholder-muted-foreground"
            />
            {(searchQuery || selectedTag) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag(null);
                  updateURL(null, '');
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-card-foreground"
              >
                ✕
              </button>
            )}
          </div>
          {(searchQuery || selectedTag) && (
            <div className="text-center mt-2 text-sm text-muted-foreground">
              Showing results for:{" "}
              {selectedTag ? `#${selectedTag}` : `"${searchQuery}"`}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag(null);
                  updateURL(null, '');
                }}
                className="ml-2 text-primary hover:text-primary-dark transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Categories and Tags */}
        <div className="mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            <button
              onClick={() => {
                setSelectedTag(null);
                setSearchQuery('');
                updateURL(null, '');
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !selectedTag && !searchQuery
                  ? 'bg-primary text-white'
                  : 'backdrop-blur-sm bg-card border border-border text-card-foreground hover:bg-primary/20'
              }`}
            >
              All Posts ({Array.isArray(posts) ? posts.length : 0})
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedTag(null);
                  setSearchQuery(category || '');
                  updateURL(null, category || '');
                }}
                className="px-4 py-2 rounded-full backdrop-blur-sm bg-card border border-border text-card-foreground text-sm font-medium hover:bg-primary/20 transition-all duration-300"
              >
                {category} ({Array.isArray(posts) ? posts.filter(post => post && post.category === category).length : 0})
              </button>
            ))}
          </div>
          
          {/* Tags */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    setSearchQuery('');
                    updateURL(tag, '');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                    selectedTag === tag
                      ? 'bg-primary text-white'
                      : 'backdrop-blur-sm bg-card border border-border text-card-foreground hover:bg-primary/20'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Featured Posts</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {featuredPosts.map((post) => (
                <FeaturedPostCard 
                  key={post.slug} 
                  post={post} 
                  setSelectedTag={setSelectedTag}
                  setSearchQuery={setSearchQuery}
                  updateURL={updateURL}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            {searchQuery ? `Search Results (${filteredPosts.length})` : 'All Posts'}
          </h2>
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <PostCard 
                  key={post.slug} 
                  post={post} 
                  setSelectedTag={setSelectedTag}
                  setSearchQuery={setSearchQuery}
                  updateURL={updateURL}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-foreground/60 text-lg mb-4">
                No posts found matching your search.
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105"
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

export default function BlogPageClient({ posts }: BlogPageProps) {
  return (
    <BlogPageContent posts={posts} />
  );
}
