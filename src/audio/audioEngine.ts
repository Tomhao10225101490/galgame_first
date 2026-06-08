import type { BackgroundId, BgmId } from '../engine/types';

type SeId = 'click' | 'choice' | 'save' | 'pageTurn';

interface MusicProfile {
  bpm: number;
  waveform: OscillatorType;
  padVolume: number;
  arpVolume: number;
  bassVolume: number;
  chords: number[][];
  arp: number[];
}

const MUSIC: Record<Exclude<BgmId, 'none'>, MusicProfile> = {
  night: {
    bpm: 68,
    waveform: 'sine',
    padVolume: 0.055,
    arpVolume: 0.035,
    bassVolume: 0.035,
    chords: [
      [146.83, 220, 277.18, 329.63],
      [130.81, 196, 246.94, 293.66],
      [164.81, 246.94, 329.63, 392],
      [110, 164.81, 220, 277.18],
    ],
    arp: [440, 493.88, 554.37, 659.25, 739.99],
  },
  day: {
    bpm: 96,
    waveform: 'triangle',
    padVolume: 0.04,
    arpVolume: 0.05,
    bassVolume: 0.03,
    chords: [
      [196, 246.94, 293.66, 392],
      [220, 261.63, 329.63, 440],
      [174.61, 220, 261.63, 349.23],
      [196, 246.94, 293.66, 392],
    ],
    arp: [392, 440, 493.88, 587.33, 659.25, 783.99],
  },
  rain: {
    bpm: 58,
    waveform: 'sine',
    padVolume: 0.06,
    arpVolume: 0.025,
    bassVolume: 0.04,
    chords: [
      [110, 164.81, 220, 261.63],
      [98, 146.83, 196, 246.94],
      [123.47, 185, 246.94, 293.66],
      [87.31, 130.81, 174.61, 220],
    ],
    arp: [329.63, 369.99, 392, 493.88, 554.37],
  },
  stars: {
    bpm: 74,
    waveform: 'sine',
    padVolume: 0.052,
    arpVolume: 0.045,
    bassVolume: 0.025,
    chords: [
      [164.81, 246.94, 329.63, 493.88],
      [146.83, 220, 293.66, 440],
      [185, 277.18, 369.99, 554.37],
      [196, 293.66, 392, 587.33],
    ],
    arp: [659.25, 739.99, 880, 987.77, 1174.66],
  },
  tension: {
    bpm: 52,
    waveform: 'sawtooth',
    padVolume: 0.032,
    arpVolume: 0.02,
    bassVolume: 0.06,
    chords: [
      [82.41, 123.47, 174.61, 220],
      [87.31, 130.81, 185, 233.08],
      [77.78, 116.54, 164.81, 207.65],
      [92.5, 138.59, 196, 246.94],
    ],
    arp: [220, 233.08, 246.94, 277.18, 311.13],
  },
  ending: {
    bpm: 72,
    waveform: 'triangle',
    padVolume: 0.058,
    arpVolume: 0.04,
    bassVolume: 0.032,
    chords: [
      [174.61, 261.63, 329.63, 392],
      [196, 293.66, 369.99, 440],
      [146.83, 220, 277.18, 329.63],
      [130.81, 196, 261.63, 392],
    ],
    arp: [523.25, 587.33, 659.25, 783.99, 880],
  },
};

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private ambienceGain: GainNode | null = null;
  private seGain: GainNode | null = null;
  private bgmStops: Array<() => void> = [];
  private bgmIntervals: number[] = [];
  private ambienceStops: Array<() => void> = [];
  private currentBgm: BgmId | null = null;
  private currentBackground: BackgroundId | null = null;
  private volume = 0.5;
  private muted = false;

  ensureStarted(): void {
    this.ensureContext();
  }

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.bgmGain = this.ctx.createGain();
      this.ambienceGain = this.ctx.createGain();
      this.seGain = this.ctx.createGain();
      this.bgmGain.connect(this.masterGain);
      this.ambienceGain.connect(this.masterGain);
      this.seGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
      this.bgmGain.gain.value = 0.8;
      this.ambienceGain.gain.value = 0.45;
      this.seGain.gain.value = 0.9;
      this.applyVolume();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  setVolume(v: number): void {
    this.volume = v;
    this.applyVolume();
  }

  setMuted(m: boolean): void {
    this.muted = m;
    this.applyVolume();
  }

  private applyVolume(): void {
    if (this.masterGain) {
      this.masterGain.gain.value = this.muted ? 0 : this.volume;
    }
  }

  playSe(id: SeId): void {
    const ctx = this.ensureContext();
    switch (id) {
      case 'click':
        this.playTone(ctx, 980, 0.055, 45, 'square');
        this.playNoiseBurst(ctx, 0.025, 1600, 0.02);
        break;
      case 'choice':
        this.playTone(ctx, 520, 0.07, 100, 'triangle');
        window.setTimeout(() => this.playTone(ctx, 780, 0.045, 110, 'triangle'), 70);
        break;
      case 'save':
        this.playTone(ctx, 659.25, 0.065, 160, 'sine');
        window.setTimeout(() => this.playTone(ctx, 987.77, 0.055, 180, 'sine'), 110);
        window.setTimeout(() => this.playTone(ctx, 1318.51, 0.04, 220, 'sine'), 220);
        break;
      case 'pageTurn':
        this.playNoiseBurst(ctx, 0.05, 2600, 0.05);
        this.playTone(ctx, 380, 0.025, 80, 'sine');
        break;
    }
  }

  stopBgm(): void {
    for (const id of this.bgmIntervals) window.clearInterval(id);
    this.bgmIntervals = [];
    for (const stop of this.bgmStops) {
      try {
        stop();
      } catch {
        /* already stopped */
      }
    }
    this.bgmStops = [];
    this.currentBgm = null;
  }

  playBgm(id: BgmId): void {
    if (id === 'none') {
      this.stopBgm();
      return;
    }
    if (id === this.currentBgm) return;
    this.stopBgm();
    this.currentBgm = id;
    const ctx = this.ensureContext();
    this.startMusic(ctx, MUSIC[id]);
  }

  playAmbience(background: BackgroundId): void {
    if (background === this.currentBackground) return;
    this.currentBackground = background;
    this.stopAmbience();
    const ctx = this.ensureContext();

    switch (background) {
      case 'rain_street':
        this.startNoiseLoop(ctx, 0.12, 900, 0.6, 'lowpass');
        this.startPulse(ctx, 120, 0.015, 4.8, 'sine');
        break;
      case 'convenience_night':
      case 'convenience_day':
        this.startPulse(ctx, 58, 0.022, 2.7, 'sine');
        this.startNoiseLoop(ctx, 0.035, 1200, 0.24, 'lowpass');
        break;
      case 'rooftop_stars':
      case 'beach_dusk':
        this.startNoiseLoop(ctx, 0.05, 520, 0.35, 'lowpass');
        break;
      case 'underground_machine':
      case 'planetarium_old':
        this.startPulse(ctx, 72, 0.038, 1.8, 'sawtooth');
        this.startNoiseLoop(ctx, 0.04, 1800, 0.32, 'bandpass');
        break;
      case 'station_morning':
        this.startNoiseLoop(ctx, 0.035, 760, 0.28, 'lowpass');
        this.startPulse(ctx, 96, 0.016, 7.5, 'triangle');
        break;
      default:
        this.startNoiseLoop(ctx, 0.018, 1000, 0.2, 'lowpass');
    }
  }

  private stopAmbience(): void {
    for (const stop of this.ambienceStops) {
      try {
        stop();
      } catch {
        /* already stopped */
      }
    }
    this.ambienceStops = [];
  }

  private startMusic(ctx: AudioContext, profile: MusicProfile): void {
    const beatMs = 60000 / profile.bpm;
    let chordIndex = 0;
    let arpIndex = 0;

    const scheduleChord = () => {
      const chord = profile.chords[chordIndex % profile.chords.length];
      chordIndex += 1;
      this.playChord(ctx, chord, profile.padVolume, beatMs * 8, profile.waveform);
      this.playTone(ctx, chord[0] / 2, profile.bassVolume, beatMs * 2.8, 'sine', this.bgmGain!);
    };

    const scheduleArp = () => {
      const freq = profile.arp[arpIndex % profile.arp.length];
      arpIndex += Math.random() > 0.26 ? 1 : 2;
      this.playTone(ctx, freq, profile.arpVolume, beatMs * 0.72, 'triangle', this.bgmGain!);
    };

    scheduleChord();
    scheduleArp();
    this.bgmIntervals.push(window.setInterval(scheduleChord, beatMs * 8));
    this.bgmIntervals.push(window.setInterval(scheduleArp, beatMs));
    this.bgmIntervals.push(
      window.setInterval(() => {
        const note = profile.arp[Math.floor(Math.random() * profile.arp.length)] * 2;
        this.playTone(ctx, note, profile.arpVolume * 0.55, beatMs * 2.2, 'sine', this.bgmGain!);
      }, beatMs * 6),
    );
  }

  private playChord(ctx: AudioContext, freqs: number[], vol: number, durationMs: number, type: OscillatorType): void {
    for (const freq of freqs) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const now = ctx.currentTime;
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      filter.type = 'lowpass';
      filter.frequency.value = 1100;
      filter.Q.value = 0.7;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(vol, now + 1.2);
      gain.gain.setValueAtTime(vol, now + durationMs / 1000 - 1.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000);
      osc.connect(gain);
      gain.connect(filter);
      filter.connect(this.bgmGain!);
      osc.start(now);
      osc.stop(now + durationMs / 1000 + 0.1);
      this.bgmStops.push(() => osc.stop());
    }
  }

  private playTone(
    ctx: AudioContext,
    freq: number,
    vol: number,
    durationMs: number,
    type: OscillatorType,
    destination: AudioNode = this.seGain!,
  ): void {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(vol, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000);
    osc.connect(gain);
    gain.connect(destination);
    osc.start(now);
    osc.stop(now + durationMs / 1000 + 0.03);
  }

  private playNoiseBurst(ctx: AudioContext, vol: number, filterFreq: number, duration: number): void {
    const source = this.createNoiseSource(ctx, duration);
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    filter.type = 'bandpass';
    filter.frequency.value = filterFreq;
    filter.Q.value = 1.4;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.seGain!);
    source.start(now);
    source.stop(now + duration);
  }

  private createNoiseSource(ctx: AudioContext, seconds: number): AudioBufferSourceNode {
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * seconds));
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    return source;
  }

  private startNoiseLoop(
    ctx: AudioContext,
    vol: number,
    filterFreq: number,
    q: number,
    filterType: BiquadFilterType,
  ): void {
    const source = this.createNoiseSource(ctx, 2);
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    filter.type = filterType;
    filter.frequency.value = filterFreq;
    filter.Q.value = q;
    gain.gain.value = vol;
    source.loop = true;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ambienceGain!);
    source.start();
    this.ambienceStops.push(() => source.stop());
  }

  private startPulse(ctx: AudioContext, freq: number, vol: number, seconds: number, type: OscillatorType): void {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = vol;
    lfo.frequency.value = 1 / seconds;
    lfoGain.gain.value = vol * 0.8;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    osc.connect(gain);
    gain.connect(this.ambienceGain!);
    osc.start();
    lfo.start();
    this.ambienceStops.push(() => {
      osc.stop();
      lfo.stop();
    });
  }
}

export const audioEngine = new AudioEngine();
