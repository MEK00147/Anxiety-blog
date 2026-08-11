import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Resource, Category } from '../types';
import { ResourceCard } from '../components/resources/ResourceCard';
import { ResourceSearch } from '../components/resources/ResourceSearch';
import { ResourceFilters } from '../components/resources/ResourceFilters';
import { BreathingTool } from '../components/tools/BreathingTool';
import { SearchX, ArrowRight } from 'lucide-react';

interface ResourcesProps {
  resources: Resource[];
  onNavigate: (path: string) => void;
  onSelectResource: (resource: Resource) => void;
  initialCategory?: Category;
  focusSearchTrigger?: boolean;
}

export const Resources: React.FC<ResourcesProps> = ({
  resources,
  onNavigate,
  onSelectResource,
  initialCategory = 'ALL',
  focusSearchTrigger = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (focusSearchTrigger && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [focusSearchTrigger]);

  // Filter resources based on category and search query
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory =
        selectedCategory === 'ALL' || resource.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        resource.title.toLowerCase().includes(q) ||
        resource.description.toLowerCase().includes(q) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        resource.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [resources, selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Page Header */}
      <section className="px-5 md:px-16 pt-8 md:pt-12 max-w-[1200px] mx-auto text-center md:text-left">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#334537] font-semibold tracking-tight mb-4 leading-tight">
          Find something useful for right now.
        </h1>
        <p className="font-sans text-lg md:text-xl text-[#434843] max-w-3xl leading-relaxed">
          Explore practical tools and clear information designed to help you understand anxiety and support your wellbeing.
        </p>
      </section>

      {/* Search & Filters */}
      <section className="px-5 md:px-16 max-w-[1200px] mx-auto">
        <ResourceSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          inputRef={searchInputRef}
        />
        <ResourceFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* Featured Tool (Breathing Exercise) */}
      {selectedCategory === 'ALL' && !searchQuery && (
        <section className="px-5 md:px-16 max-w-[1200px] mx-auto">
          <BreathingTool />
        </section>
      )}

      {/* Resource Grid */}
      <section className="px-5 md:px-16 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl md:text-3xl text-[#1a1c1a] font-medium">
            {selectedCategory === 'ALL' ? 'All Resources & Tools' : selectedCategory}
          </h2>
          <span className="font-sans text-xs text-[#737872] font-semibold">
            Showing {filteredResources.length} {filteredResources.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onClick={(res) => {
                  onSelectResource(res);
                  onNavigate('/learn');
                }}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-[#f4f3f1] rounded-2xl border border-[#e3e2e0] max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#c3c8c1]/40 flex items-center justify-center mx-auto text-[#434843]">
              <SearchX className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#1a1c1a] font-medium">
              We couldn't find anything matching that.
            </h3>
            <p className="font-sans text-sm text-[#434843]">
              Try another search term or explore all resources across our core categories.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-[#334537] text-white font-sans text-sm font-semibold hover:bg-[#394b3d] transition-colors"
            >
              View All Resources
            </button>
          </div>
        )}
      </section>

      {/* Support CTA Banner */}
      <section className="px-5 md:px-16 max-w-[1200px] mx-auto pt-8">
        <div className="bg-[#334537]/5 rounded-[2rem] p-8 md:p-12 text-center max-w-4xl mx-auto border border-[#334537]/10 space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#334537] font-semibold">
            Getting help is a sign of taking care of yourself.
          </h2>
          <p className="font-sans text-base text-[#434843] max-w-2xl mx-auto">
            You don't have to navigate this alone. Seeking professional support is a strong, positive step toward better wellbeing.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('GETTING SUPPORT');
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#334537] text-white font-sans text-sm font-semibold hover:bg-[#394b3d] transition-colors inline-flex"
          >
            <span>Learn About Getting Support</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
