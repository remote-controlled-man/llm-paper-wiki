# Papers Library Guide

这是论文库的人类入口页。本库是三层结构：`raw/` 存论文原文和笔记，`wiki/` 是由 LLM 维护的组织层（目录、枢纽页、综述），规约放在 `AGENTS.md` 和 `arch/`。

## 快速入口

- 全量内容目录（找论文先读这里）：[wiki/index.md](wiki/index.md)
- 当前论点与开放问题：[wiki/overview.md](wiki/overview.md)
- 阅读队列：[wiki/reading_queue.md](wiki/reading_queue.md)
- 已精读回忆索引：[wiki/deep_read_log.md](wiki/deep_read_log.md)
- 维护日志：[wiki/log.md](wiki/log.md)
- 架构和维护规则：[arch/PAPER_LIBRARY_ARCHITECTURE.md](arch/PAPER_LIBRARY_ARCHITECTURE.md)
- 新增论文政策：[arch/PAPER_ADDITION_POLICY.md](arch/PAPER_ADDITION_POLICY.md)
- 论文阅读流程：[arch/PAPER_READING_WORKFLOW.md](arch/PAPER_READING_WORKFLOW.md)
- 给 agent 的操作规约：[AGENTS.md](AGENTS.md)

## 当前分类

论文按五大研究方向组织，每个方向对应 `wiki/areas/` 下的一个枢纽页（不再是目录）：

- `Foundations`：基础模型、生成模型、表示学习、序列建模、优化、RL、Transformer。
- `Perception_and_CV`：视觉、人体动作、姿态、轨迹、图像质量、3D、多模态感知、数据集和评估。
- `Agents`：agent 架构、memory、planning、tool use、RAG、多智能体、多模态 agent、benchmark、安全。
- `Human_AI_Interaction`：interaction model、grounding、harness、控制权、确认机制、透明度、信任、隐私、用户研究。
- `Robotics_and_HRI`：机器人行为表达、HRI、具身交互、长期陪伴、真实部署、安全伦理。

## 阅读路径

默认路径：

1. Foundations
2. Perception_and_CV
3. Agents
4. Human_AI_Interaction
5. Robotics_and_HRI

如果目标是快速建立 embodied agent / robot / HRI / interaction model 方向的判断力，优先从：

1. Human_AI_Interaction
2. Agents
3. Robotics_and_HRI
4. Perception_and_CV
5. Foundations

## 使用原则

- 查找论文时先读 [wiki/index.md](wiki/index.md)，按 area 分节逐篇列出，再钻取 `raw/<slug>/` 里的笔记。
- 论文原文都在 `raw/<slug>/`（扁平存放，一篇一个文件夹）；主题归属看笔记 frontmatter 的 `primary_area` 和 wiki 页链接。
- 新增论文走 ingest 流程（一次一篇、人在环中）；批量导入前先看 [arch/PAPER_ADDITION_POLICY.md](arch/PAPER_ADDITION_POLICY.md)，必须先有放置计划。
- 跨方向关系用 wikilink 和 tags 表达，不复制同一篇论文。
- 确定接下来要读的论文后，更新 [wiki/reading_queue.md](wiki/reading_queue.md)。
- 精读完论文后，在 [wiki/deep_read_log.md](wiki/deep_read_log.md) 追加一行一句话总结。
- 大规模移动、删除、重命名前，必须先列清单确认。
