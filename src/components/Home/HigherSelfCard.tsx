import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { Sparkles, Sun, X, Volume2 } from 'lucide-react';
import { sound } from '../../utils/audio';
import { tts } from '../../utils/tts';

interface HigherSelfCardProps {
  profile: UserProfile;
}

export const HigherSelfCard: React.FC<HigherSelfCardProps> = ({ profile }) => {
  const [showSwamanModal, setShowSwamanModal] = useState<boolean>(false);

  const handleOpenSwaman = () => {
    sound.playTibetanBowl();
    setShowSwamanModal(true);
  };

  const handleListenSwaman = () => {
    const textToSpeak = `मैं एक शांत, शक्तिशाली और पवित्र आत्मा हूँ। मेरे सक्रिय स्वरूप हैं: ${qualities.join(', ')}। ओम शांति।`;
    tts.toggle(textToSpeak, profile.language, profile.ttsSpeed || 0.95);
  };

  const qualities = profile.selectedQualities?.length
    ? profile.selectedQualities
    : ['शांत स्वरूप', 'शक्तिशाली स्वरूप', 'पवित्र स्वरूप'];

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-maroon-800 via-maroon-700 to-maroon-900 text-ivory-100 p-5 shadow-royal border border-gold-400/40">
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-maroon-600/30 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-serif uppercase tracking-widest text-gold-300 font-bold flex items-center gap-1.5">
              <span>👑</span>
              <span>MY HIGHER SELF • श्रेष्ठ स्वरूप</span>
            </span>
            <span className="text-[10px] bg-gold-400/20 text-gold-200 border border-gold-300/30 px-2 py-0.5 rounded-full font-medium">
              स्वराज्य अधिकारी
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold font-serif text-white leading-snug">
            "मैं एक शांत, शक्तिशाली और पवित्र आत्मा हूँ।"
          </h2>

          {/* Qualities chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {qualities.map((quality) => (
              <span
                key={quality}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xs text-gold-100 border border-gold-300/40 font-hindi shadow-2xs"
              >
                <Sparkles className="w-3 h-3 text-gold-300" />
                {quality}
              </span>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={handleOpenSwaman}
              className="px-3.5 py-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-maroon-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Sun className="w-3.5 h-3.5 text-maroon-900" />
              <span>स्वमान अनुभव करें</span>
            </button>
            <button
              onClick={handleListenSwaman}
              title="स्वमान सुनें (Read Aloud)"
              className="px-3 py-2 bg-white/15 hover:bg-white/25 text-gold-100 border border-gold-300/40 rounded-xl text-xs font-semibold font-hindi transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5 text-gold-300" />
              <span>सुनें</span>
            </button>
          </div>
        </div>
      </div>

      {/* Swaman Experience Modal */}
      {showSwamanModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-ivory-100 border-2 border-gold-400 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowSwamanModal(false)}
              className="absolute top-3 right-3 p-1.5 text-spiritual-muted hover:text-maroon-800 rounded-full bg-white/70"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-full bg-maroon-700 border-2 border-gold-300 flex items-center justify-center text-3xl shadow-lg mb-4 animate-pulse">
              ✨
            </div>

            <span className="text-xs font-serif uppercase tracking-widest text-gold-600 font-bold">
              परम शांति अनुभूति
            </span>
            <h3 className="text-xl font-bold font-hindi text-maroon-800 mt-1 mb-3">
              मैं शांत स्वरूप आत्मा हूँ
            </h3>

            <div className="p-4 bg-white rounded-2xl border border-gold-200 text-left space-y-2.5 text-xs text-spiritual-dark font-hindi leading-relaxed">
              <p>
                • <strong>आदि स्वरूप:</strong> मैं भृकुटि के मध्य चमकता हुआ चैतन्य दिव्य ज्योति बिंदु हूँ।
              </p>
              <p>
                • <strong>संबंध:</strong> शिव बाबा मेरे परमपिता, शिक्षक और सच्चे साथी हैं।
              </p>
              <p>
                • <strong>अधिकार:</strong> मेरा अपने मन, बुद्धि और संस्कारों पर पूर्ण स्वराज्य है।
              </p>
              <p>
                • <strong>वर्तमान कर्म:</strong> मैं परिस्थिति से परे होकर साक्षी भाव से श्रेष्ठ कर्म करता हूँ।
              </p>
            </div>

            <button
              onClick={() => setShowSwamanModal(false)}
              className="w-full mt-4 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md"
            >
              स्थिति में स्थित हुआ (धन्यवाद बाबा)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
