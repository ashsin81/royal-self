import React from 'react';
import { UserProfile } from '../../types';
import { Award, Compass, FileText } from 'lucide-react';

interface PassportCardProps {
  profile: UserProfile;
  onOpenDeclaration: () => void;
}

export const PassportCard: React.FC<PassportCardProps> = ({ profile, onOpenDeclaration }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ivory-50 via-white to-gold-50/70 border-4 border-gold-400 p-5 sm:p-6 shadow-royal-lg text-spiritual-dark space-y-4">
      {/* Golden Corner Accents */}
      <div className="absolute top-2 left-2 text-gold-500 text-xs">❖</div>
      <div className="absolute top-2 right-2 text-gold-500 text-xs">❖</div>
      <div className="absolute bottom-2 left-2 text-gold-500 text-xs">❖</div>
      <div className="absolute bottom-2 right-2 text-gold-500 text-xs">❖</div>

      {/* Passport Header */}
      <div className="text-center space-y-1">
        <span className="text-[10px] uppercase font-serif tracking-widest text-gold-700 font-bold block">
          SPIRITUAL SELF-DEVELOPMENT PASSPORT
        </span>
        <div className="w-12 h-12 mx-auto rounded-full bg-maroon-700 border-2 border-gold-400 flex items-center justify-center text-xl shadow-md my-1">
          👑
        </div>
        <h2 className="text-xl font-bold font-serif text-maroon-900 tracking-wide">
          THE ROYAL PASSPORT
        </h2>
        <h3 className="text-base font-bold font-hindi text-maroon-800">
          राजाई स्वराज्य पासपोर्ट
        </h3>
        <p className="text-[11px] text-spiritual-muted font-hindi italic">
          "हर पल अपनी मंज़िल की याद।"
        </p>
      </div>

      {/* Official Passport Table from PDF Page 3 */}
      <div className="border-t-2 border-b-2 border-gold-300 py-3 grid grid-cols-3 text-center divide-x divide-gold-200 text-xs font-serif">
        <div className="px-1">
          <span className="text-[9px] uppercase tracking-wider text-spiritual-muted block">TRAVELLER</span>
          <span className="font-bold text-maroon-900 font-hindi">मैं आत्मा</span>
        </div>
        <div className="px-1">
          <span className="text-[9px] uppercase tracking-wider text-spiritual-muted block">GUIDE</span>
          <span className="font-bold text-maroon-900 font-hindi">शिव बाबा</span>
        </div>
        <div className="px-1">
          <span className="text-[9px] uppercase tracking-wider text-spiritual-muted block">AUTHORITY</span>
          <span className="font-bold text-maroon-900 font-hindi">स्वराज्य</span>
        </div>
      </div>

      {/* Passport Holder Details */}
      <div className="space-y-2.5 text-xs font-hindi bg-white/80 p-3.5 rounded-2xl border border-gold-200">
        <div>
          <span className="text-[10px] uppercase font-serif font-bold text-gold-700 block">
            TRAVELLER NAME:
          </span>
          <span className="text-sm font-bold text-maroon-950 font-hindi">
            {profile.name}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-serif font-bold text-gold-700 block">
            MY CORE IDENTITY:
          </span>
          <span className="text-xs font-semibold text-spiritual-dark font-hindi">
            शांति स्वरूप • पवित्र स्वरूप • मास्टर सर्वशक्तिमान
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-serif font-bold text-gold-700 block">
            MY ROYAL SANSKAR:
          </span>
          <span className="text-xs font-semibold text-spiritual-dark font-hindi">
            शांत • निर्माण • पवित्र • संतुष्ट • शुभचिंतक
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-serif font-bold text-gold-700 block">
            THE JOURNEY'S INTENT:
          </span>
          <p className="text-xs text-spiritual-dark font-hindi italic leading-relaxed">
            "अपने मन, दृष्टि, संस्कार और कर्म पर इतना स्वराज्य विकसित करना कि भीतर की शांति परिस्थिति पर निर्भर न रहे।"
          </p>
        </div>
      </div>

      {/* Official Seal stamp block */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-maroon-700 flex items-center justify-center text-maroon-800 text-[10px] font-serif font-bold uppercase rotate-[-6deg]">
            SHIV BABA
          </div>
          <div className="text-[10px] text-spiritual-muted font-hindi">
            <div>हस्ताक्षर: {profile.signatureName || profile.name}</div>
            <div>जारी दिनांक: {profile.signedDate || 'संगमयुग'}</div>
          </div>
        </div>

        <button
          onClick={onOpenDeclaration}
          className="px-3 py-1.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 text-xs font-bold rounded-xl shadow-xs font-hindi flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5 text-gold-300" />
          <span>स्वराज्य घोषणा-पत्र</span>
        </button>
      </div>

      {/* MRZ Machine Readable Zone from PDF Page 3 */}
      <div className="border-t border-gold-200 pt-2 text-[9px] font-mono tracking-widest text-spiritual-muted/70 select-none overflow-hidden text-center">
        P&lt;INDSOUL&lt;&lt;ROYAL&lt;SELF&lt;&lt;SHIV&lt;BABA&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />
        01010101&gt;&gt;&gt;&gt;&gt;&lt;&lt;&lt;&lt;&lt;SWARAJYA&lt;ADHIKARI&gt;&gt;&gt;&gt;&gt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
      </div>
    </div>
  );
};
