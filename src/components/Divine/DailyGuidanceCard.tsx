import React, { useState } from 'react';
import { DailyDivineCard } from '../../types';
import { DAILY_DIVINE_CARDS } from '../../data/divineContent';
import { Sparkles, Volume2, RefreshCw, Eye, HeartHandshake, X } from 'lucide-react';
import { sound } from '../../utils/audio';
import { tts } from '../../utils/tts';

interface DailyGuidanceCardProps {
  initialCard: DailyDivineCard;
  onClose?: () => void;
}

export const DailyGuidanceCard: React.FC<DailyGuidanceCardProps> = ({ initialCard, onClose }) => {
  const [currentCard, setCurrentCard] = useState<DailyDivineCard>(initialCard);
  const [isFlipped, setIsFlipped] = useState<boolean>(true); // initially flipped to show message or user can flip
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleDrawNew = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playTibetanBowl();
    setIsAnimating(true);
    setIsFlipped(false);

    setTimeout(() => {
      const nextIndex = Math.floor(Math.random() * DAILY_DIVINE_CARDS.length);
      setCurrentCard(DAILY_DIVINE_CARDS[nextIndex]);
      setIsFlipped(true);
      setIsAnimating(false);
      sound.playStampSound();
    }, 600);
  };

  const handleListen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const speech = `${currentCard.cardTitle}। ${currentCard.babaGreeting} ${currentCard.mainMessage}। वरदान: ${currentCard.vardan}। स्लोगन: ${currentCard.slogan}।`;
    tts.toggle(speech, 'hi');
  };

  return (
    <div className="bg-white/95 dark:bg-maroon-950/95 backdrop-blur-xl rounded-3xl p-5 border border-gold-300/80 shadow-royal-lg space-y-4 text-center relative overflow-hidden">
      {/* Background celestial ambient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-ivory-100 dark:bg-maroon-900 text-spiritual-muted hover:text-maroon-800 z-10"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center justify-center gap-1.5 text-xs text-gold-600 dark:text-gold-400 font-serif uppercase tracking-widest font-bold">
          <HeartHandshake className="w-3.5 h-3.5 text-gold-500" />
          <span>बाबा का आज का ईश्वरीय सन्देश</span>
        </div>
        <h3 className="text-lg font-bold font-hindi text-maroon-900 dark:text-gold-100">
          आज का दैवीय मार्गदर्शन (Divine Guidance Card)
        </h3>
        <p className="text-[11px] text-spiritual-muted dark:text-gray-400 font-hindi">
          कार्ड पर स्पर्श करें और अपने दिल में शिव बाबा के मधुर महावाक्य समाएं।
        </p>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => {
          sound.playSoftClick();
          setIsFlipped(!isFlipped);
        }}
        className="w-full max-w-sm mx-auto h-[340px] cursor-pointer [perspective:1000px] select-none"
      >
        <div
          className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* FRONT SIDE (Sacred Back of Card) */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-950 text-gold-100 p-6 flex flex-col items-center justify-between border-2 border-gold-400 shadow-2xl [backface-visibility:hidden]">
            <div className="text-gold-400/60 text-xs font-serif tracking-widest uppercase">
              OM SHANTI • DIVINE GUIDANCE
            </div>

            <div className="w-24 h-24 rounded-full border-4 border-double border-gold-400/70 flex items-center justify-center bg-white/5 backdrop-blur-xs shadow-inner animate-pulse">
              <span className="text-4xl">🕊️</span>
            </div>

            <div className="space-y-1">
              <span className="text-sm font-bold font-hindi text-gold-200 block">
                कार्ड खोलें (Tap to Reveal)
              </span>
              <span className="text-[10px] text-gold-300/70 font-hindi">
                आज के लिए विशेष ईश्वरीय दृष्टि व संदेश
              </span>
            </div>
          </div>

          {/* BACK SIDE (Revealed Divine Message) */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-ivory-50 via-white to-gold-50/50 dark:from-maroon-900 dark:via-maroon-950 dark:to-maroon-900 text-spiritual-dark dark:text-gray-100 p-5 flex flex-col justify-between border-2 border-gold-400 shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] text-left">
            {/* Card Header */}
            <div>
              <div className="flex items-center justify-between border-b border-gold-200 dark:border-gold-800/60 pb-2 mb-2">
                <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-gold-700 dark:text-gold-300">
                  {currentCard.cardTitle}
                </span>
                <button
                  onClick={handleListen}
                  title="सन्देश सुनें"
                  className="p-1 rounded-full bg-gold-100 dark:bg-maroon-800 text-maroon-800 dark:text-gold-200 hover:scale-105"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-xs font-serif font-bold text-maroon-800 dark:text-gold-300 italic mb-1">
                "{currentCard.babaGreeting}"
              </div>

              <p className="text-xs font-hindi text-spiritual-dark dark:text-gray-200 leading-relaxed italic bg-white/70 dark:bg-maroon-950/60 p-2.5 rounded-xl border border-gold-200/80 dark:border-gold-800/40">
                {currentCard.mainMessage}
              </p>
            </div>

            {/* Vardan & Slogan */}
            <div className="space-y-1.5 pt-2 border-t border-gold-200/80 dark:border-gold-800/60 text-[11px] font-hindi">
              <div>
                <strong className="text-gold-700 dark:text-gold-400">वरदान: </strong>
                <span>{currentCard.vardan}</span>
              </div>
              <div>
                <strong className="text-maroon-800 dark:text-maroon-300">स्लोगन: </strong>
                <span>{currentCard.slogan}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] text-spiritual-muted dark:text-gray-400 font-serif">
                दृष्टि: {currentCard.drushtiQuality}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action to draw another card */}
      <button
        onClick={handleDrawNew}
        disabled={isAnimating}
        className="w-full py-2.5 bg-ivory-100 dark:bg-maroon-900 hover:bg-gold-50 dark:hover:bg-maroon-800 text-maroon-900 dark:text-gold-200 border border-gold-300 dark:border-gold-700 rounded-xl font-bold text-xs font-hindi flex items-center justify-center gap-2 transition-all"
      >
        <RefreshCw className={`w-3.5 h-3.5 text-gold-600 ${isAnimating ? 'animate-spin' : ''}`} />
        <span>नया ईश्वरीय कार्ड चुनें (Draw Another Card)</span>
      </button>
    </div>
  );
};
