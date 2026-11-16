import React, { useState } from 'react';
import { UserProfile, Language } from '../../types';
import { SPIRITUAL_AVATARS, HIGHER_SELF_ARTWORKS } from '../../data/spiritualAvatars';
import {
  Type,
  Volume2,
  Camera,
  Image as ImageIcon,
  Trash2,
  Check,
  RotateCcw,
  Sparkles,
  Download,
  Upload,
  Globe,
  Bell,
  Sliders
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { tts } from '../../utils/tts';

interface SettingsViewProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onExportData: () => void;
  onImportData: (jsonStr: string) => void;
  onResetData: () => void;
  onRetakeOnboarding: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  onUpdateProfile,
  onExportData,
  onImportData,
  onResetData,
  onRetakeOnboarding,
}) => {
  const [testSpeechActive, setTestSpeechActive] = useState<boolean>(false);

  const fontScales: { id: 'sm' | 'base' | 'lg' | 'xl'; label: string; desc: string; sizeClass: string }[] = [
    { id: 'sm', label: 'A-', desc: 'छोटा (90%)', sizeClass: 'text-xs' },
    { id: 'base', label: 'A', desc: 'सामान्य (100%)', sizeClass: 'text-sm' },
    { id: 'lg', label: 'A+', desc: 'बड़ा (112%)', sizeClass: 'text-base' },
    { id: 'xl', label: 'A++', desc: 'अति बड़ा (125%)', sizeClass: 'text-lg' },
  ];

  const avatarPresets = [
    { id: 'p1', label: 'शिव बाबा ज्योति', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80' },
    { id: 'p2', label: 'श्वेत कमल (Lotus)', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=150&auto=format&fit=crop&q=80' },
    { id: 'p3', label: 'स्वर्ण मुकुट (Crown)', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=150&auto=format&fit=crop&q=80' },
    { id: 'p4', label: 'शांति सरोवर', url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=150&auto=format&fit=crop&q=80' },
  ];

  const handleFontScaleChange = (scale: 'sm' | 'base' | 'lg' | 'xl') => {
    sound.playSoftClick();
    onUpdateProfile({ ...profile, fontScale: scale });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'customInspirationPhoto') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('कृपया 2MB से छोटी फ़ोटो चुनें।');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          sound.playStampSound();
          onUpdateProfile({ ...profile, [field]: dataUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (field: 'avatarUrl' | 'customInspirationPhoto') => {
    sound.playSoftClick();
    onUpdateProfile({ ...profile, [field]: '' });
  };

  const handleTestTTS = () => {
    if (testSpeechActive) {
      tts.stop();
      setTestSpeechActive(false);
    } else {
      setTestSpeechActive(true);
      const textToSpeak =
        profile.language === 'en'
          ? 'I am a peaceful, pure, and sovereign soul. Om Shanti.'
          : 'मैं एक शांत स्वरूप, पवित्र और स्वराज्य अधिकारी आत्मा हूँ। ओम शांति।';
      tts.speak(textToSpeak, profile.language, profile.ttsSpeed || 0.95);
      setTimeout(() => setTestSpeechActive(false), 4500);
    }
  };

  const handleSpeedChange = (speed: number) => {
    onUpdateProfile({ ...profile, ttsSpeed: speed });
  };

  const handleLanguageChange = (lang: Language) => {
    sound.playSoftClick();
    onUpdateProfile({ ...profile, language: lang });
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          onImportData(text);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Settings Header */}
      <div>
        <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-maroon-700" />
          <span>ऐप अनुकूलन • PREFERENCES</span>
        </span>
        <h2 className="text-xl sm:text-2xl font-bold font-hindi text-maroon-900 tracking-tight">
          सेटिंग्स (Settings)
        </h2>
        <p className="text-xs text-spiritual-muted font-hindi">
          फ़ॉन्ट आकार, कस्टम फ़ोटो, आवाज़ वाचन (TTS) और डेटा प्रबंधन।
        </p>
      </div>

      {/* 1. FONT SIZE SCALER */}
      <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-maroon-50 text-maroon-700 flex items-center justify-center font-bold text-xs">
              <Type className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-hindi text-maroon-900">
                फ़ॉन्ट आकार नियंत्रण (Font Scaling)
              </h3>
              <p className="text-[11px] text-spiritual-muted font-hindi">
                ऐप के सभी शब्दों का आकार अपनी सुविधा अनुसार छोटा या बड़ा करें।
              </p>
            </div>
          </div>
        </div>

        {/* 4 Scale Buttons */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {fontScales.map((f) => {
            const isSelected = (profile.fontScale || 'base') === f.id;
            return (
              <button
                key={f.id}
                onClick={() => handleFontScaleChange(f.id)}
                className={`py-2.5 px-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-maroon-700 text-gold-100 border-maroon-700 shadow-sm'
                    : 'bg-ivory-50 text-spiritual-dark border-gold-200 hover:bg-gold-50/50'
                }`}
              >
                <span className={`font-serif font-bold ${f.sizeClass}`}>{f.label}</span>
                <span className="text-[10px] mt-0.5 opacity-80 font-hindi whitespace-nowrap">{f.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Live Preview Box */}
        <div className="p-3 bg-ivory-50 rounded-xl border border-gold-200 text-spiritual-dark font-hindi space-y-1">
          <span className="text-[10px] uppercase font-bold text-gold-700 block">लाइव टेक्स्ट प्रीव्यू:</span>
          <p className="leading-relaxed">
            "मैं एक शांत स्वरूप आत्मा हूँ। मन पर मेरा पूर्ण स्वराज्य है।"
          </p>
        </div>
      </div>

      {/* 2. READ TEXT TO SPEECH (TTS) */}
      <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold-50 text-gold-700 flex items-center justify-center font-bold text-xs">
              <Volume2 className="w-4 h-4 text-maroon-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-hindi text-maroon-900">
                आवाज़ में सुनें (Text-to-Speech)
              </h3>
              <p className="text-[11px] text-spiritual-muted font-hindi">
                मुरली, स्वमान और बाबा की दिशा को शांत वाणी में सुनें।
              </p>
            </div>
          </div>
        </div>

        {/* Speech Speed Controls */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-hindi">
            <span className="font-semibold text-spiritual-dark">वाचन गति (Speech Rate):</span>
            <span className="font-serif font-bold text-maroon-700">{profile.ttsSpeed || 0.95}x</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 0.8, label: 'शांत / धीमा (0.8x)' },
              { val: 0.95, label: 'संतुलित (1.0x)' },
              { val: 1.2, label: 'तेज (1.2x)' },
            ].map((spd) => (
              <button
                key={spd.val}
                type="button"
                onClick={() => handleSpeedChange(spd.val)}
                className={`py-1.5 px-2 rounded-lg text-xs font-hindi border transition-all ${
                  (profile.ttsSpeed || 0.95) === spd.val
                    ? 'bg-maroon-700 text-gold-100 font-bold border-maroon-700 shadow-2xs'
                    : 'bg-ivory-50 text-spiritual-dark border-gold-200 hover:bg-gold-50'
                }`}
              >
                {spd.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleTestTTS}
          className={`w-full py-2.5 rounded-xl text-xs font-bold font-hindi flex items-center justify-center gap-2 transition-all shadow-xs ${
            testSpeechActive
              ? 'bg-rose-700 text-white animate-pulse'
              : 'bg-gold-500 hover:bg-gold-600 text-maroon-950'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>{testSpeechActive ? 'आवाज़ रोकें (Stop Speaking)' : 'आवाज़ टेस्ट करें (Listen Sample)'}</span>
        </button>
      </div>

      {/* 3. CUSTOM PHOTOS (AVATAR & INSPIRATION) */}
      <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-hindi text-maroon-900">
              कस्टम फ़ोटो (Photos & Avatar)
            </h3>
            <p className="text-[11px] text-spiritual-muted font-hindi">
              पासपोर्ट प्रोफ़ाइल और प्रेरणा के लिए अपनी फ़ोटो जोड़ें।
            </p>
          </div>
        </div>

        {/* User Passport Avatar Section */}
        <div className="p-3.5 bg-ivory-50/70 rounded-xl border border-gold-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-hindi text-maroon-800">
              पासपोर्ट फ़ोटो (Profile Avatar)
            </span>
            {profile.avatarUrl && (
              <button
                onClick={() => handleRemovePhoto('avatarUrl')}
                className="text-[10px] text-rose-700 hover:underline flex items-center gap-1 font-hindi"
              >
                <Trash2 className="w-3 h-3" />
                <span>हटाएं</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt="Profile Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-gold-400 shadow-md ring-2 ring-gold-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-maroon-700 border-2 border-gold-400 flex items-center justify-center text-2xl shadow-md text-gold-300">
                👑
              </div>
            )}

            <div className="flex-1 space-y-1.5">
              <label className="py-2 px-3 bg-maroon-700 hover:bg-maroon-800 text-gold-100 rounded-xl text-xs font-bold font-hindi flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
                <Camera className="w-3.5 h-3.5" />
                <span>फ़ोन / कंप्यूटर से फ़ोटो अपलोड करें</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, 'avatarUrl')}
                  className="hidden"
                />
              </label>
              <p className="text-[10px] text-spiritual-muted font-hindi">
                JPG, PNG या WebP (अधिकतम 2MB)
              </p>
            </div>
          </div>

          {/* Preset Spiritual Avatars Gallery */}
          <div>
            <span className="text-[10px] uppercase font-bold text-spiritual-muted block mb-1.5 font-hindi flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold-600" />
              <span>आध्यात्मिक अवतार गैलरी (Spiritual Avatar Gallery):</span>
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {SPIRITUAL_AVATARS.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => {
                    sound.playSoftClick();
                    onUpdateProfile({ ...profile, avatarUrl: avatar.imageUrl });
                  }}
                  className={`p-1.5 rounded-xl border text-center transition-all group ${
                    profile.avatarUrl === avatar.imageUrl
                      ? 'border-maroon-700 bg-gold-100/60 ring-2 ring-gold-400'
                      : 'border-gold-200 hover:border-gold-400 bg-white'
                  }`}
                >
                  <div className="w-full h-14 rounded-lg overflow-hidden relative shadow-2xs">
                    <img
                      src={avatar.imageUrl}
                      alt={avatar.nameHi}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[9px] font-hindi font-medium block mt-1 truncate text-spiritual-dark">
                    {avatar.nameHi}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Inspiration Altar Photo */}
        <div className="p-3.5 bg-ivory-50/70 rounded-xl border border-gold-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-hindi text-maroon-800">
              बापदादा / प्रेरणा फ़ोटो (Inspiration Altar Photo)
            </span>
            {profile.customInspirationPhoto && (
              <button
                onClick={() => handleRemovePhoto('customInspirationPhoto')}
                className="text-[10px] text-rose-700 hover:underline flex items-center gap-1 font-hindi"
              >
                <Trash2 className="w-3 h-3" />
                <span>हटाएं</span>
              </button>
            )}
          </div>

          {profile.customInspirationPhoto && (
            <div className="relative rounded-xl overflow-hidden border border-gold-300 max-h-36">
              <img
                src={profile.customInspirationPhoto}
                alt="Inspiration"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <label className="w-full py-2 px-3 bg-white hover:bg-gold-50 border border-gold-300 text-maroon-800 rounded-xl text-xs font-bold font-hindi flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs">
            <ImageIcon className="w-3.5 h-3.5 text-gold-600" />
            <span>{profile.customInspirationPhoto ? 'फ़ोटो बदलें' : 'बाबा / स्मृति फ़ोटो जोड़ें'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 'customInspirationPhoto')}
              className="hidden"
            />
          </label>

          {/* Quick Select from Higher Self Artworks */}
          <div>
            <span className="text-[10px] uppercase font-bold text-spiritual-muted block mb-1 font-hindi">
              या दिव्य स्वरूप आर्ट चुनें:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {HIGHER_SELF_ARTWORKS.map((art) => (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => {
                    sound.playSoftClick();
                    onUpdateProfile({ ...profile, customInspirationPhoto: art.imageUrl });
                  }}
                  className={`p-1 rounded-lg border text-center transition-all ${
                    profile.customInspirationPhoto === art.imageUrl
                      ? 'border-maroon-700 ring-2 ring-gold-400 bg-gold-100/40'
                      : 'border-gold-200 hover:border-gold-400 bg-white'
                  }`}
                >
                  <img src={art.imageUrl} alt={art.titleHi} className="w-full h-10 object-cover rounded-md" />
                  <span className="text-[8px] font-hindi block mt-0.5 truncate text-spiritual-dark">
                    {art.titleHi.replace('मेरा ', '').replace(' स्वरूप', '')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. LANGUAGE & ONBOARDING */}
      <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-3">
        <h3 className="text-sm font-bold font-hindi text-maroon-900 flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-maroon-700" />
          <span>भाषा एवं परिचय (Language)</span>
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'hi', label: 'हिंदी' },
            { id: 'en', label: 'English' },
            { id: 'hinglish', label: 'Hinglish' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleLanguageChange(item.id as Language)}
              className={`py-2 text-xs font-hindi font-semibold rounded-xl border transition-all ${
                profile.language === item.id
                  ? 'bg-maroon-700 text-gold-100 border-maroon-700 font-bold'
                  : 'bg-ivory-50 text-spiritual-dark border-gold-200 hover:bg-gold-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={onRetakeOnboarding}
          className="w-full text-center text-xs text-maroon-700 font-bold font-hindi pt-2 hover:underline"
        >
          आध्यात्मिक लक्ष्य व गुण पुनः निर्धारित करें (Retake Onboarding) →
        </button>
      </div>

      {/* 5. BACKUP & RESET */}
      <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-3">
        <h3 className="text-sm font-bold font-hindi text-maroon-900 flex items-center gap-1.5">
          <Download className="w-4 h-4 text-maroon-700" />
          <span>बैकअप एवं डेटा प्रबंधन (Backup & Restore)</span>
        </h3>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onExportData}
            className="py-2.5 px-3 bg-ivory-100 hover:bg-gold-100 text-maroon-800 border border-gold-300 rounded-xl text-xs font-bold font-hindi flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>बैकअप डाउनलोड</span>
          </button>

          <label className="py-2.5 px-3 bg-ivory-100 hover:bg-gold-100 text-maroon-800 border border-gold-300 rounded-xl text-xs font-bold font-hindi flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center">
            <Upload className="w-3.5 h-3.5" />
            <span>बैकअप लोड</span>
            <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
          </label>
        </div>

        <button
          onClick={onResetData}
          className="w-full py-2 text-rose-700 hover:text-rose-900 text-xs font-semibold font-hindi transition-colors flex items-center justify-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>डेमो डेटा रीसेट करें (Reset Default)</span>
        </button>
      </div>
    </div>
  );
};
