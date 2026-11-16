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
import { OnboardingModal } from './components/Onboarding/OnboardingModal';
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

  // UI Navigation state
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!profile.onboarded);
  const [selectedRescueSituationId, setSelectedRescueSituationId] = useState<string | undefined>(undefined);

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

  // Practice toggling
  const handleTogglePracticeItem = (key: keyof DailyPracticeState) => {
    const nextVal = !practice[key];
    const updated = { ...practice, [key]: nextVal };
    setPractice(updated);

    // If completed, award a stamp check
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

    // Unlock corresponding stamp
    if (session.stampAwardedId) {
      storage.unlockStamp(session.stampAwardedId, session.newResponse);
      setStamps(storage.getStamps());
    }

    // Also mark practice item 4 completed
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
      setShowOnboarding(true);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setProfile((prev) => ({ ...prev, language: lang }));
  };

  return (
    <div className="min-h-screen bg-ivory-200 text-spiritual-dark font-sans flex flex-col selection:bg-maroon-100 selection:text-maroon-900">
      {/* Top App Bar Header */}
      <Header
        profile={profile}
        onOpenProfile={() => setActiveTab('profile')}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Content Area - Mobile-first 390px centered container with desktop comfort */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-3 sm:px-5">
        {activeTab === 'home' && (
          <HomeView
            profile={profile}
            practice={practice}
            dailyMurli={MURLI_LIBRARY[0]}
            activeGoal={goals[0]}
            rescueCount={rescueSessions.length}
            reflectionsCount={nightReflections.length}
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
            onExportData={handleExportData}
            onImportData={handleImportData}
            onResetData={handleResetData}
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
