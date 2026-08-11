import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf9f6]/95 backdrop-blur-xl shadow-sm border-b border-[#e5e2d9]'
          : 'bg-[#faf9f6]/80 backdrop-blur-xl border-b border-transparent'
      }`}
    >
      <div className="flex justify-between items-center px-5 md:px-16 py-4 max-w-[1200px] mx-auto w-full">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#334537] hover:bg-[#e3e2e0] transition-transform active:scale-90"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 group text-left"
          >
            <span className="material-symbols-outlined text-[#334537] text-2xl group-hover:rotate-12 transition-transform duration-300">
              spa
            </span>
            <span className="font-serif text-2xl tracking-widest text-[#334537] uppercase font-semibold">
              CALMA
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          <button
            onClick={() => handleNavClick('/')}
            className={`font-sans text-base transition-colors duration-200 pb-1 border-b-2 ${
              currentPath === '/'
                ? 'text-[#334537] font-bold border-[#334537]'
                : 'text-[#434843] hover:text-[#334537] border-transparent'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('/resources')}
            className={`font-sans text-base transition-colors duration-200 pb-1 border-b-2 ${
              currentPath === '/resources'
                ? 'text-[#334537] font-bold border-[#334537]'
                : 'text-[#434843] hover:text-[#334537] border-transparent'
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => handleNavClick('/learn')}
            className={`font-sans text-base transition-colors duration-200 pb-1 border-b-2 ${
              currentPath === '/learn'
                ? 'text-[#334537] font-bold border-[#334537]'
                : 'text-[#434843] hover:text-[#334537] border-transparent'
            }`}
          >
            Learn
          </button>
        </nav>

        {/* Search Trigger */}
        <button
          onClick={() => {
            if (currentPath !== '/resources') {
              handleNavClick('/resources');
            }
            if (onOpenSearch) onOpenSearch();
          }}
          className="p-2 rounded-full text-[#334537] hover:bg-[#e3e2e0] transition-all active:scale-90"
          aria-label="Search resources"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bg-[#faf9f6] border-b border-[#e3e2e0] shadow-lg animate-fade-in z-50 p-6 space-y-4">
          <button
            onClick={() => handleNavClick('/')}
            className={`block w-full text-left py-3 px-4 rounded-xl text-lg font-medium transition-colors ${
              currentPath === '/' ? 'bg-[#334537] text-white' : 'text-[#1a1c1a] hover:bg-[#f4f3f1]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('/resources')}
            className={`block w-full text-left py-3 px-4 rounded-xl text-lg font-medium transition-colors ${
              currentPath === '/resources' ? 'bg-[#334537] text-white' : 'text-[#1a1c1a] hover:bg-[#f4f3f1]'
            }`}
          >
            Resources & Tools
          </button>
          <button
            onClick={() => handleNavClick('/learn')}
            className={`block w-full text-left py-3 px-4 rounded-xl text-lg font-medium transition-colors ${
              currentPath === '/learn' ? 'bg-[#334537] text-white' : 'text-[#1a1c1a] hover:bg-[#f4f3f1]'
            }`}
          >
            Learn & Read
          </button>
        </div>
      )}
    </header>
  );
};
