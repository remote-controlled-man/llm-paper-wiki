# Wiki Log

Append-only 日志，新条目追加到文件末尾。

条目格式：`## [YYYY-MM-DD] <op> | <subject>`，正文一两句即可。常见 op：`ingest`、`triage`、`query`、`lint`、`update`、`restructure`。

## [2026-09-19] restructure | 库重构为 LLM Wiki 结构，255→251 篇（合并 4 组重复），迁入扁平 raw/

三层结构确立：`raw/` 存储层（扁平、不可变）+ `wiki/` 组织层（LLM 维护）+ schema 层（AGENTS.md + arch/）。本次创建 wiki/ 骨架（index/overview/log/areas 等），旧 `indexes/` 的 reading_queue 与 deep_read_log 迁入 wiki/，其余 indexes 文件职责由 wiki/index.md 接管；`indexes/restructure_review.md` 移至 `arch/`。

## [2026-09-19] update | 联网核实两篇扫描版中文综述出处并重命名：人体行为识别方法研究综述 → 2022_ARA_Human_Action_Recognition_Methods_Survey（计算机应用研究 2022,39(3)）；李贵综述 → 2021_NCNISA_DL_Human_Action_Recognition_Survey_LiGui（2021 年第25届网络新技术与应用年会）

## [2026-09-19] ingest | Jev 方向建档：web 源 2026-09_TypeSafe_Jev_Launch_Post + 论文 stub 2503.23303 / 2510.01237；新建 [[wiki/entities/Jev]] 与 [[wiki/concepts/System_One_Decision_Models]]，两篇 arXiv 入 reading_queue

## [2026-09-22] ingest | Reinforcing Agents with Collective Skills / Skill2Env

保存作者仓库中的原 PDF，建立 skimmed source 笔记与 [[wiki/entities/Skill2Env]]，并更新 Agents 枢纽和全库目录；记录结果奖励与行为 rubric 的实验差异及公开语料口径问题。

## [2026-10-11] update | wiki 层扩容：13 个 concept 页 + 1 篇 synthesis，五个 area 页接入概念链接

按 255 篇笔记的聚类结果批量建设 concept 层：GAN 与图像翻译、NR-IQA、人体动作识别、多模态 LLM、VLA 与机器人基础模型、Agent 记忆、Agentic RL、Agent 评测、Agent 安全与 Reward Hacking、全双工实时交互、多智能体、主动式交互、社交机器人长期 HRI；新增 synthesis [[wiki/synthesis/Agent_Research_Landscape_2023_2026|Agent 研究脉络 2023–2026]]。注意：全库约 217/255 篇笔记仍是占位 stub，多页含"待精读回填"说明，精读时应回读修订对应 concept 页。
