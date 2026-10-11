---
type: concept
title: "Agent 记忆"
sources:
  - "[[raw/2026_CHI_RECALLbot_Agentic_Memory_Reciprocal_Disclosure/2026_CHI_RECALLbot_Agentic_Memory_Reciprocal_Disclosure|RECALLbot (CHI '26)]]"
  - "[[raw/2026_CHI_Relational_Gains_Privacy_Strains_ChatGPT_Memory/2026_CHI_Relational_Gains_Privacy_Strains_ChatGPT_Memory|Relational Gains, Privacy Strains (CHI '26)]]"
  - "[[raw/2025-04_Mem0_2504.19413/2025-04_Mem0_2504.19413|Mem0 (arXiv 2504.19413)]]"
  - "[[raw/2025-05_MemOS_2505.22101/2025-05_MemOS_2505.22101|MemOS (arXiv 2505.22101)]]"
  - "[[raw/2025-01_Zep_2501.13956/2025-01_Zep_2501.13956|Zep (arXiv 2501.13956)]]"
  - "[[raw/2026-05_EvolveMem_2605.13941/2026-05_EvolveMem_2605.13941|EvolveMem (arXiv 2605.13941)]]"
  - "[[raw/2026-05_EvoMemBench_2605.18421/2026-05_EvoMemBench_2605.18421|EvoMemBench (arXiv 2605.18421)]]"
  - "[[raw/2026-05_MemGym_2605.20833/2026-05_MemGym_2605.20833|MemGym (arXiv 2605.20833)]]"
created: 2026-10-11
updated: 2026-10-11
---

# Agent 记忆

## 定义

给 LLM agent 提供**跨会话、跨任务持久状态**的外部机制：把上下文窗口装不下的经验、事实与关系，通过「写入（抽取/总结）—组织（分层/图/生命周期）—读取（检索/注入）—维护（合并/遗忘/演化）」四个操作持续供 agent 使用。与 RAG 的区别：RAG 是只读外挂知识库，agent memory 是**可写、可更新、可遗忘**的读写层，服务对象从"知识"扩展到"个体连续性"和"经验积累"。

研究问题（本库跟踪的主线）：

> agent 的记忆应该记什么、由谁写、何时读、如何忘？记忆能力在多大程度上决定长程任务表现与长期关系质量？评测和设计如何跟上？

## 演进脉络（一条技术线的四个阶段）

1. **2023：外挂式检索记忆。** 记忆 = 向量库 + 相似度检索，写读策略固定。MemoryBank（Ebbinghaus 遗忘曲线控制噪声）、LongMem（记忆编码与解码解耦、跨段检索）是代表。本库这两篇目前是占位笔记，仅作历史背景。
2. **2023-10：思想转折点——MemGPT。** 记忆从静态库变成 **agent 主动管理的稀缺资源**：借鉴 OS 虚拟内存分页，LLM 用 function call 在有限 main context 与无限 archival memory 之间自己搬运。此后"记忆 = 系统资源"成为默认世界观。本库笔记同为占位，但其影响贯穿下文所有 2025–2026 论文。
3. **2025：工程化与结构化。** 记忆从研究原型变成产品基建，竞争维度变成成本/延迟/可控。[[raw/2025-04_Mem0_2504.19413/2025-04_Mem0_2504.19413|Mem0]] 走 extract→consolidate→retrieve 的轻量生产管线；[[raw/2025-01_Zep_2501.13956/2025-01_Zep_2501.13956|Zep]] 用时序知识图把对话与业务数据随时间融合，突破"记忆=文本段"的表示；[[raw/2025-05_MemOS_2505.22101/2025-05_MemOS_2505.22101|MemOS]] 提出 MemCube 统一记忆单元加全生命周期管理，把 OS 类比（MemGPT 的思想）做成完整系统。
4. **2025–2026：可演化与可学习。** 记忆系统不再写死，组件自己进化：[[raw/2026-05_EvolveMem_2605.13941/2026-05_EvolveMem_2605.13941|EvolveMem]] 让**检索机制本身**自演化；[[raw/2025-11_Evo_Memory_2511.20857/2025-11_Evo_Memory_2511.20857|Evo-Memory]] 以 streaming benchmark 评测 test-time self-evolving memory；同期出现用 RL 学习统一长短记忆管理的工作（如 Agentic Memory，本库占位笔记）。同步地，[[raw/2026-06_Agent_Memory_Characterization_and_System_Implications_2606.06448/2026-06_Agent_Memory_Characterization_and_System_Implications_2606.06448|Agent Memory: Characterization and System Implications]] 从构建/检索/生成成本给记忆系统画像，标志这条线开始被当**系统问题**而不仅是算法问题研究。

## 方法分类（按本库 2025–2026 论文）

- **表示轴**：文本段 + embedding（Mem0）→ 时序知识图（Zep）→ 统一记忆单元 MemCube（MemOS）。
- **写策略轴**：LLM 被动抽取（Mem0 管线）→ agent 自主管理（MemOS 生命周期）→ 检索/演化机制学习化（EvolveMem）。
- **读策略轴**：相似度检索 → 图遍历/时序查询（Zep）→ 自演化的检索器（EvolveMem）。
- **评测轴**（见下节）：三类 benchmark 互不覆盖——场景类型（factual/reflective × participation/observation，[[raw/2025-06_MemBench_2506.21605/2025-06_MemBench_2506.21605|MemBench]]）、时间结构（in-episode/cross-episode × knowledge/execution，EvoMemBench）、嵌入环境（把记忆放进 τ²/SWE-Gym/WebArena 等 agentic 任务，MemGym）。
- 分类框架本身也有综述在维护：[[raw/2026-03_Memory_for_Autonomous_LLM_Agents_2603.07670/2026-03_Memory_for_Autonomous_LLM_Agents_2603.07670|Memory for Autonomous LLM Agents]]（2026-03）以 taxonomy + open challenges 组织这条线，可作本页分类的交叉校验。

## 评测线的分化（2025 下半年的暗战）

- [[raw/2025-06_MemBench_2506.21605/2025-06_MemBench_2506.21605|MemBench]]（2025-06）：聊天式综合评测，强调 reflective memory 与 observation 场景。
- MemGym（2026-05）：立场鲜明——**聊天 memory benchmark 不贴近 agent**，把记忆嵌进真实 agentic 环境评测，直接质疑前者的结论外推性。
- EvoMemBench（2026-05）：从 self-evolving 视角切分评测空间，追问"会进化的记忆"该怎么测。

MemGym 与 EvoMemBench 同年同月出现，说明评测标准本身已成为这条线的争夺焦点：没有统一 leaderboard，每篇新方法论文自选战场。

## 系统视角

[[raw/2026-06_Agent_Memory_Characterization_and_System_Implications_2606.06448/2026-06_Agent_Memory_Characterization_and_System_Implications_2606.06448|Characterization and System Implications]]（2026-06）把记忆系统拆成构建/检索/生成三段成本分析。意义在于：当记忆层进入生产（Mem0/Zep 的卖点就是成本与延迟），"记多少、何时记、记多久"不再是纯质量问题，而是**成本-效用权衡问题**——这为学习型记忆管理（用策略学习替代手工规则）提供了动机。

## 与 HRI 线的交汇：记忆作为关系机制

本库对此线读得最深的不是系统论文，而是两篇 CHI '26：

- [[raw/2026_CHI_RECALLbot_Agentic_Memory_Reciprocal_Disclosure/2026_CHI_RECALLbot_Agentic_Memory_Reciprocal_Disclosure|RECALLbot]]：把记忆从 personalization 资产扩展为**关系机制**——Me Memory（agent 自己的身份/日记）+ We Memory（共同经历）+ 基于 conversational dominance 的互相披露策略。两周 N=40 研究显示社会身份感、披露深度、信任显著提升，但也暴露依赖与现实关系扭曲风险。
- [[raw/2026_CHI_Relational_Gains_Privacy_Strains_ChatGPT_Memory/2026_CHI_Relational_Gains_Privacy_Strains_ChatGPT_Memory|Relational Gains, Privacy Strains]]：RECALLbot 的必要反面。用户把 AI 记忆感知为"机器式记忆"（unforgetfulness、detailedness、accuracy、lack of emotions）；关系收益（被记住 = 被在乎）与隐私焦虑同源——系统记住不该记的、把临时状态当长期特征、用户不信删除即遗忘。

两篇合起来给出设计公理：记忆越强，关系越深，风险越大；memory 必须 visible / accessible / editable / expirable / auditable。

## 已知矛盾 / 争议

- **"会忘"既是 bug 也是 feature。** 2023 年的遗忘曲线（MemoryBank）是为了控制检索噪声；2026 年的用户研究（Relational Gains）显示**真实遗忘恰是信任的来源**。工程上"永不删除"的记忆层与用户心理模型直接冲突。
- **记忆写入的错误被永久化，自演化放大该风险。** Relational Gains 观察到系统把租金迟交、分居状态等临时状态固化成长期特征；EvolveMem 让检索机制自我演化，若演化方向被早期错误带偏，缺乏外部纠偏机制时错误会自我强化。
- **聊天场景结论能否迁移到任务场景存疑。** MemGym 的立项立场就是否定；但 MemBench 等聊天 benchmark 的论文仍占记忆评测的大多数，两类结论目前没有交叉验证。
- **评测碎片化。** 场景轴、时间轴、环境轴三套 benchmark 互不覆盖，方法论文自选战场，横向比较基本不可做。

## 开放问题 / 观察触发器

- [ ] 学习型记忆管理（Agentic Memory 一类）放进 MemGym 式 agentic 环境，能否稳定 beat Mem0/Zep 式工程管线？（交叉验证机会，需先补齐占位笔记）
- [ ] 自演化记忆（EvolveMem / Evo-Memory）的错误自我强化如何度量与防控？EvoMemBench 是否包含失败注入类评测？
- [ ] 成本画像（Characterization 的 build/retrieve/generate 三段成本）能否转化为"记多少"的策略学习目标？
- [ ] HRI 设计原则（RECALLbot 的 Me/We Memory + Relational Gains 的十条设计清单）落到具身机器人多模态记忆（语音/图像/地点/他人信息）时，哪些原则会失效？
- [ ] 遗忘功能的产品化：过期时间、真实删除语义（显示/检索/训练/日志各层）有没有被任何系统论文正面解决？

## 附：本页引用边界

- 引用 12 篇：2 篇 CHI '26 已精读 + 10 篇 2025–2026 系统/benchmark 论文（有 curate 的一句话定位笔记，正文仅依据该定位与公开身份作分类，未做细节性主张）。
- 未引用 10 篇占位笔记（空模板、无任何实质内容）：2023–2024 经典四篇（MemoryBank、LongMem、MemGPT、2404 survey）、2025 未读六篇（MemInsight、MEM1、Hierarchical Memory、M3-Agent、Memory in the Age of AI Agents、Agentic Memory）。其中 MemGPT 作为转折点在正文中以历史背景提及但不作 wikilink 引用；补齐精读后应升级为本页核心引用。
