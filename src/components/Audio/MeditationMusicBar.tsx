import React, { useState, useEffect } from 'react';
import { ambientPlayer, SoundscapeType } from '../../utils/ambientAudio';
import { Music, Play, Pause, Volume2, VolumeX, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

export const MeditationMusicBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSoundscape, setCurrentSoundscape] = useState<SoundscapeType>('paramdham-drone');
  const [volume, setVolume] = useState<number>(0.4);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    return ambientPlayer.subscribe((playing, soundscape, vol) => {
      setIsPlaying(playing);
      setCurrentSoundscape(soundscape);
      setVolume(vol);
    });
  }, []);

  const soundscapes: { id: SoundscapeType; labelHi: string; descHi: string; icon: string }[] = [
    {
      id: 'paramdham-drone',
      labelHi: 'परमधाम शांति नाद',
      descHi: '432 Hz पावन नाद • अखंड शांति',
      icon: '✨'
    },
    {
      id: 'amritvela-theta',
      labelHi: 'अमृतवेला थीटा धुन',
      descHi: 'गहन ध्यान • अशरीरी स्थिति',
      icon: '🧘'
    },
    {
      id: 'celestial-bells',
      labelHi: 'स्वर्णिम प्रकाश घंटिकाएं',
      descHi: 'अलौकिक स्पंदन • फरिश्ता वायुमंडल',
      icon: '🔔'
    }
  ];

  const currentLabel = soundscapes.find(s => s.id === currentSoundscape)?.labelHi || 'परमधाम शांति नाद';

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm transition-all duration-300">
      <div className="bg-[#190615]/90 border border-amber-500/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(245,158,11,0.25)] p-2.5 text-white">
        
        {/* Main Minified Bar */}
        <div className="flex items-center justify-between gap-2">
          {/* Left: Play/Pause and Animated Wave */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => ambientPlayer.togglePlay()}
              title={isPlaying ? "संगीत रोकें" : "ध्यान संगीत बजाएं"}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-md ${
                isPlaying
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-maroon-950 animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-amber-300'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <div className="min-w-0 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold font-hindi text-amber-100 truncate">
                  {currentLabel}
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-full bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-0.5 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-0.5 h-3 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                )}
              </div>
              <p className="text-[10px] text-amber-300/70 font-hindi">
                {isPlaying ? 'निरंतर ध्यान संगीत बज रहा है...' : 'टैप करके संगीत शुरू करें'}
              </p>
            </div>
          </div>

          {/* Right: Expand/Collapse */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg text-amber-300/80 hover:text-amber-200 hover:bg-white/10 transition-colors"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Soundscape Selection Drawer */}
        {isExpanded && (
          <div className="mt-3 pt-2.5 border-t border-amber-500/20 space-y-2.5 animate-in fade-in duration-200">
            {/* Soundscape Options */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400/80 block font-hindi">
                दिव्य ध्यान ध्वनि चुनें:
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {soundscapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => ambientPlayer.play(s.id)}
                    className={`w-full p-2 rounded-xl text-left text-xs font-hindi flex items-center justify-between transition-all ${
                      currentSoundscape === s.id && isPlaying
                        ? 'bg-amber-500/20 border border-amber-400/60 text-amber-100 font-bold'
                        : 'bg-black/30 hover:bg-black/50 border border-white/5 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{s.icon}</span>
                      <div>
                        <div className="leading-tight">{s.labelHi}</div>
                        <div className="text-[10px] text-amber-300/60">{s.descHi}</div>
                      </div>
                    </div>
                    {currentSoundscape === s.id && isPlaying && (
                      <span className="text-[10px] text-amber-400 font-bold">बज रहा है</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-2 pt-1 text-xs text-amber-200 font-hindi">
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => ambientPlayer.setVolume(parseFloat(e.target.value))}
                className="flex-1 accent-amber-400 h-1 bg-white/20 rounded-lg cursor-pointer"
              />
              <span className="font-mono text-[10px] text-amber-300 w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
