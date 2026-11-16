import React, { useState } from 'react';
import { Target, CheckCircle, Bell, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface TodayChallengeProps {
  isCompleted: boolean;
  onComplete: () => void;
}

export const TodayChallenge: React.FC<TodayChallengeProps> = ({ isCompleted, onComplete }) => {
  const [status, setStatus] = useState<'idle' | 'started' | 'reminded'>('idle');

  const challengeText =
    'आज जब कोई आपकी अपेक्षा के अनुसार व्यवहार न करे, उस समय तुरंत प्रतिक्रिया देने के बजाय स्वयं को शांत स्वरूप आत्मा समझकर उत्तर दें।';

  const handleStart = () => {
    sound.playSoftClick();
    setStatus('started');
  };

  const handleComplete = () => {
    sound.playStampSound();
    onComplete();
  };

  const handleRemindLater = () => {
    sound.playSoftClick();
    setStatus('reminded');
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-maroon-700" />
          <span>Screen C • आज का विशेष अभ्यास</span>
        </span>
        {isCompleted && (
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            <span>सफलतापूर्वक संपन्न</span>
          </span>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold font-hindi text-maroon-800">
          आज का एक विशेष अभ्यास
        </h3>
        <p className="text-xs text-spiritual-muted font-hindi">
          कर्म में ज्ञान की प्रत्यक्षता का प्रयोग।
        </p>
      </div>

      <div className="p-4 bg-gradient-to-br from-ivory-50 to-gold-50/50 rounded-xl border border-gold-200 text-xs sm:text-sm text-spiritual-dark font-hindi leading-relaxed shadow-2xs">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
          <p className="font-semibold text-maroon-950">
            "{challengeText}"
          </p>
        </div>
      </div>

      {status === 'reminded' && (
        <div className="p-2.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-hindi flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <span>स्मरण सक्रिय है। दोपहर में पुनः सजगता का संदेश मिलेगा।</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
        <button
          onClick={handleStart}
          className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all font-hindi flex items-center justify-center gap-1.5 ${
            status === 'started'
              ? 'bg-gold-100 text-maroon-900 border-gold-400 font-bold shadow-xs'
              : 'bg-ivory-50 text-spiritual-dark border-gold-200 hover:bg-gold-50'
          }`}
        >
          <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
          <span>{status === 'started' ? 'अभ्यास चालू है' : 'अभ्यास शुरू करें'}</span>
        </button>

        <button
          onClick={handleComplete}
          className={`py-2 px-3 text-xs font-bold rounded-xl shadow-md transition-all font-hindi flex items-center justify-center gap-1.5 ${
            isCompleted
              ? 'bg-emerald-700 text-white'
              : 'bg-maroon-700 hover:bg-maroon-800 text-gold-100'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5 text-gold-300" />
          <span>{isCompleted ? 'पूर्ण हो चुका' : 'पूरा हुआ'}</span>
        </button>

        <button
          onClick={handleRemindLater}
          className="py-2 px-3 text-xs font-medium rounded-xl border border-gold-200 text-spiritual-muted hover:text-spiritual-dark hover:bg-ivory-100 font-hindi flex items-center justify-center gap-1.5 transition-colors"
        >
          <Bell className="w-3.5 h-3.5 text-gold-500" />
          <span>बाद में याद दिलाएं</span>
        </button>
      </div>
    </div>
  );
};
