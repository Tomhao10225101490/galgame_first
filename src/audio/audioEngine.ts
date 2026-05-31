import type { BgmId } from '../engine/types';

type SeId = 'click' | 'choice' | 'save' | 'pageTurn';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private bgmNodes: OscillatorNode[] = [];
  private bgmInterval: number | null = null;
  private currentBgm: BgmId | null = null;
  private volume = 0.5;
  private muted = false;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
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
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(this.masterGain!);

    const now = ctx.currentTime;
    switch (id) {
      case 'click':
        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      case 'choice':
        osc.frequency.value = 520;
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
        break;
      case 'save':
        osc.type = 'triangle';
        osc.frequency.value = 660;
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      case 'pageTurn':
        osc.type = 'sine';
        osc.frequency.value = 400;
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
    }
  }

  stopBgm(): void {
    for (const node of this.bgmNodes) {
      try {
        node.stop();
      } catch {
        /* already stopped */
      }
    }
    this.bgmNodes = [];
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.currentBgm = null;
  }

  playBgm(id: BgmId): void {
    if (id === 'none' || id === this.currentBgm) return;
    this.stopBgm();
    this.currentBgm = id;
    const ctx = this.ensureContext();

    switch (id) {
      case 'night':
        this.playPad(ctx, [110, 164.81, 220], 0.04);
        break;
      case 'day':
        this.playPad(ctx, [196, 246.94, 293.66], 0.035);
        break;
      case 'rain':
        this.playRain(ctx);
        break;
      case 'stars':
        this.playPad(ctx, [329.63, 392, 493.88], 0.03);
        this.playShimmer(ctx);
        break;
      case 'tension':
        this.playPad(ctx, [82.41, 87.31, 92.5], 0.05);
        break;
      case 'ending':
        this.playPad(ctx, [261.63, 329.63, 392, 493.88], 0.045);
        break;
    }
  }

  private playPad(ctx: AudioContext, freqs: number[], vol: number): void {
    for (const freq of freqs) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = vol;
      osc.connect(gain);
      gain.connect(this.bgmGain!);
      osc.start();
      this.bgmNodes.push(osc);
    }
  }

  private playShimmer(ctx: AudioContext): void {
    this.bgmInterval = window.setInterval(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 800 + Math.random() * 400;
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.1);
      gain.gain.linearRampToValueAtTime(0, now + 0.5);
      osc.connect(gain);
      gain.connect(this.bgmGain!);
      osc.start(now);
      osc.stop(now + 0.6);
    }, 800);
  }

  private playRain(ctx: AudioContext): void {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    const gain = ctx.createGain();
    gain.gain.value = 0.08;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGain!);
    source.start();
    this.bgmNodes.push(source as unknown as OscillatorNode);
  }
}

export const audioEngine = new AudioEngine();
