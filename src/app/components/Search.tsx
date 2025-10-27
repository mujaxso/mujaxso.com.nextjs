"use client";

import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import SearchModal from './SearchModal';
import { Button } from './ui/Button';

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Search Button - Always render this on both server and client */}
      <div className="relative" suppressHydrationWarning>
        <Button
          variant="default"
          size="md"
          onClick={() => setIsOpen(true)}
          className="h-10 w-10 flex items-center justify-center p-0"
          aria-label="Search"
          suppressHydrationWarning
        >
          <SearchIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Search Modal - Always render but conditionally show */}
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
