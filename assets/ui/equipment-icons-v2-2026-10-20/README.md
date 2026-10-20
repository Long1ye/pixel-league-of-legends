# 装备图标 V2

覆盖当前装备池全部 16 件。使用 game-assets 的 Image2.5 / 极致 / 2K 图像编辑，基于上一版统一重绘，任务 `job_618a17613ee34b1b9df33dcda7108d8b`。

`source-atlas.png` 为验证过的最终 2048×2048 RGBA 图集，alpha 全为 255。按原有 4×4 顺序导出 `runtime/<装备 ID>.webp`，每张保持原生 512×512，使用无损 WebP，无缩放；导出脚本逐张解码并核对像素，保证与对应图集格完全一致。`icons.json` 记录 ID、名称、格位、尺寸、文件大小及来源哈希。

重绘重点：移除复杂城堡背景，简化金框；暴风之剑使用银蓝重剑，无尽使用金色；狂热使用紫红双刃，幻影之舞使用青色双刃；布甲改为布质背心；鞋子与攻速鞋保持基础 / 成装区别。

所有界面按装备 ID 取同一文件，包括商店列表、详情、合成树、升级方向和六格装备栏。装备栏改成 30×30 方格，避免原先 32×29 的拉伸。Three.js 开场门禁逐张等待解码完成，模块加载时检查装备池图标覆盖。

16 张运行时图标总计 4,148,384 字节，旧 PNG 图集为 6,410,820 字节，减少约 35%，未降低像素尺寸。旧版素材保留作为来源与回退。

重新导出：

```powershell
python scripts/export-equipment-icons.py --source assets/ui/equipment-icons-v2-2026-10-20/source-atlas.png --output assets/ui/equipment-icons-v2-2026-10-20/runtime --job-id job_618a17613ee34b1b9df33dcda7108d8b
```

浏览器验证与截图见 `docs/visual-validation/2026-10-20/equipment-icons-v2/`。
