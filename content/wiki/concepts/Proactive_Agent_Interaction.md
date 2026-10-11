---
type: concept
title: "主动式 Agent 与人机协作"
sources:
  - "[[raw/2026_CHI_When_Should_Users_Check_Confirmation_Frequency/2026_CHI_When_Should_Users_Check_Confirmation_Frequency|When Should Users Check（确认频率建模）]]"
  - "[[raw/2026_AURA_Proactive_Audio_Visual_Interaction/2026_AURA_Proactive_Audio_Visual_Interaction|AURA 始终在线视觉助手]]"
  - "[[raw/2026_CHI_Decision_Theoretic_Assistive_Interfaces/2026_CHI_Decision_Theoretic_Assistive_Interfaces|决策论 Assistive Interface 表示]]"
  - "[[raw/2026_CHI_What_Are_You_Doing_Intermediate_Feedback_Agentic_In_Car_Assistants/2026_CHI_What_Are_You_Doing_Intermediate_Feedback_Agentic_In_Car_Assistants|车载 Agent 中间反馈]]"
  - "[[raw/2026_CHI_Interaction_Augmented_Instruction/2026_CHI_Interaction_Augmented_Instruction|交互增强指令 IAI]]"
  - "[[raw/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR|AgentHands 空间手势]]"
  - "[[raw/2026_CHI_Prototyping_Multimodal_GenAI_RealTime_Agents/2026_CHI_Prototyping_Multimodal_GenAI_RealTime_Agents|SocraBot 原型化方法]]"
created: 2026-10-11
updated: 2026-10-11
---

# 主动式 Agent 与人机协作（Proactive Agent Interaction）

## 定义

传统人机交互是**用户发起、系统响应**（turn-taking）。主动式 agent 把这个方向倒过来：系统持续感知情境，自己决定**何时开口、何时沉默、何时行动、何时把控制权交还给人**。这条技术线研究的核心不是"agent 能不能完成任务"，而是"主动权的分配与时机"——proactivity timing、control allocation、intervention timing。

它横跨两层：模型层（把"说不说"变成可训练的输出，如沉默 token）与 harness/policy 层（把"何时确认、给多少反馈"变成显式调度策略）。本库跟踪的主线是后者如何落地到 agent harness 与具身机器人。

## 方法分类（六个子方向）

1. **主动时机作为模型输出**。代表：[[raw/2026_AURA_Proactive_Audio_Visual_Interaction/2026_AURA_Proactive_Audio_Visual_Interaction|AURA]]——把 `<|silent|>` 做成真实输出 token，用 Silent-Speech Balanced Loss 让模型学会"该沉默时沉默、该主动提醒时开口"，覆盖 Real-Time QA / Proactive QA / Multi-Response QA 三类流式交互。这是"时机"从后处理规则变成模型行为的转折点。
2. **确认/检查点调度**。代表：[[raw/2026_CHI_When_Should_Users_Check_Confirmation_Frequency/2026_CHI_When_Should_Users_Check_Confirmation_Frequency|When Should Users Check]]——`ask-before-act` 不是固定规则而是 checkpoint scheduling：基于 CDCR（Confirm-Diagnose-Correct-Redo）错误模型和动态规划，按错误概率/确认成本/诊断成本/重做成本安排中间确认点。
3. **控制权分配的统一建模**。代表：[[raw/2026_CHI_Decision_Theoretic_Assistive_Interfaces/2026_CHI_Decision_Theoretic_Assistive_Interfaces|决策论 Assistive Interface 表示]]——把 assistance 建模成 User + Assistant 两个 agent 的序贯决策（POSG），用户不是环境噪声，adaptation/delegation 等概念获得精确定义。这是这条线的理论骨架。
4. **执行透明度与中间反馈策略**。代表：[[raw/2026_CHI_What_Are_You_Doing_Intermediate_Feedback_Agentic_In_Car_Assistants/2026_CHI_What_Are_You_Doing_Intermediate_Feedback_Agentic_In_Car_Assistants|车载 Agent 中间反馈]]——多步任务中内容型中间反馈显著优于沉默执行，但 verbosity 应由 learned trust gating 自适应：可靠性被证明后可以少说，遇新任务/歧义/高风险要重新提高透明度。
5. **结构化交互表示与具身输出**。两篇配套：[[raw/2026_CHI_Interaction_Augmented_Instruction/2026_CHI_Interaction_Augmented_Instruction|IAI]] 定义 `Augmented Instruction`（文本 prompt + GUI 交互 + artifact 合成），回答"用户意图如何形成"；[[raw/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR|AgentHands]] 定义 `GestureEvent` 中间表示（LLM 输出内联 DSL → 本地 parser 执行空间手势），回答"agent 如何具身地表达"。共同模式：**LLM 输出结构化标记 + 本地 harness 执行**，而非端到端生成动作。
6. **主动行为的原型化与评估方法**。代表：[[raw/2026_CHI_Prototyping_Multimodal_GenAI_RealTime_Agents/2026_CHI_Prototyping_Multimodal_GenAI_RealTime_Agents|SocraBot]]——Counterfactual Video Replay（在录制 session 任意时间点重触发模型）+ Hybrid Wizard-of-Oz（真人审核/覆盖模型输出），解决"没有 benchmark 时如何测试 proactive agent 是否及时、相关、不打扰"。

## 演进脉络与关键转折点

脉络大致是：模型侧先把"说不说"变成可训练行为（AURA 的沉默 token）→ 理论侧把"谁何时行动"形式化（决策论双 agent 模型）→ 调度侧把"何时让人检查"变成可求解的优化问题（checkpoint scheduling）→ 体验侧把"给多少反馈"变成自适应策略（中间反馈 + trust gating）→ 工程侧给出结构化交互表示与调试工具链（IAI / GestureEvent / replay + WoZ）。

三个关键转折点：

- **AURA**：沉默从规则变成 label。此前系统靠 trigger model 或启发式判断要不要说话；AURA 证明训练目标（balanced loss）直接影响模型能否在该沉默时沉默——换成普通 CE 后 proactive alerting 从 37.5 掉到 0.0。
- **When Should Users Check**：确认从交互设计问题变成调度问题。81% 参与者偏好中间确认、总时间降 13.54%、早期错误节省约 29%，给"主动介入"提供了第一个可落地的算法化方向。
- **决策论表示**：单 agent 视角被正式否定——把用户当环境噪声会丢掉用户的策略、学习与纠正行为。此后谈"主动"必须显式建模双方的观察、状态与收益。

注意一个结构判断：本库中 proactive video QA 的 benchmark 线（ProactiveVideoQA、MMDuet2）目前笔记仍是占位（"待读"），"主动时机"的模型侧证据目前主要靠 AURA 一篇撑着；HCI 侧的调度/透明度证据链反而更完整。

## 与本库其他论文/概念的关系

- [[wiki/concepts/System_One_Decision_Models|System One 决策模型]]：confirmation frequency 是典型的"高频微决策"，System One 的校准决策层是 When Should Users Check 中 checkpoint 决策的候选执行器。
- 与 I-WAM / interaction model 路线：IAI 的 `Aug`、AgentHands 的 `GestureEvent`、AURA 的 `text | <|silent|>` 是同一模式的三个实例——**模型输出结构化中间表示，harness 负责解释与执行**。这可以作为交互模型统一抽象的证据。
- 具身机器人迁移：AURA 自己定位在上层 interaction policy（不输出动作），AgentHands 评估基于 turn-based 脚本而非自由输入，两者都不能直接当 robot policy，适合做 perception-to-response 层参考。

## 已知矛盾 / 争议

- **主动 vs 打扰没有免费午餐**：When Should Users Check 自己显示收益高度依赖错误位置——早期错误省 29%，中期收益不明显，晚期确认反而略增成本。"多主动"不是单调的好。
- **透明度不是越多越好**：中间反馈研究表明早期需要高透明度建立信任，但可靠性被证明后用户明确要求降低 verbosity；始终啰嗦的 agent 会被 mute。
- **理论强 vs 求解难**：POSG 是建模语言不是可执行 policy；DP 调度依赖成本参数（diagnosis/correction/trust cost），真实场景中标定这些参数本身就是开放问题。
- **评估结论有人类在环的水分**：SocraBot 的 design score 从 1 提升到 4.4 是在 wizard 覆盖近一半 task phase 分类的条件下得到的，不能解读为全自动 agent 已可靠；AgentHands 的用户研究用脚本化 transcript， spontaneous speech 并未真正处理。
- **工程现实**：AURA 的实时 demo 要两个 80G accelerator，不是端侧方案；"always-on + proactive"的算力/隐私成本在部署侧尚未解决。

## 开放问题 / 观察触发器

- [ ] "及时的主动"缺统一评估指标：现有 benchmark（StreamingBench、OmniMMI）测任务正确性，不测打扰成本与时机恰当性。ProactiveVideoQA / MMDuet2 两篇占位笔记补上后有改观？（出现精读记录即更新本页）
- [ ] trust-adaptive verbosity 的跨 session 动态：中间反馈的 trust gating 是单实验结论，长期个性化（记住用户 verbosity 偏好且可回退）还没有实证。
- [ ] checkpoint 调度在具身场景的参数化：机器人的 redo 成本含物理安全/空间复位/信任损失，远超论文的时间成本模型，如何标定？
- [ ] 控制权让渡的边界：用户什么条件下愿意把 conversation 主动权交给 agent？（Who Controls the Conversation、Does My Chatbot Have an Agenda 两篇笔记目前为空占位，补读后回填"用户视角"证据）
- [ ] 沉默/主动决策与 [[wiki/concepts/System_One_Decision_Models|System One 决策层]] 的实证对比：高频时机决策用专用小决策层还是直接由多模态 LLM 输出 `<|silent|>`？
