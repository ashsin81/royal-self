import React, { useState } from 'react';
import { SpinReward } from '../../types';
import { SPIN_WHEEL_ITEMS } from '../../data/divineContent';
import { Sparkles, RotateCw, Volume2, X, Award } from 'lucide-react';
import { sound } from '../../utils/audio';
import { tts } from '../../utils/tts';
import confetti from 'canvas-confetti';

interface DivineSpinWheelProps {
  onRewardWon: (reward: SpinReward) => void;
  savedReward: SpinReward | null;
  onClose?: () => void;
}

export const DivineSpinWheel: React.FC<DivineSpinWheelProps> = ({
  onRewardWon,
  savedReward,
  onClose,
}) => {
  const [spinning, setSpinning] = useState<boolean>(false);
  const [currentRotation, setCurrentRotation] = useState<number>(0);
  const [revealedReward, setRevealedReward] = useState<SpinReward | null>(savedReward);

  const numSegments = SPIN_WHEEL_ITEMS.length;
  const anglePerSegment = 360 / numSegments;

  const handleSpin = () => {
    if (spinning) return;
    sound.playTibetanBowl();
    setSpinning(true);
    setRevealedReward(null);

    // Pick random target
    const randomIndex = Math.floor(Math.random() * numSegments);
    const targetItem = SPIN_WHEEL_ITEMS[randomIndex];

    // Extra full spins (5-8 spins) + landing angle
    const extraSpins = (5 + Math.floor(Math.random() * 3)) * 360;
    // Align segment to top pointer (270 deg or 0 deg offset)
    const targetAngle = extraSpins + (360 - (randomIndex * anglePerSegment + anglePerSegment / 2));

    const finalRotation = currentRotation + targetAngle;
    setCurrentRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      setRevealedReward(targetItem);
      onRewardWon(targetItem);
      sound.playStampSound();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 4200);
  };

  const handleListen = (reward: SpinReward) => {
    const text = `${reward.titleHi}। ${reward.descriptionHi}`;
    tts.toggle(text, 'hi');
  };

  return (
    <div className="bg-white/90 dark:bg-maroon-950/90 backdrop-blur-xl rounded-3xl p-5 border border-gold-300/80 shadow-royal-lg space-y-4 text-center relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-gold-400/10 via-transparent to-transparent pointer-events-none" />

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
          <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
          <span>दिव्य स्वमान व वरदान चक्र</span>
        </div>
        <h3 className="text-lg font-bold font-hindi text-maroon-900 dark:text-gold-100">
          आज का स्वमान चक्र (Divine Spin Wheel)
        </h3>
        <p className="text-[11px] text-spiritual-muted dark:text-gray-400 font-hindi">
          चक्र घुमाएं और आज के दिन के लिए परमात्मा का विशेष स्वमान या वरदान प्राप्त करें।
        </p>
      </div>

      {/* Wheel Visual Container */}
      <div className="relative w-72 h-72 mx-auto flex items-center justify-center my-2">
        {/* Top Pointer Indicator */}
        <div className="absolute -top-3 z-20 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-gold-500 filter drop-shadow-md animate-bounce" />
        </div>

        {/* Outer Golden Ring with Jewel Dots */}
        <div className="absolute inset-0 rounded-full border-4 border-gold-400/80 shadow-2xl pointer-events-none z-10">
          <div className="absolute inset-1 rounded-full border border-dashed border-gold-300/50" />
        </div>

        {/* The Rotating Wheel */}
        <div
          className="w-64 h-64 rounded-full relative overflow-hidden transition-transform duration-[4000ms] cubic-bezier(0.15, 0.9, 0.2, 1) shadow-inner"
          style={{
            transform: `rotate(${currentRotation}deg)`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {SPIN_WHEEL_ITEMS.map((item, index) => {
              const startAngle = (index * 360) / numSegments;
              const endAngle = ((index + 1) * 360) / numSegments;

              // Calculate SVG arc path
              const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
              const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
              const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
              const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

              const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

              return (
                <path
                  key={item.id}
                  d={pathData}
                  fill={item.color}
                  stroke="#DFC896"
                  strokeWidth="0.5"
                  className="transition-colors"
                />
              );
            })}
          </svg>

          {/* Segment Labels & Icons */}
          {SPIN_WHEEL_ITEMS.map((item, index) => {
            const angle = index * anglePerSegment + anglePerSegment / 2;
            return (
              <div
                key={item.id}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <div className="transform -translate-y-20 flex flex-col items-center">
                  <span className="text-sm drop-shadow">{item.icon}</span>
                  <span
                    className="text-[8px] font-bold text-white font-hindi leading-tight text-center max-w-[42px] truncate drop-shadow-md"
                    style={{ transform: 'rotate(90deg)' }}
                  >
                    {item.titleHi.split(' ')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Spin Action Button */}
        <button
          onClick={handleSpin}
          disabled={spinning}
          className="absolute z-30 w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 border-2 border-white text-maroon-950 font-bold flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform disabled:opacity-80"
        >
          <span className="text-xs">👑</span>
          <span className="text-[10px] font-serif font-black tracking-wider uppercase">
            {spinning ? 'घूम रहा' : 'घुमाएं'}
          </span>
        </button>
      </div>

      {/* Won Reward Card */}
      {revealedReward && !spinning && (
        <div className="p-4 bg-gradient-to-br from-ivory-50 to-gold-50/80 dark:from-maroon-900/60 dark:to-maroon-800/80 rounded-2xl border-2 border-gold-400 text-left space-y-2 animate-in fade-in zoom-in-95 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-gold-700 dark:text-gold-300 bg-gold-100 dark:bg-gold-950/60 px-2 py-0.5 rounded-full border border-gold-300/60 flex items-center gap-1">
              <span>{revealedReward.icon}</span>
              <span>{revealedReward.type === 'vardan' ? 'आज का वरदान' : 'आज का स्वमान'}</span>
            </span>
            <button
              onClick={() => handleListen(revealedReward)}
              className="p-1.5 rounded-full bg-white dark:bg-maroon-800 text-maroon-800 dark:text-gold-200 hover:scale-105 shadow-2xs"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <h4 className="text-base font-bold font-hindi text-maroon-900 dark:text-gold-100">
            {revealedReward.titleHi}
          </h4>

          <p className="text-xs font-hindi text-spiritual-dark dark:text-gray-200 leading-relaxed italic">
            "{revealedReward.descriptionHi}"
          </p>

          <div className="pt-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold font-hindi flex items-center gap-1">
            <Award className="w-3 h-3" />
            <span>आज दिनभर इसी श्रेष्ठ स्मृति में स्थित रहें।</span>
          </div>
        </div>
      )}

      {!revealedReward && !spinning && (
        <button
          onClick={handleSpin}
          className="w-full py-2.5 bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md font-hindi flex items-center justify-center gap-2"
        >
          <RotateCw className="w-4 h-4 text-gold-300" />
          <span>चक्र घुमाकर स्वमान प्राप्त करें</span>
        </button>
      )}
    </div>
  );
};
