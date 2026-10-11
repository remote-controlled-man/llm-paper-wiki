---
type: concept
title: "VLA 与机器人基础模型"
sources:
  - "[[raw/2022_RT1_Robotics_Transformer_RealWorld_Control_Scale/2022_RT1_Robotics_Transformer_RealWorld_Control_Scale|RT-1]]"
  - "[[raw/2023_RT2_Vision_Language_Action_Models_Robotic_Control/2023_RT2_Vision_Language_Action_Models_Robotic_Control|RT-2]]"
  - "[[raw/2023_Open_X_Embodiment_RT_X_Models/2023_Open_X_Embodiment_RT_X_Models|Open X-Embodiment]]"
  - "[[raw/2023_Diffusion_Policy_Visuomotor_Policy_Learning/2023_Diffusion_Policy_Visuomotor_Policy_Learning|Diffusion Policy]]"
  - "[[raw/2024_OpenVLA_OpenSource_Vision_Language_Action_Model/2024_OpenVLA_OpenSource_Vision_Language_Action_Model|OpenVLA]]"
  - "[[raw/2024_pi0_Vision_Language_Action_Flow_Model_General_Robot_Control/2024_pi0_Vision_Language_Action_Flow_Model_General_Robot_Control|π0]]"
  - "[[raw/2025_pi0_5_VLA_OpenWorld_Generalization/2025_pi0_5_VLA_OpenWorld_Generalization|π0.5]]"
  - "[[raw/2026_DreamZero_World_Action_Models_ZeroShot_Policies/2026_DreamZero_World_Action_Models_ZeroShot_Policies|DreamZero]]"
created: 2026-10-11
updated: 2026-10-11
---

# VLA 与机器人基础模型

> [!warning] 来源状态
> 本页引用的 18 篇笔记目前**全部是占位 stub**（frontmatter + 标题，`status: unread`），尚无精读内容。本页的综合判断基于笔记 frontmatter 元数据与这些论文的公开信息写成，**不是**对笔记内容的摘要；任何一篇完成精读后都应回读并修订本页。

## 定义

VLA（Vision-Language-Action）模型：以视觉-语言模型（VLM）为骨干、直接输出机器人动作的策略模型。核心主张是**迁移**：把互联网规模的语义/视觉知识迁移到物理控制上，让机器人获得语言理解、语义泛化和推理能力，而不必为每个任务从头训练。它是"机器人基础模型"这条技术线的当前主流形态，但 2025–2026 年正在出现向**世界-动作模型（World Action Model, WAM）**——联合预测未来视觉状态与动作——扩展的转折。

## 演进脉络与关键转折点

1. **2022：LLM 当规划器，不当执行器**。主线是用语言模型做高层决策，再 grounding 到可执行的东西上：[[raw/2022_SayCan_Grounding_Language_Robotic_Affordances/2022_SayCan_Grounding_Language_Robotic_Affordances|SayCan]]（LLM 给子任务打分 × affordance 值函数过滤"现在做得了什么"）、[[raw/2022_Code_As_Policies_Language_Model_Programs_Embodied_Control/2022_Code_As_Policies_Language_Model_Programs_Embodied_Control|Code as Policies]]（LLM 写程序作为策略，调用感知/动作 API）、[[raw/2023_VoxPoser_3D_Value_Maps_Robot_Manipulation/2023_VoxPoser_3D_Value_Maps_Robot_Manipulation|VoxPoser]]（LLM+VLM 用代码合成 3D value map，零训练零样本）、[[raw/2022_VIMA_General_Robot_Manipulation_Multimodal_Prompts/2022_VIMA_General_Robot_Manipulation_Multimodal_Prompts|VIMA]]（多模态 prompt 作为任务规范 + transformer 策略，提出跨任务泛化基准）。这一阶段的共同局限：控制频率低、依赖手工设计的低层技能/值函数。
2. **2022–2023：端到端 VLA 确立**。[[raw/2022_RT1_Robotics_Transformer_RealWorld_Control_Scale/2022_RT1_Robotics_Transformer_RealWorld_Control_Scale|RT-1]] 证明大规模真实机器人数据（13 万+ episode）训练的 transformer 可以泛化到数百个任务；**[[raw/2023_RT2_Vision_Language_Action_Models_Robotic_Control/2023_RT2_Vision_Language_Action_Models_Robotic_Control|RT-2]] 是关键转折点**——直接在 Web 数据预训练的 VLM 上共训，把动作表示为文本 token，首次系统展示 Web 知识迁移带来的语义与视觉泛化（包括指令推理、对没见过的物体/符号做反应）。数据侧的对偶转折是 [[raw/2023_Open_X_Embodiment_RT_X_Models/2023_Open_X_Embodiment_RT_X_Models|Open X-Embodiment]]（22 种本体、100 万+ episode 的社区数据集 + RT-X 模型），开启跨本体数据 scaling。
3. **2023：另一条路——动作生成的非自回归化**。[[raw/2023_Diffusion_Policy_Visuomotor_Policy_Learning/2023_Diffusion_Policy_Visuomotor_Policy_Learning|Diffusion Policy]] 不用 VLM 先验，用扩散模型表达多峰动作分布、输出连续动作，在精细操作上压过当时的自回归 BC 方法。这埋下了后来 VLA 内部"离散动作 token vs 连续扩散/流"的分歧。
4. **2024：开源化 + 扩散/流成为主流动作头**。[[raw/2024_Octo_OpenSource_Generalist_Robot_Policy/2024_Octo_OpenSource_Generalist_Robot_Policy|Octo]]（80 万 episode 上训练的开源通用策略，可 fine-tune 到新本体/传感器）和 [[raw/2024_OpenVLA_OpenSource_Vision_Language_Action_Model/2024_OpenVLA_OpenSource_Vision_Language_Action_Model|OpenVLA]]（7B，Llama 2 + 视觉编码器，在 Open X-Embodiment 970k episode 上训练）把 RT-2 路线开源复现并压低适配成本；[[raw/2024_RDT1B_Diffusion_Foundation_Model_Bimanual_Manipulation/2024_RDT1B_Diffusion_Foundation_Model_Bimanual_Manipulation|RDT-1B]] 把扩散 transformer 推到双臂操作（1B 参数，统一动作空间处理异构本体）。**[[raw/2024_pi0_Vision_Language_Action_Flow_Model_General_Robot_Control/2024_pi0_Vision_Language_Action_Flow_Model_General_Robot_Control|π0]] 是第二个关键转折点**：预训练 VLM + flow matching 动作专家，50Hz 连续高频控制，首次把"叠衣服、收拾餐桌"这类灵巧（dexterous）任务做到可用水平，奠定了"VLM 慢思考 + 扩散/流快执行"的架构范式。数据侧 [[raw/2024_DROID_LargeScale_InTheWild_Robot_Manipulation_Dataset/2024_DROID_LargeScale_InTheWild_Robot_Manipulation_Dataset|DROID]]（约 7.6 万条轨迹、564 个真实家庭/场景）把数据采集从实验室推到 in-the-wild。
5. **2025：开放世界与人形专精**。[[raw/2025_pi0_5_VLA_OpenWorld_Generalization/2025_pi0_5_VLA_OpenWorld_Generalization|π0.5]] 在异构本体数据上共训 + 层次化（高层语义推理子任务 + 低层 flow 执行），声称在没见过的家庭环境里保持泛化；[[raw/2025_GR00T_N1_Open_Foundation_Model_Generalist_Humanoid_Robots/2025_GR00T_N1_Open_Foundation_Model_Generalist_Humanoid_Robots|GR00T N1]] 走人形专精路线，双系统架构（VLM 慢系统 + 扩散 transformer 快系统）并以大量合成/遥操作数据补足人形数据稀缺。
6. **2026：从 VLA 到世界-动作模型（WAM）**。[[raw/2026_DreamZero_World_Action_Models_ZeroShot_Policies/2026_DreamZero_World_Action_Models_ZeroShot_Policies|DreamZero]]（NVIDIA GEAR）联合预测未来视频与动作，主张 WAM 本身就是零样本策略，能执行 VLA 没见过的新技能（如系鞋带）——本库此线最新、争议最大的一篇；[[raw/2026_WALL_WM_Event_Grounded_World_Action_Model/2026_WALL_WM_Event_Grounded_World_Action_Model|WALL-WM]] 批评现有 WAM 的"定长 chunk 训练"与语言/视觉/动作的时间粒度错配，改为以语义事件（event joints）为学习原子；[[raw/2026_GEM_Generative_Supervision_Embodied_Intelligence/2026_GEM_Generative_Supervision_Embodied_Intelligence|GEM]] 则从预训练目标侧切入，把深度图生成任务塞进 VLM 预训练（生成式监督），弥补语义预训练与空间/物理执行知识之间的缺口。

## 方法分类

- **A. LLM 规划 + grounding（2022–2023）**：语言模型输出子任务/程序/值函数，不直接出电机指令。代表：SayCan、Code as Policies、VoxPoser、（VIMA 可算"多模态 prompt 规范 + 策略"的过渡形态）。优点是可解释、零/少训练；缺点是频率低、依赖手工低层原语。
- **B. 端到端 VLA，自回归离散动作 token**：VLM 骨干 + 动作离散化为 token。代表：RT-1、RT-2、OpenVLA。复用 LLM 生态最彻底，但量化损失与逐 token 解码限制了控制频率和精细度。
- **C. VLM/多模态骨干 + 扩散/流匹配连续动作头**：当前主流。代表：Diffusion Policy（无 VLM 先验的起点）、Octo、RDT-1B、π0、π0.5、GR00T N1。连续动作 + 多峰分布 + 高频控制，代价是推理延迟需要专门优化。
- **D. 数据与生成侧**：跨本体数据集（Open X-Embodiment、DROID）与合成数据管线（GR00T 系列）；GEM 的深度生成式监督属于"预训练目标增强"，可叠加在 B/C 上。
- **E. 世界-动作模型（WAM，2026 新线）**：联合建模视频/世界演化与动作（DreamZero、WALL-WM）。当前主张从"辅助预训练任务"升级为"策略本身"。

## 研究问题（本库跟踪的主线）

> 通用机器人需要的能力可以拆成三层：理解"这是什么"（语义）、"这会怎样"（物理/世界动态）、"如何在毫秒级精确执行"（控制）。VLA 路线用 Web 先验解决第一层、用模仿学习硬拟合第三层，第二层基本缺失；WAM 路线赌联合预测世界与动作能补上第二层。哪条路（或什么组合）能走到开放环境的通用操作？

## 已知矛盾 / 争议

- **动作表示之争**：离散 token（OpenVLA 系）简单且可复用 LLM 基建，但量化损失 + 解码频率上限明显；扩散/流（π0/RDT 系）表达力与频率占优，但推理延迟高、训练更重。π0 之后社区明显倒向后者，但 OpenVLA 系的数据/评测优势仍在。
- **"VLA 已死？"路线之争（2026）**：DreamZero 主张 VLA 只编码了"该做什么"的语义先验、缺"如何精确执行新技能"的时空表示，WAM 才是出路；反方认为语义泛化、事件粒度、层级化（π0.5、WALL-WM）是融合问题而非路线更替。目前双方都在各自挑选的 benchmark 上报告结果，没有公认裁决。
- **数据之争**：真实数据贵且窄（DROID/OXE 的覆盖率仍低）vs 合成数据便宜但物理可信度存疑（GR00T N1 训练数据大部分来自合成/遥操作管线）；跨本体数据 scaling 的收益（OXE 的正迁移结论）与本体差异带来的动作空间失配（RDT-1B 要专门设计统一动作空间）并存。
- **泛化 claim 与评测碎片化**：各家报各自的真机成功率与仿真基准，协议不统一，"开放世界泛化"（π0.5、DreamZero）很难横向比较。
- **安全**：VLA 的"幻觉动作"没有文本幻觉那样的护栏研究积累，foundation policy 的失效模式与物理安全基本空白。

## 开放问题 / 观察触发器

- [ ] 预训练目标之争：next-action vs next-frame/视频-动作联合，哪个是更好的通用机器人预训练任务？（DreamZero 对 π0.5 的直接对照实验是否出现？）
- [ ] 事件粒度（WALL-WM）与知识绝缘/层级化（π0.5）是否收敛到同一套"慢规划+快执行"架构？GR00T N1 的双系统与 WAM 的统一建模谁更可扩展？
- [ ] 双臂/人形等复杂本体上，跨本体预训练（RDT-1B、GR00T N1）相比单本体 specialist 的真实收益何时为正？
- [ ] 本库 18 篇笔记全部处于 unread：任何一篇完成精读后，回读本页并把相应论断从"公开信息"升级为"笔记证据"；尤其 DreamZero / WALL-WM / GEM 三篇 2026 论文是本页"WAM 转折"论断的支柱，优先精读。
