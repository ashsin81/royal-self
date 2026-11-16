import React, { useState } from 'react';
import { UserProfile, StudentProgressSummary, TeacherMessage } from '../../types';
import {
  Users,
  Send,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  MessageSquare,
  Search,
  Heart,
  Shield,
  X,
  Copy,
  Check
} from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface TeacherDashboardProps {
  teacherProfile: UserProfile;
  students: StudentProgressSummary[];
  messages: TeacherMessage[];
  onSendMessage: (msg: TeacherMessage) => void;
  onSwitchToStudentMode: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacherProfile,
  students,
  messages,
  onSendMessage,
  onSwitchToStudentMode,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<StudentProgressSummary | null>(null);
  const [showSendModal, setShowSendModal] = useState<boolean>(false);
  const [messageTitle, setMessageTitle] = useState<string>('आज की आत्मिक शुभकामना व दृष्टि');
  const [messageText, setMessageText] = useState<string>('');
  const [selectedBlessing, setSelectedBlessing] = useState<string>(
    'सर्व खजानों से भरपूर, सदा संतुष्ट आत्मा भव।'
  );
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyAdminLink = () => {
    const link = window.location.origin + window.location.pathname + '#admin';
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    sound.playSoftClick();
    setTimeout(() => setIsCopied(false), 2500);
  };

  const blessingPresets = [
    'सर्व खजानों से भरपूर, सदा संतुष्ट आत्मा भव।',
    'परिस्थिति पर स्वराज्य रखने वाले, प्रकृतिजीत भव।',
    'साक्षीपन की स्थिति द्वारा सदा हल्के रहने वाले, कर्मातीत भव।',
    'अमृतवेले की शक्तिशाली याद द्वारा उमंग-उत्साह संपन्न भव।'
  ];

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.activeSanskar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery)
  );

  const handleOpenCompose = (student: StudentProgressSummary) => {
    sound.playSoftClick();
    setSelectedStudent(student);
    setMessageText(`मीठे बच्चे ${student.name.split(' ')[0]}, आपके पुरुषार्थ में निरंतरता देखकर बाबा बहुत प्रसन्न हैं...`);
    setShowSendModal(true);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    sound.playStampSound();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    const newMsg: TeacherMessage = {
      id: 'msg-' + Date.now(),
      fromTeacherName: 'बापदादा',
      toStudentId: selectedStudent.id,
      title: messageTitle,
      messageText: messageText.trim(),
      blessingVardan: selectedBlessing,
      sentAt: 'आज, ' + new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    onSendMessage(newMsg);
    setShowSendModal(false);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Teacher Portal Header */}
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-950 text-white p-5 rounded-3xl border-2 border-gold-400 shadow-royal-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-300 flex items-center justify-center text-xl">
              👑
            </div>
            <div>
              <span className="text-[10px] font-serif uppercase tracking-widest text-gold-300 font-bold block">
                सेवाकेंद्र प्रभारी डैशबोर्ड • CENTER HEAD PORTAL
              </span>
              <h2 className="text-base sm:text-lg font-bold font-hindi text-white">
                {teacherProfile.name || 'सेवाकेंद्र व्यवस्थापक'}
              </h2>
            </div>
          </div>

          <button
            onClick={onSwitchToStudentMode}
            className="px-3 py-1.5 bg-gold-500/20 hover:bg-gold-500/30 border border-gold-400 text-gold-200 text-xs font-bold rounded-xl font-hindi transition-colors"
          >
            विद्यार्थी मोड →
          </button>
        </div>

        <p className="text-xs text-gold-100/90 font-hindi">
          केंद्र: <strong>{teacherProfile.centerName || 'शांति निकेतन सेवाकेंद्र, दिल्ली'}</strong> • विद्यार्थियों के पुरुषार्थ का अवलोकन व व्यक्तिगत संदेश प्रेषण।
        </p>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-4 gap-2 pt-1 border-t border-gold-400/30 text-center">
          <div className="bg-white/10 p-2 rounded-xl">
            <span className="text-[10px] text-gold-300 block">कुल विद्यार्थी</span>
            <span className="text-sm font-bold font-serif">{students.length}</span>
          </div>
          <div className="bg-white/10 p-2 rounded-xl">
            <span className="text-[10px] text-gold-300 block">आज सक्रिय</span>
            <span className="text-sm font-bold font-serif text-emerald-300">{students.length}</span>
          </div>
          <div className="bg-white/10 p-2 rounded-xl">
            <span className="text-[10px] text-gold-300 block">औसत स्ट्रीक</span>
            <span className="text-sm font-bold font-serif text-gold-200">12 दिन</span>
          </div>
          <div className="bg-white/10 p-2 rounded-xl">
            <span className="text-[10px] text-gold-300 block">प्रेषित दृष्टि</span>
            <span className="text-sm font-bold font-serif text-rose-200">{messages.length}</span>
          </div>
        </div>

        {/* Secret Admin Direct Link notice */}
        <div className="bg-amber-500/20 border border-amber-400/40 p-2.5 rounded-xl flex items-center justify-between gap-2 text-xs font-hindi">
          <div className="truncate">
            <span className="text-[10px] text-amber-300 font-bold block">🔒 आपका गुप्त एडमिन लिंक (Direct Link):</span>
            <span className="text-amber-100 font-mono text-[11px] truncate block">...#admin (पिन: 108)</span>
          </div>
          <button
            onClick={handleCopyAdminLink}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-maroon-950 font-bold text-[11px] transition-colors flex-shrink-0"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-950" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'कॉपी हुआ' : 'लिंक कॉपी'}</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-spiritual-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="विद्यार्थी का नाम, फोन नंबर या संस्कार लक्ष्य खोजें..."
          className="w-full pl-9 pr-3 py-2 text-xs border border-gold-300 dark:border-gold-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-700 bg-white dark:bg-maroon-950 font-hindi text-spiritual-dark dark:text-gray-100"
        />
      </div>

      {/* Student List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-serif font-bold text-maroon-900 dark:text-gold-200 px-1">
          <span>विद्यार्थी पुरुषार्थ रिपोर्ट ({filteredStudents.length})</span>
          <span className="text-[10px] text-spiritual-muted font-normal">Real-time Progress</span>
        </div>

        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="p-4 rounded-2xl bg-white dark:bg-maroon-950/80 border border-gold-200/90 dark:border-gold-800/60 shadow-royal space-y-2.5"
          >
            {/* Student Top Info */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                {student.avatarUrl ? (
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover border border-gold-400"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-maroon-700 text-gold-200 flex items-center justify-center font-bold text-sm">
                    {student.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold font-hindi text-maroon-950 dark:text-gold-100 leading-tight">
                    {student.name}
                  </h4>
                  <span className="text-[10px] text-spiritual-muted dark:text-gray-400 font-mono">
                    📱 +91 {student.phone}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold font-serif text-maroon-700 dark:text-gold-300 bg-gold-100 dark:bg-gold-950/80 px-2 py-0.5 rounded-full border border-gold-300/60 block">
                  🔥 {student.streakDays} दिन स्ट्रीक
                </span>
                <span className="text-[9px] text-spiritual-muted mt-0.5 block">
                  आज: {student.completedTodayCount}/5 नियम पूर्ण
                </span>
              </div>
            </div>

            {/* Active Sanskar Goal */}
            <div className="p-2.5 bg-ivory-50 dark:bg-maroon-900/40 rounded-xl border border-gold-200 dark:border-gold-800/40 text-xs font-hindi space-y-1">
              <div className="flex justify-between items-center text-[10px] text-spiritual-muted dark:text-gray-400">
                <span className="font-bold text-gold-700 dark:text-gold-400 uppercase">सक्रिय संस्कार लक्ष्य</span>
                <span>{student.unlockedStampsCount} सील अर्जित</span>
              </div>
              <p className="font-semibold text-maroon-900 dark:text-gold-100">
                {student.activeSanskar}
              </p>
              {student.lastReflection && (
                <p className="text-[11px] text-spiritual-dark dark:text-gray-300 italic pt-1 border-t border-gold-100 dark:border-gold-800/40">
                  "अनुभव: {student.lastReflection}"
                </p>
              )}
            </div>

            {/* Teacher Actions */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-spiritual-muted font-hindi">
                अंतिम सक्रियता: {student.lastActive}
              </span>

              <button
                onClick={() => handleOpenCompose(student)}
                className="px-3 py-1.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 text-xs font-bold rounded-xl shadow-xs font-hindi flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <Send className="w-3 h-3 text-gold-300" />
                <span>व्यक्तिगत दृष्टि व सन्देश भेजें</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Compose Message Modal */}
      {showSendModal && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-ivory-100 dark:bg-maroon-950 border-2 border-gold-300 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative my-auto animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowSendModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white dark:bg-maroon-900 text-spiritual-muted hover:text-maroon-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-maroon-700 text-gold-300 flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 dark:text-gold-400 font-bold block">
                  ईश्वरीय दृष्टि व संदेश प्रेषण
                </span>
                <h3 className="text-base font-bold text-maroon-900 dark:text-gold-100 font-hindi">
                  {selectedStudent.name} को संदेश
                </h3>
              </div>
            </div>

            <form onSubmit={handleSend} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-spiritual-dark dark:text-gray-300 mb-1 font-hindi">
                  संदेश शीर्षक:
                </label>
                <input
                  type="text"
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-gold-300 rounded-xl bg-white dark:bg-maroon-900 font-hindi text-spiritual-dark dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-spiritual-dark dark:text-gray-300 mb-1 font-hindi">
                  विशेष वरदान / दृष्टि सूत्र चुनें:
                </label>
                <div className="space-y-1">
                  {blessingPresets.map((b) => (
                    <div
                      key={b}
                      onClick={() => setSelectedBlessing(b)}
                      className={`p-2 rounded-lg text-xs font-hindi cursor-pointer border transition-all ${
                        selectedBlessing === b
                          ? 'bg-maroon-50 dark:bg-maroon-900 border-maroon-700 text-maroon-950 dark:text-gold-200 font-semibold'
                          : 'bg-white dark:bg-maroon-900/50 border-gold-200 dark:border-gold-800 text-spiritual-dark dark:text-gray-300'
                      }`}
                    >
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-spiritual-dark dark:text-gray-300 mb-1 font-hindi">
                  व्यक्तिगत मार्गदर्शन व प्रेरणा संदेश:
                </label>
                <textarea
                  rows={3}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  required
                  className="w-full p-2.5 text-xs border border-gold-300 rounded-xl bg-white dark:bg-maroon-900 font-hindi text-spiritual-dark dark:text-gray-100 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowSendModal(false)}
                  className="px-4 py-2 text-xs border border-gold-200 rounded-xl font-hindi dark:text-gray-300"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-maroon-700 hover:bg-maroon-800 text-gold-100 font-bold text-xs rounded-xl shadow-md font-hindi flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-gold-300" />
                  <span>विद्यार्थी के डैशबोर्ड पर भेजें</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
