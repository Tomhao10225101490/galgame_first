import type { BackgroundId, BgmId, CharacterId, ExpressionId } from '../engine/types';

const ASSET_BASE = '/assets';

export const BACKGROUND_ASSETS: Record<BackgroundId, string> = {
  convenience_night: `${ASSET_BASE}/backgrounds/convenience_night.webp`,
  convenience_day: `${ASSET_BASE}/backgrounds/convenience_day.webp`,
  classroom_sunset: `${ASSET_BASE}/backgrounds/classroom_sunset.webp`,
  planetarium_old: `${ASSET_BASE}/backgrounds/planetarium_old.webp`,
  rooftop_stars: `${ASSET_BASE}/backgrounds/rooftop_stars.webp`,
  station_morning: `${ASSET_BASE}/backgrounds/station_morning.webp`,
  rain_street: `${ASSET_BASE}/backgrounds/rain_street.webp`,
  underground_machine: `${ASSET_BASE}/backgrounds/underground_machine.webp`,
  school_hallway: `${ASSET_BASE}/backgrounds/school_hallway.webp`,
  home_evening: `${ASSET_BASE}/backgrounds/home_evening.webp`,
  beach_dusk: `${ASSET_BASE}/backgrounds/beach_dusk.webp`,
  title_sky: `${ASSET_BASE}/backgrounds/title_sky.webp`,
};

export const BGM_ASSETS: Record<Exclude<BgmId, 'none'>, string> = {
  night: `${ASSET_BASE}/bgm/night.mp3`,
  day: `${ASSET_BASE}/bgm/day.mp3`,
  rain: `${ASSET_BASE}/bgm/rain.mp3`,
  stars: `${ASSET_BASE}/bgm/stars.mp3`,
  tension: `${ASSET_BASE}/bgm/tension.mp3`,
  ending: `${ASSET_BASE}/bgm/ending.mp3`,
};

export type SeId = 'click' | 'choice' | 'save' | 'pageTurn';

export const SE_ASSETS: Record<SeId, string> = {
  click: `${ASSET_BASE}/se/click.mp3`,
  choice: `${ASSET_BASE}/se/choice.mp3`,
  save: `${ASSET_BASE}/se/save.mp3`,
  pageTurn: `${ASSET_BASE}/se/pageTurn.mp3`,
};

export const UI_ASSETS = {
  keyvisual: `${ASSET_BASE}/ui/keyvisual.webp`,
};

const EXPRESSIONS: ExpressionId[] = ['neutral', 'smile', 'sad', 'surprised', 'serious', 'gentle'];

/** Characters that appear in show nodes (no linche) */
export const SPRITE_CHARACTERS: CharacterId[] = ['weiyang', 'zhixia', 'baichuan', 'linmu', 'zhouyuan'];

export function getSpritePath(character: CharacterId, expression: ExpressionId): string {
  return `${ASSET_BASE}/sprites/${character}/${expression}.webp`;
}

export function getSpriteUrl(character: CharacterId, expression: ExpressionId): string {
  return getSpritePath(character, expression);
}

export function getAllSpriteUrls(): string[] {
  return SPRITE_CHARACTERS.flatMap((c) => EXPRESSIONS.map((e) => getSpritePath(c, e)));
}

export function getAllBackgroundUrls(): string[] {
  return Object.values(BACKGROUND_ASSETS);
}

export function getAllBgmUrls(): string[] {
  return Object.values(BGM_ASSETS);
}

export const CRITICAL_PRELOAD_URLS = [
  UI_ASSETS.keyvisual,
  BACKGROUND_ASSETS.title_sky,
  BACKGROUND_ASSETS.convenience_night,
  ...SPRITE_CHARACTERS.map((c) => getSpritePath(c, 'neutral')),
];
