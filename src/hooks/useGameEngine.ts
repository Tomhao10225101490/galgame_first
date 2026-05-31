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
import { useTypewriter } from './useTypewriter';

export { useTypewriter };

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

  const persistContinue = useCallback(() => {
    const snap = engineRef.current.getSnapshot();
    const preview = engineRef.current.state.currentLine?.text.slice(0, 30) ?? '';
    saveContinue(snap, preview);
  }, []);

  const advance = useCallback(() => {
    const s = engineRef.current.state;
    if (s.isEnding && s.endingTexts.length > 0) {
      const currentIdx = s.endingTexts.indexOf(s.currentLine?.text ?? '');
      if (currentIdx >= s.endingTexts.length - 1) {
        onReturnToTitle();
        return;
      }
    }

    const ok = engineRef.current.advance();
    if (ok) {
      persistContinue();
      forceUpdate();
    } else if (engineRef.current.state.isEnding) {
      onReturnToTitle();
    }
  }, [onReturnToTitle, persistContinue, forceUpdate]);

  const selectChoice = useCallback(
    (index: number) => {
      audioEngine.playSe('choice');
      engineRef.current.selectChoice(index);
      persistContinue();
      forceUpdate();
    },
    [persistContinue, forceUpdate],
  );

  const startNewGame = useCallback(() => {
    engineRef.current.reset();
    persistContinue();
    forceUpdate();
  }, [persistContinue, forceUpdate]);

  const loadGame = useCallback(
    (snapshot: GameSnapshot) => {
      engineRef.current.loadSnapshot(snapshot);
      engineRef.current.setUnlockedEndings(loadUnlockedEndings());
      forceUpdate();
    },
    [forceUpdate],
  );

  const updateSettings = useCallback((partial: Partial<GameSettings>) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  }, []);

  const refreshSettings = useCallback(() => {
    setSettingsState(loadSettings());
  }, []);

  useEffect(() => {
    audioEngine.setVolume(settings.volume);
    audioEngine.setMuted(settings.muted);
  }, [settings.volume, settings.muted]);

  const bgm = engine.state.bgm;

  useEffect(() => {
    if (!bgm || bgm === 'none') {
      audioEngine.stopBgm();
    } else {
      audioEngine.playBgm(bgm as BgmId);
    }
  }, [bgm]);

  useEffect(() => {
    if (!skipMode) return;

    const id = window.setInterval(() => {
      const s = engineRef.current.state;
      if (s.choices || s.isEnding) return;
      const line = s.currentLine;
      if (line && engineRef.current.canSkip(line.nodeId)) {
        advance();
      } else {
        setSkipMode(false);
      }
    }, 80);
    return () => clearInterval(id);
  }, [skipMode, advance]);

  return {
    engine,
    state: engine.state,
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
    refreshSettings,
    persistContinue,
    forceUpdate,
    hasContinue: () => loadContinue() !== null,
    loadContinueSnapshot: () => loadContinue()?.snapshot ?? null,
  };
}

export type GameEngineReturn = ReturnType<typeof useGameEngine>;
