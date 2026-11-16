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
import {
  Sparkles,
  RotateCw,
  Volume2,
  HelpCircle,
  Flame,
  ArrowRight,
  Sun,
  Shield,
  Heart
} from 'lucide-react';
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
  onOpenAskBaba: () => void;
  onUpdateProfile?: (profile: UserProfile) => void;
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
  onOpenAskBaba,
  onUpdateProfile,
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
    tts.toggle(`बापदादा का संदेश: ${msg.messageText}। वरदान: ${msg.blessingVardan}`, 'hi');
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
          className="px-3 py-2 bg-gradient-to-r from-amber-500 via-gold-400 to-amber-500 hover:from-amber-400 text-maroon-950 font-bold rounded-2xl shadow-md text-xs font-hindi flex items-center gap-1.5 transition-all transform active:scale-95 ring-2 ring-amber-300/60 animate-shimmer"
        >
          <Sparkles className="w-3.5 h-3.5 text-maroon-900 animate-pulse" />
          <span>श्रेष्ठ स्वरूप दर्शन</span>
        </button>
      </div>

      {/* 1. BABADADA'S SACRED BLESSING & MESSAGE CARD (NO TEACHER NAME) */}
      {unreadMessage && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-[#2B0B22] via-[#3B0F2F] to-[#1F0818] text-white border-2 border-amber-400/70 shadow-xl shadow-rose-950/20 space-y-2 relative overflow-hidden animate-in fade-in duration-300">
          {/* Subtle sparkling backdrop effect */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-lg animate-bounce">👑</span>
              <span className="text-xs font-serif font-black text-amber-200 tracking-wider flex items-center gap-1 font-hindi">
                <span>बापदादा का पावन संदेश एवं दृष्टि</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleReadMessageTTS(unreadMessage)}
                title="संदेश सुनें (Listen Voice)"
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              {!unreadMessage.read && (
                <button
                  onClick={() => onMarkMessageRead(unreadMessage.id)}
                  title="स्वीकार किया"
                  className="text-[10px] bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2 py-0.5 rounded-full font-serif font-bold shadow-xs hover:opacity-90"
                >
                  ✓ स्वीकारें
                </button>
              )}
            </div>
          </div>

          <p className="text-xs font-hindi text-amber-50 italic leading-relaxed relative z-10 pl-1 border-l-2 border-amber-400/50">
            "{unreadMessage.messageText}"
          </p>

          <div className="pt-2 border-t border-amber-500/30 flex items-center justify-between text-[11px] font-hindi relative z-10">
            <span className="text-amber-300 font-semibold flex items-center gap-1">
              <span>✨</span>
              <span>वरदान: {unreadMessage.blessingVardan}</span>
            </span>
            <span className="text-[10px] text-amber-400/70 font-sans">{unreadMessage.sentAt}</span>
          </div>
        </div>
      )}

      {/* 2. ASK BABA AI (बाबा से पूछें) — COLORFUL ANIMATED FEATURE CARD */}
      <div
        onClick={() => {
          sound.playTibetanBowl();
          onOpenAskBaba();
        }}
        className="p-4 rounded-3xl bg-gradient-to-r from-[#9B1B30] via-[#851E4E] to-[#5B1373] text-white border-2 border-amber-300/60 shadow-xl shadow-purple-950/25 cursor-pointer hover:scale-[1.015] active:scale-[0.985] transition-all relative overflow-hidden group"
      >
        {/* Floating Light Glows */}
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-28 h-28 bg-amber-400/25 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
        <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-24 h-24 bg-rose-400/20 rounded-full blur-xl" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 p-0.5 shadow-md flex items-center justify-center">
                <span className="text-base">✨</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-black text-sm tracking-wide text-amber-100 flex items-center gap-1">
                    <span>बाबा से पूछें</span>
                    <span className="text-[9px] bg-amber-400 text-maroon-950 font-black px-1.5 py-0.2 rounded-full font-sans uppercase">
                      Free AI
                    </span>
                  </h3>
                </div>
                <p className="text-[11px] text-amber-200/90 font-hindi">
                  मन की कोई भी उलझन या प्रश्न सीधे बाबा के आगे रखें
                </p>
              </div>
            </div>
          </div>

          <div className="w-8 h-8 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4 text-amber-200" />
          </div>
        </div>

        {/* Quick Topics Pills */}
        <div className="relative z-10 flex items-center gap-1.5 mt-3 pt-2 border-t border-white/15 overflow-x-auto scrollbar-none text-[10px] font-hindi">
          <span className="px-2 py-0.5 rounded-full bg-white/15 text-amber-100 whitespace-nowrap">
            🕊️ मन शांत कैसे रखें?
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/15 text-amber-100 whitespace-nowrap">
            🔥 क्रोध निवारण
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/15 text-amber-100 whitespace-nowrap">
            ☀️ अमृतवेला
          </span>
        </div>
      </div>

      {/* 3. Higher Self Identity Card */}
      <HigherSelfCard profile={profile} />

      {/* 4. DIVINE INTERACTIVE TWIN MODULES (SPIN WHEEL & GUIDANCE CARD) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Spin Wheel Card (Rich Gold & Coral Jewel Gradient) */}
        <div
          onClick={() => {
            sound.playSoftClick();
            setShowSpinModal(true);
          }}
          className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/15 via-gold-100/60 to-amber-200/40 dark:from-[#2D1606]/80 dark:to-[#1B0C04] border-2 border-amber-400/60 dark:border-amber-500/30 shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center text-lg mb-2 shadow-md shadow-amber-500/30 group-hover:rotate-12 transition-transform">
              🎡
            </div>
            <h4 className="text-xs sm:text-sm font-bold font-hindi text-maroon-900 dark:text-amber-100 leading-tight">
              आज का स्वमान चक्र
            </h4>
            <p className="text-[10px] text-spiritual-muted dark:text-amber-300/80 font-hindi mt-1">
              {spinRewardToday ? `प्राप्त: ${spinRewardToday.titleHi}` : 'चक्र घुमाकर स्वमान प्राप्त करें →'}
            </p>
          </div>
          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 font-serif mt-3 flex items-center gap-1">
            <span>SPIN WHEEL</span>
            <span>✦</span>
          </span>
        </div>

        {/* Daily Guidance Oracle Card (Rich Amethyst & Rose Jewel Gradient) */}
        <div
          onClick={() => {
            sound.playSoftClick();
            setShowCardModal(true);
          }}
          className="p-4 rounded-3xl bg-gradient-to-br from-purple-500/15 via-rose-100/60 to-purple-200/40 dark:from-[#28092B]/80 dark:to-[#170519] border-2 border-purple-400/60 dark:border-purple-500/30 shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 text-white flex items-center justify-center text-lg mb-2 shadow-md shadow-purple-500/30 group-hover:rotate-12 transition-transform">
              🃏
            </div>
            <h4 className="text-xs sm:text-sm font-bold font-hindi text-maroon-900 dark:text-purple-100 leading-tight">
              ईश्वरीय सन्देश कार्ड
            </h4>
            <p className="text-[10px] text-spiritual-muted dark:text-purple-300/80 font-hindi mt-1">
              बाबा का आज का व्यक्तिगत सन्देश →
            </p>
          </div>
          <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 font-serif mt-3 flex items-center gap-1">
            <span>DAILY ORACLE</span>
            <span>✦</span>
          </span>
        </div>
      </div>

      {/* 5. Daily Purusharth Checklist */}
      <DailyChecklist
        practice={practice}
        onToggleItem={onTogglePracticeItem}
        onNavigatePractice={() => onNavigateTab('practice')}
      />

      {/* 6. Daily Murli Dharana */}
      <MurliCard
        item={dailyMurli}
        onNavigateLibrary={() => onNavigateTab('practice')}
      />

      {/* 7. Royal Rescue Shortcut */}
      <RescueQuickAccess
        onSelectSituation={onSelectRescueSituation}
        onOpenRescueTab={() => onNavigateTab('rescue')}
      />

      {/* 8. My Sanskar Goal */}
      <ActiveSanskarCard
        goal={activeGoal}
        onNavigateSanskarLab={() => onNavigateTab('progress')}
      />

      {/* 9. Weekly Reflection Stats */}
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
          onUpdateProfile={onUpdateProfile}
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
