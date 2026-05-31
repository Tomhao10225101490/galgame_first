import type { EndingId, EndingMeta, GameSettings, GameSnapshot, SaveSlot } from '../engine/types';
import { DEFAULT_SETTINGS } from '../engine/types';

const KEYS = {
  saves: 'startrail_saves',
  settings: 'startrail_settings',
  endings: 'startrail_endings',
  continue: 'startrail_continue',
} as const;

export const ENDING_LIST: EndingMeta[] = [
  {
    id: 'ending_weiyang_good',
    title: '星轨仍在',
    summary: '林澈与未央认真告别，约定不把未来说死。多年后，星空照片跨越距离而来。',
    route: '星野未央线',
  },
  {
    id: 'ending_weiyang_bad',
    title: '错过的光',
    summary: '逃避的表达让未央独自离开。拆除后的空地上，只留下一张没送出的照片。',
    route: '星野未央线',
  },
  {
    id: 'ending_zhixia_good',
    title: '开往远方的车票',
    summary: '知夏终于做出自己的选择。车站里，她说选择题最难的是不敢选。',
    route: '沈知夏线',
  },
  {
    id: 'ending_zhixia_bad',
    title: '标准答案',
    summary: '妥协留下后，知夏变得疏远。偶遇时，像两个提前老去的人。',
    route: '沈知夏线',
  },
  {
    id: 'ending_baichuan_good',
    title: '第八天的名字',
    summary: '白川音以普通转学生的身份重新出现。林澈再次说：欢迎来到凌川。',
    route: '白川音线',
  },
  {
    id: 'ending_baichuan_bad',
    title: '无人认领的汽水',
    summary: '如果只把她当作谜题，她会彻底消失。冰柜里只剩一瓶没有标签的汽水。',
    route: '白川音线',
  },
  {
    id: 'ending_true',
    title: '星轨便利店',
    summary: '所有人认真告别。几年后，旧便利店的位置变成小书店，挂着改制的木牌。',
    route: '隐藏真结局',
  },
];

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadSettings(): GameSettings {
  return { ...DEFAULT_SETTINGS, ...readJson(KEYS.settings, {}) };
}

export function saveSettings(settings: GameSettings): void {
  writeJson(KEYS.settings, settings);
}

export function loadSaves(): SaveSlot[] {
  const saves = readJson<SaveSlot[]>(KEYS.saves, []);
  return Array.from({ length: 6 }, (_, i) => {
    const existing = saves.find((s) => s.slot === i);
    return existing ?? { slot: i, timestamp: 0, snapshot: null as unknown as GameSnapshot, chapterLabel: '', previewText: '' };
  });
}

export function saveToSlot(slot: number, snapshot: GameSnapshot, previewText: string): void {
  const saves = loadSaves();
  const entry: SaveSlot = {
    slot,
    timestamp: Date.now(),
    snapshot,
    chapterLabel: snapshot.chapterLabel,
    previewText,
  };
  const idx = saves.findIndex((s) => s.slot === slot);
  if (idx >= 0) saves[idx] = entry;
  else saves.push(entry);
  writeJson(KEYS.saves, saves.sort((a, b) => a.slot - b.slot));
}

export function loadFromSlot(slot: number): SaveSlot | null {
  const saves = loadSaves();
  const entry = saves.find((s) => s.slot === slot);
  return entry && entry.timestamp > 0 ? entry : null;
}

export function saveContinue(snapshot: GameSnapshot, previewText: string): void {
  writeJson(KEYS.continue, { snapshot, previewText, timestamp: Date.now() });
}

export function loadContinue(): { snapshot: GameSnapshot; previewText: string } | null {
  const data = readJson<{ snapshot: GameSnapshot; previewText: string; timestamp: number } | null>(KEYS.continue, null);
  return data?.snapshot ? { snapshot: data.snapshot, previewText: data.previewText } : null;
}

export function hasContinue(): boolean {
  return loadContinue() !== null;
}

export function loadUnlockedEndings(): EndingId[] {
  return readJson<EndingId[]>(KEYS.endings, []);
}

export function unlockEnding(id: EndingId): EndingId[] {
  const current = loadUnlockedEndings();
  if (!current.includes(id)) {
    const next = [...current, id];
    writeJson(KEYS.endings, next);
    return next;
  }
  return current;
}

export function hasAllGoodEndings(): boolean {
  const endings = loadUnlockedEndings();
  const good: EndingId[] = ['ending_weiyang_good', 'ending_zhixia_good', 'ending_baichuan_good'];
  return good.every((id) => endings.includes(id));
}
