export interface PreloadProgress {
  loaded: number;
  total: number;
  percent: number;
}

function loadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

function loadAudio(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.oncanplaythrough = () => resolve();
    audio.onerror = () => reject(new Error(`Failed to load audio: ${url}`));
    audio.preload = 'auto';
    audio.src = url;
    audio.load();
  });
}

export async function preloadUrls(
  urls: string[],
  onProgress?: (p: PreloadProgress) => void,
): Promise<void> {
  const unique = [...new Set(urls)];
  let loaded = 0;
  const total = unique.length;

  const tick = () => {
    onProgress?.({
      loaded,
      total,
      percent: total === 0 ? 100 : Math.round((loaded / total) * 100),
    });
  };

  tick();

  await Promise.all(
    unique.map(async (url) => {
      try {
        if (url.match(/\.(mp3|ogg|wav)$/i)) {
          await loadAudio(url);
        } else {
          await loadImage(url);
        }
      } catch {
        // Allow missing assets during dev; game falls back to CSS/SVG
      } finally {
        loaded++;
        tick();
      }
    }),
  );
}


const CHAPTER_BACKGROUNDS: Record<number, string[]> = {
  1: ['/assets/backgrounds/convenience_night.webp'],
  2: ['/assets/backgrounds/classroom_sunset.webp', '/assets/backgrounds/school_hallway.webp'],
  3: ['/assets/backgrounds/rain_street.webp', '/assets/backgrounds/planetarium_old.webp'],
  4: ['/assets/backgrounds/school_hallway.webp'],
  5: ['/assets/backgrounds/convenience_day.webp'],
  6: ['/assets/backgrounds/rooftop_stars.webp', '/assets/backgrounds/planetarium_old.webp'],
};

export function getChapterPreloadUrls(chapter: number): string[] {
  return CHAPTER_BACKGROUNDS[chapter] ?? [];
}

export function preloadChapter(chapter: number): void {
  const urls = getChapterPreloadUrls(chapter);
  void Promise.all(urls.map((u) => loadImage(u).catch(() => undefined)));
}
