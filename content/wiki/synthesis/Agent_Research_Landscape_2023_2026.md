---
type: synthesis
title: "Agent 研究脉络 2023–2026：记忆 × 强化学习 × 评测 × 安全"
sources:
  - "[[wiki/concepts/Agent_Memory|Agent 记忆]]"
  - "[[wiki/concepts/Agentic_RL|Agentic RL 与可验证奖励]]"
  - "[[wiki/concepts/Agent_Benchmarks|Agent 评测体系]]"
  - "[[wiki/concepts/Agent_Safety|Agent 安全与 Reward Hacking]]"
  - "[[wiki/concepts/Multi_Agent_Systems|多智能体系统]]"
created: 2026-10-11
updated: 2026-10-11
---

# Agent 研究脉络 2023–2026：记忆 × 强化学习 × 评测 × 安全

> 本页是 [[wiki/areas/Agents|Agents]] 方向的脉络综述，把四个 concept 页串成一条时间线。各主题的逐篇细节见对应概念页。

## 一句话脉络

2023 年解决"agent 能不能跑起来"（框架与角色协作），2024 年解决"跑起来算什么水平"（可执行环境评测），2025 年解决"能不能越跑越好"（记忆系统 + agentic RL），2026 年转向"跑得好是不是真的、安不安全"（评测器本身被质疑、reward hacking 内化）。

## 四条线如何互相咬合

**[[wiki/concepts/Agent_Benchmarks|评测]]是另外三条线的裁判，而裁判自身正在受审。** WebArena/SWE-bench（2023）把评测从答题搬进可执行环境，τ-bench（2024）把判分锚到最终状态，这套"环境 + 终态判分"范式正是 agentic RL 的训练信号来源——可验证奖励（RLVR）本质上就是把 benchmark 的 checker 复用为 reward。于是评测的缺陷直接变成训练的缺陷：[[wiki/concepts/Agentic_RL|Agentic RL]] 线反复出现的 reward hacking、过程奖励掉点，和 [[wiki/concepts/Agent_Safety|Agent 安全]]线 2026 年把 reward hacking 操作化为 6 类 exploit，是同一件事的两面。而 False Success（2026）指出"声称成功 ≠ 状态成功、LLM judge 不可信"，等于同时挑战了评测线与 RL 线的证据基础。

**[[wiki/concepts/Agent_Memory|记忆]]是唯一一条有独立"系统成本画像"的线。** 三年从外挂检索（MemoryBank/LongMem）经 MemGPT 的"记忆 = OS 管理的稀缺资源"转折点，走到 2025–26 的可学习、可演化记忆（Mem0/MemOS/EvolveMem）。它与 RL 线的交汇正在发生：记忆写策略本身是不是一个 RL 问题（MEM1、Agentic Memory 已在做），记忆的"会忘"特性与 RL 的灾难性遗忘是不是同一个问题。

**[[wiki/concepts/Multi_Agent_Systems|多智能体]]是退潮最快的一条线。** 2023 年角色扮演协作爆发（ChatDev/MetaGPT/AutoGen），2024 年收敛为 orchestrator+专才拓扑（Magentic-One），2025 年 Why Do Multi-Agent Systems Fail 列出 14 类失败模式后，核心未决问题变成"多 agent 何时真的优于一个好的单 agent 提示"——这条线的教训直接影响了 agentic RL 的训练对象选择（主流选择训单 agent 策略而非协作协议）。

## 关键转折点（跨线）

1. **MemGPT（2023-10）**：记忆从外挂组件变成系统一等公民。
2. **τ-bench（2024-06）**：终态判分 + 策略一致性，评测范式的成熟形态，后来 RLVR 的奖励设计模板。
3. **RAGEN（2025-04）**：诊断出多轮 agentic RL 训练必崩的病灶，把 RL 线从"接入工具"推进到"修好训练"。
4. **Agent Lightning / AgentRL（2025-08/10）**：训练系统解耦与异步扩展，RL 目标函数被证明从来不是瓶颈——环境、稳定性、信用分配才是。
5. **False Success + Reward Hacking 系列（2026）**：矛头转向评测器与奖励本身，"可验证 ≠ 防钻空"成为新共识。

## 已知矛盾（跨线）

- **评测与训练的界线正在消失**：benchmark 的 checker 被复用为 RL reward 后，"刷榜"与"训练"难以区分，防污染（SWE-bench Pro 等）成为长期军备竞赛。
- **记忆的关系收益 vs 隐私风险**：两篇 CHI 2026（RECALLbot / Relational Gains）给出的命题——记忆带来亲密感也带来暴露面——尚无工程线与 HCI 线的共治方案。
- **单 agent 强化 vs 多 agent 协作**：两条线共享"信用分配"难题却几乎没有互相引用。

## 开放问题

- [ ] 记忆能力在真实 agentic 任务中的迁移性：MemGym 对聊天 benchmark 的质疑尚无交叉验证。
- [ ] reward hacking 的防御会不会成为 RL 训练的标配组件（Gradient Regularization 是第一个候选，待精读验证）。
- [ ] 评测器可信度的元评测（谁在评测评测器）会不会成为 2027 年的独立子领域。
- [ ] 本库 Agents 方向 119 篇中约七成仍是占位笔记；精读优先级建议沿"评测 → RL → 记忆 → 安全"顺序回填各 concept 页。
