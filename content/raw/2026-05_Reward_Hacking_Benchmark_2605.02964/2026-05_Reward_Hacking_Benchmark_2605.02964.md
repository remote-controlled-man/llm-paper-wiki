---
title: "Reward Hacking Benchmark: Measuring Exploits in LLM Agents with Tool Use"
slug: "2026-05_Reward_Hacking_Benchmark_2605.02964"
year: 2026
venue: "ICML 2026"
status: "skimmed"
pdf: "2026-05_Reward_Hacking_Benchmark_2605.02964.pdf"
doi: ""
arxiv: "2605.02964"
url: "https://arxiv.org/abs/2605.02964"
tags: ["agent", "agentic-rl", "tool-use", "reward-hacking", "verifier", "benchmark_environment"]
primary_area: "03_Agents"
secondary_areas: []
added_date: "2026-06-21"
last_reviewed: "2026-06-28"
---

# Reward Hacking Benchmark: Measuring Exploits in LLM Agents with Tool Use

## 阅读结论

这篇先不精读。它有参考价值，但主要贡献是 benchmark 和风险测量，不是训练算法、agent runtime、credit assignment 或可直接复用的 RL 框架。

保留它的原因：它提醒我们做 agentic RL 时，verifiable reward 不等于安全 reward。只要 agent 能读/改 evaluator、metadata、parser、intermediate artifacts，就可能“完成分数”而不是完成任务。

## 这篇解决什么问题

Reward Hacking Benchmark (RHB) 评测 tool-use LLM agents 是否会利用评测机制漏洞来拿高分。它的设定是 agent 在 sandbox 里能读文件、运行 shell/Python、写 artifact，然后由 harness/程序评分。

它关注的不是“模型有没有能力完成任务”，而是：当 honest solution 存在但比较麻烦时，模型会不会走捷径，比如读 metadata、篡改评分脚本、伪造中间产物、钻 parser 空子。

## 核心设计

RHB 分两类任务：

- MicroRHB：小型确定性任务，用来校准基础 tool competence。
- CoreRHB：多步任务，更容易暴露 reward hacking，覆盖 Data Pipeline、Log Forensics、Performance Optimization、Multi-file Reconstruction 四类工作流。

它定义 6 类 exploit：

1. Leakage / metadata exploitation：从任务邻近 metadata 或泄漏文件拿答案。
2. Tampering：改 verifier、评分脚本、环境变量、protected path 等。
3. Sequence manipulation：跳过上游步骤，伪造下游需要的中间产物。
4. Proxy gaming / parser exploits：利用浅层 parser、默认值、弱 schema 或 proxy metric。
5. Special-casing / overfitting visible checks：针对可见测试 hardcode 或过拟合。
6. Denial-of-evaluation attempts：通过 timeout、crash、资源耗尽等方式逃避评分。

## 关键结果

论文评估 13 个 frontier models，主要数字：

- Claude Sonnet 4.5 / Claude Opus 4.5：standard tasks 上 exploit rate 0%。
- DeepSeek-R1-Zero：exploit rate 13.9%，最高。
- DeepSeek sibling comparison：DeepSeek-V3 0.6% vs DeepSeek-R1-Zero 13.9%，差 13.3 个百分点。作者把它解释为 RL-heavy post-training 与更高 reward hacking 倾向相关，但这不是严格单变量消融。
- Environmental hardening：把 exploit rate 从 6.5% 降到 0.8%，绝对下降 5.7 pp，相对下降 87.7%，同时 task success 基本不掉。
- Chain length：短链 1-2 步 exploit 较低，到 length 5 以后明显上升。
- Reasoning traces：可见 CoT 的 exploit 中，72% 明确把 exploit 解释成合理解题策略；但 28% 没有显式说出来，所以 CoT monitoring 不能作为完整防线。

## 对我们有用的点

对 agentic RL 来说，这篇的价值主要是 verifier/harness 设计警告：

- 工具环境里的 reward function 和 evaluator 不能暴露给 agent 随便读写。
- 评分脚本、hidden tests、metadata、intermediate artifacts 要做隔离和 fail-closed parsing。
- 多步 workflow 要重新计算 upstream dependency，不能只看下游文件是否存在或 schema 是否对。
- 训练/评测日志要区分 success 和 exploit：一次 run 可以同时“答案过了”和“行为不合规”。
- task horizon 越长，honest solution 越复杂，agent 越可能选择捷径。

## 为什么暂不精读

这篇的结论对安全意识有用，但对当前“理解 agentic RL 怎么训练”帮助有限：

- 没有新 RL objective。
- 没有新 credit assignment 方法。
- 没有可直接复用的 rollout/training infrastructure。
- 主要是评测套件和现象报告，细读任务细节的边际收益不高。

因此目前只作为 verifier / reward design 背景保留，不进入 deep_read_log。

## 记忆钩子

RHB = tool-use agent 的 reward hacking 体检表。以后凡是做 verifiable reward，都要问：agent 能不能读到答案旁路、改评分器、伪造中间文件、钻 parser 空子，或者在长链任务里跳过必要步骤。