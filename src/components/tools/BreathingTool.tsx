import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Wind, CheckCircle2 } from 'lucide-react';

export const BreathingTool: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [seconds, setSeconds] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  // Phase toggles every 4 seconds (4s in, 4s out)
  useEffect(() => {
    if (isActive && seconds > 0) {
      if (seconds % 4 === 0) {
        setPhase((prev) => (prev === 'in' ? 'out' : 'in'));
        if (phase === 'out') {
          setCycleCount((c) => {
            const next = c + 1;
            if (next >= 6) { // 6 full cycles = ~48 seconds
              setIsActive(false);
              setIsCompleted(true);
            }
            return next;
          });
        }
      }
    }
  }, [seconds, isActive, phase]);

  const handleStart = () => {
    setIsActive(true);
    setIsCompleted(false);
    setPhase('in');
    setSeconds(0);
    setCycleCount(0);
  };

  const handleTogglePause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsCompleted(false);
    setPhase('in');
    setSeconds(0);
    setCycleCount(0);
  };

  return (
    <div className="bg-[#f0ece1] rounded-2xl p-6 md:p-12 flex flex-col items-center text-center border border-[#e5e2d9] shadow-sm max-w-3xl mx-auto my-6">
      <div className="flex items-center gap-2 text-[#334537] text-xs uppercase tracking-widest font-semibold mb-2">
        <Wind className="w-4 h-4" />
        <span>PRACTICAL TOOL • SLOW BREATHING</span>
      </div>

      <h3 className="font-serif text-2xl md:text-3xl text-[#334537] mb-2 font-medium">
        Take a two-minute pause.
      </h3>

      <p className="font-sans text-sm md:text-base text-[#434843] mb-8 max-w-md leading-relaxed">
        A simple, guided 4-second breathing pace to help regulate your nervous system and soothe tension.
      </p>

      {/* Circle Animation Stage */}
      <div className="relative w-56 h-56 md:w-64 md:h-64 mb-8 flex items-center justify-center">
        {/* Outer ambient glow rings */}
        <div
          className={`absolute inset-0 rounded-full bg-[#334537]/10 transition-transform duration-[4000ms] ease-in-out ${
            isActive && phase === 'in' && !prefersReducedMotion ? 'scale-110' : 'scale-90'
          }`}
        />
        <div
          className={`absolute inset-4 rounded-full bg-[#334537]/15 transition-transform duration-[4000ms] ease-in-out ${
            isActive && phase === 'in' && !prefersReducedMotion ? 'scale-105' : 'scale-95'
          }`}
        />

        {/* Core Breathing Circle */}
        <div
          className={`w-36 h-36 md:w-44 md:h-44 rounded-full bg-[#334537] text-white flex flex-col items-center justify-center shadow-md z-10 transition-transform duration-[4000ms] ease-in-out ${
            isActive && phase === 'in' && !prefersReducedMotion
              ? 'scale-125 bg-[#4a5d4e]'
              : 'scale-100 bg-[#334537]'
          }`}
        >
          <span className="material-symbols-outlined text-3xl md:text-4xl mb-1">air</span>
          <span className="font-sans text-sm font-medium tracking-wide px-2">
            {!isActive && !isCompleted && 'Ready'}
            {isActive && (phase === 'in' ? 'Breathe In' : 'Breathe Out')}
            {isCompleted && 'Complete'}
          </span>
        </div>
      </div>

      {/* Active Phase Text Guidance */}
      <div className="min-h-[2.5rem] flex items-center justify-center mb-6">
        {!isActive && !isCompleted && (
          <p className="font-serif text-lg text-[#434843] italic">
            Click begin when you feel ready to pause.
          </p>
        )}
        {isActive && (
          <p className="font-serif text-xl md:text-2xl text-[#334537] font-medium animate-pulse">
            {phase === 'in' ? 'Breathe in gently through your nose...' : 'Breathe out slowly through your mouth...'}
          </p>
        )}
        {isCompleted && (
          <div className="flex items-center gap-2 text-[#334537] font-serif text-lg md:text-xl font-medium">
            <CheckCircle2 className="w-5 h-5 text-[#334537]" />
            <span>Nice work. Take a moment before moving on.</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {!isActive && !isCompleted && (
          <button
            onClick={handleStart}
            className="px-8 py-3.5 rounded-full bg-[#334537] text-white font-sans text-sm font-semibold hover:bg-[#394b3d] transition-all active:scale-95 shadow-sm inline-flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Begin Slow Breathing</span>
          </button>
        )}

        {isActive && (
          <>
            <button
              onClick={handleTogglePause}
              className="px-6 py-3 rounded-full bg-[#334537] text-white font-sans text-sm font-medium hover:bg-[#394b3d] transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-full border border-[#c3c8c1] bg-transparent text-[#434843] hover:bg-[#e3e2e0] font-sans text-sm font-medium transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </>
        )}

        {isCompleted && (
          <button
            onClick={handleStart}
            className="px-8 py-3.5 rounded-full bg-[#334537] text-white font-sans text-sm font-semibold hover:bg-[#394b3d] transition-all active:scale-95 shadow-sm inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repeat Exercise</span>
          </button>
        )}
      </div>
    </div>
  );
};
