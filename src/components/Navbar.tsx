import React from 'react';
import { Home, Sparkles, LifeBuoy, TrendingUp, UserCheck } from 'lucide-react';

export type TabType = 'home' | 'practice' | 'rescue' | 'progress' | 'profile' | 'settings';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: 'hi' | 'en' | 'hinglish';
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, language }) => {
  const tabs: { id: TabType; labelHi: string; labelEn: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', labelHi: 'होम', labelEn: 'Home', icon: Home },
    { id: 'practice', labelHi: 'अभ्यास', labelEn: 'Practice', icon: Sparkles },
    { id: 'rescue', labelHi: 'रेस्क्यू', labelEn: 'Rescue', icon: LifeBuoy },
    { id: 'progress', labelHi: 'प्रगति', labelEn: 'Progress', icon: TrendingUp },
    { id: 'profile', labelHi: 'प्रोफ़ाइल', labelEn: 'Profile', icon: UserCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gold-200 shadow-royal">
      <div className="max-w-md mx-auto px-2 py-1.5 flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isRescue = tab.id === 'rescue';

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all duration-200 rounded-xl ${
                isRescue
                  ? isActive
                    ? 'text-maroon-700 font-bold scale-105'
                    : 'text-maroon-600 hover:text-maroon-700'
                  : isActive
                  ? 'text-maroon-700 font-bold'
                  : 'text-spiritual-muted hover:text-spiritual-dark'
              }`}
            >
              {/* Highlight badge for rescue */}
              {isRescue && (
                <div
                  className={`w-10 h-10 -mt-5 rounded-full flex items-center justify-center shadow-md transition-all ${
                    isActive
                      ? 'bg-maroon-700 text-gold-300 ring-2 ring-gold-400'
                      : 'bg-maroon-600 text-gold-100 hover:bg-maroon-700'
                  }`}
                >
                  <Icon className="w-5 h-5 animate-pulse" />
                </div>
              )}

              {!isRescue && (
                <div className={`p-1 rounded-lg ${isActive ? 'bg-maroon-50' : ''}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                </div>
              )}

              <span
                className={`text-[11px] mt-0.5 tracking-tight font-hindi ${
                  isActive ? 'font-bold text-maroon-700' : 'font-medium'
                }`}
              >
                {language === 'en' ? tab.labelEn : tab.labelHi}
              </span>

              {isActive && !isRescue && (
                <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
