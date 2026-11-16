import React, { useState } from 'react';
import { BAGGAGE_ITEMS } from '../../data/figmaPassportData';
import { X, Luggage, Check, Trash2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface BaggageDeclarationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBaggageReleased?: (releasedCount: number) => void;
}

export const BaggageDeclarationModal: React.FC<BaggageDeclarationModalProps> = ({
  isOpen,
  onClose,
  onBaggageReleased,
}) => {
  const [selectedBaggage, setSelectedBaggage] = useState<string[]>(['b1', 'b3', 'b5']);
  const [released, setReleased] = useState<boolean>(false);

  if (!isOpen) return null;

  const toggleBaggage = (id: string) => {
    sound.playChime();
    setSelectedBaggage((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRelease = () => {
    sound.playTibetanBowl();
    sound.playChime();
    setReleased(true);
    if (onBaggageReleased) onBaggageReleased(selectedBaggage.length);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto bg-gradient-to-b from-[#2B1B10] via-[#1B1008] to-[#0F0804] border-2 border-amber-600/40 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-amber-50 space-y-4 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-600/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-600/20 flex items-center justify-center text-amber-400">
              <Luggage className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold block uppercase">
                BAGGAGE DECLARATION
              </span>
              <span className="text-xs font-serif text-amber-200/80">
                CUSTOMS & CARGO INSPECTION
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
            INNER CARGO DECLARATION
          </span>
          <h2 className="text-2xl font-bold font-hindi text-amber-100">
            अंदर का सामान पहचानें।
          </h2>
          <p className="text-xs font-serif text-amber-300/80">
            हर यात्री सामान लेकर चलता है। इस यात्रा में केवल वही सामान साथ ले जाएं जो हल्का बनाए।
          </p>
        </div>

        {/* Quote banner */}
        <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-500/30 text-xs font-hindi text-amber-200/90 leading-relaxed text-center font-medium italic">
          "हर पुरानी चीज़ आपकी पहचान नहीं होती। बोझ छोड़ें, राजाई बनें।"
        </div>

        {/* Invisible Baggage Checklist */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-wider uppercase text-amber-300 font-bold block">
            मेरा INVISIBLE BAGGAGE (पहचानें क्या भारी बना रहा है)
          </span>

          <div className="grid grid-cols-2 gap-2">
            {BAGGAGE_ITEMS.map((item) => {
              const isSelected = selectedBaggage.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleBaggage(item.id)}
                  className={`cursor-pointer p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-amber-600/20 border-amber-400 text-amber-100 shadow-sm'
                      : 'bg-black/30 border-white/5 text-amber-200/60'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold font-hindi text-amber-100">
                      {item.label}
                    </div>
                    <div className="text-[10px] font-hindi text-amber-300/60 line-clamp-1">
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleRelease}
            disabled={released}
            className={`w-full py-4 px-6 rounded-2xl font-bold font-serif text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 ${
              released
                ? 'bg-emerald-600/30 border border-emerald-400/50 text-emerald-200'
                : 'bg-gradient-to-r from-amber-600 via-amber-500 to-rose-600 text-maroon-950 hover:brightness-110 active:scale-[0.98]'
            }`}
          >
            {released ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>बोझ मुक्त हुआ · स्थिति हल्की!</span>
              </>
            ) : (
              <>
                <span>Choose what to release ({selectedBaggage.length} Items)</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
