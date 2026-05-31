import type { HistoryEntry } from '../engine/types';

interface HistoryPanelProps {
  history: HistoryEntry[];
  onClose: () => void;
}

export function HistoryPanel({ history, onClose }: HistoryPanelProps) {
  return (
    <div className="overlay-panel" onClick={onClose}>
      <div className="panel-box history-panel" onClick={(e) => e.stopPropagation()}>
        <h2 className="panel-title">历史记录</h2>
        <div className="history-list">
          {history.length === 0 && <p className="history-empty">暂无记录</p>}
          {history.map((entry, i) => (
            <div key={`${entry.nodeId}-${i}`} className="history-item">
              {entry.speakerName && (
                <span className="history-speaker">{entry.speakerName}</span>
              )}
              <p className="history-text">{entry.text}</p>
            </div>
          ))}
        </div>
        <button className="btn-secondary panel-close" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  );
}
