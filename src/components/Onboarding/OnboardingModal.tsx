import React, { useState } from 'react';
import { UserProfile, Language } from '../../types';
import { HIGHER_SELF_QUALITIES, SANSKAR_GOAL_PRESETS } from '../../data/sanskarData';
import { Sparkles, ArrowRight, CheckCircle2, Shield, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';

interface OnboardingModalProps {
  initialProfile: UserProfile;
  onComplete: (profile: UserProfile) => void;
  onClose?: () => void;
  isRetake?: boolean;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  initialProfile,
  onComplete,
  isRetake = false
}) => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>(initialProfile.name || '');
  const [language, setLanguage] = useState<Language>(initialProfile.language || 'hi');
  const [challenges, setChallenges] = useState<string[]>(initialProfile.challenges || []);
  const [selectedQualities, setSelectedQualities] = useState<string[]>(
    initialProfile.selectedQualities?.length ? initialProfile.selectedQualities : ['शांत स्वरूप', 'शक्तिशाली स्वरूप', 'पवित्र स्वरूप']
  );
  const [primarySanskarGoal, setPrimarySanskarGoal] = useState<string>(
    initialProfile.primarySanskarGoal || 'प्रतिक्रिया के स्थान पर शांति।'
  );
  const [customGoal, setCustomGoal] = useState<string>('');
  const [hasCommitted, setHasCommitted] = useState<boolean>(false);

  const allChallenges = [
    'क्रोध और चिड़चिड़ापन',
    'व्यर्थ संकल्प और Overthinking',
    'दूसरों से तुलना',
    'मान-सम्मान की अपेक्षा',
    'देह-अभिमान',
    'आलस्य और टालमटोल',
    'एकाग्रता की कमी',
    'संबंधों में प्रतिक्रिया',
    'निराशा और उदासी',
    'अपनी स्थिति में स्थिर न रह पाना',
    'पुराने संस्कारों की पुनरावृत्ति'
  ];

  const handleToggleChallenge = (item: string) => {
    setChallenges(prev =>
      prev.includes(item) ? prev.filter(c => c !== item) : [...prev, item]
    );
  };

  const handleToggleQuality = (qualityName: string) => {
    setSelectedQualities(prev => {
      if (prev.includes(qualityName)) {
        return prev.filter(q => q !== qualityName);
      }
      if (prev.length >= 3) {
        // Replace the oldest or limit to 3
        return [...prev.slice(1), qualityName];
      }
      return [...prev, qualityName];
    });
  };

  const handleFinish = () => {
    sound.playStampSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const finalProfile: UserProfile = {
      ...initialProfile,
      name: name.trim() || 'राजयोगी आत्मा',
      language,
      onboarded: true,
      challenges,
      selectedQualities,
      primarySanskarGoal: customGoal.trim() ? customGoal.trim() : primarySanskarGoal,
      signatureName: name.trim() || 'स्वराज्य अधिकारी',
      signedDate: new Date().toISOString().split('T')[0]
    };

    onComplete(finalProfile);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-ivory-100 border-2 border-gold-300 rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-royal-lg text-spiritual-dark my-auto relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-5 border-b border-gold-200 pb-3">
          <div className="flex items-center gap-1.5 text-xs text-gold-600 font-serif uppercase tracking-wider">
            <span>👑 ROYAL PASSPORT</span>
            <span>•</span>
            <span>चरण {step}/6</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step
                    ? 'w-6 bg-maroon-700'
                    : i < step
                    ? 'w-2 bg-gold-500'
                    : 'w-2 bg-gold-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* SCREEN 1 — Welcome */}
        {step === 1 && (
          <div className="text-center py-2 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-maroon-50 border-2 border-gold-400 flex items-center justify-center text-3xl shadow-sm">
              👑
            </div>
            <div className="space-y-1">
              <span className="text-xs font-serif uppercase tracking-widest text-gold-600 font-bold">
                राजाई स्वराज्य साथी
              </span>
              <h2 className="text-2xl font-bold font-serif text-maroon-800">
                ROYAL SELF
              </h2>
            </div>

            <div className="p-4 bg-white/80 rounded-xl border border-gold-200 shadow-xs text-left space-y-2">
              <h3 className="font-bold text-base text-maroon-800 font-hindi">
                "आपका स्वागत है अपने श्रेष्ठ स्वरूप की यात्रा में।"
              </h3>
              <p className="text-sm text-spiritual-muted font-hindi leading-relaxed">
                यह यात्रा किसी और को बदलने की नहीं, स्वयं को पहचानने और अपने संस्कारों को श्रेष्ठ बनाने की है।
              </p>
              <div className="pt-2 text-xs font-medium text-gold-700 italic border-t border-gold-100 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>"एक कदम प्रतिदिन, स्वयं के और करीब।"</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  sound.playSoftClick();
                  setStep(2);
                }}
                className="w-full py-3 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <span>शुरुआत करें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2 — Identity */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-gold-600 font-bold">पहचान (Identity)</span>
              <h3 className="text-xl font-bold text-maroon-800 font-hindi">
                मैं कौन हूँ?
              </h3>
              <p className="text-xs text-spiritual-muted mt-1 font-hindi">
                अपनी आध्यात्मिक यात्रा की शुरुआत अपनी पहचान से करें।
              </p>
            </div>

            <div className="space-y-3 bg-white p-4 rounded-xl border border-gold-200">
              <div>
                <label className="block text-xs font-semibold text-spiritual-dark mb-1 font-hindi">
                  आपका नाम / Spiritual Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. राजयोगी आत्मा, भाई/बहन..."
                  className="w-full px-3 py-2 text-sm border border-gold-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-700 font-hindi"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-spiritual-dark mb-1 font-hindi">
                  आप किस भाषा में ऐप इस्तेमाल करना चाहेंगे?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hi', label: 'हिंदी' },
                    { id: 'en', label: 'English' },
                    { id: 'hinglish', label: 'Hinglish' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLanguage(item.id as Language)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                        language === item.id
                          ? 'bg-maroon-700 text-gold-100 border-maroon-700 shadow-xs'
                          : 'bg-ivory-50 text-spiritual-dark border-gold-200 hover:bg-gold-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-xs text-spiritual-muted hover:text-spiritual-dark border border-gold-200 rounded-xl"
              >
                पीछे
              </button>
              <button
                onClick={() => {
                  sound.playSoftClick();
                  setStep(3);
                }}
                className="flex-1 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <span>आगे बढ़ें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3 — Current Purusharth Challenges */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-gold-600 font-bold">अवलोकन (Awareness)</span>
              <h3 className="text-xl font-bold text-maroon-800 font-hindi">
                इस समय आपका पुरुषार्थ किस दिशा में है?
              </h3>
              <p className="text-xs text-spiritual-muted mt-1 font-hindi">
                वे चुनौतियाँ चुनें जिन पर आप अभी ध्यान देना चाहते हैं (कोई भी निर्णय या अंकन नहीं):
              </p>
            </div>

            <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
              {allChallenges.map((item) => {
                const isSelected = challenges.includes(item);
                return (
                  <div
                    key={item}
                    onClick={() => handleToggleChallenge(item)}
                    className={`px-3 py-2 rounded-lg text-xs font-hindi cursor-pointer flex items-center justify-between border transition-all ${
                      isSelected
                        ? 'bg-maroon-50 border-maroon-600 text-maroon-900 font-semibold'
                        : 'bg-white border-gold-200 text-spiritual-dark hover:bg-ivory-50'
                    }`}
                  >
                    <span>{item}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-maroon-700 text-white border-maroon-700' : 'border-gold-300'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-xs text-spiritual-muted hover:text-spiritual-dark border border-gold-200 rounded-xl"
              >
                पीछे
              </button>
              <button
                onClick={() => {
                  sound.playSoftClick();
                  setStep(4);
                }}
                className="flex-1 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <span>आगे बढ़ें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4 — Higher Self Qualities */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-gold-600 font-bold">स्वमान (Higher Self)</span>
              <h3 className="text-xl font-bold text-maroon-800 font-hindi">
                मैं अपने किस स्वरूप को अधिक अनुभव करना चाहता/चाहती हूँ?
              </h3>
              <p className="text-xs text-spiritual-muted mt-1 font-hindi">
                किन्हीं <strong className="text-maroon-700">तीन (3)</strong> श्रेष्ठ स्वरूपों का चयन करें:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {HIGHER_SELF_QUALITIES.map((q) => {
                const isSelected = selectedQualities.includes(q.nameHi);
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => handleToggleQuality(q.nameHi)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2 ${
                      isSelected
                        ? 'bg-maroon-50 border-maroon-600 text-maroon-900 shadow-xs'
                        : 'bg-white border-gold-200 text-spiritual-dark hover:bg-ivory-50'
                    }`}
                  >
                    <span className="text-base">{q.icon}</span>
                    <div className="leading-tight">
                      <div className="text-xs font-bold font-hindi">{q.nameHi}</div>
                      <div className="text-[10px] text-spiritual-muted">{q.nameEn}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-right text-[11px] text-gold-700 font-semibold font-serif">
              चयनित: {selectedQualities.length}/3
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2.5 text-xs text-spiritual-muted hover:text-spiritual-dark border border-gold-200 rounded-xl"
              >
                पीछे
              </button>
              <button
                onClick={() => {
                  sound.playSoftClick();
                  setStep(5);
                }}
                disabled={selectedQualities.length === 0}
                className="flex-1 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold rounded-xl shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>आगे बढ़ें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 5 — Transformation Intention */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-gold-600 font-bold">संकल्प (Intention)</span>
              <h3 className="text-xl font-bold text-maroon-800 font-hindi">
                इस समय मेरा मुख्य पुरुषार्थ
              </h3>
              <p className="text-xs text-spiritual-muted mt-1 font-hindi">
                एक मुख्य संस्कार परिवर्तन लक्ष्य चुनें:
              </p>
            </div>

            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {[
                'प्रतिक्रिया के स्थान पर शांति।',
                'अपेक्षा के स्थान पर आत्मसम्मान।',
                'व्यर्थ संकल्पों के स्थान पर शुभ संकल्प।',
                'क्रोध के स्थान पर धैर्य।',
                'आलस्य के स्थान पर तत्परता।',
                'तुलना के स्थान पर स्वमान।',
                'शिकायत के स्थान पर संतुष्टता।'
              ].map((item) => {
                const isSelected = primarySanskarGoal === item && !customGoal;
                return (
                  <div
                    key={item}
                    onClick={() => {
                      setPrimarySanskarGoal(item);
                      setCustomGoal('');
                    }}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-hindi cursor-pointer flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-maroon-50 border-maroon-600 text-maroon-900 font-bold'
                        : 'bg-white border-gold-200 text-spiritual-dark hover:bg-ivory-50'
                    }`}
                  >
                    <span>{item}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-maroon-700" />}
                  </div>
                );
              })}

              <div className="pt-1">
                <input
                  type="text"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="या अपना व्यक्तिगत लक्ष्य लिखें..."
                  className="w-full px-3 py-2 text-xs border border-gold-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon-700 font-hindi bg-white"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(4)}
                className="px-4 py-2.5 text-xs text-spiritual-muted hover:text-spiritual-dark border border-gold-200 rounded-xl"
              >
                पीछे
              </button>
              <button
                onClick={() => {
                  sound.playSoftClick();
                  setStep(6);
                }}
                className="flex-1 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <span>आगे बढ़ें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 6 — Commitment */}
        {step === 6 && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gold-50 border border-gold-400 flex items-center justify-center text-maroon-800 mb-2">
                <Shield className="w-6 h-6 text-maroon-700" />
              </div>
              <span className="text-xs uppercase tracking-wider text-gold-600 font-bold">स्वराज्य संकल्प</span>
              <h3 className="text-xl font-bold text-maroon-800 font-hindi">
                मेरा आज का संकल्प
              </h3>
            </div>

            <div className="p-4 bg-white rounded-xl border border-gold-300 shadow-sm space-y-3">
              <p className="text-sm font-hindi leading-relaxed text-spiritual-dark italic text-center">
                "मैं प्रतिदिन थोड़ा समय स्वयं को पहचानने, बाबा को याद करने और अपने संस्कारों को श्रेष्ठ बनाने के लिए निकालूँगा/निकालूँगी।"
              </p>

              <label className="flex items-start gap-2.5 pt-3 border-t border-gold-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasCommitted}
                  onChange={(e) => setHasCommitted(e.target.checked)}
                  className="mt-0.5 rounded text-maroon-700 focus:ring-maroon-700 h-4 w-4"
                />
                <span className="text-xs font-semibold font-hindi text-maroon-900 leading-snug">
                  मैं अपने पुरुषार्थ की जिम्मेदारी स्वयं लेता/लेती हूँ।
                </span>
              </label>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(5)}
                className="px-4 py-2.5 text-xs text-spiritual-muted hover:text-spiritual-dark border border-gold-200 rounded-xl"
              >
                पीछे
              </button>
              <button
                onClick={handleFinish}
                disabled={!hasCommitted}
                className="flex-1 py-3 bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 hover:to-maroon-900 text-gold-100 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-transform active:scale-[0.98]"
              >
                <HeartHandshake className="w-4 h-4 text-gold-300" />
                <span>मेरी यात्रा शुरू करें</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
