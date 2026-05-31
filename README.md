# 星轨便利店

一款可在浏览器运行的中文全年龄 Galgame（视觉小说）。

## 运行方式

```bash
npm install
npm run dev
```

浏览器访问终端显示的本地地址（默认 `http://localhost:5173`）。

## 构建

```bash
npm run build
npm run preview
```

## 游戏简介

在一座夏天即将被拆除的旧天文馆旁，三个少年少女在一家深夜便利店相遇。每当午夜 0:00 到来，某些人会短暂记起「没有发生过的一天」。

## 功能

- 完整剧情：共通线 6 章 + 三条个人线 + 7 个结局（含隐藏真结局）
- 分支选择与好感度/态度系统
- 打字机效果、自动播放、快进（已读文本）
- 6 个存档位、继续游戏
- 历史记录、设置（文字速度/音量/静音/立绘开关）
- 结局收集界面
- 纯 CSS/SVG/Canvas 生成的背景与角色剪影
- Web Audio API 生成的 BGM 与音效

## 技术栈

- Vite + React + TypeScript
- 数据驱动剧情引擎（`src/data/story.ts`）
- localStorage 持久化

## 操作

- 点击文本框推进剧情
- 顶部菜单：Auto / Skip / 存 / 读 / 历 / 设 / 退
