import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  BOOK_CATEGORIES,
  BABA_QUESTIONS_DATABASE,
  BabaQuestionItem,
  BookCategory
} from '../../data/babaQuestionsDatabase';
import { ambientPlayer } from '../../utils/ambientAudio';
import { sound } from '../../utils/audio';
import { tts } from '../../utils/tts';
import {
  Search,
  BookOpen,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Star,
  Share2,
  Type,
  Music,
  ChevronDown,
  ChevronUp,
  X,
  Shuffle,
  Sun,
  Flame,
  Bookmark
} from 'lucide-react';
import confetti from 'canvas-confetti';

const BOOKMARKS_STORAGE_KEY = 'baba_book_saved_bookmarks_v1';
const FONT_SIZE_STORAGE_KEY = 'baba_book_font_size_v1';

type FontSize = 'normal' | 'large' | 'xlarge';

export const BabaBookView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCardId, setExpandedCardId] = useState<string | null>('mind-1');
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [onlyBookmarks, setOnlyBookmarks] = useState<boolean>(false);

  // Font Size: normal (15px), large (17px), xlarge (19px)
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const saved = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    return (saved as FontSize) || 'large';
  });

  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speakingCardId, setSpeakingCardId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {}
  }, [bookmarks]);

  // Audio & TTS listeners
  useEffect(() => {
    const unsubAudio = ambientPlayer.subscribe((playing) => {
      setIsMusicPlaying(playing);
    });
    const unsubTTS = tts.subscribe((speaking) => {
      setIsSpeaking(speaking);
      if (!speaking) setSpeakingCardId(null);
    });
    return () => {
      unsubAudio();
      unsubTTS();
      tts.stop();
    };
  }, []);

  const cycleFontSize = () => {
    sound.playSoftClick();
    const next: FontSize = fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'xlarge' : 'normal';
    setFontSize(next);
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, next);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'normal':
        return 'text-[14px] sm:text-[15px] leading-relaxed';
      case 'xlarge':
        return 'text-[18px] sm:text-[20px] leading-relaxed';
      case 'large':
      default:
        return 'text-[16px] sm:text-[17px] leading-relaxed';
    }
  };

  // Filter questions based on Category, Search query (Hindi/Hinglish/English), and Bookmarks
  const filteredQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return BABA_QUESTIONS_DATABASE.filter((item) => {
      // Bookmark filter
      if (onlyBookmarks && !bookmarks.includes(item.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
        return false;
      }

      // Search query filter (matches Question, Hinglish keywords, Baba answer, and tags)
      if (query) {
        const inQuestion = item.question.toLowerCase().includes(query);
        const inHinglish = item.questionHinglish.toLowerCase().includes(query);
        const inAnswer = item.babaAnswer.toLowerCase().includes(query);
        const inKeywords = item.keywords.some((k) => k.toLowerCase().includes(query));
        const inCategory = item.categoryName.toLowerCase().includes(query);
        return inQuestion || inHinglish || inAnswer || inKeywords || inCategory;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, bookmarks, onlyBookmarks]);

  const toggleExpand = (id: string) => {
    sound.playSoftClick();
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playStampSound();
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  // Text to Speech
  const handleSpeak = (item: BabaQuestionItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking && speakingCardId === item.id) {
      tts.stop();
      setIsSpeaking(false);
      setSpeakingCardId(null);
    } else {
      sound.playSoftClick();
      setSpeakingCardId(item.id);
      setIsSpeaking(true);
      const textToRead = `प्रश्न: ${item.question}। बाबा का समाधान: ${item.babaAnswer}। आज का स्वमान: ${item.swaman}। वरदान: ${item.vardan}। आज का अभ्यास: ${item.homework}`;
      tts.speak(textToRead, 'hi', 0.92);
    }
  };

  // 1-Click Copy
  const handleCopy = (item: BabaQuestionItem, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSoftClick();
    const fullText = `👑 बाबा से पूछें — ईश्वरीय समाधान:\n\n❓ प्रश्न: ${item.question}\n\n🕊️ समाधान: ${item.babaAnswer}\n\n✨ स्वमान: ${item.swaman}\n📜 मुरली प्रमाण: ${item.murliQuote}\n🎯 आज का अभ्यास: ${item.homework}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // 1-Click Share
  const handleShare = (item: BabaQuestionItem, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSoftClick();
    const text = `🌸 *बाबा से पूछें — ईश्वरीय समाधान*\n\n❓ *प्रश्न:* ${item.question}\n\n🕊️ *बाबा का महावाक्य:* ${item.babaAnswer}\n\n✨ *स्वमान:* ${item.swaman}\n\n🔗 अधिक समाधान पढ़ें: https://ashsin81.github.io/royal-self/`;
    if (navigator.share) {
      navigator.share({ title: 'बाबा से पूछें', text }).catch(() => {});
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  // Pick Random Question to inspire
  const handleRandomInspire = () => {
    sound.playTibetanBowl();
    const randomIndex = Math.floor(Math.random() * BABA_QUESTIONS_DATABASE.length);
    const picked = BABA_QUESTIONS_DATABASE[randomIndex];
    setSelectedCategory('all');
    setOnlyBookmarks(false);
    setSearchQuery('');
    setExpandedCardId(picked.id);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.5 } });
  };

  // Featured Question
  const featuredQuestion = BABA_QUESTIONS_DATABASE.find((q) => q.isFeatured) || BABA_QUESTIONS_DATABASE[0];

  return (
    <div className="flex flex-col min-h-screen max-w-3xl mx-auto bg-[#0d0910] text-gray-100 font-sans select-none antialiased relative pb-16">
      
      {/* Paramdham Ethereal Sun Background Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-80 bg-gradient-to-b from-amber-500/20 via-rose-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* STICKY TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#140b17]/95 backdrop-blur-xl border-b border-amber-500/30 px-3.5 sm:px-6 py-3 shadow-lg shadow-black/40">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo & Book Brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-amber-300 p-0.5 shadow-md shadow-amber-500/30">
                <div className="w-full h-full rounded-full bg-[#1A0A16] flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#fff,0_0_24px_#F59E0B] animate-pulse" />
                </div>
              </div>
            </div>

            <div>
              <h1 className="font-serif font-black text-base sm:text-lg tracking-wide text-amber-100 flex items-center gap-2">
                <span>बाबा से पूछें</span>
                <span className="text-[10px] bg-gradient-to-r from-amber-500 to-rose-500 text-maroon-950 font-black px-2 py-0.5 rounded-full uppercase font-sans">
                  ज्ञान कोश
                </span>
              </h1>
              <p className="text-[11px] text-amber-300/80 font-hindi truncate">
                लाखों प्रश्नों का संपूर्ण ईश्वरीय समाधान • ब्रह्मा कुमारीज
              </p>
            </div>
          </div>

          {/* Quick Header Controls */}
          <div className="flex items-center gap-1.5">
            {/* Random Inspiration */}
            <button
              onClick={handleRandomInspire}
              title="🎲 कोई भी यादृच्छिक प्रश्न व समाधान देखें"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-amber-300 transition-all transform active:scale-95"
            >
              <Shuffle className="w-4 h-4 text-amber-400" />
            </button>

            {/* Font Scaler */}
            <button
              onClick={cycleFontSize}
              title={`अक्षर का आकार बदलें (वर्तमान: ${fontSize})`}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-amber-200 flex items-center gap-1 transition-all"
            >
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] uppercase font-mono">
                {fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}
              </span>
            </button>

            {/* Meditation Ambient Soundscape Toggle */}
            <button
              onClick={() => ambientPlayer.togglePlay()}
              title={isMusicPlaying ? 'ध्यान संगीत बंद करें' : '432 Hz ध्यान संगीत चालू करें'}
              className={`p-2 rounded-xl border transition-all ${
                isMusicPlaying
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200 animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300'
              }`}
            >
              <Music className="w-4 h-4 text-amber-400" />
            </button>

            {/* Bookmarks Toggle */}
            <button
              onClick={() => {
                sound.playSoftClick();
                setOnlyBookmarks((prev) => !prev);
              }}
              title={onlyBookmarks ? 'सभी प्रश्न देखें' : 'सहेजे गए प्रश्न देखें (Bookmarks)'}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1 ${
                onlyBookmarks
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${onlyBookmarks ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
              {bookmarks.length > 0 && (
                <span className="text-[10px] font-bold text-amber-300">{bookmarks.length}</span>
              )}
            </button>
          </div>
        </div>

        {/* QUICK SEARCH BAR (ONE-IN-ALL SEARCH) */}
        <div className="mt-3 relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-amber-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="किसी भी प्रश्न या समस्या को खोजें (e.g. gussa, mann, amritvela, karma)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-[#201024] border border-amber-500/40 text-xs sm:text-sm font-hindi text-white placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="absolute right-3 p-1 rounded-full hover:bg-white/10 text-gray-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Search Status Indicator */}
          {searchQuery && (
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-amber-300 px-1 font-hindi">
              <span>
                🔍 "{searchQuery}" से संबंधित <strong>{filteredQuestions.length}</strong> ईश्वरीय समाधान मिले:
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="underline hover:text-white"
              >
                फ़िल्टर हटाएं
              </button>
            </div>
          )}
        </div>
      </header>

      {/* CATEGORY / CHAPTER PILLS NAVIGATION */}
      <nav className="sticky top-[108px] z-30 bg-[#0d0910]/95 backdrop-blur-md border-b border-amber-500/20 px-3.5 sm:px-6 py-2 overflow-x-auto scrollbar-none flex gap-2">
        {BOOK_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id && !onlyBookmarks;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playSoftClick();
                setSelectedCategory(cat.id);
                setOnlyBookmarks(false);
              }}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-hindi font-medium flex items-center gap-1.5 transition-all transform active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-maroon-950 font-bold shadow-md shadow-amber-500/30'
                  : 'bg-[#1C0F22] hover:bg-[#2A1532] text-amber-200/80 border border-white/10'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </nav>

      {/* MAIN BOOK FEED */}
      <main className="flex-1 px-3.5 sm:px-6 py-4 space-y-4">
        
        {/* FEATURED QUESTION OF THE DAY (Only shown when not searching & on 'all') */}
        {!searchQuery && selectedCategory === 'all' && !onlyBookmarks && (
          <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/15 border-2 border-amber-400/50 shadow-xl space-y-2.5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-serif uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>आज का विशेष समाधान (Featured Solution):</span>
              </span>
              <span className="text-[10px] text-amber-300/80 bg-amber-500/20 border border-amber-400/30 px-2 py-0.5 rounded-full font-hindi">
                {featuredQuestion.categoryName}
              </span>
            </div>

            <h3 className="font-serif font-bold text-sm sm:text-base text-amber-100">
              "{featuredQuestion.question}"
            </h3>

            <p className="text-xs sm:text-sm text-gray-200 font-hindi line-clamp-2 leading-relaxed">
              {featuredQuestion.babaAnswer}
            </p>

            <button
              onClick={() => toggleExpand(featuredQuestion.id)}
              className="mt-1 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-maroon-950 font-bold text-xs font-hindi shadow-md transition-all flex items-center gap-1"
            >
              <span>पूर्ण समाधान पढ़ें</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ACTIVE CATEGORY BANNER / SUMMARY */}
        <div className="flex items-center justify-between text-xs text-amber-200/90 font-hindi px-1">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="font-bold">
              {onlyBookmarks
                ? `⭐ सहेजे गए प्रश्न (${filteredQuestions.length})`
                : selectedCategory === 'all'
                ? `📚 संपूर्ण समाधान कोश (${filteredQuestions.length} प्रश्न उपलब्ध)`
                : `${BOOK_CATEGORIES.find((c) => c.id === selectedCategory)?.name} (${filteredQuestions.length} प्रश्न)`}
            </span>
          </div>

          <span className="text-[11px] text-gray-400">
            टैप करके समाधान देखें
          </span>
        </div>

        {/* QUESTIONS LIST */}
        {filteredQuestions.length > 0 ? (
          <div className="space-y-3.5">
            {filteredQuestions.map((item, index) => {
              const isExpanded = expandedCardId === item.id;
              const isBookmarked = bookmarks.includes(item.id);
              const isAudioActive = isSpeaking && speakingCardId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border transition-all duration-200 overflow-hidden shadow-lg ${
                    isExpanded
                      ? 'bg-gradient-to-b from-[#241128] via-[#1A0B1E] to-[#130716] border-amber-400/70 shadow-amber-500/10'
                      : 'bg-[#180C1E]/90 hover:bg-[#201026] border-white/10 hover:border-amber-500/40'
                  }`}
                >
                  {/* CARD HEADER / QUESTION ROW */}
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className="p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-3 select-none"
                  >
                    <div className="space-y-1.5 flex-1">
                      {/* Category Tag & Index */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] text-amber-300 font-serif font-bold uppercase tracking-wider bg-amber-500/15 border border-amber-400/30 px-2 py-0.5 rounded-full">
                          #{index + 1} {item.categoryName}
                        </span>
                        {item.isFeatured && (
                          <span className="text-[10px] text-rose-300 bg-rose-500/15 border border-rose-400/30 px-2 py-0.5 rounded-full font-hindi">
                            विशेष
                          </span>
                        )}
                      </div>

                      {/* Question Headline */}
                      <h2 className="font-serif font-bold text-sm sm:text-base text-amber-50 leading-snug">
                        {item.question}
                      </h2>
                    </div>

                    {/* Toggle and Bookmark icons */}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <button
                        onClick={(e) => toggleBookmark(item.id, e)}
                        title={isBookmarked ? 'बुकमार्क हटाएं' : 'बुकमार्क करें'}
                        className={`p-2 rounded-full border transition-all ${
                          isBookmarked
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>

                      <div className="p-2 rounded-full bg-white/5 text-amber-300">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* EXPANDED COMPLETE SOLUTION BODY */}
                  {isExpanded && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-4 pt-1 border-t border-amber-500/20 animate-in fade-in duration-200">
                      
                      {/* Baba's Divine Answer */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">👑</span>
                          <span className="font-serif font-black text-xs text-amber-300 tracking-wider">
                            बापदादा का ईश्वरीय महावाक्य व समाधान:
                          </span>
                        </div>
                        <p className={`font-hindi text-amber-50 whitespace-pre-line pl-2 border-l-2 border-amber-400/60 ${getFontSizeClass()}`}>
                          {item.babaAnswer}
                        </p>
                      </div>

                      {/* Today's Sacred Swaman Card */}
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 border border-amber-400/50 text-xs sm:text-sm font-hindi">
                        <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                          ✨ आज का विशेष स्वमान (Affirmation):
                        </span>
                        <p className="font-bold text-amber-100 text-sm sm:text-base mt-1">
                          "{item.swaman}"
                        </p>
                      </div>

                      {/* Murli Quote Citation */}
                      <div className="p-3 rounded-xl bg-black/40 border border-amber-400/20 text-xs font-hindi text-amber-200/90 italic">
                        <strong className="text-amber-300 not-italic">मुरली प्रमाण: </strong>
                        {item.murliQuote}
                      </div>

                      {/* Blessing & Homework Row */}
                      <div className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-1.5 text-xs font-hindi">
                        <div className="text-amber-200">
                          <strong className="text-amber-400">वरदान: </strong>
                          {item.vardan}
                        </div>
                        <div className="text-emerald-300">
                          <strong className="text-emerald-400">आज का अभ्यास: </strong>
                          {item.homework}
                        </div>
                      </div>

                      {/* ACTION CONTROLS TOOLBAR */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        {/* Audio TTS Button */}
                        <button
                          onClick={(e) => handleSpeak(item, e)}
                          title={isAudioActive ? 'आवाज़ बंद करें' : 'समाधान आवाज़ में सुनें'}
                          className={`px-3 py-1.5 rounded-xl border font-hindi text-xs flex items-center gap-1.5 transition-all ${
                            isAudioActive
                              ? 'bg-rose-500/30 border-rose-400 text-rose-200 animate-pulse'
                              : 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-400/40 text-amber-200'
                          }`}
                        >
                          {isAudioActive ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                              <span>बोलना रोकें</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                              <span>आवाज़ में सुनें</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-2">
                          {/* Copy Button */}
                          <button
                            onClick={(e) => handleCopy(item, e)}
                            title="समाधान कॉपी करें"
                            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-hindi text-gray-300 flex items-center gap-1 transition-all"
                          >
                            {copiedId === item.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">कॉपी हुआ!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>कॉपी</span>
                              </>
                            )}
                          </button>

                          {/* Share Button */}
                          <button
                            onClick={(e) => handleShare(item, e)}
                            title="व्हाट्सएप पर शेयर करें"
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-hindi flex items-center gap-1 transition-all"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>शेयर</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="p-8 text-center rounded-3xl bg-[#180C1E] border border-white/10 space-y-3">
            <span className="text-4xl">🕊️</span>
            <h3 className="font-serif font-bold text-base text-amber-200">
              कोई प्रश्न नहीं मिला
            </h3>
            <p className="text-xs text-gray-400 font-hindi max-w-sm mx-auto">
              "{searchQuery}" के लिए कोई परिणाम नहीं मिला। कृपया दूसरा शब्द खोजें या सभी श्रेणियों में देखें।
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyBookmarks(false);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-maroon-950 font-bold text-xs font-hindi shadow-md transition-all"
            >
              सभी प्रश्न दिखाएं
            </button>
          </div>
        )}

      </main>

      {/* FLOATING QUICK INSPIRATION / SEARCH ACTION BAR */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-[#120716]/95 backdrop-blur-xl border-t border-amber-500/30 py-2.5 px-4 shadow-2xl">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs font-hindi">
          
          <div className="flex items-center gap-2 text-amber-300/90">
            <span>✨</span>
            <span className="font-semibold truncate">
              {BABA_QUESTIONS_DATABASE.length} अनमोल ईश्वरीय समाधान सदैव उपलब्ध
            </span>
          </div>

          <button
            onClick={handleRandomInspire}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-maroon-950 font-bold text-xs shadow-md transition-all transform active:scale-95"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>रैंडम प्रश्न</span>
          </button>
        </div>
      </footer>

    </div>
  );
};
