---
type: paper
title: "How to Communicate Robot Motion Intent: A Scoping Review"
slug: "2023_CHI_How_To_Communicate_Robot_Motion_Intent_Scoping_Review"
year: 2023
venue: "CHI '23"
doi: "10.1145/3544548.3580857"
status: read
priority: P1
category: "Foundations and surveys"
pdf: "2023_CHI_How_To_Communicate_Robot_Motion_Intent_Scoping_Review.pdf"
tags:
  - paper
  - chi
  - interaction-models
  - foundations
primary_area: "05_Robotics_and_HRI"
created: 2026-05-30
---

# How To Communicate Robot Motion Intent Scoping Review

原文 PDF： 未随本站公开（版权原因）

所属分类：基础综述

阅读状态：已速读

## 为什么要读这篇

- 这篇是机器人“动作意图沟通”的综述和分类框架，适合作为具身 interaction model 的底层基础。
- 它把 robot motion intent 从一个模糊词拆成可设计的维度：传给谁、传什么、用什么信息、放在哪里传。
- 对我们有直接价值：如果机器人要移动、抓取、递东西、避让、请求帮助，它必须让人提前理解“它接下来会做什么”。

## 三句话快速总结

1. 论文综述了 77 篇相关研究，提出一个 robot motion intent communication model：Robot -> Intent -> Human。
2. 作者指出“motion intent”不只是轨迹本身，还包括 attention、state、instruction 这些前置/后置意图。
3. 对产品设计最实用的结论是：先定义人的角色，再决定意图类型、信息形式和呈现位置，否则很容易做出看起来酷但不解决协作问题的反馈。

## STAR 速读

### S - Situation

机器人越来越多地和人共享物理空间。机器人移动、抓取、绕行、递东西时，如果人无法预测其运动意图，就会产生碰撞、误解、低效协作或不信任。

已有研究很多，但术语混乱：有人讲 motion intent，有人讲 situational awareness、forthcoming operation、robot signaling system。领域缺少统一语言。

### T - Task

作者要做一个 scoping review，回答：

- robot motion intent 到底包括哪些类型？
- 不同人类角色需要什么意图信息？
- intent 信息应该以什么形式、放在哪里传达？
- 目前研究有哪些规律和空白？

### A - Action

作者按 PRISMA-ScR 做综述：

- 初始数据库：ACM DL、IEEE Xplore、ScienceDirect。
- 初始检索 5,975 篇。
- 算法过滤后 822 篇。
- 摘要/全文筛选 + 引文补充后，最终语料 77 篇。
- 从论文中抽取 172 个 intent，开放编码得到 intent communication model。

### R - Result

核心模型：

```text
Robot(kind) -> Intent(type, information, location) -> Human(role)
```

人的角色有四类：

- Collaborator：和机器人同空间、同时间、同任务协作。
- Observer：监督机器人，必要时接管。
- Coworker：同空间但做不同任务，可能共享大目标。
- Bystander：同空间但和机器人没有共同任务。

意图类型有四类：

- Motion：机器人未来怎么动、往哪动、会操作哪个对象。
- Attention：先吸引人的注意，让人准备接收运动意图。
- State：机器人当前状态/感知/计划，让人推断后续动作。
- Instruction：机器人请求人配合，例如让开、开门、接物体。

信息维度：

- Spatial：registered in space（直接贴在空间/对象/路径上） vs unregistered in space（文字、符号、声音、灯）。
- Temporal：discrete（某个时刻出现/消失） vs continuous（持续可见）。
- Location：on-robot、on-world、on-human。

## 论文核心问题

- 要解决的问题：如何系统化地理解和设计机器人运动意图沟通。
- 研究对象：机器人向人传达 motion-related intent 的交互空间。
- 重要性：机器人是物理系统，错误理解会带来安全、效率、信任问题。运动意图沟通是具身 agent 的基础能力。

## 方法与系统

- 系统/实验设计：scoping review，不是单一实验。
- 参与者或数据：77 篇论文，172 个 intent。
- 关键变量：human role、robot kind、intent type、intent information、intent location。
- 评估指标：分类覆盖、研究分布、设计空间和研究空白。

## 从 Interaction Model 角度看

- 人如何表达意图：这篇主要研究 robot -> human，但提醒我们先定义 human role。不同角色代表不同需求和控制关系。
- 系统如何做 grounding / 指代消解：motion intent 的 grounding 要绑定空间、对象、路径、方向和时间。最清楚的是 registered in space 的信息。
- agent/机器人如何分配控制权：Collaborator 需要协调和交接；Observer 需要监督和接管；Coworker/Bystander 主要需要避让和安全预测。
- 系统如何给反馈、解释或展示中间状态：不要只显示路线。很多情况下要先吸引注意、暴露状态、给出指令，再传达运动本身。
- 对机器人行为设计的启发：运动意图可以通过路径投影、灯、屏幕、声音、头/眼/身体朝向、AR/HMD、空间标记等多种通道表达。
- 对长期记忆/关系/隐私的启发：长期系统可以学习不同人的角色和偏好，例如家庭成员/访客/同事/操作者看到不同粒度的 intent 信息。

## 关键图表、公式和概念

- Figure 1：四类 intent 的直观示例：Motion、Attention、State、Instruction。
- Figure 3：Intent Communication Model，是全文最重要的框架图。
- Figure 4：四类 human role：Collaborator、Observer、Coworker、Bystander。
- Table 2：不同 intent type 的论文/intent 数量分布。
- 核心概念：registered vs unregistered spatial information、discrete vs continuous temporal information、on-robot/on-world/on-human location。

## 对我们产品/研究的启发

- 可以直接借鉴的设计原则：设计机器人行为前，先问“这个人当前是什么角色”。角色决定目标：协作、监督、共存还是避让。
- 可以转成 harness policy 的规则：`intent_message = f(human_role, robot_kind, action_type, risk, spatial_precision_need, attention_state)`。
- 可以转成机器人行为库的行为：`attract_attention`、`show_path`、`show_target_object`、`show_robot_state`、`request_human_action`、`confirm_handover`。
- 可以转成用户研究问题的假设：空间注册信息比抽象符号更直观；组合 discrete + continuous 信息可能优于单一通道；不同人类角色需要不同粒度的 motion intent。

## 设计检查表

每个机器人动作前，都可以过一遍：

```text
1. Human role:
   collaborator / observer / coworker / bystander

2. Communication goal:
   support collaboration / support oversight / support coexistence

3. Intent type:
   attention / state / motion / instruction

4. Intent information:
   spatial: local / directional / description / symbol / signal
   temporal: discrete / continuous

5. Intent location:
   on-robot / on-world / on-human

6. Risk:
   collision risk / confusion risk / privacy risk / interruption risk
```

对 embodied agent harness 来说，这可以变成一个 `MotionIntentCommunicator`：

```text
PlannedAction
  -> HumanRoleClassifier
  -> IntentTypeSelector
  -> ModalitySelector
  -> MotionIntentRenderer
  -> HumanFeedbackMonitor
```

## 我的阅读笔记

- 这篇是基础框架，不像实验论文那样给一个“显著提升 xx%”的单点结论，但它能让我们之后读任何机器人行为论文时有分类坐标。
- 它能解释为什么上一篇 `From Tool to Partner` 里的 Waiting / Inquiry / Wave 很有效：那些动作不只是情绪表达，也是在传达 attention、state、instruction、turn transition。
- 对机器人产品来说，motion intent communication 应该是底层能力，不应只在“危险时提醒”。越早、越自然、越绑定空间，用户越容易形成可预测的机器人心智模型。

