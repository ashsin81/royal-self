import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { Volume2, VolumeX, Settings, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';
import { tts } from '../utils/tts';

interface HeaderProps {
  profile: UserProfile;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onLanguageChange: (lang: 'hi' | 'en' | 'hinglish') => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenProfile,
  onOpenSettings,
  onLanguageChange,
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

  return (
    <header className="sticky top-0 z-30 bg-ivory-200/90 backdrop-blur-md border-b border-gold-200/80 px-4 py-2">
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
              <span className="text-lg" role="img" aria-label="Royal Crown">👑</span>
            </div>
          )}
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
        <div className="flex items-center gap-1">
          {/* Audio Chime Button */}
          <button
            onClick={handlePlayBell}
            title="Mindfulness Bowl Sound (शांति ध्वनि)"
            className="p-1.5 rounded-lg text-spiritual-muted hover:text-maroon-700 hover:bg-gold-50 transition-colors"
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
                : 'text-spiritual-muted hover:text-maroon-700 hover:bg-gold-50'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-700" /> : <Volume2 className="w-4 h-4 text-gold-600" />}
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            title="सेटिंग्स (Settings - Font, Photos, TTS)"
            className="p-1.5 rounded-lg text-spiritual-muted hover:text-maroon-700 hover:bg-gold-50 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Profile / Passport Icon */}
          <button
            onClick={onOpenProfile}
            title="My Royal Profile & Passport"
            className="w-8 h-8 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-maroon-800 hover:ring-2 hover:ring-gold-400 transition-all ml-0.5 shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-maroon-700" />
          </button>
        </div>
      </div>
    </header>
  );
};
