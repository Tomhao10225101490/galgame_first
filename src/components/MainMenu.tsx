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
  const unlockAndPlayTitle = () => {
    audioEngine.ensureStarted();
    audioEngine.playBgm('night');
  };

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
              unlockAndPlayTitle();
              onStart();
            }}
          >
            开始游戏
          </button>
          {hasContinue && (
            <button
              className="menu-btn"
              onClick={() => {
                unlockAndPlayTitle();
                onContinue();
              }}
            >
              继续游戏
            </button>
          )}
          <button
            className="menu-btn"
            onClick={() => {
              unlockAndPlayTitle();
              onLoad();
            }}
          >
            读取存档
          </button>
          <button className="menu-btn" onClick={() => { unlockAndPlayTitle(); onEndings(); }}>
            结局收集
          </button>
          <button className="menu-btn menu-btn-dim" onClick={() => { unlockAndPlayTitle(); onSettings(); }}>
            设置
          </button>
          <button className="menu-btn menu-btn-dim" onClick={() => { unlockAndPlayTitle(); onCredits(); }}>
            素材鸣谢
          </button>
        </nav>
        <p className="menu-audio-hint">点击任意按钮会开启真实 BGM，建议检查系统音量并关闭浏览器静音。</p>
      </div>
    </div>
  );
}
