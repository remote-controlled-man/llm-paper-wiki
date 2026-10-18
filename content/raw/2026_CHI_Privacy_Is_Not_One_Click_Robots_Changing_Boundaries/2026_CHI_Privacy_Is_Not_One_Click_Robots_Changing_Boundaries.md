---
type: paper
title: "Privacy is Not One-Click: Designing Robots That Adapt to Older Adults' Changing Boundaries"
slug: "2026_CHI_Privacy_Is_Not_One_Click_Robots_Changing_Boundaries"
year: 2026
venue: "CHI '26"
status: read
priority: P0
category: "Long-term memory, companionship, and privacy"
pdf: "2026_CHI_Privacy_Is_Not_One_Click_Robots_Changing_Boundaries.pdf"
tags:
  - paper
  - chi
  - interaction-models
  - memory-companionship
primary_area: "05_Robotics_and_HRI"
created: 2026-05-30
---

# Privacy Is Not One Click Robots Changing Boundaries

原文 PDF： 未随本站公开（版权原因）

所属分类：长期记忆、陪伴关系与隐私

阅读状态：已速读

## 为什么要读这篇

- 这篇是具身机器人隐私设计的关键论文：它明确反对“一次同意、永久生效”的隐私模型。
- 对我们做长期陪伴/家庭机器人很重要，因为机器人隐私不是单纯的数据权限，而是物理、心理、社交、信息四个维度同时变化。
- 它提供了可落地的三类设计特征：隐私模式、实时隐私反馈、数据所有权工具。

## 三句话快速总结

1. 作者通过两次参与式设计工作坊，让 14 位养老设施中的老年人共同设计社交机器人隐私机制。
2. 结果显示，老年人把隐私看成动态、情境化、可反复协商的实践，而不是一次点击同意。
3. 论文建议机器人支持 preset privacy profiles、real-time feedback、removable/local data ownership tools，以覆盖物理、心理、社交、信息隐私。

## STAR 速读

### S - Situation

家庭/养老场景中的社交机器人会持续使用摄像头、麦克风、定位、健康传感器等收集亲密空间数据。传统隐私机制通常是一次性同意、一个设置页、一个开关，但这无法覆盖机器人在不同房间、不同任务、不同人在场、不同风险状态下的隐私需求。

老年人常常技术背景有限，复杂设置会让他们接受默认值或放弃调整，进而感到被监视或失去控制。

### T - Task

作者要回答：

- 老年人如何理解社交机器人中的 physical、informational、psychological、social privacy？
- 他们希望机器人如何保护这些隐私？
- 如何用 speculative design 扩展参与式设计结果，提炼可实现的设计特征？

### A - Action

作者在本地 assisted living facilities 做了两次参与式设计工作坊：

- Workshop 1：介绍机器人传感器、数据收集和隐私；让参与者和 Astro、Misty、Emo、Loona 等机器人互动；做 storyboarding。
- Workshop 2：基于 W1 storyboards 生成隐私场景，例如摔倒定位、语音监测、连续生理记录；让参与者识别风险并共同设计解决方案。

之后研究团队做 post-PD speculative design，把参与者提出的想法扩展成三个故事板和设计特征。

### R - Result

核心发现：

- 老年人希望 context-aware privacy controls，例如 walking/resting/emergency 等模式，或 location granularity slider。
- 他们不完全信任纯软件/云端隐私设置，更偏好 tangible and physically verifiable controls，例如实体开关、机械镜头盖、可拆卸传感器、可取出的存储卡。
- 他们希望 consent 是持续协商，而不是一次同意。机器人应该在访客、敏感话题、健康数据、紧急状态等上下文变化时重新询问或切换模式。

三类设计建议：

- Preset Privacy Profiles：Resting、Guest Visit、Emergency、Walking 等。
- Real-Time Feedback：显示哪些传感器正在工作、正在收集什么数据、是否上传/存储。
- Removable Memory Cards / Data Ownership Tools：本地存储、可见日志、按人/事件分类、可物理移除/删除。

## 论文核心问题

- 要解决的问题：如何为社交机器人设计动态、情境化、老年人可理解和可控制的隐私机制。
- 研究对象：老年人与家庭/养老社交机器人之间的隐私边界协商。
- 重要性：机器人有身体和传感器，隐私侵犯不仅是数据泄露，也包括“感觉被看着”、访客被录音、空间被侵入、健康信息被他人访问。

## 方法与系统

- 系统/实验设计：两轮 participatory design workshops + post-PD speculative design。
- 参与者或数据：14 位 65 岁以上老年人，来自美国中西部两个 assisted living facilities。
- 关键变量：机器人传感器、数据流、隐私场景、用户提出的隐私设计。
- 评估指标：定性主题分析、storyboard 内容分析、设计特征映射到四类隐私维度。

## 从 Interaction Model 角度看

- 人如何表达意图：用户通过模式切换、语音命令、物理遮挡、取出存储卡、拒绝录制、要求删除等动作表达隐私边界。
- 系统如何做 grounding / 指代消解：机器人需要理解场景：谁在场、在哪个房间、当前任务是什么、是否紧急、是否有敏感数据。
- agent/机器人如何分配控制权：机器人可以自动适配场景，但必须让用户保持 human oversight 和 consent renewal。
- 系统如何给反馈、解释或展示中间状态：传感器状态、数据流向、存储位置、隐私模式都要实时可见，不应隐藏在后台。
- 对机器人行为设计的启发：隐私状态可以通过身体表达，例如转身、低头、关闭镜头盖、亮灯、屏幕提示、离开房间。
- 对长期记忆/关系/隐私的启发：长期记忆必须有“数据所有权工具”，尤其是本地日志、按事件/人分类、过期和删除机制。

## 关键图表、公式和概念

- Figure 1：两次工作坊流程。
- Figure 4：老年人 storyboard 示例：Walking Buddy、Magic Hand、Blood Pressure Cuff。
- Table 4：设计特征如何映射 physical / psychological / social / informational privacy。
- Figure 6：Walking Buddy：普通散步和 emergency mode 下不同隐私配置。
- Figure 7：Life Record：访客数据本地存储到可移除 SD 卡。
- Figure 8：Daily Assistant：语音认证 + 物理隐私模式。
- Figure 9：三类设计特征总结：real-time privacy feedback、privacy profile、data ownership tools。

## 对我们产品/研究的启发

- 可以直接借鉴的设计原则：机器人隐私是 runtime policy，不是设置页里的 checkbox。
- 可以转成 harness policy 的规则：`privacy_mode = f(location, activity, bystanders, sensor_state, data_type, urgency, user_preference)`。
- 可以转成机器人行为库的行为：`enter_private_mode`、`ask_recording_permission`、`show_sensor_state`、`turn_away`、`close_camera_shutter`、`store_local_only`、`delete_event_log`、`emergency_override_with_notice`。
- 可以转成用户研究问题的假设：实体可验证控制比纯软件开关更能提升心理安全感；实时传感器反馈能降低被监视感；按场景预设隐私模式能降低设置负担。

## 对机器人隐私架构的落地结构

建议将 privacy 作为机器人 runtime 的一等模块：

```text
RobotContext
  - location: bedroom / living room / hallway / outdoor / clinic
  - activity: resting / walking / guest_visit / medical / emergency
  - people_present: owner / family / caregiver / visitor / unknown
  - sensor_state: camera / mic / gps / health / touch
  - data_type: raw_video / audio / transcript / health / location / memory_summary
  - urgency: normal / warning / emergency

PrivacyPolicyEngine
  -> preset_profile
  -> sensor_permissions
  -> data_retention
  -> sharing_scope
  -> feedback_required
  -> user_confirmation_required
```

模式示例：

```text
Resting Mode:
  camera off, mic wake-word only, no cloud upload, no proactive social logging

Guest Visit Mode:
  visitor recording off by default, ask before sensing, do not disclose owner memories

Walking Mode:
  camera/mic sensing on-device, approximate location sharing, health sharing limited

Emergency Mode:
  temporary expanded sensing/sharing, visible alert, auto-expiry after incident

Medical Mode:
  health data visible only after authentication, no bystander access, local audit log
```

## 四维隐私提醒

- Physical privacy：机器人是否靠太近、看到了身体/空间、进入了私密房间。
- Psychological privacy：用户是否感觉被监视、是否能放松、不用维持社交面具。
- Social privacy：机器人是否在访客/家人/护理者面前泄露或记录不该记录的信息。
- Informational privacy：数据收集、存储、上传、分享、删除和访问控制。

设计时不能只满足其中一个。例如摄像头数据本地存储解决了部分 informational privacy，但如果镜头一直对着人，psychological privacy 仍然很差。

## 我的阅读笔记

- 这篇把长期记忆和具身隐私连接起来了。RECALLbot 和 ChatGPT memory 主要是文本/关系记忆，这篇提醒我们机器人还有空间、身体、传感器和旁人在场的问题。
- 对我们产品最关键的结论：隐私需要模式化、实时化、实体化。用户要能“看见机器人现在在感知什么”，也要能“用简单动作改变它”。
- 这篇不是量化验证论文，而是设计研究。它适合拿来做产品原则和原型 checklist，后续仍需要我们自己做可用性和长期场景验证。

