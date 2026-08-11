import React, { useState } from 'react';
import { InfoModal, ModalType } from './InfoModal';

interface FooterProps {
  onNavigate: (path: string) => void;
  onSelectTopic?: (topic: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectTopic }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <>
      <footer className="w-full rounded-t-2xl bg-[#f4f3f1] border-t border-[#c3c8c1]/40 mt-auto">
        <div className="max-w-[1200px] mx-auto px-5 md:px-16 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col gap-3">
            <span className="font-serif text-2xl text-[#334537] flex items-center gap-2 font-semibold">
              <span className="material-symbols-outlined text-xl">spa</span> CALMA
            </span>
            <p className="font-sans text-sm text-[#434843] opacity-90 max-w-xs">
              A calmer mind starts with one small moment.
            </p>
            <p className="font-sans text-xs text-[#434843]/80 mt-2">
              © 2026 CALMA. For informational purposes only. Not intended for diagnosis or emergency treatment.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs uppercase tracking-widest text-[#1a1c1a] font-semibold mb-1">
              Navigation
            </h4>
            <button
              onClick={() => onNavigate('/')}
              className="text-left font-sans text-sm text-[#434843] hover:text-[#334537] transition-colors w-fit"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('/resources')}
              className="text-left font-sans text-sm text-[#434843] hover:text-[#334537] transition-colors w-fit"
            >
              Resources & Tools
            </button>
            <button
              onClick={() => onNavigate('/learn')}
              className="text-left font-sans text-sm text-[#434843] hover:text-[#334537] transition-colors w-fit"
            >
              Learn & Articles
            </button>
            <button
              onClick={() => setActiveModal('topics')}
              className="text-left font-sans text-sm text-[#434843] hover:text-[#334537] transition-colors w-fit"
            >
              Explore Topics
            </button>
          </div>

          {/* Column 3: Legal & Information Modals */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs uppercase tracking-widest text-[#1a1c1a] font-semibold mb-1">
              Legal & Info
            </h4>
            <button
              onClick={() => setActiveModal('about')}
              className="text-left font-sans text-sm text-[#434843] hover:text-[#334537] transition-colors w-fit"
            >
              About CALMA
            </button>
            <button
              onClick={() => setActiveModal('privacy')}
              className="text-left font-sans text-sm text-[#434843] hover:text-[#334537] transition-colors w-fit"
            >
              Privacy & Local Storage
            </button>
            <button
              onClick={() => setActiveModal('disclaimer')}
              className="text-left font-sans text-sm text-[#434843] hover:text-[#334537] transition-colors w-fit"
            >
              Medical Disclaimer
            </button>
            <button
              onClick={() => setActiveModal('emergency')}
              className="text-left font-sans text-sm text-[#ba1a1a] hover:underline font-medium transition-colors w-fit mt-1"
            >
              Urgent Crisis & Emergency Info
            </button>
          </div>
        </div>
      </footer>

      {/* Info Modals */}
      <InfoModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
        onSelectTopic={(topic) => {
          if (onSelectTopic) onSelectTopic(topic);
          onNavigate('/resources');
        }}
      />
    </>
  );
};
