---
type: entity
title: "Skill2Env"
sources:
  - "[[raw/2026_Preprint_Reinforcing_Agents_Collective_Skills/2026_Preprint_Reinforcing_Agents_Collective_Skills|Reinforcing Agents with Collective Skills]]"
created: 2026-09-22
updated: 2026-09-22
---

# Skill2Env

NVIDIA 提出的 agentic RL 任务生成流水线：从公开 Agent Skill 中提取可验证工作流，生成离线终端环境、程序测试、行为 rubric 和参考解。Skill 在这里是**任务与质量标准的来源**，不是运行时给被训练 agent 调用的工具。

## 生成与验收

`SkillHub → workflow plan → task axes → Docker task / verifier / rubric / oracle → static + Oracle/NOP gate → Harbor task`。论文报告约 3,400 个源 Skill 形成 7,971 个任务；当前开源 SkillHub 页面列出 2,396 个，公开材料未解释口径差异。

## 证据边界

在 Qwen3.8-27B 的 2,400 任务训练子集上，结果奖励 RL 提高 Terminal-Bench 2.1 与私有 S2EBench 通过率。加入 rubric 奖励后，Skill 遵循偏好评价提高，但通过率低于只用结果奖励的版本。Oracle/NOP gate 保证参考解与空操作的极端情形，不保证 verifier 覆盖其他合理解。

## 关联

- 原论文与详细数字：[[raw/2026_Preprint_Reinforcing_Agents_Collective_Skills/2026_Preprint_Reinforcing_Agents_Collective_Skills|Reinforcing Agents with Collective Skills]]
- rollout 基础设施：[[raw/2026-05_Polar_2605.24220/2026-05_Polar_2605.24220|Polar]]
- 另一类 Skill 有效性问题：[[raw/2026-03_SWE_Skills_Bench_2603.15401/2026-03_SWE_Skills_Bench_2603.15401|SWE-Skills-Bench]]
- [项目代码](https://github.com/NVlabs/Skill2Env)
