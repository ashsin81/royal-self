import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { Sparkles, Volume2, X, Sun, Award, Shield } from 'lucide-react';
import { sound } from '../../utils/audio';
import { tts } from '../../utils/tts';

interface HigherSelfViewerModalProps {
  profile: UserProfile;
  onClose: () => void;
}

export const HigherSelfViewerModal: React.FC<HigherSelfViewerModalProps> = ({ profile, onClose }) => {
  const [auraActive, setAuraActive] = useState<boolean>(true);

  const handlePlayDivineSound = () => {
    sound.playTibetanBowl();
    setAuraActive(false);
    setTimeout(() => setAuraActive(true), 200);
  };

  const handleSpeakAffirmation = () => {
    const text = `मैं देह नहीं, भृकुटि के मध्य चमकता हुआ चैतन्य दिव्य ज्योतिर्बिंदु आत्मा हूँ। मेरा वास्तविक स्वरूप शांत, शक्तिशाली, और सम्पूर्ण पवित्र है। मैं परमात्मा शिव बाबा की संतान और स्वराज्य अधिकारी हूँ। ओम शांति।`;
    tts.toggle(text, profile.language, profile.ttsSpeed || 0.95);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative max-w-md w-full bg-gradient-to-b from-maroon-950 via-[#180812] to-black border-2 border-gold-400/80 rounded-3xl p-6 sm:p-7 text-center text-white shadow-2xl overflow-hidden my-auto">
        {/* Divine Background Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gold-200 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1 mb-4 relative z-10">
          <span className="text-[11px] font-serif uppercase tracking-widest text-gold-400 font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-gold-300 animate-pulse" />
            <span>दिव्य स्वरूप दर्शन • HIGHER SELF VISION</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-hindi text-white">
            मेरा श्रेष्ठ फरिश्ता स्वरूप
          </h2>
          <p className="text-xs text-gold-200/80 font-hindi">
            देही-अभिमानी स्थिति • सम्पूर्ण प्रकाश का शरीर
          </p>
        </div>

        {/* Central Divine Higher Self Aura Graphic */}
        <div className="relative w-60 h-60 mx-auto my-3 flex items-center justify-center">
          {/* Pulsing Concentric Aura Waves */}
          <div
            className={`absolute inset-0 rounded-full border border-gold-400/40 ${
              auraActive ? 'animate-ping duration-3000 opacity-30' : ''
            }`}
          />
          <div className="absolute inset-4 rounded-full border-2 border-gold-300/60 animate-pulse duration-2000" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-gold-500/20 to-rose-500/20 blur-md" />

          {/* Golden Crown & Divine Radiance Silhouette */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Crown of Light */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-gold-300 via-gold-500 to-amber-600 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(212,175,55,0.8)] border border-white mb-2">
              👑
            </div>

            {/* Glowing Star in Forehead */}
            <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#fff,0_0_30px_#D4AF37] animate-pulse" />

            {/* Angelic Wings / Lotus Symbolism */}
            <div className="mt-2 text-gold-200 text-sm font-serif tracking-widest flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-gold-400/40 backdrop-blur-md">
              <span>✦</span>
              <span className="font-hindi font-bold">स्वराज्य अधिकारी</span>
              <span>✦</span>
            </div>
          </div>
        </div>

        {/* Sacred Affirmation Box */}
        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-gold-400/40 text-left space-y-2 relative z-10 text-xs font-hindi leading-relaxed text-gold-100">
          <p className="italic text-center text-sm font-semibold text-white">
            "मैं देह नहीं, इस देह को चलाने वाली चैतन्य प्रकाशमय आत्मा हूँ। शांति, पवित्रता और शक्ति मेरा अनादि स्वभाव है।"
          </p>

          <div className="pt-2 border-t border-gold-400/30 flex flex-wrap justify-center gap-1.5">
            {profile.selectedQualities.map((q) => (
              <span
                key={q}
                className="text-[10px] bg-gold-400/20 text-gold-200 border border-gold-400/40 px-2 py-0.5 rounded-full"
              >
                ✓ {q}
              </span>
            ))}
          </div>
        </div>

        {/* Audio Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-4 relative z-10">
          <button
            onClick={handlePlayDivineSound}
            className="py-2.5 px-3 bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 font-hindi active:scale-95 transition-transform"
          >
            <Sun className="w-4 h-4 text-maroon-950" />
            <span>शांति नाद (Bell)</span>
          </button>

          <button
            onClick={handleSpeakAffirmation}
            className="py-2.5 px-3 bg-white/15 hover:bg-white/25 text-gold-200 border border-gold-300/40 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 font-hindi active:scale-95 transition-transform"
          >
            <Volume2 className="w-4 h-4 text-gold-300" />
            <span>स्वमान वाणी सुनें</span>
          </button>
        </div>
      </div>
    </div>
  );
};
