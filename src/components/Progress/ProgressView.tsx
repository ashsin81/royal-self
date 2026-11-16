import React, { useState } from 'react';
import { PassportStamp, BaggageItem, SanskarGoal, RescueSessionRecord, NightReflectionRecord } from '../../types';
import { StampCollection } from './StampCollection';
import { BaggageInspectorModal } from './BaggageInspectorModal';
import { SanskarLabView } from '../Sanskar/SanskarLabView';
import { Briefcase, TrendingUp, Calendar, Heart, Shield, CheckCircle } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ProgressViewProps {
  stamps: PassportStamp[];
  baggage: BaggageItem[];
  goals: SanskarGoal[];
  rescueSessions: RescueSessionRecord[];
  nightReflections: NightReflectionRecord[];
  onToggleBaggageRelease: (id: string) => void;
  onSaveGoal: (goal: SanskarGoal) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  stamps,
  baggage,
  goals,
  rescueSessions,
  nightReflections,
  onToggleBaggageRelease,
  onSaveGoal,
}) => {
  const [activeTab, setActiveTab] = useState<'stamps' | 'sanskar' | 'timeline'>('stamps');
  const [showBaggageModal, setShowBaggageModal] = useState<boolean>(false);

  const releasedBaggageCount = baggage.filter((b) => b.isReleased).length;
  const unlockedStampsCount = stamps.filter((s) => s.isUnlocked).length;

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div>
        <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold">
          पुरुषार्थ दर्पण • JOURNEY LOG
        </span>
        <h2 className="text-xl sm:text-2xl font-bold font-hindi text-maroon-900 tracking-tight">
          मेरी परिवर्तन यात्रा (Progress)
        </h2>
        <p className="text-xs text-spiritual-muted font-hindi">
          वास्तविक पुरुषार्थ इतिहास — बिना किसी प्रतिस्पर्धा या आत्म-ग्लानि के।
        </p>
      </div>

      {/* Baggage Declaration Banner Trigger */}
      <div
        onClick={() => {
          sound.playSoftClick();
          setShowBaggageModal(true);
        }}
        className="p-4 rounded-2xl bg-gradient-to-r from-maroon-800 to-maroon-900 text-white flex items-center justify-between cursor-pointer shadow-royal hover:scale-[1.01] transition-all border border-gold-400/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-400/50 flex items-center justify-center text-xl">
            🧳
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-serif font-bold text-gold-300 uppercase tracking-wider">
                Baggage Declaration
              </span>
              <span className="text-[9px] bg-gold-400/20 text-gold-200 px-1.5 py-0.2 rounded font-mono">
                {releasedBaggageCount}/{baggage.length} भार मुक्त
              </span>
            </div>
            <p className="text-xs font-hindi text-gold-100 font-semibold mt-0.5">
              मेरा Invisible Baggage जाँचें व समर्पित करें →
            </p>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="grid grid-cols-3 gap-1.5 bg-ivory-100 p-1.5 rounded-2xl border border-gold-200">
        <button
          onClick={() => setActiveTab('stamps')}
          className={`py-2 text-xs font-bold font-hindi rounded-xl transition-all ${
            activeTab === 'stamps'
              ? 'bg-maroon-700 text-gold-100 shadow-xs'
              : 'text-spiritual-dark hover:bg-gold-50'
          }`}
        >
          पासपोर्ट सील ({unlockedStampsCount})
        </button>
        <button
          onClick={() => setActiveTab('sanskar')}
          className={`py-2 text-xs font-bold font-hindi rounded-xl transition-all ${
            activeTab === 'sanskar'
              ? 'bg-maroon-700 text-gold-100 shadow-xs'
              : 'text-spiritual-dark hover:bg-gold-50'
          }`}
        >
          संस्कार लैब
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`py-2 text-xs font-bold font-hindi rounded-xl transition-all ${
            activeTab === 'timeline'
              ? 'bg-maroon-700 text-gold-100 shadow-xs'
              : 'text-spiritual-dark hover:bg-gold-50'
          }`}
        >
          अनुभव टाइमलाइन
        </button>
      </div>

      {/* TAB 1: Stamps */}
      {activeTab === 'stamps' && (
        <StampCollection stamps={stamps} />
      )}

      {/* TAB 2: Sanskar Lab */}
      {activeTab === 'sanskar' && (
        <SanskarLabView goals={goals} onSaveGoal={onSaveGoal} />
      )}

      {/* TAB 3: Personal Transformation Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-hindi text-maroon-800">
                व्यक्तिगत अनुभवों की टाइमलाइन
              </h3>
              <p className="text-xs text-spiritual-muted font-hindi">
                सचेत निर्णयों और आत्म-निरीक्षण का संग्रह।
              </p>
            </div>
            <Calendar className="w-4 h-4 text-maroon-700" />
          </div>

          <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gold-200">
            {rescueSessions.length === 0 && nightReflections.length === 0 && (
              <div className="text-center py-6 text-xs text-spiritual-muted font-hindi">
                अभी तक कोई अनुभव दर्ज नहीं है। रेस्क्यू या रात्रि चेकिंग से शुरुआत करें।
              </div>
            )}

            {/* Rescue Sessions Entries */}
            {rescueSessions.map((session) => (
              <div key={session.id} className="relative pl-8 space-y-1">
                <span className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-maroon-700 ring-4 ring-white" />
                <div className="p-3 bg-ivory-50 rounded-xl border border-gold-200 space-y-1 text-xs font-hindi">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-maroon-900">{session.situationName}</span>
                    <span className="text-[10px] text-spiritual-muted font-serif">
                      {new Date(session.createdAt).toLocaleDateString('hi-IN')}
                    </span>
                  </div>
                  <p className="text-spiritual-dark">
                    <strong>परिस्थिति:</strong> {session.trigger}
                  </p>
                  <p className="text-emerald-800 font-semibold">
                    <strong>चुना गया राजाई कर्म:</strong> {session.newResponse}
                  </p>
                  <div className="text-[10px] text-spiritual-muted pt-1 border-t border-gold-100 flex justify-between">
                    <span>तीव्रता: {session.intensityBefore} → {session.intensityAfter}</span>
                    <span className="text-gold-700 font-bold">✓ सील सक्रिय</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Night Reflections Entries */}
            {nightReflections.map((ref) => (
              <div key={ref.id} className="relative pl-8 space-y-1">
                <span className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-600 ring-4 ring-white" />
                <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-1 text-xs font-hindi">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-indigo-950">रात्रि स्व-चेकिंग (दिन का हिसाब)</span>
                    <span className="text-[10px] text-spiritual-muted font-serif">
                      {ref.date}
                    </span>
                  </div>
                  <p className="text-spiritual-dark">
                    <strong>श्रेष्ठ स्थिति:</strong> {ref.successfulSituation}
                  </p>
                  <p className="text-spiritual-dark">
                    <strong>अगला संकल्प:</strong> {ref.nextElevatedThought}
                  </p>
                  <p className="text-indigo-900 italic text-[11px]">
                    <strong>शुक्रिया:</strong> {ref.gratitudeToBaba}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Baggage Modal */}
      {showBaggageModal && (
        <BaggageInspectorModal
          baggage={baggage}
          onToggleRelease={onToggleBaggageRelease}
          onClose={() => setShowBaggageModal(false)}
        />
      )}
    </div>
  );
};
