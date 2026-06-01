import { audioEngine } from '../audio/audioEngine';
import { UI_ASSETS } from '../data/assets';

interface MainMenuProps {
  hasContinue: boolean;
  onStart: () => void;
  onContinue: () => void;
  onLoad: () => void;
  onEndings: () => void;
  onSettings: () => void;
  onCredits: () => void;
}

export function MainMenu({
  hasContinue,
  onStart,
  onContinue,
  onLoad,
  onEndings,
  onSettings,
  onCredits,
}: MainMenuProps) {
  return (
    <div className="main-menu">
      <div
        className="main-menu-bg main-menu-keyvisual"
        style={{ backgroundImage: `url(${UI_ASSETS.keyvisual})` }}
      />
      <div className="main-menu-overlay" />
      <div className="main-menu-content">
        <h1 className="game-title">星轨便利店</h1>
        <p className="game-subtitle">在一座夏天即将被拆除的旧天文馆旁</p>
        <nav className="main-menu-nav">
          <button
            className="menu-btn"
            onClick={() => {
              audioEngine.ensureStarted();
              onStart();
            }}
          >
            开始游戏
          </button>
          {hasContinue && (
            <button
              className="menu-btn"
              onClick={() => {
                audioEngine.ensureStarted();
                onContinue();
              }}
            >
              继续游戏
            </button>
          )}
          <button
            className="menu-btn"
            onClick={() => {
              audioEngine.ensureStarted();
              onLoad();
            }}
          >
            读取存档
          </button>
          <button className="menu-btn" onClick={onEndings}>
            结局收集
          </button>
          <button className="menu-btn menu-btn-dim" onClick={onSettings}>
            设置
          </button>
          <button className="menu-btn menu-btn-dim" onClick={onCredits}>
            素材鸣谢
          </button>
        </nav>
      </div>
    </div>
  );
}
