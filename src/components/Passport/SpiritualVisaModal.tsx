import React, { useState } from 'react';
import { VISA_COMMITMENTS } from '../../data/figmaPassportData';
import { X, FileCheck2, Check, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface SpiritualVisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVisaApproved?: () => void;
}

export const SpiritualVisaModal: React.FC<SpiritualVisaModalProps> = ({
  isOpen,
  onClose,
  onVisaApproved,
}) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [isApproved, setIsApproved] = useState<boolean>(true);

  if (!isOpen) return null;

  const toggleCommitment = (idx: number) => {
    sound.playChime();
    setCheckedItems((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleConfirm = () => {
    sound.playTibetanBowl();
    sound.playChime();
    setIsApproved(true);
    if (onVisaApproved) onVisaApproved();
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto bg-gradient-to-b from-[#1E251E] via-[#121A13] to-[#0A100B] border-2 border-emerald-500/40 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-amber-50 space-y-4 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold block uppercase">
                YOUR FIRST VISA
              </span>
              <span className="text-xs font-serif text-emerald-200/80">
                MY SPIRITUAL VISA
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-300/70 hover:text-emerald-100 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-emerald-400 font-bold block">
            SELF ENTRY PERMIT
          </span>
          <h2 className="text-2xl font-bold font-hindi text-emerald-100">
            स्वयं को देखने की अनुमति।
          </h2>
          <p className="text-xs font-serif text-emerald-300/80">
            हर यात्रा के लिए कुछ अनुमति चाहिए।
          </p>
        </div>

        {/* Visa Banner */}
        <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-400/30 text-xs font-hindi text-emerald-200/90 leading-relaxed text-center font-medium">
          "बिना excuses। बिना दूसरों को दोष दिए। बिना स्वयं को दोषी बनाए।"
        </div>

        {/* Commitments Checklist */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-300 font-bold block">
            मेरा SPIRITUAL VISA (प्रतिबद्धताएं)
          </span>

          <div className="space-y-1.5">
            {VISA_COMMITMENTS.map((text, idx) => {
              const isChecked = checkedItems.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleCommitment(idx)}
                  className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center gap-3 ${
                    isChecked
                      ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-100'
                      : 'bg-black/30 border-white/5 text-emerald-200/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                    isChecked ? 'bg-emerald-500 text-black' : 'border border-emerald-400/40'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-hindi font-medium leading-snug">
                    {text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 space-y-2">
          <button
            onClick={handleConfirm}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-black font-bold font-serif shadow-lg shadow-emerald-500/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>मैं इस यात्रा के लिए तैयार हूँ (Visa Approved)</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-center text-[10px] text-emerald-300/60 italic">
            Your commitment is an invitation, not a judgment.
          </p>
        </div>

      </div>
    </div>
  );
};
