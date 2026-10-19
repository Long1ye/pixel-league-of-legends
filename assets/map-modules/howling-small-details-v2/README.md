# 概念图细节适配 v2

本轮以 04 直墙挂旗铁链、05 小冰晶与墙脚、06 积雪与排水、07 补给小物为布置依据。矮植不采用。

## 新素材

内置 imagegen 生成细铁链，原图 wall-chain-source.png 保留，wall-chain.png 仅按透明边界裁切。wall-chain.json 记录画布尺寸和实测两端固定环中心，运行时按环位刚性旋转、统一缩放，与实际墙柱跨度对齐。没有拉伸链环。

Generation prompt: Create ONE isolated transparent game sprite of the delicate dark iron decorative wall chain from the reference. ONLY a thin hanging chain and its two SMALL circular mounting eyelets; no stone wall, no background, no flags, no lights. Long chain with approximately 26 to 32 small slender oval links, muted weathered dark blue-gray iron, subtle cold highlights, hand painted detailed game art matching reference. Overall chain runs from lower left to upper right at an 18.5 degree upward screen slope; small wall mounting rings at both ends lie on that baseline, the middle hangs gently below it in a shallow catenary. Crucial scale: mounting rings each no larger than 4 percent of the full ring-to-ring span, chain links each roughly 3 percent span long and 1.5 percent span thick. Chain must look light and fine compared with a person or wall post, never oversized mooring chain. 45 degree orthographic camera, soft light upper left, small traces of frost only. Wide landscape canvas with entire chain fitting comfortably and generous transparent padding. Genuinely transparent alpha, no cast shadow, no glow or colored halo, no other objects, no labels.

## 布置

- 围栏与挂件共同使用 parapetRuns/parapetBays，读取同一套实际分段、裁切和柱位数据。
- 蓝旗居于实墙面板中间；细链连接相邻实际柱位；壁灯固定在柱侧，附低亮度暖色光晕。
- 小冰晶、雪堆、零石按概念图成组，后侧靠墙；前侧按围栏遮挡适当向内退让。
- 基地补给区追加一组矮箱，与绳圈及折叠篷布共同布置；地面小物有轻微接触阴影。
- 保留中央通道与高草边界。12 种静态小物仍按材质合批，另有墙面暖光、接触阴影两个批次。

验证：生产构建、5 个测试文件 14 项测试通过；包含链环端点等高与真实柱距、旗帜中点、草区避让、资源释放和围栏拼接。浏览器检查外塔与基地，控制台无错误。截图在 docs/visual-validation/2026-10-16/concept-detail-pass/。
