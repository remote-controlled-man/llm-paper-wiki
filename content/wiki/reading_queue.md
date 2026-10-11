# Reading Queue

> 迁移说明：本文件原位于 `indexes/reading_queue.md`，2026-09-19 库重构后由 `wiki/` 组织层接管；论文链接已批量改写为指向 `raw/<slug>/` 的 wikilink（个别无法对应的链接保留原样并已在迁移报告中标注）。

手动维护。这里只放已经确定准备读的论文；读完并完成精读总结后，再同步到 `deep_read_log.md`。

## Next Deep Reads

目标路线：

`realtime audio-visual interaction model + streaming interleaved multimodal context + embodied grounding + VLA / diffusion robot policy + execution feedback`

当前进度：Moshi、Qwen2.5-Omni、AURA 已读完；下一篇从 StreamBridge 开始。

1. [[raw/2025_StreamBridge_Proactive_Streaming_Assistant/2025_StreamBridge_Proactive_Streaming_Assistant|StreamBridge: Turning Your Offline Video Large Language Model into a Proactive Streaming Assistant]] - 看 streaming window、缓存、触发时机、离线 VLM 到在线 proactive assistant 的改造方式。
2. [[raw/2022_Flamingo_Visual_Language_Model_FewShot_Learning/2022_Flamingo_Visual_Language_Model_FewShot_Learning|Flamingo: a Visual Language Model for Few-Shot Learning]] - 补 interleaved image/text few-shot VLM 的基础结构。
3. [[raw/2024_Chameleon_MixedModal_EarlyFusion_Foundation_Models/2024_Chameleon_MixedModal_EarlyFusion_Foundation_Models|Chameleon: Mixed-Modal Early-Fusion Foundation Models]] - 看 early-fusion mixed-modal token 建模。
4. [[raw/2024_AnyGPT_Unified_Multimodal_LLM_Discrete_Sequence_Modeling/2024_AnyGPT_Unified_Multimodal_LLM_Discrete_Sequence_Modeling|AnyGPT: Unified Multimodal LLM with Discrete Sequence Modeling]] - 看用离散 token 统一 text/speech/image/music 等模态的思路。
5. [[raw/2022_VIMA_General_Robot_Manipulation_Multimodal_Prompts/2022_VIMA_General_Robot_Manipulation_Multimodal_Prompts|VIMA: General Robot Manipulation with Multimodal Prompts]] - 从纯多模态模型转到机器人任务 prompt/action grounding。
6. [[raw/2023_RT2_Vision_Language_Action_Models_Robotic_Control/2023_RT2_Vision_Language_Action_Models_Robotic_Control|RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control]] - 看 VLM 如何直接输出 robot action tokens。
7. [[raw/2024_OpenVLA_OpenSource_Vision_Language_Action_Model/2024_OpenVLA_OpenSource_Vision_Language_Action_Model|OpenVLA: An Open-Source Vision-Language-Action Model]] - 看开源 VLA 的输入、动作表示、训练数据和部署约束。
8. [[raw/2024_pi0_Vision_Language_Action_Flow_Model_General_Robot_Control/2024_pi0_Vision_Language_Action_Flow_Model_General_Robot_Control|pi0: A Vision-Language-Action Flow Model for General Robot Control]] / [[raw/2025_pi0_5_VLA_OpenWorld_Generalization/2025_pi0_5_VLA_OpenWorld_Generalization|pi0.5: A Vision-Language-Action Model with Open-World Generalization]] - 看 diffusion/flow policy 如何把视觉语言条件转成连续控制。
9. [[raw/2023_Open_X_Embodiment_RT_X_Models/2023_Open_X_Embodiment_RT_X_Models|Open X-Embodiment: Robotic Learning Datasets and RT-X Models]] - 看跨机器人数据、动作空间、泛化和 embodied data mixture。
10. [[raw/2025_GR00T_N1_Open_Foundation_Model_Generalist_Humanoid_Robots/2025_GR00T_N1_Open_Foundation_Model_Generalist_Humanoid_Robots|GR00T N1: An Open Foundation Model for Generalist Humanoid Robots]] - 看 generalist robot foundation model 的系统路线和数据/策略层。
11. [[raw/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR|AgentHands: Spatio-Temporal Grounding of LLM Agents via Hand Gestures for Mixed Reality Headsets]] - 回看 embodied grounding、speech-action synchronization、结构化事件和输出事件设计。
12. [[raw/2026_CHI_What_Are_You_Doing_Intermediate_Feedback_Agentic_In_Car_Assistants/2026_CHI_What_Are_You_Doing_Intermediate_Feedback_Agentic_In_Car_Assistants|What Are You Doing?: Designing Intermediate Feedback for Agentic AI in Car Assistants]] - 补 execution feedback：agent 正在做什么、为什么做、做到哪一步，如何让用户理解和打断。

## Lower Priority / Design References

- [[raw/2023_OpenFlamingo_Autoregressive_Vision_Language_Models/2023_OpenFlamingo_Autoregressive_Vision_Language_Models|OpenFlamingo: An Open-Source Framework for Training Large Autoregressive Vision-Language Models]] - Flamingo 读完后需要开源实现细节时再补。
- [[raw/2026_CHI_PointAloud_Pointer_Centric_Think_Aloud/2026_CHI_PointAloud_Pointer_Centric_Think_Aloud|PointAloud Pointer-Centric Think-Aloud]] - 设计/grounding 参考。
- [[raw/2026_CHI_Human_Pragmatic_Language_To_CA_Design_Review/2026_CHI_Human_Pragmatic_Language_To_CA_Design_Review|Human Pragmatic Language To CA Design Review]] - 语言 pragmatics 参考。
- [[raw/2025_MMDuet2_Proactive_Video_Question_Answering/2025_MMDuet2_Proactive_Video_Question_Answering|MMDuet2: Enhancing Proactive Interaction of Video MLLMs with Multi-Turn Reinforcement Learning]] - 深化 proactive video interaction 的 RL 训练时再读。

## Rules

- 用户确定下一批要读的论文后，更新本文档。
- 优先链接到论文 Markdown 笔记；如果还没有笔记，可以先链接到 PDF。
- 精读完成后，不需要长期留在这里；把结果写入 `deep_read_log.md`。
- 不做复杂状态系统，保持清单简洁。

## Agent Paper Map Queue (2026-06-21)

来源：飞书 Wiki `Agent 方向论文地图（集成核验版，2026-06-18）`。先读低算力主线，再读各方向 baseline。

推荐顺序：

1. Agent-Diff（已精读 2026-06-22） -> tau-bench（已精读 2026-06-22） -> （按 2026-06-23 决定跳过剩余 benchmark，包括 AppWorld） -> Agent Lightning（已精读 2026-06-23） -> AgentRL（已精读 2026-06-23） -> ARPO（已精读 2026-06-24） -> CacheRL（已精读 2026-06-26） -> SENTINEL（已精读 2026-06-26） -> ContextRL（已精读 2026-06-26） -> Polar（已精读 2026-06-26） -> AgentJet（已精读 2026-06-26） -> MUA-RL（已精读 2026-06-28） -> RAGEN（已精读 2026-06-28） -> Search-R1（已精读 2026-06-28） -> Reward Hacking Benchmark（已略读 2026-06-28，不精读） -> Reward Hacking in Language Model Agents（已略读 2026-06-28，不精读） -> False Success in LLM Agents（已略读 2026-06-28，不精读） -> AgentDojo（待 triage）
2. Reward Hacking Benchmark -> Reward Hacking in Language Model Agents -> False Success in LLM Agents -> AgentDojo（待 triage） -> SecureClaw
3. MemGPT -> Mem0 -> EvoMemBench -> MemGym -> Agent Memory characterization
4. SWE-bench -> SWE-agent -> SWE-Gym -> Open-SWE-Traces -> Hybrid-Gym -> DynaWeb -> OpAgent
5. MultiAgentBench -> Magentic-One -> MP-Bench -> Why Do Multi-Agent LLM Systems Fail? -> MAGRPO

### Agentic RL / Tool-use Agents / Benchmark / Environment

> 2026-06-23：按用户要求，剩余 benchmark 暂时跳过，直接进入 Algorithm / Training 阶段。

- [x] [[raw/2026-02_Agent_Diff_2602.11224/2026-02_Agent_Diff_2602.11224|Agent-Diff]] - 已精读 2026-06-22；企业 API agent benchmark，用 state-diff contract 判定真实环境状态变化，特别适合做 verifier / verifiable reward。
- [x] [[raw/2024-06_tau_bench_2406.12045/2024-06_tau_bench_2406.12045|tau-bench]] - 已精读 2026-06-22；LM 用户 + policy + stateful APIs + 唯一目标状态，并用 `pass^k` 衡量重复运行可靠性。
- [[raw/2025-06_tau2_Bench_2506.07982/2025-06_tau2_Bench_2506.07982|tau2-Bench]] - dual-control 环境，用户和 agent 都能操作共享状态，更接近客服/运维真实场景。
- [[raw/2024-08_ToolSandbox_2408.04682/2024-08_ToolSandbox_2408.04682|ToolSandbox]] - Apple 的 stateful conversational tool-use benchmark，有动态里程碑和用户模拟器。
- [[raw/2024-07_AppWorld_2407.18901/2024-07_AppWorld_2407.18901|AppWorld]] - 9 个 app、457 APIs、750 tasks，按状态单测判分，适合 code+tool agent。
- BFCL - 未下载 PDF，原链接：https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html；Berkeley Function Calling Leaderboard，function calling 基础评测和回归测试常用。
- [[raw/2025-09_IFEval_FC_2509.18420/2025-09_IFEval_FC_2509.18420|IFEval-FC]] - 函数调用里的指令遵循和参数约束评测，适合低成本可判分训练。
- [[raw/2026-06_T1_Bench_2606.11070/2026-06_T1_Bench_2606.11070|T1-Bench]] - 多场景真实客户交互 benchmark，覆盖 25 个 domain，适合复杂多轮 agent。
- [[raw/2026-05_ComplexMCP_2605.10787/2026-05_ComplexMCP_2605.10787|ComplexMCP]] - MCP 大规模 interdependent tool sandbox，适合做复杂工具检索和恢复策略。
- [[raw/2025-12_MCPAgentBench_2512.24565/2025-12_MCPAgentBench_2512.24565|MCPAgentBench]] - 面向真实 MCP tool definitions 的 agent tool-use benchmark。
- [~] [[raw/2026-06_False_Success_in_LLM_Agents_2606.09863/2026-06_False_Success_in_LLM_Agents_2606.09863|False Success in LLM Agents]] - 已略读 2026-06-28；monitor/verifier 背景，核心是 agent 声称完成但环境状态没变，LLM judge 不可靠，轻量 detector 更适合 triage。
- [~] [[raw/2026-05_Reward_Hacking_Benchmark_2605.02964/2026-05_Reward_Hacking_Benchmark_2605.02964|Reward Hacking Benchmark]] - 已略读 2026-06-28；保留为 verifier/reward design 背景，不精读。核心提醒是 agent 可能读 metadata、篡改 evaluator、伪造中间产物或钻 parser 空子。
- [~] [[raw/2026-06_Reward_Hacking_in_Language_Model_Agents_2606.15385/2026-06_Reward_Hacking_in_Language_Model_Agents_2606.15385|Reward Hacking in Language Model Agents]] - 已略读 2026-06-28；文本版 Safety Gridworlds，核心价值是 observed reward vs hidden safety reward，说明 GRPO 可能放大 proxy reward 捷径。
### Agentic RL / Tool-use Agents / Algorithm / Training

- [x] [[raw/2025-10_AgentRL_2510.04206/2025-10_AgentRL_2510.04206|AgentRL]] - 已精读 2026-06-23；用完全异步 rollout-training、容器化 Function Call 环境、cross-policy sampling 和 task advantage normalization 扩展多轮多任务 RL。
- [x] [[raw/2025-08_Agent_Lightning_2508.03680/2025-08_Agent_Lightning_2508.03680|Agent Lightning]] - 已精读 2026-06-23；把现有 agent runtime 和 RL trainer 解耦，将每次 LLM 调用抽成 transition，并用 LightningRL/TA disaggregation 接入训练。
- [x] [[raw/2025-07_ARPO_2507.19849/2025-07_ARPO_2507.19849|ARPO]] - 已精读 2026-06-24；用 entropy-based adaptive rollout 聚焦工具返回后的高不确定步骤，并做 shared-prefix / branch-suffix advantage attribution，补 AgentRL 之后的多轮工具调用局部探索与 credit assignment。
- [x] [[raw/2025-04_RAGEN_2504.20073/2025-04_RAGEN_2504.20073|RAGEN]] - 已精读 2026-06-28；提出 StarPO/StarPO-S 诊断多轮 agent RL 的 Echo Trap、reward variance cliff、gradient spike 和 reasoning collapse。
- [x] [[raw/2025-03_Search_R1_2503.09516/2025-03_Search_R1_2503.09516|Search-R1]] - 已精读 2026-06-28；把搜索引擎作为多轮 RL rollout 环境动作，并用 retrieved-token loss masking 防止把检索文本误当成 policy token 优化。
- [x] [[raw/2026-06_CacheRL_2606.14179/2026-06_CacheRL_2606.14179|CacheRL]] - 已精读 2026-06-26；用 GPT-5 thinking trajectory 蒸馏、cached rollout、token mask 和 cache-tier-aware hybrid reward 低成本训练 multi-turn tool-calling 小模型。
- [x] [[raw/2026-06_SENTINEL_2606.12908/2026-06_SENTINEL_2606.12908|SENTINEL]] - 已精读 2026-06-26；用 Controller-Proposer-Solver loop 把失败轨迹诊断成 failure modes，再生成可执行 targeted tasks 做 GRPO。
- [x] [[raw/2026-06_ContextRL_2606.17053/2026-06_ContextRL_2606.17053|ContextRL]] - 已精读 2026-06-26；给 GRPO 加 contrastive context-selection 辅助目标，训练模型在相似 trajectory/image 中识别哪个 context 支持答案。
- [x] [[raw/2026-05_Polar_2605.24220/2026-05_Polar_2605.24220|Polar]] - 已精读 2026-06-26；把模型 API proxy 当黑盒 harness 的 rollout boundary，捕获 token/logprob/mask 并重建 token-faithful trajectories。
- [x] [[raw/2026-06_AgentJet_2606.04484/2026-06_AgentJet_2606.04484|AgentJet]] - 已精读 2026-06-26；用 swarm server/client 解耦 GPU 训练和 agent runtime，支持多模型、多任务、故障隔离、timeline merging 和自动化 RL 研究。
- [x] [[raw/2025-08_MUA_RL_2508.18669/2025-08_MUA_RL_2508.18669|MUA-RL]] - 已精读 2026-06-28；把 LLM-simulated user 放进 GRPO rollout，训练 agent 在动态用户互动中沟通、确认、调用工具并完成最终任务。
### Coding / Web / Computer-use Agents / Benchmark / Environment

- [[raw/2023-10_SWE_bench_2310.06770/2023-10_SWE_bench_2310.06770|SWE-bench]] - 真实 GitHub issue 修复 benchmark，是 coding agent 主线评测基础。
- [[raw/2024-05_SWE_agent_2405.15793/2024-05_SWE_agent_2405.15793|SWE-agent]] - 经典 SWE agent 系统，重点是 agent-computer interface。
- [[raw/2024-12_SWE_Gym_2412.21139/2024-12_SWE_Gym_2412.21139|SWE-Gym]] - 真实 SWE agent 训练环境，公开环境、模型和轨迹资源。
- [[raw/2025-04_R2E_Gym_AgentGym_2504.07164/2025-04_R2E_Gym_AgentGym_2504.07164|R2E-Gym / AgentGym]] - 程序化生成 8.7K SWE 环境，并结合 hybrid verifier 做 test-time scaling。
- [[raw/2024-10_SWE_bench_Multimodal_2410.03859/2024-10_SWE_bench_Multimodal_2410.03859|SWE-bench Multimodal]] - 将 SWE-bench 扩展到前端/视觉软件问题，测试多模态代码修复能力。
- [[raw/2025-04_Multi_SWE_bench_2504.02605/2025-04_Multi_SWE_bench_2504.02605|Multi-SWE-bench]] - 把 issue resolving 从 Python 扩展到 Java、TS、JS、Go、Rust、C、C++。
- [[raw/2025-09_SWE_Bench_Pro_2509.16941/2025-09_SWE_Bench_Pro_2509.16941|SWE-Bench Pro]] - 更长程、更接近企业真实软件工程问题的高难 SWE benchmark。
- [[raw/2026-06_Open_SWE_Traces_2606.16038/2026-06_Open_SWE_Traces_2606.16038|Open-SWE-Traces]] - 207k 多语言 SWE agent 轨迹，适合 SFT、蒸馏和 RL warm-start。
- [[raw/2026-02_Hybrid_Gym_2602.16819/2026-02_Hybrid_Gym_2602.16819|Hybrid-Gym]] - 训练 coding agent 可迁移技能的合成环境，覆盖定位、依赖搜索等能力。
- [[raw/2026-03_SWE_Skills_Bench_2603.15401/2026-03_SWE_Skills_Bench_2603.15401|SWE-Skills-Bench]] - 检验 agent skill 是否真的帮 SWE agent，适合做 skill/经验评测。
- [[raw/2026-02_SWE_Bench_Mobile_2602.09540/2026-02_SWE_Bench_Mobile_2602.09540|SWE-Bench Mobile]] - 工业级 iOS app 开发 benchmark，比普通 SWE-bench 更新、更贴近真实产品开发。
- [[raw/2023-07_WebArena_2307.13854/2023-07_WebArena_2307.13854|WebArena]] - 真实 web 环境基准，覆盖电商、论坛、GitLab、CMS 等。
- [[raw/2024-01_VisualWebArena_2401.13649/2024-01_VisualWebArena_2401.13649|VisualWebArena]] - 多模态 web agent benchmark，强调视觉 grounding。
- [[raw/2024-03_WorkArena_BrowserGym_2403.07718/2024-03_WorkArena_BrowserGym_2403.07718|WorkArena / BrowserGym]] - ServiceNow 知识工作任务 + BrowserGym 环境，适合企业 web workflow。
- [[raw/2024-04_OSWorld_2404.07972/2024-04_OSWorld_2404.07972|OSWorld]] - 真实桌面环境、多模态 computer-use agent，Ubuntu/Windows/macOS 任务。
- [[raw/2024-09_Windows_Agent_Arena_2409.08264/2024-09_Windows_Agent_Arena_2409.08264|Windows Agent Arena]] - Windows 真实 OS agent 基准，强调可扩展并行评测。
- [[raw/2024-02_OmniACT_2402.17553/2024-02_OmniACT_2402.17553|OmniACT]] - 桌面和网页多模态任务，目标是从截图和指令生成可执行操作。
- [[raw/2024-01_WebVoyager_2401.13919/2024-01_WebVoyager_2401.13919|WebVoyager]] - 真实网站端到端 web agent benchmark，适合多模态网页操作。
- [[raw/2024-10_VideoWebArena_2410.19100/2024-10_VideoWebArena_2410.19100|VideoWebArena]] - 视频教程 + web task，评测长上下文多模态 agent。
### Coding / Web / Computer-use Agents / Algorithm / Training

- [[raw/2025-11_SkyRL_Agent_2511.16108/2025-11_SkyRL_Agent_2511.16108|SkyRL-Agent]] - 高效多轮 agent RL 框架，训练 SWE agent，并兼容多种 RL backend。
- [[raw/2024-07_Agentless_2407.01489/2024-07_Agentless_2407.01489|Agentless]] - 用定位、修复、验证三阶段证明简单非交互 pipeline 也能作为强 SWE baseline。
- [[raw/2024-07_OpenHands_2407.16741/2024-07_OpenHands_2407.16741|OpenHands]] - 开源软件开发 agent 平台，覆盖代码执行、CLI、浏览器和多 benchmark 评测。
- [[raw/2025-01_SWE_Fixer_2501.05040/2025-01_SWE_Fixer_2501.05040|SWE-Fixer]] - 训练开源模型做 GitHub issue resolving，拆成检索模块和编辑模块。
- [[raw/2025-04_SWE_smith_2504.21798/2025-04_SWE_smith_2504.21798|SWE-smith]] - 大规模合成 SWE 训练任务和轨迹，并训练 SWE-agent-LM-32B。
- [[raw/2025-12_Self_play_SWE_RL_2512.18552/2025-12_Self_play_SWE_RL_2512.18552|Self-play SWE-RL]] - agent 自己注入 bug 再修复，用 test patch 做 verifiable reward。
- [[raw/2025-06_Agent_RLVR_2506.11425/2025-06_Agent_RLVR_2506.11425|Agent-RLVR]] - coding agent 的 guidance + environment reward 训练路线。
- [[raw/2025-02_SWE_RL_2502.18449/2025-02_SWE_RL_2502.18449|SWE-RL]] - 用软件演化数据做 RL，提高 SWE-bench 表现。
- [[raw/2025-05_WebAgent_R1_2505.16421/2025-05_WebAgent_R1_2505.16421|WebAgent-R1]] - WebArena-Lite 上端到端多轮 online RL。
- [[raw/2025-05_WorkForceAgent_R1_2505.22942/2025-05_WorkForceAgent_R1_2505.22942|WorkForceAgent-R1]] - WorkArena 中用 R1-style reward 改善 web navigation。
- [[raw/2026-02_OpAgent_2602.13559/2026-02_OpAgent_2602.13559|OpAgent]] - web navigation 在线 RL，结合 WebJudge 和 rule decision tree。
- [[raw/2026-03_MiRA_Subgoal_Web_Agent_2603.19685/2026-03_MiRA_Subgoal_Web_Agent_2603.19685|MiRA / Subgoal Web Agent]] - milestone-based dense reward，缓解 web 长程 credit assignment。
- [[raw/2026-01_DynaWeb_2601.22149/2026-01_DynaWeb_2601.22149|DynaWeb]] - model-based RL for web agents，用 world model 降低在线交互成本。
- [[raw/2025-08_ComputerRL_2508.14040/2025-08_ComputerRL_2508.14040|ComputerRL]] - GUI / OS agent online RL，适合 computer-use 方向。
### MCP / Agent Safety / Benchmark / Environment

- [[raw/2025-10_MCP_Security_Bench_MSB_2510.15994/2025-10_MCP_Security_Bench_MSB_2510.15994|MCP Security Bench (MSB)]] - 端到端评测 MCP agent 在规划、工具调用、响应处理全链路中的攻击鲁棒性。
- [[raw/2025-08_MCPSecBench_2508.13220/2025-08_MCPSecBench_2508.13220|MCPSecBench]] - 系统化覆盖 MCP 的多类攻击和多平台 client/server/playground 测试。
- [[raw/2025-08_MCP_Bench_2508.20453/2025-08_MCP_Bench_2508.20453|MCP-Bench]] - 用真实 MCP servers 测多步工具选择、跨工具协调和参数控制能力。
- [[raw/2024-06_AgentDojo_2406.13352/2024-06_AgentDojo_2406.13352|AgentDojo]] - 待 triage；动态 prompt injection 攻防环境，覆盖工具和不可信数据。
- [[raw/2024-03_InjecAgent_2403.02691/2024-03_InjecAgent_2403.02691|InjecAgent]] - 面向 tool-integrated agents 的间接 prompt injection benchmark。
- [[raw/2024-12_Agent_SafetyBench_2412.14470/2024-12_Agent_SafetyBench_2412.14470|Agent-SafetyBench]] - 覆盖大量交互环境和 safety test cases 的 agent safety benchmark。
- [[raw/2024-10_Agent_Security_Bench_2410.02644/2024-10_Agent_Security_Bench_2410.02644|Agent Security Bench]] - 系统化 benchmark agent 攻击与防御，覆盖工具、记忆、prompt 等阶段。
- [[raw/2025-04_MCP_Safety_Audit_2504.03767/2025-04_MCP_Safety_Audit_2504.03767|MCP Safety Audit]] - 审计 MCP server 安全风险，提供 MCPSafetyScanner 工具。
- [[raw/2025-08_MCPTox_2508.14925/2025-08_MCPTox_2508.14925|MCPTox]] - 真实 MCP servers 上的 tool poisoning benchmark。
- [[raw/2025-07_OpenAgentSafety_2507.06134/2025-07_OpenAgentSafety_2507.06134|OpenAgentSafety]] - 用真实工具、文件系统、浏览器、消息平台评测多用户多轮 agent 安全风险。
- [[raw/2026-02_AgentDyn_2602.03117/2026-02_AgentDyn_2602.03117|AgentDyn]] - 动态开放式 prompt injection benchmark，覆盖 shopping/GitHub/daily life。
- [[raw/2026-02_AgentLeak_2602.11510/2026-02_AgentLeak_2602.11510|AgentLeak]] - 多 agent 系统隐私泄露 benchmark，覆盖内部消息、记忆和工具参数。
### MCP / Agent Safety / Defense / System

- [[raw/2026-02_AgentSentry_2602.22724/2026-02_AgentSentry_2602.22724|AgentSentry]] - 用 temporal causal diagnostics 和 context purification 缓解多轮间接 prompt injection。
- [[raw/2026-06_SecureClaw_2606.09549/2026-06_SecureClaw_2606.09549|SecureClaw]] - 双边界防护：读边界保护 plaintext，写边界做 PREVIEW-to-COMMIT 授权。
- [[raw/2025-03_AgentSpec_2503.18666/2025-03_AgentSpec_2503.18666|AgentSpec]] - 用 DSL 做 runtime constraint enforcement，限制 agent 执行不安全动作。
- [[raw/2026-04_MCPSHIELD_2604.05969/2026-04_MCPSHIELD_2604.05969|MCPSHIELD]] - MCP threat taxonomy、formal verification model 和 defense-in-depth 架构。
- [[raw/2026-06_Gradient_Regularization_Prevents_Reward_Hacking_2606.10086/2026-06_Gradient_Regularization_Prevents_Reward_Hacking_2606.10086|Gradient Regularization Prevents Reward Hacking]] - 可作为 agent RL reward hacking 防御的理论背景。
### Memory / Reflection / Experience / Benchmark / Environment

- [[raw/2026-05_EvoMemBench_2605.18421/2026-05_EvoMemBench_2605.18421|EvoMemBench]] - 从 self-evolving 视角 benchmark agent memory，区分 in-episode/cross-episode 和 knowledge/execution memory。
- [[raw/2025-06_MemBench_2506.21605/2025-06_MemBench_2506.21605|MemBench]] - 从 factual/reflective memory 与 participation/observation 场景综合评测 agent memory。
- [[raw/2025-11_Evo_Memory_2511.20857/2025-11_Evo_Memory_2511.20857|Evo-Memory]] - streaming benchmark + framework，评测 test-time self-evolving memory。
- [[raw/2026-05_MemGym_2605.20833/2026-05_MemGym_2605.20833|MemGym]] - 把 memory 放进 tau2、SWE-Gym、WebArena 等 agentic 环境里评测，比纯聊天 memory benchmark 更贴近 agent。
### Memory / Reflection / Experience / Algorithm / System

- [[raw/2023-10_MemGPT_Towards_LLMs_as_Operating_Systems_2310.08560/2023-10_MemGPT_Towards_LLMs_as_Operating_Systems_2310.08560|MemGPT / Letta]] - 已存在，暂不复制；把上下文管理和长期记忆显式系统化，是 memory agent 基础工作。
- [[raw/2025-04_Mem0_2504.19413/2025-04_Mem0_2504.19413|Mem0]] - 工程化 long-term memory layer，用抽取、整合、检索提升多轮个性化记忆。
- [[raw/2025-01_Zep_2501.13956/2025-01_Zep_2501.13956|Zep]] - temporal knowledge graph memory layer，对话和业务数据随时间动态融合。
- [[raw/2025-05_MemOS_2505.22101/2025-05_MemOS_2505.22101|MemOS]] - 把 memory 提升为 LLM 系统资源，提出 MemCube 和 memory lifecycle 管理。
- [[raw/2026-05_EvolveMem_2605.13941/2026-05_EvolveMem_2605.13941|EvolveMem]] - 让 memory retrieval 机制本身自演化，适合做 memory 系统论文。
- [[raw/2026-06_Agent_Memory_Characterization_and_System_Implications_2606.06448/2026-06_Agent_Memory_Characterization_and_System_Implications_2606.06448|Agent Memory: Characterization and System Implications]] - 从系统角度分析 agent memory 的构建、检索、生成成本，适合做 memory system 背景。
- [[raw/2026-03_Memory_for_Autonomous_LLM_Agents_2603.07670/2026-03_Memory_for_Autonomous_LLM_Agents_2603.07670|Memory for Autonomous LLM Agents]] - 综述类，但对 memory 方向 taxonomy 和 open challenges 有用。
### Multi-agent Collaboration / Orchestration / Benchmark / Environment

- [[raw/2025-03_MultiAgentBench_2503.01935/2025-03_MultiAgentBench_2503.01935|MultiAgentBench]] - 同时评测多智能体 collaboration 和 competition，并比较多种协作拓扑。
- [[raw/2023-08_AgentBench_2308.03688/2023-08_AgentBench_2308.03688|AgentBench]] - 通用 LLM-as-agent benchmark，覆盖 8 类交互环境。
- [[raw/2023-08_AutoGen_AutoGenBench_2308.08155/2023-08_AutoGen_AutoGenBench_2308.08155|AutoGen / AutoGenBench]] - 多 agent conversation framework，Magentic-One 中包含 AutoGenBench evaluation tool。
- [[raw/2024-11_Magentic_One_2411.04468/2024-11_Magentic_One_2411.04468|Magentic-One]] - Microsoft generalist multi-agent system，含 orchestrator 和 specialized agents。
- [[raw/2026-03_MP_Bench_2603.25001/2026-03_MP_Bench_2603.25001|MP-Bench]] - multi-perspective failure attribution benchmark，避免单一 root-cause 假设。
### Multi-agent Collaboration / Orchestration / Algorithm / System

- [[raw/2023-07_ChatDev_2307.07924/2023-07_ChatDev_2307.07924|ChatDev]] - 多 agent 软件开发流程经典系统，适合看通信链路和角色分工。
- [[raw/2023-08_MetaGPT_2308.00352/2023-08_MetaGPT_2308.00352|MetaGPT]] - SOP 驱动的多 agent 协作框架，适合作为多 agent 系统基线。
- [[raw/2023-09_AutoAgents_2309.17288/2023-09_AutoAgents_2309.17288|AutoAgents]] - 自动生成多个 specialized agents，并进行协作规划。
- [[raw/2024-08_AutoGen_Studio_2408.15247/2024-08_AutoGen_Studio_2408.15247|AutoGen Studio]] - 多 agent workflow 的 no-code prototyping/debugging 工具。
- [[raw/2025-08_MAGRPO_2508.04652/2025-08_MAGRPO_2508.04652|MAGRPO]] - 把 LLM 多智能体协作建模成 cooperative MARL 训练问题。
- [[raw/2025-02_MAPoRL_2502.18439/2025-02_MAPoRL_2502.18439|MAPoRL]] - 多 agent post-co-training，用 verifier reward 训练协作讨论。
- [[raw/2025-03_Why_Do_Multi_Agent_LLM_Systems_Fail_2503.13657/2025-03_Why_Do_Multi_Agent_LLM_Systems_Fail_2503.13657|Why Do Multi-Agent LLM Systems Fail?]] - 总结 14 类 MAS failure modes，适合做多 agent 诊断 taxonomy。



### Jev / System One 决策模型方向（2026-09-19 新增）

- [[raw/2025-09_Confidence_Aware_Routing_LLM_Hallucination_Mitigation_2510.01237/2025-09_Confidence_Aware_Routing_LLM_Hallucination_Mitigation_2510.01237|Confidence-Aware Routing]] - 生成前置信度评估+四级路由，与 Jev 校准主张同线的先行工作（自发布短文，批判性阅读）。
- [[raw/2025-03_SalesRLAgent_RealTime_Sales_Conversion_Prediction_2503.23303/2025-03_SalesRLAgent_RealTime_Sales_Conversion_Prediction_2503.23303|SalesRLAgent]] - Reddit 撞车争议中的"先行工作"，非自回归决策概率估计（自发布短文，批判性阅读）。
- 背景页：[[wiki/concepts/System_One_Decision_Models]]、[[wiki/entities/Jev]]
