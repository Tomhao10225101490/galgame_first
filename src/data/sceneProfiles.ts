import type { BackgroundId } from '../engine/types';

export type SceneVfx = 'stars' | 'rain' | 'dust' | 'sunset' | 'machine' | 'station' | 'ocean' | 'store';

export interface SceneProfile {
  title: string;
  subtitle: string;
  vfx: SceneVfx[];
  temperature: 'cool' | 'warm' | 'neutral';
  depth: 'quiet' | 'dramatic' | 'wide';
}

export const SCENE_PROFILES: Record<BackgroundId, SceneProfile> = {
  convenience_night: {
    title: '星轨便利店',
    subtitle: '23:47 / 冰柜低鸣',
    vfx: ['store', 'stars', 'dust'],
    temperature: 'cool',
    depth: 'quiet',
  },
  convenience_day: {
    title: '星轨便利店',
    subtitle: '午后 / 玻璃门风铃',
    vfx: ['store', 'dust', 'sunset'],
    temperature: 'warm',
    depth: 'wide',
  },
  classroom_sunset: {
    title: '凌川高中',
    subtitle: '黄昏 / 粉笔灰与蝉声',
    vfx: ['sunset', 'dust'],
    temperature: 'warm',
    depth: 'dramatic',
  },
  planetarium_old: {
    title: '旧天文馆',
    subtitle: '封存区 / 坏掉的星图',
    vfx: ['stars', 'dust', 'machine'],
    temperature: 'cool',
    depth: 'dramatic',
  },
  rooftop_stars: {
    title: '教学楼天台',
    subtitle: '夜空 / 第七条星轨',
    vfx: ['stars'],
    temperature: 'cool',
    depth: 'wide',
  },
  station_morning: {
    title: '凌川车站',
    subtitle: '清晨 / 第一班慢车',
    vfx: ['station', 'dust'],
    temperature: 'neutral',
    depth: 'wide',
  },
  rain_street: {
    title: '雨中的商店街',
    subtitle: '回忆 / 路灯与积水',
    vfx: ['rain'],
    temperature: 'cool',
    depth: 'dramatic',
  },
  underground_machine: {
    title: '地下星象仪',
    subtitle: '警告 / 未授权启动',
    vfx: ['machine', 'stars'],
    temperature: 'cool',
    depth: 'dramatic',
  },
  school_hallway: {
    title: '旧校舍走廊',
    subtitle: '放学后 / 回声很长',
    vfx: ['dust', 'sunset'],
    temperature: 'neutral',
    depth: 'wide',
  },
  home_evening: {
    title: '林家客厅',
    subtitle: '晚饭前 / 没说出口的话',
    vfx: ['sunset', 'dust'],
    temperature: 'warm',
    depth: 'quiet',
  },
  beach_dusk: {
    title: '凌川海岸',
    subtitle: '薄暮 / 潮声很近',
    vfx: ['ocean', 'sunset'],
    temperature: 'warm',
    depth: 'wide',
  },
  title_sky: {
    title: '星轨便利店',
    subtitle: '点击开始 / 凌川夏日终章',
    vfx: ['stars', 'dust'],
    temperature: 'cool',
    depth: 'wide',
  },
};
