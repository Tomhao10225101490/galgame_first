interface CreditsPanelProps {
  onClose: () => void;
}

export function CreditsPanel({ onClose }: CreditsPanelProps) {
  return (
    <div className="overlay-panel" onClick={onClose}>
      <div className="panel-box credits-panel" onClick={(e) => e.stopPropagation()}>
        <h2 className="panel-title">素材鸣谢</h2>
        <div className="credits-body">
          <section>
            <h3>视觉</h3>
            <p>背景与立绘由项目内置资源管线生成（SVG 程序化绘制 + WebP），统一画风为日系视觉小说风格。</p>
          </section>
          <section>
            <h3>音乐与音效</h3>
            <p>BGM / SE 来自 OpenGameArt.org 等免版税素材（详见 docs/ASSETS_LICENSE.md）。悬疑段落配乐请注明 pixelsphere.org。</p>
          </section>
          <section>
            <h3>引擎与技术</h3>
            <p>React + Vite + TypeScript · Howler.js · 详见仓库 docs/ASSETS_LICENSE.md</p>
          </section>
          <section>
            <h3>剧本</h3>
            <p>《星轨便利店》原创剧情 · 凌川的夏天，与没有选择的选择题。</p>
          </section>
        </div>
        <button className="btn-secondary panel-close" onClick={onClose}>
          关闭
        </button>
      </div>
    </div>
  );
}
