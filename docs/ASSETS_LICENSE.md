# 素材授权说明 · 星轨便利店

## 立绘（Sprites）

| 角色 | 来源 | 授权 |
|------|------|------|
| 星野未央、沈知夏、白川音、林母、周远 | AI 生成（统一日系 Galgame 画风，每角色 6 种独立表情） | 随本项目源码分发，仅供本游戏及修改衍生使用 |

男主林澈无立绘（剧情设计为不可见主角）。

## 背景（Backgrounds）

| 类型 | 来源 | 授权 |
|------|------|------|
| 12 场景 WebP | `scripts/generate-assets.mjs` 程序化 SVG 绘制 | 项目原创，可自由使用 |

## 音乐与音效

| 游戏内 ID | 文件 | 气质 / 用途 | 来源（OpenGameArt.org） | 授权 |
|-----------|------|-------------|-------------------------|------|
| night | `bgm/night.mp3` | 夜班便利店、安静夜晚 | evening.mp3 | 以 OGA 页面标注为准 |
| day | `bgm/day.mp3` | 校园日常、轻快 | TownTheme.mp3 | 以 OGA 页面标注为准 |
| rain | `bgm/rain.mp3` | 雨夜、回忆 | Rain.mp3 | 以 OGA 页面标注为准 |
| stars | `bgm/stars.mp3` | 观星、天文馆 | spacetheme.mp3（Space Theme） | 以 OGA 页面标注为准 |
| tension | `bgm/tension.mp3` | 悬疑、分歧 | song21.mp3（Mysterious Ambience） | CC-BY，鸣谢 **pixelsphere.org** |
| ending | `bgm/ending.mp3` | 结局、车站告别 | the_field_of_dreams.mp3 | 以 OGA 页面标注为准 |
| SE | `se/*.mp3` | 点击 / 选项 / 存档 / 翻页 | click.mp3、select.ogg、save.mp3、click.wav | 以 OGA 页面标注为准 |

下载与重采样：`npm run download-audio`（`scripts/download-story-audio.sh`）。

旧版 `scripts/generate-audio.sh` 为 ffmpeg 合成垫乐，仅作离线后备，正式构建请使用上述真实配乐。

## UI

| 文件 | 来源 |
|------|------|
| `ui/keyvisual.webp` | 由 `title_sky` 背景导出 |

## 第三方库

- **Howler.js** — MIT License
- **React / Vite** — MIT

## 禁止用途

- 不得将素材单独打包出售
- 不得声称为第三方商业动漫作品官方素材

更新日期：2026-06-01
