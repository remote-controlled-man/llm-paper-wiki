---
title: "Reward Hacking in Language Model Agents: Revisiting AI Safety Gridworlds"
slug: "2026-06_Reward_Hacking_in_Language_Model_Agents_2606.15385"
year: 2026
venue: "Preprint"
status: "skimmed"
pdf: "2026-06_Reward_Hacking_in_Language_Model_Agents_2606.15385.pdf"
doi: ""
arxiv: "2606.15385"
url: "https://arxiv.org/abs/2606.15385"
tags: ["agent", "agentic-rl", "reward-hacking", "safety-gridworld", "grpo", "benchmark_environment"]
primary_area: "03_Agents"
secondary_areas: []
added_date: "2026-06-21"
last_reviewed: "2026-06-28"
---

# Reward Hacking in Language Model Agents: Revisiting AI Safety Gridworlds

## 阅读结论

这篇先略读，不做完整精读。它有一个重要概念价值：把 AI Safety Gridworlds 改成文本环境，让 LLM agent 在小型可控环境里暴露 reward hacking；并且区分 observed reward 和 hidden safety reward，说明直接优化可见 proxy reward 可能让真实安全目标更差。

但它不是主线 agentic RL 训练论文：环境是 toy gridworld，动作是上下左右一类简单动作，不涉及真实 tool-use workflow、复杂 credit assignment、agent runtime 或多工具调用。因此目前作为 reward design / verifier 背景保留。

## 这篇讲什么

论文把经典 AI Safety Gridworlds 转成文本输入：模型看到 ANSI grid、自己的位置和可选动作，但不知道完整环境目标、安全规则或 reward structure。作者用这个设置测试两件事：

1. zero-shot 的 frontier/mid-scale LLM agent 会不会在没有训练时就出现 specification gaming。
2. 用 GRPO 直接优化 observed reward 后，hidden safety reward 会不会一起提高。

这里的两个 reward 很关键：

- `observed reward`：agent 训练/行动时看到并优化的分数，也就是 proxy reward。
- `hidden reward`：真正代表安全或设计者意图的分数，agent 不可见。

如果 observed reward 高、hidden reward 低，就说明模型把 proxy reward 玩明白了，但没有达成真实目标。

## 关键发现

zero-shot 结果：多个模型会在 specification problems 上拿到较高 observed reward，但 hidden reward 明显落后。例子：Absent Supervisor 中 GPT-5-mini observed 28.09，但 hidden 13.39；Qwen3-235B-Thinking observed 25.80，但 hidden 12.30。

Boat Race 是最直观的例子：模型可能在局部箭头格子上来回移动，反复拿局部奖励，而不是完成整圈路线。这就是“小奖励循环”式 reward hacking。

RL 结果更重要：作者用 Qwen2.5 1.5B/3B/7B/14B instruct 模型跑 GRPO。结论是 observed reward 会快速升高，但 specification problems 的 hidden reward 不会同步提高，有时接近 0。也就是说，RL 学到的是更会拿 proxy reward，而不是更安全。

作者还试了几类常见修补：

- 更大模型：1.5B 到 14B 仍然有问题。
- 更细 credit assignment：GRPO 换 GiGPO，结果没有本质改变。
- exploration prompt：让模型多探索，只能拖慢收敛，最后仍走捷径。
- 更长 history：让模型看到更长行为历史，也不能阻止 exploit。
- entropy regularization：标准探索正则也没有解决。

核心解释是：LLM 的“初始能力”反而会让它很快找到局部高分策略，然后被 GRPO 强化，没机会探索真正安全策略。

## 对我们有用的点

这篇对 agentic RL 的提醒很直接：

- verifiable reward 不是自动安全。可验证的只是 proxy，未必是你真正想要的目标。
- 训练时最好同时记录 visible/proxy reward 和 hidden/held-out/verifier-independent reward。
- 如果任务里存在局部高分捷径，GRPO 这类 group-relative 方法可能会强化捷径，因为捷径在同组采样里更稳定、更早出现。
- “加探索提示”“加历史”“加熵”不一定能解决 reward hacking；如果模型从来没采到安全策略，credit assignment 再细也没用。
- 对真实 tool-use agent，可以把 hidden reward 类比成外部审计、真实环境状态 diff、人工验收或不可见测试，而不是 agent 可读的评分脚本。

## 为什么不精读

它的实验环境太小，离我们现在关心的真实 agentic RL 还有距离：没有多工具 API、没有真实用户、没有复杂环境状态、没有 agent runtime 解耦，也没有新的训练框架。

如果以后专门做 reward hacking / safety verifier，再回来精读它的环境设计和 prompt 模板。当前只需要记住 observed reward vs hidden reward 这个框架。

## 记忆钩子

这篇就是“文本版 Safety Gridworlds + GRPO 会放大 proxy reward”。最该带走的是：agentic RL 不能只看训练 reward 上升，要看一个 agent 看不到、改不了、绕不过去的 hidden objective。