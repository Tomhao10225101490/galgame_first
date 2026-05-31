import { useCallback, useEffect, useRef, useState } from 'react';
import type { BgmId, GameSettings, GameSnapshot } from '../engine/types';
import { VisualNovelEngine } from '../engine/visualNovelEngine';
import { STORY_NODES } from '../data/story';
import { CHARACTER_NAMES } from '../data/characters';
import {
  loadContinue,
  loadSettings,
  loadUnlockedEndings,
  saveContinue,
  saveSettings,
  unlockEnding,
} from '../utils/storage';
import { audioEngine } from '../audio/audioEngine';

export function useTypewriter(text: string, speed: number, enabled: boolean) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      setDone(true);
      return;
    }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  const skip = useCallback(() => {
    setDisplayed(text);
    setDone(true);
  }, [text]);

  return { displayed, done, skip };
}

export function useGameEngine(onReturnToTitle: () => void) {
  const [settings, setSettingsState] = useState<GameSettings>(loadSettings);
  const [engine] = useState(
    () =>
      new VisualNovelEngine(STORY_NODES, CHARACTER_NAMES, loadUnlockedEndings(), (id) => {
        unlockEnding(id);
        engineRef.current?.setUnlockedEndings(loadUnlockedEndings());
      }),
  );
  const engineRef = useRef(engine);
  engineRef.current = engine;

  const [, tick] = useState(0);
  const forceUpdate = useCallback(() => tick((n) => n + 1), []);

  const [autoPlay, setAutoPlay] = useState(false);
  const [skipMode, setSkipMode] = useState(false);
  const autoTimerRef = useRef<number | null>(null);

  const state = engine.state;

  useEffect(() => {
    audioEngine.setVolume(settings.volume);
    audioEngine.setMuted(settings.muted);
  }, [settings.volume, settings.muted]);

  useEffect(() => {
    if (state.bgm && state.bgm !== 'none') {
      audioEngine.playBgm(state.bgm as BgmId);
    }
  }, [state.bgm]);

  const persistContinue = useCallback(() => {
    const snap = engine.getSnapshot();
    const preview = state.currentLine?.text.slice(0, 30) ?? '';
    saveContinue(snap, preview);
  }, [engine, state.currentLine]);

  const advance = useCallback(() => {
    if (state.isEnding && state.endingTexts) {
      const currentIdx = state.endingTexts.indexOf(state.currentLine?.text ?? '');
      if (currentIdx >= state.endingTexts.length - 1) {
        onReturnToTitle();
        return;
      }
    }
    const ok = engine.advance();
    if (ok) {
      engine.markCurrentRead();
      persistContinue();
      forceUpdate();
    } else if (state.isEnding) {
      onReturnToTitle();
    }
  }, [engine, state, onReturnToTitle, persistContinue, forceUpdate]);

  const selectChoice = useCallback(
    (index: number) => {
      audioEngine.playSe('choice');
      engine.selectChoice(index);
      persistContinue();
      forceUpdate();
    },
    [engine, persistContinue, forceUpdate],
  );

  const startNewGame = useCallback(() => {
    engine.reset();
    engine.processUntilInteractive(false);
    persistContinue();
    forceUpdate();
  }, [engine, persistContinue, forceUpdate]);

  const loadGame = useCallback(
    (snapshot: GameSnapshot) => {
      engine.loadSnapshot(snapshot);
      engine.setUnlockedEndings(loadUnlockedEndings());
      forceUpdate();
    },
    [engine, forceUpdate],
  );

  const updateSettings = useCallback((partial: Partial<GameSettings>) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!autoPlay || !state.isWaitingForInput || state.choices) return;
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    autoTimerRef.current = window.setTimeout(() => {
      advance();
    }, settings.autoDelay);
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [autoPlay, state.isWaitingForInput, state.choices, state.currentLine, advance, settings.autoDelay]);

  useEffect(() => {
    if (!skipMode || state.choices || state.isEnding) return;
    const id = window.setInterval(() => {
      const line = engine.state.currentLine;
      if (line && engine.canSkip(line.nodeId)) {
        advance();
      } else {
        setSkipMode(false);
      }
    }, 80);
    return () => clearInterval(id);
  }, [skipMode, state.choices, state.isEnding, engine, advance]);

  return {
    engine,
    state,
    settings,
    autoPlay,
    setAutoPlay,
    skipMode,
    setSkipMode,
    advance,
    selectChoice,
    startNewGame,
    loadGame,
    updateSettings,
    persistContinue,
    hasContinue: () => loadContinue() !== null,
    loadContinueSnapshot: () => loadContinue()?.snapshot ?? null,
  };
}

export type GameEngineReturn = ReturnType<typeof useGameEngine>;
