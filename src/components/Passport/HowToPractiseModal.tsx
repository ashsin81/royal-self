import React from 'react';
import { HOW_TO_PRACTISE_STEPS } from '../../data/figmaPassportData';
import { X, BookOpen, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface HowToPractiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToCheckpoints: () => void;
}

export const HowToPractiseModal: React.FC<HowToPractiseModalProps> = ({
  isOpen,
  onClose,
  onGoToCheckpoints,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto bg-gradient-to-b from-[#1E122A] via-[#140B1E] to-[#0A0510] border-2 border-indigo-500/40 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-amber-50 space-y-4 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-bold block uppercase">
                PRACTICAL GUIDE
              </span>
              <span className="text-xs font-serif text-indigo-200/80">
                HOW TO USE THIS PASSPORT
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-indigo-300/70 hover:text-indigo-100 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-indigo-400 font-bold block">
            HOW TO PRACTISE
          </span>
          <h2 className="text-2xl font-bold font-hindi text-indigo-100">
            परिस्थिति आई?
          </h2>
          <p className="text-xs font-serif text-indigo-300/80 italic">
            "See it. Remember it. Practise it. Live it. Become it."
          </p>
        </div>

        {/* 7 Practical Steps */}
        <div className="space-y-2">
          {HOW_TO_PRACTISE_STEPS.map((st) => (
            <div
              key={st.num}
              className="p-3 rounded-xl bg-black/40 border border-indigo-500/20 flex items-start gap-3"
            >
              <span className="w-7 h-7 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                {st.num}
              </span>
              <div className="space-y-0.5">
                <div className="text-xs font-bold font-hindi text-indigo-100">
                  {st.title}
                </div>
                <div className="text-[11px] font-hindi text-indigo-200/70">
                  {st.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Note */}
        <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-400/30 text-xs font-hindi text-amber-200/90 leading-relaxed text-center font-medium">
          "STAMP का अर्थ 'मैंने पढ़ लिया' नहीं है। STAMP का अर्थ है 'मैंने इसे जी लिया'।"
        </div>

        {/* Baba se poochhein query */}
        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-300 font-bold uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            बाबा से पूछें…
          </div>
          <p className="text-xs font-hindi text-purple-200 italic font-medium">
            "बाबा, आज मेरे पुरुषार्थ की सबसे बड़ी आवश्यकता क्या है?"
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <button
            onClick={() => {
              sound.playTibetanBowl();
              onClose();
              onGoToCheckpoints();
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-rose-600 text-white font-bold font-serif shadow-lg shadow-indigo-500/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Checkpoints</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
