import React from 'react';
import { Home, Compass, Award, BookOpen, ShieldCheck, MapPin } from 'lucide-react';
import { sound } from '../utils/audio';

export type RoyalTabType = 'today' | 'checkpoints' | 'route' | 'stamps' | 'journal' | 'passport';

interface NavbarProps {
  activeTab: RoyalTabType;
  setActiveTab: (tab: RoyalTabType) => void;
  unlockedStampsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  unlockedStampsCount = 0,
}) => {
  const tabs: {
    id: RoyalTabType;
    labelHi: string;
    labelEn: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'today', labelHi: 'Today', labelEn: 'Today', icon: Home },
    { id: 'checkpoints', labelHi: 'Checkpoints', labelEn: 'Explore', icon: Compass },
    { id: 'route', labelHi: 'Route', labelEn: 'Route', icon: MapPin },
    { id: 'stamps', labelHi: 'Stamps', labelEn: 'Stamps', icon: Award },
    { id: 'journal', labelHi: 'Journal', labelEn: 'Journal', icon: BookOpen },
    { id: 'passport', labelHi: 'Passport', labelEn: 'Passport', icon: ShieldCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#160614]/95 dark:bg-[#0A0208]/95 backdrop-blur-xl border-t border-amber-500/30 shadow-[0_-5px_25px_rgba(0,0,0,0.7)]">
      <div className="max-w-md mx-auto px-2 py-1.5 flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playChime();
                setActiveTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all duration-200 rounded-xl ${
                isActive
                  ? 'text-amber-300 font-bold scale-105'
                  : 'text-amber-200/50 hover:text-amber-200'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : ''
                }`}
              >
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'
                  }`}
                />
              </div>

              <span
                className={`text-[9px] sm:text-[10px] mt-0.5 tracking-tight font-serif ${
                  isActive ? 'text-amber-300 font-bold' : 'text-amber-200/60'
                }`}
              >
                {tab.labelEn}
              </span>

              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5 shadow-[0_0_8px_#F59E0B]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
