import React, { useState } from 'react';
import { Eye, Hand, Volume2, Sparkles, Utensils, CheckCircle, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';

interface GroundingStep {
  count: number;
  sense: string;
  action: string;
  prompt: string;
  icon: React.ReactNode;
  examples: string[];
}

const STEPS: GroundingStep[] = [
  {
    count: 5,
    sense: 'SEE',
    action: 'Acknowledge 5 things you can see around you.',
    prompt: 'Look around your room or space. Notice subtle details like light patterns, textures, or colors.',
    icon: <Eye className="w-6 h-6 text-[#334537]" />,
    examples: ['A shadow on the wall', 'A mug on the desk', 'Green leaves outside', 'A soft textile pattern', 'A wooden grain'],
  },
  {
    count: 4,
    sense: 'TOUCH',
    action: 'Acknowledge 4 things you can feel physically.',
    prompt: 'Bring your awareness to physical contact points with the world right now.',
    icon: <Hand className="w-6 h-6 text-[#446273]" />,
    examples: ['Feet resting on the floor', 'Fabric against your arms', 'Cool desktop surface', 'Warm air on skin'],
  },
  {
    count: 3,
    sense: 'HEAR',
    action: 'Acknowledge 3 things you can hear.',
    prompt: 'Listen past obvious sounds to faint ambient noises in your environment.',
    icon: <Volume2 className="w-6 h-6 text-[#433d5b]" />,
    examples: ['A fan humming gently', 'Distant birds', 'Your own steady breath'],
  },
  {
    count: 2,
    sense: 'SMELL',
    action: 'Acknowledge 2 things you can smell.',
    prompt: 'Notice ambient aromas or smell your sleeve, coffee cup, or fresh air.',
    icon: <Sparkles className="w-6 h-6 text-[#334537]" />,
    examples: ['Fresh morning air', 'Herbal tea or coffee'],
  },
  {
    count: 1,
    sense: 'TASTE',
    action: 'Acknowledge 1 thing you can taste.',
    prompt: 'Notice the current taste in your mouth, or take a sip of cool water.',
    icon: <Utensils className="w-6 h-6 text-[#446273]" />,
    examples: ['Lingering taste of mint, tea, or pure water'],
  },
];

export const GroundingTool: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const step = STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setNotes({});
    setIsCompleted(false);
  };

  return (
    <div className="bg-[#faf9f6] rounded-2xl p-6 md:p-10 border border-[#e5e2d9] shadow-sm max-w-3xl mx-auto my-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e3e2e0]">
        <div>
          <span className="font-sans text-xs uppercase tracking-wider text-[#446273] font-semibold">
            PRACTICAL TOOL • 5-4-3-2-1 GROUNDING
          </span>
          <h3 className="font-serif text-2xl text-[#1a1c1a] font-medium mt-1">
            Sensory Re-anchoring Exercise
          </h3>
        </div>
        <div className="text-right">
          <span className="font-sans text-xs text-[#737872] block">Step</span>
          <span className="font-serif text-lg font-semibold text-[#334537]">
            {isCompleted ? 'Done' : `${currentStepIndex + 1} of 5`}
          </span>
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-[#e3e2e0] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#334537] h-full transition-all duration-300 ease-out"
              style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
            />
          </div>

          {/* Current Step Card */}
          <div className="bg-[#f4f3f1] p-6 rounded-xl border border-[#e3e2e0] space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xs">
                {step.icon}
              </div>
              <div>
                <span className="font-sans text-xs uppercase font-bold text-[#446273] tracking-widest">
                  Notice {step.count} Things You Can
                </span>
                <h4 className="font-serif text-2xl font-semibold text-[#1a1c1a]">
                  {step.sense}
                </h4>
              </div>
            </div>

            <p className="font-sans text-base text-[#1a1c1a] font-medium">
              {step.action}
            </p>

            <p className="font-sans text-sm text-[#434843]">
              {step.prompt}
            </p>

            <div className="pt-2">
              <span className="font-sans text-xs text-[#737872] font-semibold uppercase tracking-wider block mb-2">
                Inspiration / Examples:
              </span>
              <div className="flex flex-wrap gap-2">
                {step.examples.map((ex, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white text-xs text-[#434843] border border-[#e3e2e0]"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            {/* Optional note taking */}
            <div className="pt-2">
              <label htmlFor={`grounding-note-${currentStepIndex}`} className="sr-only">
                Notes for step {currentStepIndex + 1}
              </label>
              <input
                id={`grounding-note-${currentStepIndex}`}
                type="text"
                placeholder="Optional: Type what you notice..."
                value={notes[currentStepIndex] || ''}
                onChange={(e) => setNotes({ ...notes, [currentStepIndex]: e.target.value })}
                className="w-full bg-white border border-[#c3c8c1] rounded-lg px-4 py-2.5 text-sm text-[#1a1c1a] focus:outline-none focus:border-[#334537]"
              />
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all inline-flex items-center gap-2 ${
                currentStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-[#737872]'
                  : 'text-[#434843] hover:bg-[#e3e2e0]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-full bg-[#334537] text-white font-sans text-sm font-semibold hover:bg-[#394b3d] transition-all inline-flex items-center gap-2 active:scale-95"
            >
              <span>{currentStepIndex === STEPS.length - 1 ? 'Complete Grounding' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Completion Card */
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#334537]/10 text-[#334537] flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-8 h-8" />
          </div>

          <h4 className="font-serif text-2xl text-[#334537] font-semibold">
            You made space to notice the present moment.
          </h4>

          <p className="font-sans text-sm text-[#434843] max-w-md mx-auto leading-relaxed">
            Whenever your mind feels caught in racing thoughts or future worries, you can return to your five physical senses to re-anchor in the safety of right now.
          </p>

          <div className="pt-4">
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-full bg-[#334537] text-white font-sans text-sm font-semibold hover:bg-[#394b3d] transition-all inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practice Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
