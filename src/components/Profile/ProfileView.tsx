import React, { useState } from 'react';
import { UserProfile, Language } from '../../types';
import { PassportCard } from './PassportCard';
import { SwarajyaDeclarationModal } from './SwarajyaDeclarationModal';
import {
  Bell,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Shield,
  CheckCircle,
  HelpCircle
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
  const [selectedNotificationPreview, setSelectedNotificationPreview] = useState<string | null>(null);

  const notifications = [
    {
      key: 'amritvela',
      titleHi: 'अमृतवेला स्मरण (04:00 AM)',
      msgHi: 'अमृतवेले के कुछ पल स्वयं को पहचानने और बाबा की याद में स्थित होने के लिए।',
    },
    {
      key: 'morning',
      titleHi: 'प्रातः स्वमान (06:00 AM)',
      msgHi: 'आज का दिन अपने श्रेष्ठ स्वरूप की स्मृति से शुरू करें।',
    },
    {
      key: 'afternoon',
      titleHi: 'दोपहर ट्रैफिक कंट्रोल (12:00 PM)',
      msgHi: 'एक पल रुकें। क्या अभी आपकी स्थिति परिस्थिति से ऊपर है?',
    },
    {
      key: 'evening',
      titleHi: 'संध्याकालीन योग (07:00 PM)',
      msgHi: 'आज किसी एक परिस्थिति में अपने श्रेष्ठ संस्कार का अभ्यास करें।',
    },
    {
      key: 'night',
      titleHi: 'रात्रि स्व-चेकिंग (09:30 PM)',
      msgHi: 'आज स्वयं से मिलें। दिनभर के पुरुषार्थ का शांत मन से निरीक्षण करें।',
    },
  ];

  const handleToggleReminder = (key: keyof UserProfile['reminderPreferences']) => {
    sound.playSoftClick();
    const updated = {
      ...profile,
      reminderPreferences: {
        ...profile.reminderPreferences,
        [key]: !profile.reminderPreferences[key],
      },
    };
    onUpdateProfile(updated);
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
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold">
            आध्यात्मिक परिचय • SWARAJYA PASSPORT
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-hindi text-maroon-900 tracking-tight">
            मेरा आध्यात्मिक प्रोफ़ाइल
          </h2>
          <p className="text-xs text-spiritual-muted font-hindi">
            मेरी राजाई पहचान, स्वराज्य घोषणा-पत्र एवं सेटिंग्स।
          </p>
        </div>
        <button
          onClick={onOpenSettings}
          className="px-3 py-1.5 bg-ivory-100 hover:bg-gold-100 text-maroon-900 border border-gold-300 rounded-xl text-xs font-bold font-hindi flex items-center gap-1 shadow-2xs"
        >
          <span>⚙️ सेटिंग्स</span>
        </button>
      </div>

      {/* The Royal Passport Component */}
      <PassportCard
        profile={profile}
        onOpenDeclaration={() => {
          sound.playSoftClick();
          setShowDeclarationModal(true);
        }}
        onOpenSettings={onOpenSettings}
      />

      {/* My Higher Self & Swaman Details */}
      <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-3">
        <h3 className="text-sm font-bold font-hindi text-maroon-900 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-gold-600" />
          <span>मेरे सक्रिय श्रेष्ठ स्वरूप (My Higher Self)</span>
        </h3>

        <div className="flex flex-wrap gap-2">
          {profile.selectedQualities.map((q) => (
            <span
              key={q}
              className="px-3 py-1 bg-ivory-100 text-maroon-900 border border-gold-300 rounded-xl text-xs font-hindi font-semibold"
            >
              👑 {q}
            </span>
          ))}
        </div>

        <div className="pt-2 border-t border-gold-100 text-xs font-hindi text-spiritual-dark space-y-1">
          <div>
            <strong>मुख्य संस्कार लक्ष्य: </strong>
            <span>{profile.primarySanskarGoal}</span>
          </div>
        </div>

        <button
          onClick={onRetakeOnboarding}
          className="text-xs text-maroon-700 font-bold font-hindi hover:underline pt-1 block"
        >
          आध्यात्मिक स्वरूप व लक्ष्य पुनः निर्धारित करें (Edit Goals) →
        </button>
      </div>

      {/* Preferences & Notifications */}
      <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-hindi text-maroon-900 flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-maroon-700" />
            <span>दैनिक सजगता स्मरण (Spiritual Reminders)</span>
          </h3>
          <span className="text-[10px] text-emerald-700 font-serif font-bold">Non-guilt</span>
        </div>

        {/* Language selector */}
        <div>
          <label className="block text-xs font-semibold text-spiritual-dark mb-1 font-hindi">
            भाषा प्राथमिकता (Language)
          </label>
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
        </div>

        {/* Gentle Notification Checklist with Instant Previews */}
        <div className="space-y-2">
          {notifications.map((notif) => {
            const isEnabled = profile.reminderPreferences[notif.key as keyof UserProfile['reminderPreferences']];
            return (
              <div
                key={notif.key}
                className="p-3 bg-ivory-50/60 rounded-xl border border-gold-200 flex items-start justify-between gap-2"
              >
                <div className="min-w-0">
                  <span className="text-xs font-bold font-hindi text-maroon-900 block">
                    {notif.titleHi}
                  </span>
                  <p className="text-[11px] text-spiritual-muted font-hindi mt-0.5 italic">
                    "{notif.msgHi}"
                  </p>
                </div>
                <button
                  onClick={() => handleToggleReminder(notif.key as keyof UserProfile['reminderPreferences'])}
                  className={`text-[10px] font-serif font-bold px-2 py-1 rounded-lg border transition-all flex-shrink-0 ${
                    isEnabled
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-spiritual-muted border-gold-300'
                  }`}
                >
                  {isEnabled ? 'सक्रिय' : 'बंद'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Management & Privacy */}
      <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-3">
        <h3 className="text-sm font-bold font-hindi text-maroon-900 flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-maroon-700" />
          <span>गोपनीयता एवं डेटा सुरक्षा (Data & Privacy)</span>
        </h3>
        <p className="text-xs text-spiritual-muted font-hindi">
          आपकी सभी अनुभूतियाँ और डायरी रिकॉर्ड्स पूर्णतः आपके अपने ब्राउज़र में सुरक्षित हैं।
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onExportData}
            className="py-2.5 px-3 bg-ivory-100 hover:bg-gold-100 text-maroon-800 border border-gold-300 rounded-xl text-xs font-bold font-hindi flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>बैकअप डाउनलोड (Export)</span>
          </button>

          <label className="py-2.5 px-3 bg-ivory-100 hover:bg-gold-100 text-maroon-800 border border-gold-300 rounded-xl text-xs font-bold font-hindi flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center">
            <Upload className="w-3.5 h-3.5" />
            <span>बैकअप लोड (Import)</span>
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
          className="w-full py-2 text-rose-700 hover:text-rose-900 text-xs font-semibold font-hindi transition-colors flex items-center justify-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>डेमो डेटा रीसेट करें (Reset to Default)</span>
        </button>
      </div>

      {/* Swarajya Declaration Modal */}
      {showDeclarationModal && (
        <SwarajyaDeclarationModal
          profile={profile}
          onUpdateSignature={(name, date) => {
            onUpdateProfile({ ...profile, signatureName: name, signedDate: date });
            setShowDeclarationModal(false);
          }}
          onClose={() => setShowDeclarationModal(false)}
        />
      )}
    </div>
  );
};
