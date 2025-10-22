"use client";

import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { BlogPost } from '../lib/utils';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedTag: string | null;
  onTagChange: (tag: string | null) => void;
  posts: BlogPost[];
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTag,
  onTagChange,
  posts
}: SearchAndFiltersProps) {
  const categories = [...new Set(posts.map(post => post.category).filter(Boolean))] as string[];
  const tags = new Set<string>();
  posts.forEach(post => post.tags?.forEach(tag => tags.add(tag)));
  const allTags = Array.from(tags);

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag;

  const clearAllFilters = () => {
    onSearchChange('');
    onCategoryChange(null);
    onTagChange(null);
  };

  return (
    <div className="space-y-6 mb-12">
      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts, tags, categories..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedTag && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-white text-xs rounded-full">
                #{selectedTag}
                <button onClick={() => onTagChange(null)} className="hover:bg-white/20 rounded">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory && !selectedTag && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-white text-xs rounded-full">
                {selectedCategory}
                <button onClick={() => onCategoryChange(null)} className="hover:bg-white/20 rounded">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && !selectedTag && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-white text-xs rounded-full">
                "{searchQuery}"
                <button onClick={() => onSearchChange('')} className="hover:bg-white/20 rounded">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-primary hover:text-primary-dark ml-2"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => {
            onCategoryChange(null);
            onTagChange(null);
            onSearchChange('');
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            !selectedCategory && !selectedTag && !searchQuery
              ? 'bg-primary text-white'
              : 'bg-card border border-border text-foreground hover:bg-primary/20'
          }`}
        >
          All Posts ({posts.length})
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              onCategoryChange(category);
              onTagChange(null);
              onSearchChange('');
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-card border border-border text-foreground hover:bg-primary/20'
            }`}
          >
            {category} ({posts.filter(post => post.category === category).length})
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
                onTagChange(tag);
                onCategoryChange(null);
                onSearchChange('');
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-primary text-white'
                  : 'bg-card border border-border text-foreground hover:bg-primary/20'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
