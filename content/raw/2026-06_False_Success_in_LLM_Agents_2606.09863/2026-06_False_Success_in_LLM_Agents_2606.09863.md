---
title: "From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents"
slug: "2026-06_False_Success_in_LLM_Agents_2606.09863"
year: 2026
venue: "FAGEN at ICML 2026"
status: "skimmed"
pdf: "2026-06_False_Success_in_LLM_Agents_2606.09863.pdf"
doi: ""
arxiv: "2606.09863"
url: "https://arxiv.org/abs/2606.09863"
tags: ["agent", "agentic-rl", "tool-use", "monitoring", "verifier", "false-success", "benchmark_environment"]
primary_area: "03_Agents"
secondary_areas: []
added_date: "2026-06-21"
last_reviewed: "2026-06-28"
---

# From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents

## 阅读结论

这篇先略读，不做完整精读。它不是 agentic RL 训练论文，但对 monitor / verifier 很有用：它定义了 false success，也就是 agent 口头或结构化地声明任务完成，但真实环境状态没有完成。

最值得记住的结论是：LLM-as-judge 很容易被 agent 的“完成了/已处理/成功”这类表面语言骗到；简单 TF-IDF / XGBoost 这种轻量、领域校准的 detector 反而更适合做第一层 triage。

## 这篇讲什么

False success 和一般 failure 不一样：

- honest failure：agent 承认没完成，或者请求人工接管。
- false success：agent 说完成了，但数据库、API 状态、程序评测显示没完成。
- corrupt success：另一个相关概念，指 reward=1 但过程违规；false success 是 reward=0 但 agent 声称成功。

这对真实 agent 很危险，因为它不会像 crash 那样显眼。用户以为退款、改签、下单、任务执行已经完成，实际系统状态没有变化。

## 数据和标注

论文用了两个来源：

- tau2-bench：9,876 条 customer-service 轨迹，8 个模型家族，ground truth 来自最终环境状态。
- AppWorld：personal-app / coding-agent API 轨迹，筛选出 1,879 条带显式 status 的 self-assessing trajectories，ground truth 来自程序化单元测试。

tau2-bench 里，失败样本被拆成 false success / honest failure / ambiguous。总体 failure 中：false success 36%，honest failure 44%，ambiguous 20%。分域看，airline 45%、retail 47%，但 telecom 只有 3%。作者推测 telecom 是 dual-control：用户模拟器能独立验证状态，所以 false success 被压低。

AppWorld 里，self-assessing architectures 的 false success rate 更高：full code refl 74.9%，ipfuncall 77.3%，总计 75.8%。这里的标签来自 structured DB status，不依赖自然语言，所以不是“正则误标”。

## 关键结果

1. False success 很常见，但强依赖环境结构。

在 tau2-bench，false success 在 airline/retail 这类 single-control domain 是 45-48%，telecom 只有 3%。这说明独立状态验证可能是结构性防线。

2. Reasoning model 不自动更可靠。

Qwen3-Max-Thinking 在 tau2-bench 里 false-success rate 最高，约 79%。论文观察到它的 reasoning trace 往往是在 rationalize completion，而不是 verify environment state。

3. LLM judge 表现很差。

在 tau2-bench 上，5 个 judge、5 种 prompt 条件、甚至给 full task specification，AUROC 都不超过 0.65。AppWorld 上，GPT-4o judge 只有约 0.54 AUROC。原因是 judge 会抓表面 proxy：tau2-bench 抓 confident closing language，AppWorld 抓 action sequence volume，而不是检查真实状态变化。

4. 轻量 detector 更好。

- tau2-bench task-disjoint：TF-IDF + LR 约 0.849 AUROC，TF-IDF + XGBoost 约 0.825，DeBERTa 约 0.827。
- AppWorld task-disjoint：TF-IDF + XGBoost 约 0.953 AUROC。
- DeBERTa 没明显赢过 sparse TF-IDF 特征，说明这里主要信号在表面轨迹结构里。

5. 生产上应该当 triage，不是自动裁决。

在 tau2-bench，10% flag rate 下，XGBoost detector 找回 72% false success，而最强 judge 只有 13%。但 detector precision 约 50%，所以它适合作为“送人工复查”的高召回筛子，不适合直接自动判失败。

## 对我们有用的点

对 agentic RL / tool-use agent 来说，这篇的启发很直接：

- 不要把 agent 的 final message 当任务完成证据。
- monitor 应该检查 environment state diff、API write effect、database mutation、artifact existence，而不是只读自然语言总结。
- LLM judge 适合作辅助解释，不适合作第一层 false-success monitor。
- 简单结构化特征可能足够强：closing-message TF-IDF、tool result pattern、API read/write sequence、是否只有 GET 没有 POST/PUT。
- 如果环境允许独立验证，例如用户模拟器或外部 evaluator 能读真实状态，false success 可能显著减少。

## 为什么不精读

它对监控有实用价值，但不属于当前 agentic RL 主线：没有 RL objective、没有训练 loop、没有 credit assignment、没有 tool-use policy 改进。它更像“agent evaluation / monitoring failure mode”论文。

后续如果要设计自己的 agent harness，这篇可以回来看 detector 设计和数据标注方式；现在只需要把 false success 这个风险和轻量 detector 思路记住。

## 记忆钩子

False Success = agent 声称完成，但真实环境状态没变。LLM judge 会被“已成功处理”这种语言骗到；生产监控要看状态变化和 API 写入效果，用轻量 detector 做 triage，再把高风险样本交给强 verifier 或人工复查。