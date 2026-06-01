interface LoadingScreenProps {
  percent: number;
  label?: string;
}

export function LoadingScreen({ percent, label = '星轨便利店' }: LoadingScreenProps) {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <h1 className="loading-title">{label}</h1>
        <p className="loading-sub">正在加载资源…</p>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="loading-percent">{percent}%</span>
      </div>
    </div>
  );
}
