import React from 'react';
import { ArrowLeft, Clock, Calendar, User, CheckCircle, ArrowRight, Share2, Bookmark } from 'lucide-react';
import { Resource } from '../../types';

interface ArticleReaderProps {
  resource: Resource;
  allResources: Resource[];
  onNavigate: (path: string) => void;
  onSelectResource: (resource: Resource) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  resource,
  allResources,
  onNavigate,
  onSelectResource,
}) => {
  const content = resource.content;

  // Find related resources in the same category or tags
  const related = allResources
    .filter((r) => r.id !== resource.id && (r.category === resource.category || r.tags.some(t => resource.tags.includes(t))))
    .slice(0, 3);

  return (
    <article className="max-w-[800px] mx-auto px-5 md:px-8 py-10 md:py-16">
      {/* Back button */}
      <button
        onClick={() => onNavigate('/resources')}
        className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#334537] hover:text-[#0e1f13] transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to All Resources</span>
      </button>

      {/* Article Header */}
      <header className="mb-10 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md bg-[#334537]/10 text-[#334537]">
            {resource.category}
          </span>
          <span className="font-sans text-xs text-[#737872] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {resource.readingTime}
          </span>
          {content?.date && (
            <span className="font-sans text-xs text-[#737872] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {content.date}
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl md:text-5xl text-[#1a1c1a] font-semibold leading-[1.15]">
          {resource.title}
        </h1>

        <p className="font-sans text-lg md:text-xl text-[#434843] leading-relaxed">
          {content?.subtitle || resource.subtitle || resource.description}
        </p>

        {content?.author && (
          <div className="flex items-center gap-2 pt-2 border-t border-[#e3e2e0] text-sm text-[#737872]">
            <User className="w-4 h-4" />
            <span>Written by {content.author}</span>
          </div>
        )}
      </header>

      {/* Main Hero Image */}
      <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-sm border border-[#e5e2d9] bg-[#e9e8e5]">
        <img
          src={resource.image}
          alt={resource.imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Takeaways Summary Box */}
      {content?.takeaways && content.takeaways.length > 0 && (
        <div className="bg-[#f0ece1] border border-[#e5e2d9] rounded-2xl p-6 md:p-8 mb-10 space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[#334537] flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#334537]" />
            <span>Key Takeaways</span>
          </h2>
          <ul className="space-y-2 font-sans text-sm md:text-base text-[#434843] leading-relaxed pl-1">
            {content.takeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#334537] mt-2 shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Article Sections */}
      <div className="space-y-10 font-sans text-base md:text-lg text-[#1a1c1a] leading-relaxed">
        {content?.sections && content.sections.length > 0 ? (
          content.sections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-[#334537] font-medium pt-2">
                {section.heading}
              </h2>

              {section.content.map((p, pIdx) => (
                <p key={pIdx} className="text-[#1a1c1a] leading-relaxed">
                  {p}
                </p>
              ))}

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="list-disc pl-6 space-y-2 text-[#434843] text-base">
                  {section.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx}>{bp}</li>
                  ))}
                </ul>
              )}

              {section.quote && (
                <blockquote className="my-6 p-6 rounded-2xl bg-[#f4f3f1] border-l-4 border-[#334537] font-serif text-xl md:text-2xl text-[#334537] italic leading-relaxed">
                  "{section.quote}"
                </blockquote>
              )}

              {section.callout && (
                <div className="my-6 p-6 rounded-2xl bg-[#e7deff]/30 border border-[#433d5b]/20 text-[#433d5b] text-sm md:text-base leading-relaxed">
                  {section.callout}
                </div>
              )}
            </section>
          ))
        ) : (
          <div className="space-y-6">
            <p>{resource.description}</p>
            <p>
              Understanding anxiety is an ongoing journey. When we notice physical tension or racing thoughts, reminding ourselves that our nervous system is simply trying to keep us safe allows us to respond with self-compassion instead of frustration.
            </p>
          </div>
        )}
      </div>

      {/* Educational Safety Note */}
      <div className="mt-12 p-6 rounded-2xl bg-[#f4f3f1] border border-[#e3e2e0] text-xs md:text-sm text-[#434843] space-y-1">
        <p className="font-semibold text-[#1a1c1a]">Educational Disclaimer</p>
        <p>
          This article is for general educational and wellbeing purposes. CALMA does not diagnose conditions or replace professional medical healthcare. If anxiety is impacting your day-to-day life, please consider consulting a qualified healthcare professional.
        </p>
      </div>

      {/* Related Resources Footer */}
      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-[#e3e2e0] space-y-6">
          <h3 className="font-serif text-2xl text-[#1a1c1a] font-medium">
            Related Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectResource(rel)}
                className="p-4 rounded-xl bg-[#f4f3f1] border border-[#e3e2e0] hover:bg-[#e3e2e0] cursor-pointer transition-colors group space-y-2"
              >
                <span className="text-[10px] uppercase font-semibold text-[#334537] tracking-wider block">
                  {rel.category}
                </span>
                <h4 className="font-serif text-base font-medium text-[#1a1c1a] group-hover:text-[#334537]">
                  {rel.title}
                </h4>
                <div className="flex items-center text-xs text-[#334537] font-semibold pt-1">
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
