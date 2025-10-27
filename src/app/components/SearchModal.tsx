"use client";

import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  type: 'blog' | 'project' | 'page';
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Track when component is mounted to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close search when clicking outside or pressing Escape
  useEffect(() => {
    if (!isMounted) return;
    
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMounted, onClose]);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current && isMounted) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMounted]);

  // Perform search
  useEffect(() => {
    if (!isMounted) return;
    
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
  }, [query, isMounted]);

  const handleResultClick = (href: string) => {
    onClose();
    setQuery('');
    router.push(href);
  };

  // Don't render anything on the server
  if (!isMounted) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[99999] search-modal-root" style={{ 
      position: 'fixed', 
      zIndex: 99999,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/95 transition-all duration-300 animate-in fade-in-0"
        onClick={onClose}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.95)'
        }}
      />
      
      {/* Search Container */}
      <div className="fixed inset-0 flex items-start justify-center pt-20 md:pt-40 px-4">
        <div className="relative w-full max-w-2xl transform transition-all duration-300 scale-95 animate-in fade-in-0 zoom-in-95 slide-in-from-top-10">
          <div 
            className="bg-white dark:bg-gray-900 border-0 rounded-2xl shadow-2xl overflow-hidden 
                       flex flex-col max-h-[70vh] search-modal-content"
            style={{
              backgroundColor: 'rgb(255 255 255)',
            }}
          >
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
                        <div className="w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-700 flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'rgb(37 99 235)'}}>
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
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgb(229 231 235)'}}>
                    <SearchIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
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
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgb(219 234 254)'}}>
                    <SearchIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
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
    </div>
  );
}
