import type { GameSettings } from '../engine/types';

interface SettingsPanelProps {
  settings: GameSettings;
  onChange: (partial: Partial<GameSettings>) => void;
  onClose: () => void;
  inGame?: boolean;
}

export function SettingsPanel({ settings, onChange, onClose, inGame }: SettingsPanelProps) {
  return (
    <div className="overlay-panel" onClick={onClose}>
      <div className="panel-box settings-panel" onClick={(e) => e.stopPropagation()}>
        <h2 className="panel-title">设置</h2>

        <label className="setting-row">
          <span>文字速度</span>
          <input
            type="range"
            min={10}
            max={100}
            value={settings.textSpeed}
            onChange={(e) => onChange({ textSpeed: Number(e.target.value) })}
          />
          <span className="setting-value">{settings.textSpeed}ms</span>
        </label>

        {inGame && (
          <label className="setting-row">
            <span>自动播放间隔</span>
            <input
              type="range"
              min={1000}
              max={5000}
              step={100}
              value={settings.autoDelay}
              onChange={(e) => onChange({ autoDelay: Number(e.target.value) })}
            />
            <span className="setting-value">{settings.autoDelay}ms</span>
          </label>
        )}

        <label className="setting-row">
          <span>音量</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={settings.volume}
            onChange={(e) => onChange({ volume: Number(e.target.value) })}
          />
          <span className="setting-value">{Math.round(settings.volume * 100)}%</span>
        </label>

        <label className="setting-row toggle">
          <span>静音</span>
          <input
            type="checkbox"
            checked={settings.muted}
            onChange={(e) => onChange({ muted: e.target.checked })}
          />
        </label>

        <label className="setting-row toggle">
          <span>显示角色立绘</span>
          <input
            type="checkbox"
            checked={settings.showSprites}
            onChange={(e) => onChange({ showSprites: e.target.checked })}
          />
        </label>

        <button className="btn-secondary panel-close" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  );
}
