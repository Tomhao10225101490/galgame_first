interface LoadingScreenProps {
  percent: number;
  label?: string;
}

export function LoadingScreen({ percent, label = '星轨便利店' }: LoadingScreenProps) {
  return (
    <div className="loading-screen">
      <div className="loading-orbit" />
      <div className="loading-card">
        <div className="loading-kicker">LOADING ASSETS</div>
        <h1>{label}</h1>
        <div className="loading-bar" aria-label="资源加载进度">
          <span style={{ width: `${percent}%` }} />
        </div>
        <p>{percent}% · 正在整理凌川夏天的光和声音</p>
      </div>
    </div>
  );
}
