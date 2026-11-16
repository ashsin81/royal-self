import React, { useState } from 'react';
import { SanskarGoal } from '../../types';
import { SANSKAR_GOAL_PRESETS } from '../../data/sanskarData';
import { Target, X, Check, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface SanskarGoalModalProps {
  onSave: (goal: SanskarGoal) => void;
  onClose: () => void;
  currentGoal?: SanskarGoal;
}

export const SanskarGoalModal: React.FC<SanskarGoalModalProps> = ({
  onSave,
  onClose,
  currentGoal,
}) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const preset = SANSKAR_GOAL_PRESETS[selectedPresetIndex];

  const [category, setCategory] = useState<string>(currentGoal?.category || preset.category);
  const [oldSanskar, setOldSanskar] = useState<string>(currentGoal?.oldSanskar || preset.oldSanskar);
  const [newSanskar, setNewSanskar] = useState<string>(currentGoal?.newSanskar || preset.newSanskar);
  const [trigger, setTrigger] = useState<string>(currentGoal?.trigger || preset.trigger);
  const [oldResponse, setOldResponse] = useState<string>(currentGoal?.oldResponse || preset.oldResponse);
  const [newResponse, setNewResponse] = useState<string>(currentGoal?.newResponse || preset.newResponse);
  const [dailyPractice, setDailyPractice] = useState<string>(currentGoal?.dailyPractice || preset.dailyPractice);
  const [ifThenPlan, setIfThenPlan] = useState<string>(currentGoal?.ifThenPlan || preset.ifThenPlan);

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setIsCustom(false);
    const p = SANSKAR_GOAL_PRESETS[index];
    setCategory(p.category);
    setOldSanskar(p.oldSanskar);
    setNewSanskar(p.newSanskar);
    setTrigger(p.trigger);
    setOldResponse(p.oldResponse);
    setNewResponse(p.newResponse);
    setDailyPractice(p.dailyPractice);
    setIfThenPlan(p.ifThenPlan);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playStampSound();

    const goal: SanskarGoal = {
      id: currentGoal?.id || 'goal-' + Date.now(),
      category,
      oldSanskar,
      newSanskar,
      trigger,
      oldResponse,
      newResponse,
      dailyPractice,
      ifThenPlan,
      practiceDays: currentGoal?.practiceDays || 1,
      status: 'active',
      createdAt: currentGoal?.createdAt || new Date().toISOString().split('T')[0],
    };

    onSave(goal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-ivory-100 border-2 border-gold-300 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-royal-lg text-spiritual-dark relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-spiritual-muted hover:text-maroon-800 rounded-full bg-white/80"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-maroon-700 text-gold-300 flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold block">
              संस्कार परिवर्तन लैब
            </span>
            <h3 className="text-lg font-bold text-maroon-900 font-hindi">
              नया संस्कार लक्ष्य तय करें
            </h3>
          </div>
        </div>

        {/* Presets Slider */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-spiritual-dark mb-1.5 font-hindi">
            तैयार संस्कार श्रेणियाँ (Presets):
          </label>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {SANSKAR_GOAL_PRESETS.map((p, idx) => (
              <button
                key={p.category}
                type="button"
                onClick={() => handleSelectPreset(idx)}
                className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-all font-hindi border ${
                  !isCustom && selectedPresetIndex === idx
                    ? 'bg-maroon-700 text-gold-100 border-maroon-700 font-bold shadow-xs'
                    : 'bg-white text-spiritual-dark border-gold-200 hover:bg-gold-50'
                }`}
              >
                {p.category}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsCustom(true)}
              className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-all font-hindi border ${
                isCustom
                  ? 'bg-maroon-700 text-gold-100 border-maroon-700 font-bold shadow-xs'
                  : 'bg-white text-spiritual-dark border-gold-200 hover:bg-gold-50'
              }`}
            >
              + व्यक्तिगत (Custom)
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-rose-800 mb-1 font-hindi">
                पुराना संस्कार (Old Sanskar)
              </label>
              <input
                type="text"
                value={oldSanskar}
                onChange={(e) => setOldSanskar(e.target.value)}
                required
                className="w-full px-2.5 py-1.5 text-xs border border-rose-200 rounded-lg bg-white font-hindi"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-emerald-800 mb-1 font-hindi">
                नया संस्कार (New Sanskar)
              </label>
              <input
                type="text"
                value={newSanskar}
                onChange={(e) => setNewSanskar(e.target.value)}
                required
                className="w-full px-2.5 py-1.5 text-xs border border-emerald-200 rounded-lg bg-white font-hindi"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-spiritual-dark mb-1 font-hindi">
              परिस्थिति / ट्रिगर (When does it trigger?)
            </label>
            <input
              type="text"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              required
              className="w-full px-2.5 py-1.5 text-xs border border-gold-300 rounded-lg bg-white font-hindi"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-spiritual-dark mb-1 font-hindi">
              यदि-तो योजना (If–Then Implementation Plan)
            </label>
            <textarea
              rows={2}
              value={ifThenPlan}
              onChange={(e) => setIfThenPlan(e.target.value)}
              required
              className="w-full px-2.5 py-1.5 text-xs border border-gold-300 rounded-lg bg-white font-hindi resize-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-spiritual-dark mb-1 font-hindi">
              दैनिक अभ्यास संकल्प (Daily Practice Intention)
            </label>
            <input
              type="text"
              value={dailyPractice}
              onChange={(e) => setDailyPractice(e.target.value)}
              required
              className="w-full px-2.5 py-1.5 text-xs border border-gold-300 rounded-lg bg-white font-hindi"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs border border-gold-200 rounded-xl font-hindi"
            >
              रद्द करें
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 font-hindi"
            >
              <Check className="w-4 h-4 text-gold-300" />
              <span>संस्कार लक्ष्य सक्रिय करें</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
