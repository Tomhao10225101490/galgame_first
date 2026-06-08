# 素材授权说明 · 星轨便利店

## 视觉素材

| 类型 | 路径 | 来源 | 授权/说明 |
|------|------|------|-----------|
| 背景 | `public/assets/backgrounds/*.webp` | `scripts/generate-assets.mjs` 程序化生成 | 项目原创，可随本游戏分发 |
| 立绘 | `public/assets/sprites/*/*.webp` | `scripts/generate-assets.mjs` 程序化生成 | 项目原创，可随本游戏分发 |
| 主视觉 | `public/assets/ui/keyvisual.webp` | 基于 `title_sky` 生成 | 项目原创，可随本游戏分发 |

男主林澈当前剧情没有 `show` 节点，因此不生成立绘。

## 音乐与音效

音频由 `scripts/download-audio.sh` 从 OpenGameArt.org 下载并用 ffmpeg 归一化为 MP3。若下载失败，脚本会生成后备合成音频，保证本地开发可运行。

| 游戏内 ID | 文件 | 用途 | 来源文件 |
|-----------|------|------|----------|
| `night` | `public/assets/bgm/night.mp3` | 深夜便利店、标题氛围 | `evening.mp3` |
| `day` | `public/assets/bgm/day.mp3` | 校园/日常 | `TownTheme.mp3` |
| `rain` | `public/assets/bgm/rain.mp3` | 雨夜/回忆 | `Rain.mp3` |
| `stars` | `public/assets/bgm/stars.mp3` | 观星/天文馆 | `spacetheme.mp3` |
| `tension` | `public/assets/bgm/tension.mp3` | 悬疑/地下星象仪 | `song21.mp3`（Mysterious Ambience） |
| `ending` | `public/assets/bgm/ending.mp3` | 结局/告别 | `the_field_of_dreams.mp3` |
| `click` | `public/assets/se/click.mp3` | 点击 | `click.mp3` |
| `choice` | `public/assets/se/choice.mp3` | 选项 | `select.ogg` |
| `save` | `public/assets/se/save.mp3` | 存档 | `save.mp3` |
| `pageTurn` | `public/assets/se/pageTurn.mp3` | 翻页 | `click.wav` |

请以 OpenGameArt 各条目页面标注的许可证为准；`song21.mp3` 的条目要求署名 `pixelsphere.org`。

## 第三方库

- React / Vite / TypeScript
- Howler.js
- Sharp

## 禁止用途

- 不得将素材单独打包出售
- 不得冒充第三方商业动漫或游戏官方素材
- 替换为外部素材时，必须补充授权来源
