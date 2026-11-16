import React, { useState } from 'react';
import {
  UserProfile,
  DailyPracticeState,
  MurliContentItem,
  SanskarGoal,
  TeacherMessage,
  DailyDivineCard,
  SpinReward,
} from '../../types';
import { HigherSelfCard } from './HigherSelfCard';
import { DailyChecklist } from './DailyChecklist';
import { MurliCard } from './MurliCard';
import { RescueQuickAccess } from './RescueQuickAccess';
import { ActiveSanskarCard } from './ActiveSanskarCard';
import { WeeklyStats } from './WeeklyStats';
import { HigherSelfViewerModal } from '../Divine/HigherSelfViewerModal';
import { DivineSpinWheel } from '../Divine/DivineSpinWheel';
import { DailyGuidanceCard } from '../Divine/DailyGuidanceCard';
import { Sparkles, RotateCw, HeartHandshake, Eye, MessageSquare, Volume2, X } from 'lucide-react';
import { sound } from '../../utils/audio';
import { tts } from '../../utils/tts';

interface HomeViewProps {
  profile: UserProfile;
  practice: DailyPracticeState;
  dailyMurli: MurliContentItem;
  activeGoal?: SanskarGoal;
  rescueCount: number;
  reflectionsCount: number;
  teacherMessages: TeacherMessage[];
  cardOfTheDay: DailyDivineCard;
  spinRewardToday: SpinReward | null;
  onSaveSpinReward: (reward: SpinReward) => void;
  onMarkMessageRead: (id: string) => void;
  onTogglePracticeItem: (key: keyof DailyPracticeState) => void;
  onNavigateTab: (tab: 'practice' | 'rescue' | 'progress' | 'profile' | 'settings') => void;
  onSelectRescueSituation: (situationId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  practice,
  dailyMurli,
  activeGoal,
  rescueCount,
  reflectionsCount,
  teacherMessages,
  cardOfTheDay,
  spinRewardToday,
  onSaveSpinReward,
  onMarkMessageRead,
  onTogglePracticeItem,
  onNavigateTab,
  onSelectRescueSituation,
}) => {
  const [showHigherSelfModal, setShowHigherSelfModal] = useState<boolean>(false);
  const [showSpinModal, setShowSpinModal] = useState<boolean>(false);
  const [showCardModal, setShowCardModal] = useState<boolean>(false);

  const unreadMessage = teacherMessages.find((m) => !m.read) || teacherMessages[0];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'शुभ प्रभात';
    if (hour < 17) return 'शुभ दोपहर';
    return 'शुभ संध्या';
  };

  const handleReadMessageTTS = (msg: TeacherMessage) => {
    tts.toggle(`${msg.fromTeacherName} का संदेश: ${msg.messageText}। वरदान: ${msg.blessingVardan}`, 'hi');
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Home Header Greeting with Liquid Glow */}
      <div className="pt-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-xl sm:text-2xl font-bold font-hindi text-maroon-900 dark:text-gold-100 tracking-tight">
              {getGreeting()}, {profile.name}
            </h2>
            <span className="text-[10px] font-serif font-bold text-gold-700 dark:text-gold-300 bg-gold-100/90 dark:bg-gold-950/80 px-2 py-0.5 rounded-full border border-gold-300/60 shadow-2xs">
              स्वराज्य
            </span>
          </div>
          <p className="text-xs text-spiritual-muted dark:text-gray-400 font-hindi mt-0.5">
            आज स्वयं को याद दिलाएं — मैं कौन हूँ।
          </p>
        </div>

        {/* Higher Self Vision Button */}
        <button
          onClick={() => {
            sound.playTibetanBowl();
            setShowHigherSelfModal(true);
          }}
          className="px-3 py-2 bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 text-maroon-950 font-bold rounded-2xl shadow-md text-xs font-hindi flex items-center gap-1.5 transition-all transform active:scale-95 ring-2 ring-gold-300/60"
        >
          <Sparkles className="w-3.5 h-3.5 text-maroon-900 animate-pulse" />
          <span>श्रेष्ठ स्वरूप दर्शन</span>
        </button>
      </div>

      {/* 1. TEACHER BLESSING / PERSONAL MESSAGE CARD (IF AVAILABLE) */}
      {unreadMessage && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-950 text-white border-2 border-gold-400/80 shadow-royal space-y-2 relative overflow-hidden animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">💌</span>
              <span className="text-xs font-serif font-bold text-gold-300 uppercase tracking-wider">
                {unreadMessage.fromTeacherName} से दृष्टि
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleReadMessageTTS(unreadMessage)}
                title="संदेश सुनें"
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-gold-200"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              {!unreadMessage.read && (
                <button
                  onClick={() => onMarkMessageRead(unreadMessage.id)}
                  title="स्वीकार किया"
                  className="text-[10px] bg-emerald-600/80 px-2 py-0.5 rounded-full font-serif font-bold"
                >
                  ✓ स्वीकारें
                </button>
              )}
            </div>
          </div>

          <p className="text-xs font-hindi text-gold-100 italic leading-relaxed">
            "{unreadMessage.messageText}"
          </p>

          <div className="pt-1.5 border-t border-gold-400/30 flex items-center justify-between text-[11px] font-hindi">
            <span className="text-gold-300 font-semibold">
              वरदान: {unreadMessage.blessingVardan}
            </span>
            <span className="text-[10px] text-gold-400/70">{unreadMessage.sentAt}</span>
          </div>
        </div>
      )}

      {/* 2. Higher Self Identity Card */}
      <HigherSelfCard profile={profile} />

      {/* 3. DIVINE INTERACTIVE TWIN MODULES (SPIN WHEEL & GUIDANCE CARD) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Spin Wheel Card */}
        <div
          onClick={() => {
            sound.playSoftClick();
            setShowSpinModal(true);
          }}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-gold-100/90 via-white to-gold-50/70 dark:from-maroon-900/80 dark:to-maroon-950 border border-gold-300/80 shadow-royal cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-800 dark:text-gold-300 flex items-center justify-center text-base mb-1.5">
              🎡
            </div>
            <h4 className="text-xs sm:text-sm font-bold font-hindi text-maroon-900 dark:text-gold-100 leading-tight">
              आज का स्वमान चक्र
            </h4>
            <p className="text-[10px] text-spiritual-muted dark:text-gray-400 font-hindi mt-0.5">
              {spinRewardToday ? `प्राप्त: ${spinRewardToday.titleHi}` : 'चक्र घुमाकर स्वमान प्राप्त करें →'}
            </p>
          </div>
          <span className="text-[10px] font-bold text-maroon-700 dark:text-gold-300 font-serif mt-2">
            SPIN WHEEL ✦
          </span>
        </div>

        {/* Daily Guidance Oracle Card */}
        <div
          onClick={() => {
            sound.playSoftClick();
            setShowCardModal(true);
          }}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-maroon-50 via-white to-maroon-100/50 dark:from-maroon-900/80 dark:to-maroon-950 border border-maroon-200 dark:border-gold-800 shadow-royal cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-full bg-maroon-700/10 text-maroon-800 dark:text-gold-300 flex items-center justify-center text-base mb-1.5">
              🃏
            </div>
            <h4 className="text-xs sm:text-sm font-bold font-hindi text-maroon-900 dark:text-gold-100 leading-tight">
              ईश्वरीय सन्देश कार्ड
            </h4>
            <p className="text-[10px] text-spiritual-muted dark:text-gray-400 font-hindi mt-0.5">
              बाबा का आज का व्यक्तिगत सन्देश →
            </p>
          </div>
          <span className="text-[10px] font-bold text-gold-700 dark:text-gold-300 font-serif mt-2">
            DAILY ORACLE ✦
          </span>
        </div>
      </div>

      {/* 4. Daily Purusharth Checklist */}
      <DailyChecklist
        practice={practice}
        onToggleItem={onTogglePracticeItem}
        onNavigatePractice={() => onNavigateTab('practice')}
      />

      {/* 5. Daily Murli Dharana */}
      <MurliCard
        item={dailyMurli}
        onNavigateLibrary={() => onNavigateTab('practice')}
      />

      {/* 6. Royal Rescue Shortcut */}
      <RescueQuickAccess
        onSelectSituation={onSelectRescueSituation}
        onOpenRescueTab={() => onNavigateTab('rescue')}
      />

      {/* 7. My Sanskar Goal */}
      <ActiveSanskarCard
        goal={activeGoal}
        onNavigateSanskarLab={() => onNavigateTab('progress')}
      />

      {/* 8. Weekly Reflection Stats */}
      <WeeklyStats
        consistencyDays={Math.max(1, activeGoal?.practiceDays || 1)}
        rescueCount={rescueCount}
        reflectionsCount={reflectionsCount}
        activeQualitiesCount={profile.selectedQualities?.length || 3}
        onOpenProgress={() => onNavigateTab('progress')}
      />

      {/* MODALS */}
      {showHigherSelfModal && (
        <HigherSelfViewerModal
          profile={profile}
          onClose={() => setShowHigherSelfModal(false)}
        />
      )}

      {showSpinModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="max-w-md w-full my-auto">
            <DivineSpinWheel
              onRewardWon={(reward) => {
                onSaveSpinReward(reward);
              }}
              savedReward={spinRewardToday}
              onClose={() => setShowSpinModal(false)}
            />
          </div>
        </div>
      )}

      {showCardModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="max-w-md w-full my-auto">
            <DailyGuidanceCard
              initialCard={cardOfTheDay}
              onClose={() => setShowCardModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
