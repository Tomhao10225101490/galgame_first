import type {
  BackgroundId,
  BgmId,
  BranchCondition,
  DisplayLine,
  EndingId,
  ExpressionId,
  GameSnapshot,
  GameVariables,
  HistoryEntry,
  StoryNode,
  VariableChanges,
  VisibleCharacter,
} from './types';
import { DEFAULT_VARIABLES, START_NODE_ID } from './types';

function applyChanges(vars: GameVariables, changes: VariableChanges): GameVariables {
  const next: GameVariables = {
    ...vars,
    affection: { ...vars.affection },
    attitude: { ...vars.attitude },
    flags: { ...vars.flags },
  };

  if (changes.affection) {
    for (const [key, value] of Object.entries(changes.affection)) {
      const k = key as keyof typeof next.affection;
      if (value !== undefined) next.affection[k] += value;
    }
  }
  if (changes.attitude) {
    for (const [key, value] of Object.entries(changes.attitude)) {
      const k = key as keyof typeof next.attitude;
      if (value !== undefined) next.attitude[k] += value;
    }
  }
  if (changes.flags) {
    next.flags = { ...next.flags, ...changes.flags };
  }
  if (changes.route !== undefined) next.route = changes.route;
  if (changes.chapter !== undefined) next.chapter = changes.chapter;

  return next;
}

function checkCondition(vars: GameVariables, condition: BranchCondition, unlockedEndings: EndingId[]): boolean {
  if (condition.minAffection) {
    for (const [key, min] of Object.entries(condition.minAffection)) {
      const k = key as keyof typeof vars.affection;
      if (min !== undefined && vars.affection[k] < min) return false;
    }
  }
  if (condition.maxEscape !== undefined && vars.attitude.escape > condition.maxEscape) return false;
  if (condition.minFace !== undefined && vars.attitude.face < condition.minFace) return false;
  if (condition.flag && !vars.flags[condition.flag]) return false;
  if (condition.route && vars.route !== condition.route) return false;
  if (condition.unlockedEndings) {
    for (const id of condition.unlockedEndings) {
      if (!unlockedEndings.includes(id)) return false;
    }
  }
  return true;
}

export interface EngineState {
  nodeId: string;
  variables: GameVariables;
  background: BackgroundId;
  bgm: BgmId;
  visibleCharacters: VisibleCharacter[];
  readNodes: Set<string>;
  history: HistoryEntry[];
  currentLine: DisplayLine | null;
  choices: { text: string; index: number }[] | null;
  isWaitingForInput: boolean;
  isEnding: boolean;
  endingId: EndingId | null;
  endingTitle: string;
  endingTexts: string[];
  chapterLabel: string;
}

export class VisualNovelEngine {
  private nodes: Map<string, StoryNode>;
  private characterNames: Map<string, string>;
  private onEnding?: (id: EndingId) => void;
  private unlockedEndings: EndingId[];

  state: EngineState;

  constructor(
    nodes: StoryNode[],
    characterNames: Record<string, string>,
    unlockedEndings: EndingId[] = [],
    onEnding?: (id: EndingId) => void,
  ) {
    this.nodes = new Map(nodes.map((n) => [n.id, n]));
    this.characterNames = new Map(Object.entries(characterNames));
    this.unlockedEndings = unlockedEndings;
    this.onEnding = onEnding;
    this.state = this.createInitialState();
  }

  private createInitialState(): EngineState {
    return {
      nodeId: START_NODE_ID,
      variables: structuredClone(DEFAULT_VARIABLES),
      background: 'title_sky',
      bgm: 'none',
      visibleCharacters: [],
      readNodes: new Set(),
      history: [],
      currentLine: null,
      choices: null,
      isWaitingForInput: false,
      isEnding: false,
      endingId: null,
      endingTitle: '',
      endingTexts: [],
      chapterLabel: '序章',
    };
  }

  loadSnapshot(snapshot: GameSnapshot): void {
    this.state = {
      nodeId: snapshot.nodeId,
      variables: structuredClone(snapshot.variables),
      background: snapshot.background,
      bgm: snapshot.bgm,
      visibleCharacters: [...snapshot.visibleCharacters],
      readNodes: new Set(snapshot.readNodes),
      history: [...snapshot.history],
      currentLine: null,
      choices: null,
      isWaitingForInput: false,
      isEnding: false,
      endingId: null,
      endingTitle: '',
      endingTexts: [],
      chapterLabel: snapshot.chapterLabel,
    };
    this.processUntilInteractive(false);
  }

  getSnapshot(): GameSnapshot {
    return {
      nodeId: this.state.nodeId,
      variables: structuredClone(this.state.variables),
      background: this.state.background,
      bgm: this.state.bgm,
      visibleCharacters: [...this.state.visibleCharacters],
      readNodes: [...this.state.readNodes],
      history: [...this.state.history],
      chapterLabel: this.state.chapterLabel,
    };
  }

  reset(): void {
    this.state = this.createInitialState();
    this.processUntilInteractive(false);
  }

  setUnlockedEndings(endings: EndingId[]): void {
    this.unlockedEndings = endings;
  }

  canSkip(nodeId: string): boolean {
    return this.state.readNodes.has(nodeId);
  }

  isNodeRead(nodeId: string): boolean {
    return this.state.readNodes.has(nodeId);
  }

  markCurrentRead(): void {
    if (this.state.currentLine) {
      this.state.readNodes.add(this.state.currentLine.nodeId);
    }
  }

  private getNode(id: string): StoryNode {
    const node = this.nodes.get(id);
    if (!node) throw new Error(`Story node not found: ${id}`);
    return node;
  }

  private getSpeakerName(speaker: string | null): string {
    if (!speaker) return '';
    return this.characterNames.get(speaker) ?? speaker;
  }

  private updateVisibleCharacter(
    character: string,
    expression: ExpressionId = 'neutral',
    position: 'left' | 'center' | 'right' = 'center',
  ): void {
    const idx = this.state.visibleCharacters.findIndex((c) => c.id === character);
    const entry: VisibleCharacter = {
      id: character as VisibleCharacter['id'],
      expression,
      position,
    };
    if (idx >= 0) {
      this.state.visibleCharacters[idx] = entry;
    } else {
      this.state.visibleCharacters.push(entry);
    }
  }

  private removeVisibleCharacter(character: string): void {
    this.state.visibleCharacters = this.state.visibleCharacters.filter((c) => c.id !== character);
  }

  private addHistory(nodeId: string, speaker: string | null, text: string): void {
    this.state.history.push({
      nodeId,
      speaker: speaker as HistoryEntry['speaker'],
      speakerName: this.getSpeakerName(speaker),
      text,
      timestamp: Date.now(),
    });
  }

  private resolveBranch(node: Extract<StoryNode, { type: 'branch' }>): string {
    for (const { condition, next } of node.conditions) {
      if (checkCondition(this.state.variables, condition, this.unlockedEndings)) {
        return next;
      }
    }
    return node.fallback;
  }

  private processNode(nodeId: string): void {
    this.state.nodeId = nodeId;
    const node = this.getNode(nodeId);

    switch (node.type) {
      case 'background':
        this.state.background = node.bg;
        if (node.bgm) this.state.bgm = node.bgm;
        this.processNode(node.next);
        break;

      case 'show':
        this.updateVisibleCharacter(node.character, node.expression ?? 'neutral', node.position ?? 'center');
        this.processNode(node.next);
        break;

      case 'hide':
        this.removeVisibleCharacter(node.character);
        this.processNode(node.next);
        break;

      case 'effect':
        this.state.variables = applyChanges(this.state.variables, node.changes);
        if (node.changes.chapter) {
          this.state.chapterLabel = `第${node.changes.chapter}章`;
        }
        this.processNode(node.next);
        break;

      case 'branch': {
        const nextId = this.resolveBranch(node);
        this.processNode(nextId);
        break;
      }

      case 'choice':
        this.state.currentLine = null;
        this.state.choices = node.choices
          .map((c, index) => ({ ...c, index }))
          .filter((c) => !c.condition || checkCondition(this.state.variables, c.condition, this.unlockedEndings))
          .map((c) => ({ text: c.text, index: c.index }));
        this.state.isWaitingForInput = true;
        break;

      case 'ending':
        this.state.isEnding = true;
        this.state.endingId = node.endingId;
        this.state.endingTitle = node.title;
        this.state.endingTexts = node.texts;
        this.state.currentLine = {
          nodeId: node.id,
          speaker: null,
          speakerName: node.title,
          text: node.texts[0] ?? '',
          isNarration: true,
        };
        this.state.isWaitingForInput = true;
        this.onEnding?.(node.endingId);
        break;

      case 'narration':
        this.state.currentLine = {
          nodeId: node.id,
          speaker: null,
          speakerName: '',
          text: node.text,
          isNarration: true,
        };
        this.addHistory(node.id, null, node.text);
        this.state.choices = null;
        this.state.isWaitingForInput = true;
        break;

      case 'dialogue': {
        if (node.expression) {
          this.updateVisibleCharacter(node.speaker!, node.expression);
        }
        this.state.currentLine = {
          nodeId: node.id,
          speaker: node.speaker,
          speakerName: this.getSpeakerName(node.speaker),
          text: node.text,
          isNarration: false,
        };
        this.addHistory(node.id, node.speaker, node.text);
        this.state.choices = null;
        this.state.isWaitingForInput = true;
        break;
      }
    }
  }

  processUntilInteractive(skipUnread: boolean): void {
    this.state.isWaitingForInput = false;
    this.state.choices = null;

    let safety = 0;
    while (safety < 50) {
      safety++;
      const node = this.getNode(this.state.nodeId);

      if (node.type === 'narration' || node.type === 'dialogue') {
        if (skipUnread && !this.canSkip(node.id)) {
          this.processNode(node.id);
          return;
        }
        this.processNode(node.id);
        return;
      }

      if (node.type === 'choice') {
        this.processNode(node.id);
        return;
      }

      if (node.type === 'ending') {
        this.processNode(node.id);
        return;
      }

      this.processNode(node.id);
    }
  }

  advance(): boolean {
    if (!this.state.isWaitingForInput) return false;

    const node = this.getNode(this.state.nodeId);

    if (node.type === 'ending') {
      const currentTextIndex = this.state.endingTexts.indexOf(this.state.currentLine?.text ?? '');
      if (currentTextIndex >= 0 && currentTextIndex < this.state.endingTexts.length - 1) {
        const nextText = this.state.endingTexts[currentTextIndex + 1];
        this.state.currentLine = {
          nodeId: node.id,
          speaker: null,
          speakerName: this.state.endingTitle,
          text: nextText,
          isNarration: true,
        };
        this.addHistory(node.id, null, nextText);
        return true;
      }
      return false;
    }

    if (node.type === 'choice') return false;
    if (node.type !== 'narration' && node.type !== 'dialogue') return false;

    if (this.state.currentLine) {
      this.state.readNodes.add(this.state.currentLine.nodeId);
    }

    const nextId = node.next;
    this.state.nodeId = nextId;
    this.processUntilInteractive(false);
    return true;
  }

  selectChoice(index: number): void {
    const node = this.getNode(this.state.nodeId);
    if (node.type !== 'choice') return;

    const choice = node.choices[index];
    if (!choice) return;

    if (choice.condition && !checkCondition(this.state.variables, choice.condition, this.unlockedEndings)) {
      return;
    }

    if (choice.changes) {
      this.state.variables = applyChanges(this.state.variables, choice.changes);
    }

    this.state.readNodes.add(node.id);
    this.state.choices = null;
    this.state.isWaitingForInput = false;
    this.state.nodeId = choice.next;
    this.processUntilInteractive(false);
  }

  getCurrentNextNodeId(): string | null {
    const node = this.getNode(this.state.nodeId);
    if (node.type === 'narration' || node.type === 'dialogue') return node.next;
    return null;
  }
}
