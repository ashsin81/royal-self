import React, { useState } from 'react';
import { UserProfile, Language } from '../../types';
import { PassportCard } from './PassportCard';
import { SwarajyaDeclarationModal } from './SwarajyaDeclarationModal';
import {
  Download,
  Upload,
  RotateCcw,
  Shield,
  Phone,
  Sparkles,
  Settings,
  HeartHandshake
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onRetakeOnboarding: () => void;
  onOpenSettings: () => void;
  onExportData: () => void;
  onImportData: (jsonStr: string) => void;
  onResetData: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onRetakeOnboarding,
  onOpenSettings,
  onExportData,
  onImportData,
  onResetData,
}) => {
  const [showDeclarationModal, setShowDeclarationModal] = useState<boolean>(false);

  const handleLanguageChange = (lang: Language) => {
    sound.playSoftClick();
    onUpdateProfile({ ...profile, language: lang });
  };

  const handleUpdateSignature = (name: string, date: string) => {
    onUpdateProfile({ ...profile, signatureName: name, signedDate: date });
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
    <div className="space-y-4 pb-20">
      {/* Royal Passport Display Card */}
      <PassportCard
        profile={profile}
        onOpenDeclaration={() => setShowDeclarationModal(true)}
      />

      {/* Account & Spiritual Center Info */}
      <div className="liquid-glass rounded-2xl p-4 sm:p-5 border border-gold-200/90 dark:border-celestial-border shadow-royal space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-hindi text-maroon-900 dark:text-gold-200 flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-maroon-700 dark:text-gold-400" />
            <span>राजयोगी खाता एवं सेवाकेंद्र (Account & Center)</span>
          </h3>
          <span className="text-[10px] bg-gold-100 dark:bg-gold-950/80 text-gold-700 dark:text-gold-300 font-bold px-2 py-0.5 rounded-full border border-gold-300/60">
            {profile.role === 'teacher' ? 'सेवाकेंद्र प्रभारी' : 'अभ्यासी विद्यार्थी'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-hindi">
          <div className="bg-ivory-50/70 dark:bg-celestial-surface/50 p-2.5 rounded-xl border border-gold-200/50 dark:border-celestial-border">
            <span className="text-spiritual-muted dark:text-gray-400 block text-[10px]">पंजीकृत फ़ोन</span>
            <span className="font-bold text-spiritual-dark dark:text-gold-100 font-sans tracking-wide">
              {profile.phone ? `+91 ${profile.phone}` : 'पंजीकृत नहीं'}
            </span>
          </div>
          <div className="bg-ivory-50/70 dark:bg-celestial-surface/50 p-2.5 rounded-xl border border-gold-200/50 dark:border-celestial-border">
            <span className="text-spiritual-muted dark:text-gray-400 block text-[10px]">सेवाकेंद्र</span>
            <span className="font-bold text-spiritual-dark dark:text-gold-100 truncate block">
              {profile.centerName || 'शांति निकेतन सेवाकेंद्र'}
            </span>
          </div>
        </div>
      </div>

      {/* Higher Self Qualities Summary Card */}
      <div className="liquid-glass rounded-2xl p-5 border border-gold-200/90 dark:border-celestial-border shadow-royal space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-hindi text-maroon-900 dark:text-gold-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-maroon-700 dark:text-gold-400" />
            <span>श्रेष्ठ स्वरूप के गुण (Selected Qualities)</span>
          </h3>
          <span className="text-[10px] text-spiritual-muted dark:text-gray-400 font-sans">
            3 चयनित
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {profile.selectedQualities.map((q, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full bg-gold-100/90 dark:bg-gold-950/70 text-maroon-900 dark:text-gold-300 border border-gold-300 dark:border-gold-800 text-xs font-hindi font-medium shadow-2xs"
            >
              👑 {q}
            </span>
          ))}
        </div>

        <div className="pt-2 text-xs text-spiritual-muted dark:text-gray-300 font-hindi border-t border-gold-100 dark:border-celestial-border">
          <div>
            <strong>मुख्य संस्कार लक्ष्य: </strong>
            <span className="text-maroon-800 dark:text-gold-200">{profile.primarySanskarGoal}</span>
          </div>
        </div>

        <button
          onClick={onRetakeOnboarding}
          className="text-xs text-maroon-700 dark:text-gold-400 font-bold font-hindi hover:underline pt-1 block"
        >
          आध्यात्मिक स्वरूप व लक्ष्य पुनः निर्धारित करें (Edit Goals) →
        </button>
      </div>

      {/* Language Preferences */}
      <div className="liquid-glass rounded-2xl p-5 border border-gold-200/90 dark:border-celestial-border shadow-royal space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-hindi text-maroon-900 dark:text-gold-200 flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-maroon-700 dark:text-gold-400" />
            <span>भाषा प्राथमिकता (Language)</span>
          </h3>
          <button
            onClick={onOpenSettings}
            className="text-xs text-gold-700 dark:text-gold-400 font-bold flex items-center gap-1 hover:underline"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>अन्य सेटिंग्स</span>
          </button>
        </div>

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
                  ? 'bg-maroon-700 dark:bg-gold-600 text-gold-100 dark:text-maroon-950 border-maroon-700 dark:border-gold-500 font-bold shadow-xs'
                  : 'bg-ivory-50 dark:bg-celestial-surface/50 text-spiritual-dark dark:text-gold-200 border-gold-200 dark:border-celestial-border hover:bg-gold-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Data Management & Privacy */}
      <div className="liquid-glass rounded-2xl p-5 border border-gold-200/90 dark:border-celestial-border shadow-royal space-y-3">
        <h3 className="text-sm font-bold font-hindi text-maroon-900 dark:text-gold-200 flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-maroon-700 dark:text-gold-400" />
          <span>गोपनीयता एवं डेटा सुरक्षा (Data & Privacy)</span>
        </h3>
        <p className="text-xs text-spiritual-muted dark:text-gray-300 font-hindi">
          आपकी सभी अनुभूतियाँ और डायरी रिकॉर्ड्स पूर्णतः आपके अपने ब्राउज़र में सुरक्षित हैं। कोई भी व्यक्तिगत डेटा किसी बाहरी सर्वर पर संग्रहीत नहीं होता।
        </p>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={onExportData}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-ivory-100 dark:bg-celestial-surface text-maroon-800 dark:text-gold-200 border border-gold-300 dark:border-gold-700 rounded-xl text-xs font-hindi font-medium hover:bg-gold-50"
          >
            <Download className="w-3.5 h-3.5 text-gold-700" />
            <span>बैकअप डाउनलोड</span>
          </button>

          <label className="flex items-center justify-center gap-1.5 px-3 py-2 bg-ivory-100 dark:bg-celestial-surface text-maroon-800 dark:text-gold-200 border border-gold-300 dark:border-gold-700 rounded-xl text-xs font-hindi font-medium hover:bg-gold-50 cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-gold-700" />
            <span>बैकअप रिस्टोर</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>
        </div>

        <button
          onClick={onResetData}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl text-xs font-hindi transition-colors pt-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>सभी डेटा रीसेट करें (Reset Everything)</span>
        </button>
      </div>

      {/* Swarajya Declaration Modal */}
      {showDeclarationModal && (
        <SwarajyaDeclarationModal
          profile={profile}
          onUpdateSignature={handleUpdateSignature}
          onClose={() => setShowDeclarationModal(false)}
        />
      )}
    </div>
  );
};
