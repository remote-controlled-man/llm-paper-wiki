---
type: concept
title: "多智能体系统"
sources:
  - "[[raw/2023-04_Generative_Agents_Interactive_Simulacra_of_Human_Behavior_2304.03442/2023-04_Generative_Agents_Interactive_Simulacra_of_Human_Behavior_2304.03442|Generative Agents (UIST 2023)]]"
  - "[[raw/2023-07_ChatDev_2307.07924/2023-07_ChatDev_2307.07924|ChatDev (2023)]]"
  - "[[raw/2023-08_MetaGPT_2308.00352/2023-08_MetaGPT_2308.00352|MetaGPT (2023)]]"
  - "[[raw/2023-08_AutoGen_AutoGenBench_2308.08155/2023-08_AutoGen_AutoGenBench_2308.08155|AutoGen / AutoGenBench (2023)]]"
  - "[[raw/2023-09_AutoAgents_2309.17288/2023-09_AutoAgents_2309.17288|AutoAgents (2023)]]"
  - "[[raw/2024-11_Magentic_One_2411.04468/2024-11_Magentic_One_2411.04468|Magentic-One (2024)]]"
  - "[[raw/2025-03_Why_Do_Multi_Agent_LLM_Systems_Fail_2503.13657/2025-03_Why_Do_Multi_Agent_LLM_Systems_Fail_2503.13657|Why Do Multi-Agent LLM Systems Fail? (2025)]]"
  - "[[raw/2026_CHI_Sensemaking_Multi_Agent_LLM_Interfaces/2026_CHI_Sensemaking_Multi_Agent_LLM_Interfaces|CHI 2026 多智能体界面感知研究]]"
created: 2026-10-11
updated: 2026-10-11
---

# 多智能体系统（Multi-Agent LLM Systems, MAS）

> 状态说明：本页引用的 15 篇笔记目前均为未精读的骨架条目（仅 frontmatter 与一行阅读理由）。本页的综合判断基于论文的公开学术地位与元数据，精读具体论文后应回头校订本页论断。

## 定义

由多个以 LLM 为认知内核的 agent 通过**通信、分工、辩论或编排**共同完成任务的系统范式。与单 agent 的本质区别不在"用了几个模型"，而在把任务显式分解为**角色分工 + 交互协议 + 共享状态**。本库语境下，MAS 横跨 Agents 与 Human_AI_Interaction 两个方向：前者关心编排与性能，后者关心人如何理解、信任和监督一群 agent。

## 演进脉络（本库论文覆盖的四段）

**第 0 段：单 agent 机制奠基（2023 上半年）**——多智能体的所有零件先在单 agent 里被发明出来：

- [[raw/2023-03_Reflexion_Language_Agents_with_Verbal_Reinforcement_Learning_2303.11366/2023-03_Reflexion_Language_Agents_with_Verbal_Reinforcement_Learning_2303.11366|Reflexion]]：用语言化的自我反思替代参数更新，确立"试错 →  verbal 反馈 → 改进"的闭环；
- [[raw/2023-04_Generative_Agents_Interactive_Simulacra_of_Human_Behavior_2304.03442/2023-04_Generative_Agents_Interactive_Simulacra_of_Human_Behavior_2304.03442|Generative Agents]]：memory stream + reflection + planning 的三件套，是后来一切"社会/多角色模拟"的源头，也是 MAS 共享记忆设计的直接祖先；
- [[raw/2023-05_Voyager_An_Open-Ended_Embodied_Agent_with_Large_Language_Models_2305.16291/2023-05_Voyager_An_Open-Ended_Embodied_Agent_with_Large_Language_Models_2305.16291|Voyager]]：可累积的 skill library，提示"分工"的前提是存在可复用的技能资产。

**第 1 段：角色扮演式协作爆发（2023 下半年）**——关键转折点。核心命题："能不能用多个 prompt 角色模拟一个组织？"

- [[raw/2023-07_ChatDev_2307.07924/2023-07_ChatDev_2307.07924|ChatDev]]：虚拟软件公司，CEO/CTO/程序员按链式通信产出代码；
- [[raw/2023-08_MetaGPT_2308.00352/2023-08_MetaGPT_2308.00352|MetaGPT]]：**把 SOP（标准作业流程）编码进多 agent 协作**，消息池 + 结构化输出，是"流程结构化"路线的代表；
- [[raw/2023-08_AutoGen_AutoGenBench_2308.08155/2023-08_AutoGen_AutoGenBench_2308.08155|AutoGen]]：通用"对话即编程"框架，代表另一条路线——**自由会话式编排**（外加 AutoGenBench 评测工具）；
- [[raw/2023-09_AutoAgents_2309.17288/2023-09_AutoAgents_2309.17288|AutoAgents]]：进一步把"建几个 agent、各自什么角色"也自动化，人工只留任务描述。

这一阶段形成两条至今仍在竞争的设计哲学：**SOP/工作流结构化**（MetaGPT、ChatDev：确定性强、可预测，但僵化）vs **会话/编排器驱动**（AutoGen、AutoAgents：灵活，但行为难以预测和调试）。

**第 2 段：工业化与通用化（2024）**——从"演示系统"走向"平台"：

- [[raw/2024-08_AutoGen_Studio_2408.15247/2024-08_AutoGen_Studio_2408.15247|AutoGen Studio]]：no-code 原型与调试工具，承认多 agent 工作流的手工搭建成本已成瓶颈；
- [[raw/2024-11_Magentic_One_2411.04468/2024-11_Magentic_One_2411.04468|Magentic-One]]：第二个关键转折点——**通用多智能体拓扑**收敛为 "orchestrator + 若干专才 agent + 共享黑板"，配套 AutoGenBench 评测，标志该方向从"每任务定制"转向"一个通用团队"。

**第 3 段：反思、诊断与人机界面（2025–2026）**——从"能造"转向"何时值得、何时失败、人怎么看"：

- [[raw/2025-03_Why_Do_Multi_Agent_LLM_Systems_Fail_2503.13657/2025-03_Why_Do_Multi_Agent_LLM_Systems_Fail_2503.13657|Why Do Multi-Agent LLM Systems Fail?]]：第三个关键转折点。系统归纳 14 类 MAS 失败模式（错误传播、目标漂移、级联幻觉、agent 间错位等），直接挑战"多 agent 必然优于单 agent"的默认假设；
- [[raw/2026_CHI_Sensemaking_Multi_Agent_LLM_Interfaces/2026_CHI_Sensemaking_Multi_Agent_LLM_Interfaces|CHI 2026 多智能体界面感知研究]]：把人机界面问题带进 MAS——用户如何解读透明度与可信度线索，是多 agent 系统可部署性的隐性前提；
- 三篇综述提供坐标系：[[raw/2024-02_Large_Multimodal_Agents_Survey_2402.15116/2024-02_Large_Multimodal_Agents_Survey_2402.15116|Large Multimodal Agents Survey (2024)]] 与 [[raw/2025_SpringerVisualIntelligence_Large_Multimodal_Agents_Survey/2025_SpringerVisualIntelligence_Large_Multimodal_Agents_Survey|Springer 版 LMA 综述 (2025)]] 把感知模态纳入 agent  taxonomy，[[raw/2025-05_LLM_Based_Human_Agent_Systems_Survey_2505.00753/2025-05_LLM_Based_Human_Agent_Systems_Survey_2505.00753|Human-Agent 协作系统综述 (2025)]] 则从人机协同角度框定 MAS 的外延。

## 方法分类（横切视角）

| 类别 | 代表 | 分工依据 | 主要风险 |
|---|---|---|---|
| 角色扮演 / SOP 结构化 | ChatDev、MetaGPT | 人类组织流程 | 僵化、无法处理流程外情况 |
| 会话式编排 | AutoGen、AutoAgents | 运行时对话协商 | 发散、死循环、难调试 |
| Orchestrator + 专才 | Magentic-One | 中心调度器动态分派 | 单点失败、编排器瓶颈 |
| 社会模拟型 | Generative Agents | 个体记忆与涌现交互 | 不可控、难评测 |

基础设施维度：[[raw/2024-10_LightRAG_2410.05779/2024-10_LightRAG_2410.05779|LightRAG]] 在此脉络中不是 MAS 论文，但代表多 agent 共享知识/记忆层的一种工程答案——agent 间状态共享最终都要落到某种图式检索记忆上，与 Generative Agents 的 memory stream 一脉相承。

## 与本库研究方向的关系

- **Agents 方向**：这是本方向 2023–2024 年的主线系统脉络，与概念页 [[wiki/concepts/System_One_Decision_Models|System One 决策模型]] 形成对照——MAS 的编排器做"低频开放式分解"，System One 类决策层做"高频结构化微决策"，两者是同一架构的两层。
- **Human_AI_Interaction 方向**：CHI 2026 感知研究 + Human-Agent 综述把 MAS 从系统问题转成人机界面问题；对本库"agent harness 透明度与控制"线索直接相关。
- **Robotics_and_HRI 方向**：Voyager 的具身技能库提示 MAS 在机器人侧的落点——多机器人/人机混合团队的分工与交接。

## 已知矛盾 / 争议

- **"更多 agent ≠ 更好"**：14 类失败模式论文与业界的单 agent 基线复现实验共同指出，MAS 常因错误传播、级联幻觉和 inter-agent misalignment 反而劣于精心提示的单 agent；而支持方的收益主张（分工降低单点认知负荷、角色隔离减少角色混淆）多在特定任务上成立，缺乏跨任务普适证据。
- **成本与延迟**：token 消耗随 agent 数近似乘性增长，而 MAS 论文的评测普遍回避成本归一化对比。
- **角色扮演的实质**：给 LLM 分配"CEO/程序员"人设到底是利用了模型的社会先验，还是仅增加了 prompt 熵，两方证据都存在。

## 开放问题 / 观察触发器

- [ ] 何时该用 MAS、何时单 agent + 好的 decomposition prompt 就够？需要一个决策框架而非又一框架。
- [ ] 14 类失败模式能否转译为编排层的运行时护栏（类似 System One 决策层的 verify-everything 思路）？
- [ ] 共享记忆层的最佳形态：黑板式（Magentic-One）、消息池（MetaGPT）、图检索（LightRAG）还是 memory stream（Generative Agents）？缺系统性对比。
- [ ] MAS 基本是 per-task 无状态系统，跨任务学习能力（Reflexion 式 verbal RL 的团队版）几乎空白。
- [ ] 人在环上的多 agent 界面：CHI 2026 之后是否出现可操作的设计准则（透明度线索何时帮助、何时制造虚假信任）？
- [ ] 评测标准化：AutoGenBench 之后，跨框架可比评测仍缺位。
