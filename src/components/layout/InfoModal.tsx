import React, { useEffect, useRef } from 'react';
import { X, Shield, AlertTriangle, Info, List, HeartPulse } from 'lucide-react';

export type ModalType = 'privacy' | 'disclaimer' | 'about' | 'topics' | 'emergency' | null;

interface InfoModalProps {
  type: ModalType;
  onClose: () => void;
  onSelectTopic?: (topic: string) => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose, onSelectTopic }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  const renderContent = () => {
    switch (type) {
      case 'privacy':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#334537]">
              <Shield className="w-6 h-6" />
              <h3 className="font-serif text-2xl font-medium">Privacy Commitment</h3>
            </div>
            <p className="text-[#434843] leading-relaxed">
              CALMA is designed with privacy as a foundational principle.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#434843]">
              <li><strong>No User Accounts:</strong> You do not need an account, email address, or password to use CALMA.</li>
              <li><strong>Browser-Only Storage:</strong> Any reflection journal notes or tool preferences remain entirely inside your device's web browser local memory.</li>
              <li><strong>No Remote Data Sync:</strong> We do not transmit, collect, sell, or store your personal reflection entries or health data on any remote database or third-party server.</li>
              <li><strong>No Tracking Cookies:</strong> No behavioral or advertising tracking pixels are embedded in this application.</li>
            </ul>
            <div className="p-4 rounded-xl bg-[#f4f3f1] border border-[#e3e2e0] text-sm text-[#434843]">
              Your reflections stay safely in this browser on this device.
            </div>
          </div>
        );

      case 'disclaimer':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#334537]">
              <AlertTriangle className="w-6 h-6 text-[#ba1a1a]" />
              <h3 className="font-serif text-2xl font-medium">Medical & Educational Disclaimer</h3>
            </div>
            <p className="text-[#434843] leading-relaxed">
              CALMA provides general educational and wellbeing information designed to support personal understanding of anxiety and stress.
            </p>
            <div className="p-4 rounded-xl bg-[#ffdad6]/40 border border-[#ffdad6] text-[#93000a] text-sm space-y-2">
              <p className="font-semibold">CALMA does not diagnose conditions or replace professional healthcare.</p>
              <p>
                The information, exercises, and self-reflection tools provided on CALMA should not be used for medical diagnosis, clinical treatment, or psychiatric care.
              </p>
            </div>
            <p className="text-[#434843] text-sm leading-relaxed">
              If you are experiencing persistent distress, severe anxiety, or symptoms that interfere with your daily function, please consult a qualified healthcare professional, primary care physician, or licensed therapist.
            </p>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#334537]">
              <Info className="w-6 h-6" />
              <h3 className="font-serif text-2xl font-medium">About CALMA</h3>
            </div>
            <p className="text-[#434843] leading-relaxed">
              CALMA was built on the philosophy of <strong>Restorative Minimalism</strong> — the idea that technology should offer quiet focus, breathing room, and human warmth rather than visual noise and constant notifications.
            </p>
            <p className="text-[#434843] leading-relaxed">
              Our goal is to help you understand anxiety without clinical jargon, build gentle coping habits, and feel empowered to take the next step toward better mental wellbeing — without judgment or pressure.
            </p>
          </div>
        );

      case 'topics':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#334537]">
              <List className="w-6 h-6" />
              <h3 className="font-serif text-2xl font-medium">Explore Topics</h3>
            </div>
            <p className="text-[#434843] text-sm">
              Select a wellbeing topic to filter resources:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { name: 'UNDERSTAND', label: 'Understanding Anxiety', desc: 'Mechanics of worry & body response' },
                { name: 'PRACTICAL TOOLS', label: 'Practical Tools', desc: 'Breathing, grounding & worry journal' },
                { name: 'DAILY WELLBEING', label: 'Daily Wellbeing', desc: 'Sleep, routines & body movement' },
                { name: 'GETTING SUPPORT', label: 'Getting Support', desc: 'Professional care & helping loved ones' },
              ].map((topic) => (
                <button
                  key={topic.name}
                  onClick={() => {
                    if (onSelectTopic) onSelectTopic(topic.name);
                    onClose();
                  }}
                  className="p-4 rounded-xl text-left bg-[#f4f3f1] hover:bg-[#e3e2e0] border border-[#e5e2d9] transition-all group"
                >
                  <div className="font-semibold text-[#334537] group-hover:text-[#0e1f13]">
                    {topic.label}
                  </div>
                  <div className="text-xs text-[#434843] mt-1">{topic.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'emergency':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#ba1a1a]">
              <HeartPulse className="w-6 h-6" />
              <h3 className="font-serif text-2xl font-medium">Urgent Support & Safety Information</h3>
            </div>
            <div className="p-4 rounded-xl bg-[#ffdad6]/50 border border-[#ba1a1a]/30 text-[#93000a] space-y-2">
              <p className="font-semibold text-base">
                If you are in immediate danger or think you may hurt yourself or someone else:
              </p>
              <p className="text-sm leading-relaxed">
                Please seek urgent help through your local emergency services (e.g. 911 in US/Canada, 999 in UK, 112 in Europe, 000 in Australia) or contact an official crisis line in your country immediately.
              </p>
            </div>
            <p className="text-[#434843] text-sm leading-relaxed">
              CALMA is an educational self-help tool and is not equipped to provide emergency crisis management or suicide prevention support. You are important, and compassionate help is available 24/7 through crisis helplines worldwide.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-lg bg-[#faf9f6] rounded-2xl p-6 md:p-8 border border-[#e3e2e0] shadow-xl overflow-hidden focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#434843] hover:bg-[#e3e2e0] hover:text-[#1a1c1a] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>
        {renderContent()}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#334537] text-white text-sm font-medium hover:bg-[#394b3d] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
