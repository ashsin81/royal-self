import React from 'react';
import { X, Sparkles, Crown, HelpCircle, ArrowRight, BookOpen } from 'lucide-react';
import { sound } from '../../utils/audio';

interface AboutJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToVisa: () => void;
}

export const AboutJourneyModal: React.FC<AboutJourneyModalProps> = ({
  isOpen,
  onClose,
  onGoToVisa,
}) => {
  if (!isOpen) return null;

  const fourSteps = [
    { num: '01', title: 'पासपोर्ट खोलिए।', desc: 'परिस्थिति आने पर घबराएं नहीं, अपना पासपोर्ट निकालें।' },
    { num: '02', title: 'सही पृष्ठ चुनिए।', desc: 'क्रोध, मन, तुलना, अभिमान... जो सीमा सामने हो, वही पृष्ठ खोलें।' },
    { num: '03', title: 'बाबा की याद में आइए।', desc: 'परमपिता परमात्मा शिव बाबा की शक्ति और दिशा का सहारा लें।' },
    { num: '04', title: 'अपनी श्रेष्ठ स्थिति से कर्म कीजिए।', desc: 'प्रतिक्रिया नहीं, राजाई स्थिति से श्रेष्ठ कर्म चुनें।' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto bg-gradient-to-b from-[#240A1D] via-[#1A0515] to-[#0E020C] border-2 border-amber-500/40 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-amber-50 space-y-4 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold block uppercase">
                YOUR INNER JOURNEY
              </span>
              <span className="text-xs font-serif text-amber-300/80">
                PASSPORT TO THE SELF
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-amber-300/70 hover:text-amber-100 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-amber-400 font-bold block">
            WELCOME TO THE JOURNEY WITHIN
          </span>
          <h2 className="text-2xl font-bold font-hindi text-amber-100">
            स्वयं से स्वयं की यात्रा
          </h2>
          <p className="text-sm font-hindi text-amber-300 font-medium">
            राजाई पासपोर्ट
          </p>
        </div>

        {/* Description */}
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-amber-500/20 space-y-2 text-xs font-hindi text-amber-200/90 leading-relaxed">
          <p>
            यह पासपोर्ट किसी बाहरी भौतिक यात्रा के लिए नहीं, यह अंतर्जगत की वह पावन यात्रा है जहाँ आत्मा अपने सच्चे स्वरूप को पहचानती है।
          </p>
          <p className="text-amber-300 italic font-medium">
            "एक ऐसा आध्यात्मिक पासपोर्ट जो परिस्थिति बदलने पर भी आपकी स्थिति को अचल और राजाई बनाए रखे।"
          </p>
        </div>

        {/* When a situation shakes your peace */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-wider uppercase text-amber-400 font-bold block">
            WHEN A SITUATION SHAKES YOUR PEACE
          </span>

          <div className="space-y-2">
            {fourSteps.map((st) => (
              <div
                key={st.num}
                className="p-2.5 rounded-xl bg-black/40 border border-amber-500/20 flex items-start gap-2.5"
              >
                <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  {st.num}
                </span>
                <div>
                  <div className="text-xs font-bold font-hindi text-amber-100">
                    {st.title}
                  </div>
                  <div className="text-[11px] font-hindi text-amber-200/70">
                    {st.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Baba se poochhein query */}
        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-300 font-bold uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            बाबा से पूछें…
          </div>
          <p className="text-xs font-hindi text-purple-200 italic font-medium">
            "बाबा, इस समय मुझे अपनी कौन-सी श्रेष्ठ स्थिति को सामने रखना है?"
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <button
            onClick={() => {
              sound.playTibetanBowl();
              onClose();
              onGoToVisa();
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 text-maroon-950 font-bold font-serif shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Create my spiritual visa</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
