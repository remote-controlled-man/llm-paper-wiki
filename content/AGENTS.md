# AGENTS.md — 论文库 schema（LLM 操作规约）

本仓库是一个长期论文库 + LLM Wiki（Obsidian vault），采用三层结构：

- **raw/ 存储层**：不可变。扁平存放，一篇论文一个文件夹。
- **wiki/ 组织层**：LLM 全权维护。组织、导航、综述、问答全部在这一层。
- **schema 层**（本文件 + `arch/`）：规约本身，由人与 LLM 共同演化。

改动本库前必读：

- `arch/PAPER_LIBRARY_ARCHITECTURE.md` — 架构全貌
- `arch/PAPER_ADDITION_POLICY.md` — 新增与批量导入规则
- `arch/PAPER_READING_WORKFLOW.md` — 精读笔记正文结构

## 目录结构

```text
paper-wiki/
  AGENTS.md            ← 本文件，schema 层
  00_Guide.md          ← 人类入口页
  arch/                ← 治理文档
  raw/                 ← 存储层（扁平）
    <slug>/
      <slug>.pdf
      <slug>.md
      assets/
  wiki/                ← 组织层（LLM 全权维护）
    index.md           ← 全量内容目录（按 area 分节，逐篇列出），每次 ingest 更新
    log.md             ← append-only 日志，条目格式 `## [YYYY-MM-DD] <op> | <subject>`
    overview.md        ← 当前论点 / 论点历史 / 开放问题 / 已知矛盾
    reading_queue.md   ← 阅读队列
    deep_read_log.md   ← 精读一句话记录
    areas/             ← 5 个研究方向枢纽页
    concepts/          ← 概念页（跨论文的主题、方法、框架）
    entities/          ← 实体页（具体模型、系统、benchmark）
    synthesis/         ← 综述、对比、研究脉络页
    queries/           ← 值得归档的问答产出
  reports/             ← 用户研究产出，不动
```

## 核心规则

- 组织职责在 wiki 层，不在目录树。raw/ 扁平化后，主题归属靠 note.md 的 frontmatter（`primary_area`）和 wiki 页 wikilink 表达。
- 一篇论文只在一个地方：`raw/<slug>/`。跨方向关系用 wikilink 和 tags 表达，不复制文件。
- raw/ 不可变：PDF 永不修改、删除，除非用户明确要求。
- wiki/ 由 LLM 全权写：创建、更新、重组 wiki 页面不需要逐次确认，但安全规则仍然适用。
- schema 层（AGENTS.md + arch/）由人与 LLM 共同演化：修改规约类文件前先说明改动理由。
- 不引入数据库、复杂流水线或多余的管理目录。

## raw/ 规范

### 单篇论文单元

```text
raw/
  <slug>/
    <slug>.pdf
    <slug>.md        ← source 页（笔记）
    assets/          ← 仅当 md 实际引用图片、表格、公式截图时存在
```

- 一个文件夹只放一篇论文；文件夹、PDF、md 同名（同 slug）。
- `assets/` 只放 md 实际引用的文件；不保留临时 OCR 文件、整页截图 dump、下载缓存、未引用图片。

### slug 规范

- 有 arXiv：`YYYY-MM_Short_Title_<arxiv号>`，如 `2014-06_GAN_1406.2661`
- 无 arXiv：`YYYY_VENUE_Short_Title`，如 `2012_TIP_BRISQUE_No-Reference_IQA_Spatial_Domain`
- 年份无法确认时可省略前缀
- 英文 slug、下划线分隔；过长时缩短 slug，完整标题放进 frontmatter `title`

### note.md frontmatter

最小字段：`title`、`slug`、`year`、`status`、`pdf`、`tags`、`primary_area`。

```yaml
---
type: paper
title: ""
slug: ""
year:
venue: ""
status: unread        # unread | skimmed | reading | deep_read | archived
pdf: "[[<slug>.pdf]]"
arxiv: ""
tags: []
primary_area: ""      # 五大研究方向之一
---
```

- `primary_area` 取值对应 `wiki/areas/` 的五个枢纽页：`Foundations`、`Perception_and_CV`、`Agents`、`Human_AI_Interaction`、`Robotics_and_HRI`。存量笔记可能带历史编号前缀（如 `01_Foundations`），指同一个方向，lint 时可归一化。
- 跨方向归属用 `tags` 和 wiki 页 wikilink 表达，不复制文件。

### 精读笔记正文结构

沿用 `arch/PAPER_READING_WORKFLOW.md` 的章节约定：一句话结论 / 解决什么问题 / 方法与系统 / 输入输出模态 / 关键图表 / STAR 分析 / 与研究方向的关系 / 局限和不要误读 / 可复用点 / 下一步问题。

## wiki/ 规范

### 页面 frontmatter

```yaml
---
type: ""        # area | concept | entity | synthesis | query
title: ""
sources: []     # wikilink 列表，回链 raw/ 里的 note
created: ""     # YYYY-MM-DD
updated: ""     # YYYY-MM-DD
---
```

### 各文件职责

- `index.md`：全量内容目录，按 area 分节、逐篇列出论文；每次 ingest 必须更新。
- `log.md`：append-only 日志。条目格式 `## [YYYY-MM-DD] <op> | <subject>`，正文一两句即可。常见 op：`ingest`、`triage`、`query`、`lint`、`update`。
- `overview.md`：当前论点 / 论点历史 / 开放问题 / 已知矛盾。
- `reading_queue.md`：阅读队列。用户确定接下来要读什么时更新。
- `deep_read_log.md`：精读一句话记录。只记真正精读过的论文，一篇一行一句话。
- `areas/`：五个研究方向枢纽页（Foundations / Perception_and_CV / Agents / Human_AI_Interaction / Robotics_and_HRI）。
- `concepts/`：跨论文的主题、方法、框架。
- `entities/`：具体模型、系统、benchmark。
- `synthesis/`：综述、对比、研究脉络。
- `queries/`：值得归档的问答产出。

## 工作流

### ingest（新增论文，一次一篇、人在环中）

1. 读 PDF。
2. 与用户讨论要点。
3. 写/更新 `raw/<slug>/<slug>.md`。
4. 更新相关 concept / entity 页（没有就建）。
5. 更新 `wiki/index.md`。
6. 追加 `wiki/log.md`。

补充规则：

- triage 允许判定 "No material"：不建笔记，只记 log。
- 批量导入前先给放置计划（见 `arch/PAPER_ADDITION_POLICY.md`），用户确认后再落盘。

### query（提问）

1. 先读 `wiki/index.md` 定位，再钻取相关 note 和 wiki 页。
2. 值得留存的好答案归档为 `synthesis/` 或 `queries/` 页，并记 log。

### lint（定期维护）

定期检查：矛盾页、孤儿页、缺页、失效链接、过时论断。

- 修 wiki 页可以直接做。
- 涉及 raw/ 文件的改动走安全规则（列清单、等确认）。
- lint 结果追加到 `wiki/log.md`。

## 安全规则

- 不删 PDF，除非用户明确要求。
- 不删除用户笔记内容：只能追加，或在用户确认后重构。
- 移动、重命名、删除 raw/ 已有文件前，先列出精确变更清单，等用户确认。
- 批量新增前必须先给放置计划并等用户确认。
- `reports/` 是用户研究产出，不动。
- wiki/ 与 raw/ 冲突时，以 raw/ 真实文件和 note.md metadata 为准。
