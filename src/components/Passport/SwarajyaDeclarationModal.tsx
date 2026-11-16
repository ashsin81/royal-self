import React, { useState } from 'react';
import { SWARAJYA_DECLARATIONS } from '../../data/figmaPassportData';
import { X, Crown, Check, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface SwarajyaDeclarationModalProps {
  isOpen: boolean;
  onClose: () => void;
  signatureName: string;
  onSaveSignature: (name: string, date: string) => void;
}

export const SwarajyaDeclarationModal: React.FC<SwarajyaDeclarationModalProps> = ({
  isOpen,
  onClose,
  signatureName,
  onSaveSignature,
}) => {
  const [name, setName] = useState<string>(signatureName || 'मैं आत्मा (Soul)');
  const [date, setDate] = useState<string>(new Date().toLocaleDateString('en-GB'));
  const [isAffirmed, setIsAffirmed] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAffirm = () => {
    sound.playTibetanBowl();
    sound.playChime();
    setIsAffirmed(true);
    onSaveSignature(name, date);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto bg-gradient-to-b from-[#2B0E1F] via-[#1B0616] to-[#0D020B] border-2 border-amber-400/50 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-amber-50 space-y-4 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold block uppercase">
                SWARAJYA DECLARATION
              </span>
              <span className="text-xs font-serif text-amber-200/80">
                A COMMITMENT TO HIGHER SELF
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-amber-300/70 hover:text-amber-100 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-amber-400 font-bold block">
            ROYAL OATH
          </span>
          <h2 className="text-2xl font-bold font-hindi text-amber-100">
            स्वराज्य घोषणा-पत्र
          </h2>
          <p className="text-xs font-serif text-amber-300/80 italic">
            "A commitment to my higher self."
          </p>
        </div>

        {/* 10 Declarations */}
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-amber-500/20 space-y-2">
          {SWARAJYA_DECLARATIONS.map((decl, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs font-hindi text-amber-100">
              <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                ✓
              </span>
              <span className="leading-snug">{decl}</span>
            </div>
          ))}
        </div>

        {/* Final Oath Affirmation */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-400/30 text-center">
          <p className="text-xs font-hindi text-amber-200 font-semibold leading-relaxed">
            "मैं हर पल इसी स्वराज्य अधिकारी स्थिति में स्थित रहने का दृढ़ संकल्प करता हूँ।"
          </p>
        </div>

        {/* Signature & Date Inputs */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-black/40 border border-amber-500/20 text-xs font-hindi">
          <div className="space-y-1">
            <label className="text-[9px] font-mono tracking-wider uppercase text-amber-400 font-bold block">
              हस्ताक्षर · SIGNATURE
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="अपना नाम लिखें"
              className="w-full px-2.5 py-1.5 rounded-xl bg-black/60 border border-amber-400/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-mono tracking-wider uppercase text-amber-400 font-bold block">
              दिनांक · DATE
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-black/60 border border-amber-400/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <button
            onClick={handleAffirm}
            disabled={isAffirmed}
            className={`w-full py-4 px-6 rounded-2xl font-bold font-serif text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 ${
              isAffirmed
                ? 'bg-emerald-600/30 border border-emerald-400/50 text-emerald-200'
                : 'bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 text-maroon-950 hover:brightness-110 active:scale-[0.98]'
            }`}
          >
            {isAffirmed ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>प्रतिज्ञा स्वीकार व सील की गई!</span>
              </>
            ) : (
              <>
                <span>Affirm my commitment</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
