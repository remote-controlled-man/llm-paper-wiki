---
title: "A Decision-Theoretic Representation of Assistive Interfaces"
slug: "2026_CHI_Decision_Theoretic_Assistive_Interfaces"
year: 2026
venue: "CHI 2026"
status: deep_read
doi: "10.1145/3772318.3791819"
pdf: "2026_CHI_Decision_Theoretic_Assistive_Interfaces.pdf"
tags:
  - assistive-interface
  - agent-harness
  - decision-theory
  - posg
  - control-allocation
  - user-model
primary_area: "04_Human_AI_Interaction"
---

# A Decision-Theoretic Representation of Assistive Interfaces

## 基本信息

- Title: A decision-theoretic representation of assistive interfaces
- Venue: CHI 2026
- DOI: https://doi.org/10.1145/3772318.3791819
- Local PDF: `2026_CHI_Decision_Theoretic_Assistive_Interfaces.pdf`
- 核心标签: assistive interface, agent harness, decision theory, POSG, control allocation, user model

## 一句话速读

这篇论文的核心是：assistive interface 不应该被看成“系统单方面优化界面”，而应该被建模成用户和 assistant 两个 agent 在不确定性下轮流观察、行动、更新状态、获得收益的序贯决策问题。

对我们做 agent harness / 具身机器人最关键的启发是：harness 的核心不是“让机器人更自动”，而是显式建模 `用户能做什么、assistant 能做什么、双方观察到什么、各自状态是什么、目标/收益是什么、什么时候由谁行动`。

## STAR 讲解

### S - Situation: 背景是什么

现在有很多 assistive interfaces：

- recommendation engine
- adaptive UI
- intelligent assistant
- mixed-initiative system
- shared autonomy robot
- context-aware application

它们看起来都在“帮助用户”，但术语、目标和方法非常分散。有人用 hand-crafted rules，有人用 user model，有人用 RL，有人用 LLM，有人只优化点击率，有人优化任务完成时间。

问题是：大家缺少一个共同语言去比较这些系统到底在帮什么、怎么帮、帮到什么程度、风险在哪里。

### T - Task: 论文要解决什么任务

作者要提出一个统一模型，用来描述 assistive interface。

它要回答：

- assistance 到底是什么？
- 用户和 assistant 分别能观察什么、做什么？
- assistant 怎么在不确定性下选择动作？
- adaptation、augmentation、delegation 这些词如何被精确定义？
- 这个模型能不能落成软件实现，而不只是理论？

### A - Action: 作者做了什么

作者把 assistance 建模成两个 agent 的序贯决策问题：

- `User`
- `Assistant`

它们共同处在一个 `Task` 环境里。

每一轮交互大致是：

```text
Task/User/Assistant 有当前状态
User 观察 task 和自己的状态
User 更新内部状态
User 采取动作
Task 状态变化
Assistant 观察 task/user 状态的一部分
Assistant 更新内部状态或 belief
Assistant 采取动作
Task 状态再次变化
进入下一轮
```

作者用 POSG（Partially Observable Stochastic Game）作为理论基础，但也强调实际系统通常需要降维或简化成 POMDP/MDP/heuristics 才能求解。

模型里最重要的对象：

- `Task state`: 当前任务环境，例如光标位置、目标物体、机器人当前状态。
- `User state`: 用户目标、能力、记忆、疲劳、偏好、认知状态。
- `Assistant state`: assistant 对用户和任务的 belief。
- `Observation function`: 用户/assistant 分别能看到什么。
- `Internal transition`: 观察后内部状态如何更新。
- `Policy`: 根据状态和观察选择动作。
- `External transition`: 动作如何改变任务状态。
- `Reward`: 什么算好结果，什么有成本。

### R - Result: 得到了什么结论

作者给出了一个共同语言，可以把不同 assistance 系统放到同一个框架里比较。

主要结论：

1. 单 agent 模型不够。
   - 如果把用户当环境噪声，会丢掉用户的策略、学习、纠正和适应行为。

2. two-agent 模型更适合 HCI/HRI。
   - 用户不是被动对象，而是有目标、有策略、有不完全观察的 agent。

3. 许多 assistive interface 概念可以被形式化：
   - adaptation
   - reactivity
   - augmentation
   - delegation
   - modulation

4. POSG 很强但难求解。
   - 真实系统应该用它做建模语言，再根据具体任务简化成可执行 policy。

## 关键概念解释

### 1. Assistance

论文定义 assistance 为：

```text
assistant 的行为旨在最大化 user 的累积 reward。
```

对我们来说，reward 不一定是数学公式，可以是：

- 任务成功
- 更少误操作
- 更少认知负担
- 更少打扰
- 更高安全性
- 更高信任校准
- 更低隐私风险

### 2. User 不是环境噪声

差的 harness 逻辑：

```text
用户说话 -> 系统解析 -> 系统执行
```

这等于把用户当输入源。

这篇论文的逻辑：

```text
用户有目标、状态、belief、策略
assistant 也有目标、状态、belief、策略
双方在 task 环境里互相影响
```

这对机器人尤其重要：用户会观察机器人行为，然后改变自己的行为。

### 3. Adaptation

系统在使用过程中改变自己的 policy，才叫 adaptive。

注意：一个离线训练好的模型，即使输入历史，也不一定是 adaptive。只要 deployment 中 policy 不更新，它仍然是 reactive。

对我们来说：

```text
根据用户长期偏好/纠错/授权边界更新 harness policy
```

才是真正的 adaptation。

### 4. Reactivity

系统 policy 固定，只是根据观察做反应。

例如：

```text
如果置信度低 -> 问澄清
如果风险高 -> 要确认
```

这是 reactive，不是 adaptive。但它仍然是产品里必要的一层。

### 5. Augmentation

assistant 让 task 进入用户自己无法达到的状态。

例子：

- 自动补全提供新候选。
- 机器人把用户够不到的东西拿过来。
- AI 生成用户自己无法快速生成的计划。

### 6. Delegation

某个任务用户和 assistant 都能做，用户把它交给 assistant 做。

例子：

- 用户可以自己点按钮，也可以让 agent 点。
- 用户可以自己收拾桌面，也可以让机器人收拾。

对 harness 最关键的是：

```text
delegation 必须有授权边界。
```

### 7. Modulation

用户动作不能直接改变 task，而必须经过 assistant 转译。

例子：

- 鼠标移动经过 gain function。
- 用户语音经过 robot controller。
- 用户手势经过 gesture recognizer 和 policy engine 才变成机器人动作。

机器人系统几乎天然有 modulation：用户无法直接控制机器人关节，所有动作都由系统 mediation。

## 这篇和前两篇的关系

前两篇回答：

```text
用户意图从哪里来？
如何把语言/手势/gaze/artifact 合成 instruction？
```

这篇回答：

```text
拿到 instruction 以后，assistant/harness 应该如何决定自己要不要行动？
```

结合起来就是：

```text
Multimodal signals
  -> AugmentedInstruction
  -> User/Task/Assistant state
  -> Harness policy
  -> suggest / clarify / confirm / execute / interrupt
```

## 对我们 agent harness 的直接落点

### 可以设计的核心状态

```text
TaskState {
  current_goal,
  candidate_actions,
  scene_state,
  robot_state,
  risk_level,
  task_progress
}

UserState {
  inferred_intent,
  expertise,
  preference,
  attention,
  trust_level,
  fatigue_or_emotional_context,
  authorization_boundary
}

AssistantState {
  belief_about_user_intent,
  belief_about_task,
  uncertainty,
  memory_retrievals,
  last_action,
  last_user_correction
}
```

### 可以设计的 action levels

```text
Observe      只观察
Suggest      提建议
Clarify      问澄清
Confirm      等用户确认
Execute      直接执行
Interrupt    主动打断/阻止
Delegate     接管某个子任务
Repair       解释并修复
```

### 简化版 harness policy

```text
if grounding_confidence < threshold:
    clarify()
elif risk_level == high:
    confirm()
elif action_is_delegated and within_authorization_boundary:
    execute()
elif user_state.indicates_need_for_help:
    suggest()
else:
    observe()
```

这还不是完整 POSG，但它吸收了这篇论文的核心思想：policy 要依赖 task/user/assistant 三类状态，而不是只依赖 LLM 输出。

## 对具身机器人的特别启发

机器人不是普通 UI。它有物理动作、空间位置、错误成本和安全风险。

所以这篇的 two-agent view 特别适合机器人：

- 用户会根据机器人靠近/停顿/转头改变自己的行为。
- 机器人动作会影响用户信任和安全感。
- 用户可能纠正、阻止、鼓励机器人。
- assistant 需要维护对用户目标和状态的 belief。

机器人 harness 不应该只是：

```text
LLM planner -> robot executor
```

而应该是：

```text
User model + Task model + Robot state + Policy gate + Behavior feedback
```

## 读这篇时重点看什么

第一遍只看：

1. Abstract
2. Introduction
3. Table 1
4. Section 4.2 Characterization of Assistance
5. Figure 2 / Figure 3
6. Section 5 Understanding Assistance across HCI
7. Section 8 Discussion

不要第一遍陷进 POSG 数学细节。

## 读完要能回答的问题

- 为什么把用户当环境噪声是不够的？
- user/task/assistant 三类 state 分别是什么？
- observation、policy、transition、reward 分别对应产品里的什么？
- adaptation 和 reactivity 有什么区别？
- delegation 和 augmentation 有什么区别？
- 机器人 harness 什么时候应该 clarify / confirm / execute？

## 我们内部一句话总结

这篇论文告诉我们：agent harness 的核心不是“自动化执行”，而是把用户和 assistant 都看成有状态、有策略、有不确定性的 agent，然后在每一步显式决定控制权、反馈和行动边界。

