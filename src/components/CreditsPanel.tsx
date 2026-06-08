interface CreditsPanelProps {
  onClose: () => void;
}

export function CreditsPanel({ onClose }: CreditsPanelProps) {
  return (
    <div className="overlay-panel" onClick={onClose}>
      <div className="panel-box credits-panel" onClick={(event) => event.stopPropagation()}>
        <h2 className="panel-title">素材鸣谢</h2>
        <div className="credits-body">
          <section>
            <h3>视觉</h3>
            <p>背景、主视觉与立绘由项目资源脚本生成并输出为 WebP，统一为日系视觉小说与电影光影方向。</p>
          </section>
          <section>
            <h3>音乐与音效</h3>
            <p>
              BGM 与 SE 主要来自 OpenGameArt.org 的可商用免费素材，经脚本裁切、淡入淡出与重采样后随游戏分发。
              悬疑段落曲目请注明 pixelsphere.org。
            </p>
          </section>
          <section>
            <h3>技术</h3>
            <p>React + Vite + TypeScript · Howler.js · Sharp · 详见 docs/ASSETS_LICENSE.md 与 docs/ART_BIBLE.md</p>
          </section>
        </div>
        <button className="btn-secondary panel-close" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  );
}
