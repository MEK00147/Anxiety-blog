import React from 'react';
import { Search, X } from 'lucide-react';

interface ResourceSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export const ResourceSearch: React.FC<ResourceSearchProps> = ({
  searchQuery,
  onSearchChange,
  inputRef,
}) => {
  return (
    <div className="relative max-w-2xl mx-auto md:mx-0 w-full mb-6">
      <label htmlFor="resource-search-input" className="sr-only">
        Search anxiety topics, tools and resources
      </label>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737872] pointer-events-none" />
      <input
        ref={inputRef}
        id="resource-search-input"
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search anxiety topics, tools and resources..."
        className="w-full bg-[#f4f3f1] border-b-2 border-[#c3c8c1] focus:border-[#334537] focus:bg-[#efeeeb] focus:outline-none rounded-t-xl pl-12 pr-10 py-4 font-sans text-base text-[#1a1c1a] placeholder-[#737872] transition-colors"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#737872] hover:bg-[#e3e2e0] hover:text-[#1a1c1a] transition-colors"
          aria-label="Clear search input"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
