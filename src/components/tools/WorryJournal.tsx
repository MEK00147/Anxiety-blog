import React, { useState, useEffect } from 'react';
import { BookOpen, ShieldCheck, Save, Trash2, Heart, Plus, Sparkles } from 'lucide-react';
import { WorryJournalEntry } from '../../types';

const STORAGE_KEY = 'calma_worry_journal_entries';

export const WorryJournal: React.FC = () => {
  const [worryText, setWorryText] = useState('');
  const [controllable, setControllable] = useState<'yes' | 'no' | 'unsure'>('yes');
  const [actionStep, setActionStep] = useState('');
  const [savedEntries, setSavedEntries] = useState<WorryJournalEntry[]>([]);
  const [savedSuccessMessage, setSavedSuccessMessage] = useState(false);
  const [viewingSaved, setViewingSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedEntries(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Unable to access localStorage for worry journal', e);
    }
  }, []);

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!worryText.trim()) return;

    const newEntry: WorryJournalEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      worry: worryText.trim(),
      controllable,
      actionStep: actionStep.trim(),
    };

    const updated = [newEntry, ...savedEntries];
    setSavedEntries(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save to localStorage', err);
    }

    setSavedSuccessMessage(true);
    setTimeout(() => setSavedSuccessMessage(false), 4000);

    // Reset fields
    setWorryText('');
    setActionStep('');
    setControllable('yes');
  };

  const handleDeleteEntry = (id: string) => {
    const updated = savedEntries.filter((e) => e.id !== id);
    setSavedEntries(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to update localStorage', err);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all journal entries from this browser?')) {
      setSavedEntries([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.warn('Failed to clear localStorage', err);
      }
    }
  };

  return (
    <div className="bg-[#faf9f6] rounded-2xl p-6 md:p-10 border border-[#e5e2d9] shadow-sm max-w-3xl mx-auto my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#e3e2e0] gap-4">
        <div>
          <span className="font-sans text-xs uppercase tracking-wider text-[#433d5b] font-semibold flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>PRACTICAL TOOL • WORRY JOURNAL</span>
          </span>
          <h3 className="font-serif text-2xl text-[#1a1c1a] font-medium mt-1">
            Structured Thought Reflection
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {savedEntries.length > 0 && (
            <button
              onClick={() => setViewingSaved(!viewingSaved)}
              className="px-4 py-2 rounded-full border border-[#c3c8c1] bg-white text-xs text-[#334537] font-semibold hover:bg-[#e3e2e0] transition-colors"
            >
              {viewingSaved ? 'Write New Entry' : `Saved Notes (${savedEntries.length})`}
            </button>
          )}
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="mb-6 p-3.5 rounded-xl bg-[#f4f3f1] border border-[#e3e2e0] flex items-center gap-3 text-xs text-[#434843]">
        <ShieldCheck className="w-5 h-5 text-[#334537] shrink-0" />
        <span>
          <strong>Privacy Guarantee:</strong> Your reflection stays strictly inside this browser on this device. No remote server or cloud database is used.
        </span>
      </div>

      {!viewingSaved ? (
        <form onSubmit={handleSaveEntry} className="space-y-6">
          {/* Question 1: What am I worried about? */}
          <div className="space-y-2">
            <label htmlFor="worry-text-input" className="block font-serif text-lg font-medium text-[#1a1c1a]">
              1. What am I worried about right now?
            </label>
            <p className="text-xs text-[#434843]">
              Express the thought clearly. Getting it out of your head reduces working memory overload.
            </p>
            <textarea
              id="worry-text-input"
              rows={3}
              required
              value={worryText}
              onChange={(e) => setWorryText(e.target.value)}
              placeholder="e.g. I am worried about whether I will complete my project on time..."
              className="w-full bg-[#f4f3f1] border border-[#c3c8c1] rounded-xl p-4 text-sm text-[#1a1c1a] focus:bg-white focus:border-[#334537] focus:outline-none transition-colors"
            />
          </div>

          {/* Question 2: Can I do something about it? */}
          <div className="space-y-2">
            <label className="block font-serif text-lg font-medium text-[#1a1c1a]">
              2. Can I do something about it right now?
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { id: 'yes', label: 'Yes, it is within my control' },
                { id: 'no', label: 'Not right now / Out of my control' },
                { id: 'unsure', label: "I'm not sure" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setControllable(opt.id as any)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-colors border ${
                    controllable === opt.id
                      ? 'bg-[#334537] text-white border-[#334537]'
                      : 'bg-[#f4f3f1] text-[#434843] border-[#c3c8c1] hover:bg-[#e3e2e0]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: What's one small action I can take? */}
          <div className="space-y-2">
            <label htmlFor="action-step-input" className="block font-serif text-lg font-medium text-[#1a1c1a]">
              3. What is one small action I can take, or how can I practice letting this rest?
            </label>
            <p className="text-xs text-[#434843]">
              {controllable === 'yes'
                ? 'Name one micro-step you can execute today (e.g. outline 3 bullet points).'
                : 'Write a gentle permission statement to set this thought aside until tomorrow.'}
            </p>
            <textarea
              id="action-step-input"
              rows={2}
              value={actionStep}
              onChange={(e) => setActionStep(e.target.value)}
              placeholder="e.g. I will write down the first paragraph, then take a walk..."
              className="w-full bg-[#f4f3f1] border border-[#c3c8c1] rounded-xl p-4 text-sm text-[#1a1c1a] focus:bg-white focus:border-[#334537] focus:outline-none transition-colors"
            />
          </div>

          {/* Reassurance Message */}
          <div className="p-4 rounded-xl bg-[#f0ece1] border border-[#e5e2d9] flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#334537] shrink-0" />
            <p className="font-serif text-sm text-[#334537] italic font-medium">
              You don't have to solve everything tonight. Taking it one moment at a time is enough.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-[#334537] text-white font-sans text-sm font-semibold hover:bg-[#394b3d] transition-all inline-flex items-center gap-2 active:scale-95 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Reflection Locally</span>
            </button>

            {savedSuccessMessage && (
              <span className="text-xs font-semibold text-[#334537] animate-fade-in">
                ✓ Reflection saved securely in browser!
              </span>
            )}
          </div>
        </form>
      ) : (
        /* Saved Local Entries List */
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h4 className="font-serif text-xl font-medium text-[#1a1c1a]">
              Your Local Saved Reflections
            </h4>
            <button
              onClick={handleClearAll}
              className="text-xs text-[#ba1a1a] hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Local Notes</span>
            </button>
          </div>

          {savedEntries.length === 0 ? (
            <p className="text-sm text-[#737872] italic py-6 text-center">
              No saved entries yet. Write your first reflection above.
            </p>
          ) : (
            <div className="space-y-4">
              {savedEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-5 rounded-xl bg-[#f4f3f1] border border-[#e3e2e0] space-y-2 relative group"
                >
                  <div className="flex items-center justify-between text-xs text-[#737872] pb-1 border-b border-[#e3e2e0]">
                    <span>{entry.timestamp}</span>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-[#ba1a1a] opacity-60 hover:opacity-100 p-1"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-[#334537] uppercase tracking-wider block">
                      Worry:
                    </span>
                    <p className="text-sm text-[#1a1c1a] font-medium leading-snug">
                      {entry.worry}
                    </p>
                  </div>

                  {entry.actionStep && (
                    <div className="pt-1">
                      <span className="text-xs font-semibold text-[#446273] uppercase tracking-wider block">
                        Action / Permission:
                      </span>
                      <p className="text-sm text-[#434843]">
                        {entry.actionStep}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
