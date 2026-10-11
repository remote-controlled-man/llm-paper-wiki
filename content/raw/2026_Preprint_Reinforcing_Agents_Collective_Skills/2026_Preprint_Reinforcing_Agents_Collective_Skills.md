---
type: paper
title: "Reinforcing Agents with Collective Skills"
slug: "2026_Preprint_Reinforcing_Agents_Collective_Skills"
year: 2026
venue: "preprint (alphaXiv)"
status: skimmed
pdf: "[[2026_Preprint_Reinforcing_Agents_Collective_Skills.pdf]]"
arxiv: ""
url: "https://www.alphaxiv.org/abs/2609.reinforcing-agents-collective-skills"
code: "https://github.com/NVlabs/Skill2Env"
tags: [agent, agentic-rl, agent-skills, environment-generation, verifiable-reward, behavioral-rubric]
primary_area: Agents
added_date: "2026-09-22"
last_reviewed: "2026-09-22"
---

# Reinforcing Agents with Collective Skills

> 收录与重点核读笔记（`skimmed`）。已核对原论文的方法、数据和结果章节及图 2、表 1；尚未复现实验或逐项审查生成任务。

## 一句话结论

**Skill2Env 把公开 Agent Skill 当作任务分布和过程规范，编译成可执行、可评分的 agentic RL 环境。** 论文报告结果奖励训练提高了终端任务通过率；加入 Skill 衍生行为 rubric 后，Skill 遵循评价更高，但任务通过率低于只用结果奖励的版本（PDF pp. 9–10）。

## 解决什么问题

真实 agent 工作负载常不公开。仅从代码仓库或预设主题合成训练任务，可能偏向技术工作；只检查最终产物的测试，也难区分谨慎执行、伪造证据或钻评分漏洞等过程差异。作者把社区编写的 `SKILL.md` 视为工作流、材料线索和质量标准的来源（pp. 2–4）。

## 方法与系统

1. **SkillHub**：从公开仓库抓取超过 5,000 个 Skill，按许可、安全、离线可执行性等条件过滤并去重；论文使用约 3,400 个 Skill（p. 4）。
2. **Plan → Diversify → Create**：Codex planner 将每个 Skill 拆为可验证工作流，推荐真实资产；host 采样任务类型、验证方式、复杂度、角色等轴；新的 creator 构建初始环境、指令、程序测试、行为 rubric，最后写参考解（图 2，pp. 5–6）。
3. **Verify**：任务使用 Harbor 格式。静态检查之外，参考解必须让每个指标满分，空操作必须让每个指标得零分，Docker 基础镜像固定到 digest（p. 6）。这只验证最低可运行性，不能证明所有合理解都能得分或没有奖励漏洞。
4. **训练奖励**：`tests/test.sh` 写出最多六个 `[0,1]` 指标，均值为结果奖励。另一条件用 LLM judge 根据 `rubric.md` 和轨迹打 `[-5,5]` 分，以固定权重 `0.2` 加到结果奖励；训练使用 Qwen3.8-27B 和 DPPO 变体（pp. 6, 8–9）。

## 输入、输出与模态

- **生成器输入**：`SKILL.md`、随附脚本/参考资料/资产，以及生成阶段可访问的公开仓库和文档。
- **生成器输出**：离线终端任务目录，含 `instruction.md`、`environment/Dockerfile`、`tests/test.sh`、`tests/rubric.md`、`solution/solve.sh`。
- **训练 agent 输入/输出**：终端任务指令与容器文件系统，经工具调用修改环境；测试从最终容器状态计算奖励。论文研究的是终端/文本与文件操作，不是机器人感知或物理控制环境。

## 关键图表与结果

图 2（PDF p. 2）给出 SkillHub → plan → diversify → create → verify → RL environment 的链路。论文语料为 **7,971 个任务、13 个领域**；实际 RL 只从中取 **2,400 个任务**训练 300 步（pp. 6、9、16）。

表 1（PDF p. 9；Qwen3.8-27B、Pi harness、每题五次试验）：

| 条件 | Terminal-Bench 2.1 pass@1 | S2EBench pass@1 | S2EBench 均分 |
| --- | ---: | ---: | ---: |
| Base | 49.4% | 33.4% | 56.6 |
| 结果奖励 RL | 54.1% | 37.7% | 75.1 |
| 结果 + rubric RL | 50.1% | 34.7% | 63.6 |

表 2（PDF p. 10）在 200 个任务上分别与 base 比较：评判模型偏好结果奖励版轨迹的比例为 54.5%，偏好 rubric 版为 73.0%。**这不是两个 RL checkpoint 直接对比，也不是人类评审结果。**

## 与研究方向的关系

- 主归属 **Agents**：贡献在于从人类写的工作流批量构造 agentic RL 环境和两类奖励，而不是推理时加载 Skill。具体系统见 [[wiki/entities/Skill2Env]]。
- 与 [[raw/2026-05_Polar_2605.24220/2026-05_Polar_2605.24220|Polar]] 互补：Polar 处理原生 harness 的 rollout 与轨迹，Skill2Env 处理任务和评分来源；论文训练使用 Polar。
- 与 [[raw/2026-03_SWE_Skills_Bench_2603.15401/2026-03_SWE_Skills_Bench_2603.15401|SWE-Skills-Bench]] 的问题不同：后者检验使用 Skill 是否有帮助，这里把 Skill 编译成训练环境。
- 对 Human–AI Interaction 的启发是“人的过程标准如何进入评价”，但论文没有用户研究，也未证明广义人类价值对齐。

## 局限和不要误读

- S2EBench 只有 79 题，来自同一 SkillHub 分布，且是作者构建的私有评测（p. 7）；Terminal-Bench 迁移更有说服力，但未用匹配规模的非 Skill 任务对照来隔离 Skill 来源的贡献。
- 参考解满分、空操作零分无法排除其他解被误判或 agent 钻测试漏洞；rubric 训练和 Skill 遵循偏好测试使用同一个 judge 模型（pp. 9–10）。
- rubric 条件的结果分下降，作者也指出固定权重、加法形式及 judge 看不到文件系统等可能因素；不能把过程遵循的偏好分直接等同于真实工作质量。
- 论文的约 3,400 个 Skill 与当前仓库 `SkillHub/README.md` 所列 2,396 个不同；论文 p. 6 脚注还说明初次公开的数据集改用另一生成模型。公开材料和论文实验语料的对应关系需要进一步核对。

## 可复用点与下一步问题

- 可复用：先定任务世界与验证器，再写参考解；把结果测试和过程 rubric 分开；用 Oracle/NOP 作为最小验收门槛。
- 下一步：抽查公开任务的 verifier 是否容纳多种正确解、是否能防 reward hacking；用相同任务数与预算比较 Skill 来源和普通主题种子；寻找既保住完成率又能体现过程质量的奖励组合。

## 来源

- [论文页面](https://www.alphaxiv.org/abs/2609.reinforcing-agents-collective-skills)
- [作者仓库与原 PDF](https://github.com/NVlabs/Skill2Env/blob/main/paper/Skill2Env_arXiv.pdf)
- [Skill2Env 代码](https://github.com/NVlabs/Skill2Env)
