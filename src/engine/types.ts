export type BackgroundId =
  | 'convenience_night'
  | 'convenience_day'
  | 'classroom_sunset'
  | 'planetarium_old'
  | 'rooftop_stars'
  | 'station_morning'
  | 'rain_street'
  | 'underground_machine'
  | 'school_hallway'
  | 'home_evening'
  | 'beach_dusk'
  | 'title_sky';

export type CharacterId =
  | 'linche'
  | 'weiyang'
  | 'zhixia'
  | 'baichuan'
  | 'linmu'
  | 'zhouyuan';

export type RouteId = 'common' | 'weiyang' | 'zhixia' | 'baichuan' | 'true' | null;

export type EndingId =
  | 'ending_weiyang_good'
  | 'ending_weiyang_bad'
  | 'ending_zhixia_good'
  | 'ending_zhixia_bad'
  | 'ending_baichuan_good'
  | 'ending_baichuan_bad'
  | 'ending_true';

export type ExpressionId =
  | 'neutral'
  | 'smile'
  | 'sad'
  | 'surprised'
  | 'serious'
  | 'gentle';

export interface AffectionScores {
  weiyang: number;
  zhixia: number;
  baichuan: number;
}

export interface AttitudeScores {
  face: number;
  escape: number;
}

export interface GameVariables {
  affection: AffectionScores;
  attitude: AttitudeScores;
  flags: Record<string, boolean>;
  route: RouteId;
  chapter: number;
}

export interface VariableChanges {
  affection?: Partial<AffectionScores>;
  attitude?: Partial<AttitudeScores>;
  flags?: Record<string, boolean>;
  route?: RouteId;
  chapter?: number;
}

export interface ChoiceOption {
  text: string;
  next: string;
  changes?: VariableChanges;
  condition?: BranchCondition;
}

export interface BranchCondition {
  minAffection?: Partial<AffectionScores>;
  maxEscape?: number;
  minFace?: number;
  flag?: string;
  unlockedEndings?: EndingId[];
  route?: RouteId;
}

export interface HistoryEntry {
  nodeId: string;
  speaker: CharacterId | null;
  speakerName?: string;
  text: string;
  timestamp: number;
}

export interface VisibleCharacter {
  id: CharacterId;
  expression: ExpressionId;
  position: 'left' | 'center' | 'right';
}

export type StoryNode =
  | { id: string; type: 'narration'; text: string; next: string }
  | { id: string; type: 'dialogue'; speaker: CharacterId | null; text: string; next: string; expression?: ExpressionId }
  | { id: string; type: 'background'; bg: BackgroundId; next: string; bgm?: BgmId }
  | { id: string; type: 'show'; character: CharacterId; expression?: ExpressionId; position?: 'left' | 'center' | 'right'; next: string }
  | { id: string; type: 'hide'; character: CharacterId; next: string }
  | { id: string; type: 'effect'; changes: VariableChanges; next: string }
  | { id: string; type: 'choice'; choices: ChoiceOption[] }
  | { id: string; type: 'branch'; conditions: { condition: BranchCondition; next: string }[]; fallback: string }
  | { id: string; type: 'ending'; endingId: EndingId; title: string; texts: string[] };

export type BgmId = 'night' | 'rain' | 'stars' | 'tension' | 'ending' | 'day' | 'none';

export interface DisplayLine {
  nodeId: string;
  speaker: CharacterId | null;
  speakerName: string;
  text: string;
  isNarration: boolean;
}

export interface GameSnapshot {
  nodeId: string;
  variables: GameVariables;
  background: BackgroundId;
  bgm: BgmId;
  visibleCharacters: VisibleCharacter[];
  readNodes: string[];
  history: HistoryEntry[];
  chapterLabel: string;
}

export interface GameSettings {
  textSpeed: number;
  autoDelay: number;
  volume: number;
  muted: boolean;
  showSprites: boolean;
}

export interface SaveSlot {
  slot: number;
  timestamp: number;
  snapshot: GameSnapshot;
  chapterLabel: string;
  previewText: string;
}

export type AppScreen =
  | 'mainMenu'
  | 'playing'
  | 'saveLoad'
  | 'settings'
  | 'endings';

export interface EndingMeta {
  id: EndingId;
  title: string;
  summary: string;
  route: string;
}

export const DEFAULT_VARIABLES: GameVariables = {
  affection: { weiyang: 0, zhixia: 0, baichuan: 0 },
  attitude: { face: 0, escape: 0 },
  flags: {},
  route: 'common',
  chapter: 1,
};

export const DEFAULT_SETTINGS: GameSettings = {
  textSpeed: 40,
  autoDelay: 2500,
  volume: 0.5,
  muted: false,
  showSprites: true,
};

export const START_NODE_ID = 'start';
