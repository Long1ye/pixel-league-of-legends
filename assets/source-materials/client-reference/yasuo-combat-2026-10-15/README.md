# 亚索战斗交互：本地客户端解析记录

解析日期：2026-10-15。来源：`D:/Long1ye/英雄联盟(26)/Game/DATA/FINAL/Champions/Yasuo.wad.client`。

使用 CommunityDragon CDTB 1.3.0 读取 WAD 和 BIN；没有修改客户端或游戏逻辑。解析结果包括亚索主配置、基础皮肤、动画图和关联共享配置，共 21 个 BIN，84 个 SpellObject、65 个动画图条目、82 个特效定义和 54 个音效事件名。65 个条目包含组合节点，不能理解成 65 段独立动作；82 个特效包含表情、旧版和特殊模式资源，不能全部视为当前战斗资源。

## 可以参考的内容

| 交互 | 已找到的证据 | 对当前项目的建议 |
| --- | --- | --- |
| 普攻出手和命中分离 | `Attack_First/Attack2/Attack3/Attack4`；对应 `Yasuo_BA_trail_1..4` 与 `Yasuo_BA_hit_tar_01..04`；普攻 OnCast、OnHit 音效独立 | 挥刀轨迹跟随攻击者；只有命中目标时在接触点播放斩痕、受击闪光和命中音。不同攻击动作匹配不同刀轨，暴击另有反馈。 |
| 动作事件控制特效时机 | 前三段攻击的 ParticleEventData 设置 `mStartFrame=3`，其 `mTickDuration≈1/30` | 源动画名义时间约 0.10 秒触发刀轨，可参考其事件驱动结构。刀轨开始不是伤害命中时间，不能直接把该值当伤害帧。 |
| Q 普通刺击与 Q3 分离 | `Spell1A/B/C`、`Spell1_Wind`；`Q_hit_tar`、`Q_wind_hit_tar`、`Q_wind_ready_buff`；Q3Mis 有独立 FixedSpeedMovement，`mTracksTarget=false` | 普通 Q 强调剑尖刺入和各目标受击；Q3 强调独立向前运动、蓄风提示、命中与击飞。客户端资源不足以单独证明普通 Q 的贯穿算法，仍须由游戏判定实现。 |
| EQ 与 EQ3 独立表现 | `Spell1_Dash`、`Yasuo_Base_EQ_cas`、`Yasuo_Base_EQ3_cas`、`Yasuo_Base_EQ_SwordGlow`；`YasuoEQComboSoundHit_OnHit` | EQ 有自身的环形风切、刀光；EQ3 则有向上运动的 Tornado/Tornado_shape 发射器。应分别表现圆斩与旋风击飞，并给范围内每个命中目标反馈。具体伤害半径、结算时刻不能从粒子大小推算。 |
| E 穿越与命中分离 | `Yasuo_Base_E_Dash`、`Yasuo_Base_E_dash_hit`；正常基础皮肤 `Yasuo_base_E_timer1..5` | 冲刺轨迹挂在移动角色上，接触反馈挂在目标上；已穿过目标显示冷却环，帮助连续 E 选路。timer 粒子寿命不是可直接照搬的目标冷却规则。 |
| 风墙展开、持续、撞击分层 | `W_windwall_activate`、`W_windwall1..5`、`w_windwall_enemy_01..05`、`W_windwall_big_impact`；撞击含 wind_impact、flash 等层 | 先展开，再持续流动；敌我墙易区分；拦截成功在实际交点产生短促风爆和声音。五种资源不能仅凭名字断言为五帧或五段动画。资源存在也不能证明所有弹道的拦截规则。 |
| 风墙角色动作有方向变化 | `Spell2_BASE/Spell2_0/Spell2_90/Spell2_-90/Spell2_180/Spell2_-180`，`Spell2` 是组合节点 | 角色出手姿态应与施法方向一致，避免墙转了但身体动作未配合。这里只确认方向动作与组合结构，未还原混合权重或渲染结果。 |
| R 提示、突进、斩击、落地分层 | `R_indicator_beam`、`R_cantcast_beam`、`R_tar_marker_01/02`、`R_dash`、`R_slash_cas`、`R_tar_imp_01`、`R_impact_tar`、`R_land_tar`；状态有 `RIsAvailable/RKnockUpComboTar/RStun` | 强调可接大目标标记、瞬间到位、空中斩击、最终落地爆发；目标位置、受控状态和伤害反馈与阶段同步。无法据此还原服务端完整接 R 条件。 |
| 护盾触发反馈 | `Yasuo_Base_passive_activate`、`Yasuo_Base_Passive_Burst` | 被动触发可表现为角色轮廓护盾及短促爆发，和生命值受损反馈区分。 |

## 建议修改顺序

1. 统一普攻、Q、E、EQ 的命中事件：伤害、目标受击特效、音效和血条反馈由同一结算事件触发，空放不播放目标命中反馈。
2. 优先打磨 EQ/EQ3：区分圆斩与上升旋风，统一角色动作、实际范围及各目标受击/击飞时机。
3. 打磨 E：穿越命中反馈、停止位置和目标冷却环，让连续穿兵有明确反馈。
4. 打磨风墙：展开、稳定流动、消散，以及弹道接触处的拦截反馈和敌我识别。
5. 打磨 Q/Q3：刺击接触、蓄风就绪、旋风移动、命中击飞各有明确阶段。
6. 打磨 R：目标就绪提示、突进、空斩、落地同步；最后统一暴击、护盾和受击的反馈强度。

以上为基于已解析资源提出的实现建议，不代表已完成对当前项目实机的逐项差异审计。

## 证据与限制

- `source-manifest.json`：来源路径、文件 SHA-256、WAD 版本和解析条目数量。
- `combat-reference-index.json`：特效及其发射器、纹理引用、动画事件和音效事件的简明索引。
- `yasuo.bin.json`：技能、普攻、状态和角色配置。
- `skin0.bin.json`：基础皮肤特效及资源、音效关联。
- `animation-skin0.bin.json`：动画图、动作引用和事件。
- 其余 `shared-*.bin.json` 及长文件名 JSON：共享引用。精确源路径见清单。

已排除 `OLD`、`NightmareBot` 条目作为普通亚索交互的主要依据。客户端包含包装技能、历史字段和内部辅助数值，如部分 castRange 为 25000，不能直接当真实范围。粒子寿命、纹理尺寸和可视风圈不能等同判定时长/半径。这里只解析了配置和事件，未渲染骨骼动画、未解码音频，也没有获得服务端脚本，不能据此确认取消窗口、输入缓冲、完整攻击速度缩放、精确碰撞或平衡数值。

源码工具：[CommunityDragon CDTB](https://github.com/CommunityDragon/CDTB)。复现入口：项目 `scripts/inspect-yasuo-client-reference.py`，需要其指定位置的 CDTB 与哈希字典。
