import React from 'react';
import { Compass, Sparkles, LifeBuoy, Flower2, ShieldCheck, MessageCircleHeart } from 'lucide-react';

export type TabType = 'journey' | 'baba-ai' | 'rescue' | 'altar' | 'profile' | 'settings' | 'home' | 'practice' | 'progress';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: 'hi' | 'en' | 'hinglish';
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, language }) => {
  const tabs: { id: TabType; labelHi: string; labelEn: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'journey', labelHi: '30 दिन यात्रा', labelEn: '30-Day Journey', icon: Compass },
    { id: 'baba-ai', labelHi: 'बाबा से मिलन', labelEn: 'Baba AI', icon: MessageCircleHeart },
    { id: 'rescue', labelHi: 'रेस्क्यू', labelEn: 'Rescue', icon: LifeBuoy },
    { id: 'altar', labelHi: 'साधना वेदी', labelEn: 'My Altar', icon: Flower2 },
    { id: 'profile', labelHi: 'पासपोर्ट', labelEn: 'Passport', icon: ShieldCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#160614]/95 dark:bg-[#0A0208]/95 backdrop-blur-xl border-t border-amber-500/30 shadow-[0_-5px_25px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto px-2 py-1.5 flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isBabaAI = tab.id === 'baba-ai';

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all duration-300 rounded-xl ${
                isBabaAI
                  ? isActive
                    ? 'text-amber-300 font-bold scale-105'
                    : 'text-amber-400 hover:text-amber-200'
                  : isActive
                  ? 'text-amber-300 font-bold scale-105'
                  : 'text-gray-400 hover:text-amber-200'
              }`}
            >
              {/* Highlight prominent badge for Baba AI */}
              {isBabaAI ? (
                <div
                  className={`w-11 h-11 -mt-6 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-amber-300 text-maroon-950 ring-2 ring-amber-300 shadow-amber-500/40 scale-110 animate-pulse'
                      : 'bg-gradient-to-tr from-amber-600 to-rose-700 text-amber-100 hover:scale-105'
                  }`}
                >
                  <Icon className="w-5 h-5 fill-current" />
                </div>
              ) : (
                <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-amber-500/20 text-amber-300' : ''}`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                </div>
              )}

              <span className={`text-[10px] mt-0.5 tracking-tight font-hindi ${
                isActive ? 'text-amber-300 font-bold' : 'text-gray-400'
              }`}>
                {language === 'en' ? tab.labelEn : tab.labelHi}
              </span>

              {isActive && !isBabaAI && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5 shadow-[0_0_8px_#F59E0B]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
