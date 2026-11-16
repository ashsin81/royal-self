export type Language = 'hi' | 'en' | 'hinglish';
export type ThemeMode = 'light' | 'dark';

export interface UserProfile {
  id: string;
  phone: string;
  name: string;
  role: 'student' | 'teacher'; // Center Head Teacher or Student
  centerName?: string;
  language: Language;
  theme: ThemeMode;
  onboarded: boolean;
  selectedQualities: string[];
  primarySanskarGoal: string;
  challenges: string[];
  signatureName: string;
  signedDate: string;
  avatarUrl?: string;
  customInspirationPhoto?: string;
  fontScale?: 'sm' | 'base' | 'lg' | 'xl';
  ttsSpeed?: number;
  geminiApiKey?: string;
  adminPin?: string;
  currentJourneyDay?: number; // 1 to 30
  completedJourneyDays?: number[]; // e.g. [1, 2, 3]
  journeyReflections?: Record<number, string>; // Day -> user reflection
  personalGalleryImages?: string[]; // User's uploaded personal altar photos
}

export interface AskBabaMessage {
  id: string;
  sender: 'user' | 'baba';
  text: string;
  swaman?: string;
  murliQuote?: string;
  actionHomework?: string;
  drishtiQuality?: string;
  timestamp: string;
}

export interface StudentProgressSummary {
  id: string;
  phone: string;
  name: string;
  centerName: string;
  streakDays: number;
  completedTodayCount: number;
  activeSanskar: string;
  unlockedStampsCount: number;
  lastActive: string;
  lastReflection?: string;
  ratingAverage: number;
  avatarUrl?: string;
}

export interface TeacherMessage {
  id: string;
  fromTeacherName: string;
  toStudentId: string;
  title: string;
  messageText: string;
  blessingVardan: string;
  sentAt: string;
  read: boolean;
}

export interface DailyDivineCard {
  id: string;
  cardTitle: string;
  babaGreeting: string; // "मीठे बच्चे..."
  mainMessage: string;
  vardan: string;
  slogan: string;
  drushtiQuality: string;
  imageTheme: string;
}

export interface SpinReward {
  id: string;
  type: 'swaman' | 'vardan' | 'shakti';
  titleHi: string;
  titleEn: string;
  descriptionHi: string;
  color: string;
  icon: string;
}

export interface QualityDefinition {
  id: string;
  nameHi: string;
  nameEn: string;
  descriptionHi: string;
  icon: string;
}

export interface SanskarGoal {
  id: string;
  oldSanskar: string;
  newSanskar: string;
  trigger: string;
  oldResponse: string;
  newResponse: string;
  dailyPractice: string;
  ifThenPlan: string;
  category: string;
  practiceDays: number;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
}

export interface DailyPracticeState {
  date: string; // YYYY-MM-DD
  swamanCompleted: boolean;
  remembranceCompleted: boolean;
  murliCompleted: boolean;
  challengeCompleted: boolean;
  reflectionCompleted: boolean;
  completedAt?: string;
}

export interface MurliContentItem {
  id: string;
  title: string;
  category: string;
  murliDate: string;
  sourceReference: string;
  originalExcerpt: string;
  explanation: string;
  practicalApplication: string;
  todayChallenge: string;
  relatedSanskar: string;
  relatedQuality: string;
  verified: boolean;
}

export interface RescueSituation {
  id: string;
  nameHi: string;
  nameEn: string;
  icon: string;
  borderNameHi: string;
  borderNameEn: string;
  triggerPlaceholder: string;
  defaultEmotions: string[];
  commonOldSanskars: string[];
  gyanGuidanceHi: string;
  babaDirectionHi: string;
  oldResponseExample: string;
  newResponseExample: string;
  stampId: string;
  recommendedQuality: string;
  remembranceAffirmation: string;
  reflectionQuestion: string;
}

export interface RescueSessionRecord {
  id: string;
  situationId: string;
  situationName: string;
  trigger: string;
  emotionalState: string;
  intensityBefore: number; // 1-5
  oldSanskar: string;
  selectedQuality: string;
  newResponse: string;
  intensityAfter: number; // 1-5
  reflectionText: string;
  stampAwardedId: string;
  createdAt: string;
}

export interface NightReflectionRecord {
  id: string;
  date: string;
  successfulSituation: string;
  oldPatternRecognized: string;
  nextElevatedThought: string;
  gratitudeToBaba: string;
  purusharthRating: number; // 1-5
  createdAt: string;
}

export interface PassportStamp {
  id: string;
  code: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  category: 'peace' | 'purity' | 'power' | 'love' | 'wisdom' | 'sovereignty';
  shape: 'round' | 'rect' | 'seal' | 'shield';
  color: string;
  iconSvg: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  notes?: string;
}

export interface BaggageItem {
  id: string;
  nameHi: string;
  nameEn: string;
  category: string;
  isReleased: boolean;
  releasedAt?: string;
  spiritualAntidote: string;
}
