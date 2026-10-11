---
type: paper
title: "Relational Gains, Privacy Strains: Exploring Users' Perceptions and Experiences with ChatGPT's Memory Feature"
slug: "2026_CHI_Relational_Gains_Privacy_Strains_ChatGPT_Memory"
year: 2026
venue: "CHI '26"
status: read
priority: P0
category: "Long-term memory, companionship, and privacy"
pdf: "2026_CHI_Relational_Gains_Privacy_Strains_ChatGPT_Memory.pdf"
tags:
  - paper
  - chi
  - interaction-models
  - memory-companionship
primary_area: "05_Robotics_and_HRI"
created: 2026-05-30
---

# Relational Gains Privacy Strains ChatGPT Memory

原文 PDF： [[2026_CHI_Relational_Gains_Privacy_Strains_ChatGPT_Memory.pdf]]

所属分类：长期记忆、陪伴关系与隐私

阅读状态：已速读

## 为什么要读这篇

- 这篇是 RECALLbot 的必要反面：它告诉我们长期记忆为什么会带来关系收益，也为什么会造成隐私、画像和控制焦虑。
- 对 embodied companion robot 很关键，因为机器人长期在家庭/办公空间里收集的不是纯文本，而是语音、图像、地点、行为、他人信息，隐私边界更复杂。
- 它的设计建议很适合转成 memory UX 的产品需求：可见、可访问、可解释、可编辑、可过期、可审计。

## 三句话快速总结

1. 作者访谈 20 名 ChatGPT memory 用户，发现用户把 AI memory 看成机器式记忆：不容易忘、很详细、似乎准确、缺少情感。
2. 这种记忆一方面带来“被记住”的关系收益，另一方面会触发负面期待违背：系统记住了不该记的、推断错了、让用户不知道怎么控制。
3. 设计上需要把 memory 从隐藏后台变成一等公民：实时提示、记忆列表、分类、搜索、编辑、删除、过期、画像确认、风险提醒。

## STAR 速读

### S - Situation

LLM 产品开始跨会话保存用户信息，用来个性化回复和建立连续性。ChatGPT memory 让用户感到“系统记得我”，但用户往往不清楚它记了什么、怎么记、怎么用、是否真的删除。

长期记忆既是 personalization 资产，也是 privacy/profiling 风险。特别是当系统自动提取、自动推断、跨上下文使用记忆时，用户的心理模型很容易被破坏。

### T - Task

论文回答三个问题：

- 用户如何比较 ChatGPT memory 和 human memory？
- 当用户看到 ChatGPT 记住了什么后，心理模型如何变化？
- 用户希望怎样改进 memory feature 以更好保护隐私？

### A - Action

作者访谈 20 名了解 ChatGPT memory 的用户。访谈中让用户实际输入 “What do you know about me?”，观察他们看到系统记忆后的反应，并讨论管理、删除、训练数据、风险和设计建议。

### R - Result

用户认为 ChatGPT memory 与人类记忆的差异主要有四点：

- Unforgetfulness：AI 好像不会自然遗忘。
- Detailedness：AI 可能保存很细的细节。
- Accuracy：AI memory 被看成类似记录/转录，但也可能有错误推断。
- Lack of emotions：AI memory 缺少人类记忆的情绪和主观重构。

同时，memory 有关系收益：被叫名字、被记住偏好、被记住过去经历，会产生 friend / belonging / someone there for me 的感觉。

但大多数用户出现负面 expectancy violations：

- 系统记住了用户没想到会被存的内容。
- 系统把临时状态当成长期特征，例如租金迟交、分居状态、随便写给 ChatGPT 的非正式语言。
- 不同模型对 memory 的访问/解释不一致，造成高 AI literacy 用户困惑。
- 用户不相信“删除”意味着真正遗忘。

## 论文核心问题

- 要解决的问题：ChatGPT memory 的关系收益和隐私张力如何被用户理解，应该如何设计更负责任的 memory experience。
- 研究对象：用户对 LLM memory 的心理模型、期待违背、隐私管理、画像感知。
- 重要性：长期陪伴/具身机器人一定会依赖记忆。如果 memory UX 做不好，关系越强，隐私伤害越大。

## 方法与系统

- 系统/实验设计：半结构访谈 + 现场 memory inspection 活动。
- 参与者或数据：20 名 ChatGPT 用户，19-54 岁，均了解 memory feature。
- 关键变量：用户看到系统记住内容前后的心理模型变化。
- 评估指标：定性主题，包括 unforgetfulness、detailedness、accuracy、lack of emotions、expectancy violations、design suggestions。

## 从 Interaction Model 角度看

- 人如何表达意图：用户不仅通过显式“记住/忘记”表达，还通过删除、关闭、纠正、想保留/不保留某类信息来表达边界。
- 系统如何做 grounding / 指代消解：memory 的 grounding 需要解释“这条回复引用了哪条记忆”，否则用户无法判断系统为什么这么说。
- agent/机器人如何分配控制权：当前问题是机器 agency 强，用户 agency 弱。系统自动推断画像，用户只能事后清理。
- 系统如何给反馈、解释或展示中间状态：需要 live indicators、memory updated consent、memory snippet citation、profile summary review。
- 对机器人行为设计的启发：具身机器人引用空间/事件记忆时要更谨慎，例如“我记得你昨晚很晚回家”可能是陪伴，也可能是监控感。
- 对长期记忆/关系/隐私的启发：要把 forgetting、expiration、profile correction、context separation 做成核心功能，而不是设置页深处的选项。

## 关键图表、公式和概念

- Figure 1：ChatGPT “Updated saved memory” 提示，说明现有 memory 更新提示。
- Table 1：参与者背景。
- 核心概念：positive/negative expectancy violation、machine-like memory、unforgetfulness、undesirable user profiling、bounded friendship、privacy-personalization trade-off。

## 对我们产品/研究的启发

- 可以直接借鉴的设计原则：memory 必须 visible、accessible、editable、expirable、auditable。
- 可以转成 harness policy 的规则：`memory_use_allowed = f(user_consent, context, sensitivity, freshness, profile_alignment, intended_use)`。
- 可以转成机器人行为库的行为：`ask_to_remember`、`show_memory_used`、`offer_forget`、`confirm_profile_inference`、`expire_memory`、`warn_sensitive_info`。
- 可以转成用户研究问题的假设：实时显示“我正在用哪条记忆”会降低期待违背；用户定义身份画像会降低不想要的 profiling；记忆过期会提升信任。

## 设计建议清单

从论文可直接转成产品需求：

```text
1. Memory onboarding
   - 告诉用户 memory 存在、用途、默认状态、能否关闭。

2. Consent at update time
   - 不是只显示 memory updated，而是允许确认/拒绝/改写。

3. Memory as first-class UI
   - 主导航可见，不藏在多层设置。

4. Memory organization
   - work / personal / health / relationship / temporary / user-defined categories。

5. Memory citation
   - 每次使用记忆影响回复时，显示引用了哪条记忆。

6. Editable profile
   - 让用户确认“系统如何看我”，尤其是风格、身份、长期偏好。

7. Time-bounded memory
   - 90 分钟、一天、一个项目、三个月、永久。

8. Sensitive info guard
   - 检测身份证、电话、地址、他人联系方式、健康/财务/亲密关系等。

9. Bounded friendship
   - 可以有轻度连续性和温暖，不伪装成真正人类关系。

10. Real forgetting explanation
   - 告诉用户删除后影响哪些层：显示、检索、训练、日志、备份。
```

## 对具身机器人的额外提醒

文本 chatbot 记忆已经会引发不安；机器人记忆会更敏感，因为它可能来自：

- 摄像头看到的家庭/办公环境。
- 麦克风听到的多人对话。
- 空间位置和活动规律。
- 物品摆放、身体状态、情绪状态。
- 第三方人物信息，例如家人、同事、访客。

所以具身机器人 memory policy 至少要支持：

- 场景级隐私模式：卧室/卫生间/会议室/访客在场。
- 他人信息边界：用户不能无限授权机器人记住第三方敏感信息。
- 多模态记忆分级：文本摘要、音频、图像、视频、空间轨迹应有不同默认保留策略。
- 主动引用克制：即使系统记得，也不代表每次都应该说出来。

## 我的阅读笔记

- 这篇和 RECALLbot 组合起来看很重要：RECALLbot 证明记忆能增强关系，这篇证明用户会因为“被系统记成某种人”而焦虑。
- 产品上不能只追求“更懂用户”。更懂用户必须同时配套“用户能看见、能纠正、能删除、能限制、能理解”。
- 对 agent harness 来说，memory retrieval 前应该有 privacy/sensitivity gate，memory retrieval 后应该有 citation/explanation，memory update 时应该有 consent/expiry。

