import React from 'react';
import { DailyPracticeState } from '../../types';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface DailyChecklistProps {
  practice: DailyPracticeState;
  onToggleItem: (key: keyof DailyPracticeState) => void;
  onNavigatePractice: () => void;
}

export const DailyChecklist: React.FC<DailyChecklistProps> = ({
  practice,
  onToggleItem,
  onNavigatePractice,
}) => {
  const items: { key: keyof DailyPracticeState; labelHi: string; subtitleHi: string }[] = [
    { key: 'swamanCompleted', labelHi: '1. स्वमान स्मृति', subtitleHi: 'सुबह उठते ही अपने स्वरूप का स्मरण' },
    { key: 'remembranceCompleted', labelHi: '2. बाबा की याद', subtitleHi: 'शिव बाबा से बुद्धियोग व सकाश' },
    { key: 'murliCompleted', labelHi: '3. एक मुरली धारणा', subtitleHi: 'आज के महावाक्य को जीवन में अपनाना' },
    { key: 'challengeCompleted', labelHi: '4. एक परिस्थिति में श्रेष्ठ प्रतिक्रिया', subtitleHi: 'क्रोध या व्यर्थ के स्थान पर शांति' },
    { key: 'reflectionCompleted', labelHi: '5. रात्रि स्व-चेकिंग', subtitleHi: 'दिन का हिसाब, स्वयं के साथ' },
  ];

  const completedCount = items.filter((it) => practice[it.key] === true).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  const handleToggle = (key: keyof DailyPracticeState) => {
    sound.playSoftClick();
    onToggleItem(key);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-serif uppercase tracking-widest text-gold-600 font-bold">
            दैनिक नियम
          </span>
          <h3 className="text-base font-bold text-maroon-800 font-hindi leading-snug">
            आज का पुरुषार्थ
          </h3>
          <p className="text-xs text-spiritual-muted font-hindi">
            आज का दिन श्रेष्ठ स्थिति में बिताने का अभ्यास।
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold font-serif text-maroon-700">
            {completedCount}/{items.length}
          </span>
          <span className="block text-[10px] text-spiritual-muted">पूर्ण</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-ivory-300 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-gold-500 to-maroon-700 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 5 daily actions checklist */}
      <div className="space-y-2">
        {items.map((item) => {
          const isDone = practice[item.key] === true;
          return (
            <div
              key={item.key}
              onClick={() => handleToggle(item.key)}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                isDone
                  ? 'bg-emerald-50/70 border-emerald-300 text-spiritual-dark'
                  : 'bg-ivory-50/60 border-gold-200/70 hover:bg-gold-50/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                )}
                <div>
                  <div className={`text-xs font-semibold font-hindi ${isDone ? 'line-through text-spiritual-muted' : 'text-spiritual-dark'}`}>
                    {item.labelHi}
                  </div>
                  <div className="text-[10px] text-spiritual-muted font-hindi">
                    {item.subtitleHi}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-medium font-serif px-1.5 py-0.5 rounded ${
                isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-gold-100 text-gold-700'
              }`}>
                {isDone ? 'सफल' : 'बाकी'}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={onNavigatePractice}
        className="w-full py-2.5 bg-ivory-100 hover:bg-gold-100 text-maroon-800 border border-gold-300 rounded-xl text-xs font-bold font-hindi flex items-center justify-center gap-1.5 transition-all shadow-xs"
      >
        <span>आज का अभ्यास विस्तार से देखें</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
