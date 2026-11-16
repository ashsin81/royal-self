import React from 'react';
import { PassportStamp } from '../../types';
import { Award, Compass, Eye, Feather, Flame, Heart, Lock, Shield, Sparkles, Sun, Zap } from 'lucide-react';

interface StampBadgeProps {
  stamp: PassportStamp;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  interactive?: boolean;
}

export const StampBadge: React.FC<StampBadgeProps> = ({
  stamp,
  size = 'md',
  onClick,
  interactive = false
}) => {
  const isUnlocked = stamp.isUnlocked;

  const renderIcon = () => {
    const iconProps = { className: size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-5 h-5' };
    switch (stamp.iconSvg) {
      case 'dove':
      case 'feather':
        return <Feather {...iconProps} />;
      case 'eye':
        return <Eye {...iconProps} />;
      case 'sparkles':
        return <Sparkles {...iconProps} />;
      case 'crown':
        return <Award {...iconProps} />;
      case 'shield':
      case 'shield-check':
        return <Shield {...iconProps} />;
      case 'sun':
        return <Sun {...iconProps} />;
      case 'flame':
        return <Flame {...iconProps} />;
      case 'heart':
        return <Heart {...iconProps} />;
      case 'zap':
        return <Zap {...iconProps} />;
      case 'compass':
      default:
        return <Compass {...iconProps} />;
    }
  };

  const sizeClasses = {
    sm: 'p-2 min-w-[100px] text-xs',
    md: 'p-3.5 min-w-[140px] text-sm',
    lg: 'p-5 min-w-[200px] text-base'
  }[size];

  if (!isUnlocked) {
    return (
      <div
        onClick={onClick}
        className={`relative border-2 border-dashed border-gray-300 rounded-xl bg-ivory-100 flex flex-col items-center justify-center text-center opacity-60 transition-all ${
          interactive ? 'hover:opacity-80 cursor-pointer' : ''
        } ${sizeClasses}`}
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mb-1.5">
          <Lock className="w-4 h-4" />
        </div>
        <span className="font-semibold text-gray-500 font-hindi leading-tight">{stamp.titleHi}</span>
        <span className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">{stamp.titleEn}</span>
        <span className="text-[9px] text-gray-400 mt-1 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">Pending</span>
      </div>
    );
  }

  // Visual variants: Round, Rectangular, or Seal
  const isMaroon = stamp.color === '#702333';
  const isGold = stamp.color === '#94723B';

  const inkBorder = isMaroon
    ? 'border-maroon-700 text-maroon-800 bg-maroon-50/70 shadow-stamp'
    : isGold
    ? 'border-gold-600 text-gold-700 bg-gold-50/70 shadow-stamp-gold'
    : 'border-spiritual-success text-spiritual-success bg-emerald-50/60 shadow-sm';

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden transition-all transform ${
        interactive ? 'hover:scale-[1.03] active:scale-[0.98] cursor-pointer' : ''
      } ${
        stamp.shape === 'round'
          ? 'rounded-full aspect-square flex flex-col items-center justify-center text-center p-3 border-4'
          : stamp.shape === 'seal'
          ? 'rounded-2xl border-2 p-3 flex flex-col items-center text-center'
          : 'rounded-xl border-2 border-double p-3 flex flex-col items-center text-center'
      } ${inkBorder} ${sizeClasses}`}
      style={{
        transform: 'rotate(-1.5deg)',
      }}
    >
      {/* Decorative seal inner ring */}
      <div className="absolute inset-1 border border-current rounded-inherit opacity-40 pointer-events-none" />

      {/* Verified Stamp Badge Header */}
      <div className="flex items-center gap-1 opacity-75 uppercase tracking-widest text-[9px] font-serif mb-0.5">
        <span>★</span>
        <span>SWARAJYA</span>
        <span>★</span>
      </div>

      <div className="my-1 text-current">{renderIcon()}</div>

      <div className="font-bold font-hindi tracking-tight text-center leading-snug">
        {stamp.titleHi}
      </div>

      <div className="text-[10px] opacity-80 font-medium tracking-wide mt-0.5 uppercase">
        {stamp.titleEn}
      </div>

      <div className="mt-1 text-[9px] px-2 py-0.5 rounded-full font-semibold bg-white/80 border border-current/30 shadow-xs">
        ✓ VERIFIED
      </div>
    </div>
  );
};
