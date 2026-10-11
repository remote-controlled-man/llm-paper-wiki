# Wiki Index — 全库论文目录

> 本页由 LLM 维护：每次 ingest（新增/移动论文）后重新生成。
> 生成方式：扫描 `raw/` 文件系统 + 读取各 `<slug>.md` frontmatter，脚本与说明映射留档于 `tmp/restructure/`（`extract_metadata.py` + `build_wiki_index.py` + `index_glosses.json`）。
> 条目格式：`- [[raw/<slug>/<slug>|标题简称]] — 一句话说明；年份；status`。

共 **255** 个条目（254 篇论文 + 1 个 web 来源），按 `primary_area` 分 5 节：[[wiki/areas/Foundations|01_Foundations]]（18）；[[wiki/areas/Perception_and_CV|02_Perception_and_CV]]（62）；[[wiki/areas/Agents|03_Agents]]（119）；[[wiki/areas/Human_AI_Interaction|04_Human_AI_Interaction]]（18）；[[wiki/areas/Robotics_and_HRI|05_Robotics_and_HRI]]（37）。

## 01_Foundations（18 篇）

方向：底层模型、生成模型、表示学习、序列建模、优化、RL、Transformer 等。枢纽页：[[wiki/areas/Foundations|Foundations]]。

- [[raw/2014-06_GAN_1406.2661/2014-06_GAN_1406.2661|GAN]] — 生成对抗网络原始论文；2014；unread
- [[raw/2014-11_Conditional_GAN_1411.1784/2014-11_Conditional_GAN_1411.1784|Conditional GAN]] — 条件 GAN；2014；unread
- [[raw/Sequence_to_Sequence_Learning/Sequence_to_Sequence_Learning|Sequence to Sequence Learning]] — seq2seq 原始论文；2014；unread
- [[raw/2015-11_DCGAN_1511.06434/2015-11_DCGAN_1511.06434|DCGAN]] — 深度卷积 GAN 与无监督表征学习；2015；unread
- [[raw/Tutorial_on_Variational_Autoencoders/Tutorial_on_Variational_Autoencoders|Tutorial on VAEs]] — 变分自编码器教程；2016；unread
- [[raw/2017-03_CycleGAN_1703.10593/2017-03_CycleGAN_1703.10593|CycleGAN]] — 循环一致的非配对图像翻译；2017；unread
- [[raw/2017-03_UNIT_1703.00848/2017-03_UNIT_1703.00848|UNIT]] — 无监督图像翻译网络；2017；unread
- [[raw/2017-10_PGGAN_Progressive_Growing_of_GANs_1710.10196/2017-10_PGGAN_Progressive_Growing_of_GANs_1710.10196|PGGAN]] — 渐进式增长 GAN 提升质量与稳定性；2017；unread
- [[raw/2017-11_CyCADA_1711.03213/2017-11_CyCADA_1711.03213|CyCADA]] — 循环一致对抗域适应；2017；unread
- [[raw/StarGAN/StarGAN|StarGAN]] — 多域统一图像翻译 GAN；2017；unread
- [[raw/WassersteinGAN/WassersteinGAN|Wasserstein GAN]] — Wasserstein 距离稳定 GAN 训练；2017；unread
- [[raw/2018-05_SAGAN_1805.08318/2018-05_SAGAN_1805.08318|SAGAN]] — 自注意力 GAN；2018；unread
- [[raw/2018-09_BigGAN_1809.11096/2018-09_BigGAN_1809.11096|BigGAN]] — 大规模高保真 GAN 训练；2018；unread
- [[raw/2018-12_StyleGAN_1812.04948/2018-12_StyleGAN_1812.04948|StyleGAN]] — 基于风格的生成器架构；2018；unread
- [[raw/2019-12_StarGAN_v2_1912.01865/2019-12_StarGAN_v2_1912.01865|StarGAN v2]] — 多域多样化图像合成；2019；unread
- [[raw/U-GAT-IT/U-GAT-IT|U-GAT-IT]] — 注意力 + AdaLIN 的无监督图像翻译；2019；unread
- [[raw/2020-01_GAN_Review_Algorithms_Theory_Applications_2001.06937/2020-01_GAN_Review_Algorithms_Theory_Applications_2001.06937|GAN Review]] — GAN 算法、理论与应用综述；2020；unread
- [[raw/2020-11_Score_SDE_2011.13456/2020-11_Score_SDE_2011.13456|Score-Based SDE]] — 随机微分方程统一分数生成建模；2020；unread

## 02_Perception_and_CV（62 篇）

方向：视觉、人体动作、姿态、轨迹、图像质量、3D、多模态感知、数据集和评估。枢纽页：[[wiki/areas/Perception_and_CV|Perception_and_CV]]。

- [[raw/2011_ACMCS_Human_Activity_Analysis_Review/2011_ACMCS_Human_Activity_Analysis_Review|Human Activity Analysis: A Review]] — 人体活动分析综述（视觉方向总览）；2011；unread
- [[raw/2012_SPL_NIQE_Completely_Blind_IQA/2012_SPL_NIQE_Completely_Blind_IQA|NIQE]] — 完全无参考图像质量评价（NSS 特征）；2012；unread
- [[raw/2012_TIP_BRISQUE_No-Reference_IQA_Spatial_Domain/2012_TIP_BRISQUE_No-Reference_IQA_Spatial_Domain|BRISQUE]] — 空间域无参考图像质量评价；2012；unread
- [[raw/2014-06_Two-Stream_ConvNets_Action_Recognition_1406.2199/2014-06_Two-Stream_ConvNets_Action_Recognition_1406.2199|Two-Stream ConvNets]] — 双流卷积网络做视频动作识别；2014；unread
- [[raw/2015-06_ConvLSTM_Precipitation_Nowcasting_1506.04214/2015-06_ConvLSTM_Precipitation_Nowcasting_1506.04214|ConvLSTM]] — 卷积 LSTM 做降水临近预报（时空序列建模）；2015；unread
- [[raw/2015_ICCV_Learning_Spatiotemporal_Features_C3D/2015_ICCV_Learning_Spatiotemporal_Features_C3D|C3D]] — 3D 卷积学习时空特征；2015；unread
- [[raw/2015_NCVPRIPG_PIQE_Perception_Based_IQA/2015_NCVPRIPG_PIQE_Perception_Based_IQA|PIQE]] — 基于感知特征的盲图像质量评价；2015；unread
- [[raw/2016-05_Adversarial_Feature_Learning_1605.09782/2016-05_Adversarial_Feature_Learning_1605.09782|BiGAN]] — 对抗式特征学习；2016；unread
- [[raw/2016_ICNC-FSKD_Driver_Behavior_Recognition_DCNN/2016_ICNC-FSKD_Driver_Behavior_Recognition_DCNN|Driver Behavior Recognition (DCNN)]] — DCNN 驾驶员行为识别；2016；unread
- [[raw/2017-05_Quo_Vadis_Action_Recognition_Kinetics_1705.07750/2017-05_Quo_Vadis_Action_Recognition_Kinetics_1705.07750|Quo Vadis / I3D]] — I3D 模型与 Kinetics 数据集，动作识别新基线；2017；unread
- [[raw/2017-11_Non-local_Neural_Networks_1711.07971/2017-11_Non-local_Neural_Networks_1711.07971|Non-local Neural Networks]] — non-local 块建模长程依赖；2017；unread
- [[raw/2017_ICCV_RMPE_Regional_MultiPerson_Pose_Estimation/2017_ICCV_RMPE_Regional_MultiPerson_Pose_Estimation|RMPE]] — 区域多人姿态估计；2017；unread
- [[raw/2018-06_Human_Action_Recognition_Prediction_Survey_1806.11230/2018-06_Human_Action_Recognition_Prediction_Survey_1806.11230|Human Action Recognition and Prediction: A Survey]] — 人体动作识别与预测综述；2018；unread
- [[raw/2018-12_OpenPose_Realtime_MultiPerson_2D_Pose_1812.08008/2018-12_OpenPose_Realtime_MultiPerson_2D_Pose_1812.08008|OpenPose]] — 实时多人 2D 姿态估计（Part Affinity Fields）；2018；unread
- [[raw/2018_IEEE_Review_Human_Action_Recognition_Video/2018_IEEE_Review_Human_Action_Recognition_Video|A Review of Human Action Recognition in Video]] — 视频人体动作识别综述；2018；unread
- [[raw/2019-03_Quality-aware_Unpaired_I2I_Translation_1903.06399/2019-03_Quality-aware_Unpaired_I2I_Translation_1903.06399|Quality-aware Unpaired Image-to-Image Translation]] — 质量感知的非配对图像翻译；2019；unread
- [[raw/2019-05_Object_Detection_20_Years_Survey_1905.05055/2019-05_Object_Detection_20_Years_Survey_1905.05055|Object Detection in 20 Years: A Survey]] — 目标检测二十年综述；2019；unread
- [[raw/2019-08_Recent_Advances_DL_Object_Detection_1908.03673/2019-08_Recent_Advances_DL_Object_Detection_1908.03673|Recent Advances in Deep Learning for Object Detection]] — 深度学习目标检测进展综述；2019；unread
- [[raw/2019_TPAMI_Temporal_Segment_Networks/2019_TPAMI_Temporal_Segment_Networks|Temporal Segment Networks (TSN)]] — 时序分段网络做视频动作识别；2019；unread
- [[raw/2020-03_Invariant_Representation_Unsupervised_Image_Restoration_2003.12769/2020-03_Invariant_Representation_Unsupervised_Image_Restoration_2003.12769|Invariant Representation Image Restoration]] — 不变表征做无监督图像复原；2020；unread
- [[raw/2020-03_Transformer_Networks_Trajectory_Forecasting_2003.08111/2020-03_Transformer_Networks_Trajectory_Forecasting_2003.08111|Transformer Networks for Trajectory Forecasting]] — Transformer 做轨迹预测；2020；unread
- [[raw/2020-07_CUT_Contrastive_Unpaired_I2I_Translation_2007.15651/2020-07_CUT_Contrastive_Unpaired_I2I_Translation_2007.15651|CUT]] — 对比学习的非配对图像翻译；2020；unread
- [[raw/2020-12_Perception_Consistency_Ultrasound_SR_2012.14142/2020-12_Perception_Consistency_Ultrasound_SR_2012.14142|Perception-Consistency Ultrasound SR]] — 自监督 CycleGAN 超声图像超分；2020；unread
- [[raw/2021_CVPR_SDD-FIQA_Unsupervised_Face_IQA/2021_CVPR_SDD-FIQA_Unsupervised_Face_IQA|SDD-FIQA]] — 无监督人脸图像质量评价；2021；unread
- [[raw/2021_CVPR_SGCN_Sparse_Graph_Conv_Trajectory/2021_CVPR_SGCN_Sparse_Graph_Conv_Trajectory|SGCN]] — 稀疏图卷积行人轨迹预测；2021；unread
- [[raw/2021_RAL_BiTraP_Bidirectional_Trajectory_Prediction/2021_RAL_BiTraP_Bidirectional_Trajectory_Prediction|BiTraP]] — 双向行人轨迹预测与多模态目标估计；2021；unread
- [[raw/2021_TMI_SIC-GAN_Medical_Image_Enhancement/2021_TMI_SIC-GAN_Medical_Image_Enhancement|SIC-GAN]] — 结构与光照约束 GAN 医学图像增强；2021；unread
- [[raw/2022-03_UVCGAN_UNet_ViT_CycleGAN_2203.02557/2022-03_UVCGAN_UNet_ViT_CycleGAN_2203.02557|UVCGAN]] — UNet+ViT 混合的 CycleGAN 图像翻译；2022；unread
- [[raw/2022_Flamingo_Visual_Language_Model_FewShot_Learning/2022_Flamingo_Visual_Language_Model_FewShot_Learning|Flamingo]] — 交错图文 few-shot 视觉语言模型；2022；unread
- [[raw/2022_MTAP_Object_Detection_Review/2022_MTAP_Object_Detection_Review|Object Detection Review (MTAP)]] — 目标检测工具、数据集与应用综述；2022；unread
- [[raw/2023_CEA_DL_Object_Detection_Survey_ZhangYangting/2023_CEA_DL_Object_Detection_Survey_ZhangYangting|基于深度学习的目标检测算法研究与应用综述（张阳婷等）]] — 深度学习目标检测综述（中文）；2023；unread
- [[raw/2023_Emu2_Generative_Multimodal_Models_InContext_Learners/2023_Emu2_Generative_Multimodal_Models_InContext_Learners|Emu2]] — 生成式多模态模型的 in-context 学习；2023；unread
- [[raw/2023_JSJYXDH_Human_Action_Detection_Survey_ShenJiawei/2023_JSJYXDH_Human_Action_Detection_Survey_ShenJiawei|基于深度学习的人体行为检测方法研究综述（沈加炜等）]] — 深度学习人体行为检测综述（中文）；2023；unread
- [[raw/2023_Kosmos1_Multimodal_Large_Language_Model/2023_Kosmos1_Multimodal_Large_Language_Model|Kosmos-1]] — 感知与语言对齐的多模态 LLM；2023；unread
- [[raw/2023_OBELICS_Interleaved_Image_Text_Documents_Dataset/2023_OBELICS_Interleaved_Image_Text_Documents_Dataset|OBELICS]] — 开放网络规模交错图文数据集；2023；unread
- [[raw/2023_OpenFlamingo_Autoregressive_Vision_Language_Models/2023_OpenFlamingo_Autoregressive_Vision_Language_Models|OpenFlamingo]] — 开源自回归视觉语言模型框架；2023；unread
- [[raw/2023_VILA_Pretraining_Visual_Language_Models/2023_VILA_Pretraining_Visual_Language_Models|VILA]] — 视觉语言模型预训练方案研究；2023；unread
- [[raw/2024-10_DreamClear_Real-World_Image_Restoration_2410.18666/2024-10_DreamClear_Real-World_Image_Restoration_2410.18666|DreamClear]] — 真实世界图像复原与隐私安全数据集构建；2024；unread
- [[raw/2024_AnyGPT_Unified_Multimodal_LLM_Discrete_Sequence_Modeling/2024_AnyGPT_Unified_Multimodal_LLM_Discrete_Sequence_Modeling|AnyGPT]] — 离散 token 统一多模态序列建模；2024；unread
- [[raw/2024_COSMO_Interleaved_PreTraining/2024_COSMO_Interleaved_PreTraining|COSMO]] — 交错预训练的对比式多模态模型；2024；unread
- [[raw/2024_Chameleon_MixedModal_EarlyFusion_Foundation_Models/2024_Chameleon_MixedModal_EarlyFusion_Foundation_Models|Chameleon]] — 早融合 mixed-modal 基础模型；2024；unread
- [[raw/2024_Emu3_NextToken_Prediction_Multimodal/2024_Emu3_NextToken_Prediction_Multimodal|Emu3]] — 纯 next-token 预测统一多模态；2024；unread
- [[raw/2024_Full_Duplex_Speech_Dialogue_Scheme_LLMs/2024_Full_Duplex_Speech_Dialogue_Scheme_LLMs|Full-duplex Speech Dialogue Scheme]] — 基于 LLM 的全双工语音对话方案；2024；unread
- [[raw/2024_LLaVA_NeXT_Interleave_MultiImage_Video_3D/2024_LLaVA_NeXT_Interleave_MultiImage_Video_3D|LLaVA-NeXT-Interleave]] — 多图/视频/3D 交错 LMM；2024；unread
- [[raw/2024_MANTIS_Interleaved_MultiImage_Instruction_Tuning/2024_MANTIS_Interleaved_MultiImage_Instruction_Tuning|Mantis]] — 交错多图指令微调；2024；unread
- [[raw/2024_MM_Interleaved_Image_Text_Generative_Modeling/2024_MM_Interleaved_Image_Text_Generative_Modeling|MM-Interleaved]] — 特征同步器做交错图文生成建模；2024；unread
- [[raw/2024_Moshi_Speech_Text_Foundation_Model_RealTime_Dialogue/2024_Moshi_Speech_Text_Foundation_Model_RealTime_Dialogue|Moshi]] — 实时全双工对话的语音-文本基础模型；2024；foundation_read_done
- [[raw/2024_OmniCorpus_Image_Text_Interleaved_Corpus/2024_OmniCorpus_Image_Text_Interleaved_Corpus|OmniCorpus]] — 百亿级图文交错语料；2024；unread
- [[raw/2024_ShowO_Single_Transformer_Multimodal_Understanding_Generation/2024_ShowO_Single_Transformer_Multimodal_Understanding_Generation|Show-o]] — 单 Transformer 统一理解与生成；2024；unread
- [[raw/2024_Transfusion_NextToken_Diffuse_Images_Multimodal_Model/2024_Transfusion_NextToken_Diffuse_Images_Multimodal_Model|Transfusion]] — next-token + diffusion 的统一多模态模型；2024；unread
- [[raw/2025_MMDuet2_Proactive_Video_Question_Answering/2025_MMDuet2_Proactive_Video_Question_Answering|MMDuet2]] — 多轮 RL 增强视频 MLLM 主动交互；2025；unread
- [[raw/2025_ProactiveVideoQA_Response_Timing_Benchmark/2025_ProactiveVideoQA_Response_Timing_Benchmark|ProactiveVideoQA]] — 主动视频问答响应时机 benchmark；2025；unread
- [[raw/2025_Qwen2_5_Omni_Technical_Report/2025_Qwen2_5_Omni_Technical_Report|Qwen2.5-Omni]] — 全模态实时交互模型（Thinker-Talker 架构）；2025；deep_read
- [[raw/2025_StreamBridge_Proactive_Streaming_Assistant/2025_StreamBridge_Proactive_Streaming_Assistant|StreamBridge]] — 离线视频 LLM 改造为主动流式助手；2025；unread
- [[raw/2025_StreamingVLM_RealTime_Infinite_Video_Streams/2025_StreamingVLM_RealTime_Infinite_Video_Streams|StreamingVLM]] — 无限视频流的实时理解；2025；unread
- [[raw/2025_Streamo_Streaming_Video_Instruction_Tuning/2025_Streamo_Streaming_Video_Instruction_Tuning|Streamo]] — 流式视频指令微调；2025；unread
- [[raw/2026_AURA_Proactive_Audio_Visual_Interaction/2026_AURA_Proactive_Audio_Visual_Interaction|AURA]] — always-on 视频流主动助手；2026；deep_read
- [[raw/2026_DuplexSLA_Full_Duplex_Speech_Language_Action/2026_DuplexSLA_Full_Duplex_Speech_Language_Action|DuplexSLA]] — 全双工语音-语言-动作同步输出模型；2026；deep_read
- [[raw/2026_FlashLabs_Chroma_RealTime_Spoken_Dialogue_Voice_Cloning/2026_FlashLabs_Chroma_RealTime_Spoken_Dialogue_Voice_Cloning|FlashLabs Chroma 1.0]] — 实时端到端语音对话与个性化声音克隆；2026；unread
- [[raw/2026_Synchronization_Turn_Taking_Full_Duplex_Speech_Dialogue_Models/2026_Synchronization_Turn_Taking_Full_Duplex_Speech_Dialogue_Models|Sync & Turn-Taking in Full-Duplex Speech Models]] — 全双工对话 hidden states 中的同步与轮次线索；2026；deep_read_done
- [[raw/2021_NCNISA_DL_Human_Action_Recognition_Survey_LiGui/2021_NCNISA_DL_Human_Action_Recognition_Survey_LiGui|基于深度学习的人体行为识别研究综述（李贵）]] — 基于深度学习的人体行为识别综述（李贵等，年会论文集）；2021；unread
- [[raw/2022_ARA_Human_Action_Recognition_Methods_Survey/2022_ARA_Human_Action_Recognition_Methods_Survey|人体行为识别方法研究综述]] — 人体行为识别方法综述（梁绪等，计算机应用研究 39(3)）；2022；unread

## 03_Agents（119 篇）

方向：agent 架构、memory、planning、tool use、RAG、多智能体、多模态 agent、benchmark、安全。枢纽页：[[wiki/areas/Agents|Agents]]。

- [[raw/2023-03_Reflexion_Language_Agents_with_Verbal_Reinforcement_Learning_2303.11366/2023-03_Reflexion_Language_Agents_with_Verbal_Reinforcement_Learning_2303.11366|Reflexion]] — 语言化自我反思的 agent 强化学习；2023；unread
- [[raw/2023-04_Generative_Agents_Interactive_Simulacra_of_Human_Behavior_2304.03442/2023-04_Generative_Agents_Interactive_Simulacra_of_Human_Behavior_2304.03442|Generative Agents]] — 生成式 agent 模拟人类日常行为；2023；unread
- [[raw/2023-05_MemoryBank_Enhancing_LLMs_with_Long-Term_Memory_2305.10250/2023-05_MemoryBank_Enhancing_LLMs_with_Long-Term_Memory_2305.10250|MemoryBank]] — LLM 长期记忆库；2023；unread
- [[raw/2023-05_Voyager_An_Open-Ended_Embodied_Agent_with_Large_Language_Models_2305.16291/2023-05_Voyager_An_Open-Ended_Embodied_Agent_with_Large_Language_Models_2305.16291|Voyager]] — LLM 开放式具身 agent（Minecraft）；2023；unread
- [[raw/2023-06_LongMem_Augmenting_Language_Models_with_Retrieval_Memory_2306.07174/2023-06_LongMem_Augmenting_Language_Models_with_Retrieval_Memory_2306.07174|LongMem]] — 检索记忆增强长上下文；2023；unread
- [[raw/2023-07_ChatDev_2307.07924/2023-07_ChatDev_2307.07924|ChatDev]] — 多 agent 软件开发流程；2023；unread
- [[raw/2023-07_WebArena_2307.13854/2023-07_WebArena_2307.13854|WebArena]] — 真实 web 环境 agent benchmark；2023；unread
- [[raw/2023-08_AgentBench_2308.03688/2023-08_AgentBench_2308.03688|AgentBench]] — 通用 LLM-as-agent benchmark；2023；unread
- [[raw/2023-08_AutoGen_AutoGenBench_2308.08155/2023-08_AutoGen_AutoGenBench_2308.08155|AutoGen / AutoGenBench]] — 多 agent 对话框架及评测；2023；unread
- [[raw/2023-08_MetaGPT_2308.00352/2023-08_MetaGPT_2308.00352|MetaGPT]] — SOP 驱动的多 agent 协作框架；2023；unread
- [[raw/2023-09_AutoAgents_2309.17288/2023-09_AutoAgents_2309.17288|AutoAgents]] — 自动生成 specialized agents 并协作；2023；unread
- [[raw/2023-10_MemGPT_Towards_LLMs_as_Operating_Systems_2310.08560/2023-10_MemGPT_Towards_LLMs_as_Operating_Systems_2310.08560|MemGPT]] — 操作系统式的 LLM 上下文与记忆管理；2023；unread
- [[raw/2023-10_SWE_bench_2310.06770/2023-10_SWE_bench_2310.06770|SWE-bench]] — 真实 GitHub issue 修复 benchmark；2023；unread
- [[raw/2024-01_VisualWebArena_2401.13649/2024-01_VisualWebArena_2401.13649|VisualWebArena]] — 多模态 web agent benchmark；2024；unread
- [[raw/2024-01_WebVoyager_2401.13919/2024-01_WebVoyager_2401.13919|WebVoyager]] — 真实网站端到端 web agent；2024；unread
- [[raw/2024-02_Large_Multimodal_Agents_Survey_2402.15116/2024-02_Large_Multimodal_Agents_Survey_2402.15116|Large Multimodal Agents: A Survey]] — 大型多模态 agent 综述；2024；unread
- [[raw/2024-02_OmniACT_2402.17553/2024-02_OmniACT_2402.17553|OmniACT]] — 桌面/网页多模态操作 benchmark；2024；unread
- [[raw/2024-03_InjecAgent_2403.02691/2024-03_InjecAgent_2403.02691|InjecAgent]] — 工具型 agent 间接 prompt injection benchmark；2024；unread
- [[raw/2024-03_WorkArena_BrowserGym_2403.07718/2024-03_WorkArena_BrowserGym_2403.07718|WorkArena / BrowserGym]] — 企业知识工作 web 任务与 BrowserGym 环境；2024；unread
- [[raw/2024-04_OSWorld_2404.07972/2024-04_OSWorld_2404.07972|OSWorld]] — 真实桌面环境 computer-use benchmark；2024；unread
- [[raw/2024-04_Survey_Memory_Mechanism_LLM_Agents_2404.13501/2024-04_Survey_Memory_Mechanism_LLM_Agents_2404.13501|Memory Mechanism of LLM Agents (Survey)]] — LLM agent 记忆机制综述；2024；unread
- [[raw/2024-05_SWE_agent_2405.15793/2024-05_SWE_agent_2405.15793|SWE-agent]] — agent-computer interface 的经典 SWE 系统；2024；unread
- [[raw/2024-06_AgentDojo_2406.13352/2024-06_AgentDojo_2406.13352|AgentDojo]] — prompt injection 攻防动态环境；2024；unread
- [[raw/2024-06_tau_bench_2406.12045/2024-06_tau_bench_2406.12045|τ-bench]] — tool-agent-user 交互 benchmark（pass^k 可靠性）；2024；deep_read
- [[raw/2024-07_Agentless_2407.01489/2024-07_Agentless_2407.01489|Agentless]] — 三阶段非交互 SWE 修复 baseline；2024；unread
- [[raw/2024-07_AppWorld_2407.18901/2024-07_AppWorld_2407.18901|AppWorld]] — 9 app / 457 API 的可执行 agent 环境；2024；unread
- [[raw/2024-07_OpenHands_2407.16741/2024-07_OpenHands_2407.16741|OpenHands]] — 开源软件开发 agent 平台；2024；unread
- [[raw/2024-08_AutoGen_Studio_2408.15247/2024-08_AutoGen_Studio_2408.15247|AutoGen Studio]] — 多 agent workflow 的 no-code 原型工具；2024；unread
- [[raw/2024-08_ToolSandbox_2408.04682/2024-08_ToolSandbox_2408.04682|ToolSandbox]] — stateful 对话式工具使用 benchmark；2024；unread
- [[raw/2024-09_Windows_Agent_Arena_2409.08264/2024-09_Windows_Agent_Arena_2409.08264|Windows Agent Arena]] — Windows 真实 OS agent 基准；2024；unread
- [[raw/2024-10_Agent_Security_Bench_2410.02644/2024-10_Agent_Security_Bench_2410.02644|Agent Security Bench]] — agent 攻防系统化 benchmark；2024；unread
- [[raw/2024-10_LightRAG_2410.05779/2024-10_LightRAG_2410.05779|LightRAG]] — 轻量快速 RAG；2024；unread
- [[raw/2024-10_SWE_bench_Multimodal_2410.03859/2024-10_SWE_bench_Multimodal_2410.03859|SWE-bench Multimodal]] — 多模态版 SWE-bench；2024；unread
- [[raw/2024-10_VideoWebArena_2410.19100/2024-10_VideoWebArena_2410.19100|VideoWebArena]] — 视频教程长上下文 web agent benchmark；2024；unread
- [[raw/2024-11_Magentic_One_2411.04468/2024-11_Magentic_One_2411.04468|Magentic-One]] — 微软 generalist 多 agent 系统；2024；unread
- [[raw/2024-12_Agent_SafetyBench_2412.14470/2024-12_Agent_SafetyBench_2412.14470|Agent-SafetyBench]] — 多环境 agent 安全 benchmark；2024；unread
- [[raw/2024-12_SWE_Gym_2412.21139/2024-12_SWE_Gym_2412.21139|SWE-Gym]] — 真实 SWE agent 训练环境；2024；unread
- [[raw/2025-01_SWE_Fixer_2501.05040/2025-01_SWE_Fixer_2501.05040|SWE-Fixer]] — 开源模型做 issue 修复（检索+编辑模块）；2025；unread
- [[raw/2025-01_Zep_2501.13956/2025-01_Zep_2501.13956|Zep]] — 时序知识图谱 agent 记忆层；2025；unread
- [[raw/2025-02_MAPoRL_2502.18439/2025-02_MAPoRL_2502.18439|MAPoRL]] — 多 agent post-co-training（verifier reward）；2025；unread
- [[raw/2025-02_SWE_RL_2502.18449/2025-02_SWE_RL_2502.18449|SWE-RL]] — 用软件演化数据做 SWE 强化学习；2025；unread
- [[raw/2025-03_AgentSpec_2503.18666/2025-03_AgentSpec_2503.18666|AgentSpec]] — DSL 运行时约束阻止 agent 不安全动作；2025；unread
- [[raw/2025-03_MemInsight_Autonomous_Memory_Augmentation_for_LLM_Agents_2503.21760/2025-03_MemInsight_Autonomous_Memory_Augmentation_for_LLM_Agents_2503.21760|MemInsight]] — 自主记忆增强；2025；unread
- [[raw/2025-03_MultiAgentBench_2503.01935/2025-03_MultiAgentBench_2503.01935|MultiAgentBench]] — 多智能体协作/竞争 benchmark；2025；unread
- [[raw/2025-03_SalesRLAgent_RealTime_Sales_Conversion_Prediction_2503.23303/2025-03_SalesRLAgent_RealTime_Sales_Conversion_Prediction_2503.23303|SalesRLAgent]] — RL 做实时转化率预测（Jev 撞车争议的自发布先行工作，质量存疑）；2025；unread
- [[raw/2025-03_Search_R1_2503.09516/2025-03_Search_R1_2503.09516|Search-R1]] — 搜索引擎纳入多轮 RL 推理；2025；deep_read
- [[raw/2025-03_Why_Do_Multi_Agent_LLM_Systems_Fail_2503.13657/2025-03_Why_Do_Multi_Agent_LLM_Systems_Fail_2503.13657|Why Do Multi-Agent LLM Systems Fail?]] — 多 agent 系统 14 类失败模式；2025；unread
- [[raw/2025-04_MCP_Safety_Audit_2504.03767/2025-04_MCP_Safety_Audit_2504.03767|MCP Safety Audit]] — MCP server 安全风险审计工具；2025；unread
- [[raw/2025-04_Mem0_2504.19413/2025-04_Mem0_2504.19413|Mem0]] — 工程化长期记忆层；2025；unread
- [[raw/2025-04_Multi_SWE_bench_2504.02605/2025-04_Multi_SWE_bench_2504.02605|Multi-SWE-bench]] — 多语言 issue 修复 benchmark；2025；unread
- [[raw/2025-04_R2E_Gym_AgentGym_2504.07164/2025-04_R2E_Gym_AgentGym_2504.07164|R2E-Gym / AgentGym]] — 程序化生成 SWE 环境与 hybrid verifier；2025；unread
- [[raw/2025-04_RAGEN_2504.20073/2025-04_RAGEN_2504.20073|RAGEN]] — 多轮 agent RL 训练病灶诊断（StarPO）；2025；deep_read
- [[raw/2025-04_SWE_smith_2504.21798/2025-04_SWE_smith_2504.21798|SWE-smith]] — 大规模合成 SWE 训练任务与轨迹；2025；unread
- [[raw/2025-05_LLM_Based_Human_Agent_Systems_Survey_2505.00753/2025-05_LLM_Based_Human_Agent_Systems_Survey_2505.00753|Human-Agent Collaboration Systems Survey]] — LLM 人-agent 协作交互系统综述；2025；unread
- [[raw/2025-05_MemOS_2505.22101/2025-05_MemOS_2505.22101|MemOS]] — 记忆作为 LLM 系统资源（MemCube）；2025；unread
- [[raw/2025-05_WebAgent_R1_2505.16421/2025-05_WebAgent_R1_2505.16421|WebAgent-R1]] — WebArena-Lite 上的端到端在线 RL；2025；unread
- [[raw/2025-05_WorkForceAgent_R1_2505.22942/2025-05_WorkForceAgent_R1_2505.22942|WorkForceAgent-R1]] — R1 式 reward 改善 web 导航；2025；unread
- [[raw/2025-06_Agent_RLVR_2506.11425/2025-06_Agent_RLVR_2506.11425|Agent-RLVR]] — guidance + 环境 reward 训练 coding agent；2025；unread
- [[raw/2025-06_MEM1_Learning_to_Synergize_Memory_and_Reasoning_2506.15841/2025-06_MEM1_Learning_to_Synergize_Memory_and_Reasoning_2506.15841|MEM1]] — 记忆与推理协同的长程 agent；2025；unread
- [[raw/2025-06_MemBench_2506.21605/2025-06_MemBench_2506.21605|MemBench]] — 事实/反思记忆综合评测；2025；unread
- [[raw/2025-06_tau2_Bench_2506.07982/2025-06_tau2_Bench_2506.07982|tau2-Bench]] — 用户与 agent 双控共享状态的 benchmark；2025；unread
- [[raw/2025-07_ARPO_2507.19849/2025-07_ARPO_2507.19849|ARPO]] — entropy 自适应 rollout 的 agentic RL；2025；deep_read
- [[raw/2025-07_Hierarchical_Memory_for_Long_Term_Reasoning_in_LLM_Agents_2507.22925/2025-07_Hierarchical_Memory_for_Long_Term_Reasoning_in_LLM_Agents_2507.22925|Hierarchical Memory]] — 层级记忆支撑长程推理；2025；unread
- [[raw/2025-07_OpenAgentSafety_2507.06134/2025-07_OpenAgentSafety_2507.06134|OpenAgentSafety]] — 真实工具环境多轮 agent 安全风险评测；2025；unread
- [[raw/2025-08_Agent_Lightning_2508.03680/2025-08_Agent_Lightning_2508.03680|Agent Lightning]] — 解耦 agent runtime 与 RL 训练；2025；deep_read
- [[raw/2025-08_ComputerRL_2508.14040/2025-08_ComputerRL_2508.14040|ComputerRL]] — GUI/OS agent 在线 RL；2025；unread
- [[raw/2025-08_M3-Agent_Seeing_Listening_Remembering_and_Reasoning_2508.09736/2025-08_M3-Agent_Seeing_Listening_Remembering_and_Reasoning_2508.09736|M3-Agent]] — 看/听/记/推理的多模态记忆 agent；2025；unread
- [[raw/2025-08_MAGRPO_2508.04652/2025-08_MAGRPO_2508.04652|MAGRPO]] — 多 agent 协作建模为 cooperative MARL；2025；unread
- [[raw/2025-08_MCPSecBench_2508.13220/2025-08_MCPSecBench_2508.13220|MCPSecBench]] — MCP 多类攻击系统化 benchmark；2025；unread
- [[raw/2025-08_MCPTox_2508.14925/2025-08_MCPTox_2508.14925|MCPTox]] — 真实 MCP server 工具投毒 benchmark；2025；unread
- [[raw/2025-08_MCP_Bench_2508.20453/2025-08_MCP_Bench_2508.20453|MCP-Bench]] — 真实 MCP server 多步工具使用评测；2025；unread
- [[raw/2025-08_MUA_RL_2508.18669/2025-08_MUA_RL_2508.18669|MUA-RL]] — LLM 模拟用户进 GRPO rollout 的工具使用训练；2025；deep_read
- [[raw/2025-09_Confidence_Aware_Routing_LLM_Hallucination_Mitigation_2510.01237/2025-09_Confidence_Aware_Routing_LLM_Hallucination_Mitigation_2510.01237|Confidence-Aware Routing]] — 生成前置信度评估与四级路由防幻觉（Jev 同线方向）；2025；unread
- [[raw/2025-09_IFEval_FC_2509.18420/2025-09_IFEval_FC_2509.18420|IFEval-FC]] — 函数调用的指令遵循评测；2025；unread
- [[raw/2025-09_SWE_Bench_Pro_2509.16941/2025-09_SWE_Bench_Pro_2509.16941|SWE-Bench Pro]] — 企业级长程 SWE benchmark；2025；unread
- [[raw/2025-10_AgentRL_2510.04206/2025-10_AgentRL_2510.04206|AgentRL]] — 异步多轮多任务 agentic RL 框架；2025；deep_read
- [[raw/2025-10_Context_Engineering_2.0_2510.26493/2025-10_Context_Engineering_2.0_2510.26493|Context Engineering 2.0]] — 上下文工程综述与框架；2025；unread
- [[raw/2025-10_MCP_Security_Bench_MSB_2510.15994/2025-10_MCP_Security_Bench_MSB_2510.15994|MCP Security Bench (MSB)]] — MCP 全链路攻击鲁棒性评测；2025；unread
- [[raw/2025-11_Evo_Memory_2511.20857/2025-11_Evo_Memory_2511.20857|Evo-Memory]] — test-time 自演化记忆 benchmark 与框架；2025；unread
- [[raw/2025-11_SkyRL_Agent_2511.16108/2025-11_SkyRL_Agent_2511.16108|SkyRL-Agent]] — 高效多轮 agent RL 框架（训练 SWE agent）；2025；unread
- [[raw/2025-12_MCPAgentBench_2512.24565/2025-12_MCPAgentBench_2512.24565|MCPAgentBench]] — 真实 MCP tool 定义的 agent benchmark；2025；unread
- [[raw/2025-12_Memory_in_the_Age_of_AI_Agents_2512.13564/2025-12_Memory_in_the_Age_of_AI_Agents_2512.13564|Memory in the Age of AI Agents]] — AI agent 时代的记忆综述；2025；unread
- [[raw/2025-12_Self_play_SWE_RL_2512.18552/2025-12_Self_play_SWE_RL_2512.18552|Self-play SWE-RL]] — 自注入 bug 再修复的自博弈 RL；2025；unread
- [[raw/2025_SpringerVisualIntelligence_Large_Multimodal_Agents_Survey/2025_SpringerVisualIntelligence_Large_Multimodal_Agents_Survey|Large Multimodal Agents Survey (Springer VI)]] — 大型多模态 agent 综述（期刊版）；2025；unread
- [[raw/2026-01_Agentic_Memory_Learning_Unified_Long_Term_and_Short_Term_Memory_2601.01885/2026-01_Agentic_Memory_Learning_Unified_Long_Term_and_Short_Term_Memory_2601.01885|Agentic Memory]] — 统一长短期记忆管理的学习；2026；unread
- [[raw/2026-01_DynaWeb_2601.22149/2026-01_DynaWeb_2601.22149|DynaWeb]] — world model 降低 web agent 在线交互成本；2026；unread
- [[raw/2026-02_AgentDyn_2602.03117/2026-02_AgentDyn_2602.03117|AgentDyn]] — 动态开放式 prompt injection benchmark；2026；unread
- [[raw/2026-02_AgentLeak_2602.11510/2026-02_AgentLeak_2602.11510|AgentLeak]] — 多 agent 系统隐私泄露 benchmark；2026；unread
- [[raw/2026-02_AgentSentry_2602.22724/2026-02_AgentSentry_2602.22724|AgentSentry]] — 时序因果诊断缓解间接 prompt injection；2026；unread
- [[raw/2026-02_Agent_Diff_2602.11224/2026-02_Agent_Diff_2602.11224|Agent-Diff]] — 企业 API agent 的 state-diff 评测 benchmark；2026；deep_read
- [[raw/2026-02_Hybrid_Gym_2602.16819/2026-02_Hybrid_Gym_2602.16819|Hybrid-Gym]] — 训练可迁移 coding 技能的合成环境；2026；unread
- [[raw/2026-02_OpAgent_2602.13559/2026-02_OpAgent_2602.13559|OpAgent]] — web 导航在线 RL（WebJudge + 规则树）；2026；unread
- [[raw/2026-02_SWE_Bench_Mobile_2602.09540/2026-02_SWE_Bench_Mobile_2602.09540|SWE-Bench Mobile]] — 工业级 iOS 开发 benchmark；2026；unread
- [[raw/2026-03_MP_Bench_2603.25001/2026-03_MP_Bench_2603.25001|MP-Bench]] — 多视角失败归因 benchmark；2026；unread
- [[raw/2026-03_Memory_for_Autonomous_LLM_Agents_2603.07670/2026-03_Memory_for_Autonomous_LLM_Agents_2603.07670|Memory for Autonomous LLM Agents]] — 自主 agent 记忆综述；2026；unread
- [[raw/2026-03_MiRA_Subgoal_Web_Agent_2603.19685/2026-03_MiRA_Subgoal_Web_Agent_2603.19685|MiRA / Subgoal Web Agent]] — 里程碑稠密 reward 的 web agent；2026；unread
- [[raw/2026-03_SWE_Skills_Bench_2603.15401/2026-03_SWE_Skills_Bench_2603.15401|SWE-Skills-Bench]] — agent skill 有效性评测；2026；unread
- [[raw/2026-04_Full_Duplex_Bench_v3_2604.04847/2026-04_Full_Duplex_Bench_v3_2604.04847|Full-Duplex-Bench-v3]] — 全双工语音 agent 工具使用 benchmark；2026；guided_read_done
- [[raw/2026-04_MCPSHIELD_2604.05969/2026-04_MCPSHIELD_2604.05969|MCPSHIELD]] — MCP 威胁分类与纵深防御架构；2026；unread
- [[raw/2026-05_ComplexMCP_2605.10787/2026-05_ComplexMCP_2605.10787|ComplexMCP]] — 大规模相互依赖 MCP 工具沙盒；2026；unread
- [[raw/2026-05_EvoMemBench_2605.18421/2026-05_EvoMemBench_2605.18421|EvoMemBench]] — self-evolving 视角的 agent 记忆 benchmark；2026；unread
- [[raw/2026-05_EvolveMem_2605.13941/2026-05_EvolveMem_2605.13941|EvolveMem]] — 记忆检索机制自演化；2026；unread
- [[raw/2026-05_LLM_Agents_Already_Know_When_to_Call_Tools_2605.09252/2026-05_LLM_Agents_Already_Know_When_to_Call_Tools_2605.09252|LLM Agents Already Know When to Call Tools]] — 无需显式推理模型已知何时调工具；2026；unread
- [[raw/2026-05_MemGym_2605.20833/2026-05_MemGym_2605.20833|MemGym]] — agentic 环境中的记忆评测；2026；unread
- [[raw/2026-05_Overeager_Coding_Agents_2605.18583/2026-05_Overeager_Coding_Agents_2605.18583|Overeager Coding Agents]] — 良性任务上 agent 越界操作的度量；2026；unread
- [[raw/2026-05_Polar_2605.24220/2026-05_Polar_2605.24220|Polar]] — 黑盒 harness 边界的 token 级轨迹重建；2026；deep_read
- [[raw/2026-05_Reward_Hacking_Benchmark_2605.02964/2026-05_Reward_Hacking_Benchmark_2605.02964|Reward Hacking Benchmark]] — 工具使用 agent 的 reward hacking 测量；2026；skimmed
- [[raw/2026-06_AgentJet_2606.04484/2026-06_AgentJet_2606.04484|AgentJet]] — swarm 式 agentic RL 训练框架；2026；deep_read
- [[raw/2026-06_Agent_Memory_Characterization_and_System_Implications_2606.06448/2026-06_Agent_Memory_Characterization_and_System_Implications_2606.06448|Agent Memory: Characterization]] — agent 记忆的特征分析与系统启示；2026；unread
- [[raw/2026-06_CacheRL_2606.14179/2026-06_CacheRL_2606.14179|CacheRL]] — 缓存 rollout 的低成本多轮工具调用 RL；2026；deep_read
- [[raw/2026-06_ContextRL_2606.17053/2026-06_ContextRL_2606.17053|ContextRL]] — 对比式上下文选择辅助目标的 RL；2026；deep_read
- [[raw/2026-06_False_Success_in_LLM_Agents_2606.09863/2026-06_False_Success_in_LLM_Agents_2606.09863|False Success in LLM Agents]] — agent 假成功现象刻画；2026；skimmed
- [[raw/2026-06_Gradient_Regularization_Prevents_Reward_Hacking_2606.10086/2026-06_Gradient_Regularization_Prevents_Reward_Hacking_2606.10086|Gradient Regularization Prevents Reward Hacking]] — 梯度正则防 reward hacking；2026；unread
- [[raw/2026-06_Open_SWE_Traces_2606.16038/2026-06_Open_SWE_Traces_2606.16038|Open-SWE-Traces]] — 207k 多语言 SWE agent 轨迹；2026；unread
- [[raw/2026-06_Reward_Hacking_in_Language_Model_Agents_2606.15385/2026-06_Reward_Hacking_in_Language_Model_Agents_2606.15385|Reward Hacking in LM Agents]] — 文本版 safety gridworlds：观测 reward vs 隐含安全 reward；2026；skimmed
- [[raw/2026-06_SENTINEL_2606.12908/2026-06_SENTINEL_2606.12908|SENTINEL]] — 失败轨迹驱动任务生成的 RL；2026；deep_read
- [[raw/2026-06_SecureClaw_2606.09549/2026-06_SecureClaw_2606.09549|SecureClaw]] — 读写双边界防护的 agent 安全框架；2026；unread
- [[raw/2026-06_T1_Bench_2606.11070/2026-06_T1_Bench_2606.11070|T1-Bench]] — 25 域真实客户交互 benchmark；2026；unread
- [[raw/2026_Preprint_Reinforcing_Agents_Collective_Skills/2026_Preprint_Reinforcing_Agents_Collective_Skills|Reinforcing Agents with Collective Skills]] — Skill2Env 将公开 Agent Skills 编译为可验证的 agentic RL 环境；2026；skimmed

## 04_Human_AI_Interaction（18 篇）

方向：interaction model、grounding、harness、控制权、确认机制、透明度、信任、隐私、用户研究。枢纽页：[[wiki/areas/Human_AI_Interaction|Human_AI_Interaction]]。

- [[raw/2026_CHI_Characterizing_Unintended_Consequences_GUI_Agents_Web_Browsing/2026_CHI_Characterizing_Unintended_Consequences_GUI_Agents_Web_Browsing|Unintended Consequences of GUI Agents]] — 人-GUI agent 协作中的意外后果；2025；unread
- [[raw/2026_CHI_Prototyping_Multimodal_GenAI_RealTime_Agents/2026_CHI_Prototyping_Multimodal_GenAI_RealTime_Agents|Prototyping Multimodal GenAI Real-Time Agents]] — 回放+Wizard-of-Oz 原型化实时多模态 agent；2025；intensive_reading
- [[raw/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR|AgentHands]] — XR 中手势空间锚定的 agent 对话；2026；精读中
- [[raw/2026_CHI_Agentic_Audio_Moderator_Usability_Testing/2026_CHI_Agentic_Audio_Moderator_Usability_Testing|Agentic Audio Moderator]] — 语音 agent 主持可用性测试（RCT）；2026；intensive_reading_done
- [[raw/2026_CHI_Beyond_Static_Instruction_AR_Robot_Training/2026_CHI_Beyond_Static_Instruction_AR_Robot_Training|Beyond Static Instruction]] — 多 agent 自适应 AR 机器人训练框架；2026；passed_application_layer_reference
- [[raw/2026_CHI_Decision_Theoretic_Assistive_Interfaces/2026_CHI_Decision_Theoretic_Assistive_Interfaces|Decision-Theoretic Assistive Interfaces]] — 辅助界面的决策论表示；2026；deep_read
- [[raw/2026_CHI_HiSync_Long_Range_HRI_Command_Source_Identification/2026_CHI_HiSync_Long_Range_HRI_Command_Source_Identification|HiSync]] — IMU+车载相机时空对齐识别远程 HRI 指令源；2026；unread
- [[raw/2026_CHI_How_Humans_Naturally_Refer_To_Targets_HRI/2026_CHI_How_Humans_Naturally_Refer_To_Targets_HRI|How Humans Naturally Refer to Targets]] — 人类自然指称目标的多模态模式（HRI）；2026；intensive_reading_done
- [[raw/2026_CHI_Human_Pragmatic_Language_To_CA_Design_Review/2026_CHI_Human_Pragmatic_Language_To_CA_Design_Review|Human Pragmatic Language → CA Design]] — 语用学到对话 agent 设计的迁移综述；2026；unread
- [[raw/2026_CHI_Interaction_Augmented_Instruction/2026_CHI_Interaction_Augmented_Instruction|Interaction-Augmented Instruction]] — prompt×交互协同的概念框架；2026；精读中
- [[raw/2026_CHI_LLM_Guide_VR_Accessibility_BLV/2026_CHI_LLM_Guide_VR_Accessibility_BLV|LLM Guide for VR Accessibility (BLV)]] — LLM 导览帮助视障用户使用 VR；2026；unread
- [[raw/2026_CHI_PointAloud_Pointer_Centric_Think_Aloud/2026_CHI_PointAloud_Pointer_Centric_Think_Aloud|PointAloud]] — 指针中心 think-aloud 交互套件；2026；unread
- [[raw/2026_CHI_Proactive_GenAI_Agent_Roles_Collaborative_Problem_Solving/2026_CHI_Proactive_GenAI_Agent_Roles_Collaborative_Problem_Solving|Proactive GenAI Agent Roles]] — 主动式 GenAI 角色在时效协作任务中的影响；2026；unread
- [[raw/2026_CHI_Proactive_Proxies_VR_Bystander_Interruptions/2026_CHI_Proactive_Proxies_VR_Bystander_Interruptions|Proactive Proxies (VR Bystander)]] — 主动代理调解 VR 旁观者打断；2026；unread
- [[raw/2026_CHI_Sensemaking_Multi_Agent_LLM_Interfaces/2026_CHI_Sensemaking_Multi_Agent_LLM_Interfaces|Sensemaking in Multi-Agent LLM Interfaces]] — 多 agent 界面中透明度/可信度线索的解读；2026；unread
- [[raw/2026_CHI_What_Are_You_Doing_Intermediate_Feedback_Agentic_In_Car_Assistants/2026_CHI_What_Are_You_Doing_Intermediate_Feedback_Agentic_In_Car_Assistants|What Are You Doing? (In-Car Agent)]] — 车载 agentic 助手中间反馈的效果；2026；read
- [[raw/2026_CHI_When_Should_Users_Check_Confirmation_Frequency/2026_CHI_When_Should_Users_Check_Confirmation_Frequency|When Should Users Check?]] — 多步 agentic 任务的确认频率建模；2026；deep_read
- [[raw/2026_CHI_Who_Controls_The_Conversation_System_Prompts/2026_CHI_Who_Controls_The_Conversation_System_Prompts|Who Controls the Conversation?]] — 用户对 system prompt 控制权的看法；2026；unread

## 05_Robotics_and_HRI（37 篇）

方向：机器人行为表达、HRI、具身交互、长期陪伴、真实部署、安全伦理。枢纽页：[[wiki/areas/Robotics_and_HRI|Robotics_and_HRI]]。

- [[raw/2013_Social_Robots_for_Long_Term_Interaction_Survey/2013_Social_Robots_for_Long_Term_Interaction_Survey|Social Robots for Long-Term Interaction: A Survey]] — 长期交互社交机器人综述；2013；unread
- [[raw/2022_Code_As_Policies_Language_Model_Programs_Embodied_Control/2022_Code_As_Policies_Language_Model_Programs_Embodied_Control|Code as Policies]] — LLM 生成代码策略做具身控制；2022；unread
- [[raw/2022_RT1_Robotics_Transformer_RealWorld_Control_Scale/2022_RT1_Robotics_Transformer_RealWorld_Control_Scale|RT-1]] — 真实世界规模化的机器人 Transformer；2022；unread
- [[raw/2022_SayCan_Grounding_Language_Robotic_Affordances/2022_SayCan_Grounding_Language_Robotic_Affordances|SayCan]] — 语言指令落地到机器人可供性；2022；unread
- [[raw/2022_VIMA_General_Robot_Manipulation_Multimodal_Prompts/2022_VIMA_General_Robot_Manipulation_Multimodal_Prompts|VIMA]] — 多模态 prompt 的通用机器人操作；2022；unread
- [[raw/2023_CHI_How_To_Communicate_Robot_Motion_Intent_Scoping_Review/2023_CHI_How_To_Communicate_Robot_Motion_Intent_Scoping_Review|How to Communicate Robot Motion Intent]] — 机器人运动意图传达方式综述；2023；read
- [[raw/2023_Diffusion_Policy_Visuomotor_Policy_Learning/2023_Diffusion_Policy_Visuomotor_Policy_Learning|Diffusion Policy]] — 动作扩散的视觉运动策略学习；2023；unread
- [[raw/2023_Open_X_Embodiment_RT_X_Models/2023_Open_X_Embodiment_RT_X_Models|Open X-Embodiment / RT-X]] — 跨机器人数据集与 RT-X 模型；2023；unread
- [[raw/2023_PaLM_E_Embodied_Multimodal_Language_Model/2023_PaLM_E_Embodied_Multimodal_Language_Model|PaLM-E]] — 具身多模态语言模型；2023；unread
- [[raw/2023_RT2_Vision_Language_Action_Models_Robotic_Control/2023_RT2_Vision_Language_Action_Models_Robotic_Control|RT-2]] — VLA 把 web 知识迁移到机器人控制；2023；unread
- [[raw/2023_VoxPoser_3D_Value_Maps_Robot_Manipulation/2023_VoxPoser_3D_Value_Maps_Robot_Manipulation|VoxPoser]] — LLM 组合 3D value map 做机器人操作；2023；unread
- [[raw/2024_DROID_LargeScale_InTheWild_Robot_Manipulation_Dataset/2024_DROID_LargeScale_InTheWild_Robot_Manipulation_Dataset|DROID]] — 大规模野外机器人操作数据集；2024；unread
- [[raw/2024_Octo_OpenSource_Generalist_Robot_Policy/2024_Octo_OpenSource_Generalist_Robot_Policy|Octo]] — 开源通用机器人策略；2024；unread
- [[raw/2024_OpenVLA_OpenSource_Vision_Language_Action_Model/2024_OpenVLA_OpenSource_Vision_Language_Action_Model|OpenVLA]] — 开源视觉-语言-动作模型；2024；unread
- [[raw/2024_RDT1B_Diffusion_Foundation_Model_Bimanual_Manipulation/2024_RDT1B_Diffusion_Foundation_Model_Bimanual_Manipulation|RDT-1B]] — 双臂操作扩散基础模型；2024；unread
- [[raw/2024_pi0_Vision_Language_Action_Flow_Model_General_Robot_Control/2024_pi0_Vision_Language_Action_Flow_Model_General_Robot_Control|π0]] — flow-based VLA 通用机器人控制；2024；unread
- [[raw/2025_GR00T_N1_Open_Foundation_Model_Generalist_Humanoid_Robots/2025_GR00T_N1_Open_Foundation_Model_Generalist_Humanoid_Robots|GR00T N1]] — 通用人形机器人基础模型；2025；unread
- [[raw/2025_Long_Term_Interactions_With_Social_Robots_Review/2025_Long_Term_Interactions_With_Social_Robots_Review|Long-Term Interactions with Social Robots]] — 社交机器人长期交互趋势综述；2025；unread
- [[raw/2025_pi0_5_VLA_OpenWorld_Generalization/2025_pi0_5_VLA_OpenWorld_Generalization|π0.5]] — 开放世界泛化的 VLA；2025；unread
- [[raw/2026_CHI_A_Conditional_Companion_LLMs_Mental_Health/2026_CHI_A_Conditional_Companion_LLMs_Mental_Health|A Conditional Companion]] — 精神障碍人群使用 LLM 陪伴的经验研究；2026；unread
- [[raw/2026_CHI_Calls_Of_Care_Dementia_Conversational_Agents/2026_CHI_Calls_Of_Care_Dementia_Conversational_Agents|Calls of Care]] — 痴呆照护中的对话 agent；2026；unread
- [[raw/2026_CHI_Conversing_with_Objects/2026_CHI_Conversing_with_Objects|Conversing with Objects]] — 与物对话：生命转折期的人/AI 身份；2026；unread
- [[raw/2026_CHI_Does_My_Chatbot_Have_an_Agenda/2026_CHI_Does_My_Chatbot_Have_an_Agenda|Does My Chatbot Have an Agenda?]] — 人-类人 chatbot 互动中的 agency；2026；unread
- [[raw/2026_CHI_Emotion_Through_Motion_Shape_Changing_Jewelry/2026_CHI_Emotion_Through_Motion_Shape_Changing_Jewelry|Emotion Through Motion]] — 形变珠宝传达情绪；2026；unread
- [[raw/2026_CHI_From_Tool_To_Partner_Expressive_Behaviors_HRC/2026_CHI_From_Tool_To_Partner_Expressive_Behaviors_HRC|From Tool to Partner]] — 表达性行为桥接人-机器人创意协作；2026；read
- [[raw/2026_CHI_Grand_Challenges_Computers_Control_Over_Bodies/2026_CHI_Grand_Challenges_Computers_Control_Over_Bodies|Grand Challenges: Computers' Control Over Bodies]] — 计算机控制人身体的重大挑战；2026；unread
- [[raw/2026_CHI_Negotiating_Real_World_Domestic_Service_Robotics/2026_CHI_Negotiating_Real_World_Domestic_Service_Robotics|Negotiating the Real World of Domestic Service Robotics]] — 家用服务机器人的现实协商；2026；unread
- [[raw/2026_CHI_Privacy_Is_Not_One_Click_Robots_Changing_Boundaries/2026_CHI_Privacy_Is_Not_One_Click_Robots_Changing_Boundaries|Privacy is Not One-Click]] — 适应老年人隐私边界变化的机器人设计；2026；read
- [[raw/2026_CHI_RECALLbot_Agentic_Memory_Reciprocal_Disclosure/2026_CHI_RECALLbot_Agentic_Memory_Reciprocal_Disclosure|RECALLbot]] — agentic 记忆与互惠披露的人-chatbot 关系；2026；read
- [[raw/2026_CHI_Relational_Gains_Privacy_Strains_ChatGPT_Memory/2026_CHI_Relational_Gains_Privacy_Strains_ChatGPT_Memory|Relational Gains, Privacy Strains]] — ChatGPT 记忆功能的关系收益与隐私张力；2026；read
- [[raw/2026_CHI_Robots_That_Evolve_With_Us/2026_CHI_Robots_That_Evolve_With_Us|Robots that Evolve with Us]] — 模块化协同设计的可进化机器人；2026；unread
- [[raw/2026_CHI_Thing_Ethnography_Cobots_Workers/2026_CHI_Thing_Ethnography_Cobots_Workers|Thing Ethnography (Cobots & Workers)]] — 工厂协作机器人与工人的民族志；2026；unread
- [[raw/2026_CHI_Tracking_Together_Robot_App_Dementia_Care/2026_CHI_Tracking_Together_Robot_App_Dementia_Care|Tracking Together]] — 机器人+App 语音分析支持痴呆照护；2026；unread
- [[raw/2026_CHI_With_Not_For_AI_Companion_ED_Waiting_Area/2026_CHI_With_Not_For_AI_Companion_ED_Waiting_Area|With, not For (ED AI Companion)]] — 急诊候诊区 AI 陪伴的协同设计；2026；unread
- [[raw/2026_DreamZero_World_Action_Models_ZeroShot_Policies/2026_DreamZero_World_Action_Models_ZeroShot_Policies|World Action Models are Zero-shot Policies]] — 世界动作模型即零样本策略；2026；unread
- [[raw/2026_GEM_Generative_Supervision_Embodied_Intelligence/2026_GEM_Generative_Supervision_Embodied_Intelligence|GEM]] — 生成式监督助力具身智能；2026；unread
- [[raw/2026_WALL_WM_Event_Grounded_World_Action_Model/2026_WALL_WM_Event_Grounded_World_Action_Model|WALL-WM]] — 事件关节处的世界动作建模；2026；unread

## Web 来源（非论文）

- [[raw/2026-09_TypeSafe_Jev_Launch_Post/2026-09_TypeSafe_Jev_Launch_Post|Introducing System One Models & Jev]] — TypeSafe AI 官方发布文（Jev / RLCD / workflow evals）；2026；skimmed。关联：[[wiki/entities/Jev]]、[[wiki/concepts/System_One_Decision_Models]]
