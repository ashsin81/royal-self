import React, { useState } from 'react';
import { FIGMA_STAMPS, FigmaStamp } from '../../data/figmaPassportData';
import { Award, Sparkles, CheckCircle2, Lock, HelpCircle, X, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StampsViewProps {
  unlockedStampIds: string[];
  onUnlockStamp: (stampId: string) => void;
}

export const StampsView: React.FC<StampsViewProps> = ({
  unlockedStampIds,
  onUnlockStamp,
}) => {
  const [selectedStamp, setSelectedStamp] = useState<FigmaStamp | null>(null);

  const handleActivateStamp = (stamp: FigmaStamp) => {
    sound.playTibetanBowl();
    sound.playChime();
    onUnlockStamp(stamp.id);
  };

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center pt-2 space-y-1">
        <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-amber-400 font-bold block">
          ROYAL STAMP COLLECTION
        </span>
        <h1 className="text-2xl sm:text-3xl font-hindi font-bold text-amber-100">
          जीए हुए संस्कार
        </h1>
        <p className="text-xs font-serif text-amber-300/80 italic">
          "A stamp means 'I lived it', not 'I read it'."
        </p>
      </div>

      {/* Progress Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-[#23091F]/80 to-purple-950/60 border border-amber-500/30 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-xs font-serif font-bold text-amber-100">
            Your collection begins here
          </div>
          <p className="text-[11px] font-hindi text-amber-300/70">
            Practise a quality, then add your stamp.
          </p>
        </div>
        <div className="text-right">
          <div className="text-xl font-mono font-bold text-amber-400">
            {unlockedStampIds.length} / {FIGMA_STAMPS.length}
          </div>
          <div className="text-[9px] font-mono text-amber-300/60 uppercase">
            ACTIVATED
          </div>
        </div>
      </div>

      {/* Grid of 13 Stamps */}
      <div className="grid grid-cols-2 gap-3">
        {FIGMA_STAMPS.map((stamp) => {
          const isUnlocked = unlockedStampIds.includes(stamp.id);

          return (
            <div
              key={stamp.id}
              onClick={() => {
                sound.playChime();
                setSelectedStamp(stamp);
              }}
              className={`cursor-pointer rounded-2xl p-4 transition-all relative overflow-hidden border flex flex-col justify-between min-h-[145px] ${
                isUnlocked
                  ? 'bg-gradient-to-b from-[#2B0E23] to-[#160514] border-amber-400/70 shadow-lg shadow-amber-500/20'
                  : 'bg-white/[0.03] border-white/10 hover:border-amber-400/40 opacity-80'
              }`}
            >
              {/* Top Row: Quality Number & Lock/Active Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold">
                  {stamp.number}
                </span>
                {isUnlocked ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-amber-300/40">
                    <Lock className="w-3 h-3" />
                  </span>
                )}
              </div>

              {/* Ornate Stamp Center Seal */}
              <div className="my-2 text-center">
                <div className="text-2xl mb-1 filter drop-shadow-md">
                  {stamp.icon}
                </div>
                <h3 className="text-base font-bold font-hindi text-amber-100">
                  {stamp.nameHi}
                </h3>
                <span className="text-[10px] font-serif text-amber-300/60 block">
                  {stamp.nameEn}
                </span>
              </div>

              {/* Bottom Status text */}
              <div className="text-center pt-1 border-t border-amber-500/10">
                <span className={`text-[9px] font-hindi ${
                  isUnlocked ? 'text-emerald-300 font-semibold' : 'text-amber-300/50'
                }`}>
                  {isUnlocked ? 'संस्कार सक्रिय ✓' : 'Practise to activate'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Baba se poochhein query */}
      <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-1">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-300 font-bold uppercase">
          <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          बाबा से पूछें…
        </div>
        <p className="text-xs font-hindi text-purple-200 italic font-medium leading-relaxed">
          "बाबा, इनमें से कौन-सा संस्कार मुझे और पक्का करना है?"
        </p>
      </div>

      {/* Detail Modal for Selected Stamp */}
      {selectedStamp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm bg-gradient-to-b from-[#280B21] via-[#1A0515] to-[#0E020C] border-2 border-amber-400/50 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <button
              onClick={() => setSelectedStamp(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-amber-300/70 hover:text-amber-100 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Stamp Seal Graphic */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-amber-300 p-1 shadow-lg flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#1A0515] border border-amber-300/40 flex flex-col items-center justify-center text-center">
                <span className="text-2xl">{selectedStamp.icon}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold tracking-widest block uppercase">
                {selectedStamp.code}
              </span>
              <h2 className="text-2xl font-bold font-hindi text-amber-100">
                {selectedStamp.nameHi} ({selectedStamp.nameEn})
              </h2>
              <p className="text-xs font-hindi text-amber-300/80">
                {selectedStamp.description}
              </p>
            </div>

            {/* Affirmation Box */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-amber-400/30 text-xs font-hindi text-amber-100 font-medium leading-relaxed">
              "{selectedStamp.affirmation}"
            </div>

            {/* Button */}
            {unlockedStampIds.includes(selectedStamp.id) ? (
              <div className="py-3 px-4 rounded-xl bg-emerald-600/20 border border-emerald-400/40 text-emerald-200 text-xs font-serif font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>संस्कार सील सक्रिय है (Activated)</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleActivateStamp(selectedStamp);
                  setSelectedStamp(null);
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 text-maroon-950 font-bold font-serif shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>जीकर संस्कार सक्रिय करें (Activate Stamp)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
