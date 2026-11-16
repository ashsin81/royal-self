import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { Volume2, VolumeX, Settings, ShieldCheck, Sun, Moon, Phone, GraduationCap, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import { tts } from '../utils/tts';

interface HeaderProps {
  profile: UserProfile;
  isTeacherModeActive: boolean;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenLogin: () => void;
  onToggleTeacherMode: () => void;
  onToggleTheme: () => void;
  onLanguageChange: (lang: 'hi' | 'en' | 'hinglish') => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  isTeacherModeActive,
  onOpenProfile,
  onOpenSettings,
  onOpenLogin,
  onToggleTeacherMode,
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
    <header className="sticky top-0 z-30 bg-ivory-200/90 dark:bg-celestial-card/95 backdrop-blur-md border-b border-gold-200/80 dark:border-celestial-border px-3 py-2 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-2">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt="Avatar"
              onClick={onOpenProfile}
              className="w-9 h-9 rounded-full object-cover border-2 border-gold-400 shadow-sm cursor-pointer hover:ring-2 hover:ring-gold-400"
            />
          ) : (
            <div
              onClick={onOpenProfile}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-maroon-700 via-maroon-800 to-maroon-900 border border-gold-300 flex items-center justify-center shadow-sm cursor-pointer"
            >
              <span className="text-base" role="img" aria-label="Royal Crown">👑</span>
            </div>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif font-black tracking-widest text-xs sm:text-sm text-maroon-800 dark:text-gold-200 leading-none">
                ROYAL SELF
              </h1>
              {profile.role === 'teacher' ? (
                <button
                  onClick={onToggleTeacherMode}
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold transition-all flex items-center gap-1 ${
                    isTeacherModeActive
                      ? 'bg-purple-600 text-white shadow-xs animate-pulse'
                      : 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-300/60'
                  }`}
                  title="सेवाकेंद्र प्रभारी पोर्टल बदलें"
                >
                  <GraduationCap className="w-3 h-3" />
                  <span>प्रभारी</span>
                </button>
              ) : (
                <span className="text-[10px] bg-gold-100 dark:bg-gold-950/80 text-gold-700 dark:text-gold-300 px-1.5 py-0.2 rounded font-semibold border border-gold-300/60">
                  स्वराज्य
                </span>
              )}
            </div>
            <p className="text-[10px] text-spiritual-muted dark:text-gold-300/70 font-hindi font-medium">
              राजाई स्वराज्य साथी • BK Purusharth
            </p>
          </div>
        </div>

        {/* Action icons & controls */}
        <div className="flex items-center gap-1">
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

          {/* Text-to-Speech Toggle Button */}
          <button
            onClick={handleToggleSpeech}
            title={isSpeaking ? "वाचन रोकें (Stop Reading)" : "आवाज़ में सुनें (Read Aloud)"}
            className={`p-1.5 rounded-lg transition-all ${
              isSpeaking
                ? 'bg-rose-100 text-rose-700 ring-2 ring-rose-400 animate-pulse'
                : 'text-spiritual-muted dark:text-gold-300 hover:text-maroon-700 dark:hover:text-gold-100 hover:bg-gold-50 dark:hover:bg-celestial-surface'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-700" /> : <Sparkles className="w-4 h-4 text-gold-600 dark:text-gold-400" />}
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
