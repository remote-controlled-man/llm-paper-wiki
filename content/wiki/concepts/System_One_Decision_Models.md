---
type: concept
title: "System One 决策模型 / 校准决策层"
sources:
  - "[[raw/2026-09_TypeSafe_Jev_Launch_Post/2026-09_TypeSafe_Jev_Launch_Post|TypeSafe 官方发布文]]"
  - "[[raw/2025-09_Confidence_Aware_Routing_LLM_Hallucination_Mitigation_2510.01237/2025-09_Confidence_Aware_Routing_LLM_Hallucination_Mitigation_2510.01237|Confidence-Aware Routing (arXiv 2510.01237)]]"
  - "[[raw/2025-03_SalesRLAgent_RealTime_Sales_Conversion_Prediction_2503.23303/2025-03_SalesRLAgent_RealTime_Sales_Conversion_Prediction_2503.23303|SalesRLAgent (arXiv 2503.23303)]]"
created: 2026-09-19
updated: 2026-09-19
---

# System One 决策模型（校准决策层）

## 定义

一类为**高频、小型、结构化决策**设计的模型：放弃开放式文本生成，换取单次前向传播内对预枚举输出空间（选项/分数/布尔概率）的完整打分。核心卖点是延迟（亚秒级）、成本（输出免费）、类型安全（不会输出 schema 外内容）与**校准的置信度**。名称借自 Kahneman 的 System 1（快思考）。

代表实例：[[wiki/entities/Jev|Jev]]（TypeSafe AI，2026-09）。

## 关键机制（据公开材料）

- **输出空间预枚举** → 消除自回归解码循环，一次前向传播给所有候选打分。这是速度/价格优势的根源，也是它无法生成文本的原因（同一枚硬币的两面）。
- **RLCD（Reinforcement Learning for Calibrated Decisions）**：奖励置信度与实际准确率的长期匹配（天气预告员标准），区别于 RLHF（人类偏好）与 RLVR（可验证正确性）。细节未公开。
- 高基数选择（>数十个选项）需要两阶段分解，优势衰减。

## 研究问题（本库跟踪的主线）

> agent 系统中的高频微决策（调不调工具、要不要打断用户确认、输出合不合规、路由到哪个模型），应该由生成式 LLM 还是校准过的类型化决策层来做？各自的失败模式是什么？

## 与本库已有论文的关系

- **决策点来源（HAI 侧）**：[[raw/2026_CHI_When_Should_Users_Check_Confirmation_Frequency/2026_CHI_When_Should_Users_Check_Confirmation_Frequency|When Should Users Check]]——confirmation frequency 正是典型的"高频微决策"场景；System One 模型是它的一个候选执行器。
- **工具调用决策（Agents 侧）**：[[raw/2026-05_LLM_Agents_Already_Know_When_to_Call_Tools_2605.09252/2026-05_LLM_Agents_Already_Know_When_to_Call_Tools_2605.09252|LLM Agents Already Know When to Call Tools]]——LLM 内部状态已隐含调工具决策，与"用专用小决策层替代"形成对照假说。
- **护栏与安全**：agent 安全 benchmark 群（InjecAgent、AgentDojo、MCP 安全系列）是这类模型"verify everything"用武之地的评测资源。
- **路由/级联方向先行工作**：[[raw/2025-09_Confidence_Aware_Routing_LLM_Hallucination_Mitigation_2510.01237/2025-09_Confidence_Aware_Routing_LLM_Hallucination_Mitigation_2510.01237|Confidence-Aware Routing]] 把置信度评估放在生成之前，与 RLCD 的校准主张同线。

## 已知矛盾 / 争议

- Jev 发布次日，SalesRLAgent 作者（Reddit）声称架构撞车、质疑想法被抄。两篇 arXiv 均为自发布短文，质量存疑，仅作方向参考。
- "不会幻觉"是构造性宣传（输出永远落在 schema 内），不等于"不会选错"。官方 demo 中已与 GPT-5.6 Terra 出现分歧案例。

## 开放问题 / 观察触发器

- [ ] TypeSafe 是否发布技术报告或架构论文？（出现即 ingest）
- [ ] 是否有第三方独立复现其校准度与成本数据？（如 TradeRank arena 后续赛季数据）
- [ ] RLCD 与现有校准文献（selective prediction、conformal prediction）的异同？
- [ ] 实证机会：若能拿到 API，用 confirmation-frequency 场景做 Jev vs 廉价 LLM + structured output 的小型对比（延迟/成本/校准曲线）。
