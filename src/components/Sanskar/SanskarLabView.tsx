import React, { useState } from 'react';
import { SanskarGoal } from '../../types';
import { SanskarGoalModal } from './SanskarGoalModal';
import { Target, Sparkles, Plus, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { SANSKAR_GOAL_PRESETS } from '../../data/sanskarData';
import { sound } from '../../utils/audio';

interface SanskarLabViewProps {
  goals: SanskarGoal[];
  onSaveGoal: (goal: SanskarGoal) => void;
}

export const SanskarLabView: React.FC<SanskarLabViewProps> = ({ goals, onSaveGoal }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingGoal, setEditingGoal] = useState<SanskarGoal | undefined>(undefined);
  const [activeReviewAnswers, setActiveReviewAnswers] = useState<Record<string, string>>({});

  const activeGoal = goals.find((g) => g.status === 'active') || goals[0];

  const handleOpenAdd = () => {
    sound.playSoftClick();
    setEditingGoal(undefined);
    setShowModal(true);
  };

  const handleEdit = (g: SanskarGoal) => {
    sound.playSoftClick();
    setEditingGoal(g);
    setShowModal(true);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold">
            भीतर से परिवर्तन • SANSKAR TRANSFORMATION
          </span>
          <h3 className="text-lg font-bold font-hindi text-maroon-800">
            संस्कार परिवर्तन लैब
          </h3>
          <p className="text-xs text-spiritual-muted font-hindi">
            पुराने संस्कार को पहचानें, श्रेष्ठ संस्कार का निरंतर अभ्यास करें।
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-3 py-1.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 text-xs font-bold rounded-xl shadow-xs font-hindi flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>नया लक्ष्य</span>
        </button>
      </div>

      {/* Active Goal Hero Card */}
      {activeGoal && (
        <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs bg-gold-100 text-gold-800 font-bold px-2 py-0.5 rounded font-serif uppercase">
              {activeGoal.category}
            </span>
            <span className="text-xs font-bold font-serif text-maroon-700">
              {activeGoal.practiceDays} दिन निरंतर अभ्यास
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-hindi">
            <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-rose-800 block">पुराना संस्कार (Old Pattern)</span>
              <span className="text-spiritual-dark font-medium">{activeGoal.oldSanskar}</span>
              <p className="text-[10px] text-spiritual-muted mt-1">ट्रिगर: {activeGoal.trigger}</p>
            </div>

            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">नया राजाई संस्कार (New Sanskar)</span>
              <span className="text-spiritual-dark font-bold text-emerald-950">{activeGoal.newSanskar}</span>
              <p className="text-[10px] text-emerald-700 mt-1">अभ्यास: {activeGoal.dailyPractice}</p>
            </div>
          </div>

          {/* If-Then Plan */}
          <div className="p-3.5 bg-ivory-50 rounded-xl border border-gold-200 text-xs font-hindi space-y-1">
            <span className="text-[10px] font-bold text-gold-700 uppercase block">यदि-तो योजना (If–Then Plan)</span>
            <p className="text-spiritual-dark font-medium italic">
              "{activeGoal.ifThenPlan}"
            </p>
          </div>

          <div className="flex justify-between items-center pt-1">
            <button
              onClick={() => handleEdit(activeGoal)}
              className="text-xs text-maroon-700 font-bold font-hindi hover:underline"
            >
              संस्कार लक्ष्य संपादित करें (Edit)
            </button>
            <span className="text-[10px] text-spiritual-muted italic font-hindi">
              * संस्कार स्थायी रूप से एक निश्चित दिन में नहीं, निरंतर सजगता से बदलते हैं।
            </span>
          </div>
        </div>
      )}

      {/* 12 Sanskar Transformation Categories Library */}
      <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-3">
        <h4 className="text-sm font-bold font-hindi text-maroon-900">
          संस्कार परिवर्तन के 12 मार्ग (Sanskar Categories)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SANSKAR_GOAL_PRESETS.map((preset) => (
            <div
              key={preset.category}
              className="p-3 rounded-xl border border-gold-200 bg-ivory-50/50 hover:bg-gold-50/50 transition-all text-xs font-hindi space-y-1"
            >
              <div className="font-bold text-maroon-800 flex items-center justify-between">
                <span>{preset.category}</span>
                <span className="text-[10px] text-gold-700 font-serif">रूपांतरण</span>
              </div>
              <p className="text-[11px] text-spiritual-muted">
                {preset.trigger}
              </p>
              <div className="text-[11px] text-emerald-900 font-semibold pt-0.5">
                नया कर्म: {preset.newResponse}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Review Section */}
      <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-maroon-700" />
          <h4 className="text-sm font-bold font-hindi text-maroon-900">
            साप्ताहिक समीक्षा (Weekly Review)
          </h4>
        </div>

        <div className="space-y-2 text-xs font-hindi">
          {[
            { id: 'w1', q: '1. इस सप्ताह कौन-सा पुराना संस्कार सबसे अधिक सामने आया?' },
            { id: 'w2', q: '2. किन परिस्थितियों में मैं सफल रहा/रही?' },
            { id: 'w3', q: '3. किस समय मैं पुराने संस्कार में चला/चली गया/गई?' },
            { id: 'w4', q: '4. अगले सप्ताह मेरा मुख्य अभ्यास क्या रहेगा?' },
          ].map((item) => (
            <div key={item.id}>
              <label className="block text-[11px] font-semibold text-spiritual-dark mb-1">
                {item.q}
              </label>
              <input
                type="text"
                value={activeReviewAnswers[item.id] || ''}
                onChange={(e) =>
                  setActiveReviewAnswers({ ...activeReviewAnswers, [item.id]: e.target.value })
                }
                placeholder="अपना ईमानदार अवलोकन लिखें..."
                className="w-full px-3 py-1.5 text-xs border border-gold-300 rounded-lg bg-ivory-50/50 font-hindi"
              />
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <SanskarGoalModal
          onSave={onSaveGoal}
          onClose={() => setShowModal(false)}
          currentGoal={editingGoal}
        />
      )}
    </div>
  );
};
