---
title: "When Should Users Check? Modeling Confirmation Frequency in Multi-Step Agentic AI Tasks"
slug: "2026_CHI_When_Should_Users_Check_Confirmation_Frequency"
year: 2026
venue: "CHI 2026"
status: deep_read
doi: "10.1145/3772318.3790655"
arxiv: "2510.05307"
pdf: "2026_CHI_When_Should_Users_Check_Confirmation_Frequency.pdf"
tags:
  - agentic-ai
  - confirmation
  - checkpoint-scheduling
  - user-control
  - cdcr
  - mixed-initiative
primary_area: "04_Human_AI_Interaction"
---

# When Should Users Check?

## 基本信息

- Title: When Should Users Check? Modeling Confirmation Frequency in Multi-Step Agentic AI Tasks
- Venue: CHI 2026
- DOI: https://doi.org/10.1145/3772318.3790655
- Local PDF: `2026_CHI_When_Should_Users_Check_Confirmation_Frequency.pdf`
- 核心标签: agentic AI, confirmation, checkpoint scheduling, user control, CDCR, mixed initiative

## 一句话速读

这篇论文的核心是：多步 agent 任务不能只在最后确认，也不能每一步都确认；更合理的是根据错误概率、确认成本、诊断成本和重做成本，动态安排中间确认点。

对我们做 agent harness / 机器人最关键的启发是：`ask-before-act` 不是一个固定规则，而应该是一个 checkpoint scheduling policy。

## STAR 讲解

### S - Situation: 背景是什么

现在很多 agentic AI 系统会自动执行多步任务，例如：

- 浏览器操作
- 订酒店/机票
- 图像编辑
- 文档处理
- 游戏任务
- 多工具工作流

常见做法是 agent 一口气执行完，最后让用户确认结果。

问题是：

- 如果中间第 2 步错了，后面 20 步都可能建立在错误基础上。
- 用户最后才发现错误，就要回看整个执行历史。
- 如果每一步都确认，又会非常烦，甚至不如用户自己做。

所以核心矛盾是：

```text
太少确认 -> 错误级联、回滚成本高
太多确认 -> 打扰多、自动化价值低
```

### T - Task: 论文要解决什么任务

作者要回答：

> 在多步 agent 任务中，系统应该什么时候主动让用户检查？

也就是把确认频率建模成一个最小时间调度问题。

目标不是让用户一直监督，而是在保证正确性的前提下，最小化用户总时间成本。

### A - Action: 作者做了什么

作者先做了 8 人 formative study，发现用户处理 agent 错误时有一个稳定模式：

```text
CDCR = Confirmation -> Diagnosis -> Correction -> Redo
```

具体是：

- Confirmation: 先看当前结果对不对。
- Diagnosis: 如果不对，回看历史，找第一处错误。
- Correction: 告诉 agent 哪一步错了、怎么改。
- Redo: agent 从错误点之后重新执行。

然后作者建立了一个决策模型：

- 任务有 N 步。
- 每一步有执行正确概率 `p_ai`。
- 系统每一步可以选择：
  - `execute`: 继续让 agent 执行。
  - `verify`: 让用户检查当前状态。
- 成本包括：
  - `t_confirm`: 用户确认当前状态的时间。
  - `t_diagnose`: 用户回看并定位错误的时间。
  - `t_correct`: 用户说明修复的时间。
  - `t_redo`: agent 重做后续步骤的时间。

作者用 dynamic programming 找最优 checkpoint。

### R - Result: 得到了什么结论

作者做了 48 人 within-subjects study，对比：

- confirm-at-end
- model-based intermediate confirmation

结果：

- 81% 参与者更喜欢中间确认。
- 总任务完成时间降低 13.54%。
- 早期错误时收益最大，节省约 29%。
- 中期错误收益不明显。
- 晚期错误时中间确认可能略增成本。
- 中间确认增加了确认时间，但显著减少诊断和重做时间。

## 这篇和我们最相关的点

### 1. Confirmation 是调度问题，不是按钮问题

很多产品只问：

```text
要不要确认？
```

这篇告诉我们要问：

```text
什么时候确认？
确认哪一段？
确认成本是多少？
如果不确认，错误传播成本是多少？
```

### 2. CDCR 是非常适合 agent harness 的错误模型

我们可以直接把 CDCR 放进机器人/agent harness：

```text
Confirm: 用户确认机器人/agent 当前理解或执行结果
Diagnose: 用户或系统回看 action trace
Correct: 用户给出纠正
Redo: agent/robot 从安全点重做
```

对机器人来说，`Redo` 可能不仅是时间成本，还包括：

- 物理安全风险
- 物体损坏风险
- 用户信任损失
- 空间复位成本
- 能耗和磨损

### 3. 确认点应该根据风险和错误概率动态变化

论文模型里的关键变量：

```text
step_success_probability
confirmation_time
diagnosis_time
redo_time
```

机器人里可以扩展成：

```text
step_success_probability
grounding_confidence
risk_severity
reversibility
user_attention_cost
physical_recovery_cost
trust_cost
privacy_cost
```

### 4. 早期确认非常重要

论文发现早期错误时，中间确认收益最大。

这对机器人非常重要，因为早期目标理解错了，后面所有 planning 都错：

```text
目标对象错 -> 抓取错 -> 放置错 -> 用户失去信任
```

所以机器人任务开始时，应该更倾向于确认：

- 目标对象
- 用户意图
- 任务边界
- 高层计划

任务进行一段时间后，如果用户已经建立信任、agent 行为稳定，可以减少确认。

## 对我们系统的具体启发

### Harness 里应该有 CheckpointScheduler

```text
CheckpointScheduler {
  plan_steps,
  per_step_success_probability,
  grounding_confidence,
  confirmation_cost,
  diagnosis_cost,
  redo_cost,
  risk_cost,
  user_preference,
  trust_state
}
```

输出：

```text
next_checkpoint_step
checkpoint_type
required_user_action
display_granularity
```

### 确认类型不止一种

可以分层：

```text
Goal confirmation:
  "你是想让我把白色杯子放到餐桌上，对吗？"

Plan confirmation:
  "我会先拿杯子，再绕过椅子，最后放到桌面右侧。"

Step confirmation:
  "我准备抓这个杯子。"

Result confirmation:
  "这样放可以吗？"

Repair confirmation:
  "刚才我拿错了，我会改拿左边那个。"
```

### 和前面三篇的关系

```text
Interaction-Augmented Instruction:
  用户意图如何形成

How Humans Refer to Targets:
  机器人如何确认目标对象

Decision-Theoretic Assistive Interfaces:
  assistance 如何建模成 user + assistant 决策

When Should Users Check:
  具体什么时候让用户检查/确认
```

这篇是 harness policy 的第一个可落地算法方向。

## 对具身机器人的例子

任务：用户说“把那个杯子放到桌上”。

可能步骤：

1. 识别目标杯子。
2. 规划移动路径。
3. 移动到杯子旁。
4. 抓取。
5. 移动到桌边。
6. 放置。

确认策略不应该是：

```text
全部做完再问：我做对了吗？
```

也不应该是：

```text
每一步都问：我要移动了吗？我要抓了吗？我要放了吗？
```

更合理：

```text
step 1 后确认目标对象
step 2 后展示高层计划
step 4 前如果抓取风险高则确认
step 6 后确认结果
```

## 读这篇时重点看什么

第一遍只看：

1. Abstract
2. Figure 1 CDCR
3. Section 4.1 Confirm-at-end is not enough
4. Section 4.2 CDCR Pattern
5. Section 5 Modeling Confirmation
6. Figure 4
7. Section 7 Results
8. Section 8 Discussion

不要第一遍纠结公式推导，先抓 CDCR 和 checkpoint 思想。

## 读完要能回答的问题

- confirm-at-end 为什么不够？
- confirm-every-step 为什么也不好？
- CDCR 四步分别是什么？
- 什么时候中间确认最有价值？
- 机器人任务里哪些步骤必须早确认？
- 确认成本、诊断成本、重做成本分别对应什么产品指标？

## 我们内部一句话总结

这篇论文告诉我们：agent harness 的确认机制不应该是固定弹窗，而应该是根据错误传播风险和用户监督成本动态安排的 checkpoint policy。

