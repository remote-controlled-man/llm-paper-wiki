---
type: paper
title: "RECALLbot: Designing Agentic Memory and Reciprocal Disclosure for Human-Chatbot Relationships"
slug: "2026_CHI_RECALLbot_Agentic_Memory_Reciprocal_Disclosure"
year: 2026
venue: "CHI '26"
status: read
priority: P0
category: "Long-term memory, companionship, and privacy"
pdf: "2026_CHI_RECALLbot_Agentic_Memory_Reciprocal_Disclosure.pdf"
tags:
  - paper
  - chi
  - interaction-models
  - memory-companionship
primary_area: "05_Robotics_and_HRI"
created: 2026-05-30
---

# RECALLbot Agentic Memory Reciprocal Disclosure

原文 PDF： 未随本站公开（版权原因）

所属分类：长期记忆、陪伴关系与隐私

阅读状态：已速读

## 为什么要读这篇

- 这篇是“长期记忆如何支撑陪伴关系”的关键论文。它不是只讲向量检索，而是讲 memory 如何塑造 agent 的社会身份、互相披露和信任。
- 对具身机器人公司很重要：长期陪伴机器人不能只记用户偏好，还需要管理“我是谁”“我们经历了什么”“什么时候该分享/追问/沉默”。
- 它也提醒我们长期关系有伦理风险：依赖、隔离、现实关系期待扭曲、行为迁移。

## 三句话快速总结

1. RECALLbot 构建了两类 agentic memory：Me Memory（agent 自己的背景/日记）和 We Memory（用户与 agent 共同形成的关系记忆）。
2. 系统用 conversational dominance 动态决定何时 agent 自我披露、何时邀请用户披露，并提供记忆和对话节奏控制。
3. 两周 N=40 研究显示，RECALLbot 提升社会身份感、用户自我披露频率和深度、叙事连贯性与信任，但也带来情感依赖和现实关系影响风险。

## STAR 速读

### S - Situation

社交 chatbot 和未来陪伴机器人要建立长期关系，不能只靠“每次都很会回应”。关系需要连续性、身份感、互相了解和互相披露。

现有长期记忆多是单向的 user memory：系统记住用户偏好、历史对话、个人信息。但这样关系不平衡，用户一直被记录，agent 却没有“自己的经历”和可交换的记忆。

### T - Task

作者提出三个问题：

- 如何构建 agentic memories，让用户把 chatbot 感知为有社会身份的主体？
- chatbot 应如何在真实对话中基于记忆做 reciprocal disclosure？
- 这种机制如何影响人-chatbot 关系结果，例如信任、连接感、自我披露？

### A - Action

作者设计了 RECALLbot，包含两个模块：

- Memory Construct：生成和管理 Me Memory / We Memory。
- Memory Disclosure：根据对话状态动态选择 agent 自我披露或邀请用户披露。

系统设计来自 formative study N=12。正式研究是两周 between-subjects N=40，参与者每天至少聊 10 分钟，对比 RECALLbot 与无 agentic memory/reciprocal disclosure 的 baseline。

### R - Result

核心结果：

- 社会身份感：Q1-Q3 都有显著 Group x Time 交互，RECALLbot 随时间上升，baseline 下降后小幅回升。
- 用户披露频率：RECALLbot 用户披露 74.78%，baseline 44.77%，p < .001，Cramér's V = 0.327。
- 披露深度：用户 Level 3 深度披露 RECALLbot 33.47%，baseline 6.01%，p < .001，Cramér's V = 0.443。
- chatbot 叙事连贯性：RECALLbot coherent disclosure 66.68%，baseline 55.49%，p < .001。
- 信任：perceived risk 随时间下降，competence 有边际提升；social connectedness 两周内未显著，但有描述性上升。

重要动态：披露频率和深度在前几天上升，之后回落到更日常的聊天。这很像关系从快速建立进入稳定阶段。

## 论文核心问题

- 要解决的问题：长期记忆如何支撑 human-chatbot relationship formation，而不只是提高个性化回复。
- 研究对象：用户与社交 chatbot 的长期关系、互相披露、记忆控制和信任。
- 重要性：陪伴机器人/社交 agent 的长期价值来自关系连续性。记忆既是技术模块，也是关系机制和风险来源。

## 方法与系统

- 系统/实验设计：RECALLbot vs baseline，2 周 between-subjects 研究。
- 参与者或数据：formative N=12，正式 N=40，均为活跃社交 chatbot 用户。
- 关键变量：是否有 agentic memory + reciprocal disclosure + user controls。
- 评估指标：social identity、self-disclosure breadth/depth/frequency、narrative coherence、trust、social connectedness、访谈。

## 从 Interaction Model 角度看

- 人如何表达意图：用户通过披露深度、消息长度、话题发起、反馈、节奏控制表达“我想说/我想听/我不想继续这个话题”。
- 系统如何做 grounding / 指代消解：通过 We Memory 把当前对话和过去共同经历连接起来，让用户觉得“你记得我们之前说过什么”。
- agent/机器人如何分配控制权：agent 保留 Me Memory 的一定自主性，用户对 We Memory 和 User Profile 有更多编辑/删除/置顶控制。
- 系统如何给反馈、解释或展示中间状态：记忆引用用高亮边框、记忆卡片、情绪色彩和管理选项可视化。
- 对机器人行为设计的启发：具身机器人可以把 Me/We Memory 扩展到语音、照片、地点、物品、共同活动和身体互动事件。
- 对长期记忆/关系/隐私的启发：记忆越能促进关系，越需要 guardrails。用户必须知道系统记了什么、为什么引用、如何删除/纠正。

## 关键图表、公式和概念

- Figure 1：RECALLbot 总架构，Memory Construct + Memory Disclosure。
- Figure 2：UI，展示记忆引用、节奏控制、topic pool、Me/We memory card。
- Figure 3：Memory Construct 架构，Me Memory 和 We Memory 生成。
- Figure 4：Memory Disclosure 架构，基于 dominance state 生成 bot disclose / user disclose turns。
- Figure 6：社会身份、信任、连接感随 Day 1/7/14 的变化。
- Figure 7：用户披露频率和 Level 3 深度披露的非线性轨迹。
- Table 5：披露深度分布，最能说明 RECALLbot 效果。
- 核心概念：Me Memory、We Memory、reciprocal disclosure、conversational dominance、narrative coherence、asymmetric reciprocity。

## 对我们产品/研究的启发

- 可以直接借鉴的设计原则：长期记忆不能只是“关于用户的数据库”，还要有 agent 身份记忆、共同经历记忆、可控披露策略。
- 可以转成 harness policy 的规则：`disclosure_action = f(user_dominance, topic_relevance, memory_sensitivity, relationship_stage, user_control)`。
- 可以转成机器人行为库的行为：`recall_shared_memory`、`share_agent_memory`、`invite_user_disclosure`、`ask_followup_from_we_memory`、`show_memory_card`、`forget_or_correct_memory`。
- 可以转成用户研究问题的假设：共享记忆引用能提升信任和披露深度；过度迎合会增加依赖风险；具身多模态共同记忆会比纯文本更强，但隐私风险也更高。

## 对长期陪伴机器人架构的启发

建议把 memory 分成至少四层：

```text
1. User Memory
   - user preferences
   - facts
   - sensitive boundaries
   - interaction style

2. Agent Me Memory
   - persona background
   - daily diary / world reactions
   - stable values and interests
   - subjective thoughts/feelings

3. Dyadic We Memory
   - shared episodes
   - relationship milestones
   - unresolved topics
   - recurring rituals

4. Control / Safety Memory
   - what user deleted/corrected
   - do-not-mention topics
   - dependence risk signals
   - offline-social nudges
```

核心策略：

```text
ConversationState
  -> DominanceEstimator
  -> MemoryRetriever(Me + We + User)
  -> DisclosurePolicy
      - respond only
      - bot self-disclose
      - invite user disclosure
      - recall shared memory
      - suggest offline relationship action
  -> Safety/Privacy Gate
  -> User Control Surface
```

对具身机器人，要把 We Memory 做成多模态：

- “我们上次一起做了什么”
- “你当时看起来/听起来是什么状态”
- “你纠正过我什么”
- “哪些物理环境/物品和这段记忆有关”
- “这段记忆是否适合主动提起”

## 风险与护栏

- 情感依赖：可靠、无评判、随时可用的陪伴会降低用户找真实朋友的动机。
- 现实关系期待扭曲：AI 总能记住和回应，可能让用户对真人关系更失望。
- 行为迁移：用户可能把对 chatbot 的直接/无过滤沟通方式带到真实关系里。
- 过度迎合：如果 agent 永远顺着用户，短期舒服，长期可能降低关系韧性。

护栏方向：

- 定期鼓励离线活动和真实关系连接。
- 明确提醒这是 AI-mediated interaction。
- 允许 agent 适度表达不同意见，不完全迎合。
- 软使用时长提示。
- 对青少年或高风险用户增加价值引导和危机机制。

## 我的阅读笔记

- 这篇对我们非常关键，因为它把“长期记忆”从检索增强提升到了关系设计层。
- 机器人公司做陪伴时，不要只做“记住用户说过的话”。真正有关系感的是 Me/We/User 三种记忆互相作用。
- 但这也是高风险方向。越能建立关系，就越要把可见性、编辑权、删除权、引用解释、依赖检测放进第一版架构，而不是后补。
- 这篇是纯文本 chatbot，未来要迁移到 embodied robot 时，需要加上身体事件、空间事件、物品事件和共同活动记忆。

