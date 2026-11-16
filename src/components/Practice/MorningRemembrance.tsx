import React, { useState, useEffect } from 'react';
import { Sun, CheckCircle, Play, Pause, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audio';

interface MorningRemembranceProps {
  isCompleted: boolean;
  onComplete: () => void;
}

export const MorningRemembrance: React.FC<MorningRemembranceProps> = ({
  isCompleted,
  onComplete,
}) => {
  const [timerSeconds, setTimerSeconds] = useState<number>(120); // 2 minutes meditation
  const [isActive, setIsActive] = useState<boolean>(false);
  const [initialDuration] = useState<number>(120);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isActive) {
      setIsActive(false);
      sound.playTibetanBowl();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timerSeconds]);

  const toggleTimer = () => {
    if (!isActive) {
      sound.playTibetanBowl();
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimerSeconds(initialDuration);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>Screen A • अमृतवेला व प्रातः काल</span>
        </span>
        {isCompleted && (
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            <span>सफल हुआ</span>
          </span>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold font-hindi text-maroon-800">
          सुबह की शुरुआत स्वमान से
        </h3>
        <p className="text-xs text-spiritual-muted font-hindi mt-0.5">
          शरीर और संसार के भान से परे अपनी अनादि पहचान।
        </p>
      </div>

      {/* Sacred Text Affirmation */}
      <div className="p-4 bg-gradient-to-br from-ivory-50 to-gold-50/60 rounded-xl border-l-4 border-maroon-700 border-r border-t border-b border-gold-200 text-xs sm:text-sm text-spiritual-dark font-hindi leading-relaxed italic">
        "मैं शरीर नहीं, इस शरीर को चलाने वाली चेतन आत्मा हूँ। मैं शांति स्वरूप आत्मा हूँ। मेरा वास्तविक स्वरूप शांति, पवित्रता, प्रेम और शक्ति से सम्पन्न है।"
      </div>

      {/* Guided 4-step practice */}
      <div className="space-y-2 text-xs font-hindi bg-ivory-50/80 p-3.5 rounded-xl border border-gold-200">
        <div className="font-bold text-maroon-900 mb-1">चार चरण अभ्यास:</div>
        <div className="flex items-start gap-2">
          <span className="w-5 h-5 rounded-full bg-gold-200 text-gold-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0">1</span>
          <span>कुछ क्षण स्वयं को भृकुटि के मध्य चमकती दिव्य आत्मा समझें।</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="w-5 h-5 rounded-full bg-gold-200 text-gold-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0">2</span>
          <span>अपने स्वमान का गहरा अनुभव करें — मैं शांति की मूरत हूँ।</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="w-5 h-5 rounded-full bg-gold-200 text-gold-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0">3</span>
          <span>शिव बाबा से बुद्धियोग जोड़ें और शांति-शक्ति की किरणें ग्रहण करें।</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="w-5 h-5 rounded-full bg-gold-200 text-gold-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0">4</span>
          <span>दिनभर श्रेष्ठ स्थिति में रहकर कर्म करने का संकल्प करें।</span>
        </div>
      </div>

      {/* Meditative timer */}
      <div className="bg-maroon-800 text-white p-4 rounded-xl flex items-center justify-between border border-gold-400/40 shadow-inner">
        <div>
          <span className="text-[10px] uppercase font-serif tracking-widest text-gold-300 block">ध्यान अवधि (Silence Timer)</span>
          <span className="text-2xl font-bold font-serif tracking-wider">{formatTime(timerSeconds)}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTimer}
            className="w-10 h-10 rounded-full bg-gold-500 hover:bg-gold-400 text-maroon-950 flex items-center justify-center shadow-md transition-all active:scale-95"
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <button
            onClick={resetTimer}
            className="p-2 text-gold-300/80 hover:text-gold-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        onClick={() => {
          sound.playStampSound();
          onComplete();
        }}
        className={`w-full py-3 rounded-xl font-bold text-xs font-hindi transition-all flex items-center justify-center gap-2 shadow-md ${
          isCompleted
            ? 'bg-emerald-700 text-white'
            : 'bg-maroon-700 hover:bg-maroon-800 text-gold-100'
        }`}
      >
        <CheckCircle className="w-4 h-4 text-gold-300" />
        <span>{isCompleted ? 'अभ्यास पूर्ण हुआ (पुनः संकल्प करें)' : 'अभ्यास पूरा हुआ'}</span>
      </button>

      <p className="text-[10px] text-spiritual-muted font-hindi text-center italic">
        * यह ऐप-लिखित अभ्यास भूमिका है, प्रत्यक्ष मुरली महावाक्य नहीं।
      </p>
    </div>
  );
};
