import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  DailyPracticeState,
  SanskarGoal,
  RescueSessionRecord,
  NightReflectionRecord,
  PassportStamp,
  BaggageItem,
  Language,
  TeacherMessage,
  StudentProgressSummary,
  DailyDivineCard,
  SpinReward,
} from './types';
import { storage } from './utils/storage';
import { MURLI_LIBRARY } from './data/murliContent';
import { Header } from './components/Header';
import { Navbar, TabType } from './components/Navbar';
import { HomeView } from './components/Home/HomeView';
import { PracticeView } from './components/Practice/PracticeView';
import { RescueView } from './components/Rescue/RescueView';
import { ProgressView } from './components/Progress/ProgressView';
import { ProfileView } from './components/Profile/ProfileView';
import { SettingsView } from './components/Settings/SettingsView';
import { TeacherDashboard } from './components/Teacher/TeacherDashboard';
import { AskBabaAI } from './components/Divine/AskBabaAI';
import { PhoneLoginModal } from './components/Auth/PhoneLoginModal';
import { OnboardingModal } from './components/Onboarding/OnboardingModal';
import { Lock, ArrowLeft, KeyRound, ShieldCheck } from 'lucide-react';
import { sound } from './utils/audio';

export const App: React.FC = () => {
  // Core state from storage
  const [profile, setProfile] = useState<UserProfile>(() => storage.getProfile());
  const [practice, setPractice] = useState<DailyPracticeState>(() => storage.getDailyPractice());
  const [goals, setGoals] = useState<SanskarGoal[]>(() => storage.getSanskarGoals());
  const [stamps, setStamps] = useState<PassportStamp[]>(() => storage.getStamps());
  const [baggage, setBaggage] = useState<BaggageItem[]>(() => storage.getBaggage());
  const [rescueSessions, setRescueSessions] = useState<RescueSessionRecord[]>(() =>
    storage.getRescueSessions()
  );
  const [nightReflections, setNightReflections] = useState<NightReflectionRecord[]>(() =>
    storage.getNightReflections()
  );

  // Divine guidance, Teacher & Students state
  const [teacherMessages, setTeacherMessages] = useState<TeacherMessage[]>(() =>
    storage.getTeacherMessages()
  );
  const [students, setStudents] = useState<StudentProgressSummary[]>(() =>
    storage.getStudents()
  );
  const [cardOfTheDay] = useState<DailyDivineCard>(() =>
    storage.getCardOfTheDay()
  );
  const [spinRewardToday, setSpinRewardToday] = useState<SpinReward | null>(() =>
    storage.getSpinRewardToday()
  );

  // UI Navigation & Modals state
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!profile.onboarded);
  const [showPhoneLoginModal, setShowPhoneLoginModal] = useState<boolean>(false);
  const [showAskBabaModal, setShowAskBabaModal] = useState<boolean>(false);
  const [selectedRescueSituationId, setSelectedRescueSituationId] = useState<string | undefined>(undefined);

  // Secretive Admin / Teacher Portal via URL Hash (#admin, #/admin, ?admin=true)
  const [isAdminHashActive, setIsAdminHashActive] = useState<boolean>(() => {
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return hash.includes('admin') || hash.includes('sewakendra') || search.includes('admin');
  });
  const [isAdminPinVerified, setIsAdminPinVerified] = useState<boolean>(false);
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Listen to hash change for secret admin link access
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash.includes('admin') || hash.includes('sewakendra') || search.includes('admin')) {
        setIsAdminHashActive(true);
      } else {
        setIsAdminHashActive(false);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync state changes to storage
  useEffect(() => {
    storage.setProfile(profile);
  }, [profile]);

  useEffect(() => {
    storage.setDailyPractice(practice);
  }, [practice]);

  useEffect(() => {
    storage.setSanskarGoals(goals);
  }, [goals]);

  useEffect(() => {
    storage.setBaggage(baggage);
  }, [baggage]);

  // Sync dark theme class on document element
  useEffect(() => {
    if (profile.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [profile.theme]);

  // Dynamic Font Scaling
  useEffect(() => {
    const fontMap: Record<string, string> = {
      sm: '14.5px',
      base: '16px',
      lg: '18px',
      xl: '20px'
    };
    const size = fontMap[profile.fontScale || 'base'] || '16px';
    document.documentElement.style.fontSize = size;
  }, [profile.fontScale]);

  // Practice toggling
  const handleTogglePracticeItem = (key: keyof DailyPracticeState) => {
    const nextVal = !practice[key];
    const updated = { ...practice, [key]: nextVal };
    setPractice(updated);

    if (nextVal) {
      if (key === 'swamanCompleted') {
        const unlocked = storage.unlockStamp('source-connection');
        if (unlocked) setStamps(storage.getStamps());
      } else if (key === 'murliCompleted') {
        const unlocked = storage.unlockStamp('pure-intellect');
        if (unlocked) setStamps(storage.getStamps());
      } else if (key === 'challengeCompleted') {
        const unlocked = storage.unlockStamp('new-route');
        if (unlocked) setStamps(storage.getStamps());
      }
    }
  };

  // Rescue session save
  const handleSaveRescueSession = (session: RescueSessionRecord) => {
    storage.addRescueSession(session);
    setRescueSessions(storage.getRescueSessions());

    if (session.stampAwardedId) {
      storage.unlockStamp(session.stampAwardedId, session.newResponse);
      setStamps(storage.getStamps());
    }

    setPractice((prev) => ({ ...prev, challengeCompleted: true }));
  };

  // Night reflection save
  const handleSaveNightReflection = (ref: NightReflectionRecord) => {
    storage.addNightReflection(ref);
    setNightReflections(storage.getNightReflections());
    setPractice((prev) => ({ ...prev, reflectionCompleted: true }));
    storage.unlockStamp('swarajya-granted');
    setStamps(storage.getStamps());
  };

  // Baggage release toggle
  const handleToggleBaggageRelease = (id: string) => {
    const updated = baggage.map((b) => (b.id === id ? { ...b, isReleased: !b.isReleased } : b));
    setBaggage(updated);
    if (updated.some((b) => b.isReleased)) {
      storage.unlockStamp('baggage-reduced');
      setStamps(storage.getStamps());
    }
  };

  // Goal update
  const handleSaveGoal = (goal: SanskarGoal) => {
    const existingIndex = goals.findIndex((g) => g.id === goal.id);
    let updated: SanskarGoal[];
    if (existingIndex >= 0) {
      updated = [...goals];
      updated[existingIndex] = goal;
    } else {
      updated = [goal, ...goals];
    }
    setGoals(updated);
    setProfile((prev) => ({ ...prev, primarySanskarGoal: goal.newSanskar }));
  };

  // Divine Guidance & Teacher Actions
  const handleSaveSpinReward = (reward: SpinReward) => {
    storage.saveSpinRewardToday(reward);
    setSpinRewardToday(reward);
  };

  const handleMarkTeacherMessageRead = (id: string) => {
    storage.markTeacherMessageRead(id);
    setTeacherMessages(storage.getTeacherMessages());
  };

  const handleSendTeacherMessage = (msg: TeacherMessage) => {
    storage.addTeacherMessage(msg);
    setTeacherMessages(storage.getTeacherMessages());
  };

  // Phone Login Success
  const handleLoginSuccess = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    setShowPhoneLoginModal(false);
  };

  // Theme toggle
  const handleToggleTheme = () => {
    setProfile((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  // Secret Admin PIN Verification (Default: 108)
  const handleVerifyAdminPin = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPin = profile.adminPin || '108';
    if (adminPinInput.trim() === targetPin) {
      sound.playStampSound();
      setIsAdminPinVerified(true);
      setPinError('');
    } else {
      sound.playSoftClick();
      setPinError('गलत पिन (Incorrect PIN). कृपया सही आध्यात्मिक पिन दर्ज करें।');
    }
  };

  const handleExitAdminMode = () => {
    window.location.hash = '';
    setIsAdminHashActive(false);
    setIsAdminPinVerified(false);
    setAdminPinInput('');
  };

  // Rescue shortcut from Home
  const handleSelectRescueSituation = (situationId: string) => {
    setSelectedRescueSituationId(situationId);
    setActiveTab('rescue');
  };

  // Export & Import
  const handleExportData = () => {
    const jsonStr = storage.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `royal-self-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (jsonStr: string) => {
    const success = storage.importAllData(jsonStr);
    if (success) {
      setProfile(storage.getProfile());
      setPractice(storage.getDailyPractice());
      setGoals(storage.getSanskarGoals());
      setStamps(storage.getStamps());
      setBaggage(storage.getBaggage());
      setRescueSessions(storage.getRescueSessions());
      setNightReflections(storage.getNightReflections());
      setTeacherMessages(storage.getTeacherMessages());
      setStudents(storage.getStudents());
      alert('डेटा सफलतापूर्वक पुनर्प्राप्त (Restored) किया गया!');
    } else {
      alert('अमान्य बैकअप फ़ाइल।');
    }
  };

  const handleResetData = () => {
    if (window.confirm('क्या आप सचमुच सभी डेटा रीसेट करके डिफ़ॉल्ट पर लौटना चाहते हैं?')) {
      storage.resetToDefault();
      setProfile(storage.getProfile());
      setPractice(storage.getDailyPractice());
      setGoals(storage.getSanskarGoals());
      setStamps(storage.getStamps());
      setBaggage(storage.getBaggage());
      setRescueSessions(storage.getRescueSessions());
      setNightReflections(storage.getNightReflections());
      setTeacherMessages(storage.getTeacherMessages());
      setStudents(storage.getStudents());
      setShowOnboarding(true);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setProfile((prev) => ({ ...prev, language: lang }));
  };

  return (
    <div className="min-h-screen bg-ivory-200 dark:bg-celestial-dark text-spiritual-dark dark:text-gold-100 font-sans flex flex-col selection:bg-maroon-100 selection:text-maroon-900 transition-colors">
      
      {/* If secret #admin link was opened */}
      {isAdminHashActive ? (
        <div className="flex-1 w-full max-w-md mx-auto px-4 py-6 sm:px-5">
          {!isAdminPinVerified ? (
            /* PIN Gate for Secret Admin Access */
            <div className="my-auto py-12 px-6 rounded-3xl bg-white dark:bg-maroon-950 border-2 border-amber-400 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 border-2 border-amber-400 flex items-center justify-center mx-auto text-2xl shadow-lg">
                <Lock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] font-serif uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block">
                  SECRET ADMIN ACCESS
                </span>
                <h2 className="text-lg font-bold font-hindi text-maroon-900 dark:text-amber-100">
                  सेवाकेंद्र व्यवस्थापक एवं प्रभारी पोर्टल
                </h2>
                <p className="text-xs text-spiritual-muted dark:text-gray-300 font-hindi mt-1">
                  यह पोर्टल केवल सेवाकेंद्र प्रभारी के लिए है। आगे बढ़ने के लिए सुरक्षा पिन दर्ज करें:
                </p>
              </div>

              <form onSubmit={handleVerifyAdminPin} className="space-y-3 pt-2">
                <div>
                  <input
                    type="password"
                    maxLength={6}
                    autoFocus
                    placeholder="डिफ़ॉल्ट पिन: 108"
                    value={adminPinInput}
                    onChange={(e) => setAdminPinInput(e.target.value)}
                    className="w-full text-center tracking-widest text-lg font-bold py-2.5 px-4 rounded-xl border border-amber-400 bg-ivory-50 dark:bg-maroon-900 text-maroon-950 dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {pinError && (
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 font-hindi mt-1">
                      {pinError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold text-xs font-hindi shadow-md hover:opacity-95 transition-all transform active:scale-95"
                >
                  प्रवेश करें (Verify PIN)
                </button>
              </form>

              <button
                onClick={handleExitAdminMode}
                className="text-xs text-spiritual-muted dark:text-gray-400 hover:text-maroon-700 dark:hover:text-amber-300 font-hindi flex items-center justify-center gap-1 mx-auto pt-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>विद्यार्थी ऐप पर वापस लौटें</span>
              </button>
            </div>
          ) : (
            /* Authorized Teacher / Admin Dashboard */
            <TeacherDashboard
              teacherProfile={profile}
              students={students}
              messages={teacherMessages}
              onSendMessage={handleSendTeacherMessage}
              onSwitchToStudentMode={handleExitAdminMode}
            />
          )}
        </div>
      ) : (
        /* Normal Public Student App */
        <>
          {/* Top App Bar Header (100% Student-Focused, No Teacher links) */}
          <Header
            profile={profile}
            isTeacherModeActive={false}
            onOpenProfile={() => setActiveTab('profile')}
            onOpenSettings={() => setActiveTab('settings')}
            onOpenLogin={() => setShowPhoneLoginModal(true)}
            onOpenAskBaba={() => setShowAskBabaModal(true)}
            onToggleTheme={handleToggleTheme}
            onLanguageChange={handleLanguageChange}
          />

          {/* Main Content Area */}
          <main className="flex-1 w-full max-w-md mx-auto px-4 py-3 sm:px-5">
            {activeTab === 'home' && (
              <HomeView
                profile={profile}
                practice={practice}
                dailyMurli={MURLI_LIBRARY[0]}
                activeGoal={goals[0]}
                rescueCount={rescueSessions.length}
                reflectionsCount={nightReflections.length}
                teacherMessages={teacherMessages}
                cardOfTheDay={cardOfTheDay}
                spinRewardToday={spinRewardToday}
                onSaveSpinReward={handleSaveSpinReward}
                onMarkMessageRead={handleMarkTeacherMessageRead}
                onOpenAskBaba={() => setShowAskBabaModal(true)}
                onTogglePracticeItem={handleTogglePracticeItem}
                onNavigateTab={(tab) => {
                  if (tab === 'rescue') setSelectedRescueSituationId(undefined);
                  setActiveTab(tab);
                }}
                onSelectRescueSituation={handleSelectRescueSituation}
              />
            )}

            {activeTab === 'practice' && (
              <PracticeView
                practice={practice}
                onToggleItem={handleTogglePracticeItem}
                onSaveNightReflection={handleSaveNightReflection}
                existingReflection={nightReflections[0]}
              />
            )}

            {activeTab === 'rescue' && (
              <RescueView
                profile={profile}
                initialSelectedSituationId={selectedRescueSituationId}
                onSaveSession={handleSaveRescueSession}
              />
            )}

            {activeTab === 'progress' && (
              <ProgressView
                stamps={stamps}
                baggage={baggage}
                goals={goals}
                rescueSessions={rescueSessions}
                nightReflections={nightReflections}
                onToggleBaggageRelease={handleToggleBaggageRelease}
                onSaveGoal={handleSaveGoal}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                profile={profile}
                onUpdateProfile={setProfile}
                onRetakeOnboarding={() => setShowOnboarding(true)}
                onOpenSettings={() => setActiveTab('settings')}
                onExportData={handleExportData}
                onImportData={handleImportData}
                onResetData={handleResetData}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                profile={profile}
                onUpdateProfile={setProfile}
                onExportData={handleExportData}
                onImportData={handleImportData}
                onResetData={handleResetData}
                onRetakeOnboarding={() => setShowOnboarding(true)}
              />
            )}
          </main>

          {/* Fixed Bottom Navigation Bar */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={(tab) => {
              if (tab === 'rescue') setSelectedRescueSituationId(undefined);
              sound.playSoftClick();
              setActiveTab(tab);
            }}
            language={profile.language}
          />
        </>
      )}

      {/* Ask Baba AI Guidance Modal */}
      {showAskBabaModal && (
        <AskBabaAI
          onClose={() => setShowAskBabaModal(false)}
          language={profile.language}
          savedApiKey={profile.geminiApiKey}
          onSaveApiKey={(key) => setProfile((p) => ({ ...p, geminiApiKey: key }))}
        />
      )}

      {/* Phone Login Modal */}
      {showPhoneLoginModal && (
        <PhoneLoginModal
          currentProfile={profile}
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setShowPhoneLoginModal(false)}
        />
      )}

      {/* Onboarding Experience Modal */}
      {showOnboarding && (
        <OnboardingModal
          initialProfile={profile}
          onComplete={(newProfile) => {
            setProfile(newProfile);
            setShowOnboarding(false);
          }}
          isRetake={profile.onboarded}
        />
      )}
    </div>
  );
};

export default App;
