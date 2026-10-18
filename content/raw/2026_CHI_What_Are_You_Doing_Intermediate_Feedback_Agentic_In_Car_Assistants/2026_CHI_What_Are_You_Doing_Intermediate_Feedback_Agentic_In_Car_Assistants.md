---
type: paper
title: '"What Are You Doing?": Effects of Intermediate Feedback from Agentic LLM In-Car Assistants During Multi-Step Processing'
slug: "2026_CHI_What_Are_You_Doing_Intermediate_Feedback_Agentic_In_Car_Assistants"
year: 2026
venue: "CHI 2026"
doi: "10.1145/3772318.3790997"
status: read
priority: P1
category: "Agent harness, transparency, and control"
pdf: "2026_CHI_What_Are_You_Doing_Intermediate_Feedback_Agentic_In_Car_Assistants.pdf"
primary_area: "04_Human_AI_Interaction"
tags:
  - paper
  - chi
  - interaction-models
  - agent-harness
created: 2026-05-30
---

# What Are You Doing Intermediate Feedback Agentic In Car Assistants

原文 PDF： 未随本站公开（版权原因）

所属分类：Agent Harness：控制与透明度

阅读状态：未读
阅读状态：已速读

## 为什么要读这篇

- 这篇直接回答一个 agent/机器人产品都会遇到的问题：当系统在执行多步任务、调用工具、推理、等待外部接口时，用户到底应该看到什么。
- 对我们做 embodied agent 很关键：机器人不能像后台脚本一样沉默，因为沉默会破坏 grounding、信任和可干预性。
- 它把“中间反馈”拆成可实验验证的 interaction policy：不只是说“我在处理”，而是告诉用户“我计划做什么”和“每一步做到哪了”。

## 三句话快速总结

1. 论文比较了两种车载 LLM agent 反馈方式：只在最后给结果（NI） vs. 执行中持续给 planning + intermediate results（PR）。
2. N=45 的车内模拟实验显示，中间反馈显著提升感知速度、用户体验、信任，并且降低任务负担，尤其降低 frustration。
3. 用户并不是永远想要啰嗦的 agent：早期需要高透明度建立信任，可靠性被证明后可以降 verbosity，但遇到新任务、歧义、高风险动作时要重新提高透明度。

## STAR 速读

### S - Situation

Agentic LLM assistants 做的事情越来越像一个小型执行系统：理解请求、分解任务、查联系人、读邮件、查电量、规划路线、调用外部工具。问题是这些步骤天然会带来几秒到几十秒的延迟。如果系统只说一句“我在处理”然后沉默，用户不知道它听懂没有、做到哪一步、是否跑偏。

在具身机器人场景里，这个问题更严重：机器人有身体动作、空间移动和潜在安全风险。沉默执行会让用户无法判断机器人是在思考、卡住、忽略自己，还是准备做某个动作。

### T - Task

作者要回答三个问题：

- 中间反馈是否会改善等待体验、信任、工作负荷和整体体验？
- 任务复杂度/时长、驾驶这种双任务场景，会不会改变反馈偏好？
- 长期使用时，反馈 verbosity 应该怎么自适应？

### A - Action

作者做了一个 2x2x2 的车载模拟实验，45 名参与者，每人完成 8 个任务。

- Feedback Timing：NI（No Intermediate Feedback，只最后说结果） vs. PR（Planning & Results，执行中说计划和中间结果）。
- Task Duration：中等任务 26 秒/3 步 vs. 长任务 45 秒/6 步。
- Interaction Context：静止单任务 vs. 驾驶中双任务。
- 指标：Perceived Speed、NASA-RTLX task load、UEQ+ user experience、S-TIAS trust，再加 45 个半结构访谈。

PR 示例不是空泛进度条，而是内容型更新：找到联系人、从邮件里找到地址、检查电量、如果低于阈值就找充电站、加入路线。

### R - Result

中间反馈整体胜出：

- 感知速度显著提升，large effect：p < .001, dz = 1.01。
- 用户体验提升，medium effect：p = .002, dz = 0.54。
- 信任提升，small effect：p = .042, dz = 0.38。
- 任务负担降低，small effect：p = .034, dz = -0.26，主要来自 frustration 下降。
- 长任务下，中间反馈能缓冲“等太久”的负面感受。

访谈给出 5 个很适合转成产品规则的主题：

- T1：长期 verbosity 要由 learned trust gating。可靠性被证明后，反馈可以变短。
- T2：外部情境要适配，例如音乐、播客、乘客、对话。
- T3：内部任务因素要提高透明度，尤其是歧义、新任务、高 stakes 行为。
- T4：用户需要轻量控制，例如 mute / 少说点 / 展开更多。
- T5：逐步 chunking 比最后一次性 dump 更轻负担。

## 论文核心问题

- 要解决的问题：agent 在多步处理期间应不应该给中间反馈，给什么反馈，什么时候减少或增加反馈。
- 研究对象：人和 agentic LLM voice assistant 的等待、监督、信任关系。
- 重要性：agent harness 不只是 action executor，还要有 progress communication layer，否则用户没有可见的执行模型，也很难及时纠错。

## 方法与系统

- 系统/实验设计：车载语音 agent + visual tablet feedback + lane keeping driving task。
- 参与者或数据：45 名参与者，来自汽车公司，年龄 18-64。
- 关键变量：反馈时机（NI/PR）、任务时长（26s/45s）、交互情境（静止/驾驶）。
- 评估指标：perceived speed、UEQ+、NASA-RTLX、S-TIAS、访谈主题分析。

## 从 Interaction Model 角度看

- 人如何表达意图：一句复杂自然语言里包含多个 intent 和条件，例如“找联系人邮件里的地址，如果电量低于 10% 就加充电站”。
- 系统如何做 grounding / 指代消解：不是只在开头确认“我听到了”，而是持续给 understanding-level feedback：我找到了谁、读到了哪个地址、判断电量会怎样。
- agent/机器人如何分配控制权：低风险例行动作可以自动做；歧义、高风险、涉及联系人/邮件/路线/安全时要确认或给可中断窗口。
- 系统如何给反馈、解释或展示中间状态：内容型中间反馈优于空泛 progress cue。计划、步骤、关键中间结果都应该进入 feedback stream。
- 对机器人行为设计的启发：机器人长动作/多步动作不能沉默执行。应该用语音、灯效、屏幕、姿态或动作暂停点表达“正在做什么”和“下一步是什么”。
- 对长期记忆/关系/隐私的启发：记住用户偏好的 verbosity 是长期个性化的一部分，但 verbosity 降低必须由可靠性和用户信任驱动，且可以回退。

## 关键图表、公式和概念

- Table 1：三类自变量，NI/PR、medium/high duration、stationary/driving。
- Figure 4：最值得看，展示了 NI 和 PR 在 26 秒/45 秒任务里的输出时间线。
- Figure 6：核心结果图，PR 在速度、信任、体验、负担上都优于 NI。
- Figure 7：中间反馈缓冲长任务对感知速度的损害。
- 核心概念：ambiguous silence、content-bearing intermediate updates、learned-trust-dependent verbosity adaptation、internal vs external situational adaptation。

## 对我们产品/研究的启发

- 可以直接借鉴的设计原则：长任务、多工具调用、多 intent 任务必须有中间反馈；反馈要说明内容，不只说“处理中”。
- 可以转成 harness policy 的规则：`feedback_verbosity = f(task_duration, uncertainty, novelty, stakes, user_trust, external_context, user_override)`。
- 可以转成机器人行为库的行为：`announce_plan`、`announce_step_result`、`pause_for_confirmation`、`mute_progress`、`expand_detail_on_request`、`recover_transparency_after_error`。
- 可以转成用户研究问题的假设：对新用户，高透明度会提升信任；对熟练用户，重复任务降低 verbosity 会提升效率；高风险任务即使熟练也需要重新提高透明度。

## 对 Agent Harness 的落地结构

建议在 harness 里单独抽一个 `IntermediateFeedbackPolicy`，不要把它写死在 agent prompt 里。

```text
UserRequest
  -> TaskDecomposer
  -> Risk/Novelty/Ambiguity Estimator
  -> Tool Execution Plan
  -> IntermediateFeedbackPolicy
      - when_to_speak
      - what_to_reveal
      - modality: voice / screen / light / gesture / haptic
      - verbosity_level
      - interruptibility
  -> ExecutionMonitor
  -> UserOverride / Repair Loop
```

关键状态：

- `task_duration_estimate`
- `step_count`
- `tool_latency`
- `confidence / ambiguity`
- `stakes`
- `user_trust_proxy`：接受率、打断率、纠错率、撤销率、重复确认率。
- `context_load`：驾驶、谈话、音乐、专注任务、旁人在场。
- `user_feedback_preference`

## 我的阅读笔记

- 这篇应该放在我们 interaction model 路线里非常靠前的位置，因为它把“agent 如何在执行中对人可见”讲得很实用。
- 它和上一篇确认频率论文是互补的：确认频率回答“什么时候让用户检查/确认”，这篇回答“系统在没让用户确认时也应该怎么持续暴露执行状态”。
- 对机器人来说，中间反馈不一定都要靠语言。机器人可以用短语音、眼神/朝向、状态灯、屏幕卡片、动作阶段性停顿来表达同样的结构。
- 需要警惕：论文场景是 26-45 秒任务，不一定适用于几分钟到几十分钟的 deep research / 长程任务。长程任务可能需要转成后台任务 + 里程碑通知。

