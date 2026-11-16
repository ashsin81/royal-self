import React from 'react';
import { LifeBuoy, ArrowRight, Flame, Wind, HeartCrack, Scale, Frown } from 'lucide-react';
import { sound } from '../../utils/audio';

interface RescueQuickAccessProps {
  onSelectSituation: (situationId: string) => void;
  onOpenRescueTab: () => void;
}

export const RescueQuickAccess: React.FC<RescueQuickAccessProps> = ({
  onSelectSituation,
  onOpenRescueTab,
}) => {
  const quickList = [
    { id: 'anger', labelHi: 'मुझे क्रोध आ रहा है', icon: Flame, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { id: 'overthinking', labelHi: 'मन बहुत व्यर्थ चल रहा है', icon: Wind, color: 'text-sky-700 bg-sky-50 border-sky-200' },
    { id: 'hurt-feelings', labelHi: 'किसी की बात बुरी लगी', icon: HeartCrack, color: 'text-rose-700 bg-rose-50 border-rose-200' },
    { id: 'comparison', labelHi: 'मैं तुलना कर रहा/रही हूँ', icon: Scale, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
    { id: 'disappointment', labelHi: 'मैं निराश महसूस कर रहा/रही हूँ', icon: Frown, color: 'text-stone-700 bg-stone-50 border-stone-200' },
  ];

  const handleClick = (id: string) => {
    sound.playSoftClick();
    onSelectSituation(id);
  };

  return (
    <div className="bg-gradient-to-br from-maroon-50 via-ivory-100 to-gold-50/50 rounded-2xl p-5 border border-maroon-200/80 shadow-royal space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-serif uppercase tracking-widest text-maroon-700 font-bold flex items-center gap-1">
            <LifeBuoy className="w-3.5 h-3.5 text-maroon-700 animate-spin-slow" />
            <span>रॉयल रेस्क्यू • EMERGENCY PASS</span>
          </span>
          <h3 className="text-base font-bold text-maroon-900 font-hindi leading-snug">
            अभी अपनी स्थिति संभालें
          </h3>
          <p className="text-xs text-spiritual-muted font-hindi">
            किसी भी परिस्थिति में अपनी श्रेष्ठ स्थिति को याद करें।
          </p>
        </div>
      </div>

      {/* Quick situation pill buttons */}
      <div className="flex flex-col gap-2">
        {quickList.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`w-full py-2 px-3 rounded-xl border text-left flex items-center justify-between transition-all hover:scale-[1.01] active:scale-[0.99] shadow-2xs ${item.color}`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-semibold font-hindi text-spiritual-dark">
                  {item.labelHi}
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-spiritual-muted opacity-70" />
            </button>
          );
        })}
      </div>

      <button
        onClick={onOpenRescueTab}
        className="w-full py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold rounded-xl text-xs font-hindi flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
      >
        <LifeBuoy className="w-4 h-4 text-gold-300" />
        <span>सभी 12 परिस्थितियाँ एवं Royal Rescue खोलें</span>
      </button>
    </div>
  );
};
