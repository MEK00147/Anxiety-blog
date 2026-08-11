import React, { useState } from 'react';
import { ArrowRight, Brain, Heart, Clock, Sparkles } from 'lucide-react';
import { Resource } from '../types';
import { BreathingTool } from '../components/tools/BreathingTool';
import { GroundingTool } from '../components/tools/GroundingTool';
import { WorryJournal } from '../components/tools/WorryJournal';

interface HomeProps {
  onNavigate: (path: string) => void;
  onSelectResource: (resource: Resource) => void;
  featuredResource: Resource;
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  onSelectResource,
  featuredResource,
}) => {
  const [activeToolTab, setActiveToolTab] = useState<'breathing' | 'grounding' | 'journal'>('breathing');

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="px-5 md:px-16 max-w-[1200px] mx-auto pt-10 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-6 md:pr-6">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1a1c1a] font-semibold tracking-tight leading-[1.1] mb-6">
              A calmer mind starts with one small moment.
            </h1>
            <p className="font-sans text-lg md:text-xl text-[#434843] mb-8 max-w-lg leading-relaxed">
              Understand anxiety, build healthier coping habits, and find practical resources to help you take the next step — without judgment or pressure.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('/resources')}
                className="inline-flex items-center justify-center bg-[#334537] text-white font-sans text-sm md:text-base font-semibold px-8 py-4 rounded-full hover:bg-[#394b3d] transition-colors active:scale-98 shadow-sm"
              >
                Explore Resources
              </button>
              <button
                onClick={() => {
                  onSelectResource(featuredResource);
                  onNavigate('/learn');
                }}
                className="inline-flex items-center justify-center border border-[#c3c8c1] bg-transparent text-[#1a1c1a] font-sans text-sm md:text-base font-medium px-6 py-4 rounded-full hover:bg-[#e3e2e0] transition-colors"
              >
                Learn About Anxiety
              </button>
            </div>
          </div>

          <div className="md:col-span-6 mt-6 md:mt-0">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-md bg-[#f4f3f1] border border-[#e5e2d9]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvTVYQM4TJec5kOqdMZYfosV1GBEZonEREvsVrBiNBkS6ouD-GvYj0gNlxLIMXcM6sGAd8LLRDjyonLQDN8mDlyvcvNS81z8JblNa3QTygGp1RPI3SYDBNBSY8rqffTUVxOLt464QYdeUdvTlnoFsFb_q7lb3ZdRCdFvdQdUPGy2MBtKEKjJG3p4UQu5PCCP9E0TGcX3Jxh_I-j3ATwoDOb5xEiTkMqCavej_r4eEsxlMpdue9SO-e"
                alt="A tranquil lifestyle photograph bathed in soft, diffused morning sunlight featuring light linen and natural wood"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#faf9f6]/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="bg-[#f4f3f1] py-12 px-5 md:px-16 border-y border-[#e3e2e0]">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="font-serif text-2xl md:text-3xl text-[#334537] font-medium">
            Information you can understand. Support you can actually use.
          </h2>
          <p className="font-sans text-sm md:text-base text-[#434843]/90 italic">
            CALMA provides general educational and wellbeing information. It does not diagnose conditions or replace professional healthcare.
          </p>
        </div>
      </section>

      {/* Quick Intro Cards: Anxiety can feel different */}
      <section className="px-5 md:px-16 max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-[#1a1c1a] mb-4 font-medium">
            Anxiety can feel different for everyone.
          </h2>
          <div className="w-16 h-1 bg-[#c3c8c1] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 border border-[#e3e2e0] flex flex-col items-center text-center group hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-[#4a5d4e]/15 flex items-center justify-center mb-6 text-[#334537] group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl icon-filled">psychology</span>
            </div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#446273] mb-3">
              THE MIND
            </h3>
            <p className="font-sans text-base text-[#434843] leading-relaxed">
              Worry, overthinking, and racing thoughts.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 border border-[#e3e2e0] flex flex-col items-center text-center group hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-[#4a5d4e]/15 flex items-center justify-center mb-6 text-[#334537] group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl icon-filled">favorite</span>
            </div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#446273] mb-3">
              THE BODY
            </h3>
            <p className="font-sans text-base text-[#434843] leading-relaxed">
              Tension, restlessness, and physical fatigue.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 border border-[#e3e2e0] flex flex-col items-center text-center group hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-[#4a5d4e]/15 flex items-center justify-center mb-6 text-[#334537] group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-3xl icon-filled">schedule</span>
            </div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#446273] mb-3">
              DAILY LIFE
            </h3>
            <p className="font-sans text-base text-[#434843] leading-relaxed">
              Sleep disruption, routine changes, and avoidance.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resource (Bento-style) */}
      <section className="px-5 md:px-16 max-w-[1200px] mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden bg-[#f4f3f1] border border-[#e3e2e0] group">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-14 flex flex-col justify-center order-2 md:order-1">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#334537] mb-4 block">
                Featured Reading • 7 Min Read
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1a1c1a] font-medium mb-6 leading-snug">
                When Worry Starts Taking Up Too Much Space
              </h2>
              <p className="font-sans text-base md:text-lg text-[#434843] mb-8 leading-relaxed">
                Understanding the mechanics of rumination and learning gentle ways to create distance between yourself and your thoughts.
              </p>
              <div>
                <button
                  onClick={() => {
                    onSelectResource(featuredResource);
                    onNavigate('/learn');
                  }}
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#334537] hover:text-[#0e1f13] transition-colors group-hover:translate-x-2 duration-300"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="h-64 md:h-auto order-1 md:order-2 bg-[#e3e2e0]">
              <img
                src={featuredResource.image}
                alt={featuredResource.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Five Principles Section */}
      <section className="px-5 md:px-16 max-w-[1200px] mx-auto py-8">
        <div className="text-center mb-12">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#334537] mb-2 block">
            OUR CORE FRAMEWORK
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1a1c1a] font-medium">
            Five Principles for Navigating Anxiety
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { num: '01', name: 'Understand', desc: 'Learn how your brain and body experience stress without shame.' },
            { num: '02', name: 'Notice', desc: 'Recognize early signs of physical tension and intrusive thought loops.' },
            { num: '03', name: 'Respond', desc: 'Apply gentle, sensory grounding and slow breathing exercises.' },
            { num: '04', name: 'Connect', desc: 'Share your thoughts with trusted friends or healthcare professionals.' },
            { num: '05', name: 'Grow', desc: 'Build steady, supportive daily routines that foster resilience.' },
          ].map((principle) => (
            <div
              key={principle.num}
              className="p-6 rounded-2xl bg-white border border-[#e3e2e0] flex flex-col justify-between hover:border-[#334537]/40 transition-colors"
            >
              <span className="font-serif text-2xl font-bold text-[#334537]/40 mb-3 block">
                {principle.num}
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1a1c1a] mb-2">
                  {principle.name}
                </h3>
                <p className="font-sans text-xs text-[#434843] leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Wellbeing Tools Preview */}
      <section className="px-5 md:px-16 max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#446273] mb-2 block">
            PRACTICAL INTERACTIVE TOOLS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1a1c1a] font-medium">
            Try a Tool Right Now
          </h2>
          <p className="font-sans text-sm md:text-base text-[#434843] mt-2 max-w-xl mx-auto">
            Choose an interactive exercise below to help soothe your nervous system or organize your thoughts.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-full bg-[#f4f3f1] border border-[#e3e2e0] gap-1">
            <button
              onClick={() => setActiveToolTab('breathing')}
              className={`px-5 py-2 rounded-full font-sans text-xs md:text-sm font-semibold transition-all ${
                activeToolTab === 'breathing'
                  ? 'bg-[#334537] text-white shadow-xs'
                  : 'text-[#434843] hover:text-[#1a1c1a]'
              }`}
            >
              Slow Breathing
            </button>
            <button
              onClick={() => setActiveToolTab('grounding')}
              className={`px-5 py-2 rounded-full font-sans text-xs md:text-sm font-semibold transition-all ${
                activeToolTab === 'grounding'
                  ? 'bg-[#334537] text-white shadow-xs'
                  : 'text-[#434843] hover:text-[#1a1c1a]'
              }`}
            >
              5-4-3-2-1 Grounding
            </button>
            <button
              onClick={() => setActiveToolTab('journal')}
              className={`px-5 py-2 rounded-full font-sans text-xs md:text-sm font-semibold transition-all ${
                activeToolTab === 'journal'
                  ? 'bg-[#334537] text-white shadow-xs'
                  : 'text-[#434843] hover:text-[#1a1c1a]'
              }`}
            >
              Worry Journal
            </button>
          </div>
        </div>

        {/* Render Active Tool */}
        <div>
          {activeToolTab === 'breathing' && <BreathingTool />}
          {activeToolTab === 'grounding' && <GroundingTool />}
          {activeToolTab === 'journal' && <WorryJournal />}
        </div>
      </section>

      {/* Support CTA Banner */}
      <section className="px-5 md:px-16 max-w-[1200px] mx-auto">
        <div className="bg-[#334537]/5 rounded-[2rem] p-8 md:p-16 text-center max-w-4xl mx-auto border border-[#334537]/10 space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl text-[#334537] font-semibold">
            Getting help is a sign of taking care of yourself.
          </h2>
          <p className="font-sans text-base md:text-lg text-[#434843] max-w-2xl mx-auto leading-relaxed">
            You don't have to navigate this alone. Seeking professional support is a strong, positive step toward better wellbeing.
          </p>
          <button
            onClick={() => onNavigate('/resources')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#334537] text-white font-sans text-sm font-semibold hover:bg-[#394b3d] transition-colors active:scale-95 shadow-xs"
          >
            <span>Learn About Getting Support</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
