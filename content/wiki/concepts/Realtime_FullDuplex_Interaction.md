---
type: concept
title: "全双工与实时流式多模态交互"
sources:
  - "[[raw/2024_Moshi_Speech_Text_Foundation_Model_RealTime_Dialogue/2024_Moshi_Speech_Text_Foundation_Model_RealTime_Dialogue|Moshi（arXiv 2410.00037）]]"
  - "[[raw/2025_Qwen2_5_Omni_Technical_Report/2025_Qwen2_5_Omni_Technical_Report|Qwen2.5-Omni Technical Report]]"
  - "[[raw/2026_AURA_Proactive_Audio_Visual_Interaction/2026_AURA_Proactive_Audio_Visual_Interaction|AURA（arXiv 2604.04184）]]"
  - "[[raw/2026_DuplexSLA_Full_Duplex_Speech_Language_Action/2026_DuplexSLA_Full_Duplex_Speech_Language_Action|DuplexSLA（arXiv 2605.20755）]]"
  - "[[raw/2026-04_Full_Duplex_Bench_v3_2604.04847/2026-04_Full_Duplex_Bench_v3_2604.04847|Full-Duplex-Bench-v3（arXiv 2604.04847）]]"
  - "[[raw/2026_Synchronization_Turn_Taking_Full_Duplex_Speech_Dialogue_Models/2026_Synchronization_Turn_Taking_Full_Duplex_Speech_Dialogue_Models|Synchronization and Turn-Taking（arXiv 2605.20356）]]"
created: 2026-10-11
updated: 2026-10-11
---

# 全双工与实时流式多模态交互

## 定义

把人机对话从**回合制**（用户说完 → VAD 切回合 → ASR → LLM → TTS → 用户再开口）改造成**持续并行的流**：用户输入与系统输出在时间上重叠，系统一边听、一边说、一边决策。三个不可分割的要素：

- **Full-duplex**：收发同时进行，支持打断、抢话、backchannel、语音重叠，不靠显式话轮边界。
- **Streaming**：低延迟、边来边处理，用固定时间片（Moshi 的 80ms 音频帧、DuplexSLA 的 160ms chunk、AURA 的 1s video chunk）替代"等输入结束"。
- **交互时机（interaction timing）**：何时开口、何时沉默、何时被打断、何时主动说，成为模型要学习、被监督、被评测的一等公民，而不是后处理规则。

传统 ASR→LLM→TTS 串行 pipeline + VAD 是这条线所有论文共同的反面参照。

## 方法分类（四条支线 + 评测/分析）

- **端到端全双工语音基座**：[[raw/2024_Moshi_Speech_Text_Foundation_Model_RealTime_Dialogue/2024_Moshi_Speech_Text_Foundation_Model_RealTime_Dialogue|Moshi]]——Mimi codec 把声音变成 80ms 一帧的 audio token，user stream 与 Moshi stream 双流并行建模，Inner Monologue 用文本锚点辅助语音生成；话轮边界从架构里被删掉，overlap/interruption/backchannel 架构上原生可表达。[[raw/2026_DuplexSLA_Full_Duplex_Speech_Language_Action/2026_DuplexSLA_Full_Duplex_Speech_Language_Action|DuplexSLA]] 是这条线的直接延伸：160ms chunk 上开 user / assistant / action 三通道，planning、turn-taking label、JSON tool call 全部作为文本 action 流挂到与语音同一个时钟上——这是本库目前最接近"speech-language-action 统一交互模型"的一篇。
- **实时 omni 理解底座**：[[raw/2025_Qwen2_5_Omni_Technical_Report/2025_Qwen2_5_Omni_Technical_Report|Qwen2.5-Omni]]——text/image/video/audio 进、text+speech 出；Thinker-Talker 分离避免文语互扰，TMRoPE 对齐音画时间，block-wise prefill + 滑窗 DiT 压初始包延迟。核心贡献是流式架构工程，不做 tool call、不做动作。
- **always-on 主动视觉交互**：[[raw/2026_AURA_Proactive_Audio_Visual_Interaction/2026_AURA_Proactive_Audio_Visual_Interaction|AURA]]——连续视频流 + 显式 `<|silent|>` token，把"沉默/等待未来证据/主动回答/随事件多次更新"变成模型输出与监督信号；双滑窗（视频短窗 30s + QA 历史长窗 10 组）管理无限增长上下文；数据引擎把普通视频转成带时间戳的流式 QA。注意它是 VideoLLM + ASR/TTS 外围，不是原生语音模型。
- **机制分析（探针）**：[[raw/2026_Synchronization_Turn_Taking_Full_Duplex_Speech_Dialogue_Models/2026_Synchronization_Turn_Taking_Full_Duplex_Speech_Dialogue_Models|Synchronization & Turn-Taking]]——两个 Moshi 实例互聊，linear CKA 显示双方 hidden state 在近 0 lag 处同步，causal LSTM probe 能提前解码 EOI 与 Hold/Non-Hold。价值是证明 turn-taking 信号存在于连续模型状态里（"读状态"优于"规则看静音"），但没接回任何 policy 闭环。
- **评测基准**：[[raw/2026-04_Full_Duplex_Bench_v3_2604.04847/2026-04_Full_Duplex_Bench_v3_2604.04847|Full-Duplex-Bench-v3]]——100 条真实人声（含 non-native、非受控环境）、5 类 disfluency 标注、多步 mock API 调用、延迟与打断指标；把 full-duplex 评测从"会不会接话聊天"推进到"真实不流畅口语下能不能正确调工具"。

## 演进脉络与关键转折点

1. **转折点一（2024-10，Moshi）**：从 pipeline 到单模型流式。首次证明全双工语音对话可以端到端训练，话轮边界不是必需品。此后所有工作都在回答它留下的问题。
2. **扩模态（2025，Qwen2.5-Omni）**：问题从"怎么边听边说"变成"音画怎么时间对齐、首包延迟怎么压"。语音全双工升级为音视频实时理解。
3. **时机一等公民化（2025-2026，AURA / DuplexSLA）**：AURA 的 `<|silent|>` 和 DuplexSLA 的 action channel 是同一件事的两个侧面——"什么时候说/动"从工程规则变成模型输出。从"能流式说"走到"知道何时该沉默、何时该主动、何时该调工具"。
4. **评测与机制补课（2026，FDB-v3 / Synchronization）**：基准显示真实口语 + 工具调用仍是大坑；机制分析给出"信号在 hidden state 里"的证据。技术线与评测线在此合拢。

## 与本库其他方向的关系

- **与 VLA/机器人线互补**：[[raw/2024_OpenVLA_OpenSource_Vision_Language_Action_Model/2024_OpenVLA_OpenSource_Vision_Language_Action_Model|OpenVLA]]、[[raw/2024_pi0_Vision_Language_Action_Flow_Model_General_Robot_Control/2024_pi0_Vision_Language_Action_Flow_Model_General_Robot_Control|pi0]]、[[raw/2025_pi0_5_VLA_OpenWorld_Generalization/2025_pi0_5_VLA_OpenWorld_Generalization|pi0.5]] 解决"视觉语言条件 → 连续动作"，本概念解决"实时对话流与交互时机"；两者的接缝——DuplexSLA 式 action channel 如何接 robot policy、何时算"语义证据足够"——是本库主线开放问题。Qwen2.5-Omni 笔记已明确划出边界：它是感知-对话层，不是 VLA。
- **与 HAI 方向**：turn-taking / interruption / backchannel 是 HAI 经典议题，这条线提供"模型原生学习"而非规则实现的候选路线。
- **与 Agents 方向**：FDB-v3 把语音 agent 的 tool-use 评测与文本 agent benchmark（[[raw/2024-03_InjecAgent_2403.02691/2024-03_InjecAgent_2403.02691|InjecAgent]]、[[raw/2024-06_AgentDojo_2406.13352/2024-06_AgentDojo_2406.13352|AgentDojo]]）接上；"何时打断/确认"这类高频微决策与 [[wiki/concepts/System_One_Decision_Models|System One 决策模型]] 共享同一底层问题。

## 已知矛盾 / 争议

- **统一 vs 级联没有定论**：FDB-v3 数据显示 cascade（Whisper→GPT-4o→TTS）turn-take rate 100% 但延迟 10.12s；Gemini Live 3.1 最快（4.25s）却有 22 个场景根本没语音回应；GPT-Realtime 最准（Pass@1 0.600）。流畅、快、准不可兼得。
- **想取代 pipeline 的模型在复杂动作上还没赢**：DuplexSLA 的 multi-action accuracy 75.00%，低于 ASR+LLM cascade 的 89.33%；每 chunk 10 个 action token 的预算对复杂计划是硬约束。
- **自我修正是共同软肋**：用户改口（"去纽约——不对，波士顿"）时所有系统都差，最强的 GPT-Realtime 也只有 0.588——流式"早下决心"与"等用户改口"存在内在张力。
- **架构能力 ≠ 交互质量**：full-duplex 支持是构造性质；pause/interrupt/backchannel 的实际表现依赖后训练数据（DuplexSLA 用了 36k 小时相关数据），不是结构白送的。
- **机制证据强度有限**：Synchronization 实验是两个 Moshi 互聊而非人机，场景单一（medical appointment），长延迟 probe 可能利用模拟对话的全局时间规律。
- **"action"措辞通胀**：DuplexSLA 的 action 是文本 tool call 与控制标签，不是机器人连续控制；这条线目前没有任何一篇真正闭合到物理动作或真实 API。

## 开放问题 / 观察触发器

- [ ] 语音全双工线（Moshi/DuplexSLA，无视觉）与视觉 always-on 线（AURA，无原生音频生成）何时合并出真正的音视频全双工模型？
- [ ] turn-taking probe 信号何时被接回 policy 闭环（何时停 TTS、何时插话、打断后如何修复对话）？
- [ ] 流式统一模型何时在复杂多步 tool use 上稳定超过 cascade？（DuplexSLA 的 multi-action 落后是一个警示信号）
- [ ] 评测缺口：尚无同时覆盖视觉流 + 语音 disfluency + 工具调用 + 延迟的综合 benchmark；FDB-v3 只有语音 + mock API。
- [ ] 部署成本：AURA demo 需 2×80G 卡，陪伴机器人需要多小的实时模型才端侧可跑？
- [ ] 长期记忆/用户画像在所有这些模型里都是空白，always-on 与"长期陪伴"之间还差一整层。
- [ ] 本簇中 StreamBridge / StreamingVLM / Streamo / MMDuet2 / ProactiveVideoQA / Chroma 等笔记尚为待读占位，精读后补充"外接桥接器改造 vs 端到端训练"的对比判断。
