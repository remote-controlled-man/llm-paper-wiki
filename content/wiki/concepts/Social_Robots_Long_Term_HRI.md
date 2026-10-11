---
type: concept
title: "社交机器人与长期 HRI"
sources:
  - "[[raw/2023_CHI_How_To_Communicate_Robot_Motion_Intent_Scoping_Review/2023_CHI_How_To_Communicate_Robot_Motion_Intent_Scoping_Review|运动意图沟通 Scoping Review (CHI '23)]]"
  - "[[raw/2026_CHI_From_Tool_To_Partner_Expressive_Behaviors_HRC/2026_CHI_From_Tool_To_Partner_Expressive_Behaviors_HRC|From Tool to Partner：表达性行为 (CHI '26)]]"
  - "[[raw/2026_CHI_How_Humans_Naturally_Refer_To_Targets_HRI/2026_CHI_How_Humans_Naturally_Refer_To_Targets_HRI|人类如何自然指代目标 (CHI '26)]]"
  - "[[raw/2026_CHI_Privacy_Is_Not_One_Click_Robots_Changing_Boundaries/2026_CHI_Privacy_Is_Not_One_Click_Robots_Changing_Boundaries|Privacy is Not One-Click (CHI '26)]]"
  - "[[raw/2026_CHI_Beyond_Static_Instruction_AR_Robot_Training/2026_CHI_Beyond_Static_Instruction_AR_Robot_Training|Beyond Static Instruction：AR 机器人训练]]"
  - "[[raw/2026_CHI_Agentic_Audio_Moderator_Usability_Testing/2026_CHI_Agentic_Audio_Moderator_Usability_Testing|Agentic Audio Moderator RCT (CHI '26)]]"
created: 2026-10-11
updated: 2026-10-11
---

# 社交机器人与长期 HRI

## 定义

研究**人和机器人跨多次、跨场景持续交互**时产生的特殊问题：不只是单次任务的成功率，而是关系模型（工具/助手/伙伴）、沟通基础设施（双向意图传达）、随时间演化的边界（隐私、记忆、控制权）如何共同决定交互质量。与一次性 lab 实验的 HRI 相比，长期 HRI 的核心难点在于：用户会改变、环境会改变、边界需要反复协商，而"一次设置永久生效"的静态模型全线失效。

## 研究主线（本库跟踪的问题）

> 具身机器人要从"能完成任务的设备"变成"能长期共处的伙伴"，中间缺的不是能力而是三层基础设施：双向意图传达（机器人让人知道它要做什么；机器人听懂人指的是什么）、关系性行为设计（何时表达、表达多少、谁掌握控制权）、以及随时间演化的隐私与边界协商。LLM 能跑通对话流程，但这三层都不自动解决。

## 方法分类与代表工作

这条技术线的方法可以分成四类，恰好对应长期 HRI 的四个侧面：

- **设计空间综述（把模糊词拆成可枚举维度）**：[[raw/2023_CHI_How_To_Communicate_Robot_Motion_Intent_Scoping_Review/2023_CHI_How_To_Communicate_Robot_Motion_Intent_Scoping_Review|运动意图沟通 Scoping Review]] 综述 77 篇论文、抽取 172 个 intent，提出 `Robot(kind) -> Intent(type, information, location) -> Human(role)` 模型：四种人类角色（Collaborator/Observer/Coworker/Bystander）× 四种意图（Motion/Attention/State/Instruction）× 空间注册方式 × 呈现位置。它把 "robot 要让人理解它" 从美学问题变成查表问题：先定人的角色，再定传什么、怎么传。
- **因果对照实验（行为操纵 → 关系量表）**：[[raw/2026_CHI_From_Tool_To_Partner_Expressive_Behaviors_HRC/2026_CHI_From_Tool_To_Partner_Expressive_Behaviors_HRC|From Tool to Partner]] 让机器人绘画能力保持不变、只加减表达性行为，N=18 within-subject：伙伴感 5.11 vs 3.22（p<.001），提升最大的是 timing fit——身体表达的价值不在"说更多信息"，而在"让人知道什么时候轮到谁"。这是目前本库内"关系可以被行为设计改变"最直接的因果证据。
- **自然行为数据 + heuristic（人机反向通道）**：[[raw/2026_CHI_How_Humans_Naturally_Refer_To_Targets_HRI/2026_CHI_How_Humans_Naturally_Refer_To_Targets_HRI|人类如何自然指代目标]] 收集 2,430 条自然多模态指令，证明 21.7% 的指令没有对象属性、只靠 this/that 指代；gaze 是最强目标信号但不稳定，需要 hand/head/speech timing 锁定"哪一段 gaze 真在看目标"。机器人理解指令的第一步不是 planning，而是 multimodal target grounding。
- **参与式设计 / 系统实现（长期约束的落地）**：[[raw/2026_CHI_Privacy_Is_Not_One_Click_Robots_Changing_Boundaries/2026_CHI_Privacy_Is_Not_One_Click_Robots_Changing_Boundaries|Privacy is Not One-Click]] 用两轮工作坊（14 位老年人）证明隐私是动态、情境化、可反复协商的实践，提出隐私模式预设 / 实时传感器反馈 / 实体可验证的数据所有权三类机制，覆盖物理-心理-社交-信息四个维度；[[raw/2026_CHI_Beyond_Static_Instruction_AR_Robot_Training/2026_CHI_Beyond_Static_Instruction_AR_Robot_Training|Beyond Static Instruction]] 则用 AR 机器人训练系统（N=36 可用性研究）说明个体差异常态化，并给出一个"确定性分析器 → 结构化事件 → LLM 教学决策 → 受约束 JSON 干预"的分层 harness 草图——注意其 multi-agent 部分是 proposed 架构，尚未验证。

## 演进脉络与关键转折点

- **第一层是通道（2023）**：运动意图综述把 robot→human 的沟通建成设计空间。没有这一层，后续所有"表达""协作"都无从设计。
- **第二层是关系（2026）**：From Tool to Partner 是转折点——它证明关系模型（tool vs partner）不是用户固有态度，而是可以被**表达性行为 × 时机 × 保留用户控制权**操纵的因变量。这把长期 HRI 从"拟人化偏好之争"变成可工程化的行为 primitives 问题。
- **第三层是时间（2026 同期）**：一旦交互跨场景持续，隐私、个体差异、信任的问题浮出。Privacy is Not One-Click 指出 consent 必须 renewing；Audio Moderator RCT 给出反向证据——LLM+prompt+voice 已经能**主持完整流程**，但社交存在感、插话时机、信任舒适感仍显著弱于人类（[[raw/2026_CHI_Agentic_Audio_Moderator_Usability_Testing/2026_CHI_Agentic_Audio_Moderator_Usability_Testing|Agentic Audio Moderator]]，N=60 RCT）。"能跑流程"与"能维持关系"之间的落差，正是这条技术线当前最清晰的待填沟壑。

## 已知矛盾 / 争议

- **拟人化的剂量问题**：From Tool to Partner 的结论不是"越拟人越好"——表达要集中在 transition moments、保留 strategic ambiguity、且用户场景偏好分裂（社交/休闲偏好表达型，工作/效率场景偏好功能型）。表达性行为是策略，不是装饰。
- **个性化 vs 隐私的张力**：长期适应要求机器人持续感知和记忆，但感知越多、四维隐私（物理/心理/社交/信息）的边界越复杂。静态一次同意模型与动态协商模型在工程上互斥，目前只有设计研究支持后者，没有量化验证。
- **lab 证据的外推风险**：自然指代研究在 VR 中完成、peak-interval 是 rule-of-concept；表达性行为实验用 WoZ 保证时机；AR 训练的 multi-agent 框架未集成。这条线的所有强结论都还没有在真实长期部署中复验过。

## 开放问题 / 观察触发器

- [ ] 真正的**长期**证据缺失：现有实质笔记全是一次性 session。周/月级的关系演化、倦怠、依赖、信任衰减曲线，本库还没有任何量化数据。出现 longitudinal field study 即 ingest。
- [ ] 行为 primitives 的跨场景泛化：Hello/Invite/Waiting 在共同绘画中有效，迁移到家务、护理、教育场景是否仍然成立？Figure 5 的场景偏好分裂提示大概率不直接成立。
- [ ] grounding 前端的 schema 共识：gaze/hand/speech timing → `InteractionState` → LLM 的分层接口尚无标准表示，是本库 interaction model 工作可直接切入的缝。
- [ ] 隐私 runtime policy 的工程化：`privacy_mode = f(location, activity, bystanders, sensor_state, urgency, ...)` 状态机的可审计性、emergency override 的误用与自动过期机制，需要从设计研究走向实现。
- [ ] 脆弱人群边界：dementia 护理、心理健康陪伴、老年陪护方向的论文已入库多本，但笔记均为占位（未读），本页暂不引用；这些场景把"伙伴感"和伦理风险的冲突推到最尖锐，是下一步精读候选。
