"use client";

import { useState, useMemo } from 'react';
import { PostCard } from './components/PostCard';
import { FeaturedPostCard } from './components/FeaturedPostCard';
import { SearchAndFilters } from './components/SearchAndFilters';
import { BlogPost, filterPosts } from './lib/utils';

interface BlogPageProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return filterPosts(posts, searchQuery, selectedCategory, selectedTag);
  }, [searchQuery, selectedCategory, selectedTag, posts]);

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, ideas, and insights on software engineering, AI, and technology
          </p>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          posts={posts}
        />

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Featured Posts</h2>
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
        <section>
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            {searchQuery || selectedCategory || selectedTag 
              ? `Search Results (${filteredPosts.length})` 
              : 'All Posts'
            }
          </h2>
          
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <PostCard 
                  key={post.slug} 
                  post={post}
                  onCategoryClick={handleCategoryClick}
                  onTagClick={handleTagClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground text-lg mb-4">
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
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
