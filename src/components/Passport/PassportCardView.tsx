import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { Crown, Sparkles, Shield, Camera, Edit2, ArrowRight, FileCheck2, Award, FileText, Luggage, BookOpen, Repeat, HelpCircle } from 'lucide-react';
import { sound } from '../../utils/audio';

interface PassportCardViewProps {
  profile: UserProfile;
  unlockedStampsCount: number;
  onUpdateProfile: (profile: UserProfile) => void;
  onOpenVisa: () => void;
  onOpenStamps: () => void;
  onOpenDeclaration: () => void;
  onOpenBaggage: () => void;
  onOpenHowToPractise: () => void;
  onOpenChooseNewRoute: () => void;
  onOpenAbout: () => void;
  onOpenAvatarViewer: () => void;
}

export const PassportCardView: React.FC<PassportCardViewProps> = ({
  profile,
  unlockedStampsCount,
  onUpdateProfile,
  onOpenVisa,
  onOpenStamps,
  onOpenDeclaration,
  onOpenBaggage,
  onOpenHowToPractise,
  onOpenChooseNewRoute,
  onOpenAbout,
  onOpenAvatarViewer,
}) => {
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(profile.name || 'मैं आत्मा (Soul)');

  const handleSaveName = () => {
    onUpdateProfile({
      ...profile,
      name: nameInput.trim() || 'मैं आत्मा (Soul)',
    });
    setIsEditingName(false);
    sound.playChime();
  };

  return (
    <div className="space-y-5 pb-24 max-w-md mx-auto">
      {/* Top Header */}
      <div className="text-center pt-2 space-y-1">
        <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-amber-400 font-bold block">
          MY SPIRITUAL PASSPORT
        </span>
        <h1 className="text-2xl sm:text-3xl font-hindi font-bold text-amber-100">
          मेरी राजाई पहचान
        </h1>
        <p className="text-xs font-serif text-amber-300/70">
          PASSPORT TO THE JOURNEY WITHIN
        </p>
      </div>

      {/* Main Royal Passport Book Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#2E0B22] via-[#1D0618] to-[#10030E] border-2 border-amber-400/50 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden space-y-5">
        {/* Ornate Gold Filigree Corners */}
        <div className="absolute top-2 left-2 text-amber-400/40 text-lg select-none">❖</div>
        <div className="absolute top-2 right-2 text-amber-400/40 text-lg select-none">❖</div>
        <div className="absolute bottom-2 left-2 text-amber-400/40 text-lg select-none">❖</div>
        <div className="absolute bottom-2 right-2 text-amber-400/40 text-lg select-none">❖</div>

        {/* Card Header */}
        <div className="text-center space-y-1 border-b border-amber-500/20 pb-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-amber-300 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#1A0515] flex items-center justify-center">
              <Crown className="w-6 h-6 text-amber-300 drop-shadow-[0_2px_4px_rgba(245,158,11,0.5)]" />
            </div>
          </div>
          <h2 className="text-xl font-serif font-bold text-amber-200 tracking-wide">
            The Royal Passport
          </h2>
          <p className="text-[11px] font-hindi text-amber-400/80">
            राजाई स्वराज्य पासपोर्ट • संगमयुग
          </p>
        </div>

        {/* Identity Grid */}
        <div className="grid grid-cols-3 gap-2 text-center py-1 bg-white/[0.03] rounded-2xl p-3 border border-amber-500/20">
          <div>
            <span className="text-[9px] font-mono tracking-widest text-amber-400/70 uppercase block">
              TRAVELLER
            </span>
            <span className="text-xs font-bold font-hindi text-amber-100">
              मैं आत्मा
            </span>
          </div>
          <div className="border-x border-amber-500/20">
            <span className="text-[9px] font-mono tracking-widest text-amber-400/70 uppercase block">
              GUIDE
            </span>
            <span className="text-xs font-bold font-hindi text-amber-300">
              शिव बाबा
            </span>
          </div>
          <div>
            <span className="text-[9px] font-mono tracking-widest text-amber-400/70 uppercase block">
              AUTHORITY
            </span>
            <span className="text-xs font-bold font-hindi text-amber-100">
              स्वराज्य
            </span>
          </div>
        </div>

        {/* Photo Avatar & Traveller Name Input */}
        <div className="flex items-center gap-4 bg-black/40 rounded-2xl p-3 border border-amber-500/20">
          <div className="relative group cursor-pointer" onClick={onOpenAvatarViewer}>
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt="Traveller"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-rose-900 border-2 border-amber-400 flex items-center justify-center text-amber-200 group-hover:scale-105 transition-transform">
                <Crown className="w-8 h-8" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Camera className="w-5 h-5 text-amber-300" />
            </div>
          </div>

          <div className="flex-1 space-y-1">
            <span className="text-[9px] font-mono tracking-widest text-amber-400/70 uppercase block">
              TRAVELLER NAME
            </span>
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-2 py-1 bg-black/60 border border-amber-400 text-amber-100 text-xs rounded font-hindi focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="px-2 py-1 bg-amber-500 text-maroon-950 font-bold text-xs rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingName(true)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <span className="text-base font-bold font-hindi text-amber-100 group-hover:text-amber-300 transition-colors">
                  {profile.name || 'अपना नाम लिखें'}
                </span>
                <Edit2 className="w-3.5 h-3.5 text-amber-400/60 group-hover:text-amber-300" />
              </div>
            )}
            <span className="text-[10px] text-amber-300/60 block font-hindi">
              SELF ‹‹‹ TO MY HIGHER SELF ›››
            </span>
          </div>
        </div>

        {/* Identity Details */}
        <div className="space-y-3 text-xs font-hindi">
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-amber-500/15">
            <span className="text-[9px] font-mono tracking-widest text-amber-400/80 uppercase block">
              MY CORE IDENTITY
            </span>
            <p className="text-amber-100 font-medium mt-0.5">
              शांति स्वरूप • पवित्र स्वरूप • आनंद स्वरूप
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-amber-500/15">
            <span className="text-[9px] font-mono tracking-widest text-amber-400/80 uppercase block">
              MY ROYAL SANSKAR
            </span>
            <p className="text-amber-100 font-medium mt-0.5">
              शांत • निर्मान • पवित्र • संतुष्ट • शुभचिंतक
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-amber-500/15">
            <span className="text-[9px] font-mono tracking-widest text-amber-400/80 uppercase block">
              THE JOURNEY'S INTENT
            </span>
            <p className="text-amber-200/90 italic leading-relaxed mt-0.5">
              "अपने मन, दृष्टि, संस्कार और कर्म पर इतना स्वराज्य कि परिस्थिति कैसी भी हो, मेरी स्थिति न हिले।"
            </p>
          </div>
        </div>

        {/* Stamp Summary Seal */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/40">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-xs font-bold text-amber-100 font-hindi">
                Royal Stamp Collection
              </div>
              <div className="text-[10px] text-amber-300/70">
                {unlockedStampsCount} / 13 संस्कार सक्रिय (Activated)
              </div>
            </div>
          </div>
          <button
            onClick={onOpenStamps}
            className="px-3 py-1 rounded-xl bg-amber-400 text-maroon-950 font-bold text-xs font-serif shadow-sm hover:brightness-110"
          >
            View Stamps →
          </button>
        </div>
      </div>

      {/* Royal Passport Links */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono tracking-wider text-amber-300/80 uppercase font-bold block px-1">
          PASSPORT DOCUMENTS & ACCORDS
        </span>

        <div className="space-y-2">
          <button
            onClick={onOpenVisa}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#21091E] to-[#160514] border border-amber-500/30 hover:border-amber-400 p-4 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-amber-100 font-hindi">
                  My Spiritual Visa
                </div>
                <div className="text-[11px] text-amber-300/60 font-hindi">
                  स्वयं को देखने की अनुमति • 6 commitments
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenDeclaration}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#21091E] to-[#160514] border border-amber-500/30 hover:border-amber-400 p-4 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
                <Crown className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-amber-100 font-hindi">
                  स्वराज्य घोषणा-पत्र (Swarajya Declaration)
                </div>
                <div className="text-[11px] text-amber-300/60 font-hindi">
                  A commitment to my higher self • राजाई प्रतिज्ञा
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenBaggage}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#21091E] to-[#160514] border border-amber-500/30 hover:border-amber-400 p-4 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Luggage className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-amber-100 font-hindi">
                  Baggage Declaration
                </div>
                <div className="text-[11px] text-amber-300/60 font-hindi">
                  अंदर का सामान पहचानें • Choose what to release
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenChooseNewRoute}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#21091E] to-[#160514] border border-amber-500/30 hover:border-amber-400 p-4 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Repeat className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-amber-100 font-hindi">
                  Final Immigration (Choose a New Route)
                </div>
                <div className="text-[11px] text-amber-300/60 font-hindi">
                  पुराना मार्ग → राजाई मार्ग
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenHowToPractise}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#21091E] to-[#160514] border border-amber-500/30 hover:border-amber-400 p-4 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-amber-100 font-hindi">
                  How to Practise
                </div>
                <div className="text-[11px] text-amber-300/60 font-hindi">
                  परिस्थिति आई? 7 practical steps
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenAbout}
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#21091E] to-[#160514] border border-amber-500/30 hover:border-amber-400 p-4 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-amber-100 font-hindi">
                  About the Journey
                </div>
                <div className="text-[11px] text-amber-300/60 font-hindi">
                  स्वयं से स्वयं की यात्रा • Welcome & Purpose
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
