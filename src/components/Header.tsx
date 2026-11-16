import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { Volume2, VolumeX, Settings, ShieldCheck, Sun, Moon, Phone, Sparkles, MessageCircleQuestion } from 'lucide-react';
import { sound } from '../utils/audio';
import { tts } from '../utils/tts';

interface HeaderProps {
  profile: UserProfile;
  isTeacherModeActive: boolean;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenLogin: () => void;
  onOpenAskBaba: () => void;
  onToggleTheme: () => void;
  onLanguageChange: (lang: 'hi' | 'en' | 'hinglish') => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenProfile,
  onOpenSettings,
  onOpenLogin,
  onOpenAskBaba,
  onToggleTheme,
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    return tts.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  const handlePlayBell = () => {
    sound.playTibetanBowl();
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      tts.stop();
    } else {
      const affirmation =
        profile.language === 'en'
          ? `Good day, ${profile.name}. Remember your Higher Self. I am a peaceful, pure, and sovereign soul.`
          : `शुभ दिन, ${profile.name}। अपने श्रेष्ठ स्वरूप को याद रखें। मैं एक शांत, शक्तिशाली और पवित्र आत्मा हूँ।`;
      tts.speak(affirmation, profile.language, profile.ttsSpeed || 0.95);
    }
  };

  const isDark = profile.theme === 'dark';

  return (
    <header className="sticky top-0 z-30 bg-[#160614]/90 dark:bg-[#0A0208]/95 backdrop-blur-xl border-b border-amber-500/30 px-3 py-2 transition-colors shadow-lg shadow-black/40">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-2">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt="Avatar"
              onClick={onOpenProfile}
              className="w-9 h-9 rounded-full object-cover border-2 border-amber-400 shadow-sm cursor-pointer hover:ring-2 hover:ring-amber-300"
            />
          ) : (
            <div
              onClick={onOpenProfile}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 via-rose-600 to-purple-800 border border-amber-300 flex items-center justify-center shadow-sm cursor-pointer"
            >
              <span className="text-base" role="img" aria-label="Royal Crown">👑</span>
            </div>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif font-black tracking-widest text-xs sm:text-sm text-amber-200 leading-none">
                ROYAL SELF
              </h1>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-semibold border border-amber-400/40">
                30-Day
              </span>
            </div>
            <p className="text-[10px] text-amber-300/70 font-hindi font-medium">
              राजाई स्वराज्य साथी • AI Companion
            </p>
          </div>
        </div>

        {/* Action icons & controls */}
        <div className="flex items-center gap-1">
          {/* Ask Baba AI Action Button */}
          <button
            onClick={() => {
              sound.playTibetanBowl();
              onOpenAskBaba();
            }}
            title="बाबा से पूछें (Ask Baba AI Guidance)"
            className="px-2 py-1 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white rounded-xl text-[11px] font-hindi font-bold shadow-md shadow-amber-500/20 hover:opacity-95 flex items-center gap-1 animate-pulse transition-all transform active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span className="hidden sm:inline">बाबा से पूछें</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Theme Toggle (Sun/Moon) */}
          <button
            onClick={onToggleTheme}
            title={isDark ? "लाइट थीम (Warm Ivory)" : "डार्क थीम (Celestial Dark)"}
            className="p-1.5 rounded-lg text-spiritual-muted dark:text-gold-300 hover:text-maroon-700 dark:hover:text-gold-100 hover:bg-gold-50 dark:hover:bg-celestial-surface transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-spiritual-muted" />}
          </button>

          {/* Phone / Login Account */}
          <button
            onClick={onOpenLogin}
            title={`खाता / फ़ोन लॉगिन (${profile.phone || 'लॉगिन करें'})`}
            className="p-1.5 rounded-lg text-spiritual-muted dark:text-gold-300 hover:text-maroon-700 dark:hover:text-gold-100 hover:bg-gold-50 dark:hover:bg-celestial-surface transition-colors relative"
          >
            <Phone className="w-4 h-4" />
            {profile.phone && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-1 ring-white" />
            )}
          </button>

          {/* Audio Chime Button */}
          <button
            onClick={handlePlayBell}
            title="Mindfulness Bowl Sound (शांति ध्वनि)"
            className="p-1.5 rounded-lg text-spiritual-muted dark:text-gold-300 hover:text-maroon-700 dark:hover:text-gold-100 hover:bg-gold-50 dark:hover:bg-celestial-surface transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            title="सेटिंग्स (Settings - Font, Photos, TTS)"
            className="p-1.5 rounded-lg text-spiritual-muted dark:text-gold-300 hover:text-maroon-700 dark:hover:text-gold-100 hover:bg-gold-50 dark:hover:bg-celestial-surface transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Profile / Passport Icon */}
          <button
            onClick={onOpenProfile}
            title="My Royal Profile & Passport"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold-50 dark:bg-celestial-surface border border-gold-300 dark:border-gold-700 flex items-center justify-center text-maroon-800 dark:text-gold-300 hover:ring-2 hover:ring-gold-400 transition-all ml-0.5 shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-maroon-700 dark:text-gold-300" />
          </button>
        </div>
      </div>
    </header>
  );
};
