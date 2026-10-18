---
type: paper_note
status: 精读中
priority: P0
venue: CHI 2026
title: "Interaction-Augmented Instruction: Modeling the Synergy of Prompts and Interactions in Human-GenAI Collaboration"
slug: "2026_CHI_Interaction_Augmented_Instruction"
year: 2026
doi: "https://doi.org/10.1145/3772318.3790505"
local_pdf: "2026_CHI_Interaction_Augmented_Instruction.pdf"
pdf: "2026_CHI_Interaction_Augmented_Instruction.pdf"
primary_area: "04_Human_AI_Interaction"
tags:
  - CHI2026
  - interaction-model
  - human-genai-collaboration
  - augmented-instruction
  - embodied-agent
  - agent-harness
---

# Interaction-Augmented Instruction

## 0. 先给结论

这篇论文不是在提出一个新的 LLM 算法，也不是在做机器人系统。它做的是一个 **Interaction Model**: 把用户的文本 prompt、GUI 交互动作、被操作的 artifact、以及 GenAI 调用之间的信息流，用一个实体-关系图统一描述。

我们的定位：这篇可以当作 interaction model 的入门术语和分类框架，不能当作 agent/robot harness 的工程路线。它没有给 schema、模型接口、执行器、memory、安全层或评估指标。

对我们做具身机器人和 agent harness 最重要的一句话是：

> 不要把用户意图只看成一句 ASR/prompt。真正进入 agent/robot 的指令，应该是由语言、手势、视线、点击、选择区域、环境对象、历史上下文共同组成的 `Augmented Instruction`。

论文的核心贡献：

- 提出 IAI, 即 `Interaction-Augmented Instruction` 模型。
- 定义 6 个核心实体：`H`, `T`, `I`, `A`, `Aug`, `G`。
- 从 66 个 Human-GenAI 交互系统里归纳出 12 个 atomic interaction paradigms。
- 展示这个模型如何用来分析、比较、组合和生成新的交互设计。

![Figure 1: paper overview](raw/2026_CHI_Interaction_Augmented_Instruction/assets/fig1_overview.png)

图 1 的读法：

- A: 只靠 prompt 很自由但容易模糊；GUI interaction 很精确但通常预定义、刚性。
- B: 论文提出 IAI 模型，把 prompt 和 interaction 放进同一个信息流模型。
- C: 用这个模型归纳已有系统中的 atomic interaction paradigms。
- D: 用这些 paradigms 去改造现有界面，或生成新界面方案。

## 1. 这篇的输入/输出到底是什么？

这里要分两层讲：论文研究本身的输入/输出，以及如果我们把它落到系统里的输入/输出。

### 1.1 论文研究层面的输入/输出

| 层面 | 输入 | 输出 |
|---|---|---|
| 论文方法 | 66 个已有 Human-GenAI 交互系统，以及它们的界面行为、prompt 用法、artifact 操作方式 | 一个 IAI 实体-关系模型 |
| 论文归纳 | 每个系统里的信息流和交互流程 | 12 个 atomic interaction paradigms |
| 论文设计用法 | 现有工具或新场景需求 | 如何链式组合、修改、扩展 interaction paradigms 的方法 |

所以这篇论文的“输入”不是训练数据，不是 benchmark，不是机器人传感器数据；它的研究输入是已有交互系统案例。论文的“输出”也不是一个可直接跑的 API，而是一个可复用的交互建模框架。

### 1.2 系统实现层面的输入/输出

如果我们把 IAI 用到 agent harness 或机器人交互系统里，可以理解成下面这个流程：

```text
Human intent
  -> Text Prompt / Interaction / Artifact context
  -> Augmented Instruction
  -> GenAI / agent / robot policy / tool executor
  -> New or modified Artifact / robot action / follow-up interaction
```

更具体地说：

| 模型实体 | 论文含义 | 工程里的数据类型 | 机器人/agent harness 里的例子 |
|---|---|---|---|
| `H` Human | 持有意图的用户 | user/session 概念，不一定是数据对象 | 用户、操作者、陪伴对象 |
| `T` Text Prompt | 用户写下或说出的自然语言指令 | string / transcript / message object | ASR 文本："把桌上的红杯子拿给我" |
| `I` Interaction | 用户的非文本交互动作 | event object / gesture object / UI event / pointing event | 点击、拖拽、手势指向、凝视、触摸、圈选、纠错动作 |
| `A` Artifact | 被操作或被生成的领域对象 | image/text/code/table/scene object/state | 视觉场景、地图、物体检测结果、任务计划、记忆条目、UI 卡片 |
| `Aug` Augmented Instruction | 合并文本、交互、artifact 后真正给 GenAI 的增强指令 | structured instruction object | 语言 + 指向对象 + 场景状态 + 约束 + 来源记录 |
| `G` Generative AI | 执行生成、编辑、解释、转换的模型 | LLM / VLM / diffusion model / tool agent / planner | LLM planner, VLM grounding, robot behavior generator, memory retriever |

### 1.3 输入和输出的最小数据流

论文里的 baseline prompt 流：

```text
H -> T -> G -> A
```

解释：

- 用户 `H` 写/说一段文本 `T`。
- 文本直接进入模型 `G`。
- 模型生成或修改 artifact `A`。

GUI interaction 的 baseline 流：

```text
H -> I -> A
```

解释：

- 用户 `H` 执行动作 `I`，比如点击、拖拽、选区。
- 动作直接操作某个 artifact `A`。

IAI 的关键增强流：

```text
T -> Aug
I -> Aug
A -> Aug
Aug -> G
G -> A
G -> I
```

解释：

- `T -> Aug`: 文本 prompt 被纳入增强指令。
- `I -> Aug`: 交互动作被编码进增强指令。
- `A -> Aug`: 被选择或引用的 artifact 片段进入增强指令。
- `Aug -> G`: 增强指令被传给 GenAI。
- `G -> A`: GenAI 生成、编辑或转换 artifact。
- `G -> I`: GenAI 生成下一步交互，比如澄清选项、控制控件、候选动作。

### 1.4 `Aug` 到底是 text 还是多模态？

最准确的回答：**论文没有把 `Aug` 定义成某一种固定模态，也没有给出具体 API schema。**

它把 `Aug` 定义为 GenAI 的 explicit input，也就是一个抽象的、机器可读的增强指令。这个增强指令由 `T/I/A` 合成，但最终是什么数据形态，取决于具体系统和底层模型。

可以分成四种情况看：

| 情况 | `Aug` 的实际形态 | 模型 `G` 的输入模态 |
|---|---|---|
| 纯文本 LLM | 把 interaction 和 artifact 引用序列化成文本 | text-only |
| 支持工具/函数调用的 LLM agent | text + structured JSON / tool args / object IDs | text + structured data |
| VLM / multimodal model | text + image + selected regions + boxes/masks | multimodal: text + visual payload |
| diffusion / image editing model | prompt + mask/sketch/control map/reference image | multimodal/control-conditioned input |

所以 `I -> Aug` 不等于“交互动作最后一定变成文本”。更准确地说：

```text
I 产生的是约束或引用
这些约束/引用被编码、归一化、附加到 prompt 或 instruction payload
然后作为 Aug 交给 G
```

论文原文举过的 `I` 产生物包括：

- pixel masks
- coordinate ranges
- AST node identifiers
- selected table rows
- selected text segments

这些显然不是自然语言本身。它们可以被文本化，比如 `"selected_region": [x1, y1, x2, y2]`；也可以保持为结构化数据或视觉 payload，比如 mask tensor、bbox、图像 crop、scene object ID。

因此要避免一个误解：

```text
错误理解: Aug = 更长的 prompt
更准确: Aug = text prompt + structured/non-linguistic constraints + artifact references
```

对我们做机器人，`Aug` 更应该是一个 typed object，而不是一段拼接后的 prompt：

```ts
type RobotAugmentedInstruction = {
  utteranceText?: string;
  gesture?: {
    type: "point" | "wave" | "drag" | "touch" | "demonstration";
    targetRay?: Ray3D;
    targetObjectId?: string;
    confidence: number;
  };
  visualGrounding?: {
    objectIds?: string[];
    bbox2d?: number[];
    bbox3d?: number[];
    maskRef?: string;
    sceneGraphRef?: string;
  };
  artifactRefs?: {
    type: "scene" | "map" | "memory" | "document" | "trajectory";
    id: string;
    spanOrRegion?: unknown;
  }[];
  constraints?: {
    kind: "safety" | "preference" | "spatial" | "temporal" | "task";
    value: unknown;
  }[];
  provenance: {
    field: string;
    source: "user_text" | "gesture" | "vision" | "memory" | "model_suggestion" | "system";
  }[];
};
```

这段 schema 是我们的工程化落地，不是论文原文。论文的问题就在这里：它指出了 `Aug` 应该承载非语言、结构化、多模态约束，但没有进一步定义一个强类型数据接口，也没有说明不同底层模型应该怎么 consume 这个 payload。

### 不要误读成“结构化信息直接扔给 LLM 就完事”

这篇论文里的 `G` 是 Generative AI 的抽象概念，不等于“所有结构化交互信息都原样直接喂给一个市面 LLM，由 LLM 自己完成 grounding、规划和执行”。论文没有给这样的系统实现。

更合理的工程理解是：

```text
interaction/artifact/user action
  -> structured AugmentedInstruction / InteractionState
  -> grounding module / VLM / LLM / planner / policy 按职责消费
  -> validator / executor 执行
```

也就是说，`Aug` 更像中间协议，而不是单纯 prompt 字符串。对具身机器人尤其如此：gaze、手势、scene graph、目标候选、置信度、安全约束，应该先由专门 perception/grounding 模块整理成可靠 evidence，再交给 LLM 做高层语义推理、澄清问题和任务分解。

和后面读的 `How Humans Naturally Refer to Targets` 对照看更清楚：那篇并没有用 LLM 处理 gaze/head/hand 原始轨迹，而是先通过 WhisperX、direction vectors、peak-interval heuristic 等方法把目标 grounding 变成可测量证据。这说明 `Aug` 的关键不是“大模型万能输入”，而是“多模态意图证据的结构化中间层”。

## 2. 数据类型要怎么理解？

论文没有给一个程序员可以直接照抄的 JSON schema，但它明确说 interaction-derived information 可以包括这类结构化约束：

- pixel masks
- coordinate ranges
- AST node identifiers
- selected table rows
- selected text segments

也就是说，`I` 和 `A` 不只是“附加说明”，它们会被编码成机器可消费的约束。

对我们来说，可以把系统里的 `AugmentedInstruction` 理解成下面这种结构。注意：这是工程化解释，不是论文原文 API。

```ts
type AugmentedInstruction = {
  text?: string;                    // 来自 T: 用户语言
  interactionEvents?: InteractionEvent[]; // 来自 I: 点击、手势、凝视、圈选等
  artifactRefs?: ArtifactRef[];     // 来自 A: 被引用的图像区域、物体、文本段、地图区域
  constraints?: Constraint[];       // 由 T/I/A 合成的限制条件
  target?: ExecutionTarget;         // 这条指令要作用于哪个对象或模块
  context?: SceneOrSessionContext;  // 场景状态、对话状态、长期记忆摘要
  provenance: Provenance[];         // 每个字段来自用户、模型、传感器还是系统推断
};
```

几个典型字段可以这样落：

| 用户表达 | 原始输入 | 结构化之后 |
|---|---|---|
| "拿那个" + 手指指向红杯子 | ASR text + pointing ray + camera frame | `text="拿那个"`, `artifactRefs=[red_cup_3d_bbox]`, `target=robot_manipulation` |
| "把这段改得更礼貌" + 鼠标选中文本 | prompt + selected text span | `text="更礼貌"`, `artifactRefs=[doc.span(120,180)]` |
| "别放这里" + 用户把规划路径拖开 | correction text + trajectory edit event | `constraints=[avoid_region]`, `interactionEvents=[drag_path_segment]` |
| "以后我不喜欢这个" + 指向某个推荐项 | preference text + item ref | `memory_update=[negative_preference(item)]` |

关键点：`Aug` 的意义不是“把所有东西拼成一个长 prompt”，而是保留多源信息的结构、来源和可追踪性。

## 3. Table 1: 论文原始实体和关系

下面是论文 Table 1，最值得反复看。它定义了 IAI 模型里的实体和允许的关系。

![Table 1: entities and relations](raw/2026_CHI_Interaction_Augmented_Instruction/assets/table1_entities_relations.png)

### 3.1 六个实体

| 实体 | 简单解释 | 我们该怎么记 |
|---|---|---|
| `H` Human | 用户持有意图，但不直接操作 GenAI | 意图源头 |
| `T` Text Prompt | 自然语言指令 | 语言通道 |
| `I` Interaction | 非文本交互动作 | 指向、选择、调参、示范、纠错通道 |
| `A` Artifact | 文本、图像、代码、表格等对象 | 被引用、被操作、被生成的对象 |
| `Aug` Augmented Instruction | 合并 `T/I/A` 后给模型的指令 | 真正的机器输入对象 |
| `G` Generative AI | LLM、diffusion model 等生成模型 | 执行者或建议者 |

### 3.2 为什么 `Aug` 很关键？

如果只有 `T`，系统看到的是一句话。如果只有 `I`，系统看到的是一个动作。如果只有 `A`，系统看到的是上下文对象。

`Aug` 的作用是把三者合成一个可执行的意图表达：

```text
Aug = intent from T + grounding from I + context from A
```

这不是论文给的数学公式，而是对 IAI 思想的工程化表达。论文真正使用的是实体-关系图，不是数值公式。

### 3.3 论文里没有哪些边？

这些缺失关系对 agent harness 很重要：

| 不建模的关系 | 为什么重要 |
|---|---|
| no `G -> T` | 模型不能直接把自己的输出当作用户 prompt。模型可以建议，但需要通过交互或用户确认。 |
| no `G -> Aug` | 模型不能直接替用户生成最终增强指令，否则会丢失 agency 和 provenance。 |
| no `I -> G` | 交互动作不直接调用模型，而是先形成/修改指令或 artifact。 |
| no `T -> A` | 文本 prompt 不直接修改 artifact，中间必须经过 `G` 或 `Aug -> G`。 |
| no `H -> G` | 用户不直接驱动 GenAI，必须通过 prompt 或 interaction。 |
| no core `H -> A` | 上传、查看、检查 artifact 太常见，论文把它当背景能力，不作为区分范式的核心边。 |

这和机器人安全相关：模型建议、系统推断、用户确认、执行动作之间要留 provenance，不要把 LLM 自己编出来的东西当成用户真实意图。

## 4. 12 个 Atomic Interaction Paradigms

论文从 66 个已有系统里归纳出 12 个 atomic paradigms。它们按两个维度分类：

- interaction 发生在调用 GenAI 之前还是之后。
- 用户手里是否已有 artifact 可用于 grounding。

![Table 2: atomic interaction paradigms](raw/2026_CHI_Interaction_Augmented_Instruction/assets/table2_atomic_paradigms.png)

### 4.1 第一组：调用 GenAI 前，prompt-only

| 编号 | 名称 | 含义 | 机器人/agent 里的类比 |
|---|---|---|---|
| P1 | Interactive Prompt Enhancement | 用户选择 prompt 的某些部分，让系统扩展或细化 | 用户圈出一句任务描述，让 agent 帮他补条件 |
| P2 | Interactive Prompt Organization | 用户把多个 prompt 组织成结构 | 把长期目标拆成任务树、检查清单、行为脚本 |
| P3 | Interaction as Part of Instruction | artifact 之外的交互也成为 instruction 的一部分 | 手势、表情、语气、方向指示进入机器人指令 |

P3 对具身机器人尤其重要，因为它把非文本动作当作指令的一部分，而不是 UI 装饰。

### 4.2 第二组：调用 GenAI 前，artifact-grounded

| 编号 | 名称 | 含义 | 机器人/agent 里的类比 |
|---|---|---|---|
| P4 | Referenced Artifact as Part of Instruction | 用户选择部分或完整 artifact，与 prompt 一起作为 instruction | 用户指着桌上的杯子说"拿这个"，杯子对象进入 instruction |

P4 是具身交互里最常见的 grounding 模式：语言表达通常不完整，必须靠物体、空间、区域或当前任务状态补齐。

### 4.3 第三组：调用 GenAI 后，prompt-only

| 编号 | 名称 | 含义 | 机器人/agent 里的类比 |
|---|---|---|---|
| P5 | AI-driven Prompt Suggestion | AI 给出新的 prompt 或扩展 prompt 供用户选择 | agent 提醒用户补充偏好、约束、目标 |
| P6 | AI-driven Prompt Decomposition | AI 把 prompt 拆成可交互的细粒度结构 | 把"帮我收拾桌子"拆成识别、分类、拿取、放置 |
| P7 | Generative Prompt Control Widgets | AI 生成控制 prompt 的控件 | 系统生成"更快/更稳/更安静"滑条或按钮 |
| P8 | Generative Artifact Control Widgets | AI 生成用于操作 artifact 的控件 | 针对当前场景生成候选操作："拿杯子/避开线缆/等待人离开" |

P5-P8 说明模型不只是执行，也可以生成下一步交互空间。但注意，论文不允许它直接变成 `G -> Aug`，仍需要用户或交互 mediation。

### 4.4 第四组：调用 GenAI 后，artifact-grounded

| 编号 | 名称 | 含义 | 机器人/agent 里的类比 |
|---|---|---|---|
| P9 | Artifact to Structured Instruction | AI 从 artifact 生成结构化指令 | 从场景图、地图、日志里生成任务步骤 |
| P10 | Artifact to Multimodal Instruction | AI 解析 artifact 并整合成多模态指令 | 图像、语音、手势、物体状态共同形成指令 |
| P11 | Artifact-driven Prompt Enhancement | AI 基于 artifact 和 prompt 建议行动 | 机器人根据用户话语和当前环境建议补充约束 |
| P12 | Interactive Artifact Refinement | AI 分析 artifact，并发起相关交互来继续修改 | 机器人提出"这个路径会碰撞，要不要改成右侧绕行？" |

P10、P11、P12 对长期陪伴和机器人感知系统尤其相关，因为它们强调：artifact 不是静态背景，而会驱动下一步交互。

## 5. 论文有没有公式？

严格说，没有传统意义上的数学公式、损失函数、优化目标或评价指标公式。

这篇论文的形式化表达主要是实体-关系图。最接近“公式”的内容是这些有向关系：

```text
H -> T
H -> I
T -> Aug
T -> G
I -> Aug
I -> T
I -> A
A -> Aug
A -> G
Aug -> G
G -> A
G -> I
```

所以在精读时不要找训练 loss 或 model architecture。应该关注：

- 哪些实体被区分出来？
- 哪些信息流被允许？
- 哪些信息流被故意排除？
- 每个 atomic paradigm 是怎样组合这些边的？

## 6. STAR 法则精读

### S - Situation: 背景是什么？

GenAI 系统最常见的交互方式是文本 prompt。文本灵活，但有两个大问题：

- 难表达细粒度 intent，比如"就改右上角那块"。
- 难表达 referential intent，也就是"我说的这个到底指哪个对象、区域、上下文"。

HCI 系统中已经有很多工具把 prompt 和 GUI interaction 结合起来，比如点击、拖拽、brush、sketch、文本选择、图像选区。但这些工具大多是点状方案，缺少统一模型来比较和设计。

### T - Task: 作者要解决什么？

作者要回答：

- prompt 和 interaction 如何共同形成 GenAI 的输入？
- 不同 Human-GenAI interface 的交互结构如何比较？
- 如何从已有设计范式出发，生成新的 interaction model？

本质上，它要把 `prompt + interaction + artifact` 这件事形式化。

### A - Action: 作者做了什么？

作者先定义 IAI 模型，再用它分析已有系统：

- 从已有 corpus 中筛选 483 个候选系统。
- 过滤条件包括：必须使用 GenAI、支持 text prompt、并且至少有一种非文本交互模态。
- 最终留下 66 个系统。
- 两位作者进行 annotation，先用 10 个系统校准，再交叉检查，争议由第三位作者解决。
- 归纳出 12 个 atomic interaction paradigms。

### R - Result: 得到了什么？

结果不是一个新模型权重，而是一个交互设计框架：

- descriptive power: 描述已有系统。
- discriminative power: 区分看起来类似但信息流不同的系统。
- generative power: 指导设计新的交互范式。

## 7. 和我们最相关的理解

### 7.1 Interaction Model 不是 prompt engineering

prompt engineering 关注"怎么把一句话写好"。

interaction model 关注的是：

- 用户说了什么？
- 用户指向了什么？
- 用户选择了什么 artifact？
- 用户是否在纠错？
- 当前环境/记忆/任务状态是什么？
- 哪些信息真正进入执行指令？
- 哪些信息只是模型建议，不能直接执行？

对机器人来说，interaction model 是从多模态感知到行动执行之间的意图协议。

### 7.2 `Augmented Instruction` 是 agent harness 的核心对象

我们可以把 `Aug` 放在 harness 的中心：

```text
ASR transcript
+ gesture/gaze/touch event
+ scene graph / object refs
+ task state
+ long-term memory refs
+ safety and preference constraints
+ provenance
= AugmentedInstruction
```

然后所有下游模块都读这个对象：

- planner 用它拆任务。
- VLM 用它确认 grounding。
- memory module 用它读写长期偏好。
- robot policy 用它生成动作。
- safety module 用它检查风险。
- UI/对话系统用它追问和澄清。

### 7.3 `I` 的范围要比 GUI 大

论文主要从 GUI 工具出发，但对具身机器人可以扩展理解：

| 论文里的 `I` | 具身机器人里的对应 |
|---|---|
| click | 指向某个物体 |
| drag | 用户移动目标位置或路径 |
| brush/selection | 圈选区域、遮挡区域、禁区 |
| widget manipulation | 调速度、力度、距离、安全等级 |
| annotation | 用户给物体、地点、偏好打标签 |

也就是说，手势、凝视、触摸、示范、纠错都可以成为 `I`。

### 7.4 `A` 对我们不只是文件，而是世界状态

论文里的 artifact 包括文本、图像、代码、表格。对机器人来说，artifact 可以扩展成：

- 物体检测结果
- 场景图
- 房间地图
- 轨迹计划
- 对话状态
- 长期记忆条目
- 用户偏好 profile
- 任务执行日志

关键是：用户和模型都可能围绕这些 artifact 进行引用、编辑、生成和澄清。

## 8. Table 4: 怎么用这个模型做设计？

论文给了四类用法：

![Table 4: usage methods](raw/2026_CHI_Interaction_Augmented_Instruction/assets/table4_usage_methods.png)

用我们的话讲：

| 设计目标 | 怎么用 |
|---|---|
| 扩展现有工具 pipeline | 找到当前工具的 atomic paradigm，再链上一个互补 paradigm |
| 优化现有交互设计 | 不额外调用 GenAI，而是调整图里的关系，比如把 artifact 加入 instruction |
| 设计新工具 | 先定义场景里的 `H/T/I/A/Aug/G`，再推导关系 |
| 研究新范式 | 改变、反转、重组现有 paradigm，形成新交互假设 |

这对我们做产品路线很实用：先不要直接写 feature list，而是先画出信息流图，问清楚每个输入到底怎么进入 `AugmentedInstruction`。

## 9. 这篇的局限

论文自己也有边界：

- 主要来自 GUI 和 Human-GenAI 工具，不是机器人系统。
- 模型默认 single-user、single-agent，不直接覆盖多用户、多 agent 协作。
- 论文是 qualitative synthesis，没有做大规模用户实验，也没有证明哪个 paradigm 效果最好。
- `Augmented Instruction` 是概念模型，不是可直接落地的工程协议。

所以我们用它时，不要把它当成最终架构。它更适合作为 interaction model 的语言和分析框架。

## 10. 精读时要追的问题

下一遍精读可以重点追这些问题：

1. `T`, `I`, `A`, `Aug` 的边界到底怎么分？比如用户语音里的语气算 `T` 还是 `I`？
2. P3 和 P4 的差别是什么？一个是 artifact 外的 interaction 进入 instruction，一个是 artifact 本身被引用进 instruction。
3. 为什么论文不允许 `G -> Aug`？这和 user agency、provenance、执行安全有关。
4. 在机器人里，`A` 应该如何定义？场景图、记忆、地图、任务状态是否都算 artifact？
5. 如果有长期陪伴关系，长期记忆是 `A -> Aug`，还是一个独立实体？
6. 如果系统有多个 agent，这个 IAI 模型要怎么扩展？

## 11. 给我们的工程 takeaway

最适合落到我们系统里的不是 12 个范式本身，而是这条设计原则：

```text
Every robot action should be traceable to an AugmentedInstruction.
Every AugmentedInstruction should preserve where each part came from.
```

也就是：

- 哪句话来自用户？
- 哪个目标来自手势/视觉 grounding？
- 哪个约束来自长期记忆？
- 哪个候选动作是模型建议的？
- 哪个动作经过用户确认？
- 哪个输出真正进入机器人执行？

如果这条链路清楚，agent harness 才能做长期交互、纠错、安全检查和可解释执行。
