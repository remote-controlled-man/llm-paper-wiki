---
title: LLM Paper Wiki
---

一个由 LLM 维护的论文知识库（Obsidian vault → Quartz 静态站点），目前收录 **255 篇论文的结构化笔记**与 **14 个主题概念页**，方向集中在 Agents、机器人/HRI、多模态大模型、视觉感知。

本库遵循 Andrej Karpathy 提出的 LLM Wiki 三层模式：

- **raw/ 原始层**：一篇论文一个文件夹，包含结构化笔记（frontmatter 元数据 + 标签 + 要点），不含 PDF 全文（版权原因），每篇笔记可通过 arXiv 编号溯源。
- **wiki/ 组织层**：LLM 编译的概念层——index（全量目录）、concepts（跨论文概念页）、areas（研究方向枢纽）、synthesis（综述）、overview（当前论点与开放问题）。
- **schema/ 规约层**：`AGENTS.md` 与 `arch/` 治理文档，是写给 LLM 的操作规约。

## 入口

- [[00_Guide|使用指南]]
- [[wiki/index|全量内容目录]]
- [[wiki/overview|当前论点与开放问题]]
- [[wiki/reading_queue|阅读队列]]

## 浏览方式

- 左侧 Explorer 按目录浏览；右上角搜索支持全文检索（中文可用）。
- 每页右侧有关系图（Graph）、目录（TOC）与反向链接（Backlinks）。
- 概念页见 `wiki/concepts/`，例如 [[wiki/concepts/Agentic_RL]]、[[wiki/concepts/VLA_Robot_Foundation_Models]]。
