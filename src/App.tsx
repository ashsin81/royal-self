import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { storage } from './utils/storage';
import { Header } from './components/Header';
import { Navbar, RoyalTabType } from './components/Navbar';
import { TodayView } from './components/Passport/TodayView';
import { CheckpointsView } from './components/Passport/CheckpointsView';
import { RoyalRouteView } from './components/Passport/RoyalRouteView';
import { PassportCardView } from './components/Passport/PassportCardView';
import { StampsView } from './components/Passport/StampsView';
import { JournalView } from './components/Passport/JournalView';
import { WelcomeView } from './components/Passport/WelcomeView';
import { RescuePassModal } from './components/Passport/RescuePassModal';
import { AboutJourneyModal } from './components/Passport/AboutJourneyModal';
import { SpiritualVisaModal } from './components/Passport/SpiritualVisaModal';
import { BaggageDeclarationModal } from './components/Passport/BaggageDeclarationModal';
import { HowToPractiseModal } from './components/Passport/HowToPractiseModal';
import { ChooseNewRouteModal } from './components/Passport/ChooseNewRouteModal';
import { SwarajyaDeclarationModal } from './components/Passport/SwarajyaDeclarationModal';
import { AvatarPickerModal } from './components/Passport/AvatarPickerModal';
import { MeditationMusicBar } from './components/Audio/MeditationMusicBar';
import { sound } from './utils/audio';

export const App: React.FC = () => {
  // User profile
  const [profile, setProfile] = useState<UserProfile>(() => storage.getProfile());

  // Navigation tab
  const [activeTab, setActiveTab] = useState<RoyalTabType>('today');
  const [initialCheckpointId, setInitialCheckpointId] = useState<string | undefined>(undefined);

  // Unlocked stamps
  const [unlockedStampIds, setUnlockedStampIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('royal_unlocked_stamps');
      return stored ? JSON.parse(stored) : ['stamp-01', 'stamp-05', 'stamp-12'];
    } catch {
      return ['stamp-01', 'stamp-05', 'stamp-12'];
    }
  });

  // Modal triggers
  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    return !localStorage.getItem('royal_welcome_seen');
  });
  const [showRescuePass, setShowRescuePass] = useState<boolean>(false);
  const [showAboutJourney, setShowAboutJourney] = useState<boolean>(false);
  const [showSpiritualVisa, setShowSpiritualVisa] = useState<boolean>(false);
  const [showBaggageDeclaration, setShowBaggageDeclaration] = useState<boolean>(false);
  const [showHowToPractise, setShowHowToPractise] = useState<boolean>(false);
  const [showChooseNewRoute, setShowChooseNewRoute] = useState<boolean>(false);
  const [showSwarajyaDeclaration, setShowSwarajyaDeclaration] = useState<boolean>(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState<boolean>(false);

  // Sync profile to storage
  useEffect(() => {
    storage.setProfile(profile);
  }, [profile]);

  // Sync unlocked stamps to storage
  const handleUnlockStamp = (stampId: string) => {
    if (!unlockedStampIds.includes(stampId)) {
      const updated = [...unlockedStampIds, stampId];
      setUnlockedStampIds(updated);
      try {
        localStorage.setItem('royal_unlocked_stamps', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Font scale toggle (base -> lg -> xl -> sm -> base)
  const handleToggleFontScale = () => {
    const scales: ('sm' | 'base' | 'lg' | 'xl')[] = ['sm', 'base', 'lg', 'xl'];
    const current = profile.fontScale || 'base';
    const next = scales[(scales.indexOf(current) + 1) % scales.length];
    setProfile((prev) => ({ ...prev, fontScale: next }));
    sound.playChime();
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-size-sm', 'font-size-base', 'font-size-lg', 'font-size-xl');
    root.classList.add(`font-size-${profile.fontScale || 'base'}`);
  }, [profile.fontScale]);

  // Welcome dismiss
  const handleDismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('royal_welcome_seen', 'true');
    setActiveTab('today');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#140412] via-[#0D020B] to-[#080107] text-amber-50 selection:bg-amber-900 selection:text-amber-200">
      
      {/* If Welcome screen is open */}
      {showWelcome ? (
        <WelcomeView
          onBegin={handleDismissWelcome}
          onContinue={handleDismissWelcome}
        />
      ) : (
        <>
          {/* Header */}
          <Header
            profile={profile}
            onOpenPassport={() => setActiveTab('passport')}
            onOpenRescuePass={() => setShowRescuePass(true)}
            onToggleFontScale={handleToggleFontScale}
          />

          {/* Main Content Area */}
          <main className="max-w-md mx-auto px-4 pt-3 pb-28">
            {activeTab === 'today' && (
              <TodayView
                onOpenCheckpoint={(cpId) => {
                  setInitialCheckpointId(cpId);
                  setActiveTab('checkpoints');
                }}
                onOpenRescuePass={() => setShowRescuePass(true)}
                onOpenRoyalRoute={() => setActiveTab('route')}
                onOpenVisa={() => setShowSpiritualVisa(true)}
                onOpenBaggage={() => setShowBaggageDeclaration(true)}
                onOpenDeclaration={() => setShowSwarajyaDeclaration(true)}
                onOpenHowToPractise={() => setShowHowToPractise(true)}
                onOpenChooseNewRoute={() => setShowChooseNewRoute(true)}
                onOpenAbout={() => setShowAboutJourney(true)}
              />
            )}

            {activeTab === 'checkpoints' && (
              <CheckpointsView
                unlockedStampIds={unlockedStampIds}
                onUnlockStamp={handleUnlockStamp}
                initialCheckpointId={initialCheckpointId}
                onClearInitialCheckpoint={() => setInitialCheckpointId(undefined)}
              />
            )}

            {activeTab === 'route' && (
              <RoyalRouteView
                onOpenCheckpoint={(cpId) => {
                  setInitialCheckpointId(cpId);
                  setActiveTab('checkpoints');
                }}
              />
            )}

            {activeTab === 'stamps' && (
              <StampsView
                unlockedStampIds={unlockedStampIds}
                onUnlockStamp={handleUnlockStamp}
              />
            )}

            {activeTab === 'journal' && (
              <JournalView />
            )}

            {activeTab === 'passport' && (
              <PassportCardView
                profile={profile}
                unlockedStampsCount={unlockedStampIds.length}
                onUpdateProfile={setProfile}
                onOpenVisa={() => setShowSpiritualVisa(true)}
                onOpenStamps={() => setActiveTab('stamps')}
                onOpenDeclaration={() => setShowSwarajyaDeclaration(true)}
                onOpenBaggage={() => setShowBaggageDeclaration(true)}
                onOpenHowToPractise={() => setShowHowToPractise(true)}
                onOpenChooseNewRoute={() => setShowChooseNewRoute(true)}
                onOpenAbout={() => setShowAboutJourney(true)}
                onOpenAvatarViewer={() => setShowAvatarPicker(true)}
              />
            )}
          </main>

          {/* Floating Ambient Meditation Music Player */}
          <MeditationMusicBar />

          {/* Fixed Bottom Navigation Bar */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            unlockedStampsCount={unlockedStampIds.length}
          />
        </>
      )}

      {/* Modals from Figma Design */}
      <RescuePassModal
        isOpen={showRescuePass}
        onClose={() => setShowRescuePass(false)}
      />

      <AboutJourneyModal
        isOpen={showAboutJourney}
        onClose={() => setShowAboutJourney(false)}
        onGoToVisa={() => setShowSpiritualVisa(true)}
      />

      <SpiritualVisaModal
        isOpen={showSpiritualVisa}
        onClose={() => setShowSpiritualVisa(false)}
      />

      <BaggageDeclarationModal
        isOpen={showBaggageDeclaration}
        onClose={() => setShowBaggageDeclaration(false)}
      />

      <HowToPractiseModal
        isOpen={showHowToPractise}
        onClose={() => setShowHowToPractise(false)}
        onGoToCheckpoints={() => {
          setShowHowToPractise(false);
          setActiveTab('checkpoints');
        }}
      />

      <ChooseNewRouteModal
        isOpen={showChooseNewRoute}
        onClose={() => setShowChooseNewRoute(false)}
      />

      <SwarajyaDeclarationModal
        isOpen={showSwarajyaDeclaration}
        onClose={() => setShowSwarajyaDeclaration(false)}
        signatureName={profile.signatureName || profile.name}
        onSaveSignature={(name, date) => {
          setProfile((prev) => ({
            ...prev,
            signatureName: name,
            signedDate: date,
          }));
        }}
      />

      <AvatarPickerModal
        isOpen={showAvatarPicker}
        onClose={() => setShowAvatarPicker(false)}
        currentAvatarUrl={profile.avatarUrl}
        onSelectAvatar={(url) => {
          setProfile((prev) => ({ ...prev, avatarUrl: url }));
        }}
      />

    </div>
  );
};

export default App;
