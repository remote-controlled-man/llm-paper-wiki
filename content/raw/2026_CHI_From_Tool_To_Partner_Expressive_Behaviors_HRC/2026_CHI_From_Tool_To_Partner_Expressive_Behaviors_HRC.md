---
type: paper
title: "From Tool to Partner: Expressive Behaviors as the Bridge to Human-Robot Creative Collaboration"
slug: "2026_CHI_From_Tool_To_Partner_Expressive_Behaviors_HRC"
year: 2026
venue: "CHI '26"
status: read
priority: P0
category: "Robot behavior and HRI expression"
pdf: "2026_CHI_From_Tool_To_Partner_Expressive_Behaviors_HRC.pdf"
tags:
  - paper
  - chi
  - interaction-models
  - robot-behavior
primary_area: "05_Robotics_and_HRI"
created: 2026-05-30
---

# From Tool To Partner Expressive Behaviors HRC

原文 PDF： 未随本站公开（版权原因）

所属分类：机器人行为与 HRI 表达

阅读状态：已速读

## 为什么要读这篇

- 这篇是“具身 interaction model”的核心论文之一：它研究同样的机器人能力下，仅改变表达性行为，用户是否会从“把机器人当工具”转向“把机器人当伙伴”。
- 对我们做 embodied agent 很重要，因为 agent 的 planning/feedback 如果只停留在屏幕或语音层，无法充分利用身体、空间、时序、姿态这些机器人独有通道。
- 它提供了一组可落地的机器人行为 primitives：Hello、Invite、Inquiry、Waiting、Wave、Bye，以及这些行为应该在什么交互阶段触发。

## 三句话快速总结

1. 论文比较了功能型机器人协作和表达型机器人协作：两者技术能力一致，但表达型机器人会在开始、等待、交接、犹豫、结束等时刻做社会性动作。
2. N=18 主实验显示，表达性行为显著提升伙伴感、支持感、协作愉悦、节奏同步、团队流畅度，并让作品更像“共同创作”而不是两边各画各的。
3. 关键不是机器人更自主，而是“表达 + 时机 + 用户控制权”共同改变人的关系模型：从 command-response 工具变成 negotiated agency 的伙伴。

## STAR 速读

### S - Situation

很多创作型机器人系统已经能画、能生成、能执行，但交互还是命令-响应：人给目标，机器人执行。这会让机器人看起来像高级工具，而不是共同创作者。

人在真实协作里会靠身体、节奏、空间、眼神/朝向、停顿来形成共同理解。机器人如果有身体，却不利用这些通道，就浪费了具身系统最重要的交互能力。

### T - Task

作者问两个问题：

- 用户期待机器人创作伙伴有什么样的 expressive behaviors？
- 这些表达性行为如何影响共同创作体验，以及用户是否把机器人看成 creative partner？

### A - Action

作者做了两轮研究：

- Formative study：N=5，评估六个表达性行为的清晰度、自然度、适当性，并提炼设计要求。
- Main study：N=18，within-subject，比功能型条件 vs 表达型条件。两种条件的机器人绘画能力一致，差异主要是表达性行为。

机器人平台是 Dobot CR5 机械臂。创作流程使用生成式图像/轨迹 pipeline，但实验重点不是生成模型，而是机器人如何通过动作表达参与、等待、犹豫、认可和结束。

### R - Result

表达性行为显著提升协作质量：

- Partner perception：表达条件 5.11 vs 功能条件 3.22，p < .001。
- Support & encouragement：5.22 vs 3.11，p < .001。
- Collaborative enjoyment：5.50 vs 4.39，p = .008。
- Rhythm synchronization：5.33 vs 4.00，p = .003。
- Team fluency：4.89 vs 4.22，p = .048。

沟通质量里，最显著提升的是 timing fit：5.06 vs 3.94，p = .002。也就是说，身体表达最有效的地方不是“说更多信息”，而是让用户知道什么时候轮到谁、机器人是否在等、是否理解、是否准备行动。

创作体验也提升：

- Creative motivation：p = .011。
- Cocreation feeling：p = .044。
- Output creativity：p = .014。
- Joint contribution：p = .010。

作品分析也支持这个结果：表达条件下作品更 integrated，人和机器人笔触更容易交织；功能条件下更像各画各的、分区并行。

## 论文核心问题

- 要解决的问题：机器人如何从“执行工具”变成“协作伙伴”，这个转变是否可以通过表达性行为触发。
- 研究对象：人-机器人共同创作中的关系模型、身体表达、轮次交接、伙伴感。
- 重要性：对机器人公司来说，能力不是唯一变量。即使底层能力一样，机器人怎样动、什么时候动、动得像不像“在参与”，会显著改变用户体验。

## 方法与系统

- 系统/实验设计：Dobot CR5 机械臂共同绘画系统，功能条件 vs 表达条件；WoZ 触发表达动作以保证时机一致。
- 参与者或数据：formative N=5，主实验 N=18。
- 关键变量：机器人是否有 contextually appropriate expressive behaviors。
- 评估指标：communication quality、collaboration quality、creative experience、task experience、condition preference、作品空间/交织分析、访谈。

## 从 Interaction Model 角度看

- 人如何表达意图：人不只用语言表达，还通过画完后收手、停顿、看机器人、犹豫、靠近/远离工作区表达“轮到你/我不确定/我完成了”。
- 系统如何做 grounding / 指代消解：机器人通过点头、朝向作品、等待姿态、思考动作，回应用户的状态，让用户觉得机器人“看到了/理解了/正在考虑”。
- agent/机器人如何分配控制权：不是完全平权，而是 negotiated agency。用户保留最终控制权，机器人通过表达获得有限的共同创作 agency。
- 系统如何给反馈、解释或展示中间状态：表达性动作就是一种非语言反馈，比屏幕文字更适合身体协作。
- 对机器人行为设计的启发：行为要放在 transition moments，而不是打断用户专注动作；表达要有战略模糊性，能被解释为意图但不过度拟人。
- 对长期记忆/关系/隐私的启发：长期协作中，机器人可以学习用户喜欢的节奏、距离、表达强度和控制偏好，但不能用“伙伴感”掩盖用户控制权。

## 关键图表、公式和概念

- Figure 1：工具型并行工作 vs 伙伴型共同创作，是整篇论文最直观的概念图。
- Table 1：六类 expressive behaviors 的设计规范，建议转成我们的 robot behavior primitives。
- Figure 2：六类动作的轨迹演化，可作为动作设计参考。
- Table 4：Wizard Protocol，展示哪些用户 cue 触发哪些机器人 response。
- Figure 4：主实验量化结果，10/18 个指标显著偏向表达条件。
- Figure 5：偏好随情境变化。社交/休闲/伙伴感偏好 expressive，工作场景偏好 functional。
- Table 5：最关键，列出 robot behavior -> user attribution patterns。

## 对我们产品/研究的启发

- 可以直接借鉴的设计原则：表达性行为不应全天候乱用，要集中在开始、交接、等待、犹豫、完成、结束这些交互节点。
- 可以转成 harness policy 的规则：`behavior = f(phase, user_cue, task_context, user_focus, risk, desired_relationship_mode)`。
- 可以转成机器人行为库的行为：`hello`、`invite`、`inquiry`、`waiting_active_presence`、`appreciation_wave`、`bye`、`attention_shift_to_object`、`contemplative_pause`。
- 可以转成用户研究问题的假设：在社交/陪伴/共创任务里，表达性行为提升伙伴感；在工作/高效率任务里，过多表达可能降低效率感。

## 可落地的机器人行为库

从论文抽象出一层行为 primitive：

```text
Interaction Phase -> User Cue -> Robot Behavior -> User Interpretation

initiation
  user_orients_to_robot -> hello + invite -> robot is ready / invites me

human_turn
  user_active -> quiet_waiting -> robot respects my space
  user_pauses -> attentive_waiting / inquiry -> robot notices uncertainty

transition
  user_withdraws_hand -> orient_to_canvas -> robot knows it may act
  user_confident -> wave/nod -> robot approves / acknowledges
  user_hesitant -> inquiry -> robot is thinking / asking permission

robot_turn
  before_action -> contemplative_pause -> robot is planning
  after_action -> evaluative_scan -> robot reflects / seeks feedback

termination
  task_done -> bye -> interaction is closed
```

关键实现注意：

- `transition-focused expression`：只在交接点和等待期表达，避免打断用户专注。
- `strategic ambiguity`：动作不要过度字面化，留给用户进行社会性解释。
- `maintained agency`：必须有 stop、撤销、拒绝、重来、少表达等控制。
- `context-sensitive expression`：社交/陪伴/休闲提高表达；工作/效率/高风险降低无关表达。
- `spatial territory`：机器人要有等待区，主动让出人的工作空间。

## 我的阅读笔记

- 这篇和车载中间反馈论文形成一个组合：车载论文讲“agent 执行中如何用语言/视觉反馈保持透明”，这篇讲“具身机器人如何用身体行为维持关系和协作节奏”。
- 对 interaction models 的启发是：interaction model 不只是 turn-taking protocol，还包括 relationship mode。用户到底把系统看成工具、助手、队友、伙伴，会影响他们怎么分配控制权、怎么容忍错误、怎么解读动作。
- 不要把这篇理解成“机器人越拟人越好”。它的结论更精确：在合适场景、合适时机、保留用户控制权的情况下，表达性行为能促进伙伴感。
- 对我们产品最有价值的是 Table 4 + Table 5，可以直接作为第一版 embodied behavior policy 的设计参考。

