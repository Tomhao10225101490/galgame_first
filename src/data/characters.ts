import type { CharacterId, ExpressionId } from '../engine/types';

export interface CharacterDef {
  id: CharacterId;
  name: string;
  color: string;
  accentColor: string;
  description: string;
  hairStyle: 'short' | 'long_side' | 'ponytail' | 'hood' | 'messy' | 'bob';
  outfit: 'uniform' | 'hoodie' | 'apron' | 'sport' | 'casual';
}

export const CHARACTERS: Record<CharacterId, CharacterDef> = {
  linche: {
    id: 'linche',
    name: '林澈',
    color: '#4a90d9',
    accentColor: '#2d5a8a',
    description: '高三毕业生，嘴上轻松，内心细腻',
    hairStyle: 'short',
    outfit: 'uniform',
  },
  weiyang: {
    id: 'weiyang',
    name: '星野未央',
    color: '#7b6ba8',
    accentColor: '#4a3d6b',
    description: '天文社前社长，安静克制',
    hairStyle: 'long_side',
    outfit: 'casual',
  },
  zhixia: {
    id: 'zhixia',
    name: '沈知夏',
    color: '#c45c5c',
    accentColor: '#8a3a3a',
    description: '同班同学，理性直接',
    hairStyle: 'ponytail',
    outfit: 'uniform',
  },
  baichuan: {
    id: 'baichuan',
    name: '白川音',
    color: '#e8e8f0',
    accentColor: '#a0a0b8',
    description: '转学生，轻快神秘',
    hairStyle: 'hood',
    outfit: 'hoodie',
  },
  linmu: {
    id: 'linmu',
    name: '林母',
    color: '#a08060',
    accentColor: '#6b5040',
    description: '便利店老板，温柔疲惫',
    hairStyle: 'bob',
    outfit: 'apron',
  },
  zhouyuan: {
    id: 'zhouyuan',
    name: '周远',
    color: '#5a9a6e',
    accentColor: '#3a6648',
    description: '林澈好友，嘴欠热心',
    hairStyle: 'messy',
    outfit: 'sport',
  },
};

export const CHARACTER_NAMES: Record<CharacterId, string> = Object.fromEntries(
  Object.values(CHARACTERS).map((c) => [c.id, c.name]),
) as Record<CharacterId, string>;

export const EXPRESSION_LABELS: Record<ExpressionId, string> = {
  neutral: '',
  smile: '☺',
  sad: '…',
  surprised: '!',
  serious: '—',
  gentle: '♪',
};
