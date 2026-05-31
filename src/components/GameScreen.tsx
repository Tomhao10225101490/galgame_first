import { useCallback, useEffect, useRef, useState } from 'react';
import { Background } from './Background';
import { CharacterSprite } from './CharacterSprite';
import { TextBox } from './TextBox';
import { ChoicePanel } from './ChoicePanel';
import { GameMenu } from './GameMenu';
import { SaveLoadPanel } from './SaveLoadPanel';
import { SettingsPanel } from './SettingsPanel';
import { HistoryPanel } from './HistoryPanel';
import { useGameEngine, useTypewriter } from '../hooks/useGameEngine';
import { loadSaves, saveToSlot } from '../utils/storage';
import { audioEngine } from '../audio/audioEngine';
import type { GameSnapshot, SaveSlot } from '../engine/types';

interface GameScreenProps {
  onReturnToTitle: () => void;
  initialSnapshot?: GameSnapshot | null;
}

export function GameScreen({ onReturnToTitle, initialSnapshot }: GameScreenProps) {
  const game = useGameEngine(onReturnToTitle);
  const { state, settings, autoPlay, setAutoPlay, skipMode, setSkipMode, advance, selectChoice, startNewGame, loadGame, updateSettings, persistContinue } = game;

  const [overlay, setOverlay] = useState<'none' | 'save' | 'load' | 'settings' | 'history'>('none');
  const [saveLoadMode, setSaveLoadMode] = useState<'save' | 'load'>('save');
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (initialSnapshot) {
      loadGame(initialSnapshot);
    } else {
      startNewGame();
    }
  }, [initialSnapshot, loadGame, startNewGame]);

  const line = state.currentLine;
  const { displayed, done, skip } = useTypewriter(
    line?.text ?? '',
    settings.textSpeed,
    true,
  );

  const handleAdvance = useCallback(() => {
    audioEngine.playSe('click');
    if (done) advance();
    else skip();
  }, [done, advance, skip]);

  const slots: SaveSlot[] = loadSaves();

  const handleSaveSlot = (slot: number) => {
    const snap = game.engine.getSnapshot();
    const preview = line?.text.slice(0, 40) ?? '';
    saveToSlot(slot, snap, preview);
    audioEngine.playSe('save');
    setOverlay('none');
  };

  const handleLoadSlot = (slot: number) => {
    const entry = slots.find((s) => s.slot === slot);
    if (entry && entry.timestamp > 0) {
      loadGame(entry.snapshot);
      setOverlay('none');
    }
  };

  return (
    <div className="game-screen">
      <Background bgId={state.background} />

      {settings.showSprites &&
        state.visibleCharacters.map((vc) => (
          <CharacterSprite
            key={vc.id}
            characterId={vc.id}
            expression={vc.expression}
            position={vc.position}
            visible
          />
        ))}

      <GameMenu
        autoPlay={autoPlay}
        skipMode={skipMode}
        onToggleAuto={() => setAutoPlay(!autoPlay)}
        onToggleSkip={() => setSkipMode(!skipMode)}
        onSave={() => { setSaveLoadMode('save'); setOverlay('save'); }}
        onLoad={() => { setSaveLoadMode('load'); setOverlay('load'); }}
        onHistory={() => setOverlay('history')}
        onSettings={() => setOverlay('settings')}
        onTitle={() => {
          persistContinue();
          onReturnToTitle();
        }}
      />

      {state.choices && (
        <ChoicePanel choices={state.choices} onSelect={selectChoice} />
      )}

      {line && !state.choices && (
        <TextBox
          speakerName={line.speakerName}
          text={line.text}
          displayedText={displayed}
          isNarration={line.isNarration}
          onClick={handleAdvance}
          onSkipTypewriter={skip}
        />
      )}

      {state.isEnding && state.endingTitle && (
        <div className="ending-banner">{state.endingTitle}</div>
      )}

      {(overlay === 'save' || overlay === 'load') && (
        <SaveLoadPanel
          mode={saveLoadMode}
          slots={slots}
          onSelectSlot={overlay === 'save' ? handleSaveSlot : handleLoadSlot}
          onClose={() => setOverlay('none')}
        />
      )}

      {overlay === 'settings' && (
        <SettingsPanel
          settings={settings}
          onChange={updateSettings}
          onClose={() => setOverlay('none')}
          inGame
        />
      )}

      {overlay === 'history' && (
        <HistoryPanel history={state.history} onClose={() => setOverlay('none')} />
      )}
    </div>
  );
}
