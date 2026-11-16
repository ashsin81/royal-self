// Web Audio API based Pure Meditation Music & Soundscapes
// Generates warm, ethereal spiritual drone frequencies (432Hz harmonic singing bowl & Paramdham theta waves)

export type SoundscapeType = 'paramdham-drone' | 'amritvela-theta' | 'celestial-bells';

class AmbientMeditationPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentSoundscape: SoundscapeType = 'paramdham-drone';
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private intervals: ReturnType<typeof setInterval>[] = [];
  private volume: number = 0.4;
  private subscribers: ((playing: boolean, soundscape: SoundscapeType, volume: number) => void)[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(fn: (playing: boolean, soundscape: SoundscapeType, volume: number) => void) {
    this.subscribers.push(fn);
    fn(this.isPlaying, this.currentSoundscape, this.volume);
    return () => {
      this.subscribers = this.subscribers.filter(s => s !== fn);
    };
  }

  private notify() {
    this.subscribers.forEach(fn => fn(this.isPlaying, this.currentSoundscape, this.volume));
  }

  public togglePlay(soundscape?: SoundscapeType) {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play(soundscape || this.currentSoundscape);
    }
  }

  public play(soundscape: SoundscapeType = 'paramdham-drone') {
    this.stop();
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.currentSoundscape = soundscape;
    this.isPlaying = true;
    this.notify();

    if (soundscape === 'paramdham-drone') {
      this.startParamdhamDrone();
    } else if (soundscape === 'amritvela-theta') {
      this.startAmritvelaTheta();
    } else {
      this.startCelestialBells();
    }
  }

  public stop() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    this.oscillators = [];

    this.intervals.forEach(int => clearInterval(int));
    this.intervals = [];

    this.isPlaying = false;
    this.notify();
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public setSoundscape(soundscape: SoundscapeType) {
    this.currentSoundscape = soundscape;
    if (this.isPlaying) {
      this.play(soundscape);
    } else {
      this.notify();
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      soundscape: this.currentSoundscape,
      volume: this.volume
    };
  }

  // 1. Paramdham 432 Hz Warm Golden Resonance
  private startParamdhamDrone() {
    if (!this.ctx || !this.masterGain) return;
    const baseFreq = 432 / 4; // 108 Hz (Sacred BK Number & Deep Calming Foundation)

    // Base Fundamental Drone
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
    gain1.gain.setValueAtTime(0.35, this.ctx.currentTime);
    osc1.connect(gain1);
    gain1.connect(this.masterGain);
    osc1.start();
    this.oscillators.push(osc1);

    // Warm 5th Harmonic (162 Hz)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 1.5, this.ctx.currentTime);
    gain2.gain.setValueAtTime(0.18, this.ctx.currentTime);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    osc2.start();
    this.oscillators.push(osc2);

    // Shimmering High Overtone (432 Hz Pure Sine)
    const osc3 = this.ctx.createOscillator();
    const gain3 = this.ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(432, this.ctx.currentTime);
    gain3.gain.setValueAtTime(0.08, this.ctx.currentTime);
    osc3.connect(gain3);
    gain3.connect(this.masterGain);
    osc3.start();
    this.oscillators.push(osc3);

    // Subtle Breathing Swell LFO
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime); // 10 second peaceful breath cycle
    lfoGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(gain1.gain);
    lfo.start();
    this.oscillators.push(lfo);
  }

  // 2. Amritvela Binaural Theta Waves (6 Hz difference for deep meditation)
  private startAmritvelaTheta() {
    if (!this.ctx || !this.masterGain) return;
    const baseFreq = 136.1; // Cosmic Om Frequency (Earth Year Frequency)

    // Left Ear
    const oscL = this.ctx.createOscillator();
    const panL = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    const gainL = this.ctx.createGain();
    oscL.type = 'sine';
    oscL.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
    gainL.gain.setValueAtTime(0.25, this.ctx.currentTime);

    if (panL) {
      panL.pan.setValueAtTime(-0.8, this.ctx.currentTime);
      oscL.connect(gainL).connect(panL).connect(this.masterGain);
    } else {
      oscL.connect(gainL).connect(this.masterGain);
    }
    oscL.start();
    this.oscillators.push(oscL);

    // Right Ear (+6 Hz Theta difference)
    const oscR = this.ctx.createOscillator();
    const panR = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    const gainR = this.ctx.createGain();
    oscR.type = 'sine';
    oscR.frequency.setValueAtTime(baseFreq + 6.0, this.ctx.currentTime);
    gainR.gain.setValueAtTime(0.25, this.ctx.currentTime);

    if (panR) {
      panR.pan.setValueAtTime(0.8, this.ctx.currentTime);
      oscR.connect(gainR).connect(panR).connect(this.masterGain);
    } else {
      oscR.connect(gainR).connect(this.masterGain);
    }
    oscR.start();
    this.oscillators.push(oscR);
  }

  // 3. Celestial Bowls & Golden Wind Chimes (Periodic chime strikes)
  private startCelestialBells() {
    if (!this.ctx || !this.masterGain) return;
    // Play subtle background drone
    this.startParamdhamDrone();

    // Trigger gentle chime bowl strikes periodically
    const chimeFreqs = [528, 639, 741, 852, 963]; // Solfeggio Love & Awakening Frequencies
    const strikeInterval = setInterval(() => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
      const strikeOsc = this.ctx.createOscillator();
      const strikeGain = this.ctx.createGain();

      strikeOsc.type = 'sine';
      strikeOsc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      strikeGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      strikeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 4.5);

      strikeOsc.connect(strikeGain);
      strikeGain.connect(this.masterGain);

      strikeOsc.start();
      strikeOsc.stop(this.ctx.currentTime + 4.5);
    }, 7000);

    this.intervals.push(strikeInterval);
  }
}

export const ambientPlayer = new AmbientMeditationPlayer();
