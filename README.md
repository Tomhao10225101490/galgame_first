# 星轨便利店

可在浏览器运行的中文全年龄 Galgame（视觉小说）。

## 快速开始

```bash
npm install
npm run dev
```

浏览器打开终端显示的地址（默认 `http://localhost:5173`）。

## 资源生成（可选）

若需重新生成程序化背景/立绘回退与音频：

```bash
npm run generate-all
```

AI 立绘与部分场景图已内置在 `public/assets/`。

## 功能

- 共通线 6 章 + 三条个人线 + 7 结局（含隐藏真结局）
- **真实立绘**（AI 生成）+ **场景背景图** + **Howler BGM/SE**
- 存档 / 继续游戏 / 结局收集 / 历史 / Auto / Skip
- 启动加载屏与素材预加载

## 技术栈

- Vite + React + TypeScript
- Howler.js 音频
- 数据驱动剧情引擎

## 文档

- [docs/ASSETS_LICENSE.md](docs/ASSETS_LICENSE.md) — 素材授权
- [docs/ART_BIBLE.md](docs/ART_BIBLE.md) — 美术规范

## 操作

- 点击文本框或 Enter / 空格 推进
- 右上角：Auto / Skip / 存 / 读 / 历 / 设 / 退
