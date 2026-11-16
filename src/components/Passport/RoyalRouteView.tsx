import React, { useState } from 'react';
import { ROYAL_ROUTE_STEPS, RoyalRouteStep } from '../../data/figmaPassportData';
import { Crown, Sparkles, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface RoyalRouteViewProps {
  onOpenCheckpoint: (checkpointId: string) => void;
}

export const RoyalRouteView: React.FC<RoyalRouteViewProps> = ({ onOpenCheckpoint }) => {
  const [selectedStep, setSelectedStep] = useState<RoyalRouteStep | null>(ROYAL_ROUTE_STEPS[0]);

  return (
    <div className="space-y-5 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center pt-2 space-y-1">
        <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-amber-400 font-bold block">
          THE ROYAL ROUTE
        </span>
        <h1 className="text-2xl sm:text-3xl font-hindi font-bold text-amber-100">
          छह आंतरिक प्रदेश
        </h1>
        <p className="text-xs font-serif text-amber-300/80 italic">
          "Not six countries. Six states of being."
        </p>
      </div>

      {/* Sequential Route Timeline */}
      <div className="space-y-3">
        {ROYAL_ROUTE_STEPS.map((step, idx) => {
          const isSelected = selectedStep?.step === step.step;

          return (
            <div
              key={step.step}
              onClick={() => {
                sound.playChime();
                setSelectedStep(step);
              }}
              className={`cursor-pointer rounded-2xl p-4 transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-[#320D26] to-[#1E0617] border-amber-400 shadow-lg shadow-amber-500/20 scale-[1.01]'
                  : 'bg-white/[0.04] border-amber-500/20 hover:border-amber-400/50 hover:bg-white/[0.06]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold">
                  {step.step}
                </span>
                <span className="text-xs font-serif text-amber-300/70">
                  {step.nameEn}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold font-hindi text-amber-100">
                    {step.nameHi}
                  </h3>
                  <p className="text-xs font-hindi text-amber-200/80">
                    {step.tagline}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isSelected ? 'bg-amber-400 text-maroon-950 font-bold' : 'bg-white/10 text-amber-300'
                }`}>
                  →
                </div>
              </div>

              {isSelected && (
                <div className="mt-3 pt-3 border-t border-amber-500/20 text-xs font-hindi text-amber-200/90 leading-relaxed animate-fade-in">
                  <p>{step.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Action Button */}
      <div className="pt-2">
        <button
          onClick={() => {
            sound.playTibetanBowl();
            onOpenCheckpoint('cp-16'); // Source connection / आत्म-स्मृति
          }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 text-maroon-950 font-bold font-serif shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Begin with आत्म-स्मृति</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
