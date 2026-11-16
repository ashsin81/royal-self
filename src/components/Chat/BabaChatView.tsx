import React, { useState, useRef, useEffect } from 'react';
import { askBabaAI, ChatMessage, BabaResponse } from '../../services/babaAIService';
import { ambientPlayer } from '../../utils/ambientAudio';
import { sound } from '../../utils/audio';
import { tts } from '../../utils/tts';
import {
  Send,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Sparkles,
  Music,
  Trash2,
  Key,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Globe,
  Share2,
  Type,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CHAT_STORAGE_KEY = 'baba_se_pooche_messages_v2';
const API_KEY_STORAGE = 'baba_se_pooche_gemini_key';
const SEARCH_STORAGE_KEY = 'baba_se_pooche_google_search';
const FONT_SIZE_STORAGE = 'baba_se_pooche_font_size';

type FontSize = 'normal' | 'large' | 'xlarge';

export const BabaChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'welcome-baba-1',
        sender: 'baba',
        text: 'मीठे बच्चे, ॐ शान्ति! बाबा आपके सम्मुख उपस्थित है। अपने दिल की हर बात, उलझन या प्रश्न बिना किसी संकोच के अपने सच्चे पिता के आगे रख दो। आप Hinglish, हिंदी या English किसी भी भाषा में पूछ सकते हो। बाबा आपकी सुन रहे हैं।',
        babaData: {
          id: 'baba-init',
          sender: 'baba',
          text: 'मीठे बच्चे, ॐ शान्ति! बाबा आपके सम्मुख उपस्थित है। अपने दिल की हर बात, उलझन या प्रश्न बिना किसी संकोच के अपने सच्चे पिता के आगे रख दो। आप Hinglish, हिंदी या English किसी भी भाषा में पूछ सकते हो। बाबा आपकी सुन रहे हैं।',
          category: 'परमात्म मिलन एवं स्वागत',
          murliQuote: 'बच्चे, बाप के सम्मुख बैठकर अपने दिल की पोटली खाली कर दो, तो हल्के होकर उड़ती कला का अनुभव करोगे। (मुरली)',
          swaman: 'मैं सर्वशक्तिमान शिव बाबा का लाडला, अति स्नेही और शांत स्वरूप बच्चा हूँ।',
          vardan: 'सदा बाप की छत्रछाया में सुरक्षित रहकर माया के सर्व विघ्नों पर विजयी भव।',
          actionHomework: 'अभी 1 मिनट के लिए अपने मस्तक के मध्य चमकते सितारे को देखें और शिवबाबा के सम्मुख बैठ जाएं।',
          timestamp: 'अभी',
          aiEngine: 'bk-semantic'
        },
        timestamp: 'अभी'
      }
    ];
  });

  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [language, setLanguage] = useState<'hi' | 'en' | 'hinglish'>('hi');
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem(API_KEY_STORAGE) || '');
  const [enableGoogleSearch, setEnableGoogleSearch] = useState<boolean>(() => {
    const saved = localStorage.getItem(SEARCH_STORAGE_KEY);
    return saved !== null ? saved === 'true' : true;
  });

  // Font Size Scaler: normal (15px), large (17px), xlarge (19px)
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const saved = localStorage.getItem(FONT_SIZE_STORAGE);
    return (saved as FontSize) || 'large';
  });

  // State to track which message has its divine gifts (Swaman, Murli, Vardan) expanded
  const [expandedGiftIds, setExpandedGiftIds] = useState<Record<string, boolean>>({});

  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  const [tempKeyInput, setTempKeyInput] = useState<string>(apiKey);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Sync messages
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Audio & TTS listeners
  useEffect(() => {
    const unsubAudio = ambientPlayer.subscribe((playing) => {
      setIsMusicPlaying(playing);
    });
    const unsubTTS = tts.subscribe((speaking) => {
      setIsSpeaking(speaking);
      if (!speaking) setSpeakingMsgId(null);
    });
    return () => {
      unsubAudio();
      unsubTTS();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleGifts = (id: string) => {
    sound.playSoftClick();
    setExpandedGiftIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const cycleFontSize = () => {
    sound.playSoftClick();
    const next: FontSize = fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'xlarge' : 'normal';
    setFontSize(next);
    localStorage.setItem(FONT_SIZE_STORAGE, next);
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

  const quickPrompts = [
    { label: '✨ Mann shant kaise kare?', query: 'baba mann me bohot vichar chal rahe hai, mann shant aur ekagrah kaise kare?' },
    { label: '🔥 Gussa control kaise kare?', query: 'baba jab koi apman kare to gussa aur chidchidapan kaise control kare?' },
    { label: '☀️ Amritvela uth nahi paate', query: 'baba subah amritvela neend aati hai, powerful amritvela kaise kare?' },
    { label: '📅 Aaj ki Murli ka saar', query: 'baba aaj ki murli ka mukhya saar aur dharana ke points kya hai?' },
    { label: '⚖️ Karma ka hisab kitab', query: 'baba life me aane wale kasht aur dukh ka karmic hisab kaise chuktu kare?' },
    { label: '👑 Aaj ka Swaman', query: 'baba aaj ke din ke liye mujhe mera divine swaman aur vardan dijiye.' },
    { label: '🛡️ Future ki tension hoti hai', query: 'baba future ko lekar dar aur chinta lagti hai, sada befikr kaise rahe?' }
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputText).trim();
    if (!textToSend || isTyping) return;

    sound.playSoftClick();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const babaResponse = await askBabaAI(textToSend, language, apiKey, messages, enableGoogleSearch);

      const babaMsg: ChatMessage = {
        id: babaResponse.id,
        sender: 'baba',
        text: babaResponse.text,
        babaData: babaResponse,
        timestamp: babaResponse.timestamp
      };

      setMessages((prev) => [...prev, babaMsg]);
      sound.playTibetanBowl();
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  // Text-To-Speech (Audio Voice Read Out)
  const handleSpeakMessage = (msg: ChatMessage) => {
    if (isSpeaking && speakingMsgId === msg.id) {
      tts.stop();
      setIsSpeaking(false);
      setSpeakingMsgId(null);
    } else {
      sound.playSoftClick();
      setSpeakingMsgId(msg.id);
      setIsSpeaking(true);
      tts.speak(msg.text, language, 0.92);
    }
  };

  // Speech Recognition (Microphone Voice Input)
  const handleToggleVoiceInput = () => {
    const win = window as any;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert('आपके ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है। कृपया Chrome या Edge का उपयोग करें।');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = 'hi-IN'; // Transcribes both Hindi and Hinglish
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
        sound.playSoftClick();
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setInputText(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech Recognition Error:', event.error);
        setIsListening(false);
        recognitionRef.current = null;
        if (event.error === 'not-allowed') {
          alert('कृपया ब्राउज़र सेटिंग्स में जाकर माइक्रोफ़ोन (Microphone) की अनुमति दें।');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Recognition start failed:', err);
      setIsListening(false);
    }
  };

  const handleCopyMessage = (msg: ChatMessage) => {
    sound.playSoftClick();
    const text = msg.babaData
      ? `👑 शिव बाबा के अनमोल महावाक्य:\n${msg.babaData.text}\n\n✨ स्वमान: ${msg.babaData.swaman}\n📜 मुरली प्रमाण: ${msg.babaData.murliQuote}\n🎯 अभ्यास: ${msg.babaData.actionHomework}`
      : msg.text;
    navigator.clipboard.writeText(text);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleClearChat = () => {
    if (window.confirm('क्या आप सचमुच संवाद साफ करके नया वार्तालाप शुरू करना चाहते हैं?')) {
      sound.playSoftClick();
      tts.stop();
      setMessages([
        {
          id: `welcome-baba-${Date.now()}`,
          sender: 'baba',
          text: 'मीठे बच्चे, ॐ शान्ति! नया दिन, नई स्मृति। कहो बच्चे, आज आपके दिल में क्या संकल्प है?',
          babaData: {
            id: 'baba-new',
            sender: 'baba',
            text: 'मीठे बच्चे, ॐ शान्ति! नया दिन, नई स्मृति। कहो बच्चे, आज आपके दिल में क्या संकल्प है?',
            category: 'नूतन प्रभात',
            murliQuote: 'सदा नए उमंग और उत्साह में रहो। हर दिन को अपने संपूर्ण स्वरूप के करीब आने का अवसर बनाओ।',
            swaman: 'मैं हर घड़ी नवीनता और दिव्यता से भरपूर मास्टर सर्वशक्तिमान आत्मा हूँ।',
            vardan: 'सदा उमंग-उत्साह के पंखों से उड़ती कला का अनुभव करने वाले, तीव्र पुरुषार्थी भव।',
            actionHomework: 'आज पूरे दिन में किसी भी परिस्थिति को समस्या नहीं, समाधान का खेल समझकर पार करें।',
            timestamp: 'अभी',
            aiEngine: 'bk-semantic'
          },
          timestamp: 'अभी'
        }
      ]);
    }
  };

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playStampSound();
    localStorage.setItem(API_KEY_STORAGE, tempKeyInput.trim());
    setApiKey(tempKeyInput.trim());
    setShowKeyModal(false);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-[#131314] text-gray-100 relative overflow-hidden font-sans select-none antialiased">
      
      {/* Subtle Cosmic Paramdham Light Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-72 bg-gradient-to-b from-amber-500/15 via-rose-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* GEMINI-STYLE SLEEK HEADER */}
      <header className="sticky top-0 z-30 bg-[#131314]/90 backdrop-blur-xl border-b border-white/10 px-3.5 py-3 flex items-center justify-between shadow-xs">
        
        {/* Brand: Paramdham Jyotirbindu & App Name */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-amber-300 p-0.5 shadow-md shadow-amber-500/20">
              <div className="w-full h-full rounded-full bg-[#1A0A16] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_20px_#F59E0B] animate-pulse" />
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#131314]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif font-black text-sm sm:text-base tracking-wide text-amber-100 flex items-center gap-1.5">
                <span>बाबा से पूछें</span>
                <span className="text-[10px] bg-gradient-to-r from-amber-400 via-rose-400 to-amber-300 text-maroon-950 font-black px-1.5 py-0.2 rounded-full uppercase font-sans">
                  AI
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-amber-200/70 font-hindi">
              Hinglish • हिंदी • Real-time AI
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Font Size Scaler Button */}
          <button
            onClick={cycleFontSize}
            title={`अक्षर का आकार बदलें (वर्तमान: ${fontSize})`}
            className="px-2 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-amber-200 flex items-center gap-1 transition-all"
          >
            <Type className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] uppercase font-mono">{fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}</span>
          </button>

          {/* Meditation Ambient Soundscape */}
          <button
            onClick={() => ambientPlayer.togglePlay()}
            title={isMusicPlaying ? 'ध्यान संगीत बंद करें' : '432 Hz ध्यान संगीत चालू करें'}
            className={`p-2 rounded-xl border transition-all ${
              isMusicPlaying
                ? 'bg-amber-500/30 border-amber-400 text-amber-200 animate-pulse'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {/* Gemini AI Key / Google Search Setting */}
          <button
            onClick={() => setShowKeyModal(true)}
            title="Google Gemini AI कुंजी एवं सर्च सेटिंग्स"
            className={`p-2 rounded-xl border transition-colors ${
              apiKey
                ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
          </button>

          {/* Clear Chat */}
          <button
            onClick={handleClearChat}
            title="नया वार्तालाप शुरू करें"
            className="p-2 rounded-xl bg-white/5 hover:bg-rose-950/40 hover:text-rose-300 border border-white/10 text-gray-300 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* GEMINI-STYLE SLENDER STATUS BAR */}
      <div className="bg-[#18191B] border-b border-white/5 px-4 py-1.5 flex items-center justify-between text-xs z-20">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-gray-300 font-hindi text-[11px] sm:text-xs">
            {apiKey
              ? enableGoogleSearch
                ? '⚡ Google Gemini 1.5 + लाइव सर्च ग्राउंडिंग'
                : '⚡ Google Gemini 1.5 Flash'
              : '⚡ रियल-टाइम AI इंजन सक्रिय (Hinglish Supported)'}
          </span>
        </div>

        <button
          onClick={() => setShowKeyModal(true)}
          className="text-[11px] text-amber-300/90 hover:text-amber-100 flex items-center gap-1 underline font-hindi"
        >
          <Globe className="w-3 h-3 text-cyan-400" />
          <span>{apiKey ? 'सर्च सेटिंग्स' : '+ गूगल सर्च की जोड़ें'}</span>
        </button>
      </div>

      {/* CHAT MESSAGES FEED */}
      <main className="flex-1 overflow-y-auto px-3.5 sm:px-6 py-4 space-y-5 scrollbar-none relative z-10">
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            } animate-in fade-in duration-200`}
          >
            {msg.sender === 'baba' ? (
              /* GEMINI-STYLE SHIV BABA CONVERSATIONAL CHAT BUBBLE */
              <div className="max-w-[95%] sm:max-w-[90%] space-y-2">
                
                {/* Baba Avatar & Name Label */}
                <div className="flex items-center gap-2 px-1">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 p-0.5 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#1A0A16] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-200 font-serif tracking-wide">
                    शिव बाबा
                  </span>
                  {msg.babaData?.aiEngine === 'gemini-search' && (
                    <span className="text-[10px] text-cyan-300 bg-cyan-950/60 border border-cyan-400/30 px-1.5 py-0.2 rounded-full font-sans">
                      🌐 Grounded
                    </span>
                  )}
                  {msg.babaData?.category && (
                    <span className="text-[10px] text-gray-400 font-hindi truncate max-w-[140px]">
                      • {msg.babaData.category}
                    </span>
                  )}
                </div>

                {/* Main Speech Bubble: Natural, Clean, Beautiful Typography */}
                <div className="bg-[#1E1F20] border border-white/10 rounded-2xl rounded-tl-sm p-4 sm:p-5 shadow-lg shadow-black/30 space-y-3">
                  
                  {/* Baba's Direct Message */}
                  <p className={`font-hindi text-gray-100 ${getFontSizeClass()} whitespace-pre-line`}>
                    {msg.text}
                  </p>

                  {/* Collapsible Divine Gifts Button (Swaman, Murli, Vardan) */}
                  {msg.babaData && (
                    <div className="pt-2 border-t border-white/5">
                      <button
                        onClick={() => toggleGifts(msg.id)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/25 text-amber-200 text-xs font-hindi font-medium transition-all"
                      >
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>
                            {expandedGiftIds[msg.id]
                              ? 'ईश्वरीय सौगातें (स्वमान व वरदान) छुपाएं'
                              : '✨ आज का स्वमान, वरदान व मुरली प्रमाण देखें'}
                          </span>
                        </span>
                        {expandedGiftIds[msg.id] ? (
                          <ChevronUp className="w-4 h-4 text-amber-300" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-amber-300" />
                        )}
                      </button>

                      {/* Expanded Details */}
                      {expandedGiftIds[msg.id] && (
                        <div className="mt-3 space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                          {/* Sacred Swaman Card */}
                          {msg.babaData.swaman && (
                            <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-amber-500/15 border border-amber-400/40 text-xs sm:text-sm font-hindi">
                              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                                ✨ आज का विशेष स्वमान (Affirmation):
                              </span>
                              <p className="font-bold text-amber-100 mt-1">
                                "{msg.babaData.swaman}"
                              </p>
                            </div>
                          )}

                          {/* Murli Quote */}
                          {msg.babaData.murliQuote && (
                            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs font-hindi text-amber-200/90 italic">
                              <strong className="text-amber-300 not-italic">मुरली प्रमाण: </strong>
                              {msg.babaData.murliQuote}
                            </div>
                          )}

                          {/* Vardan & Homework */}
                          <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-1.5 text-xs font-hindi">
                            {msg.babaData.vardan && (
                              <div className="text-amber-200">
                                <strong className="text-amber-400">वरदान: </strong>
                                {msg.babaData.vardan}
                              </div>
                            )}
                            {msg.babaData.actionHomework && (
                              <div className="text-emerald-300">
                                <strong className="text-emerald-400">आज का अभ्यास: </strong>
                                {msg.babaData.actionHomework}
                              </div>
                            )}
                          </div>

                          {/* Real-time Google Search Sources */}
                          {msg.babaData.sources && msg.babaData.sources.length > 0 && (
                            <div className="p-2 rounded-xl bg-cyan-950/30 border border-cyan-400/20 text-xs font-hindi text-cyan-200 space-y-1">
                              <div className="font-bold text-cyan-300 flex items-center gap-1">
                                <Globe className="w-3 h-3 text-cyan-400" />
                                <span>सत्यापित वेब संदर्भ:</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                {msg.babaData.sources.map((src, i) => (
                                  <a
                                    key={i}
                                    href={src.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-cyan-300 hover:underline truncate text-[11px]"
                                  >
                                    • {src.title}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Bar (Audio Read, Copy, Time) */}
                  <div className="flex items-center justify-between pt-1 text-gray-400">
                    <div className="flex items-center gap-1.5">
                      {/* Audio TTS Button */}
                      <button
                        onClick={() => handleSpeakMessage(msg)}
                        title={isSpeaking && speakingMsgId === msg.id ? 'आवाज़ बंद करें' : 'आवाज़ में सुनें (Text-to-Speech)'}
                        className={`p-1.5 rounded-full transition-all flex items-center gap-1 text-[11px] ${
                          isSpeaking && speakingMsgId === msg.id
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-400/50 animate-pulse'
                            : 'bg-white/5 hover:bg-white/10 text-gray-300'
                        }`}
                      >
                        {isSpeaking && speakingMsgId === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                            <span className="text-[10px] font-hindi">बोल रहे हैं...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                            <span className="text-[10px] font-hindi">सुनें</span>
                          </>
                        )}
                      </button>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopyMessage(msg)}
                        title="संदेश कॉपी करें"
                        className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <span className="text-[11px] text-gray-500 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                </div>
              </div>
            ) : (
              /* GEMINI-STYLE USER QUERY BUBBLE */
              <div className="max-w-[85%] bg-[#2B2C2E] text-gray-100 border border-white/10 rounded-3xl rounded-tr-xs px-4 py-3 shadow-md space-y-1">
                <p className={`font-hindi ${getFontSizeClass()}`}>{msg.text}</p>
                <span className="text-[10px] text-gray-400 block text-right font-mono">
                  {msg.timestamp}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Gemini-style Thinking / Streaming Indicator */}
        {isTyping && (
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#1E1F20] border border-white/10 text-amber-200 text-xs sm:text-sm font-hindi max-w-sm animate-pulse shadow-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>
              {apiKey
                ? '✨ बाबा ज्ञान मंथन व गूगल सर्च से समाधान ला रहे हैं...'
                : '✨ बाबा आपके प्रश्न का चिंतन कर रहे हैं...'}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* QUICK GEMINI SUGGESTION PILLS */}
      <div className="px-4 py-2 bg-[#131314] border-t border-white/5 overflow-x-auto scrollbar-none flex gap-2 relative z-20">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.query)}
            disabled={isTyping}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-[#1E1F20] hover:bg-[#2B2C2E] border border-white/10 text-xs font-hindi text-amber-200/90 whitespace-nowrap transition-all transform active:scale-95 disabled:opacity-40"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* BOTTOM GEMINI-STYLE FLOATING PROMPT BAR */}
      <div className="p-3 sm:p-4 bg-[#131314] relative z-20">
        
        {/* Active Voice Listening Banner */}
        {isListening && (
          <div className="mb-2 px-3 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-hindi flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>🎤 सुन रहे हैं... अपने दिल की बात बोलिए (Tap mic to stop)</span>
            </div>
            <button
              onClick={handleToggleVoiceInput}
              className="text-[11px] underline text-rose-300 font-bold"
            >
              समाप्त करें
            </button>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-[#1E1F20] border border-white/15 focus-within:border-amber-400/60 rounded-full px-2.5 py-1.5 shadow-xl transition-all"
        >
          {/* Voice Mic Button */}
          <button
            type="button"
            onClick={handleToggleVoiceInput}
            title={isListening ? 'सुनना रोकें' : 'बोलकर पूछें (Voice Mic)'}
            className={`p-2.5 rounded-full transition-all transform active:scale-90 ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse'
                : 'text-amber-300 hover:bg-white/10'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
            placeholder={
              isListening
                ? 'सुन रहे हैं... बोलिए...'
                : 'बाबा से कुछ भी पूछें (Ask in Hinglish or Hindi)...'
            }
            className={`flex-1 bg-transparent border-none text-gray-100 placeholder-gray-400 focus:outline-none font-hindi px-2 ${
              fontSize === 'xlarge' ? 'text-base' : 'text-sm'
            }`}
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-2.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-maroon-950 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-95 shadow-md transition-all transform active:scale-90 flex items-center justify-center"
          >
            <Send className="w-4 h-4 text-[#131314]" />
          </button>
        </form>
      </div>

      {/* GEMINI AI KEY & GOOGLE SEARCH MODAL */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1E1F20] border border-white/20 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold font-hindi text-amber-100">
                  Google Gemini एवं सर्च सेटिंग्स
                </h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="p-1 rounded-full hover:bg-white/10 text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-300 font-hindi leading-relaxed">
              <p>
                ⚡ ऐप में <strong>मुफ़्त रियल-टाइम AI चैट (Hinglish/Hindi)</strong> पहले से सक्रिय है।
              </p>
              <div className="text-amber-200/90 bg-amber-500/10 p-2.5 rounded-xl border border-amber-400/20 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Google Search Grounding:</span>
                </div>
                <p className="text-[11px] text-gray-300">
                  आज की मुरली या इंटरनेट से ताज़ा लाइव जानकारी के साथ उत्तर पाने के लिए अपनी मुफ़्त Gemini Key जोड़ें:
                </p>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-300 hover:underline block font-semibold text-[11px] pt-1"
                >
                  👉 10 सेकंड में मुफ़्त Gemini Key प्राप्त करें (Google AI Studio)
                </a>
              </div>
            </div>

            <form onSubmit={handleSaveApiKey} className="space-y-3">
              <div>
                <label className="text-[11px] font-hindi text-amber-200 block mb-1">
                  Gemini API Key:
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={tempKeyInput}
                  onChange={(e) => setTempKeyInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                />
              </div>

              {/* Google Search Toggle */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-hindi">
                  <div className="font-bold text-cyan-300 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    <span>लाइव गूगल सर्च ग्राउंडिंग</span>
                  </div>
                  <div className="text-[10px] text-gray-400">
                    उत्तर में लाइव वेब संदर्भ शामिल करें
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableGoogleSearch}
                  onChange={(e) => {
                    setEnableGoogleSearch(e.target.checked);
                    localStorage.setItem(SEARCH_STORAGE_KEY, String(e.target.checked));
                  }}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem(API_KEY_STORAGE);
                    setApiKey('');
                    setTempKeyInput('');
                    setShowKeyModal(false);
                  }}
                  className="px-3 py-2 rounded-xl border border-white/10 text-xs font-hindi text-rose-300 hover:bg-rose-950/40"
                >
                  कुंजी हटाएं
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-rose-400 text-maroon-950 font-bold text-xs font-hindi shadow-md hover:opacity-95"
                >
                  सहेजें (Save)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
