import { ENDING_LIST, loadUnlockedEndings } from '../utils/storage';

interface EndingGalleryProps {
  onClose: () => void;
}

export function EndingGallery({ onClose }: EndingGalleryProps) {
  const unlocked = loadUnlockedEndings();

  return (
    <div className="overlay-panel" onClick={onClose}>
      <div className="panel-box ending-gallery" onClick={(e) => e.stopPropagation()}>
        <h2 className="panel-title">结局收集</h2>
        <p className="ending-count">
          已解锁 {unlocked.length} / {ENDING_LIST.length}
        </p>
        <div className="ending-list">
          {ENDING_LIST.map((ending) => {
            const isUnlocked = unlocked.includes(ending.id);
            return (
              <div key={ending.id} className={`ending-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                <div className="ending-route">{isUnlocked ? ending.route : '???'}</div>
                <h3 className="ending-title">{isUnlocked ? ending.title : '???'}</h3>
                <p className="ending-summary">{isUnlocked ? ending.summary : '通关对应路线以解锁'}</p>
              </div>
            );
          })}
        </div>
        <button className="btn-secondary panel-close" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  );
}
