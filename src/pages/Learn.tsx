import React from 'react';
import { Resource } from '../types';
import { ArticleReader } from '../components/article/ArticleReader';
import { BreathingTool } from '../components/tools/BreathingTool';
import { GroundingTool } from '../components/tools/GroundingTool';
import { WorryJournal } from '../components/tools/WorryJournal';

interface LearnProps {
  currentResource: Resource;
  allResources: Resource[];
  onNavigate: (path: string) => void;
  onSelectResource: (resource: Resource) => void;
}

export const Learn: React.FC<LearnProps> = ({
  currentResource,
  allResources,
  onNavigate,
  onSelectResource,
}) => {
  return (
    <div className="pb-16">
      {/* Primary Editorial Article View */}
      <ArticleReader
        resource={currentResource}
        allResources={allResources}
        onNavigate={onNavigate}
        onSelectResource={onSelectResource}
      />

      {/* Embedded Interactive Tools when viewing specific tool resources */}
      {currentResource.slug.includes('worry-journal') || currentResource.type === 'tool' ? (
        <section className="px-5 md:px-16 max-w-[1200px] mx-auto my-12">
          <WorryJournal />
        </section>
      ) : null}

      {currentResource.slug.includes('grounding') || currentResource.type === 'exercise' ? (
        <section className="px-5 md:px-16 max-w-[1200px] mx-auto my-12">
          <GroundingTool />
        </section>
      ) : null}

      {currentResource.slug.includes('breathing') ? (
        <section className="px-5 md:px-16 max-w-[1200px] mx-auto my-12">
          <BreathingTool />
        </section>
      ) : null}
    </div>
  );
};
