---
type: concept
title: "多模态大模型与交错预训练"
sources:
  - "[[raw/2022_Flamingo_Visual_Language_Model_FewShot_Learning/2022_Flamingo_Visual_Language_Model_FewShot_Learning|Flamingo (arXiv 2204.14198)]]"
  - "[[raw/2023_OBELICS_Interleaved_Image_Text_Documents_Dataset/2023_OBELICS_Interleaved_Image_Text_Documents_Dataset|OBELICS (arXiv 2306.16527)]]"
  - "[[raw/2023_VILA_Pretraining_Visual_Language_Models/2023_VILA_Pretraining_Visual_Language_Models|VILA (arXiv 2312.07533)]]"
  - "[[raw/2024_Chameleon_MixedModal_EarlyFusion_Foundation_Models/2024_Chameleon_MixedModal_EarlyFusion_Foundation_Models|Chameleon (arXiv 2405.09818)]]"
  - "[[raw/2024_Emu3_NextToken_Prediction_Multimodal/2024_Emu3_NextToken_Prediction_Multimodal|Emu3 (arXiv 2409.18869)]]"
  - "[[raw/2024_Transfusion_NextToken_Diffuse_Images_Multimodal_Model/2024_Transfusion_NextToken_Diffuse_Images_Multimodal_Model|Transfusion (arXiv 2408.11039)]]"
  - "[[raw/2024_ShowO_Single_Transformer_Multimodal_Understanding_Generation/2024_ShowO_Single_Transformer_Multimodal_Understanding_Generation|Show-o (arXiv 2408.12528)]]"
  - "[[raw/2025_Qwen2_5_Omni_Technical_Report/2025_Qwen2_5_Omni_Technical_Report|Qwen2.5-Omni (arXiv 2503.20215)]]"
created: 2026-10-11
updated: 2026-10-11
---

# 多模态大模型与交错预训练

## 阅读状态说明（先读这段）

本页覆盖的 18 篇论文中，**目前只有 [[raw/2025_Qwen2_5_Omni_Technical_Report/2025_Qwen2_5_Omni_Technical_Report|Qwen2.5-Omni]] 有精读笔记**（status: deep_read），其余 17 篇笔记均为占位（status: unread，正文"待读"）。因此本页的综合判断基于这些论文的**公开内容**与社区共识，未经过本库笔记核对；凡涉及具体数字与消融结论处，精读对应论文后应回改本页。每篇论文的 arXiv 号见 frontmatter 与 wikilink，可据此核对。

## 定义

**多模态大模型（MLLM）** 指把文本以外的模态（图像、视频、音频、甚至机器人传感器状态）接入大语言模型的统一框架；**交错预训练（interleaved pretraining）** 是其中一条数据与建模主线：不用 (image, caption) 配对数据，而是在图文交错、图文混排的网页式文档上训练，让模型学会在"文-图-文-图"的长上下文里做 few-shot 学习与生图。

本库跟踪的子问题群：

> 连续模态如何变成 LLM 能消费的东西（adapter / 离散 token / 连续表示）？理解与生成能否由同一个模型、同一个目标统一？交错文档数据到底贡献了什么是配对数据给不了的？这条线最终收敛到什么样的产品形态（实时 omni 交互）？

## 演进脉络（三代）

### 第一代：冻结 LM + 轻量接入 + 交错数据 few-shot（2022–2023）

- [[raw/2022_Flamingo_Visual_Language_Model_FewShot_Learning/2022_Flamingo_Visual_Language_Model_FewShot_Learning|Flamingo]] 确立范式：冻结预训练 LM 与视觉 encoder，中间插 Perceiver Resampler + gated cross-attention 层，在图文交错文档（M3W）上训练后获得 in-context few-shot 能力。这是"不重训 LM 也能吃进多模态"路线的起点，也是交错数据价值的首次公开展示。
- [[raw/2023_OpenFlamingo_Autoregressive_Vision_Language_Models/2023_OpenFlamingo_Autoregressive_Vision_Language_Models|OpenFlamingo]] 开源复现该范式；[[raw/2023_Kosmos1_Multimodal_Large_Language_Model/2023_Kosmos1_Multimodal_Large_Language_Model|Kosmos-1]] 把感知模态直接对齐进 LM 做通用感知接口。
- [[raw/2023_PaLM_E_Embodied_Multimodal_Language_Model/2023_PaLM_E_Embodied_Multimodal_Language_Model|PaLM-E]] 是这条思路的具身分支：把机器人传感器状态（图像、状态估计）token 化后塞进 frozen PaLM，证明同一个 LM 可以同时做问答和机器人规划——它是本库 Robotics_and_HRI 方向与 MLLM 的交汇点。
- [[raw/2023_Emu2_Generative_Multimodal_Models_InContext_Learners/2023_Emu2_Generative_Multimodal_Models_InContext_Learners|Emu2]] 已经把生成与理解放进一个自回归模型里，用交错图文上下文做 in-context 生成，预示了第二代的统一化。

### 第二代：数据规模化 + 统一建模的路线分化（2023 末–2024）

数据侧先行：

- [[raw/2023_OBELICS_Interleaved_Image_Text_Documents_Dataset/2023_OBELICS_Interleaved_Image_Text_Documents_Dataset|OBELICS]] 把 Common Crawl 加工成 1.41 亿文档、约 10 亿图的**开放**图文交错语料，填补了"交错数据只有闭源 M3W"的空白；[[raw/2024_OmniCorpus_Image_Text_Interleaved_Corpus/2024_OmniCorpus_Image_Text_Interleaved_Corpus|OmniCorpus]] 把规模推到百亿图级别并强调质量过滤。交错数据从此成为可复现的公共资源。
- [[raw/2023_VILA_Pretraining_Visual_Language_Models/2023_VILA_Pretraining_Visual_Language_Models|VILA]] 给出预训练配方层面的证据：interleaved 数据 + image-text pair 混合训练对多图推理和 in-context learning 有实质增益，且 image-text 联合训练优于先对齐后训练的两段式。这把"交错数据有没有用"从直觉变成消融结论。

建模侧在 2024 年分化为三派：

1. **全离散、全自回归**（"一切皆是 next-token"）：[[raw/2024_Chameleon_MixedModal_EarlyFusion_Foundation_Models/2024_Chameleon_MixedModal_EarlyFusion_Foundation_Models|Chameleon]] 从头训练的 early-fusion 模型，图像与文本共用一个 BPE 词表，单一自回归目标同时做理解和文生图，但需要大量工程解决模态失衡；[[raw/2024_Emu3_NextToken_Prediction_Multimodal/2024_Emu3_NextToken_Prediction_Multimodal|Emu3]] 走到极端——抛弃扩散和 VAE 式结构，视频、图像、文本全部离散 token 化，声称 next-token prediction 足以统一多模态；[[raw/2024_AnyGPT_Unified_Multimodal_LLM_Discrete_Sequence_Modeling/2024_AnyGPT_Unified_Multimodal_LLM_Discrete_Sequence_Modeling|AnyGPT]] 把语音等更多模态也离散化接入同一 LLM。这一派买的是架构简洁与规模扩展性，付的是 tokenizer 信息瓶颈的代价。
2. **混合单模型**（文本自回归 + 图像扩散）：[[raw/2024_Transfusion_NextToken_Diffuse_Images_Multimodal_Model/2024_Transfusion_NextToken_Diffuse_Images_Multimodal_Model|Transfusion]] 和 [[raw/2024_ShowO_Single_Transformer_Multimodal_Understanding_Generation/2024_ShowO_Single_Transformer_Multimodal_Understanding_Generation|Show-o]] 在单一 transformer 内混用两种目标：文本照常 next-token，图像用 diffusion 式目标。试图兼得两派的优点——这是 2024 下半年最重要的路线分歧点。
3. **理解侧的多图/多帧指令微调**：[[raw/2024_LLaVA_NeXT_Interleave_MultiImage_Video_3D/2024_LLaVA_NeXT_Interleave_MultiImage_Video_3D|LLaVA-NeXT-Interleave]] 与 [[raw/2024_MANTIS_Interleaved_MultiImage_Instruction_Tuning/2024_MANTIS_Interleaved_MultiImage_Instruction_Tuning|Mantis]] 把交错预训练的能力落到指令微调与 benchmark 上（多图、视频、3D）；[[raw/2024_MM_Interleaved_Image_Text_Generative_Modeling/2024_MM_Interleaved_Image_Text_Generative_Modeling|MM-Interleaved]] 与 [[raw/2024_COSMO_Interleaved_PreTraining/2024_COSMO_Interleaved_PreTraining|COSMO]] 则是交错图文**生成**方向的独立推进。

### 第三代：工程收敛为实时 omni 交互（2024 末–2025）

- [[raw/2025_Qwen2_5_Omni_Technical_Report/2025_Qwen2_5_Omni_Technical_Report|Qwen2.5-Omni]] 是本库唯一精读的终点样本：text/image/video/audio 输入统一进 Thinker，文本与语音双路输出由 Talker 生成，TMRoPE 对齐音画时间，block-wise encoder + 滑动窗口 DiT 压实时延迟。值得注意的是它的取舍：**没有走全离散化**，输入侧保留 encoder 连续表示，输出侧用双解码器规避文本-语音互相干扰。学术上的"统一建模"之争在产品形态上收敛为"强 encoder + 流式工程"。

## 关键转折点

- **Flamingo（2022）**：交错预训练范式的确立者；此前多模态预训练几乎全是配对数据。
- **Emu2 → Emu3（2023→2024）**：从"统一模型可行"到"next-token 可以包打一切"的强主张，把全离散路线推到台前。
- **Transfusion / Show-o（2024）**：对 Emu3 主张的正面回应——保留 diffusion 不必牺牲单模型统一。此后"全离散 vs 混合"成为该线核心争论。
- **Qwen2.5-Omni（2025）**：工程上的事实收敛点；实时全模态交互成为这一技术线的落地形态。

## 与本库已有论文的关系

- **Robotics_and_HRI 交汇**：[[raw/2023_PaLM_E_Embodied_Multimodal_Language_Model/2023_PaLM_E_Embodied_Multimodal_Language_Model|PaLM-E]]（感知状态 token 化进 LM）与 [[raw/2025_Qwen2_5_Omni_Technical_Report/2025_Qwen2_5_Omni_Technical_Report|Qwen2.5-Omni]]（实时感知-语音交互层）分别是这条线在具身方向的头尾；按 Qwen2.5-Omni 笔记的判读，它不做 action 输出，与 VLA 路线互补而非竞争。
- **Human_AI_Interaction 交汇**：Thinker-Talker 分离、双工语音交互、可打断与初始延迟，直接对应 HAI 方向的实时交互问题（笔记中已将其定位为"实时音视频理解 + 语音交互层"）。
- **数据基建**：OBELICS / OmniCorpus 是本库少有的"数据集即贡献"论文，后续所有交错预训练工作都建立在其上；VILA 的配方结论可作为复现/改造时的先验。

## 已知矛盾 / 争议

- **全离散 vs 混合目标**：Emu3/AnyGPT 主张离散 token + 自回归足以统一多模态；Transfusion/Show-o 则认为图像上 diffusion 目标更优。分歧的实质是 tokenizer 的信息瓶颈与生成质量 vs 架构统一带来的训练/扩展便利。到 Qwen2.5-Omni，工程答案实际上是"都不选"——encoder 表示 + 双解码器。
- **交错数据的价值边界**：VILA/OBELICS 证明了增益，但网页交错数据噪声大，配比与质量过滤缺乏可控规律（OmniCorpus 主打的质量过滤本身就是证据：大家信不过原始网页）。
- **生成-理解统一是否双赢**：混合训练常被报告为互相增益，但生成能力对理解 benchmark 的代价、以及长视频/高分辨率下的训练成本，多数论文语焉不详。
- **early fusion vs adapter 后期融合**：Chameleon 式从头联合训练上限高但成本巨大；LLaVA 式冻结强 LM + adapter 便宜但天花板低。2024 年后社区实际选择了后者为主、前者收窄到少数大实验室。

## 开放问题 / 观察触发器

- [ ] omni 模型与 agent/VLA 的接口：Qwen2.5-Omni 不输出 action，PaLM-E 式 action token 路线近年几乎沉寂——统一感知接口的下一步由谁接棒？（出现即 ingest）
- [ ] 音频/视频的时间建模（TMRoPE 式位置编码 + chunk 交错）会不会被某种统一 token 化方案吞并，还是成为长期稳定的工程件？
- [ ] 全离散 vs 混合之争有无第三方裁决：同一数据、同一算力下的严格对比是否出现？
- [ ] 实时双工语音交互缺公认 benchmark；初始包延迟之外的交互质量（打断、回合切换）如何评测？
- [ ] 精读回填：本页引用的 17 篇占位笔记按 Flamingo → VILA → Emu3/Transfusion → Qwen2.5-Omni 的优先级补 deep_read，逐篇回改本页论断。
