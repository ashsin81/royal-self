import {
  UserProfile,
  SanskarGoal,
  DailyPracticeState,
  RescueSessionRecord,
  NightReflectionRecord,
  PassportStamp,
  BaggageItem
} from '../types';
import { INITIAL_STAMPS } from '../data/stampsData';
import { SANSKAR_GOAL_PRESETS, INITIAL_BAGGAGE } from '../data/sanskarData';

const KEYS = {
  PROFILE: 'royal_self_profile',
  PRACTICE_TODAY: 'royal_self_practice_today',
  PRACTICE_HISTORY: 'royal_self_practice_history',
  SANSKAR_GOALS: 'royal_self_sanskar_goals',
  RESCUE_SESSIONS: 'royal_self_rescue_sessions',
  REFLECTIONS: 'royal_self_reflections',
  STAMPS: 'royal_self_stamps',
  BAGGAGE: 'royal_self_baggage',
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
      name: 'राजयोगी आत्मा',
      language: 'hi',
      onboarded: false,
      selectedQualities: ['शांत स्वरूप', 'मास्टर सर्वशक्तिमान स्वरूप', 'पवित्र स्वरूप'],
      primarySanskarGoal: 'प्रतिक्रिया के स्थान पर शांति व धैर्य',
      challenges: ['क्रोध और चिड़चिड़ापन', 'व्यर्थ संकल्प और Overthinking'],
      signatureName: 'स्वराज्य अधिकारी',
      signedDate: getTodayDateString(),
      reminderPreferences: {
        morning: true,
        amritvela: true,
        afternoon: true,
        evening: true,
        night: true,
        morningTime: '06:00',
        nightTime: '21:30'
      }
    };
  },

  setProfile(profile: UserProfile): void {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
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
    // Also save into history
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
        successfulSituation: 'आज कार्यालय में तनाव के बीच स्वयं को शांत स्वरूप आत्मा अनुभव किया।',
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
