import React, { useState } from 'react';
import { PassportStamp } from '../../types';
import { StampBadge } from '../Common/StampBadge';
import { Award, Compass, X } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StampCollectionProps {
  stamps: PassportStamp[];
}

export const StampCollection: React.FC<StampCollectionProps> = ({ stamps }) => {
  const [selectedStamp, setSelectedStamp] = useState<PassportStamp | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const unlockedCount = stamps.filter((s) => s.isUnlocked).length;

  const filteredStamps = stamps.filter((s) => {
    if (filter === 'unlocked') return s.isUnlocked;
    if (filter === 'pending') return !s.isUnlocked;
    return true;
  });

  const handleStampClick = (stamp: PassportStamp) => {
    sound.playSoftClick();
    setSelectedStamp(stamp);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-maroon-700" />
            <span>SWARAJYA PASSPORT STAMPS</span>
          </span>
          <h3 className="text-lg font-bold font-hindi text-maroon-800">
            Royal Stamp Collection • जीए हुए संस्कार
          </h3>
          <p className="text-xs text-spiritual-muted font-hindi">
            "STAMP का अर्थ 'मैंने पढ़ लिया' नहीं, STAMP का अर्थ — 'मैंने जीकर देखा'।"
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold font-serif text-maroon-700">
            {unlockedCount} / {stamps.length}
          </span>
          <span className="block text-[10px] text-emerald-700 font-bold">सक्रिय सील</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gold-100 pb-2 text-xs font-hindi">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-lg transition-all ${
            filter === 'all'
              ? 'bg-maroon-700 text-gold-100 font-bold'
              : 'text-spiritual-muted hover:text-maroon-700'
          }`}
        >
          सभी सील ({stamps.length})
        </button>
        <button
          onClick={() => setFilter('unlocked')}
          className={`px-3 py-1 rounded-lg transition-all ${
            filter === 'unlocked'
              ? 'bg-maroon-700 text-gold-100 font-bold'
              : 'text-spiritual-muted hover:text-maroon-700'
          }`}
        >
          सक्रिय ({unlockedCount})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1 rounded-lg transition-all ${
            filter === 'pending'
              ? 'bg-maroon-700 text-gold-100 font-bold'
              : 'text-spiritual-muted hover:text-maroon-700'
          }`}
        >
          बाकी ({stamps.length - unlockedCount})
        </button>
      </div>

      {/* Passport Book Layout with Watermark */}
      <div className="relative p-4 rounded-2xl bg-ivory-50 border-2 border-gold-200/90 shadow-inner">
        {/* Subtle royal background seal */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="text-9xl">👑</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
          {filteredStamps.map((stamp) => (
            <StampBadge
              key={stamp.id}
              stamp={stamp}
              interactive={true}
              onClick={() => handleStampClick(stamp)}
            />
          ))}
        </div>
      </div>

      {/* Stamp Detail Modal */}
      {selectedStamp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-ivory-100 border-2 border-gold-300 rounded-3xl max-w-sm w-full p-6 text-center shadow-royal-lg relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedStamp(null)}
              className="absolute top-4 right-4 p-1.5 text-spiritual-muted hover:text-maroon-800 rounded-full bg-white/70"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex justify-center mb-3">
              <StampBadge stamp={selectedStamp} size="lg" />
            </div>

            <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold">
              {selectedStamp.code}
            </span>
            <h3 className="text-lg font-bold font-hindi text-maroon-900 mt-0.5">
              {selectedStamp.titleHi}
            </h3>
            <p className="text-xs text-spiritual-muted uppercase font-serif">
              {selectedStamp.titleEn}
            </p>

            <div className="mt-3 p-3 bg-white rounded-xl border border-gold-200 text-xs font-hindi text-left space-y-1.5 leading-relaxed text-spiritual-dark">
              <div>
                <strong>अनुभूति सूत्र: </strong>
                <span>{selectedStamp.notes || selectedStamp.subtitleHi}</span>
              </div>
              {selectedStamp.unlockedAt && (
                <div className="text-[10px] text-emerald-700 font-serif pt-1 border-t border-gold-100">
                  सक्रिय तिथि: {new Date(selectedStamp.unlockedAt).toLocaleDateString('hi-IN')}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedStamp(null)}
              className="w-full mt-4 py-2 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md font-hindi"
            >
              पासपोर्ट पृष्ठ पर लौटें
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
