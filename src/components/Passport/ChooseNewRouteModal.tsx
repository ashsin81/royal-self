import React from 'react';
import { ROUTE_SHIFTS } from '../../data/figmaPassportData';
import { X, Repeat, HelpCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ChooseNewRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChooseNewRouteModal: React.FC<ChooseNewRouteModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto bg-gradient-to-b from-[#131E2A] via-[#0A131C] to-[#04090E] border-2 border-blue-500/40 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-amber-50 space-y-4 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Repeat className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold block uppercase">
                FINAL IMMIGRATION
              </span>
              <span className="text-xs font-serif text-blue-200/80">
                CHOOSE A NEW ROUTE
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-blue-300/70 hover:text-blue-100 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-blue-400 font-bold block">
            CONSCIOUS SHIFT
          </span>
          <h2 className="text-2xl font-bold font-hindi text-blue-100">
            पुराना मार्ग → राजाई मार्ग
          </h2>
          <p className="text-xs font-serif text-blue-300/80 italic">
            "A new route begins with one conscious choice."
          </p>
        </div>

        {/* Matrix Header */}
        <div className="grid grid-cols-2 text-center text-[10px] font-mono uppercase tracking-widest font-bold py-1 border-b border-blue-500/20">
          <span className="text-rose-400">OLD ROUTE (व्यर्थ)</span>
          <span className="text-emerald-400">NEW ROUTE (राजाई)</span>
        </div>

        {/* Side-by-side Shift Items */}
        <div className="space-y-2">
          {ROUTE_SHIFTS.map((shift, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-black/40 border border-blue-500/20 grid grid-cols-2 gap-2 text-xs font-hindi items-center"
            >
              <div className="text-rose-200/80 border-r border-white/10 pr-2">
                {shift.from}
              </div>
              <div className="text-emerald-300 font-bold pl-1 flex items-center justify-between">
                <span>{shift.to}</span>
                <span className="text-emerald-400 font-mono text-[10px]">✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Banner */}
        <div className="p-3.5 rounded-2xl bg-blue-950/60 border border-blue-400/30 text-xs font-hindi text-blue-200/90 leading-relaxed text-center font-medium">
          "स्वराज्य बाहर की विजय नहीं, अंदर की महारत है।"
        </div>

        {/* Baba se poochhein query */}
        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-300 font-bold uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            बाबा से पूछें…
          </div>
          <p className="text-xs font-hindi text-purple-200 italic font-medium">
            "क्या मेरी यात्रा अब परिस्थिति से चल रही है या स्वराज्य से?"
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <button
            onClick={() => {
              sound.playTibetanBowl();
              onClose();
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white font-bold font-serif shadow-lg shadow-blue-500/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Choose my new route</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
