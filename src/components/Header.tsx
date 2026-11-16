import React from 'react';
import { UserProfile } from '../types';
import { Volume2, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  profile: UserProfile;
  onOpenProfile: () => void;
  onLanguageChange: (lang: 'hi' | 'en' | 'hinglish') => void;
}

export const Header: React.FC<HeaderProps> = ({ profile, onOpenProfile, onLanguageChange }) => {
  const handlePlayBell = () => {
    sound.playTibetanBowl();
  };

  return (
    <header className="sticky top-0 z-30 bg-ivory-200/90 backdrop-blur-md border-b border-gold-200/80 px-4 py-2.5">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-maroon-700 via-maroon-800 to-maroon-900 border border-gold-300 flex items-center justify-center shadow-sm">
            <span className="text-lg" role="img" aria-label="Royal Crown">👑</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif font-black tracking-widest text-sm text-maroon-800 leading-none">
                ROYAL SELF
              </h1>
              <span className="text-[10px] bg-gold-100 text-gold-700 px-1.5 py-0.2 rounded font-semibold border border-gold-300/60">
                स्वराज्य
              </span>
            </div>
            <p className="text-[10px] text-spiritual-muted font-hindi font-medium">
              राजाई स्वराज्य साथी • Purusharth
            </p>
          </div>
        </div>

        {/* Action icons & controls */}
        <div className="flex items-center gap-1.5">
          {/* Audio Chime Button */}
          <button
            onClick={handlePlayBell}
            title="Mindfulness Bowl Sound (शांति ध्वनि)"
            className="p-1.5 rounded-lg text-spiritual-muted hover:text-maroon-700 hover:bg-gold-50 transition-colors border border-transparent hover:border-gold-200"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Quick Language Toggle */}
          <div className="flex rounded-md bg-white border border-gold-200 p-0.5 text-[11px] font-medium">
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-1.5 py-0.5 rounded transition-all ${
                profile.language === 'hi'
                  ? 'bg-maroon-700 text-white font-bold'
                  : 'text-spiritual-muted hover:text-maroon-700'
              }`}
            >
              हिं
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-1.5 py-0.5 rounded transition-all ${
                profile.language === 'en'
                  ? 'bg-maroon-700 text-white font-bold'
                  : 'text-spiritual-muted hover:text-maroon-700'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('hinglish')}
              className={`px-1.5 py-0.5 rounded transition-all ${
                profile.language === 'hinglish'
                  ? 'bg-maroon-700 text-white font-bold'
                  : 'text-spiritual-muted hover:text-maroon-700'
              }`}
            >
              HG
            </button>
          </div>

          {/* Profile Avatar */}
          <button
            onClick={onOpenProfile}
            title="My Royal Profile & Passport"
            className="w-8 h-8 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-maroon-800 hover:ring-2 hover:ring-gold-400 transition-all ml-1 shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-maroon-700" />
          </button>
        </div>
      </div>
    </header>
  );
};
