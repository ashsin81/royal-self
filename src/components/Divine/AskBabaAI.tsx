import React, { useState, useRef, useEffect } from 'react';
import { AskBabaMessage } from '../../types';
import { getBabaSpiritualAnswer } from '../../data/divineContent';
import {
  Sparkles,
  Send,
  Volume2,
  VolumeX,
  X,
  HelpCircle,
  Key,
  Flame,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../../utils/audio';
import { tts } from '../../utils/tts';

interface AskBabaAIProps {
  onClose: () => void;
  language?: 'hi' | 'en' | 'hinglish';
  savedApiKey?: string;
  initialQuery?: string;
  onSaveApiKey?: (key: string) => void;
}

export const AskBabaAI: React.FC<AskBabaAIProps> = ({
  onClose,
  language = 'hi',
  savedApiKey = '',
  initialQuery = '',
  onSaveApiKey,
}) => {
  const [messages, setMessages] = useState<AskBabaMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'baba',
      text:
        language === 'en'
          ? 'Sweet child, Baba is always with you. Whatever is on your heart—any doubt, burden, or question—share it openly. I am listening.'
          : 'मीठे बच्चे, बाबा सदा आपके साथ कम्बाइंड है। अपने दिल की कोई भी उलझन, प्रश्न या संकल्प निसंकोच बाबा के आगे रख दो। बाबा आपको देख रहे हैं।',
      swaman: 'मैं सर्वशक्तिमान शिव बाबा की छत्रछाया में सुरक्षित, निश्चिंत आत्मा हूँ।',
      murliQuote: 'बच्चे, सब कुछ बाप के हवाले कर दो और स्वयं हल्के होकर साक्षी बन जाओ।',
      actionHomework: 'एक गहरी सांस लें और 10 सेकण्ड के लिए मन को शांति के सागर में डुबो दें।',
      drishtiQuality: 'परम पावन प्रेममयी दृष्टि',
      timestamp: 'अभी (Now)'
    }
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showKeyConfig, setShowKeyConfig] = useState<boolean>(false);
  const [tempKey, setTempKey] = useState<string>(savedApiKey);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    return tts.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery.trim());
    }
  }, [initialQuery]);

  const quickQuestions = [
    { label: 'मन में बहुत व्यर्थ चल रहा है', icon: '🕊️', query: 'बाबा, मन में बहुत व्यर्थ संकल्प चल रहे हैं, मन शांत कैसे रखें?' },
    { label: 'क्रोध व चिड़चिड़ापन कैसे रोकें?', icon: '🔥', query: 'बाबा, जब कोई अनुचित व्यवहार करे तो क्रोध और चिड़चिड़ापन कैसे समाप्त करें?' },
    { label: 'अमृतवेला शक्तिशाली कैसे बने?', icon: '☀️', query: 'बाबा, अमृतवेले आलस्य आता है, अमृतवेला शक्तिशाली कैसे बनाएं?' },
    { label: 'संबंधों में टकराव हो रहा है', icon: '🤝', query: 'बाबा, संबंधों में टकराव और कड़वाहट आ रही है, उसे प्यार में कैसे बदलें?' },
    { label: 'सदा निश्चिंत कैसे रहें?', icon: '👑', query: 'बाबा, भविष्य की चिंता सताती है, सदा निश्चिंत और हल्के कैसे रहें?' },
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isTyping) return;

    sound.playSoftClick();

    const userMsg: AskBabaMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Call free intelligent BK Gyan engine (or Gemini if provided)
    setTimeout(() => {
      const response = getBabaSpiritualAnswer(textToSend, language);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
      sound.playTibetanBowl();
    }, 600);
  };

  const handleReadMessage = (msg: AskBabaMessage) => {
    if (isSpeaking) {
      tts.stop();
    } else {
      const fullText = `${msg.text}। आपका स्वमान: ${msg.swaman || ''}। अभ्यास: ${msg.actionHomework || ''}`;
      tts.speak(fullText, language, 0.9);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-[#1C0A19] via-[#120510] to-[#0A0208] text-white border border-amber-500/40 rounded-t-3xl sm:rounded-3xl max-w-lg w-full h-[92vh] sm:h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Divine Paramdham Aura Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-56 bg-gradient-to-b from-amber-500/25 via-rose-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="p-4 border-b border-amber-500/30 flex items-center justify-between relative z-10 bg-black/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {/* Glowing Shiv Baba Point of Light */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-rose-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/30 animate-pulse">
                <div className="w-full h-full rounded-full bg-[#1A0614] flex items-center justify-center">
                  <span className="text-xl filter drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">✨</span>
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#120510]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif font-black text-amber-200 text-sm tracking-wider flex items-center gap-1.5">
                  <span>बाबा से पूछें</span>
                  <span className="text-[10px] bg-gradient-to-r from-amber-500 to-rose-500 text-white font-sans px-2 py-0.2 rounded-full font-bold shadow-xs">
                    अलौकिक AI
                  </span>
                </h3>
              </div>
              <p className="text-[10px] text-amber-300/80 font-hindi">
                बापदादा की छत्रछाया • निःशुल्क आत्मिक मार्गदर्शन
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              title="वैकल्पिक AI की (Optional API Key)"
              className="p-1.5 rounded-full hover:bg-white/10 text-amber-300 transition-colors"
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Gemini API Key Drawer */}
        {showKeyConfig && (
          <div className="p-3 bg-amber-950/60 border-b border-amber-500/40 text-xs font-hindi space-y-2 animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between text-amber-200 font-bold">
              <span>Google Gemini AI कुंजी (वैकल्पिक / Optional)</span>
              <span className="text-[10px] text-emerald-400 font-normal">100% Free Built-in Engine Active</span>
            </div>
            <p className="text-[11px] text-gray-300">
              ऐप में ज्ञान इंजन पहले से मुफ़्त शामिल है। यदि आप अपनी खुद की जेमिनी कुंजी जोड़ना चाहते हैं तो यहाँ दर्ज करें:
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl bg-black/60 border border-amber-500/40 text-xs text-white focus:outline-none"
              />
              <button
                onClick={() => {
                  onSaveApiKey?.(tempKey);
                  setShowKeyConfig(false);
                  sound.playStampSound();
                }}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-xs"
              >
                सहेजें
              </button>
            </div>
          </div>
        )}

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 scrollbar-none">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              {msg.sender === 'baba' ? (
                <div className="max-w-[94%] bg-gradient-to-br from-[#2D0F25] via-[#200A1A] to-[#160613] border-2 border-amber-500/50 rounded-2xl rounded-tl-xs p-4 shadow-xl space-y-3 relative overflow-hidden">
                  
                  {/* Gentle shimmering top edge */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

                  {/* Header with audio icon */}
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">👑</span>
                      <span className="font-serif font-black text-xs text-amber-300 tracking-wider">
                        बापदादा के महावाक्य
                      </span>
                    </div>

                    <button
                      onClick={() => handleReadMessage(msg)}
                      title="आवाज़ में सुनें (Listen Voice)"
                      className="p-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 flex items-center gap-1 text-[11px] px-2 transition-colors"
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                          <span>रोकें</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                          <span>सुनें</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Baba's main affectionate text */}
                  <p className="text-xs sm:text-sm font-hindi leading-relaxed text-amber-50 font-normal">
                    {msg.text}
                  </p>

                  {/* Divine Swaman Card */}
                  {msg.swaman && (
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/40 text-xs font-hindi">
                      <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1">
                        <span>✨</span>
                        <span>आज का विशेष स्वमान:</span>
                      </div>
                      <p className="font-bold text-amber-100 mt-0.5">"{msg.swaman}"</p>
                    </div>
                  )}

                  {/* Murli Mahavakya Excerpt */}
                  {msg.murliQuote && (
                    <div className="p-2 rounded-xl bg-black/40 border border-gold-400/20 text-[11px] font-hindi text-amber-200/90 italic">
                      <span className="font-semibold text-gold-300">मुरली प्रमाण: </span>
                      {msg.murliQuote}
                    </div>
                  )}

                  {/* Action Homework */}
                  {msg.actionHomework && (
                    <div className="flex items-start gap-1.5 text-[11px] font-hindi text-emerald-300 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>आज का अभ्यास: </strong> {msg.actionHomework}
                      </span>
                    </div>
                  )}

                  <div className="text-[10px] text-right text-amber-400/60 font-sans">
                    {msg.timestamp}
                  </div>
                </div>
              ) : (
                /* User question bubble */
                <div className="max-w-[85%] bg-gradient-to-r from-amber-600 to-rose-600 text-white rounded-2xl rounded-tr-xs p-3 shadow-md text-xs sm:text-sm font-hindi leading-relaxed">
                  <p>{msg.text}</p>
                  <span className="text-[10px] text-amber-200/70 block text-right mt-1 font-sans">
                    {msg.timestamp}
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-hindi text-amber-300 bg-[#2D0F25]/80 p-3 rounded-2xl max-w-xs border border-amber-500/30 animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>बापदादा की दृष्टि प्रवाहित हो रही है...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips (Colorful) */}
        <div className="px-3 pt-2 pb-1 border-t border-amber-500/20 bg-black/40 overflow-x-auto scrollbar-none flex gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q.query)}
              disabled={isTyping}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 hover:from-amber-500/40 hover:to-rose-500/40 border border-amber-400/40 text-[11px] font-hindi text-amber-200 font-medium flex items-center gap-1.5 transition-all transform active:scale-95 whitespace-nowrap shadow-xs"
            >
              <span>{q.icon}</span>
              <span>{q.label}</span>
            </button>
          ))}
        </div>

        {/* Bottom Input Field */}
        <div className="p-3 bg-black/60 border-t border-amber-500/30 relative z-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="बाबा से पूछें (उदा. मन विचलित है, क्या करूँ?)..."
              disabled={isTyping}
              className="flex-1 px-4 py-2.5 rounded-2xl bg-[#1F0A1B] border border-amber-500/50 text-xs sm:text-sm font-hindi text-white placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:opacity-95 text-white shadow-lg shadow-amber-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all transform active:scale-95"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
