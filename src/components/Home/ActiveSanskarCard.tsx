import React from 'react';
import { SanskarGoal } from '../../types';
import { Target, ArrowRight } from 'lucide-react';

interface ActiveSanskarCardProps {
  goal: SanskarGoal | undefined;
  onNavigateSanskarLab: () => void;
}

export const ActiveSanskarCard: React.FC<ActiveSanskarCardProps> = ({ goal, onNavigateSanskarLab }) => {
  if (!goal) return null;

  return (
    <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-gold-700 font-serif font-bold uppercase tracking-wider">
          <Target className="w-4 h-4 text-maroon-700" />
          <span>मेरा मुख्य पुरुषार्थ • Active Sanskar</span>
        </div>
        <span className="text-[10px] bg-gold-100 text-gold-800 font-medium px-2 py-0.5 rounded-full border border-gold-300">
          {goal.practiceDays} दिन निरंतर
        </span>
      </div>

      <div className="space-y-2 text-xs font-hindi">
        <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-rose-800 block">पुराना संस्कार (Old Pattern)</span>
          <span className="text-spiritual-dark font-medium">{goal.oldSanskar}</span>
        </div>

        <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-emerald-800 block">नया राजाई संस्कार (New Sanskar)</span>
          <span className="text-spiritual-dark font-bold text-emerald-950">{goal.newSanskar}</span>
        </div>

        <div className="pt-1 text-spiritual-dark">
          <strong className="text-maroon-800">आज का संकल्प: </strong>
          {goal.dailyPractice}
        </div>
      </div>

      <button
        onClick={onNavigateSanskarLab}
        className="w-full text-center text-[11px] font-bold text-maroon-700 hover:text-maroon-900 font-hindi pt-1 flex items-center justify-center gap-1 transition-colors"
      >
        <span>संस्कार परिवर्तन लैब (Sanskar Lab) देखें</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
