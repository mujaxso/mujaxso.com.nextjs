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
  const [isMounted, setIsMounted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Track when component is mounted to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Always render the same structure on server and client
  // The modal will be empty on the server and populated on the client
  return (
    <div className="relative" ref={searchRef} suppressHydrationWarning={true}>
      {/* Search Button - Always render this on both server and client */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 
                   font-medium hover:scale-105 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 
                   shadow-sm hover:shadow-md"
        aria-label="Search"
      >
        <SearchIcon className="w-4 h-4" />
        <span className="hidden md:inline">Search</span>
      </button>

      {/* Always render the modal container, but conditionally show content */}
      <div style={{ display: isMounted && isOpen ? 'block' : 'none' }}>
        {isMounted && isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-40 px-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 animate-in fade-in-0"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Search Container - macOS Spotlight Style */}
          <div className="relative w-full max-w-2xl transform transition-all duration-300 scale-95 animate-in fade-in-0 zoom-in-95 slide-in-from-top-10">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden 
                           flex flex-col max-h-[70vh]">
              {/* Search Input - macOS Spotlight Style */}
              <div className="p-6">
                <div className="flex items-center space-x-3">
                  <SearchIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search blog posts, projects, and more..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full bg-transparent border-0 outline-none text-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      style={{
                        fontSize: '1.25rem',
                        lineHeight: '1.75rem',
                      }}
                    />
                  </div>
                  {isLoading && (
                    <Loader2 className="w-5 h-5 text-gray-500 dark:text-gray-400 animate-spin flex-shrink-0" />
                  )}
                </div>
              </div>

              {/* Search Results */}
              <div className="flex-1 overflow-y-auto border-t border-gray-200 dark:border-gray-700">
                {results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result.href)}
                        className="w-full text-left px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-medium">
                              {result.type.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                              {result.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                              {result.description}
                            </p>
                          </div>
                          <span className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full capitalize flex-shrink-0">
                            {result.type}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : query && !isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <SearchIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search terms
                    </p>
                  </div>
                ) : !query && !isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center mb-4">
                      <SearchIcon className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Start searching
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Type to discover content across the site
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
