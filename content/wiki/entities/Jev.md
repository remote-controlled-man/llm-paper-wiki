---
type: entity
title: "Jev（TypeSafe AI）"
sources:
  - "[[raw/2026-09_TypeSafe_Jev_Launch_Post/2026-09_TypeSafe_Jev_Launch_Post|TypeSafe 官方发布文]]"
created: 2026-09-19
updated: 2026-09-19
---

# Jev（TypeSafe AI 的第一个 System One 模型）

## 基本信息

- 发布：2026-09-15，early access，闭源、仅 API（[typesafe.ai](https://typesafe.ai)）
- 出品：TypeSafe AI；创始人 Diogo Almeida（前 OpenAI，参与 ChatGPT/RLHF 工作）
- 命名：致敬 William Stanley Jevons（杰文斯悖论：智能成本每降一个数量级，用量涨更多）

## 是什么

不生成文本的决策模型。输入非结构化状态 + 类型化问题，输出三种原语之一：**Choice**（≤255 个预定义选项选一）、**Score**（打分）、**Noul**（是/否校准概率），必附置信度。定位：给软件系统做快速结构化决策（分类、路由、打分、护栏），不是给人看的对话。

## 关键数据（官方自报，未独立验证）

- 延迟 70–500ms；宣称比前沿 LLM 快 40–200x、便宜 40–400x（193.6x / 444.6x 来自其 workflow evals）
- 定价 $0.042/百万输入 token，输出免费（无解码循环可计费）
- "零幻觉/零类型错误"：构造性保证（输出只能是预定义集合成员），非实证测量
- 高基数（接近 255 选项）时退化为两阶段（先独立打分再显式选择），速度优势缩小

## 未披露 / 存疑

- 无技术报告、无论文、无架构细节（截至 2026-09-19）
- 准确率/校准度仅经其内部 "workflow evals" 检验——参照系是 GPT-6 Astra 与 Fable 5.1 答案的平均值，不是 ground truth
- FAQ 中"训练数据来源""公开 benchmark 表现"等问题挂着未答

## 关系

- 所属概念：[[wiki/concepts/System_One_Decision_Models]]
- 声称的先行撞车工作：[[raw/2025-03_SalesRLAgent_RealTime_Sales_Conversion_Prediction_2503.23303/2025-03_SalesRLAgent_RealTime_Sales_Conversion_Prediction_2503.23303|SalesRLAgent]]（Reddit 争议，质量存疑）
