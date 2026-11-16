import React, { useState } from 'react';
import { Sparkles, BookOpen, Clock, Check, HelpCircle, ArrowRight, Trash2 } from 'lucide-react';
import { sound } from '../../utils/audio';

export interface JournalReflectionEntry {
  id: string;
  createdAt: string;
  biggestNeed: string;
  focusArea: string;
  situation: string;
  oldSanskar: string;
  babaDirection: string;
  newSanskar: string;
  elevatedAction: string;
  experience: string;
}

export const JournalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'past'>('new');
  
  // Form fields
  const [biggestNeed, setBiggestNeed] = useState<string>('');
  const [focusArea, setFocusArea] = useState<string>('');
  const [situation, setSituation] = useState<string>('');
  const [oldSanskar, setOldSanskar] = useState<string>('');
  const [babaDirection, setBabaDirection] = useState<string>('');
  const [newSanskar, setNewSanskar] = useState<string>('');
  const [elevatedAction, setElevatedAction] = useState<string>('');
  const [experience, setExperience] = useState<string>('');

  const [savedReflections, setSavedReflections] = useState<JournalReflectionEntry[]>(() => {
    try {
      const stored = localStorage.getItem('royal_reflections');
      return stored ? JSON.parse(stored) : [
        {
          id: 'ref-demo-1',
          createdAt: new Date(Date.now() - 86400000).toLocaleDateString('hi-IN'),
          biggestNeed: 'क्रोध के समय 3 सेकंड का मौन',
          focusArea: 'मधुरता और निर्मानता',
          situation: 'कार्यस्थल पर बात मन के अनुसार नहीं हुई',
          oldSanskar: 'तुरंत तीखा उत्तर देना',
          babaDirection: 'देही-अभिमानी बनो। द्रष्टा बनकर परिस्थिति को देखो।',
          newSanskar: 'शांत स्वरूप राजाई स्थिति',
          elevatedAction: 'रुककर मधुरता से बात रखी',
          experience: 'मन बहुत हल्का और शक्तिशाली महसूस हुआ।'
        }
      ];
    } catch {
      return [];
    }
  });

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim() && !newSanskar.trim()) return;

    const newEntry: JournalReflectionEntry = {
      id: `ref-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('hi-IN'),
      biggestNeed,
      focusArea,
      situation,
      oldSanskar,
      babaDirection,
      newSanskar,
      elevatedAction,
      experience,
    };

    const updated = [newEntry, ...savedReflections];
    setSavedReflections(updated);
    try {
      localStorage.setItem('royal_reflections', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    sound.playTibetanBowl();
    sound.playChime();

    // Reset fields
    setBiggestNeed('');
    setFocusArea('');
    setSituation('');
    setOldSanskar('');
    setBabaDirection('');
    setNewSanskar('');
    setElevatedAction('');
    setExperience('');
    setActiveTab('past');
  };

  const handleDeleteReflection = (id: string) => {
    const updated = savedReflections.filter((r) => r.id !== id);
    setSavedReflections(updated);
    try {
      localStorage.setItem('royal_reflections', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center pt-2 space-y-1">
        <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-amber-400 font-bold block">
          MY PERSONAL PURUSHARTH MAP
        </span>
        <h1 className="text-2xl sm:text-3xl font-hindi font-bold text-amber-100">
          मेरा पुरुषार्थ
        </h1>
        <p className="text-xs font-serif text-amber-300/80 italic">
          "A quiet space to notice, choose and grow."
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-white/[0.05] border border-amber-500/20">
        <button
          onClick={() => {
            sound.playChime();
            setActiveTab('new');
          }}
          className={`py-2 rounded-xl text-xs font-serif font-bold transition-all ${
            activeTab === 'new'
              ? 'bg-amber-500 text-maroon-950 shadow-md shadow-amber-500/20'
              : 'text-amber-200/80 hover:text-amber-100'
          }`}
        >
          New reflection
        </button>
        <button
          onClick={() => {
            sound.playChime();
            setActiveTab('past');
          }}
          className={`py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'past'
              ? 'bg-amber-500 text-maroon-950 shadow-md shadow-amber-500/20'
              : 'text-amber-200/80 hover:text-amber-100'
          }`}
        >
          <span>Past reflections</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
            {savedReflections.length}
          </span>
        </button>
      </div>

      {/* Tab 1: New Reflection Form */}
      {activeTab === 'new' && (
        <form onSubmit={handleSaveReflection} className="space-y-3">
          <div className="rounded-2xl bg-gradient-to-b from-[#25091E]/90 to-[#150314]/90 border border-amber-500/30 p-4 space-y-3 text-xs font-hindi">
            
            {/* 1. अभी मेरी सबसे बड़ी आवश्यकता */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider uppercase text-amber-400 font-bold block">
                अभी मेरी सबसे बड़ी आवश्यकता
              </label>
              <input
                type="text"
                value={biggestNeed}
                onChange={(e) => setBiggestNeed(e.target.value)}
                placeholder="उदा. शांति में टिकना, तुरंत प्रतिक्रिया न देना..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-500/20 text-amber-100 placeholder:text-amber-300/30 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* 2. आज मुझे किस बात पर ध्यान देना है? */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider uppercase text-amber-400 font-bold block">
                आज मुझे किस बात पर ध्यान देना है?
              </label>
              <input
                type="text"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                placeholder="उदा. मीठे बोल, साक्षी दृष्टि..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-500/20 text-amber-100 placeholder:text-amber-300/30 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* 3. स्थिति */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider uppercase text-amber-400 font-bold block">
                स्थिति (क्या हुआ और मैंने क्या महसूस किया?)
              </label>
              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                rows={2}
                placeholder="परिस्थिति का संक्षिप्त विवरण..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-500/20 text-amber-100 placeholder:text-amber-300/30 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            {/* 4. मेरा पुराना संस्कार */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider uppercase text-rose-400 font-bold block">
                मेरा पुराना संस्कार (पुराना pattern)
              </label>
              <input
                type="text"
                value={oldSanskar}
                onChange={(e) => setOldSanskar(e.target.value)}
                placeholder="उदा. क्रोध करना, बहस में पड़ना..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-rose-500/20 text-amber-100 placeholder:text-amber-300/30 focus:outline-none focus:border-rose-400"
              />
            </div>

            {/* 5. बाबा की दिशा */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider uppercase text-amber-300 font-bold block">
                बाबा की दिशा (इस परिस्थिति में मेरी दिशा…)
              </label>
              <input
                type="text"
                value={babaDirection}
                onChange={(e) => setBabaDirection(e.target.value)}
                placeholder="उदा. देही-अभिमानी बनो, साक्षी भाव रखो..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-400/30 text-amber-100 placeholder:text-amber-300/30 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* 6. मेरा नया श्रेष्ठ संस्कार */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-bold block">
                मेरा नया श्रेष्ठ संस्कार (मैं कौन-सा संस्कार धारण करूँगा?)
              </label>
              <input
                type="text"
                value={newSanskar}
                onChange={(e) => setNewSanskar(e.target.value)}
                placeholder="उदा. शांत स्वरूप, मास्टर सर्वशक्तिमान..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-emerald-500/30 text-amber-100 placeholder:text-amber-300/30 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* 7. मेरा एक श्रेष्ठ कर्म */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider uppercase text-amber-400 font-bold block">
                मेरा एक श्रेष्ठ कर्म (अभी मेरा एक छोटा कदम…)
              </label>
              <input
                type="text"
                value={elevatedAction}
                onChange={(e) => setElevatedAction(e.target.value)}
                placeholder="उदा. 3 बार गहरी सांस लेकर मुस्कुराना..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-500/20 text-amber-100 placeholder:text-amber-300/30 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* 8. आज का अनुभव */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider uppercase text-amber-400 font-bold block">
                आज का अनुभव (इस अभ्यास से मैंने क्या अनुभव किया?)
              </label>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                rows={2}
                placeholder="आंतरिक स्थिति और शांति का अनुभव..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-500/20 text-amber-100 placeholder:text-amber-300/30 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

          </div>

          {/* Baba se poochhein prompt */}
          <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-300 font-bold uppercase">
              <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
              बाबा से पूछें…
            </div>
            <p className="text-xs font-hindi text-purple-200 italic font-medium">
              "बाबा, मेरे पुरुषार्थ की अगली मंज़िल क्या है?"
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 text-maroon-950 font-bold font-serif shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Save reflection</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-center text-[10px] text-amber-300/50 italic pt-1">
            Your personal journey, one conscious choice at a time.
          </p>
        </form>
      )}

      {/* Tab 2: Past Reflections */}
      {activeTab === 'past' && (
        <div className="space-y-3">
          {savedReflections.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <BookOpen className="w-6 h-6 text-amber-400/40 mx-auto" />
              <p className="text-xs font-hindi text-amber-300/70">
                अभी कोई डायरी प्रविष्टि नहीं है। 'New reflection' से शुरुआत करें।
              </p>
            </div>
          ) : (
            savedReflections.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl bg-gradient-to-b from-[#22091D] to-[#140312] border border-amber-500/30 p-4 space-y-2 text-xs font-hindi"
              >
                <div className="flex items-center justify-between border-b border-amber-500/15 pb-2">
                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {r.createdAt}
                  </span>
                  <button
                    onClick={() => handleDeleteReflection(r.id)}
                    className="text-rose-400/60 hover:text-rose-300 p-1"
                    title="हटाएं"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {r.biggestNeed && (
                  <div>
                    <span className="text-[9px] font-mono uppercase text-amber-400/70 block">
                      आवश्यकता:
                    </span>
                    <span className="text-amber-100 font-semibold">{r.biggestNeed}</span>
                  </div>
                )}

                {r.situation && (
                  <div>
                    <span className="text-[9px] font-mono uppercase text-amber-400/70 block">
                      स्थिति:
                    </span>
                    <span className="text-amber-200/90">{r.situation}</span>
                  </div>
                )}

                {r.babaDirection && (
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-400/20">
                    <span className="text-[9px] font-mono uppercase text-amber-300 font-bold block">
                      बाबा की दिशा:
                    </span>
                    <span className="text-amber-100 italic">"{r.babaDirection}"</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {r.newSanskar && (
                    <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                      <span className="text-[9px] font-mono uppercase text-emerald-400 font-bold block">
                        नया संस्कार:
                      </span>
                      <span className="text-emerald-200">{r.newSanskar}</span>
                    </div>
                  )}

                  {r.elevatedAction && (
                    <div className="p-2 rounded-xl bg-blue-950/40 border border-blue-500/30">
                      <span className="text-[9px] font-mono uppercase text-blue-400 font-bold block">
                        श्रेष्ठ कर्म:
                      </span>
                      <span className="text-blue-200">{r.elevatedAction}</span>
                    </div>
                  )}
                </div>

                {r.experience && (
                  <div className="pt-1 text-[11px] text-amber-300/80 italic">
                    अनुभव: {r.experience}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
