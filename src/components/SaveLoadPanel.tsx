import type { SaveSlot } from '../engine/types';

interface SaveLoadPanelProps {
  mode: 'save' | 'load';
  slots: SaveSlot[];
  onSelectSlot: (slot: number) => void;
  onClose: () => void;
}

function formatTime(ts: number): string {
  if (!ts) return '—';
  return new Date(ts).toLocaleString('zh-CN');
}

export function SaveLoadPanel({ mode, slots, onSelectSlot, onClose }: SaveLoadPanelProps) {
  return (
    <div className="overlay-panel" onClick={onClose}>
      <div className="panel-box save-load-panel" onClick={(e) => e.stopPropagation()}>
        <h2 className="panel-title">{mode === 'save' ? '保存游戏' : '读取存档'}</h2>
        <div className="save-slots">
          {slots.map((slot) => (
            <button
              key={slot.slot}
              className={`save-slot ${slot.timestamp ? 'filled' : 'empty'}`}
              onClick={() => onSelectSlot(slot.slot)}
              disabled={mode === 'load' && !slot.timestamp}
            >
              <span className="slot-num">存档 {slot.slot + 1}</span>
              {slot.timestamp > 0 ? (
                <>
                  <span className="slot-chapter">{slot.chapterLabel}</span>
                  <span className="slot-preview">{slot.previewText || '...'}</span>
                  <span className="slot-time">{formatTime(slot.timestamp)}</span>
                </>
              ) : (
                <span className="slot-empty-label">空</span>
              )}
            </button>
          ))}
        </div>
        <button className="btn-secondary panel-close" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  );
}
