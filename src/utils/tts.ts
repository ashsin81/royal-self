// Browser Web Speech API synthesizer for Text-to-Speech (TTS) with Chrome/Safari bug fixes

class TextToSpeechService {
  private synth: SpeechSynthesis | null = null;
  private onStateChangeListeners: ((speaking: boolean, text: string) => void)[] = [];
  public isCurrentlySpeaking: boolean = false;
  public activeText: string = '';
  private cachedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    try {
      this.cachedVoices = this.synth.getVoices();
    } catch {}
  }

  public subscribe(listener: (speaking: boolean, text: string) => void) {
    this.onStateChangeListeners.push(listener);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notify(speaking: boolean, text: string) {
    this.isCurrentlySpeaking = speaking;
    this.activeText = text;
    this.onStateChangeListeners.forEach((l) => l(speaking, text));
  }

  public speak(text: string, lang: 'hi' | 'en' | 'hinglish' = 'hi', rate: number = 0.92) {
    if (!this.synth) {
      alert('आपके ब्राउज़र में Text-to-Speech (आवाज़) उपलब्ध नहीं है।');
      return;
    }

    try {
      // Resume if Chrome paused the synth engine
      if (this.synth.paused) {
        this.synth.resume();
      }
      this.synth.cancel();
    } catch {}

    // Clean up text (strip markdown, citations, brackets)
    const cleanText = text
      .replace(/[#*`_~]/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\(.*?\)/g, '')
      .replace(/•/g, ', ')
      .replace(/\{.*?\}/g, '')
      .trim();

    if (!cleanText) return;

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = rate; // calm, soothing spiritual pace
      utterance.pitch = 1.0;

      // Pick best voice
      const voices = this.cachedVoices.length > 0 ? this.cachedVoices : this.synth.getVoices();
      if (lang === 'en') {
        const enVoice = voices.find(
          (v) =>
            v.lang.startsWith('en-IN') ||
            v.lang.startsWith('en-GB') ||
            v.lang.startsWith('en-US') ||
            v.name.toLowerCase().includes('english')
        );
        if (enVoice) utterance.voice = enVoice;
        utterance.lang = 'en-IN';
      } else {
        // Hindi & Hinglish
        const hiVoice = voices.find(
          (v) =>
            v.lang.startsWith('hi') ||
            v.name.toLowerCase().includes('hindi') ||
            v.name.toLowerCase().includes('lekha') ||
            v.name.toLowerCase().includes('neel')
        );
        if (hiVoice) {
          utterance.voice = hiVoice;
        }
        utterance.lang = 'hi-IN';
      }

      utterance.onstart = () => {
        this.notify(true, cleanText);
      };

      utterance.onend = () => {
        this.notify(false, '');
      };

      utterance.onerror = (e) => {
        console.warn('TTS Speech error:', e);
        this.notify(false, '');
      };

      // Store on window to prevent Chrome garbage collector bug
      (window as any).__activeUtterance = utterance;

      this.synth.speak(utterance);
    } catch (e) {
      console.warn('TTS speak failed:', e);
      this.notify(false, '');
    }
  }

  public stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {}
      this.notify(false, '');
    }
  }

  public toggle(text: string, lang: 'hi' | 'en' | 'hinglish' = 'hi', rate: number = 0.92) {
    if (this.isCurrentlySpeaking) {
      this.stop();
    } else {
      this.speak(text, lang, rate);
    }
  }
}

export const tts = new TextToSpeechService();
