import React, { useState } from 'react';
import { NightReflectionRecord } from '../../types';
import { Moon, Save, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface NightReflectionProps {
  onSaveReflection: (reflection: NightReflectionRecord) => void;
  existingReflection?: NightReflectionRecord;
}

export const NightReflection: React.FC<NightReflectionProps> = ({
  onSaveReflection,
  existingReflection,
}) => {
  const [q1, setQ1] = useState<string>(existingReflection?.successfulSituation || '');
  const [q2, setQ2] = useState<string>(existingReflection?.oldPatternRecognized || '');
  const [q3, setQ3] = useState<string>('');
  const [q4, setQ4] = useState<string>(existingReflection?.nextElevatedThought || '');
  const [q5, setQ5] = useState<string>(existingReflection?.gratitudeToBaba || '');
  const [rating, setRating] = useState<number>(existingReflection?.purusharthRating || 4);
  const [isSaved, setIsSaved] = useState<boolean>(!!existingReflection);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playStampSound();

    const record: NightReflectionRecord = {
      id: existingReflection?.id || 'ref-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      successfulSituation: q1.trim() || 'आज कई सामान्य परिस्थितियों में शांत रहा।',
      oldPatternRecognized: q2.trim() || 'मन में हल्की जल्दबाजी या अपेक्षा आई थी।',
      nextElevatedThought: q4.trim() || 'कल हर परिस्थिति में पहले 2 सेकंड रुककर स्वमान याद रखूँगा।',
      gratitudeToBaba: q5.trim() || 'बाबा का बहुत शुक्रिया कि हर पल छत्रछाया बनी रही।',
      purusharthRating: rating,
      createdAt: new Date().toISOString(),
    };

    onSaveReflection(record);
    setIsSaved(true);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold flex items-center gap-1.5">
          <Moon className="w-3.5 h-3.5 text-indigo-500" />
          <span>Screen D • रात्रि स्व-चेकिंग</span>
        </span>
        {isSaved && (
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>दर्ज हो चुका</span>
          </span>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold font-hindi text-maroon-800">
          दिन का हिसाब, स्वयं के साथ
        </h3>
        <p className="text-xs text-spiritual-muted font-hindi">
          बिना किसी आत्म-ग्लानि या दोष के, सच्चे दिल से बाबा के सामने स्व-निरीक्षण।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
        <div>
          <label className="block text-xs font-semibold text-spiritual-dark mb-1 font-hindi">
            1. आज किस परिस्थिति में मैं अपनी श्रेष्ठ स्थिति में रहा/रही?
          </label>
          <input
            type="text"
            value={q1}
            onChange={(e) => setQ1(e.target.value)}
            placeholder="उदा. जब किसी ने अनुचित बोला तो मैंने शांत रहकर उत्तर दिया..."
            className="w-full px-3 py-2 text-xs border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-700 font-hindi bg-ivory-50/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-spiritual-dark mb-1 font-hindi">
            2. कहाँ पुराना संस्कार सामने आया?
          </label>
          <input
            type="text"
            value={q2}
            onChange={(e) => setQ2(e.target.value)}
            placeholder="उदा. जब कार्य में देरी हुई तो चिड़चिड़ापन आया..."
            className="w-full px-3 py-2 text-xs border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-700 font-hindi bg-ivory-50/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-spiritual-dark mb-1 font-hindi">
            3. उस समय मेरे मन में क्या संकल्प चल रहे थे?
          </label>
          <input
            type="text"
            value={q3}
            onChange={(e) => setQ3(e.target.value)}
            placeholder="उदा. 'मेरे साथ ही ऐसा क्यों होता है?' जैसे विचार चले..."
            className="w-full px-3 py-2 text-xs border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-700 font-hindi bg-ivory-50/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-spiritual-dark mb-1 font-hindi">
            4. अगली बार मैं कौन-सा श्रेष्ठ संकल्प धारण करूँगा/करूँगी?
          </label>
          <input
            type="text"
            value={q4}
            onChange={(e) => setQ4(e.target.value)}
            placeholder="उदा. ड्रामा का हर दृश्य कल्याणकारी है, पहले शांत होकर विचार करूँगा..."
            className="w-full px-3 py-2 text-xs border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-700 font-hindi bg-ivory-50/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-spiritual-dark mb-1 font-hindi">
            5. आज मैं बाबा का शुक्रिया किस बात के लिए अदा करना चाहता/चाहती हूँ?
          </label>
          <input
            type="text"
            value={q5}
            onChange={(e) => setQ5(e.target.value)}
            placeholder="उदा. मुझे सच्ची समझ देने और हर कदम पर सम्भालने के लिए शुक्रिया बाबा..."
            className="w-full px-3 py-2 text-xs border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-700 font-hindi bg-ivory-50/50"
          />
        </div>

        {/* Rating 1-5 */}
        <div className="pt-2 border-t border-gold-200">
          <label className="block text-xs font-semibold text-spiritual-dark mb-1.5 font-hindi">
            आज मैंने अपने पुरुषार्थ को कितना समय व सजगता दी?
          </label>
          <div className="flex items-center justify-between gap-1.5 bg-ivory-50 p-2.5 rounded-xl border border-gold-200">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold font-serif transition-all ${
                  rating === num
                    ? 'bg-maroon-700 text-gold-100 shadow-xs'
                    : 'bg-white text-spiritual-muted hover:text-maroon-700 border border-gold-200'
                }`}
              >
                ★ {num}
              </button>
            ))}
          </div>
          <span className="block text-[10px] text-spiritual-muted font-hindi text-center mt-1">
            (1 = बहुत कम सजगता, 5 = निरंतर याद व सजग स्थिति • यह व्यक्तिगत पैमाने पर है, आध्यात्मिक पद नहीं)
          </span>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 hover:to-maroon-900 text-gold-100 font-bold text-xs rounded-xl shadow-md font-hindi flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
        >
          <Save className="w-4 h-4 text-gold-300" />
          <span>{isSaved ? 'आज की Reflection अपडेट करें' : 'आज की Reflection सेव करें'}</span>
        </button>
      </form>
    </div>
  );
};
