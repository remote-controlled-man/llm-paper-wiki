---
type: concept
title: "Agentic RL 与可验证奖励"
sources:
  - "[[raw/2025-03_Search_R1_2503.09516/2025-03_Search_R1_2503.09516|Search-R1]]"
  - "[[raw/2025-04_RAGEN_2504.20073/2025-04_RAGEN_2504.20073|RAGEN]]"
  - "[[raw/2025-08_Agent_Lightning_2508.03680/2025-08_Agent_Lightning_2508.03680|Agent Lightning]]"
  - "[[raw/2025-10_AgentRL_2510.04206/2025-10_AgentRL_2510.04206|AgentRL]]"
  - "[[raw/2025-07_ARPO_2507.19849/2025-07_ARPO_2507.19849|ARPO]]"
  - "[[raw/2026-06_CacheRL_2606.14179/2026-06_CacheRL_2606.14179|CacheRL]]"
  - "[[raw/2026-06_ContextRL_2606.17053/2026-06_ContextRL_2606.17053|ContextRL]]"
  - "[[raw/2026_Preprint_Reinforcing_Agents_Collective_Skills/2026_Preprint_Reinforcing_Agents_Collective_Skills|Reinforcing Agents with Collective Skills (Skill2Env)]]"
created: 2026-10-11
updated: 2026-10-11
---

# Agentic RL 与可验证奖励

## 定义

Agentic RL 指把 LLM agent 的多轮交互（观察 → 行动 → 环境反馈 → 再行动）整体当作 RL 优化对象，用环境或验证器给出的**可验证奖励**（测试通过、exact match、环境状态检查）做 outcome reward 来训练模型。它是 RLVR 的自然延伸：RLVR 验证"答案对不对"，agentic RL 验证"任务做完没有"，优化对象从单条推理轨迹扩展到整条行动轨迹。

本库精读笔记给出的一致判断：**这条线的瓶颈从来不是 RL 目标函数**——所有工作都直接建在 PPO/GRPO 上——**而是环境成本、训练稳定性、信用分配与证据接地。**

## 研究问题（本库跟踪的主线）

> agent 的长程决策能力（何时调工具、失败后怎么办、如何向用户澄清）能否通过在环境里行动、由可验证的最终奖励塑形而获得？代价、稳定性与泛化性如何？

## 演进脉络：四个阶段

**前置：可验证环境的构造（2024–2025 初，环境线）。** [[raw/2024-06_tau_bench_2406.12045/2024-06_tau_bench_2406.12045|τ-bench]] 和 [[raw/2026-02_Agent_Diff_2602.11224/2026-02_Agent_Diff_2602.11224|Agent-Diff]] 先解决"怎么判定 agent 真的完成了任务"：前者把动态用户、policy 遵循和最终状态验证放进同一 benchmark，后者用容器内 state diff 判定企业 API 任务成败、无关副作用直接算失败。没有这一层，后面的训练工作无处获得奖励信号。

**阶段一：把环境接进 rollout（2025 上半年）。** [[raw/2025-03_Search_R1_2503.09516/2025-03_Search_R1_2503.09516|Search-R1]] 是最干净的入门范式：动作空间只有 search query，奖励只有 final answer exact match，关键技巧是 retrieved-token loss masking——环境返回的 token 不参与 loss。同月的 [[raw/2025-04_RAGEN_2504.20073/2025-04_RAGEN_2504.20073|RAGEN]] 把问题一般化为多轮 MDP（StarPO），并给出本线最重要的诊断：单轮 RL 直接搬到多轮 agent 上会**先涨后崩**（reward variance cliff、gradient spike、Echo Trap、reasoning collapse）。**这是关键转折点：共识从"发明更强的 RL 算法"转向"修 rollout 质量、训练稳定性和奖励设计"。**

**阶段二：系统与接口（2025 下半年）。** [[raw/2025-08_Agent_Lightning_2508.03680/2025-08_Agent_Lightning_2508.03680|Agent Lightning]] 回答"已有 agent 怎么接 RL"：轨迹拆成每次 LLM 调用的 transition，训练服务与 agent runtime 解耦，是 agentic RL 的 adapter / instrumentation 层。[[raw/2025-10_AgentRL_2510.04206/2025-10_AgentRL_2510.04206|AgentRL]] 回答"接入以后怎么跑得快、跑得稳"：完全异步 rollout-training、容器化异构环境、cross-policy sampling、task advantage normalization。[[raw/2025-07_ARPO_2507.19849/2025-07_ARPO_2507.19849|ARPO]] 在算法层细化：用工具反馈后的 token entropy 触发 adaptive rollout（把预算花在高不确定的分叉点上），并处理分叉轨迹 shared prefix / branch suffix 的 advantage 归属。[[raw/2025-08_MUA_RL_2508.18669/2025-08_MUA_RL_2508.18669|MUA-RL]] 把 LLM 模拟用户放进 rollout，训练"边沟通澄清、边调工具"的多轮交互 agent。

**阶段三：成本、证据与泛化（2026）。** [[raw/2026-06_CacheRL_2606.14179/2026-06_CacheRL_2606.14179|CacheRL]] 用缓存工具结果替代真实执行，配 cache-tier-aware hybrid reward，把多轮 agent RL 压到 4B 小模型可复现的成本。[[raw/2026-06_ContextRL_2606.17053/2026-06_ContextRL_2606.17053|ContextRL]] 指出"答对 ≠ 用了证据"（context unawareness），用对比上下文选择做 GRPO 辅助目标，把答案 grounding 到决定性证据上。[[raw/2026_Preprint_Reinforcing_Agents_Collective_Skills/2026_Preprint_Reinforcing_Agents_Collective_Skills|Reinforcing Agents with Collective Skills（Skill2Env）]] 把社区编写的 Skill 编译成可执行、可评分的 RL 环境（结果测试 + 行为 rubric 双奖励），并暴露 outcome reward 与过程 rubric 的冲突。

## 方法分类（按解决的问题分）

| 角色 | 代表 | 一句话 |
|---|---|---|
| 环境即 rollout 的一部分 | Search-R1、MUA-RL、CacheRL、Skill2Env | 搜索引擎 / 模拟用户 / 缓存工具 / 编译 Skill，都是可采样、可奖励的环境。 |
| 轨迹表示与接口 | Search-R1、CacheRL（整轨迹 + token masking）vs Agent Lightning（拆 transition） | masking 路线简单但要处理长序列；transition 路线与现有 agent 框架解耦。 |
| 训练算法 | RAGEN、ARPO、AgentRL、ContextRL | 无人发明新 objective；差别全在 rollout 与 advantage：轨迹级目标、entropy 触发分叉、task 内归一化、grounding 辅助目标。 |
| 奖励设计 | Search-R1（纯结果）→ ARPO（分层）/ CacheRL（按 cache tier 混合）→ Skill2Env（结果 + 过程 rubric） | 从"只看最终结果"走向"按可信度加权、把过程质量纳入"。 |
| 系统与成本 | Agent Lightning（训练-agent 解耦）、AgentRL（全异步 pipeline）、CacheRL（缓存执行） | 2025 下半年起，系统吞吐和单次 rollout 成本成为主战场。 |

## 已知矛盾 / 争议

- **PPO vs GRPO**：GRPO 省 critic、收敛快，但多轮下更易不稳定甚至 reward collapse（Search-R1 与 RAGEN 观察一致）；没有一种算法在所有环境上都稳。
- **过程奖励的两难**：Skill2Env 中 rubric 版 Skill 遵循更高、被 judge 偏好 73%，但任务通过率反而低于纯结果奖励版（54.1% → 50.1%）；"judge 偏好 ≠ 真实工作质量"。
- **信用分配仍未解决**：Agent Lightning 的均分很粗（作者自己承认是可替换模块）；ARPO 的 soft advantage 不是显式因果归属，只是让 GRPO 在分叉结构上更合理。
- **归一化与探索的副作用**：task advantage normalization 可能抹掉任务间有意义的难度差；cross-policy sampling 实际靠 stale policy 近似多策略探索，收益边界不清。
- **异步的 off-policy 风险**：AgentRL 只限制 policy staleness，没有给出"陈旧多少步会失稳"的边界。
- **可验证 ≠ 不可钻空**：Skill2Env 的 oracle/NOP 验收只是最低可运行性门槛；ContextRL 显示 benchmark 高分可以完全建立在"没用证据"之上（开源模型在对比上下文探针上接近随机）。

## 开放问题 / 观察触发器

- [ ] 长程信用分配的通用方案（learned value / 细粒度过程奖励）何时成熟？ARPO 之后有无真正接住这个问题的工作？
- [ ] 过程奖励如何加成而不掉任务通过率？（Skill2Env 自己留的悬念：固定权重、加法形式、judge 看不到文件系统都可能是败因）
- [ ] 环境自动生成路线（Skill2Env 一类）能否 scale 到开放领域，且证明 verifier 无 reward hacking？
- [ ] MUA-RL 的模拟用户训练迁移到真实用户有多远？无真人验证是这条分支的共性缺口。
- [ ] CacheRL 的缓存环境（fuzzy/best-effort 约占 50%）与真实执行之间的 gap 有多大？有无 sim-to-real 闭环验证？
- [ ] GUI / 计算机操作 agent 的 RL（本库 ComputerRL、WebAgent-R1 等笔记尚为占位）——出现精读即更新本页。
- [ ] 与 [[wiki/concepts/System_One_Decision_Models|System One 决策模型]] 的分工：高频微决策值得 RL 训练，还是交给校准决策层？
