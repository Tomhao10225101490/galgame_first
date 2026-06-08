import { BACKGROUND_ASSETS, getSpritePath, SPRITE_CHARACTERS } from '../data/assets';
import { STORY_NODES } from '../data/story';

export interface PreloadProgress {
  loaded: number;
  total: number;
  percent: number;
  currentUrl?: string;
}

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

function preloadAudio(url: string): Promise<void> {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.onloadedmetadata = () => resolve();
    audio.onerror = () => resolve();
    audio.src = url;
  });
}

export async function preloadUrls(urls: string[], onProgress?: (progress: PreloadProgress) => void): Promise<void> {
  const uniqueUrls = [...new Set(urls)];
  let loaded = 0;
  const total = uniqueUrls.length || 1;

  onProgress?.({ loaded, total, percent: 0 });

  await Promise.all(
    uniqueUrls.map(async (url) => {
      if (/\.(mp3|ogg|wav)$/i.test(url)) {
        await preloadAudio(url);
      } else {
        await preloadImage(url);
      }
      loaded += 1;
      onProgress?.({ loaded, total, percent: Math.round((loaded / total) * 100), currentUrl: url });
    }),
  );
}

export function getChapterAssetUrls(chapter: number): string[] {
  const urls = new Set<string>();
  const chapterNodes = STORY_NODES.filter((node) => {
    if (node.type === 'effect' && node.changes.chapter === chapter) return true;
    return node.id.includes(`ch${chapter}_`) || node.id === `ch${chapter}_start`;
  });

  for (const node of chapterNodes) {
    if (node.type === 'background') urls.add(BACKGROUND_ASSETS[node.bg]);
    if (node.type === 'show' && SPRITE_CHARACTERS.includes(node.character)) {
      urls.add(getSpritePath(node.character, node.expression ?? 'neutral'));
    }
  }

  return [...urls];
}

export function preloadChapter(chapter: number): Promise<void> {
  return preloadUrls(getChapterAssetUrls(chapter));
}
