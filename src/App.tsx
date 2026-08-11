/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Resources } from './pages/Resources';
import { Learn } from './pages/Learn';
import { RESOURCES_DATA } from './data/resources';
import { Resource, Category } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [selectedResource, setSelectedResource] = useState<Resource>(RESOURCES_DATA[0]);
  const [initialCategory, setInitialCategory] = useState<Category>('ALL');
  const [focusSearchTrigger, setFocusSearchTrigger] = useState(false);

  // Parse path and query params on mount and on popstate (browser back/forward)
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname || '/';
      const searchParams = new URLSearchParams(window.location.search);
      const resourceSlug = searchParams.get('resource');
      const categoryParam = searchParams.get('category') as Category | null;

      setCurrentPath(pathname);

      if (resourceSlug) {
        const found = RESOURCES_DATA.find((r) => r.slug === resourceSlug);
        if (found) {
          setSelectedResource(found);
        }
      }

      if (categoryParam) {
        setInitialCategory(categoryParam);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Update document title dynamically based on route/resource
  useEffect(() => {
    if (currentPath === '/') {
      document.title = 'CALMA — A Calmer Mind Starts With One Small Moment';
    } else if (currentPath === '/resources') {
      document.title = 'CALMA Resources — Anxiety & Mental Wellbeing Tools';
    } else if (currentPath === '/learn') {
      document.title = `${selectedResource.title} — CALMA`;
    }
  }, [currentPath, selectedResource]);

  const navigateTo = (path: string, options?: { resource?: Resource; category?: Category }) => {
    let targetUrl = path;
    const params = new URLSearchParams();

    if (options?.resource) {
      setSelectedResource(options.resource);
      params.set('resource', options.resource.slug);
    } else if (path === '/learn' && selectedResource) {
      params.set('resource', selectedResource.slug);
    }

    if (options?.category) {
      setInitialCategory(options.category);
      params.set('category', options.category);
    }

    const queryString = params.toString();
    if (queryString) {
      targetUrl = `${path}?${queryString}`;
    }

    window.history.pushState({}, '', targetUrl);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectResource = (resource: Resource) => {
    setSelectedResource(resource);
    navigateTo('/learn', { resource });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#1a1c1a] font-sans antialiased">
      {/* Header */}
      <Header
        currentPath={currentPath}
        onNavigate={(path) => navigateTo(path)}
        onOpenSearch={() => {
          setFocusSearchTrigger(true);
          setTimeout(() => setFocusSearchTrigger(false), 300);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-[80px]">
        {currentPath === '/' && (
          <Home
            onNavigate={(path) => navigateTo(path)}
            onSelectResource={handleSelectResource}
            featuredResource={RESOURCES_DATA[0]}
          />
        )}

        {currentPath === '/resources' && (
          <Resources
            resources={RESOURCES_DATA}
            onNavigate={(path) => navigateTo(path)}
            onSelectResource={handleSelectResource}
            initialCategory={initialCategory}
            focusSearchTrigger={focusSearchTrigger}
          />
        )}

        {currentPath === '/learn' && (
          <Learn
            currentResource={selectedResource}
            allResources={RESOURCES_DATA}
            onNavigate={(path) => navigateTo(path)}
            onSelectResource={handleSelectResource}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(path) => navigateTo(path)}
        onSelectTopic={(topic) => {
          setInitialCategory(topic as Category);
          navigateTo('/resources', { category: topic as Category });
        }}
      />
    </div>
  );
}
