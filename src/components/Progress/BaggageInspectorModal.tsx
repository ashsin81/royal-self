import React, { useState } from 'react';
import { BaggageItem } from '../../types';
import { Briefcase, CheckCircle2, Feather, Sparkles, X } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface BaggageInspectorModalProps {
  baggage: BaggageItem[];
  onToggleRelease: (id: string) => void;
  onClose: () => void;
}

export const BaggageInspectorModal: React.FC<BaggageInspectorModalProps> = ({
  baggage,
  onToggleRelease,
  onClose,
}) => {
  const [activeItem, setActiveItem] = useState<BaggageItem | null>(null);

  const releasedCount = baggage.filter((b) => b.isReleased).length;

  const handleRelease = (item: BaggageItem) => {
    sound.playTibetanBowl();
    if (!item.isReleased) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    onToggleRelease(item.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-ivory-100 border-2 border-gold-300 rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-royal-lg text-spiritual-dark relative my-auto animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-spiritual-muted hover:text-maroon-800 rounded-full bg-white/80"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-10 h-10 rounded-full bg-maroon-700 text-gold-300 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold block">
              BAGGAGE DECLARATION • आंतरिक सामान जाँच
            </span>
            <h3 className="text-lg font-bold text-maroon-900 font-hindi">
              मेरा Invisible Baggage (अदृश्य बोझ)
            </h3>
          </div>
        </div>

        {/* Quote from PDF Page 5 */}
        <div className="p-3 bg-white rounded-xl border border-gold-200 text-xs font-hindi text-spiritual-dark space-y-1 mb-3">
          <p className="italic text-maroon-900 font-semibold">
            "हर यात्री सामान लेकर चलता है। इस यात्रा में suitcase बाहर नहीं — अंदर है।"
          </p>
          <p className="text-[11px] text-spiritual-muted">
            कुछ चीज़ें रास्ते में छोड़नी पड़ेंगी। याद रखें: <strong className="text-maroon-800">"हर पुरानी चीज़ आपकी पहचान नहीं होती।"</strong>
          </p>
        </div>

        {/* Baggage Counter */}
        <div className="flex justify-between items-center text-xs font-serif font-bold text-maroon-800 mb-2 px-1">
          <span>आंतरिक भार मुक्त:</span>
          <span className="text-emerald-700">{releasedCount} / {baggage.length} विसर्जित</span>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1 mb-4">
          {baggage.map((item) => (
            <div
              key={item.id}
              onClick={() => handleRelease(item)}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                item.isReleased
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 opacity-90'
                  : 'bg-white border-gold-200 text-spiritual-dark hover:bg-gold-50/50'
              }`}
            >
              <div className="min-w-0 pr-1">
                <span className={`text-xs font-hindi font-bold block ${item.isReleased ? 'line-through text-spiritual-muted' : ''}`}>
                  {item.nameHi}
                </span>
                <span className="text-[10px] text-spiritual-muted block mt-0.5 font-hindi">
                  {item.spiritualAntidote}
                </span>
              </div>
              <div className="mt-0.5 flex-shrink-0">
                {item.isReleased ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Feather className="w-4 h-4 text-gold-400" />
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md font-hindi"
        >
          हल्के मन से यात्रा जारी रखें (Close)
        </button>
      </div>
    </div>
  );
};
