import {
  UserProfile,
  SanskarGoal,
  DailyPracticeState,
  RescueSessionRecord,
  NightReflectionRecord,
  PassportStamp,
  BaggageItem,
  StudentProgressSummary,
  TeacherMessage,
  DailyDivineCard,
  SpinReward
} from '../types';
import { INITIAL_STAMPS } from '../data/stampsData';
import { SANSKAR_GOAL_PRESETS, INITIAL_BAGGAGE } from '../data/sanskarData';
import { INITIAL_STUDENTS_PROGRESS, INITIAL_TEACHER_MESSAGES, DAILY_DIVINE_CARDS, SPIN_WHEEL_ITEMS } from '../data/divineContent';

const KEYS = {
  PROFILE: 'royal_self_profile',
  PRACTICE_TODAY: 'royal_self_practice_today',
  PRACTICE_HISTORY: 'royal_self_practice_history',
  SANSKAR_GOALS: 'royal_self_sanskar_goals',
  RESCUE_SESSIONS: 'royal_self_rescue_sessions',
  REFLECTIONS: 'royal_self_reflections',
  STAMPS: 'royal_self_stamps',
  BAGGAGE: 'royal_self_baggage',
  STUDENTS: 'royal_self_students',
  TEACHER_MESSAGES: 'royal_self_teacher_messages',
  PHONE_NUMBERS: 'royal_self_remembered_phones',
  SAVED_CARD_TODAY: 'royal_self_card_today',
  SAVED_SPIN_TODAY: 'royal_self_spin_today'
};

export const getTodayDateString = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const storage = {
  getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(KEYS.PROFILE);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return {
      id: 'stud-1',
      phone: '9876543210',
      name: 'राजयोगी आत्मा',
      role: 'student',
      centerName: 'शांति निकेतन सेवाकेंद्र, दिल्ली',
      language: 'hi',
      theme: 'light',
      onboarded: false,
      selectedQualities: ['शांत स्वरूप', 'मास्टर सर्वशक्तिमान स्वरूप', 'पवित्र स्वरूप'],
      primarySanskarGoal: 'प्रतिक्रिया के स्थान पर शांति व धैर्य',
      challenges: ['क्रोध और चिड़चिड़ापन', 'व्यर्थ संकल्प और Overthinking'],
      signatureName: 'स्वराज्य अधिकारी',
      signedDate: getTodayDateString(),
      avatarUrl: '',
      customInspirationPhoto: '',
      fontScale: 'base',
      ttsSpeed: 0.95,
      currentJourneyDay: 1,
      completedJourneyDays: [],
      journeyReflections: {},
      personalGalleryImages: []
    };
  },

  setProfile(profile: UserProfile): void {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    this.rememberPhone(profile.phone, profile.name);
  },

  getRememberedPhones(): { phone: string; name: string; role: 'student' | 'teacher' }[] {
    try {
      const data = localStorage.getItem(KEYS.PHONE_NUMBERS);
      if (data) return JSON.parse(data);
    } catch {}
    return [
      { phone: '9876543210', name: 'राजयोगी आत्मा', role: 'student' }
    ];
  },

  rememberPhone(phone: string, name: string): void {
    if (!phone) return;
    const list = this.getRememberedPhones();
    const existing = list.find(p => p.phone === phone);
    if (!existing) {
      list.push({ phone, name, role: 'student' });
      localStorage.setItem(KEYS.PHONE_NUMBERS, JSON.stringify(list));
    }
  },

  getStudents(): StudentProgressSummary[] {
    try {
      const data = localStorage.getItem(KEYS.STUDENTS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS_PROGRESS));
    return INITIAL_STUDENTS_PROGRESS;
  },

  setStudents(list: StudentProgressSummary[]): void {
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(list));
  },

  getTeacherMessages(): TeacherMessage[] {
    try {
      const data = localStorage.getItem(KEYS.TEACHER_MESSAGES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem(KEYS.TEACHER_MESSAGES, JSON.stringify(INITIAL_TEACHER_MESSAGES));
    return INITIAL_TEACHER_MESSAGES;
  },

  addTeacherMessage(msg: TeacherMessage): void {
    const list = this.getTeacherMessages();
    list.unshift(msg);
    localStorage.setItem(KEYS.TEACHER_MESSAGES, JSON.stringify(list));
  },

  markTeacherMessageRead(id: string): void {
    const list = this.getTeacherMessages();
    const target = list.find(m => m.id === id);
    if (target) {
      target.read = true;
      localStorage.setItem(KEYS.TEACHER_MESSAGES, JSON.stringify(list));
    }
  },

  getDailyPractice(): DailyPracticeState {
    const today = getTodayDateString();
    try {
      const data = localStorage.getItem(KEYS.PRACTICE_TODAY);
      if (data) {
        const parsed: DailyPracticeState = JSON.parse(data);
        if (parsed.date === today) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    const fresh: DailyPracticeState = {
      date: today,
      swamanCompleted: false,
      remembranceCompleted: false,
      murliCompleted: false,
      challengeCompleted: false,
      reflectionCompleted: false
    };
    localStorage.setItem(KEYS.PRACTICE_TODAY, JSON.stringify(fresh));
    return fresh;
  },

  setDailyPractice(practice: DailyPracticeState): void {
    localStorage.setItem(KEYS.PRACTICE_TODAY, JSON.stringify(practice));
    try {
      const historyStr = localStorage.getItem(KEYS.PRACTICE_HISTORY);
      const history: Record<string, DailyPracticeState> = historyStr ? JSON.parse(historyStr) : {};
      history[practice.date] = practice;
      localStorage.setItem(KEYS.PRACTICE_HISTORY, JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  },

  getPracticeHistory(): Record<string, DailyPracticeState> {
    try {
      const historyStr = localStorage.getItem(KEYS.PRACTICE_HISTORY);
      return historyStr ? JSON.parse(historyStr) : {};
    } catch {
      return {};
    }
  },

  getSanskarGoals(): SanskarGoal[] {
    try {
      const data = localStorage.getItem(KEYS.SANSKAR_GOALS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    const preset = SANSKAR_GOAL_PRESETS[0];
    const initialGoals: SanskarGoal[] = [
      {
        id: 'goal-primary-1',
        oldSanskar: preset.oldSanskar,
        newSanskar: preset.newSanskar,
        trigger: preset.trigger,
        oldResponse: preset.oldResponse,
        newResponse: preset.newResponse,
        dailyPractice: preset.dailyPractice,
        ifThenPlan: preset.ifThenPlan,
        category: preset.category,
        practiceDays: 5,
        status: 'active',
        createdAt: getTodayDateString()
      }
    ];
    localStorage.setItem(KEYS.SANSKAR_GOALS, JSON.stringify(initialGoals));
    return initialGoals;
  },

  setSanskarGoals(goals: SanskarGoal[]): void {
    localStorage.setItem(KEYS.SANSKAR_GOALS, JSON.stringify(goals));
  },

  getRescueSessions(): RescueSessionRecord[] {
    try {
      const data = localStorage.getItem(KEYS.RESCUE_SESSIONS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'mock-1',
        situationId: 'anger',
        situationName: 'Anger Border (क्रोध सीमा)',
        trigger: 'परिवार में किसी ने अपेक्षा के विपरीत बात कही',
        emotionalState: 'क्रोध व क्षोभ',
        intensityBefore: 4,
        oldSanskar: 'तुरंत प्रतिक्रिया देना',
        selectedQuality: 'शांत स्वरूप',
        newResponse: 'मैंने 5 सेकंड रुककर आत्म-स्मृति का अभ्यास किया और शांत होकर बात की।',
        intensityAfter: 1,
        reflectionText: 'क्रोध को कर्म नहीं बनने दिया। बाबा की छत्रछाया का अनुभव हुआ।',
        stampAwardedId: 'shanti-sanskar',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ];
  },

  addRescueSession(session: RescueSessionRecord): void {
    const list = this.getRescueSessions();
    list.unshift(session);
    localStorage.setItem(KEYS.RESCUE_SESSIONS, JSON.stringify(list));
  },

  getNightReflections(): NightReflectionRecord[] {
    try {
      const data = localStorage.getItem(KEYS.REFLECTIONS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'ref-1',
        date: getTodayDateString(),
        successfulSituation: 'आज कार्यस्थल में तनाव के बीच स्वयं को शांत स्वरूप आत्मा अनुभव किया।',
        oldPatternRecognized: 'जल्दबाजी में दूसरों को सुधारने की इच्छा जागृत हुई।',
        nextElevatedThought: 'दूसरों को बदलने के बजाय पहले अपनी स्थिति को सुखदाई बनाना है।',
        gratitudeToBaba: 'बाबा ने पूरे दिन छत्रछाया देकर हल्केपन का अनुभव कराया।',
        purusharthRating: 4,
        createdAt: new Date().toISOString()
      }
    ];
  },

  addNightReflection(ref: NightReflectionRecord): void {
    const list = this.getNightReflections();
    list.unshift(ref);
    localStorage.setItem(KEYS.REFLECTIONS, JSON.stringify(list));
  },

  getStamps(): PassportStamp[] {
    try {
      const data = localStorage.getItem(KEYS.STAMPS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem(KEYS.STAMPS, JSON.stringify(INITIAL_STAMPS));
    return INITIAL_STAMPS;
  },

  unlockStamp(stampId: string, situationNote?: string): PassportStamp | null {
    const stamps = this.getStamps();
    const target = stamps.find(s => s.id === stampId);
    if (target) {
      target.isUnlocked = true;
      target.unlockedAt = new Date().toISOString();
      if (situationNote) target.notes = situationNote;
      localStorage.setItem(KEYS.STAMPS, JSON.stringify(stamps));
      return target;
    }
    return null;
  },

  getBaggage(): BaggageItem[] {
    try {
      const data = localStorage.getItem(KEYS.BAGGAGE);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem(KEYS.BAGGAGE, JSON.stringify(INITIAL_BAGGAGE));
    return INITIAL_BAGGAGE;
  },

  setBaggage(items: BaggageItem[]): void {
    localStorage.setItem(KEYS.BAGGAGE, JSON.stringify(items));
  },

  getCardOfTheDay(): DailyDivineCard {
    const today = getTodayDateString();
    try {
      const data = localStorage.getItem(KEYS.SAVED_CARD_TODAY);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.date === today) return parsed.card;
      }
    } catch {}
    // Pick deterministic card based on day or first
    const card = DAILY_DIVINE_CARDS[new Date().getDate() % DAILY_DIVINE_CARDS.length];
    localStorage.setItem(KEYS.SAVED_CARD_TODAY, JSON.stringify({ date: today, card }));
    return card;
  },

  getSpinRewardToday(): SpinReward | null {
    const today = getTodayDateString();
    try {
      const data = localStorage.getItem(KEYS.SAVED_SPIN_TODAY);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.date === today) return parsed.reward;
      }
    } catch {}
    return null;
  },

  saveSpinRewardToday(reward: SpinReward): void {
    const today = getTodayDateString();
    localStorage.setItem(KEYS.SAVED_SPIN_TODAY, JSON.stringify({ date: today, reward }));
  },

  exportAllData(): string {
    const backup = {
      profile: this.getProfile(),
      dailyPractice: this.getDailyPractice(),
      practiceHistory: this.getPracticeHistory(),
      sanskarGoals: this.getSanskarGoals(),
      rescueSessions: this.getRescueSessions(),
      nightReflections: this.getNightReflections(),
      stamps: this.getStamps(),
      baggage: this.getBaggage(),
      teacherMessages: this.getTeacherMessages(),
      students: this.getStudents(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(backup, null, 2);
  },

  importAllData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) localStorage.setItem(KEYS.PROFILE, JSON.stringify(data.profile));
      if (data.dailyPractice) localStorage.setItem(KEYS.PRACTICE_TODAY, JSON.stringify(data.dailyPractice));
      if (data.practiceHistory) localStorage.setItem(KEYS.PRACTICE_HISTORY, JSON.stringify(data.practiceHistory));
      if (data.sanskarGoals) localStorage.setItem(KEYS.SANSKAR_GOALS, JSON.stringify(data.sanskarGoals));
      if (data.rescueSessions) localStorage.setItem(KEYS.RESCUE_SESSIONS, JSON.stringify(data.rescueSessions));
      if (data.nightReflections) localStorage.setItem(KEYS.REFLECTIONS, JSON.stringify(data.nightReflections));
      if (data.stamps) localStorage.setItem(KEYS.STAMPS, JSON.stringify(data.stamps));
      if (data.baggage) localStorage.setItem(KEYS.BAGGAGE, JSON.stringify(data.baggage));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  resetToDefault(): void {
    localStorage.clear();
  }
};
