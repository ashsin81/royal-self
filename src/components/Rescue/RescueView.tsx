import React, { useState } from 'react';
import { RESCUE_SITUATIONS } from '../../data/rescueData';
import { RescueSituation, RescueSessionRecord, UserProfile } from '../../types';
import { RescueWizard } from './RescueWizard';
import { LifeBuoy, Sparkles, Flame, Wind, HeartCrack, Scale, Crown, ShieldAlert, Frown, MessageSquareOff, Gift, BatteryLow, Compass, Eye, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface RescueViewProps {
  profile: UserProfile;
  initialSelectedSituationId?: string;
  onSaveSession: (session: RescueSessionRecord) => void;
}

export const RescueView: React.FC<RescueViewProps> = ({
  profile,
  initialSelectedSituationId,
  onSaveSession,
}) => {
  const [selectedSituation, setSelectedSituation] = useState<RescueSituation | null>(() => {
    if (initialSelectedSituationId) {
      return RESCUE_SITUATIONS.find((s) => s.id === initialSelectedSituationId) || null;
    }
    return null;
  });

  const getIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 flex-shrink-0' };
    switch (iconName) {
      case 'flame': return <Flame {...props} className="w-5 h-5 text-amber-600" />;
      case 'wind': return <Wind {...props} className="w-5 h-5 text-sky-600" />;
      case 'heart-crack': return <HeartCrack {...props} className="w-5 h-5 text-rose-600" />;
      case 'scale': return <Scale {...props} className="w-5 h-5 text-indigo-600" />;
      case 'crown': return <Crown {...props} className="w-5 h-5 text-amber-500" />;
      case 'shield-alert': return <ShieldAlert {...props} className="w-5 h-5 text-orange-600" />;
      case 'frown': return <Frown {...props} className="w-5 h-5 text-stone-600" />;
      case 'message-square-off': return <MessageSquareOff {...props} className="w-5 h-5 text-purple-600" />;
      case 'gift': return <Gift {...props} className="w-5 h-5 text-pink-600" />;
      case 'battery-low': return <BatteryLow {...props} className="w-5 h-5 text-teal-600" />;
      case 'compass': return <Compass {...props} className="w-5 h-5 text-blue-600" />;
      case 'eye': return <Eye {...props} className="w-5 h-5 text-emerald-600" />;
      default: return <Sparkles {...props} className="w-5 h-5 text-gold-600" />;
    }
  };

  const handleSelect = (sit: RescueSituation) => {
    sound.playSoftClick();
    setSelectedSituation(sit);
  };

  if (selectedSituation) {
    return (
      <div className="pb-20">
        <RescueWizard
          situation={selectedSituation}
          profile={profile}
          onCancel={() => setSelectedSituation(null)}
          onSaveSession={(session) => {
            onSaveSession(session);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-maroon-800 to-maroon-900 text-white p-5 rounded-2xl border border-gold-400/40 shadow-royal">
        <div className="flex items-center gap-2 mb-1">
          <LifeBuoy className="w-4 h-4 text-gold-300 animate-spin-slow" />
          <span className="text-[10px] uppercase font-serif tracking-widest text-gold-300 font-bold">
            ROYAL RESCUE • आपातकालीन स्थिति प्रबंधन
          </span>
        </div>
        <h2 className="text-xl font-bold font-hindi text-white leading-tight">
          रुकिए। पहले स्वयं को संभालिए।
        </h2>
        <p className="text-xs text-gold-100/80 font-hindi mt-1 leading-relaxed">
          "परिस्थिति से पहले अपनी स्थिति को श्रेष्ठ बनाएं।" किसी भी भावनात्मक टकराव या तनाव में तुरंत सही सीमा (Border Checkpoint) चुनें।
        </p>
      </div>

      {/* 12 Situations Grid */}
      <div className="space-y-2">
        <div className="text-xs font-serif font-bold text-maroon-800 uppercase tracking-wider flex items-center justify-between">
          <span>परिस्थिति चुनें (Select Situation)</span>
          <span className="text-[10px] text-spiritual-muted font-normal">12 Checkpoints</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {RESCUE_SITUATIONS.map((sit, index) => (
            <div
              key={sit.id}
              onClick={() => handleSelect(sit)}
              className="p-3.5 rounded-xl border border-gold-200/90 bg-white hover:bg-gold-50/40 transition-all cursor-pointer shadow-2xs hover:shadow-xs group flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-ivory-100 border border-gold-200 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                {getIcon(sit.icon)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-serif font-bold text-gold-700 uppercase tracking-wider">
                    {sit.borderNameEn}
                  </span>
                  <span className="text-[9px] text-spiritual-muted font-serif">#{index + 1}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold font-hindi text-maroon-950 truncate mt-0.5">
                  {sit.nameHi}
                </h4>
                <p className="text-[11px] text-spiritual-muted font-hindi line-clamp-1 mt-0.5">
                  {sit.triggerPlaceholder}
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-spiritual-muted group-hover:text-maroon-700 self-center transition-colors flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
