import React from 'react';
import { UserProfile, DailyPracticeState, MurliContentItem, SanskarGoal } from '../../types';
import { HigherSelfCard } from './HigherSelfCard';
import { DailyChecklist } from './DailyChecklist';
import { MurliCard } from './MurliCard';
import { RescueQuickAccess } from './RescueQuickAccess';
import { ActiveSanskarCard } from './ActiveSanskarCard';
import { WeeklyStats } from './WeeklyStats';

interface HomeViewProps {
  profile: UserProfile;
  practice: DailyPracticeState;
  dailyMurli: MurliContentItem;
  activeGoal?: SanskarGoal;
  rescueCount: number;
  reflectionsCount: number;
  onTogglePracticeItem: (key: keyof DailyPracticeState) => void;
  onNavigateTab: (tab: 'practice' | 'rescue' | 'progress' | 'profile') => void;
  onSelectRescueSituation: (situationId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  practice,
  dailyMurli,
  activeGoal,
  rescueCount,
  reflectionsCount,
  onTogglePracticeItem,
  onNavigateTab,
  onSelectRescueSituation,
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'शुभ प्रभात';
    if (hour < 17) return 'शुभ दोपहर';
    return 'शुभ संध्या';
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Home Header Greeting */}
      <div className="pt-2">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-hindi text-maroon-900 tracking-tight">
            {getGreeting()}, {profile.name}
          </h2>
          <span className="text-xs font-serif font-bold text-gold-700 bg-gold-100/80 px-2 py-0.5 rounded-md border border-gold-300/60">
            राजाई साथी
          </span>
        </div>
        <p className="text-xs text-spiritual-muted font-hindi mt-0.5">
          आज स्वयं को याद दिलाएं — मैं कौन हूँ।
        </p>
      </div>

      {/* 1. Higher Self Identity Card */}
      <HigherSelfCard profile={profile} />

      {/* 2. Daily Purusharth Checklist */}
      <DailyChecklist
        practice={practice}
        onToggleItem={onTogglePracticeItem}
        onNavigatePractice={() => onNavigateTab('practice')}
      />

      {/* 3. Daily Murli Dharana */}
      <MurliCard
        item={dailyMurli}
        onNavigateLibrary={() => onNavigateTab('practice')}
      />

      {/* 4. Royal Rescue Shortcut */}
      <RescueQuickAccess
        onSelectSituation={onSelectRescueSituation}
        onOpenRescueTab={() => onNavigateTab('rescue')}
      />

      {/* 5. My Sanskar Goal */}
      <ActiveSanskarCard
        goal={activeGoal}
        onNavigateSanskarLab={() => onNavigateTab('progress')}
      />

      {/* 6. Weekly Reflection Stats */}
      <WeeklyStats
        consistencyDays={Math.max(1, activeGoal?.practiceDays || 1)}
        rescueCount={rescueCount}
        reflectionsCount={reflectionsCount}
        activeQualitiesCount={profile.selectedQualities?.length || 3}
        onOpenProgress={() => onNavigateTab('progress')}
      />
    </div>
  );
};
