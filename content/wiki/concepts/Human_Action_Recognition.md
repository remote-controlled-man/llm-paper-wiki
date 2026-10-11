---
type: concept
title: "人体动作识别与姿态估计"
sources:
  - "[[raw/2014-06_Two-Stream_ConvNets_Action_Recognition_1406.2199/2014-06_Two-Stream_ConvNets_Action_Recognition_1406.2199|双流卷积网络 (Two-Stream)]]"
  - "[[raw/2015_ICCV_Learning_Spatiotemporal_Features_C3D/2015_ICCV_Learning_Spatiotemporal_Features_C3D|C3D]]"
  - "[[raw/2017-05_Quo_Vadis_Action_Recognition_Kinetics_1705.07750/2017-05_Quo_Vadis_Action_Recognition_Kinetics_1705.07750|I3D 与 Kinetics 数据集]]"
  - "[[raw/2019_TPAMI_Temporal_Segment_Networks/2019_TPAMI_Temporal_Segment_Networks|时序分段网络 (TSN)]]"
  - "[[raw/2017-11_Non-local_Neural_Networks_1711.07971/2017-11_Non-local_Neural_Networks_1711.07971|Non-local 神经网络]]"
  - "[[raw/2017_ICCV_RMPE_Regional_MultiPerson_Pose_Estimation/2017_ICCV_RMPE_Regional_MultiPerson_Pose_Estimation|RMPE / AlphaPose]]"
  - "[[raw/2018-12_OpenPose_Realtime_MultiPerson_2D_Pose_1812.08008/2018-12_OpenPose_Realtime_MultiPerson_2D_Pose_1812.08008|OpenPose]]"
  - "[[raw/2021_RAL_BiTraP_Bidirectional_Trajectory_Prediction/2021_RAL_BiTraP_Bidirectional_Trajectory_Prediction|BiTraP]]"
created: 2026-10-11
updated: 2026-10-11
---

# 人体动作识别与姿态估计

## 定义

从视觉输入中理解"人在做什么、人在哪里、人将去哪里"的一条技术线，本库实际覆盖三个子问题：

- **动作识别**（action recognition）：给整段视频（或预先切好的片段）分类，如"挥手""跑步"；
- **姿态估计**（pose estimation）：从图像/视频中定位人体关键点，是动作识别的重要中间表示，也是独立任务；
- **轨迹/行为预测**（trajectory forecasting / action prediction）：从过去观测推断未来位置或动作，是识别从"理解现在"走向"预判未来"的延伸。

三者在方法史上共享同一条主线：从手工特征 → 2D CNN + 光流 → 3D 卷积/时序建模 → 注意力与图结构。

## 方法分类与演进脉络

**1. 深度学习前时代（2011 及以前）。** [[raw/2011_ACMCS_Human_Activity_Analysis_Review/2011_ACMCS_Human_Activity_Analysis_Review|Human Activity Analysis 综述 (2011)]] 划定问题空间：HOG/HOF、STIP 等手工时空特征 + 词袋/图模型。其价值是术语与问题分类框架，方法已全部过时。

**2. 2D CNN 借道进入视频（2014）。** [[raw/2014-06_Two-Stream_ConvNets_Action_Recognition_1406.2199/2014-06_Two-Stream_ConvNets_Action_Recognition_1406.2199|双流网络]]是深度学习时代动作识别的起点：RGB 空间流 + 光流时间流分别过 2D CNN 再后期融合。关键判断：视频数据不足以从头训深网，光流把"运动"以手工先验的形式免费送入网络。这一"光流 vs 学习"的争论贯穿了此后五年。

**3. 端到端时空特征（2015–2017）。** 两条路线竞争：
- 3D 卷积派：[[raw/2015_ICCV_Learning_Spatiotemporal_Features_C3D/2015_ICCV_Learning_Spatiotemporal_Features_C3D|C3D]] 用 3×3×3 卷积统一学习时空特征，简单可迁移，但计算重、难以训深；
- 采样派：[[raw/2019_TPAMI_Temporal_Segment_Networks/2019_TPAMI_Temporal_Segment_Networks|TSN]] 用稀疏分段采样 + 段内共识聚合把任意长视频压进有限帧预算，解决了 UCF101/HMDB51 小数据下的训练可行性。同期的 [[raw/2015-06_ConvLSTM_Precipitation_Nowcasting_1506.04214/2015-06_ConvLSTM_Precipitation_Nowcasting_1506.04214|ConvLSTM]] 虽以降水临近预报为题，但确立了"循环连接内部换成卷积"的时空序列建模范式，是这条线的通用基础设施。

**4. 数据规模的转折点（2017）。** [[raw/2017-05_Quo_Vadis_Action_Recognition_Kinetics_1705.07750/2017-05_Quo_Vadis_Action_Recognition_Kinetics_1705.07750|Quo Vadis / I3D]] 是整条线的关键转折：2D ImageNet 权重"膨胀"成 3D（Inflated 3D ConvNet），配合自建的 Kinetics 大数据集，第一次证明**数据规模比架构更瓶颈**。从此动作识别进入"大预训练 + 下游微调"时代，与 NLP 的 BERT 式转折同构。[[raw/2017-11_Non-local_Neural_Networks_1711.07971|Non-local]] 在同一窗口把自注意力式长程依赖引入视频，预告了 Transformer 接管该领域。

**5. 多人姿态估计：自顶向下 vs 自底向上（2017–2018）。**
- [[raw/2017_ICCV_RMPE_Regional_MultiPerson_Pose_Estimation/2017_ICCV_RMPE_Regional_MultiPerson_Pose_Estimation|RMPE (AlphaPose)]] 代表自顶向下：检测框 → 单人姿态，用对称 STN + 并行 SPPE 和姿态 NMS 对抗框定位误差，精度优先；
- [[raw/2018-12_OpenPose_Realtime_MultiPerson_2D_Pose_1812.08008/2018-12_OpenPose_Realtime_MultiPerson_2D_Pose_1812.08008|OpenPose]] 代表自底向上：先检测所有关键点，再用 Part Affinity Fields（肢体亲和场）一次性解析多人关联，实现实时多人估计，速度优先。这一精度-速度分野至今仍是该任务的基本格局。

**6. 从识别走向预测（2020–2021）。** 轨迹预测子线成形：[[raw/2020-03_Transformer_Networks_Trajectory_Forecasting_2003.08111/2020-03_Transformer_Networks_Trajectory_Forecasting_2003.08111|Transformer 轨迹预测]] 把 seq2seq 注意力迁移到行人轨迹；[[raw/2021_CVPR_SGCN_Sparse_Graph_Conv_Trajectory/2021_CVPR_SGCN_Sparse_Graph_Conv_Trajectory|SGCN]] 用稀疏图卷积建模行人间社交交互，主打效率；[[raw/2021_RAL_BiTraP_Bidirectional_Trajectory_Prediction/2021_RAL_BiTraP_Bidirectional_Trajectory_Prediction|BiTraP]] 用"逆向解码器 + 多模态终点估计"显式处理未来多解性。三篇合起来说明：预测的核心难点已从"拟合平均轨迹"转为"社交交互 + 多模态意图"。

**7. 应用与综述层。** [[raw/2016_ICNC-FSKD_Driver_Behavior_Recognition_DCNN/2016_ICNC-FSKD_Driver_Behavior_Recognition_DCNN|驾驶员行为识别 (DCNN)]] 是动作识别在车载场景的轻量应用，代表了"识别 → 安全监控"的落地路径。综述密集：[[raw/2018_IEEE_Review_Human_Action_Recognition_Video/2018_IEEE_Review_Human_Action_Recognition_Video|IEEE 2018 综述]]、[[raw/2018-06_Human_Action_Recognition_Prediction_Survey_1806.11230/2018-06_Human_Action_Recognition_Prediction_Survey_1806.11230|识别与预测综述 (IJCV)]]、[[raw/2021_NCNISA_DL_Human_Action_Recognition_Survey_LiGui/2021_NCNISA_DL_Human_Action_Recognition_Survey_LiGui|李贵 2021 中文综述]]、[[raw/2022_ARA_Human_Action_Recognition_Methods_Survey/2022_ARA_Human_Action_Recognition_Methods_Survey|梁绪 2022 中文综述]] 覆盖识别主线；[[raw/2023_JSJYXDH_Human_Action_Detection_Survey_ShenJiawei/2023_JSJYXDH_Human_Action_Detection_Survey_ShenJiawei|沈加炜 2023 检测综述]] 转向时序动作检测（何时开始、何时结束），是识别饱和后公认的开放方向。

## 关键转折点

> 2017 年的 I3D + Kinetics：动作识别从"设计更好的架构"转向"先造更大的数据集再谈架构"。这一判断重塑了此后所有视觉识别任务的展开方式。

次级转折：2014 双流（深度学习入场）、2018 OpenPose（姿态估计工程化、实时化）、2020–2021 轨迹预测（从识别到预判、从单解到多模态）。

## 与本库已有论文的关系

- 全部归入 [[wiki/areas/Perception_and_CV|Perception_and_CV]] 方向，是本库该方向除图像质量评估外最完整的一条论文链。
- 与 [[wiki/concepts/System_One_Decision_Models|System One 决策模型]] 的潜在接口：动作/行为识别本质上是"高频结构化分类决策"，Jev 类校准决策层是该任务的候选执行器（尚未有论文对接，属推测）。
- ConvLSTM、轨迹预测三篇与时空序列建模概念相通，可沉淀为独立的"时空预测"概念页（尚未建）。

## 已知矛盾 / 争议

- **光流 vs 端到端学习**：双流证明手工光流长期打不死，直到 Kinetics 级数据 + 3D 卷积成熟才被抛弃；"手工先验兜底 vs 数据暴力"的争论在该线反复出现。
- **自顶向下 vs 自底向上**（多人姿态）：精度与实时性的取舍，两派至今并存，未分胜负。
- **综述通胀**：识别主线 2011–2023 有 6 篇综述（含 3 篇中文），其中李贵 2021 会议级别较弱，新增综述前应优先精读 IJCV 2018 一篇即可，其余按"低信号"对待。
- 任务边界易混：recognition（分类）≠ detection（时序定位）≠ prediction（未来推断），多篇综述对此界定不清，引用时勿误读。

## 开放问题 / 观察触发器

- [ ] 本库整条线停在 2021 年：TimeSformer/VideoMAE 等纯 Transformer 视频模型、3D 姿态、第一人称（egocentric）识别均无覆盖，出现即 ingest。
- [ ] 时序动作检测（沈加炜 2023）是识别饱和后的开放方向，值得评估是否升级为独立 concept 页。
- [ ] 轨迹预测的多模态评估指标与意图理解仍未闭合；与 HRI 方向（机器人预判人类行为）有接口但本库暂无桥接论文。
- [ ] 姿态估计在基础模型时代（检测/分割大一统）是否仍值得作为独立任务跟踪，待判断。

## 证据状态（阅读前请注意）

本概念页涉及的全部 18 篇 raw 笔记目前均为占位状态（frontmatter 完整、正文未填、status: unread）。页内方法性论断基于这些论文的公开经典结论与 frontmatter 元数据，**未经本库笔记精读核实**。任一篇笔记完成 deep_read 后应回读本页并修正相应论断。
