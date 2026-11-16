import React, { useState, useEffect } from 'react';
import { RescueSituation, RescueSessionRecord, UserProfile } from '../../types';
import { Sparkles, ArrowRight, ArrowLeft, Heart, CheckCircle2, Volume2, Shield } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { StampBadge } from '../Common/StampBadge';
import { INITIAL_STAMPS } from '../../data/stampsData';

interface RescueWizardProps {
  situation: RescueSituation;
  profile: UserProfile;
  onCancel: () => void;
  onSaveSession: (session: RescueSessionRecord) => void;
}

export const RescueWizard: React.FC<RescueWizardProps> = ({
  situation,
  profile,
  onCancel,
  onSaveSession,
}) => {
  const [step, setStep] = useState<number>(1);
  const [trigger, setTrigger] = useState<string>('');
  const [emotionalState, setEmotionalState] = useState<string>(situation.defaultEmotions[0] || 'व्यग्रता');
  const [intensityBefore, setIntensityBefore] = useState<number>(4);
  const [selectedOldSanskar, setSelectedOldSanskar] = useState<string>(situation.commonOldSanskars[0] || '');
  const [customOldSanskar, setCustomOldSanskar] = useState<string>('');
  
  // 30-sec remembrance timer
  const [countdown, setCountdown] = useState<number>(30);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerDone, setTimerDone] = useState<boolean>(false);

  // Step 7: Choose response
  const [chosenResponse, setChosenResponse] = useState<string>('शांत रहकर उत्तर दूँगा/दूँगी।');
  const [customResponse, setCustomResponse] = useState<string>('');
  
  // Step 8: Recheck
  const [intensityAfter, setIntensityAfter] = useState<number>(1);
  const [reflectionText, setReflectionText] = useState<string>('');
  const [savedSession, setSavedSession] = useState<RescueSessionRecord | null>(null);

  // Timer effect for Step 6
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (timerRunning && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && timerRunning) {
      setTimerRunning(false);
      setTimerDone(true);
      sound.playTibetanBowl();
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerRunning, countdown]);

  const startPause = () => {
    setCountdown(30);
    setTimerRunning(true);
    setTimerDone(false);
    sound.playTibetanBowl();
  };

  const handleCompleteSave = () => {
    sound.playStampSound();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });

    const finalRecord: RescueSessionRecord = {
      id: 'rescue-' + Date.now(),
      situationId: situation.id,
      situationName: situation.nameEn,
      trigger: trigger.trim() || situation.triggerPlaceholder,
      emotionalState,
      intensityBefore,
      oldSanskar: customOldSanskar.trim() ? customOldSanskar.trim() : selectedOldSanskar,
      selectedQuality: situation.recommendedQuality,
      newResponse: customResponse.trim() ? customResponse.trim() : chosenResponse,
      intensityAfter,
      reflectionText: reflectionText.trim() || 'मैंने अपनी स्थिति को परिस्थिति से ऊपर रखा।',
      stampAwardedId: situation.stampId,
      createdAt: new Date().toISOString(),
    };

    setSavedSession(finalRecord);
    onSaveSession(finalRecord);
    setStep(9);
  };

  const awardedStamp = INITIAL_STAMPS.find((s) => s.id === situation.stampId) || INITIAL_STAMPS[1];

  return (
    <div className="bg-ivory-100 border-2 border-gold-300 rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-royal-lg text-spiritual-dark relative">
      {/* Wizard Header */}
      <div className="flex items-center justify-between border-b border-gold-200 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🛡️</span>
          <div>
            <span className="text-[10px] font-serif uppercase tracking-widest text-maroon-700 font-bold block">
              {situation.borderNameHi}
            </span>
            <span className="text-xs font-bold font-hindi text-maroon-900">
              चरण {step} / 9
            </span>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="text-xs text-spiritual-muted hover:text-maroon-800 font-medium px-2 py-1 rounded-lg border border-gold-200"
        >
          रद्द करें
        </button>
      </div>

      {/* STEP 1: What happened? */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <span className="text-xs uppercase font-serif tracking-widest text-gold-600 font-bold">चरण 1 • परिस्थिति</span>
            <h3 className="text-lg font-bold text-maroon-800 font-hindi">
              ऐसा क्या हुआ जिसने आपकी स्थिति को प्रभावित किया?
            </h3>
            <p className="text-xs text-spiritual-muted font-hindi mt-1">
              बिना किसी बहाने के, संक्षेप में कारण लिखें:
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-gold-200">
            <textarea
              rows={3}
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              placeholder={situation.triggerPlaceholder}
              className="w-full text-xs font-hindi border-0 focus:ring-0 p-0 resize-none text-spiritual-dark placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={() => {
              sound.playSoftClick();
              setStep(2);
            }}
            className="w-full py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 font-hindi"
          >
            <span>आगे बढ़ें</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Identify State & Intensity */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <span className="text-xs uppercase font-serif tracking-widest text-gold-600 font-bold">चरण 2 • आंतरिक अनुभव</span>
            <h3 className="text-lg font-bold text-maroon-800 font-hindi">
              इस समय आप क्या अनुभव कर रहे हैं?
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[...situation.defaultEmotions, 'अपमान', 'असंतुष्टता'].map((emo) => (
              <button
                key={emo}
                type="button"
                onClick={() => setEmotionalState(emo)}
                className={`py-2 px-3 text-xs font-hindi font-medium rounded-xl border transition-all text-left ${
                  emotionalState === emo
                    ? 'bg-maroon-50 border-maroon-700 text-maroon-900 font-bold shadow-2xs'
                    : 'bg-white border-gold-200 text-spiritual-dark hover:bg-ivory-50'
                }`}
              >
                {emo}
              </button>
            ))}
          </div>

          {/* Intensity scale 1-5 */}
          <div className="bg-white p-3.5 rounded-xl border border-gold-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-hindi">
              <span className="font-semibold text-maroon-900">तीव्रता स्तर (Intensity Scale):</span>
              <span className="font-serif font-bold text-maroon-700">{intensityBefore} / 5</span>
            </div>
            <div className="flex justify-between gap-1.5">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setIntensityBefore(lvl)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold font-serif ${
                    intensityBefore === lvl
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-ivory-100 text-spiritual-muted hover:bg-rose-50 border border-gold-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-spiritual-muted">
              <span>सामान्य प्रभाव</span>
              <span>अत्यधिक तीव्र</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 text-xs border border-gold-200 rounded-xl font-hindi"
            >
              पीछे
            </button>
            <button
              onClick={() => {
                sound.playSoftClick();
                setStep(3);
              }}
              className="flex-1 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 font-hindi"
            >
              <span>आगे बढ़ें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Identify Old Sanskar */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <span className="text-xs uppercase font-serif tracking-widest text-gold-600 font-bold">चरण 3 • पुराने संस्कार की पहचान</span>
            <h3 className="text-lg font-bold text-maroon-800 font-hindi">
              इस परिस्थिति में आपका कौन-सा पुराना संस्कार सक्रिय हुआ?
            </h3>
          </div>

          <div className="space-y-2">
            {situation.commonOldSanskars.map((sanskar) => (
              <div
                key={sanskar}
                onClick={() => {
                  setSelectedOldSanskar(sanskar);
                  setCustomOldSanskar('');
                }}
                className={`p-3 rounded-xl border text-xs font-hindi cursor-pointer flex items-center justify-between transition-all ${
                  selectedOldSanskar === sanskar && !customOldSanskar
                    ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold'
                    : 'bg-white border-gold-200 text-spiritual-dark hover:bg-ivory-50'
                }`}
              >
                <span>{sanskar}</span>
                {selectedOldSanskar === sanskar && !customOldSanskar && (
                  <CheckCircle2 className="w-4 h-4 text-rose-700" />
                )}
              </div>
            ))}

            <input
              type="text"
              value={customOldSanskar}
              onChange={(e) => setCustomOldSanskar(e.target.value)}
              placeholder="या अपना पुराना पैटर्न लिखें..."
              className="w-full px-3 py-2 text-xs border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-700 font-hindi bg-white"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 text-xs border border-gold-200 rounded-xl font-hindi"
            >
              पीछे
            </button>
            <button
              onClick={() => {
                sound.playSoftClick();
                setStep(4);
              }}
              className="flex-1 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 font-hindi"
            >
              <span>आगे बढ़ें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Remember your Higher Self */}
      {step === 4 && (
        <div className="space-y-4 text-center py-2">
          <span className="text-xs uppercase font-serif tracking-widest text-gold-600 font-bold">चरण 4 • स्वमान स्मृति</span>
          <div className="w-16 h-16 mx-auto rounded-full bg-maroon-700 border-2 border-gold-400 flex items-center justify-center text-3xl shadow-lg">
            👑
          </div>

          <div className="p-4 bg-white rounded-2xl border-2 border-gold-300 shadow-sm space-y-2">
            <h3 className="text-base sm:text-lg font-bold font-serif text-maroon-900 leading-snug">
              "मैं परिस्थिति नहीं हूँ। मैं अपनी स्थिति का स्वामी हूँ।"
            </h3>
            <div className="pt-2 border-t border-gold-100 flex items-center justify-center gap-1.5 text-xs text-gold-700 font-bold font-hindi">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span>सक्रिय स्वरूप: {situation.recommendedQuality}</span>
            </div>
            <p className="text-xs text-spiritual-muted font-hindi italic">
              "{situation.remembranceAffirmation}"
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2 text-xs border border-gold-200 rounded-xl font-hindi"
            >
              पीछे
            </button>
            <button
              onClick={() => {
                sound.playSoftClick();
                setStep(5);
              }}
              className="flex-1 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 font-hindi"
            >
              <span>ज्ञान व बाबा की दिशा देखें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Gyan and Application */}
      {step === 5 && (
        <div className="space-y-4">
          <div>
            <span className="text-xs uppercase font-serif tracking-widest text-gold-600 font-bold">चरण 5 • बाबा की दिशा व ज्ञान</span>
            <h3 className="text-lg font-bold text-maroon-800 font-hindi">
              {situation.reflectionQuestion}
            </h3>
          </div>

          {/* Baba's verified direction */}
          <div className="p-3.5 bg-white rounded-xl border-l-4 border-maroon-700 border-r border-t border-b border-gold-200 text-xs font-hindi space-y-1">
            <div className="font-bold text-maroon-800">बाबा की स्पष्ट दिशा:</div>
            <p className="text-spiritual-dark italic leading-relaxed">
              "{situation.babaDirectionHi}"
            </p>
            <div className="text-[11px] text-spiritual-muted pt-1">
              {situation.gyanGuidanceHi}
            </div>
          </div>

          {/* Comparison: Old response vs New response */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-hindi">
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
              <span className="text-[10px] font-bold text-rose-800 block uppercase">पुराना व्यर्थ कर्म</span>
              <p className="text-spiritual-dark mt-1">{situation.oldResponseExample}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 block uppercase">नया राजाई कर्म</span>
              <p className="text-spiritual-dark mt-1 font-semibold">{situation.newResponseExample}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(4)}
              className="px-4 py-2 text-xs border border-gold-200 rounded-xl font-hindi"
            >
              पीछे
            </button>
            <button
              onClick={() => {
                sound.playSoftClick();
                setStep(6);
              }}
              className="flex-1 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 font-hindi"
            >
              <span>30-सेकंड शांति अभ्यास (Pause)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: 30-Second Mindful Pause & Remembrance */}
      {step === 6 && (
        <div className="space-y-4 text-center py-2">
          <span className="text-xs uppercase font-serif tracking-widest text-gold-600 font-bold">
            चरण 6 • 30-सेकंड परमात्म-स्मृति
          </span>

          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            {/* Breathing Ring Animation */}
            <div
              className={`absolute inset-0 rounded-full border-4 border-gold-400 ${
                timerRunning ? 'animate-ping opacity-40 duration-1000' : 'opacity-80'
              }`}
            />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-maroon-800 to-maroon-900 border-2 border-gold-300 flex flex-col items-center justify-center text-white shadow-xl">
              <span className="text-2xl font-bold font-serif">{countdown}s</span>
              <span className="text-[9px] text-gold-200 uppercase tracking-widest">
                {timerRunning ? 'श्वास लें • शांत' : timerDone ? 'पूर्ण' : 'प्रारंभ'}
              </span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-gold-200 text-xs font-hindi text-spiritual-dark leading-relaxed italic">
            "कुछ क्षण रुकें। स्वयं को शांति स्वरूप आत्मा अनुभव करें। अपनी बुद्धि को शिव बाबा की याद में स्थिर करें। अब परिस्थिति को एक दर्शक की तरह देखें।"
          </div>

          {!timerRunning && !timerDone && (
            <button
              onClick={startPause}
              className="w-full py-2.5 bg-gold-500 hover:bg-gold-600 text-maroon-950 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 font-hindi"
            >
              <Volume2 className="w-4 h-4" />
              <span>30-सेकंड शांति विराम शुरू करें</span>
            </button>
          )}

          {timerRunning && (
            <div className="text-xs font-serif text-maroon-800 animate-pulse font-bold">
              शिव बाबा की छत्रछाया में शांत और स्थिर रहें...
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setStep(5)}
              className="px-4 py-2 text-xs border border-gold-200 rounded-xl font-hindi"
            >
              पीछे
            </button>
            <button
              onClick={() => {
                sound.playSoftClick();
                setStep(7);
              }}
              className="flex-1 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 font-hindi"
            >
              <span>श्रेष्ठ प्रतिक्रिया चुनें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: Choose your Elevated Response */}
      {step === 7 && (
        <div className="space-y-4">
          <div>
            <span className="text-xs uppercase font-serif tracking-widest text-gold-600 font-bold">चरण 7 • राजाई कर्म चयन</span>
            <h3 className="text-lg font-bold text-maroon-800 font-hindi">
              अब आप क्या श्रेष्ठ कर्म करेंगे?
            </h3>
          </div>

          <div className="space-y-2">
            {[
              'शांत रहकर उत्तर दूँगा/दूँगी।',
              'पहले परिस्थिति को समझूँगा/समझूँगी।',
              'अभी मौन और स्व-चेकिंग करूँगा/करूँगी।',
              'आवश्यक हो तो स्पष्टता से बात करूँगा/करूँगी।',
              'अपनी प्रतिक्रिया को रोककर उचित समय पर बात करूँगा/करूँगी।'
            ].map((resp) => (
              <div
                key={resp}
                onClick={() => {
                  setChosenResponse(resp);
                  setCustomResponse('');
                }}
                className={`p-2.5 rounded-xl border text-xs font-hindi cursor-pointer flex items-center justify-between transition-all ${
                  chosenResponse === resp && !customResponse
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                    : 'bg-white border-gold-200 text-spiritual-dark hover:bg-ivory-50'
                }`}
              >
                <span>{resp}</span>
                {chosenResponse === resp && !customResponse && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                )}
              </div>
            ))}

            <input
              type="text"
              value={customResponse}
              onChange={(e) => setCustomResponse(e.target.value)}
              placeholder="या अपना स्वयं का उत्तर लिखें..."
              className="w-full px-3 py-2 text-xs border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-700 font-hindi bg-white"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(6)}
              className="px-4 py-2 text-xs border border-gold-200 rounded-xl font-hindi"
            >
              पीछे
            </button>
            <button
              onClick={() => {
                sound.playSoftClick();
                setStep(8);
              }}
              className="flex-1 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 font-hindi"
            >
              <span>स्थिति री-चेक करें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 8: Recheck State & Save */}
      {step === 8 && (
        <div className="space-y-4">
          <div>
            <span className="text-xs uppercase font-serif tracking-widest text-gold-600 font-bold">चरण 8 • स्थिति पुनः जाँच</span>
            <h3 className="text-lg font-bold text-maroon-800 font-hindi">
              अब आपकी स्थिति कैसी है?
            </h3>
            <p className="text-xs text-spiritual-muted font-hindi">
              पहले तीव्रता: <strong className="text-rose-600 font-serif">{intensityBefore}/5</strong>
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-gold-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-hindi">
              <span className="font-semibold text-maroon-900">अब तीव्रता स्तर (After Intensity):</span>
              <span className="font-serif font-bold text-emerald-700">{intensityAfter} / 5</span>
            </div>
            <div className="flex justify-between gap-1.5">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setIntensityAfter(lvl)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold font-serif ${
                    intensityAfter === lvl
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-ivory-100 text-spiritual-muted hover:bg-emerald-50 border border-gold-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-spiritual-muted">
              <span>शांत व स्थिर (Light)</span>
              <span>अशांत</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-spiritual-dark mb-1 font-hindi">
              व्यक्तिगत अनुभूति / सीख (Optional):
            </label>
            <input
              type="text"
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="उदा. मैंने बाबा की याद से क्रोध पर विजय पाई..."
              className="w-full px-3 py-2 text-xs border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-700 font-hindi bg-white"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setStep(7)}
              className="px-4 py-2 text-xs border border-gold-200 rounded-xl font-hindi"
            >
              पीछे
            </button>
            <button
              onClick={handleCompleteSave}
              className="flex-1 py-3 bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 font-hindi transition-transform active:scale-[0.98]"
            >
              <Heart className="w-4 h-4 text-gold-300" />
              <span>मेरी Transformation Journey में सेव करें</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 9: Success & Royal Stamp Unlocked Celebration */}
      {step === 9 && (
        <div className="space-y-4 text-center py-2 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-3xl shadow-md">
            🕊️
          </div>

          <span className="text-xs uppercase font-serif tracking-widest text-gold-700 font-bold block">
            ROYAL PASSPORT STAMP UNLOCKED
          </span>
          <h3 className="text-xl font-bold text-maroon-900 font-hindi">
            परिस्थिति पर स्वराज्य की विजय!
          </h3>

          <div className="py-2 flex justify-center">
            <StampBadge stamp={awardedStamp} size="lg" />
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-gold-200 text-xs font-hindi text-left space-y-1">
            <div className="flex justify-between text-spiritual-muted text-[11px]">
              <span>तीव्रता में परिवर्तन:</span>
              <span className="font-serif font-bold text-emerald-700">
                {intensityBefore}/5 → {intensityAfter}/5 ({intensityBefore - intensityAfter > 0 ? `-${intensityBefore - intensityAfter} सुधार` : 'स्थिर'})
              </span>
            </div>
            <div className="text-spiritual-dark">
              <strong>चुना गया कर्म: </strong>
              {savedSession?.newResponse}
            </div>
          </div>

          <button
            onClick={onCancel}
            className="w-full py-3 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md font-hindi"
          >
            पासपोर्ट में वापस लौटें
          </button>
        </div>
      )}
    </div>
  );
};
