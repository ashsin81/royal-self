import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { storage } from '../../utils/storage';
import { Phone, User, Shield, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { sound } from '../../utils/audio';

interface PhoneLoginModalProps {
  currentProfile: UserProfile;
  onLoginSuccess: (profile: UserProfile) => void;
  onClose?: () => void;
}

export const PhoneLoginModal: React.FC<PhoneLoginModalProps> = ({
  currentProfile,
  onLoginSuccess,
  onClose,
}) => {
  const remembered = storage.getRememberedPhones();

  const [phone, setPhone] = useState<string>(currentProfile.phone || '9876543210');
  const [name, setName] = useState<string>(currentProfile.name || 'राजयोगी आत्मा');
  const [role, setRole] = useState<'student' | 'teacher'>(currentProfile.role || 'student');
  const [centerName, setCenterName] = useState<string>(currentProfile.centerName || 'शांति निकेतन सेवाकेंद्र, दिल्ली');
  const [remember, setRemember] = useState<boolean>(true);

  const handleSelectRemembered = (item: { phone: string; name: string; role: 'student' | 'teacher' }) => {
    sound.playSoftClick();
    setPhone(item.phone);
    setName(item.name.split(' (')[0]);
    setRole(item.role);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playStampSound();

    if (remember) {
      storage.rememberPhone(phone, `${name} (${role === 'teacher' ? 'Center Incharge' : 'Student'})`);
    }

    const updatedProfile: UserProfile = {
      ...currentProfile,
      phone: phone.trim(),
      name: name.trim() || 'राजयोगी आत्मा',
      role,
      centerName: centerName.trim(),
      onboarded: true
    };

    onLoginSuccess(updatedProfile);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-ivory-100 dark:bg-maroon-950 border-2 border-gold-300 rounded-3xl max-w-sm sm:max-w-md w-full p-6 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 text-spiritual-dark dark:text-gray-100">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white dark:bg-maroon-900 text-spiritual-muted hover:text-maroon-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-maroon-700 text-gold-300 flex items-center justify-center text-xl shadow-md border-2 border-gold-300">
            📱
          </div>
          <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 dark:text-gold-400 font-bold block">
            ROYAL SELF AUTHENTICATION
          </span>
          <h2 className="text-xl font-bold font-hindi text-maroon-900 dark:text-gold-100">
            फोन नंबर द्वारा लॉगिन
          </h2>
          <p className="text-xs text-spiritual-muted dark:text-gray-400 font-hindi">
            अपने पुरुषार्थ डेटा और रिकॉर्ड्स को सुरक्षित रखें।
          </p>
        </div>

        {/* Quick 1-tap remembered profiles */}
        {remembered.length > 0 && (
          <div className="mb-4 p-3 bg-white/80 dark:bg-maroon-900/60 rounded-2xl border border-gold-200 dark:border-gold-800 space-y-1.5">
            <span className="text-[10px] font-bold text-spiritual-muted dark:text-gray-400 uppercase block font-hindi">
              सहेजे गए फोन नंबर (1-टैप स्विच):
            </span>
            <div className="space-y-1">
              {remembered.map((item) => (
                <button
                  key={item.phone}
                  type="button"
                  onClick={() => handleSelectRemembered(item)}
                  className={`w-full p-2 rounded-xl text-left flex items-center justify-between text-xs font-hindi border transition-all ${
                    phone === item.phone
                      ? 'bg-maroon-50 dark:bg-maroon-900 border-maroon-700 text-maroon-900 dark:text-gold-200 font-bold'
                      : 'bg-ivory-50 dark:bg-maroon-950/60 border-gold-200/70 text-spiritual-dark dark:text-gray-300 hover:bg-gold-50/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.role === 'teacher' ? '👑' : '🕊️'}</span>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[10px] text-spiritual-muted font-mono">+91 {item.phone}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-spiritual-dark dark:text-gray-300 mb-1 font-hindi">
              मोबाइल फोन नंबर:
            </label>
            <div className="flex items-center rounded-xl border border-gold-300 dark:border-gold-700 bg-white dark:bg-maroon-900 px-3 py-2 text-xs">
              <span className="text-spiritual-muted dark:text-gray-400 font-mono pr-2 border-r border-gold-200 dark:border-gold-700">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                required
                placeholder="10 अंकों का फोन नंबर"
                className="w-full pl-2 bg-transparent focus:outline-none font-mono text-spiritual-dark dark:text-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-spiritual-dark dark:text-gray-300 mb-1 font-hindi">
              नाम / Spiritual Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="उदा. राजयोगी आत्मा..."
              className="w-full px-3 py-2 text-xs border border-gold-300 dark:border-gold-700 rounded-xl bg-white dark:bg-maroon-900 font-hindi text-spiritual-dark dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-maroon-700"
            />
          </div>



          {role === 'teacher' && (
            <div>
              <label className="block text-xs font-semibold text-spiritual-dark dark:text-gray-300 mb-1 font-hindi">
                सेवाकेंद्र का नाम (Center Name):
              </label>
              <input
                type="text"
                value={centerName}
                onChange={(e) => setCenterName(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-gold-300 dark:border-gold-700 rounded-xl bg-white dark:bg-maroon-900 font-hindi text-spiritual-dark dark:text-gray-100 focus:outline-none"
              />
            </div>
          )}

          <label className="flex items-center gap-2 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded text-maroon-700 h-4 w-4"
            />
            <span className="text-xs font-hindi text-spiritual-dark dark:text-gray-300">
              इस डिवाइस पर फोन नंबर और डेटा याद रखें
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-lg font-hindi flex items-center justify-center gap-2 mt-2"
          >
            <span>लॉगिन करें व डेटा सुरक्षित रखें</span>
            <ArrowRight className="w-4 h-4 text-gold-300" />
          </button>
        </form>
      </div>
    </div>
  );
};
