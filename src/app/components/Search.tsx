"use client";

import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';
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

  // Close search when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
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
        className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-primary transition-all duration-300 
                   font-medium hover:scale-105 bg-primary/5 hover:bg-primary/10 rounded-xl border border-border 
                   shadow-sm hover:shadow-md"
        aria-label="Search"
      >
        <SearchIcon className="w-4 h-4" />
        <span className="hidden md:inline">Search</span>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Search Container - Centered */}
          <div className="relative w-full max-w-2xl">
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden 
                           flex flex-col max-h-[80vh]">
              {/* Search Input */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search blog posts, projects, and more..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl 
                                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                                 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  {isLoading && (
                    <Loader2 className="w-5 h-5 text-muted-foreground animate-spin flex-shrink-0" />
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-accent rounded-xl transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Search Results */}
              <div className="flex-1 overflow-y-auto max-h-96">
                {results.length > 0 ? (
                  <div className="p-2">
                    {results.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result.href)}
                        className="w-full text-left p-4 hover:bg-accent/50 rounded-xl transition-all duration-300 
                                   hover:scale-[1.01] active:scale-[0.99] group animate-in fade-in-0 slide-in-from-top-1"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors truncate">
                              {result.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {result.description}
                            </p>
                          </div>
                          <span className="ml-4 px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full capitalize flex-shrink-0">
                            {result.type}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : query && !isLoading ? (
                  <div className="flex flex-col items-center justify-center py-8 px-6 text-center">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                      <SearchIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-medium text-card-foreground mb-1">
                      No results found
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search terms
                    </p>
                  </div>
                ) : !query && !isLoading ? (
                  <div className="flex flex-col items-center justify-center py-8 px-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <SearchIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-base font-medium text-card-foreground mb-1">
                      Start searching
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Type to discover content across the site
                    </p>
                  </div>
                ) : null}
              </div>
              {/* Footer hint */}
              <div className="p-4 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  Press <kbd className="px-2 py-1 text-xs bg-border rounded-md">ESC</kbd> to close
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
