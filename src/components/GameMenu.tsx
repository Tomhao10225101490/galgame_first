interface GameMenuProps {
  autoPlay: boolean;
  skipMode: boolean;
  onToggleAuto: () => void;
  onToggleSkip: () => void;
  onSave: () => void;
  onLoad: () => void;
  onHistory: () => void;
  onSettings: () => void;
  onTitle: () => void;
}

export function GameMenu({
  autoPlay,
  skipMode,
  onToggleAuto,
  onToggleSkip,
  onSave,
  onLoad,
  onHistory,
  onSettings,
  onTitle,
}: GameMenuProps) {
  return (
    <div className="game-menu">
      <button className={`btn-icon ${autoPlay ? 'active' : ''}`} onClick={onToggleAuto} title="自动">
        Auto
      </button>
      <button className={`btn-icon ${skipMode ? 'active' : ''}`} onClick={onToggleSkip} title="快进">
        Skip
      </button>
      <button className="btn-icon" onClick={onSave} title="保存">
        存
      </button>
      <button className="btn-icon" onClick={onLoad} title="读取">
        读
      </button>
      <button className="btn-icon" onClick={onHistory} title="历史">
        历
      </button>
      <button className="btn-icon" onClick={onSettings} title="设置">
        设
      </button>
      <button className="btn-icon" onClick={onTitle} title="返回标题">
        退
      </button>
    </div>
  );
}
