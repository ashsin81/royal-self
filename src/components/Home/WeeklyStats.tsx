import React from 'react';
import { Award, Compass, Heart, ShieldCheck } from 'lucide-react';

interface WeeklyStatsProps {
  consistencyDays: number;
  rescueCount: number;
  reflectionsCount: number;
  activeQualitiesCount: number;
  onOpenProgress: () => void;
}

export const WeeklyStats: React.FC<WeeklyStatsProps> = ({
  consistencyDays,
  rescueCount,
  reflectionsCount,
  activeQualitiesCount,
  onOpenProgress,
}) => {
  return (
    <div className="bg-ivory-100 rounded-2xl p-5 border border-gold-300 shadow-royal space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold">
            आत्म-निरीक्षण
          </span>
          <h3 className="text-base font-bold text-maroon-800 font-hindi">
            मेरे पुरुषार्थ की झलक
          </h3>
        </div>
        <button
          onClick={onOpenProgress}
          className="text-xs text-maroon-700 font-semibold font-hindi hover:underline"
        >
          विस्तृत यात्रा →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-white p-3 rounded-xl border border-gold-200/80 shadow-2xs">
          <div className="flex items-center gap-1.5 text-spiritual-muted mb-1">
            <Compass className="w-3.5 h-3.5 text-maroon-700" />
            <span className="text-[11px] font-hindi">निरंतरता (Days)</span>
          </div>
          <div className="text-xl font-bold font-serif text-maroon-800">
            {consistencyDays} <span className="text-xs font-normal font-hindi text-spiritual-muted">दिन</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-gold-200/80 shadow-2xs">
          <div className="flex items-center gap-1.5 text-spiritual-muted mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-hindi">सचेत निर्णय (Rescue)</span>
          </div>
          <div className="text-xl font-bold font-serif text-emerald-800">
            {rescueCount} <span className="text-xs font-normal font-hindi text-spiritual-muted">बार</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-gold-200/80 shadow-2xs">
          <div className="flex items-center gap-1.5 text-spiritual-muted mb-1">
            <Heart className="w-3.5 h-3.5 text-rose-600" />
            <span className="text-[11px] font-hindi">रात्रि स्व-चेकिंग</span>
          </div>
          <div className="text-xl font-bold font-serif text-rose-800">
            {reflectionsCount} <span className="text-xs font-normal font-hindi text-spiritual-muted">दिन</span>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-gold-200/80 shadow-2xs">
          <div className="flex items-center gap-1.5 text-spiritual-muted mb-1">
            <Award className="w-3.5 h-3.5 text-gold-600" />
            <span className="text-[11px] font-hindi">सक्रिय स्वरूप</span>
          </div>
          <div className="text-xl font-bold font-serif text-gold-700">
            {activeQualitiesCount} <span className="text-xs font-normal font-hindi text-spiritual-muted">गुण</span>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-spiritual-muted font-hindi italic text-center pt-1">
        * यह संख्या कोई आध्यात्मिक पद या तुलना नहीं, केवल आपकी व्यक्तिगत सजगता का आईना है।
      </p>
    </div>
  );
};
