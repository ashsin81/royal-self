import React, { useState } from 'react';
import {
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Crown,
  Heart,
  ChevronRight,
  Flame,
  Wind,
  ShieldCheck,
  BookOpen,
  Compass,
  FileCheck2,
  Luggage,
  HelpCircle,
  Repeat
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface TodayViewProps {
  onOpenCheckpoint: (checkpointId: string) => void;
  onOpenRescuePass: () => void;
  onOpenRoyalRoute: () => void;
  onOpenVisa: () => void;
  onOpenBaggage: () => void;
  onOpenDeclaration: () => void;
  onOpenHowToPractise: () => void;
  onOpenChooseNewRoute: () => void;
  onOpenAbout: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  onOpenCheckpoint,
  onOpenRescuePass,
  onOpenRoyalRoute,
  onOpenVisa,
  onOpenBaggage,
  onOpenDeclaration,
  onOpenHowToPractise,
  onOpenChooseNewRoute,
  onOpenAbout,
}) => {
  const [isRemembering, setIsRemembering] = useState<boolean>(false);
  const [rememberSeconds, setRememberSeconds] = useState<number>(0);

  const handleStartRemember = () => {
    sound.playTibetanBowl();
    setIsRemembering(true);
    setRememberSeconds(10);
    const interval = setInterval(() => {
      setRememberSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRemembering(false);
          sound.playChime();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="space-y-5 pb-24 max-w-md mx-auto">
      {/* Top Banner Tagline */}
      <div className="text-center pt-2 space-y-1">
        <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-amber-400 font-bold block">
          PAUSE • REMEMBER • CHOOSE
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
          Your journey within
        </h1>
        <p className="text-sm font-hindi text-amber-300/80 font-medium">
          आज एक श्रेष्ठ कर्म।
        </p>
      </div>

      {/* Card 1: Today’s Remembrance */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D0B22]/90 via-[#1C0519]/90 to-[#0F0210]/95 border border-amber-500/40 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        {/* Glowing backdrop aura */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              TODAY'S REMEMBRANCE
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-hindi">
              आत्म-स्मृति
            </span>
          </div>

          <div className="py-2">
            <h2 className="text-2xl sm:text-3xl font-hindi font-bold text-amber-100 leading-tight">
              मैं आत्मा हूँ।<br />
              <span className="text-amber-300">मैं शांति स्वरूप हूँ।</span>
            </h2>
            <p className="text-xs font-serif italic text-amber-200/70 mt-2">
              "I am a soul. Peace is my nature."
            </p>
          </div>

          <button
            onClick={handleStartRemember}
            disabled={isRemembering}
            className={`w-full py-3 px-4 rounded-xl flex items-center justify-between transition-all ${
              isRemembering
                ? 'bg-amber-500 text-maroon-950 font-bold animate-pulse'
                : 'bg-white/10 hover:bg-white/15 text-amber-200 border border-amber-400/30'
            }`}
          >
            <span className="text-xs font-medium font-hindi">
              {isRemembering ? `अनुभव करें... (${rememberSeconds}s)` : 'Take a moment to remember (10s)'}
            </span>
            <ArrowRight className={`w-4 h-4 ${isRemembering ? 'animate-bounce' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card 2: WHAT DO YOU NEED RIGHT NOW? */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-mono tracking-wider text-amber-300/80 uppercase font-bold">
            WHAT DO YOU NEED RIGHT NOW?
          </span>
          <span className="text-[10px] text-amber-400/60 font-hindi">तत्काल सहायता</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={() => onOpenCheckpoint('cp-01')}
            className="p-3 rounded-2xl bg-gradient-to-b from-rose-950/80 to-rose-900/60 border border-rose-500/40 hover:border-rose-400 text-center active:scale-95 transition-all shadow-md group"
          >
            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-300 group-hover:scale-110 transition-transform">
              <Flame className="w-4 h-4 fill-rose-500/50" />
            </div>
            <div className="text-sm font-bold font-hindi text-rose-100">क्रोध</div>
            <div className="text-[9px] text-rose-300/70">Anger Border</div>
          </button>

          <button
            onClick={() => onOpenCheckpoint('cp-02')}
            className="p-3 rounded-2xl bg-gradient-to-b from-blue-950/80 to-blue-900/60 border border-blue-500/40 hover:border-blue-400 text-center active:scale-95 transition-all shadow-md group"
          >
            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform">
              <Wind className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold font-hindi text-blue-100">मन भारी</div>
            <div className="text-[9px] text-blue-300/70">Mind Border</div>
          </button>

          <button
            onClick={() => onOpenCheckpoint('cp-10')}
            className="p-3 rounded-2xl bg-gradient-to-b from-purple-950/80 to-purple-900/60 border border-purple-500/40 hover:border-purple-400 text-center active:scale-95 transition-all shadow-md group"
          >
            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold font-hindi text-purple-100">चिंता</div>
            <div className="text-[9px] text-purple-300/70">Courage Gate</div>
          </button>
        </div>
      </div>

      {/* Card 3: Quick Rescue Pass */}
      <div
        onClick={onOpenRescuePass}
        className="cursor-pointer rounded-2xl bg-gradient-to-r from-[#3D0B1C] via-[#2A0617] to-[#1F0415] border border-rose-500/40 p-4 shadow-lg hover:border-rose-400/80 transition-all active:scale-[0.99] group flex items-center justify-between"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span className="text-sm font-serif font-bold text-rose-100">
              Pause before you react
            </span>
          </div>
          <p className="text-xs font-hindi text-rose-200/80">
            तीव्र परिस्थिति में राजाई मार्ग • Rajai Rescue Pass
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 group-hover:scale-110 transition-transform">
          <ShieldAlert className="w-5 h-5" />
        </div>
      </div>

      {/* Card 4: Your Royal Route */}
      <div className="rounded-2xl bg-[#1B0718]/80 border border-amber-500/30 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-serif font-bold text-amber-100">
              Your royal route
            </span>
          </div>
          <button
            onClick={onOpenRoyalRoute}
            className="text-xs text-amber-400 hover:text-amber-200 font-medium"
          >
            View all (6) →
          </button>
        </div>

        <div
          onClick={onOpenRoyalRoute}
          className="cursor-pointer p-3 rounded-xl bg-amber-500/10 border border-amber-400/20 hover:bg-amber-500/15 transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-mono text-amber-400 font-bold block">
              STEP 01 / 06
            </span>
            <div className="text-sm font-bold font-hindi text-amber-100">
              Awakening · आत्म-स्मृति
            </div>
            <div className="text-[11px] text-amber-300/70">
              Begin by remembering who you are
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-amber-400" />
        </div>
      </div>

      {/* Card 5: Royal Toolkit Navigation Grid */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono tracking-wider text-amber-300/80 uppercase font-bold block px-1">
          ROYAL PASSPORT TOOLS
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenVisa}
            className="p-3 rounded-xl bg-white/[0.04] border border-amber-500/20 hover:border-amber-400/50 text-left transition-all group flex items-start gap-2.5"
          >
            <FileCheck2 className="w-4 h-4 text-emerald-400 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-amber-100 font-hindi">Spiritual Visa</div>
              <div className="text-[10px] text-amber-300/60">स्वयं को देखने की अनुमति</div>
            </div>
          </button>

          <button
            onClick={onOpenBaggage}
            className="p-3 rounded-xl bg-white/[0.04] border border-amber-500/20 hover:border-amber-400/50 text-left transition-all group flex items-start gap-2.5"
          >
            <Luggage className="w-4 h-4 text-amber-400 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-amber-100 font-hindi">Baggage Declaration</div>
              <div className="text-[10px] text-amber-300/60">अंदर का सामान पहचानें</div>
            </div>
          </button>

          <button
            onClick={onOpenDeclaration}
            className="p-3 rounded-xl bg-white/[0.04] border border-amber-500/20 hover:border-amber-400/50 text-left transition-all group flex items-start gap-2.5"
          >
            <Crown className="w-4 h-4 text-rose-400 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-amber-100 font-hindi">Swarajya Declaration</div>
              <div className="text-[10px] text-amber-300/60">स्वराज्य घोषणा-पत्र</div>
            </div>
          </button>

          <button
            onClick={onOpenChooseNewRoute}
            className="p-3 rounded-xl bg-white/[0.04] border border-amber-500/20 hover:border-amber-400/50 text-left transition-all group flex items-start gap-2.5"
          >
            <Repeat className="w-4 h-4 text-blue-400 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-amber-100 font-hindi">Choose New Route</div>
              <div className="text-[10px] text-amber-300/60">पुराना मार्ग → राजाई मार्ग</div>
            </div>
          </button>

          <button
            onClick={onOpenHowToPractise}
            className="p-3 rounded-xl bg-white/[0.04] border border-amber-500/20 hover:border-amber-400/50 text-left transition-all group flex items-start gap-2.5"
          >
            <BookOpen className="w-4 h-4 text-indigo-400 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-amber-100 font-hindi">How to Practise</div>
              <div className="text-[10px] text-amber-300/60">7 व्यावहारिक कदम</div>
            </div>
          </button>

          <button
            onClick={onOpenAbout}
            className="p-3 rounded-xl bg-white/[0.04] border border-amber-500/20 hover:border-amber-400/50 text-left transition-all group flex items-start gap-2.5"
          >
            <HelpCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-amber-100 font-hindi">About the Journey</div>
              <div className="text-[10px] text-amber-300/60">स्वयं से स्वयं की यात्रा</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
