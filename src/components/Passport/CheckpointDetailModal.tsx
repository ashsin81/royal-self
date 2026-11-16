import React, { useState } from 'react';
import { FigmaCheckpoint } from '../../data/figmaPassportData';
import { X, Sparkles, Check, Crown, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface CheckpointDetailModalProps {
  checkpoint: FigmaCheckpoint;
  isOpen: boolean;
  onClose: () => void;
  onUnlockStamp: (stampId: string) => void;
  isStampUnlocked?: boolean;
}

export const CheckpointDetailModal: React.FC<CheckpointDetailModalProps> = ({
  checkpoint,
  isOpen,
  onClose,
  onUnlockStamp,
  isStampUnlocked = false,
}) => {
  const [selectedActionIndex, setSelectedActionIndex] = useState<number | null>(null);
  const [hasSavedAction, setHasSavedAction] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCompleteAbhyas = () => {
    sound.playTibetanBowl();
    sound.playChime();
    setHasSavedAction(true);
    onUnlockStamp(checkpoint.stampId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto bg-gradient-to-b from-[#240A1D] via-[#1A0515] to-[#10020D] border border-amber-500/40 rounded-3xl p-5 shadow-[0_15px_45px_rgba(0,0,0,0.7)] text-amber-50 space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold">
              {String(checkpoint.number).padStart(2, '0')} / 20
            </span>
            <span className="text-[11px] font-serif uppercase tracking-wider text-amber-300/80">
              {checkpoint.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-amber-300/70 hover:text-amber-100 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="space-y-0.5">
          <h2 className="text-xl sm:text-2xl font-bold font-hindi text-amber-100">
            {checkpoint.nameHi}
          </h2>
          <p className="text-xs font-serif text-amber-300/80 font-medium">
            {checkpoint.nameEn}
          </p>
        </div>

        {/* 01 स्थिति (Situation) */}
        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-amber-500/20 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            01 स्थिति (SITUATION)
          </div>
          <p className="text-sm font-hindi text-amber-100 font-medium leading-relaxed">
            {checkpoint.situation}
          </p>
        </div>

        {/* 02 बाबा की दिशा (Baba's Spiritual Direction) */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-amber-900/40 to-rose-950/60 border border-amber-400/40 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            02 बाबा की दिशा (BABA'S DIRECTION)
          </div>
          <p className="text-sm font-hindi text-amber-100 font-semibold leading-relaxed">
            "{checkpoint.babaDirection}"
          </p>
        </div>

        {/* 03 राजाई अभ्यास (Royal Practice Steps) */}
        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-amber-500/20 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            03 राजाई अभ्यास (RAJAI PRACTICE)
          </div>
          <div className="space-y-1.5">
            {checkpoint.abhyas.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-hindi text-amber-200/90">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span className="leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* मेरी श्रेष्ठ क्रिया (Selectable Elevated Actions) */}
        {checkpoint.bestActions.length > 0 && (
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/80 font-bold block">
              मेरी श्रेष्ठ क्रिया (CHOOSE YOUR ACTION)
            </span>
            <div className="space-y-1.5">
              {checkpoint.bestActions.map((action, idx) => {
                const isSelected = selectedActionIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playChime();
                      setSelectedActionIndex(idx);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-hindi transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border border-amber-400 text-amber-100 font-bold shadow-xs'
                        : 'bg-black/30 hover:bg-black/50 border border-white/5 text-amber-200/80'
                    }`}
                  >
                    <span>{action}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* बाबा से पूछें… (Inner Inquiry) */}
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-mono text-purple-300 font-bold uppercase">
            <HelpCircle className="w-3 h-3 text-purple-400" />
            बाबा से पूछें…
          </div>
          <p className="text-xs font-hindi text-purple-200 italic font-medium">
            "{checkpoint.askBaba}"
          </p>
        </div>

        {/* Action Button: Add Stamp */}
        <div className="pt-2 space-y-2">
          <button
            onClick={handleCompleteAbhyas}
            disabled={hasSavedAction || isStampUnlocked}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold font-serif text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 ${
              hasSavedAction || isStampUnlocked
                ? 'bg-emerald-600/30 border border-emerald-400/50 text-emerald-200 cursor-default'
                : 'bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 text-maroon-950 shadow-amber-500/30 hover:brightness-110 active:scale-[0.98]'
            }`}
          >
            {hasSavedAction || isStampUnlocked ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>अभ्यास पूर्ण · Stamp Unlocked!</span>
              </>
            ) : (
              <>
                <span>मैंने अभ्यास किया · Add stamp</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-amber-300/50 italic">
            {checkpoint.stampCultivate}
          </p>
        </div>

      </div>
    </div>
  );
};
