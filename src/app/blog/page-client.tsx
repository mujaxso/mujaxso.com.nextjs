"use client";

import { useState, useMemo } from 'react';
import { PostCard } from './components/PostCard';
import { FeaturedPostCard } from './components/FeaturedPostCard';
import { SearchAndFilters } from './components/SearchAndFilters';
import { BlogPost, filterPosts } from './lib/utils';
import { Sparkles, Star } from 'lucide-react';

interface BlogPageProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'featured'>('recent');

  const filteredPosts = useMemo(() => {
    let filtered = filterPosts(posts, searchQuery, selectedCategory, selectedTag);
    
    // Apply sorting
    switch (sortBy) {
      case 'featured':
        filtered = [...filtered.filter(p => p.featured), ...filtered.filter(p => !p.featured)];
        break;
      case 'popular':
        // In a real app, this would use view count or engagement metrics
        filtered = filtered.sort((a, b) => {
          // Placeholder: sort by length of content (simulating popularity)
          const aPopularity = (a.description?.length || 0) + (a.title.length * 10);
          const bPopularity = (b.description?.length || 0) + (b.title.length * 10);
          return bPopularity - aPopularity;
        });
        break;
      case 'recent':
      default:
        filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }
    
    return filtered;
  }, [searchQuery, selectedCategory, selectedTag, sortBy, posts]);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedTag(null);
    setSearchQuery('');
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as 'recent' | 'popular' | 'featured');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Center the entire content */}
        <div className="flex flex-col items-center">
          {/* Search, Filters and Sort Controls */}
          <div className="w-full max-w-4xl flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-full lg:flex-1">
              <SearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedTag={selectedTag}
                onTagChange={setSelectedTag}
                posts={posts}
              />
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <label htmlFor="sort" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="block w-full lg:w-40 rounded-lg border border-border/50 bg-card/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="featured">Featured First</option>
              </select>
            </div>
          </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16 w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Featured Posts
              </h2>
              <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {featuredPosts.length} highlight{featuredPosts.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {featuredPosts.map((post) => (
                <FeaturedPostCard 
                  key={post.slug} 
                  post={post}
                  onCategoryClick={handleCategoryClick}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {searchQuery || selectedCategory || selectedTag 
                ? `Search Results (${filteredPosts.length})` 
                : 'All Posts'
              }
            </h2>
            {filteredPosts.length > 0 && (
              <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard 
                  key={post.slug} 
                  post={post}
                  onCategoryClick={handleCategoryClick}
                  onTagClick={handleTagClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-2xl border border-border/50 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="text-muted-foreground text-lg mb-6 flex flex-col items-center">
                <div className="w-16 h-16 mb-4 text-muted-foreground/50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {searchQuery || selectedCategory || selectedTag 
                  ? 'No posts found matching your filters.' 
                  : 'No posts available yet.'
                }
              </div>
              {(searchQuery || selectedCategory || selectedTag) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                    setSelectedTag(null);
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:scale-105 inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </section>
        </div>
      </main>
    </div>
  );
}
