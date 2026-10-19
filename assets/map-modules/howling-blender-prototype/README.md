# 零新增付费的三维资产样板

预算约束：不购买额度、不创建付费生成任务，不依赖 Meshy / Tripo 账号。既有地图图像不重新生成。

唯一美术基准：`assets/map-concepts/howling-abyss-target-v1/04-central-bridge.png`。

## 交付与状态

- `scripts/build-howling-blender-prototype.py`：离线 Blender 建模、GLB 导出和多角度渲染脚本。桥拱由径向拱石组成，墙体、柱面浮雕、雪盖和冰柱均有体积。
- `bridge-wall-study.blend` / `bridge-wall-study.glb`：脚本成功运行后输出的建筑研究样板，兽像座暂留空。不自动接入游戏。
- `architecture-main.png` / `architecture-side.png`：离线检查图，不能替代 Three.js 内验收。
- `lion-candidate.glb`：免费候选，尚未批准采用。来源 https://www.innerscene.com/tools/library/3d-parts/lion-statue-6115b7b8 ，该页面声明 CC0，来源描述为 Innerscene adapted from MakeHuman CC0 assets。下载链接为页面公开的 Download GLB。必须先核对实际造型；授权免费不代表风格符合。

## 质量门槛

1. 建筑轮廓：细长石柱、密实灰紫砌石、雕刻面板、低矮残墙，禁止用大色块积木代替。
2. 体积：主视角和侧视角均须成立，桥拱真正中空，墙顶与柱侧有厚度。
3. 材质：控制石面明暗、色差和粗糙度；雪是薄覆盖，不是厚白盒。还需验证与已认可地表的像素密度匹配。
4. 兽像：独立检查头脸、坐姿、前爪、鬃毛、侧面轮廓；普通低模狮子或球锥拼接不通过。
5. 运行时：GLB 导入 Three.js 后核对同角度光照、比例、遮挡、资源释放与性能，不能仅凭 Blender 渲染通过。

当前状态：研究中，未通过风格验收、未替换实机场景。没有新增付费请求。

## 本轮检查记录

已使用 Blender Foundation 发布的 `bpy==4.5.14` 本地模块完成建模、GLB 导出和两角度离线渲染。官方便携版出现 Windows 激活上下文/运行库错误，未作为可用工具交付。Python 依赖隔离在 `.cache/blender-python/`，未修改全局包或系统 PATH。

```powershell
python -c "import sys; sys.path.insert(0, '.cache/blender-python'); import runpy; runpy.run_path('scripts/build-howling-blender-prototype.py', run_name='__main__')"
```

`review.html` 在现有 Vite 服务中提供 Three.js 实际 GLB 检查及目标图并排对照。浏览器已核对主/侧视角，加载 12 个网格、73,322 三角面，无浏览器错误或警告。源文件保留 277 个可编辑对象，导出按共享材质合批。此检查不是性能或最终风格验收。

本轮质量结论：

- 桥拱中空、柱侧和墙顶厚度已成立；补齐了第一轮拱上墙体的空隙。
- 建筑仍过于规整，石材颗粒、残损、雕刻复杂度与目标有明显差距，材质色块变化不能替代雕刻和磨损。
- 单模块面数仍偏高；需在轮廓定稿后减面、烘焙细节并做场景性能测量。
- 免费狮像候选淘汰：圆耳圆脸、鬃毛简化、姿态普通，与尖耳守卫兽不符。候选文件仅作为检查记录，未进入生产资源。
- `three-review.png` 是检查页实拍；`.blend` 与离线 PNG 均不代表实机地图已经改善。

临时便携版文件清理被自动审批策略阻止，暂保留；不影响该离线模块流程，也不产生费用。
