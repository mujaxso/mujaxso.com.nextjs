"use client";

import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  type: 'blog' | 'project' | 'page';
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Perform search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchAll = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchAll, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleResultClick = (href: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(href);
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-card-foreground/80 hover:text-primary transition-all duration-300 font-medium hover:scale-105"
      >
        <SearchIcon className="w-4 h-4" />
        Search
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-4 md:pt-20 px-4">
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl">
            {/* Search Input */}
            <div className="relative p-3 md:p-4 border-b border-border">
              <SearchIcon className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 md:w-5 md:h-5" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search blog posts, projects, and more..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 md:pl-12 pr-8 md:pr-10 py-2 md:py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-card-foreground text-sm md:text-base"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-card-foreground"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-64 md:max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center text-muted-foreground">
                  Searching...
                </div>
              ) : results.length > 0 ? (
                <div className="p-2">
                  {results.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result.href)}
                      className="w-full text-left p-4 hover:bg-accent rounded-lg transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-card-foreground">
                            {result.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {result.description}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full capitalize">
                          {result.type}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : query ? (
                <div className="p-8 text-center text-muted-foreground">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  Type to start searching...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
