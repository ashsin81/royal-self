import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { HIGHER_SELF_ARTWORKS, HigherSelfArtwork } from '../../data/spiritualAvatars';
import {
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Eye,
  Heart,
  ShieldCheck,
  Sun
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { tts } from '../../utils/tts';
import confetti from 'canvas-confetti';

interface HigherSelfViewerModalProps {
  profile: UserProfile;
  onUpdateProfile?: (profile: UserProfile) => void;
  onClose: () => void;
}

export const HigherSelfViewerModal: React.FC<HigherSelfViewerModalProps> = ({
  profile,
  onUpdateProfile,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isSavedAsInspiration, setIsSavedAsInspiration] = useState<boolean>(false);

  const currentArtwork: HigherSelfArtwork = HIGHER_SELF_ARTWORKS[currentIndex];

  const handleNext = () => {
    sound.playSoftClick();
    setCurrentIndex((prev) => (prev + 1) % HIGHER_SELF_ARTWORKS.length);
    setIsSavedAsInspiration(false);
  };

  const handlePrev = () => {
    sound.playSoftClick();
    setCurrentIndex((prev) => (prev - 1 + HIGHER_SELF_ARTWORKS.length) % HIGHER_SELF_ARTWORKS.length);
    setIsSavedAsInspiration(false);
  };

  const handleSelectArtwork = (idx: number) => {
    sound.playSoftClick();
    setCurrentIndex(idx);
    setIsSavedAsInspiration(false);
  };

  const handlePlayBowlSound = () => {
    sound.playTibetanBowl();
  };

  const handleToggleAudio = () => {
    if (isSpeaking) {
      tts.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      tts.speak(currentArtwork.audioAffirmationHi, profile.language, profile.ttsSpeed || 0.95);
      setTimeout(() => setIsSpeaking(false), 9000);
    }
  };

  const handleSetAsInspiration = () => {
    sound.playStampSound();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    if (onUpdateProfile) {
      onUpdateProfile({
        ...profile,
        customInspirationPhoto: currentArtwork.imageUrl
      });
    }
    setIsSavedAsInspiration(true);
    setTimeout(() => setIsSavedAsInspiration(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative max-w-md w-full bg-gradient-to-b from-[#200A1A] via-[#140511] to-[#0A0208] border-2 border-amber-400/80 rounded-3xl p-5 sm:p-6 text-center text-white shadow-2xl overflow-hidden my-auto flex flex-col justify-between">
        
        {/* Divine Ambient Lighting Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-56 h-56 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="space-y-1 mb-3 relative z-10">
          <span className="text-[10px] font-serif uppercase tracking-widest text-amber-300 font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>श्रेष्ठ स्वरूप दर्शन • HIGHER SELF DARSHAN</span>
          </span>
          <h2 className="text-lg sm:text-xl font-bold font-hindi text-amber-50">
            {currentArtwork.titleHi}
          </h2>
          <p className="text-[11px] text-amber-200/80 font-hindi">
            {currentArtwork.subtitleHi}
          </p>
        </div>

        {/* Central Visual Artwork Frame */}
        <div className="relative w-full max-w-[280px] h-[260px] mx-auto my-1 rounded-2xl overflow-hidden border-2 border-amber-400/90 shadow-[0_0_35px_rgba(245,158,11,0.35)] group bg-black/60">
          <img
            src={currentArtwork.imageUrl}
            alt={currentArtwork.titleHi}
            onError={(e) => {
              // Graceful fallback to spiritual placeholder if image loading fails
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80';
            }}
            className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105"
          />

          {/* Golden Aura Edge Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-amber-500/10 pointer-events-none" />

          {/* Previous / Next Floating Arrows */}
          <button
            onClick={handlePrev}
            title="पिछला स्वरूप"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-amber-400/60 text-amber-200 flex items-center justify-center transition-transform active:scale-90"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            title="अगला स्वरूप"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 border border-amber-400/60 text-amber-200 flex items-center justify-center transition-transform active:scale-90"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Quick Counter Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/70 border border-amber-400/40 text-[10px] font-mono text-amber-200">
            {currentIndex + 1} / {HIGHER_SELF_ARTWORKS.length}
          </div>
        </div>

        {/* Thumbnail Selector Dots / Preview Strip */}
        <div className="flex items-center justify-center gap-2 my-2 relative z-10">
          {HIGHER_SELF_ARTWORKS.map((art, idx) => (
            <button
              key={art.id}
              onClick={() => handleSelectArtwork(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx
                  ? 'w-6 bg-gradient-to-r from-amber-400 to-rose-400 shadow-sm'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              title={art.titleHi}
            />
          ))}
        </div>

        {/* Sacred Affirmation & Drishti Sutra Box */}
        <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-amber-400/40 text-left space-y-2 relative z-10 text-xs font-hindi leading-relaxed text-amber-50">
          <p className="italic text-center text-xs sm:text-sm font-semibold text-white">
            "{currentArtwork.swaman}"
          </p>

          <div className="pt-2 border-t border-amber-400/20 text-[11px] text-amber-200/90 flex items-center justify-between">
            <span className="flex items-center gap-1 font-semibold text-amber-300">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>दृष्टि सूत्र: {currentArtwork.drishtiSutra}</span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-1 relative z-10">
          {/* Bowl Sound */}
          <button
            onClick={handlePlayBowlSound}
            className="flex items-center justify-center gap-1 px-2 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-[11px] font-hindi font-semibold text-amber-200 transition-colors"
          >
            <Sun className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>शांति नाद</span>
          </button>

          {/* Audio Affirmation */}
          <button
            onClick={handleToggleAudio}
            className={`flex items-center justify-center gap-1 px-2 py-2 rounded-xl border text-[11px] font-hindi font-semibold transition-all ${
              isSpeaking
                ? 'bg-rose-500/30 border-rose-400 text-rose-200 animate-pulse'
                : 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-400/50 text-amber-200'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-300" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
            <span>{isSpeaking ? 'रोकें' : 'स्वमान सुनें'}</span>
          </button>

          {/* Set as Profile / Inspiration Photo */}
          <button
            onClick={handleSetAsInspiration}
            className={`flex items-center justify-center gap-1 px-2 py-2 rounded-xl text-[11px] font-hindi font-bold transition-all shadow-md ${
              isSavedAsInspiration
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-maroon-950 font-bold'
            }`}
          >
            {isSavedAsInspiration ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>सहेज लिया!</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-maroon-950" />
                <span>प्रेरणा चुनें</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
