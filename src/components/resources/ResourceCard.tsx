import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Resource } from '../../types';

interface ResourceCardProps {
  resource: Resource;
  onClick: (resource: Resource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => {
  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'UNDERSTAND':
        return 'bg-[#334537]/10 text-[#334537]';
      case 'PRACTICAL TOOLS':
        return 'bg-[#446273]/10 text-[#446273]';
      case 'DAILY WELLBEING':
        return 'bg-[#433d5b]/10 text-[#433d5b]';
      case 'GETTING SUPPORT':
        return 'bg-[#ba1a1a]/10 text-[#ba1a1a]';
      default:
        return 'bg-[#334537]/10 text-[#334537]';
    }
  };

  const actionText = resource.type === 'tool' || resource.type === 'exercise' ? 'Try it' : 'Read';

  return (
    <article
      onClick={() => onClick(resource)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(resource);
        }
      }}
      tabIndex={0}
      role="button"
      className="flex flex-col group cursor-pointer border border-[#e5e2d9] rounded-2xl overflow-hidden bg-[#faf9f6] hover:bg-[#f4f3f1] transition-all duration-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#334537]"
    >
      <div className="h-48 w-full bg-[#e9e8e5] relative overflow-hidden">
        <img
          src={resource.image}
          alt={resource.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className={`font-sans text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md ${getCategoryBadgeStyle(resource.category)}`}>
            {resource.category}
          </span>
          <span className="font-sans text-xs text-[#434843] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {resource.readingTime}
          </span>
        </div>

        <h3 className="font-serif text-xl text-[#1a1c1a] mb-2 font-medium leading-snug group-hover:text-[#334537] transition-colors">
          {resource.title}
        </h3>

        <p className="font-sans text-sm text-[#434843] mb-6 line-clamp-2 flex-grow leading-relaxed">
          {resource.description}
        </p>

        <div className="flex items-center text-[#334537] font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200">
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </div>
      </div>
    </article>
  );
};
