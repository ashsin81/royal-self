import React, { useState } from 'react';
import { FIGMA_CHECKPOINTS, FigmaCheckpoint } from '../../data/figmaPassportData';
import { CheckpointDetailModal } from './CheckpointDetailModal';
import { Search, Sparkles, Filter, ChevronRight, Crown, Flame, Wind, Eye, Scale, ShieldAlert, Archive, Compass, MessageSquare, RefreshCw, ShieldCheck, Lightbulb, Heart, VolumeX, Award } from 'lucide-react';
import { sound } from '../../utils/audio';

interface CheckpointsViewProps {
  unlockedStampIds: string[];
  onUnlockStamp: (stampId: string) => void;
  initialCheckpointId?: string;
  onClearInitialCheckpoint?: () => void;
}

export const CheckpointsView: React.FC<CheckpointsViewProps> = ({
  unlockedStampIds,
  onUnlockStamp,
  initialCheckpointId,
  onClearInitialCheckpoint,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Borders' | 'Checkpoints' | 'Gates'>('All');
  const [activeModalCheckpoint, setActiveModalCheckpoint] = useState<FigmaCheckpoint | null>(() => {
    if (initialCheckpointId) {
      return FIGMA_CHECKPOINTS.find((c) => c.id === initialCheckpointId) || null;
    }
    return null;
  });

  const categories: ('All' | 'Borders' | 'Checkpoints' | 'Gates')[] = [
    'All',
    'Borders',
    'Checkpoints',
    'Gates',
  ];

  const filteredCheckpoints = FIGMA_CHECKPOINTS.filter((cp) => {
    const matchesCategory =
      selectedCategory === 'All' || cp.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      cp.nameHi.toLowerCase().includes(q) ||
      cp.nameEn.toLowerCase().includes(q) ||
      cp.situation.toLowerCase().includes(q) ||
      cp.babaDirection.toLowerCase().includes(q) ||
      cp.stampName.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const getCheckpointIcon = (iconName: string) => {
    switch (iconName) {
      case 'flame': return Flame;
      case 'wind': return Wind;
      case 'eye': return Eye;
      case 'scale': return Scale;
      case 'shield-alert': return ShieldAlert;
      case 'archive': return Archive;
      case 'compass': return Compass;
      case 'message-square': return MessageSquare;
      case 'refresh-cw': return RefreshCw;
      case 'shield-check': return ShieldCheck;
      case 'lightbulb': return Lightbulb;
      case 'heart': return Heart;
      case 'volume-x': return VolumeX;
      case 'crown': return Crown;
      case 'award': return Award;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center pt-2 space-y-1">
        <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-amber-400 font-bold block">
          FIND YOUR CHECKPOINT
        </span>
        <h1 className="text-2xl sm:text-3xl font-hindi font-bold text-amber-100">
          अभी मन में क्या है?
        </h1>
        <p className="text-xs font-serif text-amber-300/70">
          Choose a situation. Find a clear direction.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search · क्रोध, मन, चिंता, दृष्टि..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1D081C]/90 border border-amber-500/30 text-amber-100 placeholder:text-amber-300/40 text-xs font-hindi focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-[11px] text-amber-400 absolute right-3.5 top-1/2 -translate-y-1/2 font-bold hover:text-amber-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count =
            cat === 'All'
              ? FIGMA_CHECKPOINTS.length
              : FIGMA_CHECKPOINTS.filter((c) => c.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => {
                sound.playChime();
                setSelectedCategory(cat);
              }}
              className={`py-1.5 px-3 rounded-full text-xs font-serif whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-amber-500 text-maroon-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-white/[0.05] border border-amber-500/20 text-amber-200/80 hover:bg-white/10'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Checkpoints Cards List */}
      <div className="space-y-2.5 pt-1">
        {filteredCheckpoints.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <Sparkles className="w-6 h-6 text-amber-400/40 mx-auto" />
            <p className="text-xs font-hindi text-amber-300/70">
              कोई चेकपॉइंट नहीं मिला। कृपया दूसरा शब्द खोजें।
            </p>
          </div>
        ) : (
          filteredCheckpoints.map((cp) => {
            const Icon = getCheckpointIcon(cp.icon);
            const isUnlocked = unlockedStampIds.includes(cp.stampId);

            return (
              <div
                key={cp.id}
                onClick={() => {
                  sound.playChime();
                  setActiveModalCheckpoint(cp);
                }}
                className="cursor-pointer rounded-2xl bg-gradient-to-r from-[#21091E]/90 to-[#140412]/90 border border-amber-500/25 hover:border-amber-400/60 p-3.5 shadow-md hover:shadow-lg transition-all active:scale-[0.99] group space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-400/20 font-bold">
                      {String(cp.number).padStart(2, '0')} / 20
                    </span>
                    <span className="text-[10px] uppercase font-serif text-amber-300/60">
                      {cp.category}
                    </span>
                  </div>
                  {isUnlocked && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      STAMP UNLOCKED ✓
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-base font-bold font-hindi text-amber-100 group-hover:text-amber-200 transition-colors">
                        {cp.nameHi}
                      </h3>
                      <span className="text-xs text-amber-300/60 font-serif">
                        ({cp.nameEn})
                      </span>
                    </div>
                    <p className="text-xs font-hindi text-amber-200/70 line-clamp-2 pl-8">
                      {cp.situation}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-amber-400/70 group-hover:translate-x-1 group-hover:text-amber-300 transition-all shrink-0 mt-2" />
                </div>

                <div className="pt-1 border-t border-amber-500/10 flex items-center justify-between text-[10px] text-amber-400/80 font-hindi">
                  <span>संस्कार: {cp.stampName}</span>
                  <span className="font-serif group-hover:underline">Open Checkpoint →</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal for Selected Checkpoint */}
      {activeModalCheckpoint && (
        <CheckpointDetailModal
          checkpoint={activeModalCheckpoint}
          isOpen={true}
          onClose={() => {
            setActiveModalCheckpoint(null);
            if (onClearInitialCheckpoint) onClearInitialCheckpoint();
          }}
          onUnlockStamp={onUnlockStamp}
          isStampUnlocked={unlockedStampIds.includes(activeModalCheckpoint.stampId)}
        />
      )}
    </div>
  );
};
