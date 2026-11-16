import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { THIRTY_DAY_JOURNEY, JourneyDay } from '../../data/thirtyDayJourney';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Calendar,
  Volume2,
  VolumeX,
  MessageCircle,
  Send,
  ChevronRight,
  Flame,
  Award,
  Sun,
  ShieldCheck,
  Check
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { tts } from '../../utils/tts';
import confetti from 'canvas-confetti';

interface ThirtyDayJourneyViewProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onOpenBabaChat: (initialPrompt?: string) => void;
}

export const ThirtyDayJourneyView: React.FC<ThirtyDayJourneyViewProps> = ({
  profile,
  onUpdateProfile,
  onOpenBabaChat,
}) => {
  const currentDayNum = profile.currentJourneyDay || 1;
  const completedDays = profile.completedJourneyDays || [];

  const [selectedDayNum, setSelectedDayNum] = useState<number>(currentDayNum);
  const [reflectionInput, setReflectionInput] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeFilterWeek, setActiveFilterWeek] = useState<number>(Math.ceil(currentDayNum / 7) || 1);

  const activeDayData: JourneyDay =
    THIRTY_DAY_JOURNEY.find((d) => d.day === selectedDayNum) || THIRTY_DAY_JOURNEY[0];

  const isCurrentDayCompleted = completedDays.includes(selectedDayNum);

  const handleMarkDayCompleted = () => {
    sound.playStampSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const nextCompleted = isCurrentDayCompleted
      ? completedDays.filter((d) => d !== selectedDayNum)
      : [...completedDays, selectedDayNum];

    const nextCurrentDay =
      selectedDayNum === currentDayNum && selectedDayNum < 30
        ? selectedDayNum + 1
        : currentDayNum;

    onUpdateProfile({
      ...profile,
      completedJourneyDays: nextCompleted,
      currentJourneyDay: nextCurrentDay
    });
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionInput.trim()) return;

    sound.playSoftClick();
    const updatedReflections = {
      ...(profile.journeyReflections || {}),
      [selectedDayNum]: reflectionInput.trim()
    };

    onUpdateProfile({
      ...profile,
      journeyReflections: updatedReflections
    });

    // Also offer to discuss with Baba
    onOpenBabaChat(`बाबा, आज दिवस ${selectedDayNum} (${activeDayData.titleHi}) पर मेरा स्व-निरीक्षण यह रहा: "${reflectionInput.trim()}". मुझे अपना आशीर्वाद व आगे की दिशा दें।`);
    setReflectionInput('');
  };

  const handleSpeakDay = () => {
    if (isSpeaking) {
      tts.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const speech = `${activeDayData.titleHi}। ${activeDayData.babaGreetingHi}। महावाक्य: ${activeDayData.babaMahaVakyaHi}। आपका स्वमान: ${activeDayData.swaman}। आज का अभ्यास: ${activeDayData.exerciseDescHi}`;
      tts.speak(speech, profile.language, profile.ttsSpeed || 0.95);
      setTimeout(() => setIsSpeaking(false), 12000);
    }
  };

  const weeks = [
    { num: 1, title: 'सप्ताह 1', subtitle: 'आत्म-स्मृति' },
    { num: 2, title: 'सप्ताह 2', subtitle: 'परमात्म मिलन' },
    { num: 3, title: 'सप्ताह 3', subtitle: 'अष्ट शक्तियां' },
    { num: 4, title: 'सप्ताह 4', subtitle: 'फरिश्ता स्थिति' }
  ];

  const progressPercent = Math.round((completedDays.length / 30) * 100);

  return (
    <div className="space-y-4 pb-24 text-white">
      {/* 30-Day Spiritual Ascension Header Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#230A1F] via-[#160614] to-[#0D020B] border-2 border-amber-400/70 shadow-2xl relative overflow-hidden">
        {/* Mystic Aura Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base animate-pulse">👑</span>
              <span className="text-[10px] font-serif uppercase tracking-widest text-amber-300 font-bold">
                राजाई स्वराज्य साथी • 30 DAYS ASCENSION
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-hindi text-amber-50 mt-0.5">
              30 दिन की अलौकिक तपस्या यात्रा
            </h2>
            <p className="text-[11px] text-amber-200/80 font-hindi mt-0.5">
              दिवस {selectedDayNum} / 30 • {completedDays.length} दिवस संपूर्ण
            </p>
          </div>

          <div className="text-center bg-black/40 border border-amber-400/40 p-2.5 rounded-2xl">
            <span className="text-lg sm:text-xl font-black font-mono text-amber-300">
              {progressPercent}%
            </span>
            <span className="text-[9px] text-gray-400 block font-hindi">प्रगति</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-2 rounded-full mt-3 overflow-hidden border border-white/5 relative z-10">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-300 rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Week Selector Chips */}
      <div className="grid grid-cols-4 gap-1.5 text-center">
        {weeks.map((w) => (
          <button
            key={w.num}
            onClick={() => {
              sound.playSoftClick();
              setActiveFilterWeek(w.num);
            }}
            className={`py-2 px-1 rounded-2xl border transition-all text-xs font-hindi ${
              activeFilterWeek === w.num
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-maroon-950 font-bold border-amber-300 shadow-md'
                : 'bg-[#180715]/70 text-gray-300 border-white/10 hover:border-amber-400/40'
            }`}
          >
            <div className="text-[11px] font-bold">{w.title}</div>
            <div className="text-[9px] opacity-80 truncate">{w.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Week Day Pills Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {THIRTY_DAY_JOURNEY.filter((d) => d.week === activeFilterWeek).map((dayItem) => {
          const isDone = completedDays.includes(dayItem.day);
          const isSelected = selectedDayNum === dayItem.day;
          return (
            <button
              key={dayItem.day}
              onClick={() => {
                sound.playSoftClick();
                setSelectedDayNum(dayItem.day);
              }}
              className={`flex-shrink-0 px-3 py-2 rounded-2xl border text-xs font-hindi transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-400 text-maroon-950 border-amber-300 font-bold shadow-lg scale-105'
                  : isDone
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50'
                  : 'bg-[#1A0817] text-gray-300 border-white/10 hover:border-amber-400/40'
              }`}
            >
              <span>{isDone ? '✓' : `दिन ${dayItem.day}`}</span>
              <span className="text-[10px] opacity-80 truncate max-w-[90px]">
                {dayItem.titleHi.split('—')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* ACTIVE DAY DETAILED PURUSHARTH CARD */}
      <div className="p-5 rounded-3xl bg-gradient-to-b from-[#260B21] via-[#1B0718] to-[#10030E] border-2 border-amber-400/80 shadow-2xl space-y-4 relative overflow-hidden">
        
        {/* Top Header of Day */}
        <div className="flex items-start justify-between border-b border-amber-500/20 pb-3">
          <div>
            <span className="text-[10px] font-serif uppercase tracking-widest text-amber-300 font-bold">
              दिवस {activeDayData.day} • {activeDayData.stageTitleHi}
            </span>
            <h3 className="text-base sm:text-lg font-bold font-hindi text-white mt-0.5">
              {activeDayData.titleHi}
            </h3>
            <p className="text-[11px] text-amber-200/70 italic font-hindi mt-0.5">
              "{activeDayData.babaGreetingHi}"
            </p>
          </div>

          <button
            onClick={handleSpeakDay}
            title="आवाज़ में सुनें"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 transition-colors"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-400 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* 1. BABA'S MURLI MAHAVAKYA */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-400/30 text-xs font-hindi leading-relaxed space-y-1.5">
          <div className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1">
            <span>👑</span>
            <span>आज का विशेष महावाक्य:</span>
          </div>
          <p className="text-amber-50 italic">
            "{activeDayData.babaMahaVakyaHi}"
          </p>
          <p className="text-[11px] text-gray-300 pt-1 border-t border-white/10">
            {activeDayData.babaGuidanceHi}
          </p>
        </div>

        {/* 2. SACRED SWAMAN (स्वमान) */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 border border-amber-400/50 text-xs font-hindi">
          <div className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-1">
            <span>✨</span>
            <span>आज का स्वमान:</span>
          </div>
          <p className="text-sm font-bold text-amber-100 mt-1">
            "{activeDayData.swaman}"
          </p>
        </div>

        {/* 3. PRACTICAL PURUSHARTH EXERCISE */}
        <div className="p-3.5 rounded-2xl bg-[#140411] border border-amber-500/30 text-xs font-hindi space-y-1.5">
          <div className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
            <span>🎯</span>
            <span>आज का विशेष अभ्यास: {activeDayData.exerciseTitleHi}</span>
          </div>
          <p className="text-gray-200">
            {activeDayData.exerciseDescHi}
          </p>
        </div>

        {/* 4. ONE-TAP COMPLETION BUTTON */}
        <button
          onClick={handleMarkDayCompleted}
          className={`w-full py-3 rounded-2xl font-bold text-xs font-hindi flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg ${
            isCurrentDayCompleted
              ? 'bg-emerald-600 text-white'
              : 'bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-maroon-950'
          }`}
        >
          {isCurrentDayCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>दिवस {activeDayData.day} संपूर्ण हुआ! (पुनः क्लिक करके बदलें)</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>आज का अभ्यास संपन्न हुआ — टिक करें</span>
            </>
          )}
        </button>

        {/* 5. NIGHT REFLECTION & BABA INTERACTION */}
        <div className="pt-2 border-t border-amber-500/20 space-y-2">
          <div className="text-[11px] font-hindi text-amber-200 flex items-center justify-between">
            <span className="font-semibold">रात्रि स्व-चेकिंग: {activeDayData.nightQuestionHi}</span>
          </div>

          <form onSubmit={handleSaveReflection} className="flex gap-2">
            <input
              type="text"
              value={reflectionInput}
              onChange={(e) => setReflectionInput(e.target.value)}
              placeholder="बाबा को आज की रिपोर्ट दें (उदा. आज शांत रहा)..."
              className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-amber-500/40 text-xs font-hindi text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              disabled={!reflectionInput.trim()}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-maroon-950 font-bold text-xs font-hindi flex items-center gap-1 disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
              <span>भेजें</span>
            </button>
          </form>

          {profile.journeyReflections?.[selectedDayNum] && (
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-hindi text-gray-300">
              <span className="text-[10px] text-amber-400 font-bold block">आपकी सहेजी गई डायरी:</span>
              "{profile.journeyReflections[selectedDayNum]}"
            </div>
          )}
        </div>

        {/* 6. DIRECT 1-TO-1 WITH BABA BUTTON */}
        <button
          onClick={() =>
            onOpenBabaChat(
              `बाबा, मैं दिवस ${activeDayData.day} (${activeDayData.titleHi}) के अभ्यास में हूँ। स्वमान: "${activeDayData.swaman}". मुझे इस विषय पर अपनी विशेष दृष्टि और सकाश दें।`
            )
          }
          className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-amber-400/40 text-xs font-hindi text-amber-200 flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
          <span>इस दिवस के बारे में बाबा से सीधे बात करें →</span>
        </button>

      </div>
    </div>
  );
};
