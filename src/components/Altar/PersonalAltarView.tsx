import React, { useState } from 'react';
import { UserProfile } from '../../types';
import {
  Camera,
  Upload,
  Trash2,
  Check,
  Sparkles,
  Heart,
  Eye,
  ShieldCheck,
  X,
  Volume2
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { tts } from '../../utils/tts';
import confetti from 'canvas-confetti';

interface PersonalAltarViewProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onOpenBabaChat: () => void;
}

export const PersonalAltarView: React.FC<PersonalAltarViewProps> = ({
  profile,
  onUpdateProfile,
  onOpenBabaChat,
}) => {
  const personalImages = profile.personalGalleryImages || [];
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(
    profile.customInspirationPhoto || personalImages[0] || null
  );

  const handleUploadPersonalPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('कृपया 3MB से छोटी फ़ोटो चुनें।');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          sound.playStampSound();
          confetti({
            particleCount: 60,
            spread: 50,
            origin: { y: 0.6 }
          });
          const updatedImages = [dataUrl, ...personalImages];
          onUpdateProfile({
            ...profile,
            personalGalleryImages: updatedImages,
            customInspirationPhoto: dataUrl
          });
          setSelectedPhoto(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (photoUrl: string) => {
    sound.playSoftClick();
    const updatedImages = personalImages.filter((p) => p !== photoUrl);
    const updatedCustom = profile.customInspirationPhoto === photoUrl ? (updatedImages[0] || '') : profile.customInspirationPhoto;
    onUpdateProfile({
      ...profile,
      personalGalleryImages: updatedImages,
      customInspirationPhoto: updatedCustom
    });
    if (selectedPhoto === photoUrl) {
      setSelectedPhoto(updatedImages[0] || null);
    }
  };

  const handleSetAsPassportAvatar = (photoUrl: string) => {
    sound.playStampSound();
    onUpdateProfile({
      ...profile,
      avatarUrl: photoUrl
    });
    alert('पासपोर्ट प्रोफ़ाइल फ़ोटो सफलतापूर्वक अपडेट की गई!');
  };

  const handleSpeakDrishti = () => {
    const text = `मीठे बच्चे, अपने मन के मंदिर में केवल एक शिवबाबा को बिठाओ। जहाँ एक परमात्मा की याद है, वहाँ संसार का कोई भी विकार ठहर नहीं सकता। ओम शांति।`;
    tts.toggle(text, profile.language, profile.ttsSpeed || 0.95);
  };

  return (
    <div className="space-y-4 pb-24 text-white">
      {/* Altar Mystic Header */}
      <div className="p-5 rounded-3xl bg-gradient-to-b from-[#230A1F] via-[#160614] to-[#0A0208] border-2 border-amber-400/80 shadow-2xl relative overflow-hidden text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-amber-300 p-0.5 mx-auto shadow-lg shadow-amber-500/30">
          <div className="w-full h-full rounded-full bg-[#1A0614] flex items-center justify-center">
            <span className="text-xl">🪷</span>
          </div>
        </div>

        <span className="text-[10px] font-serif uppercase tracking-widest text-amber-300 font-bold block">
          मेरी आत्मिक साधना वेदी • PERSONAL ALTAR
        </span>
        <h2 className="text-lg sm:text-xl font-bold font-hindi text-white">
          मेरी स्मृति व व्यक्तिगत गैलरी
        </h2>
        <p className="text-xs text-amber-200/80 font-hindi max-w-xs mx-auto">
          अपनी निजी गैलरी से अपनी प्रिय प्रेरणा तस्वीरें (बाबा, मधुबन या साधना फ़ोटो) जोड़ें।
        </p>

        {/* Upload Button */}
        <div className="pt-2">
          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-maroon-950 font-bold text-xs font-hindi cursor-pointer shadow-lg shadow-amber-500/30 transition-all transform active:scale-95">
            <Upload className="w-4 h-4 text-maroon-950" />
            <span>गैलरी से फ़ोटो जोड़ें (Upload Personal Photo)</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadPersonalPhoto}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* CENTRAL ALTAR DISPLAY (NO DEFAULT IMAGES - PURE ETHEREAL GLOW WHEN EMPTY) */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.25)] bg-[#120410] min-h-[300px] flex items-center justify-center p-4">
        
        {selectedPhoto ? (
          /* User's Uploaded Personal Photo */
          <div className="relative w-full h-[320px] rounded-2xl overflow-hidden group">
            <img
              src={selectedPhoto}
              alt="Personal Altar"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-amber-500/10 pointer-events-none" />

            <div className="absolute top-2 right-2 flex gap-1.5 z-10">
              <button
                onClick={() => handleRemovePhoto(selectedPhoto)}
                title="गैलरी से हटाएं"
                className="p-2 rounded-full bg-black/60 hover:bg-rose-900/80 text-rose-300 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-hindi z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/60 border border-amber-400/40 text-amber-200 text-[10px]">
                आपकी व्यक्तिगत प्रेरणा फ़ोटो
              </span>
              <button
                onClick={() => handleSetAsPassportAvatar(selectedPhoto)}
                className="px-2.5 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-maroon-950 font-bold text-[10px] flex items-center gap-1 shadow-md"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>पासपोर्ट पर लगाएं</span>
              </button>
            </div>
          </div>
        ) : (
          /* PURE MYSTIC PROCEDURAL LIGHT AURA (NO DEFAULT STOCK PHOTO) */
          <div className="text-center space-y-4 py-8 relative z-10">
            {/* Concentric Glowing Meditation Rings */}
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-amber-400/30 animate-ping opacity-25" />
              <div className="absolute inset-3 rounded-full border-2 border-amber-400/50 animate-pulse duration-2000" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-amber-500/30 to-rose-600/30 blur-lg" />

              {/* Point of Light (Jyotirbindu) */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_20px_#fff,0_0_40px_#D4AF37,0_0_60px_#F59E0B] animate-pulse" />
                <span className="text-xs font-serif font-bold text-amber-200 mt-3 tracking-widest">
                  ॐ शांति
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold font-hindi text-amber-100">
                चैतन्य ज्योतिर्बिंदु स्वरूप
              </h3>
              <p className="text-xs text-amber-300/80 font-hindi max-w-xs mx-auto mt-1">
                यहाँ कोई डिफ़ॉल्ट स्टॉक फोटो नहीं है। आप ऊपर दिए गए बटन से अपनी गैलरी से अपनी व्यक्तिगत फ़ोटो जोड़ सकते हैं।
              </p>
            </div>

            <button
              onClick={handleSpeakDrishti}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-amber-400/40 text-xs font-hindi text-amber-200 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>दृष्टि महावाक्य सुनें</span>
            </button>
          </div>
        )}
      </div>

      {/* USER'S PERSONAL UPLOADED PHOTO STRIP */}
      {personalImages.length > 0 && (
        <div className="space-y-2">
          <span className="text-[11px] font-hindi text-amber-300 font-bold block">
            आपकी व्यक्तिगत गैलरी ({personalImages.length} फ़ोटो):
          </span>
          <div className="grid grid-cols-4 gap-2">
            {personalImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(img)}
                className={`relative h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedPhoto === img
                    ? 'border-amber-400 ring-2 ring-amber-400 scale-105 shadow-md'
                    : 'border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUICK BABA COMMUNION SHORTCUT */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-600/30 via-rose-600/30 to-purple-600/30 border border-amber-400/40 flex items-center justify-between text-xs font-hindi">
        <div>
          <div className="font-bold text-amber-100">बाबा से एकांत में मिलन</div>
          <p className="text-[11px] text-gray-300">अपने मन की बात सीधे शिवबाबा के आगे रखें</p>
        </div>
        <button
          onClick={onOpenBabaChat}
          className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-maroon-950 font-bold text-xs transition-colors shadow-md"
        >
          बात करें →
        </button>
      </div>

    </div>
  );
};
