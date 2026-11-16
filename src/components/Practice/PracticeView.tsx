import React, { useState } from 'react';
import { DailyPracticeState, NightReflectionRecord } from '../../types';
import { MorningRemembrance } from './MorningRemembrance';
import { MurliLibrary } from './MurliLibrary';
import { TodayChallenge } from './TodayChallenge';
import { NightReflection } from './NightReflection';
import { Sun, BookOpen, Target, Moon } from 'lucide-react';

interface PracticeViewProps {
  practice: DailyPracticeState;
  onToggleItem: (key: keyof DailyPracticeState) => void;
  onSaveNightReflection: (record: NightReflectionRecord) => void;
  existingReflection?: NightReflectionRecord;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  practice,
  onToggleItem,
  onSaveNightReflection,
  existingReflection,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'morning' | 'murli' | 'challenge' | 'night'>('morning');

  const subTabs = [
    { id: 'morning', labelHi: 'प्रातः स्वमान', icon: Sun, isDone: practice.swamanCompleted },
    { id: 'murli', labelHi: 'मुरली धारणा', icon: BookOpen, isDone: practice.murliCompleted },
    { id: 'challenge', labelHi: 'दैनिक अभ्यास', icon: Target, isDone: practice.challengeCompleted },
    { id: 'night', labelHi: 'रात्रि चेकिंग', icon: Moon, isDone: practice.reflectionCompleted },
  ];

  return (
    <div className="space-y-4 pb-20">
      <div>
        <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold">
          दैनिक पुरुषार्थ साधना
        </span>
        <h2 className="text-xl sm:text-2xl font-bold font-hindi text-maroon-900 tracking-tight">
          दैनिक अभ्यास (Practice)
        </h2>
        <p className="text-xs text-spiritual-muted font-hindi">
          प्रातः स्वमान से लेकर रात्रि स्व-चेकिंग तक का क्रमबद्ध पुरुषार्थ।
        </p>
      </div>

      {/* Sub-tab Pill Navigation */}
      <div className="grid grid-cols-4 gap-1.5 bg-ivory-100 p-1.5 rounded-2xl border border-gold-200">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
              className={`py-2 px-1 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                isActive
                  ? 'bg-maroon-700 text-gold-100 font-bold shadow-xs'
                  : 'text-spiritual-dark hover:bg-gold-50 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className="w-4 h-4 mb-0.5" />
                {tab.isDone && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                )}
              </div>
              <span className="text-[10px] font-hindi whitespace-nowrap">{tab.labelHi}</span>
            </button>
          );
        })}
      </div>

      {/* Active Practice Screen */}
      {activeSubTab === 'morning' && (
        <MorningRemembrance
          isCompleted={practice.swamanCompleted}
          onComplete={() => onToggleItem('swamanCompleted')}
        />
      )}

      {activeSubTab === 'murli' && (
        <MurliLibrary />
      )}

      {activeSubTab === 'challenge' && (
        <TodayChallenge
          isCompleted={practice.challengeCompleted}
          onComplete={() => onToggleItem('challengeCompleted')}
        />
      )}

      {activeSubTab === 'night' && (
        <NightReflection
          onSaveReflection={(record) => {
            onSaveNightReflection(record);
            onToggleItem('reflectionCompleted');
          }}
          existingReflection={existingReflection}
        />
      )}
    </div>
  );
};
