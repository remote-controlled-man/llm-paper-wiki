# Deep Read Log

> 迁移说明：本文件原位于 `indexes/deep_read_log.md`，2026-09-19 库重构后由 `wiki/` 组织层接管；论文链接已批量改写为指向 `raw/<slug>/` 的 wikilink。

这个文件记录已经精读过的论文，帮助快速回忆“我读过什么、带走了什么”。
只记录真正精读过的论文；不要把只是下载、收藏、粗读、已有 Markdown 笔记的论文自动算进来。

## 记录格式

| Date | Paper | Area | One-line takeaway |
| --- | --- | --- | --- |

## 已精读

| Date | Paper | Area | One-line takeaway |
| --- | --- | --- | --- |
| 2026-06-01 | [[raw/2026_CHI_Interaction_Augmented_Instruction/2026_CHI_Interaction_Augmented_Instruction|Interaction-Augmented Instruction]] | Human-AI interaction / interaction model | 价值在术语和分类：提出 `T/I/A -> Aug -> G` 的概念框架，但没有真正的 schema、模型接口或 agent/robot harness 落地。 |
| 2026-06-01 | [[raw/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR|AgentHands]] | Embodied agent / spatial grounding | 价值在工程分层：让 LLM 输出 speech + GestureEvent，用 object registry、trigger word 和 runtime 把语言与空间锚定动作同步。 |
| 2026-06-01 | [[raw/2026_CHI_Beyond_Static_Instruction_AR_Robot_Training/2026_CHI_Beyond_Static_Instruction_AR_Robot_Training|Beyond Static Instruction]] | AR robot training / application-layer HRI | 主要价值在 AR/Unity/ROS2 机器人训练应用；multi-agent LLM adaptation 更偏概念和未来工作，不是核心 interaction model。 |
| 2026-06-01 | [[raw/2026_CHI_Prototyping_Multimodal_GenAI_RealTime_Agents/2026_CHI_Prototyping_Multimodal_GenAI_RealTime_Agents|Prototyping Multimodal GenAI Real-Time Agents]] | Multimodal agent harness / realtime prototyping | 价值在 human-in-the-loop scaffold：用 replay、wizard、prompt 和标注调试实时多模态 agent，可沉淀时机判断与介入质量数据。 |
| 2026-06-01 | [[raw/2026_CHI_Agentic_Audio_Moderator_Usability_Testing/2026_CHI_Agentic_Audio_Moderator_Usability_Testing|Agentic Audio Moderator]] | Audio agent harness / spoken interaction | 本质是豆包 Coze 语音对话能力加 workflow/prompt 的主持人 harness；能跑结构化流程，但没有解决 turn-taking、barge-in 或用户状态模型。 |
| 2026-06-01 | [[raw/2026_CHI_How_Humans_Naturally_Refer_To_Targets_HRI/2026_CHI_How_Humans_Naturally_Refer_To_Targets_HRI|How Humans Naturally Refer to Targets]] | Embodied multimodal grounding / HRI | 当前最相关：自然用户常用模糊语言，机器人必须以 gaze 为主、hand/head/speech timing 为辅来做 target grounding。 |
| 2026-06-01 | [[raw/2026_Synchronization_Turn_Taking_Full_Duplex_Speech_Dialogue_Models/2026_Synchronization_Turn_Taking_Full_Duplex_Speech_Dialogue_Models|Synchronization and Turn-Taking in Full-Duplex Speech Dialogue Models]] | Full-duplex speech / turn-taking | 很相关但偏底层评估：用 Moshi 双实例模拟对话，通过 CKA 和 causal LSTM probe 证明 hidden states 中存在同步和提前 turn-taking 线索。 |
| 2026-06-05 | [[raw/2025_Qwen2_5_Omni_Technical_Report/2025_Qwen2_5_Omni_Technical_Report|Qwen2.5-Omni Technical Report]] | Realtime omni model / audio-visual interaction | 价值在实时多模态交互底座：Thinker-Talker、TMRoPE 和 streaming encoders 支持 text/audio/image/video 到 text/speech，但不输出 robot action 或 harness tool call。 |
| 2026-06-08 | [[raw/2026_AURA_Proactive_Audio_Visual_Interaction/2026_AURA_Proactive_Audio_Visual_Interaction|AURA: Always-On Understanding and Real-Time Assistance via Video Streams]] | Streaming video interaction / proactive visual assistant | AURA 把 VideoLLM 做成统一的 always-on streaming assistant：用 `<|silent|>`、双滑窗上下文、三类 QA 数据和 Silent-Speech Balanced Loss 学会何时沉默、何时实时/主动回应，但不输出机器人动作。 |
| 2026-06-08 | [[raw/2026-04_Full_Duplex_Bench_v3_2604.04847/2026-04_Full_Duplex_Bench_v3_2604.04847|Full-Duplex-Bench-v3]] | Voice agent benchmark / tool use | 高相关评测：真实人声 + disfluency + 多步 mock API 调用，重点测 tool selection、argument accuracy、Pass@1、tool-call latency 和 turn-taking；它是 function-call harness 评测，不是 action-channel 架构论文。 |
| 2026-06-08 | [[raw/2026_DuplexSLA_Full_Duplex_Speech_Language_Action/2026_DuplexSLA_Full_Duplex_Speech_Language_Action|DuplexSLA]] | Full-duplex speech-language-action / action channel | 高相关架构论文：把助手语音和 planning、turn-taking label、JSON tool call 放进同一 160 ms chunk timeline，实现边听边说边输出动作；更像 interaction-model action channel，但还不是机器人连续动作模型。 |

| 2026-06-22 | [[raw/2026-02_Agent_Diff_2602.11224/2026-02_Agent_Diff_2602.11224|Agent-Diff]] | Agentic RL / enterprise API agent benchmark | 价值在评测协议：用容器化企业 API replica 和 state-diff contract 验证真实环境状态变化及副作用，比 trace matching 或 LLM judge 更适合做 verifiable reward/verifier。 |

| 2026-06-22 | [[raw/2024-06_tau_bench_2406.12045/2024-06_tau_bench_2406.12045|tau-bench]] | Agentic RL / tool-agent-user benchmark | 用 LM 用户、domain policy 和 stateful APIs 构造多轮任务，以最终数据库状态判分，并用 `pass^k` 暴露同一任务在随机对话下的不稳定性。 |
| 2026-06-23 | [[raw/2025-08_Agent_Lightning_2508.03680/2025-08_Agent_Lightning_2508.03680|Agent Lightning]] | Agentic RL / algorithm and training system | 将任意 agent 执行轨迹拆成每次 LLM 调用的 transition，并用 Training-Agent Disaggregation 让已有 agent runtime 在少改代码的情况下接入 RL 训练。 |
| 2026-06-23 | [[raw/2025-10_AgentRL_2510.04206/2025-10_AgentRL_2510.04206|AgentRL]] | Agentic RL / multi-task training system | 用完全异步 rollout-training 和容器化环境扩展多轮训练，再以 cross-policy sampling 扩大探索、task-wise advantage normalization 稳定多任务优化。 |
| 2026-06-24 | [[raw/2025-07_ARPO_2507.19849/2025-07_ARPO_2507.19849|ARPO]] | Agentic RL / rollout and credit assignment | 用工具返回后的 token entropy 触发 partial rollout 分支，并用 shared-prefix / branch-suffix advantage attribution 在固定预算下更集中探索多轮工具调用关键步骤。 |
| 2026-06-26 | [[raw/2026-06_CacheRL_2606.14179/2026-06_CacheRL_2606.14179|CacheRL]] | Agentic RL / cached rollout and reward design | 用 GPT-5 reasoning 蒸馏建立强 SFT，再用 cached rollout、token mask 和 cache-tier-aware reward 降低多轮工具调用 RL 成本；关键结论是数据质量和 reward attribution 比复杂 RL 算法更决定效果。 |
| 2026-06-26 | [[raw/2026-06_SENTINEL_2606.12908/2026-06_SENTINEL_2606.12908|SENTINEL]] | Agentic RL / failure-driven task generation | 用失败轨迹驱动训练任务分布：Controller 诊断 failure modes，Proposer 生成可执行 targeted tasks，Solver 再用 GRPO 补当前弱点，比固定通用任务更适合 strong/SFT agent。 |
| 2026-06-26 | [[raw/2026-06_ContextRL_2606.17053/2026-06_ContextRL_2606.17053|ContextRL]] | Agentic RL / context grounding | 给 GRPO 加 bounded contrastive context-selection loss，让模型在相似 trajectory/image 中识别哪个 context 支持答案；关键是训练 grounding 信号而不是简单增加 contrastive data。 |
| 2026-06-26 | [[raw/2026-05_Polar_2605.24220/2026-05_Polar_2605.24220|Polar]] | Agentic RL / rollout infrastructure | 把已有 agent harness 当黑盒运行，在模型 API 边界用 proxy 捕获 token/logprob/loss mask 并重建 token-faithful trajectories，让真实 test-time harness 直接成为 RL rollout 服务。 |

| 2026-06-26 | [[raw/2026-06_AgentJet_2606.04484/2026-06_AgentJet_2606.04484|AgentJet]] | Agentic RL / distributed training infrastructure | 用 swarm server/client 把 GPU 训练、agent runtime、任务环境和 reward 隔离开，并用 timeline merging、多模型训练和 A3R 自动研究扩展真实 agentic RL 实验。 |


| 2026-06-28 | [[raw/2025-08_MUA_RL_2508.18669/2025-08_MUA_RL_2508.18669|MUA-RL]] | Agentic RL / multi-turn user-interacting tool use | 把 LLM-simulated user、真实工具/数据库和最终任务 reward 放进 GRPO rollout，使 agent 学会在动态用户互动中澄清、确认、调用工具并完成任务。 |


| 2026-06-28 | [[raw/2025-04_RAGEN_2504.20073/2025-04_RAGEN_2504.20073|RAGEN]] | Agentic RL / multi-turn training dynamics | 用 StarPO 把整条多轮轨迹作为优化对象，并指出 Echo Trap、reward variance cliff、gradient spike 和 reasoning collapse 是多轮 agent RL 的核心训练病灶。 |


| 2026-06-28 | [[raw/2025-03_Search_R1_2503.09516/2025-03_Search_R1_2503.09516|Search-R1]] | Agentic RL / search-augmented reasoning | 把 search engine 纳入多轮 rollout，用 `<search>/<information>/<answer>` 定义工具边界，并通过 retrieved-token loss masking 只优化 agent 自己生成的 token。 |

## 维护规则

- 每精读完一篇论文，就追加一行。
- `Paper` 优先链接到该论文的 Markdown 笔记。
- `One-line takeaway` 只写一句短总结，方便回忆，不写长段复述。
- 如果一篇论文后来复读出新的理解，可以更新同一行总结，不另起重复记录。


