import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { Crown, ShieldAlert, Volume2, Sparkles, Moon, Sun, Type } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  profile: UserProfile;
  onOpenPassport: () => void;
  onOpenRescuePass: () => void;
  onToggleTheme?: () => void;
  onToggleFontScale?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenPassport,
  onOpenRescuePass,
  onToggleTheme,
  onToggleFontScale,
}) => {
  const handlePlayBell = () => {
    sound.playTibetanBowl();
  };

  return (
    <header className="sticky top-0 z-30 bg-[#160614]/90 dark:bg-[#0A0208]/95 backdrop-blur-xl border-b border-amber-500/30 px-3 py-2 transition-colors shadow-lg shadow-black/40">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand identity: Crown Emblem & Title */}
        <div
          onClick={onOpenPassport}
          className="flex items-center gap-2 cursor-pointer group"
        >
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover border border-amber-400 shadow-sm group-hover:ring-2 group-hover:ring-amber-300 transition-all"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-600 to-amber-300 p-0.5 shadow-sm">
              <div className="w-full h-full rounded-full bg-[#180514] flex items-center justify-center">
                <Crown className="w-4 h-4 text-amber-300" />
              </div>
            </div>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif font-black tracking-widest text-xs sm:text-sm text-amber-200 leading-none">
                ROYAL PASSPORT
              </h1>
              <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-semibold border border-amber-400/40">
                स्वराज्य
              </span>
            </div>
            <p className="text-[10px] text-amber-300/70 font-hindi">
              राजाई स्वराज्य पासपोर्ट • संगमयुग
            </p>
          </div>
        </div>

        {/* Action icons & controls */}
        <div className="flex items-center gap-1.5">
          {/* Quick Rescue Pass Shield button */}
          <button
            onClick={onOpenRescuePass}
            title="Rajai Rescue Pass (तत्काल सहायता)"
            className="px-2.5 py-1 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-xl text-[11px] font-hindi font-bold shadow-md shadow-rose-950/40 flex items-center gap-1 transition-all transform active:scale-95"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-200 animate-pulse" />
            <span>रेस्क्यू</span>
          </button>

          {/* Audio Chime Bell */}
          <button
            onClick={handlePlayBell}
            title="Mindfulness Bowl Sound (शांति नाद)"
            className="p-1.5 rounded-lg text-amber-300/80 hover:text-amber-100 hover:bg-white/10 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Font Scale toggle */}
          {onToggleFontScale && (
            <button
              onClick={onToggleFontScale}
              title="अक्षर आकार (Font Size)"
              className="p-1.5 rounded-lg text-amber-300/80 hover:text-amber-100 hover:bg-white/10 transition-colors"
            >
              <Type className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
