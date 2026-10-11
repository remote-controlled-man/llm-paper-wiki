# HSD Paper Wiki

一个由 LLM 维护的论文知识库：Obsidian vault + Quartz 4 静态站点，内容可双端使用。

An LLM-maintained paper knowledge base: an Obsidian vault that also builds into a static site with [Quartz 4](https://quartz.jzhao.xyz/).

## 这是什么 | What this is

本库遵循 Andrej Karpathy 提出的 **LLM Wiki 三层模式**，把论文阅读从"收藏 PDF"变成"LLM 参与维护的结构化知识"：

- **raw/ 原始层**：一篇论文一个文件夹，每篇笔记含 YAML frontmatter（标题、年份、venue、arXiv 编号、状态、标签、所属方向）与结构化要点正文。
- **wiki/ 组织层**：LLM 编译的概念层——全量目录（index）、研究方向枢纽（areas）、跨论文概念页（concepts）、实体页（entities）、综述与对比（synthesis）、当前论点与开放问题（overview）。
- **schema/ 规约层**：`content/AGENTS.md` 与 `content/arch/` 治理文档，是写给 LLM 的操作规约，人与 LLM 共同演化。

目前收录 **255 篇论文的结构化笔记** 与 **14 个主题概念页**，方向集中在：**Agents / 机器人与 HRI / 多模态大模型 / 视觉感知**。

## 诚实声明 | Honest disclosure

- 大部分笔记当前是**结构化选目**（元数据 + 标签 + 要点），不是逐段精读；
- **深度精读笔记约 20 余篇**，并在持续增长（见 `content/wiki/deep_read_log.md`）；
- `wiki/concepts` 与 `wiki/synthesis` 是 **LLM 编译的概念层**：它们整合、推断、偶尔过度推断，读时请对照 `raw/` 里的论文笔记溯源；
- 笔记中的"笔者/我"一般指维护流程中的 LLM 或库主人，是第一人称学习笔记语气。

## 版权说明 | Copyright

- **本库不含论文 PDF 全文**（版权原因，`.pdf` 已被 `.gitignore` 排除）。
- 每篇笔记的 frontmatter 都有 arXiv 编号或出处信息，可据此获取原文。
- 笔记中的论文配图（`raw/*/assets/`）为笔记引用的原文图表，版权归原出版方所有，此处仅为学习笔记用途引用。

## 怎么用 | Usage

**方式一：作为 Obsidian vault**

用 [Obsidian](https://obsidian.md/) 打开 `content/` 目录即可，wikilink、标签、frontmatter 全部原生兼容。

**方式二：浏览静态站点**

Quartz 构建后得到全站搜索、关系图、反向链接、标签页、RSS。站点通过 GitHub Actions 部署到 GitHub Pages（workflow 见 `.github/workflows/deploy.yml`；推送后需在仓库 Settings → Pages 把 Source 选为 "GitHub Actions"，并把 `quartz.config.ts` 里的 `baseUrl` 改为实际域名）。

**本地构建**

```bash
npm ci
npx quartz build        # 输出到 public/
npx quartz build --serve  # 本地预览 http://localhost:8080
```

## 目录结构 | Structure

```text
llm-paper-wiki/
  content/            ← Obsidian vault 根目录（站点内容）
    00_Guide.md       ← 人类入口页
    AGENTS.md         ← 给 LLM 的操作规约（schema 层）
    arch/             ← 治理文档（架构、新增政策、精读工作流）
    raw/              ← 255 篇论文笔记，<slug>/<slug>.md + assets/
    wiki/             ← 组织层：index / overview / areas / concepts / entities / synthesis / queries
  quartz/             ← Quartz 4 框架代码（遵循 MIT）
  quartz.config.ts    ← 站点配置（标题、locale、baseUrl、插件）
  quartz.layout.ts    ← 页面布局组件
  .github/workflows/  ← GitHub Pages 部署
```

## 维护方式 | Maintenance

新增论文、概念页、综述的流程由 `content/AGENTS.md` 规约：LLM 读 PDF → 与用户讨论 → 写笔记 → 更新概念页与索引 → 记日志。仓库的日常组织、导航、综述由 LLM 全权负责，人负责方向与审稿。

## 许可 | License

- **内容**（`content/` 下的笔记、wiki 页、arch 文档）：[CC BY 4.0](LICENSE) — 可自由分享与改编，需署名并注明修改。
- **Quartz 脚手架**（`quartz/`、`quartz.config.ts`、`quartz.layout.ts`、Dockerfile 等）：遵循 Quartz 的 [MIT License](https://github.com/jackyzha0/quartz/blob/v4/LICENSE.txt)。
