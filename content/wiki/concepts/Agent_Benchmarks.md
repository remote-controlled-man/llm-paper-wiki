---
type: concept
title: "Agent 评测体系"
sources:
  - "[[raw/2024-06_tau_bench_2406.12045/2024-06_tau_bench_2406.12045|τ-bench]]"
  - "[[raw/2026-06_False_Success_in_LLM_Agents_2606.09863/2026-06_False_Success_in_LLM_Agents_2606.09863|False Success in LLM Agents]]"
  - "[[raw/2023-07_WebArena_2307.13854/2023-07_WebArena_2307.13854|WebArena]]"
  - "[[raw/2023-08_AgentBench_2308.03688/2023-08_AgentBench_2308.03688|AgentBench]]"
  - "[[raw/2023-10_SWE_bench_2310.06770/2023-10_SWE_bench_2310.06770|SWE-bench]]"
  - "[[raw/2024-04_OSWorld_2404.07972/2024-04_OSWorld_2404.07972|OSWorld]]"
  - "[[raw/2024-07_AppWorld_2407.18901/2024-07_AppWorld_2407.18901|AppWorld]]"
  - "[[raw/2025-06_tau2_Bench_2506.07982/2025-06_tau2_Bench_2506.07982|tau2-bench]]"
created: 2026-10-11
updated: 2026-10-11
---

# Agent 评测体系

## 定义

针对 LLM agent 的**可执行环境评测**：给 agent 一个带初始状态的环境（网页、操作系统、API 后端、代码仓库），让它通过多轮动作完成任务，再用程序化手段判定成功与否。它区别于静态问答评测的本质在于：成功标准是**环境或代码的真实变化**，不是输出文本像不像答案。本页覆盖本库 03_Agents 方向下以 benchmark 为主贡献的论文线（27 篇），外加 2 篇以评测环境为训练资源的边界成员。

## 演进脉络（综合判断）

**2023：从"答题"到"做事"（环境化起点）。** [[raw/2023-08_AgentBench_2308.03688/2023-08_AgentBench_2308.03688|AgentBench]] 首次把 LLM-as-agent 当多维评测对象铺进 8 类交互环境；[[raw/2023-07_WebArena_2307.13854/2023-07_WebArena_2307.13854|WebArena]] 确立"自托管真实网站 + 功能性 evaluator"的范式；[[raw/2023-10_SWE_bench_2310.06770/2023-10_SWE_bench_2310.06770|SWE-bench]] 确立"真实 GitHub issue + 单元测试通过"的判分范式，成为 coding agent 的主线度量。三个起点分别对应通用能力、web 操作、软件工程三条支线。

**2024：保真度扩张 + 判分深化。** 模态上从文本扩展到视觉与视频：[[raw/2024-01_VisualWebArena_2401.13649/2024-01_VisualWebArena_2401.13649|VisualWebArena]]（视觉 grounding）、[[raw/2024-01_WebVoyager_2401.13919/2024-01_WebVoyager_2401.13919|WebVoyager]]（真实网站端到端，GPT-4V 判分）、[[raw/2024-10_VideoWebArena_2410.19100/2024-10_VideoWebArena_2410.19100|VideoWebArena]]（视频教程 + 长上下文）、[[raw/2024-02_OmniACT_2402.17553/2024-02_OmniACT_2402.17553|OmniACT]]（截图 + 指令 → 可执行操作）。环境上扩到企业与桌面：[[raw/2024-03_WorkArena_BrowserGym_2403.07718/2024-03_WorkArena_BrowserGym_2403.07718|WorkArena / BrowserGym]]（ServiceNow 知识工作）、[[raw/2024-04_OSWorld_2404.07972/2024-04_OSWorld_2404.07972|OSWorld]]（真实桌面 OS）、[[raw/2024-09_Windows_Agent_Arena_2409.08264/2024-09_Windows_Agent_Arena_2409.08264|Windows Agent Arena]]（Windows + 并行评测）。判分上从"功能检查"深化到"状态验证"：[[raw/2024-07_AppWorld_2407.18901/2024-07_AppWorld_2407.18901|AppWorld]]（9 app、457 API、可执行单测）、[[raw/2024-08_ToolSandbox_2408.04682/2024-08_ToolSandbox_2408.04682|ToolSandbox]]（stateful、动态里程碑、用户模拟器）、以及本线成熟形态 [[raw/2024-06_tau_bench_2406.12045/2024-06_tau_bench_2406.12045|τ-bench]]（工具-用户-状态闭环 + `pass^k` 可靠性指标）。

**2025：难度、广度、防污染。** SWE 支线加速扩容对抗饱和：[[raw/2024-10_SWE_bench_Multimodal_2410.03859/2024-10_SWE_bench_Multimodal_2410.03859|SWE-bench Multimodal]]（前端/视觉问题）、[[raw/2025-04_Multi_SWE_bench_2504.02605/2025-04_Multi_SWE_bench_2504.02605|Multi-SWE-bench]]（Java/TS/Go/Rust 等 7 语言）、[[raw/2025-09_SWE_Bench_Pro_2509.16941/2025-09_SWE_Bench_Pro_2509.16941|SWE-Bench Pro]]（更长程、更贴近企业、更新鲜）。交互结构继续复杂化：[[raw/2025-06_tau2_Bench_2506.07982/2025-06_tau2_Bench_2506.07982|tau2-bench]] 引入 dual-control（用户模拟器也能改共享状态），[[raw/2025-03_MultiAgentBench_2503.01935/2025-03_MultiAgentBench_2503.01935|MultiAgentBench]] 把协作与竞争拓扑纳入评测对象。同时出现面向训练友好的低成本判分：[[raw/2025-09_IFEval_FC_2509.18420/2025-09_IFEval_FC_2509.18420|IFEval-FC]]（函数调用的指令/参数约束检查）。

**2026：评测对象转向评测本身。** 关键转折是 [[raw/2026-06_False_Success_in_LLM_Agents_2606.09863/2026-06_False_Success_in_LLM_Agents_2606.09863|False Success in LLM Agents]]：它不再造新环境，而是论证"agent 声称完成 ≠ 环境状态完成"，并系统显示 LLM judge 会被自信的收尾话术骗到（AUROC ≤ 0.65），轻量 detector（TF-IDF + XGBoost，0.85–0.95）更适合做第一层 triage。同一年的 [[raw/2026-03_MP_Bench_2603.25001/2026-03_MP_Bench_2603.25001|MP-Bench]]（多视角失败归因）、[[raw/2026-03_SWE_Skills_Bench_2603.15401/2026-03_SWE_Skills_Bench_2603.15401|SWE-Skills-Bench]]（验证 skill 是否真的增量有用）延续"评测量什么、归因归谁"的元问题；[[raw/2026-02_SWE_Bench_Mobile_2602.09540/2026-02_SWE_Bench_Mobile_2602.09540|SWE-Bench Mobile]]（工业级 iOS）、[[raw/2026-06_T1_Bench_2606.11070/2026-06_T1_Bench_2606.11070|T1-Bench]]（25 个 domain 的客户交互规模化）继续扩环境。安全支线 [[raw/2026-02_AgentDyn_2602.03117/2026-02_AgentDyn_2602.03117|AgentDyn]] 把动态 prompt injection 带进可执行评测。另有两篇边界成员把 benchmark 环境当训练资源用：[[raw/2026-01_DynaWeb_2601.22149/2026-01_DynaWeb_2601.22149|DynaWeb]]（world model 降低在线交互成本）、[[raw/2026-03_MiRA_Subgoal_Web_Agent_2603.19685/2026-03_MiRA_Subgoal_Web_Agent_2603.19685|MiRA]]（milestone dense reward 缓解长程 credit assignment）——评测与训练的界线正在消失。

## 方法分类（按判分机制 × 交互结构）

**判分机制五类：**

1. **最终状态比对**：τ-bench / tau2-bench、ToolSandbox、AppWorld——ground truth 是数据库或环境的终态 diff，最严格也最可自动化。
2. **测试通过**：SWE-bench 全系——单元测试作 judge，天然防"说得好听"。
3. **程序化功能检查**：WebArena、WorkArena/BrowserGym、OmniACT——按任务定义检查功能结果。
4. **模型判分**：WebVoyager 的 GPT-4V judge——成本最低但最脆弱，已被 False Success 论文系统性否定为一层防线。
5. **可靠性 / 归因元指标**：τ-bench 的 `pass^k`、MP-Bench 的多视角归因、False Success 的 detector——评测的是"评测 + agent 的稳定性"。

**交互结构谱系**：静态单轮（OmniACT）→ 单 agent 工具循环（SWE-bench、AppWorld）→ 多轮环境交互（WebArena、OSWorld、Windows Agent Arena）→ 用户模拟器闭环（τ-bench、ToolSandbox）→ dual-control（tau2-bench）→ 多智能体拓扑（MultiAgentBench）。结构每复杂一档，判分就从"结果对不对"多追问一层"过程与归因"。

## 研究问题（本库跟踪的主线）

> 当 agent 会交谈、会调工具、会改真实状态时，"评测成功"应该锚定在什么上——最终环境状态、测试通过、过程合规，还是用户模拟器的认可？以及：评测器本身（judge、detector、user simulator）的可靠性由谁验证？

## 与本库已有论文的关系

- **证据主干是 τ-bench 精读笔记**（本库唯一 deep_read 的 benchmark 论文）：它的分层 harness（`user simulator -> agent -> tool API -> mutable state -> evaluator`）、`pass^k` 论证、"reward necessary but not sufficient" 自述局限，是本页多数判断的来源。
- **False Success 笔记**（skimmed 但内容完整）提供评测器批评视角，且其实验数据恰好跑在 tau2-bench 与 AppWorld 上，把 stub 状态的 tau2、AppWorld、ToolSandbox 串成一条可验证的链：single-control domain（airline/retail）false success 率 45–48%，dual-control（telecom）仅 3%——独立状态验证是结构性防线。
- **SWE 支线**（SWE-bench → Multimodal / Multi / Pro / Mobile / Skills）与 **web/OS 支线**（WebArena → Visual/Video/Voyager → WorkArena → OSWorld / Windows Arena）目前在本库只有 triage 级 stub（一句话理由），本页对它们的描述以 note 的一句话理由为限，精读后需回修本页。
- 安全评测（AgentDyn）与本库另一条 agent 安全 benchmark 群（prompt injection / MCP 安全）同属"功能之外"的第三维度，目前在本库尚未合流。

## 已知矛盾 / 争议

- **结果对 ≠ 过程对，镜像地，声称成功 ≠ 真成功**。τ-bench 自述：未取用户确认直接退款，只要终态碰巧正确仍得满分（corrupt success 通道）；False Success 给出镜像：终态错了但 agent 自信宣告完成。binary outcome 在两个方向上都漏。
- **平均能力 ≠ 生产可靠性**。τ-bench 2024 版数据：GPT-4o retail `pass^1` 61.2%，`pass^8` 不到 25%——单次排行榜掩盖了采样敏感性。
- **LLM judge 是一层防线里的薄弱环节**。它抓表面 proxy（自信的收尾话术、动作序列长度）而非状态变化；反而领域校准的 TF-IDF + XGBoost 在 10% flag rate 下找回 72% false success，最强 judge 只有 13%。
- **饱和与污染驱动军备竞赛，又加剧失真**。SWE-bench 快速饱和催生 Pro/Mobile；而 benchmark 同时被当训练目标（IFEval-FC 明示面向训练，DynaWeb/MiRA 直接用环境做 RL），度量一旦被优化就不再是度量。
- **保真度 vs 成本/可复现**。真实 OS（OSWorld、Windows Agent Arena）评测昂贵难复现；合成环境（τ-bench 的 retail/airline）可控外推但作者自述是简化域，且 user simulator 本身会算错、忘指令、接受不合理建议。
- **唯一终态假设过严**。真实任务常有多个合理终态，exact state match 的边界 case 尚无公认解法。

## 开放问题 / 观察触发器

- [ ] τ-bench 笔记提出的"policy → assertion / process + outcome 双 verifier"工程点，是否被 2025–2026 的 benchmark 实际采纳？（tau2、T1-Bench 精读时核对）
- [ ] false-success detector（当前 precision ~50%，只够 triage）能否进化成 harness 默认组件？
- [ ] 多合理终态如何表示与判分，exact state match 的替代方案是什么？
- [ ] 多智能体失败归因（MP-Bench）的标注可靠性如何，能否用于 agentic RL 的 credit assignment？
- [ ] 安全评测（AgentDyn 线）与功能评测何时合流进同一 harness？
- [ ] 本库 25 篇 stub 的精读优先级：WebArena / SWE-bench / OSWorld / tau2-bench 建议先行。
