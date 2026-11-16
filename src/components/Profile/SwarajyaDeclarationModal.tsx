import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { SWARAJYA_DECLARATION_POINTS } from '../../data/sanskarData';
import { Award, CheckCircle2, PenTool, X, Download } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface SwarajyaDeclarationModalProps {
  profile: UserProfile;
  onUpdateSignature: (name: string, date: string) => void;
  onClose: () => void;
}

export const SwarajyaDeclarationModal: React.FC<SwarajyaDeclarationModalProps> = ({
  profile,
  onUpdateSignature,
  onClose,
}) => {
  const [signatureName, setSignatureName] = useState<string>(profile.signatureName || profile.name);
  const [date, setDate] = useState<string>(profile.signedDate || new Date().toISOString().split('T')[0]);
  const [isSigned, setIsSigned] = useState<boolean>(true);

  const handleSign = () => {
    sound.playStampSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onUpdateSignature(signatureName, date);
    setIsSigned(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-ivory-50 border-4 border-gold-400 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-royal-lg text-spiritual-dark relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-spiritual-muted hover:text-maroon-800 rounded-full bg-white/80"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Certificate Border Details */}
        <div className="text-center space-y-1 mb-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-maroon-700 text-gold-300 flex items-center justify-center text-xl shadow-md border-2 border-gold-300">
            👑
          </div>
          <span className="text-[11px] font-serif uppercase tracking-widest text-gold-700 font-bold block">
            SWARAJYA DECLARATION • राजाई स्वराज्य
          </span>
          <h2 className="text-2xl font-bold font-hindi text-maroon-900">
            स्वराज्य घोषणा-पत्र
          </h2>
          <p className="text-[11px] text-spiritual-muted font-hindi">
            हर पल अपनी मंजिल की याद • अधिकार पत्र
          </p>
        </div>

        {/* 10 Declaration Points from PDF Page 34 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gold-200 shadow-inner space-y-2 max-h-64 overflow-y-auto pr-1">
          {SWARAJYA_DECLARATION_POINTS.map((point) => (
            <div key={point} className="flex items-center gap-2 text-xs font-hindi text-maroon-950">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
              <span className="font-semibold">{point}</span>
            </div>
          ))}

          <div className="pt-3 border-t border-gold-200 mt-2 text-xs font-hindi text-center italic text-maroon-900 font-medium">
            "मैं हर पल इसी स्वराज्य अधिकारी स्थिति में स्थित रहने का दृढ़ संकल्प करता हूँ।"
          </div>
        </div>

        {/* Signature & Date Area from PDF Page 34 */}
        <div className="mt-4 p-3.5 bg-gold-50/60 rounded-xl border border-gold-300 space-y-2">
          <div className="grid grid-cols-2 gap-3 text-xs font-hindi">
            <div>
              <label className="block text-[10px] uppercase font-bold text-spiritual-muted mb-0.5">
                हस्ताक्षर (Signature)
              </label>
              <input
                type="text"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                className="w-full px-2 py-1 border-b-2 border-maroon-700 bg-transparent font-serif font-bold text-maroon-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-spiritual-muted mb-0.5">
                दिनांक (Date)
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-2 py-1 border-b-2 border-maroon-700 bg-transparent font-serif font-bold text-maroon-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSign}
            className="flex-1 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md font-hindi flex items-center justify-center gap-1.5"
          >
            <PenTool className="w-3.5 h-3.5 text-gold-300" />
            <span>हस्ताक्षर सुरक्षित करें (Sign & Seal)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
