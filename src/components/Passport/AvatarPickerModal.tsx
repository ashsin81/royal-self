import React, { useRef } from 'react';
import { SPIRITUAL_AVATARS, SpiritualAvatar } from '../../data/spiritualAvatars';
import { X, Upload, Check, Crown, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatarUrl?: string;
  onSelectAvatar: (url: string) => void;
}

export const AvatarPickerModal: React.FC<AvatarPickerModalProps> = ({
  isOpen,
  onClose,
  currentAvatarUrl,
  onSelectAvatar,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          sound.playChime();
          onSelectAvatar(reader.result);
          onClose();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto bg-gradient-to-b from-[#25091E] via-[#170414] to-[#0D020B] border-2 border-amber-400/50 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-amber-50 space-y-4 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold block uppercase">
                TRAVELLER AVATAR
              </span>
              <span className="text-xs font-serif text-amber-200/80">
                स्वरूप दर्शन • CHOOSE YOUR SACRED AVATAR
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-amber-300/70 hover:text-amber-100 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Personal Photo Button */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-amber-500/20 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-amber-100 font-hindi">
              व्यक्तिगत फ़ोटो अपलोड करें
            </div>
            <div className="text-[10px] text-amber-300/60 font-hindi">
              गैलरी से अपनी या प्रेरणादायक फ़ोटो चुनें
            </div>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-xl bg-amber-500 text-maroon-950 font-bold text-xs flex items-center gap-1.5 hover:brightness-110"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        {/* Spiritual Avatars Grid */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-wider uppercase text-amber-400 font-bold block">
            DIVINE ADHYATMIC AVATARS
          </span>

          <div className="grid grid-cols-2 gap-3">
            {SPIRITUAL_AVATARS.map((av) => {
              const isSelected = currentAvatarUrl === av.imageUrl;

              return (
                <div
                  key={av.id}
                  onClick={() => {
                    sound.playChime();
                    onSelectAvatar(av.imageUrl);
                    onClose();
                  }}
                  className={`cursor-pointer rounded-2xl p-2.5 border transition-all text-center space-y-2 group ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-md ring-1 ring-amber-400'
                      : 'bg-black/30 border-white/10 hover:border-amber-400/50 hover:bg-black/50'
                  }`}
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-tr from-amber-600 to-rose-900 border border-amber-400/30">
                    <img
                      src={av.imageUrl}
                      alt={av.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold font-hindi text-amber-100">
                      {av.nameHi}
                    </div>
                    <div className="text-[10px] text-amber-300/60 font-serif">
                      {av.nameEn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
