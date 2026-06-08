import { audioEngine } from '../audio/audioEngine';

interface MainMenuProps {
  hasContinue: boolean;
  onStart: () => void;
  onContinue: () => void;
  onLoad: () => void;
  onEndings: () => void;
  onSettings: () => void;
}

export function MainMenu({
  hasContinue,
  onStart,
  onContinue,
  onLoad,
  onEndings,
  onSettings,
}: MainMenuProps) {
  return (
    <div className="main-menu">
      <div className="main-menu-bg">
        <div className="menu-stars" />
        <div className="menu-orbit menu-orbit-a" />
        <div className="menu-orbit menu-orbit-b" />
        <div className="menu-store-silhouette" />
      </div>
      <div className="main-menu-shade" />
      <div className="main-menu-content">
        <div className="menu-kicker">VISUAL NOVEL / LINGCHUAN SUMMER</div>
        <h1 className="game-title">星轨便利店</h1>
        <p className="game-subtitle">在一座夏天即将被拆除的旧天文馆旁</p>
        <div className="menu-meta">
          <span>7 ENDINGS</span>
          <span>DYNAMIC MUSIC</span>
          <span>CINEMATIC MODE</span>
        </div>
        <nav className="main-menu-nav">
          <button className="menu-btn" onClick={() => { audioEngine.ensureStarted(); onStart(); }}>开始游戏</button>
          {hasContinue && (
            <button className="menu-btn" onClick={() => { audioEngine.ensureStarted(); onContinue(); }}>继续游戏</button>
          )}
          <button className="menu-btn" onClick={() => { audioEngine.ensureStarted(); onLoad(); }}>读取存档</button>
          <button className="menu-btn" onClick={onEndings}>结局收集</button>
          <button className="menu-btn menu-btn-dim" onClick={onSettings}>设置</button>
        </nav>
        <p className="menu-audio-hint">首次点击会解锁浏览器音频 · 建议佩戴耳机</p>
      </div>
    </div>
  );
}
