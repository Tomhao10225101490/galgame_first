import { Howl, Howler } from 'howler';
import type { BackgroundId, BgmId } from '../engine/types';
import { BGM_ASSETS, SE_ASSETS, type SeId } from '../data/assets';

class AudioEngine {
  private bgmHowl: Howl | null = null;
  private currentBgm: BgmId | null = null;
  private seCache = new Map<SeId, Howl>();
  private volume = 0.5;
  private muted = false;
  private unlocked = false;

  ensureStarted(): void {
    if (Howler.ctx?.state === 'suspended') {
      void Howler.ctx.resume();
    }
    this.unlocked = true;
  }

  setVolume(v: number): void {
    this.volume = v;
    Howler.volume(this.muted ? 0 : v);
    this.bgmHowl?.volume(this.muted ? 0 : v);
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    Howler.mute(muted);
    this.bgmHowl?.volume(muted ? 0 : this.volume);
  }

  playBgm(id: BgmId): void {
    this.ensureStarted();
    if (id === 'none') {
      this.stopBgm();
      return;
    }
    if (id === this.currentBgm && this.bgmHowl?.playing()) return;

    const previous = this.bgmHowl;
    const next = new Howl({
      src: [BGM_ASSETS[id]],
      html5: true,
      loop: true,
      preload: true,
      volume: 0,
      onplayerror: () => {
        next.once('unlock', () => next.play());
      },
      onloaderror: () => {
        if (this.currentBgm === id) this.currentBgm = null;
      },
    });

    this.currentBgm = id;
    this.bgmHowl = next;

    const fadeIn = () => {
      if (this.bgmHowl !== next || this.currentBgm !== id) return;
      next.fade(next.volume(), this.muted ? 0 : this.volume, 1500);
    };

    next.once('play', fadeIn);
    next.play();
    window.setTimeout(fadeIn, 350);

    if (previous) {
      previous.fade(previous.volume(), 0, 1200);
      window.setTimeout(() => previous.stop(), 1300);
    }
  }

  stopBgm(): void {
    if (this.bgmHowl) {
      const old = this.bgmHowl;
      old.fade(old.volume(), 0, 800);
      window.setTimeout(() => old.stop(), 850);
    }
    this.bgmHowl = null;
    this.currentBgm = null;
  }

  playSe(id: SeId): void {
    this.ensureStarted();
    if (this.muted) return;
    this.getSe(id).play();
  }

  // Kept for scene-driven callers; BGM files already include ambience where needed.
  playAmbience(_background: BackgroundId): void {
    if (!this.unlocked) return;
  }

  private getSe(id: SeId): Howl {
    let howl = this.seCache.get(id);
    if (!howl) {
      howl = new Howl({
        src: [SE_ASSETS[id]],
        preload: true,
        volume: 0.65,
      });
      this.seCache.set(id, howl);
    }
    return howl;
  }
}

export const audioEngine = new AudioEngine();
