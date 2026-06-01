# 美术规范 · 星轨便利店

## 画风

- 日系 Galgame 赛璐璐半身立绘
- 柔和电影感光，夏夜便利店 / 青春离别气质
- 背景 1920×1080，立绘约 832×1200

## 角色设定（立绘提示词参考）

### 星野未央 weiyang
深紫长发、相机挂绳、安静眼神、休闲夏装

### 沈知夏 zhixia
马尾、细框眼镜、校服、理性直接

### 白川音 baichuan
白色连帽外套、浅色不对称刘海、神秘感

### 林母 linmu
短发、围裙、温柔疲惫

### 周远 zhouyuan
运动服、乱发、男生、吐槽役气质

## 表情

neutral / smile / sad / surprised / serious / gentle

## 再生资产

```bash
npm run generate-assets   # 背景 + 程序化立绘回退
npm run generate-audio    # BGM + SE
npm run generate-all
```

AI 立绘替换：将 PNG 放入对应 `public/assets/sprites/{角色}/neutral.webp`（或运行项目内转换脚本）。


## 立绘抠图

```bash
pip install rembg pillow onnxruntime
npm run cutout-sprites
```

使用 rembg 自动抠出人像透明底，避免方形底图叠在画面上。
