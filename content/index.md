---
title: LLM Paper Wiki
---

一个由 LLM 维护的论文知识库：**255 篇论文的结构化笔记**，加上从笔记编译出的 **14 个概念页与综述**。方向集中在 Agents、机器人/HRI、多模态大模型、视觉感知。

## 从这里开始读

最值得读的是**概念层**——LLM 把同主题论文编译成的跨论文综述页，每页都有演进脉络、方法分类、已知矛盾和开放问题：

**脉络综述**

- [[wiki/synthesis/Agent_Research_Landscape_2023_2026|Agent 研究脉络 2023–2026：记忆 × 强化学习 × 评测 × 安全]]

**Agents**

- [[wiki/concepts/Agentic_RL|Agentic RL 与可验证奖励]]
- [[wiki/concepts/Agent_Memory|Agent 记忆]]
- [[wiki/concepts/Agent_Benchmarks|Agent 评测体系]]
- [[wiki/concepts/Agent_Safety|Agent 安全与 Reward Hacking]]
- [[wiki/concepts/Multi_Agent_Systems|多智能体系统]]
- [[wiki/concepts/System_One_Decision_Models|System One 决策模型]]

**机器人与交互**

- [[wiki/concepts/VLA_Robot_Foundation_Models|VLA 与机器人基础模型]]
- [[wiki/concepts/Social_Robots_Long_Term_HRI|社交机器人与长期 HRI]]
- [[wiki/concepts/Proactive_Agent_Interaction|主动式 Agent 与人机协作]]
- [[wiki/concepts/Realtime_FullDuplex_Interaction|全双工与实时流式多模态交互]]

**基础与感知**

- [[wiki/concepts/Multimodal_LLMs|多模态大模型与交错预训练]]
- [[wiki/concepts/GAN_Image_Translation|GAN 与图像翻译]]
- [[wiki/concepts/Human_Action_Recognition|人体动作识别与姿态估计]]
- [[wiki/concepts/NR_IQA|无参考图像质量评价（NR-IQA）]]

完整目录见 [[wiki/index|全量内容目录]]；当前论点与开放问题见 [[wiki/overview|overview]]。

## 论文笔记怎么读

左侧「论文笔记」里每篇论文一页。笔记 frontmatter 的 `status` 标记阅读深度：目前大部分是**结构化选目**（元数据 + 标签 + 选目理由），深度精读的 20 余篇会随阅读进度持续回填——概念页顶部的收录状态说明会标注哪些论断已被精读笔记验证。本站不含 PDF 全文（版权原因），每篇可通过 arXiv 编号溯源。

## 这个库是怎么维护的

遵循 Andrej Karpathy 的 LLM Wiki 三层模式：`raw/` 原始层（论文笔记，不可变）→ `wiki/` 组织层（LLM 全权维护的概念、综述、索引）→ schema 规约层（写给 LLM 的操作手册）。本地用 Obsidian 阅读，用 Quartz 发布为本站。规约与治理文档在 [GitHub 仓库](https://github.com/remote-controlled-man/llm-paper-wiki) 的 `content/arch/` 与 `content/AGENTS.md`。
