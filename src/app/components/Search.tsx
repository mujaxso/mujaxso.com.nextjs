"use client";

import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import SearchModal from './SearchModal';

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Search Button - Always render this on both server and client */}
      <div className="relative" suppressHydrationWarning>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-10 h-10 text-foreground/90 font-medium rounded-2xl glass border border-white/20 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm shadow-lg md:w-auto md:px-4 md:py-2.5 md:gap-2"
          aria-label="Search"
          suppressHydrationWarning
        >
          <div className="relative">
            <SearchIcon className="w-4 h-4" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 blur"></div>
          </div>
          <span className="hidden md:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
            Search
          </span>
        </button>
      </div>

      {/* Search Modal - Always render but conditionally show */}
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
