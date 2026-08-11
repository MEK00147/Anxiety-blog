import React from 'react';
import { Category } from '../../types';

interface ResourceFiltersProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CATEGORIES: Category[] = [
  'ALL',
  'UNDERSTAND',
  'PRACTICAL TOOLS',
  'DAILY WELLBEING',
  'GETTING SUPPORT',
];

export const ResourceFilters: React.FC<ResourceFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2.5 my-4" role="tablist" aria-label="Resource Category Filters">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#334537] ${
              isSelected
                ? 'bg-[#4a5d4e] text-[#c0d5c2] border border-[#4a5d4e] shadow-sm'
                : 'bg-transparent text-[#434843] border border-[#c3c8c1] hover:bg-[#e3e2e0] hover:text-[#1a1c1a]'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
