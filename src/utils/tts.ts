// Browser Web Speech API synthesizer for Text-to-Speech (TTS)

class TextToSpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private onStateChangeListeners: ((speaking: boolean, text: string) => void)[] = [];
  public isCurrentlySpeaking: boolean = false;
  public activeText: string = '';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: (speaking: boolean, text: string) => void) {
    this.onStateChangeListeners.push(listener);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter(l => l !== listener);
    };
  }

  private notify(speaking: boolean, text: string) {
    this.isCurrentlySpeaking = speaking;
    this.activeText = text;
    this.onStateChangeListeners.forEach(l => l(speaking, text));
  }

  public speak(text: string, lang: 'hi' | 'en' | 'hinglish' = 'hi', rate: number = 0.95) {
    if (!this.synth) {
      alert('आपके ब्राउज़र में Text-to-Speech समर्थित नहीं है।');
      return;
    }

    // Stop any ongoing speech
    this.stop();

    // Clean up text (remove markdown symbols, stars, brackets)
    const cleanText = text
      .replace(/[#*`_~]/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\(.*?\)/g, '')
      .replace(/•/g, ', ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = rate; // slightly calmer speed
    utterance.pitch = 1.0;

    // Pick suitable voice
    const voices = this.synth.getVoices();
    if (lang === 'hi') {
      const hindiVoice = voices.find(v => v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi'));
      if (hindiVoice) utterance.voice = hindiVoice;
      utterance.lang = 'hi-IN';
    } else {
      const indianEnVoice = voices.find(v => v.lang.startsWith('en-IN') || v.lang.startsWith('en-GB') || v.lang.startsWith('en'));
      if (indianEnVoice) utterance.voice = indianEnVoice;
      utterance.lang = 'en-IN';
    }

    utterance.onstart = () => {
      this.notify(true, cleanText);
    };

    utterance.onend = () => {
      this.notify(false, '');
    };

    utterance.onerror = () => {
      this.notify(false, '');
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notify(false, '');
    }
  }

  public toggle(text: string, lang: 'hi' | 'en' | 'hinglish' = 'hi', rate: number = 0.95) {
    if (this.isCurrentlySpeaking && this.activeText.slice(0, 30) === text.slice(0, 30)) {
      this.stop();
    } else {
      this.speak(text, lang, rate);
    }
  }
}

export const tts = new TextToSpeechService();
