import React from 'react';
import { MurliContentItem } from '../../types';
import { BookOpen, CheckCircle, Sparkles } from 'lucide-react';

interface MurliCardProps {
  item: MurliContentItem;
  onNavigateLibrary: () => void;
}

export const MurliCard: React.FC<MurliCardProps> = ({ item, onNavigateLibrary }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-gold-700 font-serif font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-maroon-700" />
          <span>आज की धारणा • Daily Murli</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
          <CheckCircle className="w-3 h-3 text-emerald-600" />
          <span>प्रमाणित (Verified)</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm sm:text-base font-bold font-hindi text-maroon-900 leading-snug">
          {item.title}
        </h3>
        <p className="text-[11px] text-spiritual-muted font-serif mt-0.5">
          {item.murliDate} • {item.sourceReference}
        </p>
      </div>

      {/* Murli excerpt in elegant quote box */}
      <div className="bg-ivory-50 p-3.5 rounded-xl border-l-4 border-maroon-700 border-r border-t border-b border-gold-200 text-xs text-spiritual-dark font-hindi italic leading-relaxed">
        "{item.originalExcerpt}"
      </div>

      <div className="space-y-1.5 text-xs font-hindi">
        <div className="text-spiritual-dark">
          <strong className="text-maroon-800">सरल अर्थ: </strong>
          {item.explanation}
        </div>
        <div className="text-spiritual-dark">
          <strong className="text-gold-700">जीवन में प्रयोग: </strong>
          {item.practicalApplication}
        </div>
      </div>

      <div className="pt-2 border-t border-gold-100 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-maroon-700 font-semibold font-hindi">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span>लक्ष्य: {item.todayChallenge}</span>
        </div>
      </div>

      <button
        onClick={onNavigateLibrary}
        className="w-full text-center text-[11px] font-bold text-gold-700 hover:text-maroon-800 font-hindi pt-1 transition-colors"
      >
        मुरली ज्ञान पुस्तकालय (Content Library) खोलें →
      </button>
    </div>
  );
};
