# Paper Library Architecture

这个目录是 schema 层的一部分，存放论文库的架构设计、命名规范和维护约束。LLM 维护 wiki 的操作规约见根目录 `AGENTS.md`。

当前文档：

- [PAPER_LIBRARY_ARCHITECTURE.md](PAPER_LIBRARY_ARCHITECTURE.md): 论文库整体架构——三层结构（raw 存储层 / wiki 组织层 / schema 层）、单篇论文单元、slug 与 frontmatter 规范、wiki 页面类型、三大工作流（ingest / query / lint）、操作约束。
- [PAPER_ADDITION_POLICY.md](PAPER_ADDITION_POLICY.md): 新增论文和批量导入规则——ingest 流程、批量导入前的 placement plan、intake stub、assets 创建时机。
- [PAPER_READING_WORKFLOW.md](PAPER_READING_WORKFLOW.md): 论文精读流程、笔记正文章节结构、截图和判断标准。

使用原则：

- 修改论文库结构前，先看这里的架构文档。
- 新增或批量导入论文前，先看 `PAPER_ADDITION_POLICY.md`。
- 没有明确确认前，不移动、删除或重命名 raw/ 已有文件。
- 根目录只保留轻量入口（`00_Guide.md`）和 schema（`AGENTS.md`）；详细规范归入 `arch/`。
