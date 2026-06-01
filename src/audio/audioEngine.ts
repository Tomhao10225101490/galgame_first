import { Howl, Howler } from 'howler';
import type { BgmId } from '../engine/types';
import { BGM_ASSETS, SE_ASSETS, type SeId } from '../data/assets';

class AudioEngine {
  private bgmHowl: Howl | null = null;
  private currentBgm: BgmId | null = null;
  private volume = 0.5;
  private muted = false;
  private seCache = new Map<SeId, Howl>();
  private unlocked = false;

  ensureStarted(): void {
    if (this.unlocked) return;
    if (Howler.ctx?.state === 'suspended') {
      void Howler.ctx.resume();
    }
    this.unlocked = true;
  }

  setVolume(v: number): void {
    this.volume = v;
    Howler.volume(this.muted ? 0 : v);
    if (this.bgmHowl) {
      this.bgmHowl.volume(v);
    }
  }

  setMuted(m: boolean): void {
    this.muted = m;
    Howler.mute(m);
  }

  private getSe(id: SeId): Howl {
    let howl = this.seCache.get(id);
    if (!howl) {
      howl = new Howl({
        src: [SE_ASSETS[id]],
        volume: 0.6,
        preload: true,
      });
      this.seCache.set(id, howl);
    }
    return howl;
  }

  playSe(id: SeId): void {
    this.ensureStarted();
    if (this.muted) return;
    this.getSe(id).play();
  }

  stopBgm(): void {
    if (this.bgmHowl) {
      const old = this.bgmHowl;
      old.fade(old.volume(), 0, 800);
      setTimeout(() => old.stop(), 850);
      this.bgmHowl = null;
    }
    this.currentBgm = null;
  }

  playBgm(id: BgmId): void {
    this.ensureStarted();
    if (id === 'none') {
      this.stopBgm();
      return;
    }
    if (id === this.currentBgm && this.bgmHowl?.playing()) return;

    const src = BGM_ASSETS[id];
    const prev = this.bgmHowl;
    this.currentBgm = id;

    const next = new Howl({
      src: [src],
      loop: true,
      volume: 0,
      html5: true,
      onloaderror: () => {
        if (this.currentBgm === id) this.currentBgm = null;
      },
    });

    next.once('play', () => {
      next.fade(0, this.muted ? 0 : this.volume, 1500);
    });

    this.bgmHowl = next;
    next.play();

    if (prev) {
      prev.fade(prev.volume(), 0, 1500);
      setTimeout(() => prev.stop(), 1600);
    }
  }
}

export const audioEngine = new AudioEngine();
