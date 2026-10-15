# 亚索 E 目标冷却圈

从用户本地客户端 `Yasuo.wad.client` 提取基础皮肤 `Yasuo_base_E_timer1` 所引用的资源：

- `source/Yasuo_base_E_timer_ring.tex`：白色半透明材质。
- `source/Yasuo_base_E_timer_mesh.scb`：原版三维计时网格，文件头 `r3d2Mesh`。
- `source/Color_Yasuo_E_dash_timer_tar.tex`：颜色渐变。
- `textures/*.png`：使用 CDTB 的 TEX → DDS 转换，再通过 Pillow 解码的预览。
- `manifest.json`：原始路径、WAD 哈希及 SHA-256。

源效果通过网格、UV 滚动、颜色查找和绑定目标尺寸形成环绕提示，纹理本身不是可直接贴上的二维圆圈。当前 Phaser 实现参考该资源结构，在 `src/render/DashTargetTimer.ts` 重建前后分层的二维白色计时环，不直接加载 SCB。

圆圈环绕目标下半身，暗色边缘保持雪地可读性；亮白弧线随目标冷却逐渐缩短，末端亮点标记进度。英雄与小兵按身体大小调整，跟随移动和击飞。计时完全读取 `Match.eTargetLocks`，采用本项目实际的 8 秒，不复制源粒子的 9.75 秒寿命。不修改目标冷却或伤害规则。

验证：全量 96 个文件、553 项测试通过，TypeScript/Vite 构建通过。自动检查覆盖半程、到期与再次 E 一致、暂停、目标位移/击飞/死亡和重置。实机验证命中后显示白圈，8 秒到期后消失，靶场读取 FPS 155–165，无浏览器 warn/error。`in-game.png` 为命中后的白圈，`in-game-expired.png` 与 `in-game-expired-later.png` 为到期后画面。
