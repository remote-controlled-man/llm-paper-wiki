# 论文库架构

状态：v1.0，当前有效
适用范围：本仓库（`content/` 目录即公开站点使用的 vault 副本）

## 1. 目标

这个库不是简单堆 PDF，而是一个长期可维护的论文库 + LLM Wiki（Obsidian vault）。它需要同时满足：

- 人能读：入口清楚，笔记结构稳定，找论文有固定路径。
- LLM 能写：组织工作（导航、综述、概念沉淀）有专门的层，由 LLM 全权维护。
- 可约束：添加、整理、移动论文有明确规则，避免乱命名、误删文件。
- 简单：不引入数据库和复杂流水线。

## 2. 三层架构

本库分三层，职责严格分离：

```text
paper-wiki/
  AGENTS.md            ← schema 层：LLM 维护 wiki 的规约
  00_Guide.md          ← 人类入口页
  arch/                ← 治理文档（schema 层的一部分）
  raw/                 ← 存储层：扁平，一篇论文一个文件夹
    <slug>/
      <slug>.pdf
      <slug>.md
      assets/
  wiki/                ← 组织层：LLM 全权维护
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

三层职责：

- **raw/ 存储层：不可变。** PDF 永不修改、删除，除非用户明确要求。raw/ 完全扁平，不按主题、年份、会议分子目录。
- **wiki/ 组织层：LLM 全权维护。** 所有组织性内容——目录、枢纽页、概念页、综述、问答归档——都在这一层，LLM 可以直接创建和更新，不需要逐次确认（安全规则仍然适用）。
- **schema 层（AGENTS.md + arch/）：人与 LLM 共同演化。** 规约的修改要先说明理由；本目录 `arch/` 只放架构和治理文档，不放论文内容。

关键设计判断：

- **组织职责在 wiki 层，不在目录树。** raw/ 扁平化之后，一篇论文的主题归属由两处表达：note.md frontmatter 的 `primary_area`，以及 wiki 页中的 wikilink。目录树不再承担分类功能。
- **一篇论文只在一个地方**（`raw/<slug>/`）。跨方向关系用 wikilink 和 tags 表达，不复制文件。
- 旧的 `indexes/` 目录已退役：逐篇目录由 `wiki/index.md` 接管，阅读队列和精读记录移入 `wiki/`。

## 3. raw/ 存储层规范

### 3.1 单篇论文单元

```text
raw/
  <slug>/
    <slug>.pdf
    <slug>.md        ← source 页（笔记）
    assets/          ← 仅当 md 实际引用图片、表格、公式截图时存在
```

规则：

- 一个论文文件夹只放一篇论文。
- 文件夹、PDF、Markdown 笔记同名（同 slug）。
- `assets/` 只保留 Markdown 实际引用的图、表、公式截图；未精读的 intake stub 不预创建空 `assets/`。
- 临时 OCR、整页截图、下载缓存、未引用图片不长期保留。
- 不在论文文件夹里混放实验代码、项目文件或无关附件。

### 3.2 slug 规范

- 有 arXiv：`YYYY-MM_Short_Title_<arxiv号>`，如 `2014-06_GAN_1406.2661`。
- 无 arXiv：`YYYY_VENUE_Short_Title`，如 `2012_TIP_BRISQUE_No-Reference_IQA_Spatial_Domain`。
- 年份无法确认时可省略前缀。
- 英文 slug、下划线分隔；文件名过长时缩短 slug，完整标题放进 frontmatter `title`。
- 中文论文用英文 slug，完整中文标题放 frontmatter。

### 3.3 note.md metadata 规范

每篇论文 Markdown 顶部统一使用 YAML frontmatter。最低必填字段：

- `title`
- `slug`
- `year`
- `status`
- `pdf`
- `tags`
- `primary_area`

完整示例：

```yaml
---
type: paper
title: ""
slug: ""
year:
venue: ""
status: unread        # unread | skimmed | reading | deep_read | archived
pdf: "[[<slug>.pdf]]"
doi: ""
arxiv: ""
url: ""
tags: []
primary_area: ""      # 五大研究方向之一
added_date: ""
last_reviewed: ""
---
```

为什么需要 metadata：

- raw/ 扁平化后，主题归属和检索完全依赖 frontmatter + wiki 页。
- 可按年份、venue、阅读状态、标签快速筛选。
- 可检查重复论文、缺 PDF、缺笔记、缺 metadata。

## 4. 五大研究方向

`primary_area` 的取值对应 `wiki/areas/` 下的五个枢纽页：

- `Foundations`：底层模型、生成模型、表示学习、序列建模、优化、RL、Transformer 等。
- `Perception_and_CV`：视觉、人体动作、姿态、轨迹、图像质量、3D、多模态感知、数据集和评估。
- `Agents`：agent 架构、memory、planning、tool use、RAG、多智能体、多模态 agent、benchmark、安全。
- `Human_AI_Interaction`：interaction model、grounding、harness、控制权、确认机制、透明度、信任、隐私、用户研究。
- `Robotics_and_HRI`：机器人行为表达、HRI、具身交互、长期陪伴、真实部署、安全伦理。

存量笔记的 `primary_area` 可能带历史编号前缀（如 `01_Foundations`），指同一个方向，lint 时可归一化。

归属规则：

- 按论文的主要智力贡献定 `primary_area`，不按会议、年份或单个关键词。
- 跨方向论文选"以后最可能回头找它"的方向作为主归属，其余方向用 `tags` 和 wiki 页 wikilink 表达。
- 一篇论文只保留一个位置，不复制到多处。

## 5. wiki/ 组织层规范

### 5.1 页面类型与 frontmatter

wiki/ 下的页面统一使用：

```yaml
---
type: ""        # area | concept | entity | synthesis | query
title: ""
sources: []     # wikilink 列表，回链 raw/ 里的 note
created: ""     # YYYY-MM-DD
updated: ""     # YYYY-MM-DD
---
```

`sources` 是 wiki 页与 raw/ 之间的回链：每个 wiki 页必须能通过它找到支撑自己的论文笔记。

### 5.2 核心文件职责

- `index.md`：全量内容目录，按 area 分节、逐篇列出论文（含指向 note 的 wikilink）。每次 ingest 必须更新。
- `log.md`：append-only 日志。条目格式 `## [YYYY-MM-DD] <op> | <subject>`，正文一两句即可。常见 op：`ingest`、`triage`、`query`、`lint`、`update`。
- `overview.md`：当前论点 / 论点历史 / 开放问题 / 已知矛盾。反映的是"现在这个库认为什么是真的"，随 ingest 和 lint 持续修订。
- `reading_queue.md`：用户确定接下来要读的论文队列。
- `deep_read_log.md`：精读一句话记录。只记真正精读过的论文，一篇一行一句话，供快速回忆。

### 5.3 四类页面目录

- `areas/`：五个研究方向枢纽页，是该方向的入口：方向边界、关键概念、代表论文、开放问题。
- `concepts/`：概念页——跨论文的主题、方法、框架（如 "Tool Use"、"Long-term Memory"）。
- `entities/`：实体页——具体模型、系统、benchmark（如 "GAN"、"Mem0"）。
- `synthesis/`：综述、对比、研究脉络页——多篇论文之上的综合判断。
- `queries/`：值得归档的问答产出——一次 query 的好答案沉淀为可复用页面。

概念页与实体页的区分标准：讨论"一类方法/问题"进 concepts/，讨论"一个具体工件"进 entities/。

## 6. 笔记正文结构

精读笔记沿用 `arch/PAPER_READING_WORKFLOW.md` 的章节约定：

```markdown
# 论文标题

## 一句话结论

## 解决什么问题

## 方法 / 系统怎么做

## 输入、输出、数据类型、模态

## 关键图表

## STAR 分析

## 和我的研究方向的关系

## 局限和不要误读

## 可复用点

## 下一步问题
```

原则：

- 先给结论，再展开细节；不把论文复述成流水账。
- 对 agent、robot、interaction model、memory、multimodal、HRI 的关系要明确写出来。
- 对没有公式、没有真实系统、没有实验指标的论文，要明确标注，不补造内容。

## 7. 工作流

LLM 维护本库的三个工作流，详细规约见 `AGENTS.md`：

### ingest（新增论文）

一次一篇、人在环中：读 PDF → 与用户讨论要点 → 写/更新 note.md → 更新相关 concept/entity 页 → 更新 `wiki/index.md` → 追加 `wiki/log.md`。

- triage 允许判定 "No material"：不建笔记，只记 log。
- 批量导入前先给放置计划（见 `arch/PAPER_ADDITION_POLICY.md`），用户确认后再落盘。

### query（提问）

先读 `wiki/index.md` 定位，再钻取相关 note 和 wiki 页。值得留存的好答案归档为 `synthesis/` 或 `queries/` 页，并记 log。

### lint（定期维护）

定期检查：矛盾页（与 overview.md 或事实冲突）、孤儿页（无入链）、缺页（被引用但不存在）、失效链接、过时论断。修 wiki 页可直接做；涉及 raw/ 文件走安全规则。结果追加到 `wiki/log.md`。

## 8. 助手操作约束

- 读论文、补笔记、建/改 wiki 页、更新 index 和 log 可以直接做。
- 新增单篇论文按 ingest 流程做，一次一篇。
- 批量新增前先按 `arch/PAPER_ADDITION_POLICY.md` 给出放置计划并等确认。
- 移动、删除、重命名 raw/ 已有文件前，必须先明确列出变更清单并等待确认。
- 不删除 PDF，除非用户明确要求。
- 不删除用户已有笔记内容，只能追加、补全或在确认后重构。
- 不把同一篇论文复制到多个位置。
- 不把临时文件长期留在论文文件夹里。
- `reports/` 是用户研究产出，不动。
- 不在 `arch/` 之外随意新增治理文件；不引入数据库和复杂流水线。
- wiki/ 与 raw/ 冲突时，以 raw/ 真实文件和 note.md metadata 为准。

## 9. 复杂度边界

这个库的架构保持简单：

- 不上数据库。
- 不做多套重复索引：逐篇目录只有 `wiki/index.md` 一份。
- 不为每个主题单独写复杂配置。
- 不为了"架构完整"提前创建空目录、空页面。
- 只保留三类东西：raw/ 论文文件、wiki/ 组织层、schema 层规约。
