import { useEffect, useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { GameScreen } from './components/GameScreen';
import { SaveLoadPanel } from './components/SaveLoadPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { EndingGallery } from './components/EndingGallery';
import type { AppScreen, GameSettings, GameSnapshot, SaveSlot } from './engine/types';
import { loadContinue, loadSaves, loadSettings, saveSettings, loadUnlockedEndings } from './utils/storage';
import { audioEngine } from './audio/audioEngine';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('mainMenu');
  const [settings, setSettings] = useState<GameSettings>(loadSettings);
  const [hasContinue, setHasContinue] = useState(() => loadContinue() !== null);
  const [gameKey, setGameKey] = useState(0);
  const [initialSnapshot, setInitialSnapshot] = useState<GameSnapshot | null>(null);
  const [menuOverlay, setMenuOverlay] = useState<'none' | 'load' | 'settings' | 'endings'>('none');

  const updateSettings = (partial: Partial<GameSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  };

  useEffect(() => {
    audioEngine.setVolume(settings.volume);
    audioEngine.setMuted(settings.muted);
  }, [settings.volume, settings.muted]);

  useEffect(() => {
    if (screen !== 'mainMenu') return;
    const startTitleAudio = () => {
      audioEngine.ensureStarted();
      audioEngine.playBgm('night');
      audioEngine.playAmbience('title_sky');
    };
    window.addEventListener('pointerdown', startTitleAudio, { once: true });
    return () => window.removeEventListener('pointerdown', startTitleAudio);
  }, [screen]);

  const handleLoadFromMenu = (slot: number) => {
    const saves = loadSaves();
    const entry = saves.find((s) => s.slot === slot);
    if (entry && entry.timestamp > 0) {
      setInitialSnapshot(entry.snapshot);
      setGameKey((k) => k + 1);
      setScreen('playing');
      setMenuOverlay('none');
    }
  };

  const slots: SaveSlot[] = loadSaves();

  return (
    <div className="app">
      {screen === 'mainMenu' && (
        <MainMenu
          hasContinue={hasContinue}
          onStart={() => {
            setInitialSnapshot(null);
            setGameKey((k) => k + 1);
            setScreen('playing');
          }}
          onContinue={() => {
            const cont = loadContinue();
            if (cont) {
              setInitialSnapshot(cont.snapshot);
              setGameKey((k) => k + 1);
              setScreen('playing');
            }
          }}
          onLoad={() => setMenuOverlay('load')}
          onEndings={() => setMenuOverlay('endings')}
          onSettings={() => setMenuOverlay('settings')}
        />
      )}

      {screen === 'playing' && (
        <GameScreen
          key={gameKey}
          initialSnapshot={initialSnapshot}
          onReturnToTitle={() => {
            setHasContinue(loadContinue() !== null);
            setScreen('mainMenu');
          }}
        />
      )}

      {menuOverlay === 'load' && (
        <SaveLoadPanel
          mode="load"
          slots={slots}
          onSelectSlot={handleLoadFromMenu}
          onClose={() => setMenuOverlay('none')}
        />
      )}

      {menuOverlay === 'settings' && (
        <SettingsPanel
          settings={settings}
          onChange={updateSettings}
          onClose={() => setMenuOverlay('none')}
        />
      )}

      {menuOverlay === 'endings' && (
        <EndingGallery key={loadUnlockedEndings().length} onClose={() => setMenuOverlay('none')} />
      )}
    </div>
  );
}
