# Paper Addition Policy

状态：v2，当前有效
适用范围：新增论文（ingest）、批量导入论文、补占位笔记。

## 1. 核心原则

- ingest 一次一篇、人在环中：读 PDF → 与用户讨论要点 → 写/更新 note.md → 更新相关 concept/entity 页 → 更新 `wiki/index.md` → 追加 `wiki/log.md`（完整流程见 `AGENTS.md`）。
- 先定放置计划，再落文件：批量导入前必须给 placement plan 并等用户确认。
- raw/ 是扁平存储层：一篇论文一个文件夹，直接放 `raw/<slug>/`，不存在主题子目录，也不允许创建任何批次、主题、下载任务包装目录。
- 主题归属不靠目录：由 note.md frontmatter 的 `primary_area`（五大研究方向之一）和 wiki 页 wikilink 表达。
- 未精读论文可以有占位笔记，但必须明确它只是 intake stub，不是假装精读完成。

## 2. 单篇论文落盘

```text
raw/
  <slug>/
    <slug>.pdf
    <slug>.md
    assets/          ← 仅当 md 实际引用图片时创建
```

约束：

- slug 规范：有 arXiv 用 `YYYY-MM_Short_Title_<arxiv号>`；无 arXiv 用 `YYYY_VENUE_Short_Title`；年份无法确认可省略前缀。文件夹、PDF、md 同名。
- note.md frontmatter 最小字段：`title`、`slug`、`year`、`status`、`pdf`、`tags`、`primary_area`（完整规范见 `arch/PAPER_LIBRARY_ARCHITECTURE.md`）。
- `primary_area` 按论文主要智力贡献定，取 `wiki/areas/` 五个枢纽页之一；跨方向关系写进 `tags` 和相关 wiki 页，不复制文件。

## 3. 批量导入前的放置计划

批量导入前必须先给用户一个 placement plan，至少包含：

```text
将新增 N 篇论文：

- 每篇的 slug 与 primary_area 归属（五大方向分布）：
- 需要新建或更新哪些 wiki 页（areas / concepts / entities）：
- 是否判定为 "No material" 只记 log 的条目：
- 不会删除、移动或重命名已有论文：
```

用户确认后再落文件。落文件后按 ingest 流程逐篇处理。

## 4. Intake Stub 与精读笔记

未精读论文可以先建立 Markdown 占位笔记，称为 intake stub。

intake stub 允许包含：

- YAML metadata
- `# Title`
- `## One-line Reason To Read`
- `## Reading Questions`
- `## Notes`

但必须满足：

- `status` 使用 `unread` 或 `skimmed`，不能写 `deep_read`。
- 不写入 `wiki/deep_read_log.md`。
- 不从 `wiki/reading_queue.md` 移除，除非用户明确不读了。
- 后续真正精读时，再按 `arch/PAPER_READING_WORKFLOW.md` 扩展为完整笔记。

triage 例外：判定 "No material" 的条目不建笔记，只在 `wiki/log.md` 追加一条记录。

## 5. Assets 规则

- 不要为未精读论文预创建空 `assets/`。
- 只有当 Markdown 实际引用图片、表格或公式截图时，才创建 `assets/`。
- 空 `assets/` 目录属于可清理项，但删除前要列清单确认。
- `assets/` 里只放当前 Markdown 实际引用的文件。

## 6. 新增后的 wiki 维护

每次 ingest（含批量导入的每一篇）完成后：

- 更新 `wiki/index.md`（按 area 分节把新论文列进去）。
- 追加 `wiki/log.md`，条目格式 `## [YYYY-MM-DD] <op> | <subject>`。
- 新建或更新相关 concept / entity 页，并在页面 frontmatter 的 `sources` 里回链新 note。
- 如果用户确定下一批要读的论文，更新 `wiki/reading_queue.md`。
- 不自动写入 `wiki/deep_read_log.md`，除非论文已经精读完成。

## 7. 禁止事项

- 不把同一篇论文复制到多个位置。
- 不在 raw/ 下创建任何子目录（主题目录、批次目录、下载任务目录都不允许）。
- 不按年份、会议、下载日期组织文件（年份信息在 slug 前缀和 frontmatter 里）。
- 不提前创建空 `assets/`。
- 不把占位笔记当作精读笔记。
- 不移动、重命名、删除已有论文，除非用户确认了变更清单。
