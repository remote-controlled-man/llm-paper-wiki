---
type: paper_note
status: 精读中
priority: P0
venue: CHI 2026
title: "AgentHands: Generating Interactive Hand Gestures for Spatially Grounded Agent Conversations in XR"
slug: "2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR"
year: 2026
doi: "https://doi.org/10.1145/3772318.3790938"
local_pdf: "2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR.pdf"
pdf: "2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR.pdf"
primary_area: "04_Human_AI_Interaction"
tags:
  - CHI2026
  - embodied-agent
  - spatial-grounding
  - gesture-generation
  - XR
  - multimodal-interaction
  - agent-harness
---

# AgentHands

## 0. 先给结论

这篇比上一篇 `Interaction-Augmented Instruction` 实很多。上一篇主要是 taxonomy / conceptual model；这篇给了一个具体系统：让 XR 中的 AI agent 不只说话，还能生成同步、空间锚定、可交互的虚拟手势。

我们的定位：这篇适合作为 **具身 agent interaction output harness** 的参考。它不只是说“多模态交互很重要”，而是定义了一个中间表示 `GestureEvent`，让 LLM 生成带结构化手势标记的回答，再由本地 parser / scheduler / animation system 执行动作。

但也要注意：它不是完整机器人系统。它的用户研究是比较受控的，附录说明 study prototype 是 turn-based scripted transcript，用户 spontaneous speech 没有被真正处理；STT 主要用于检测用户说话并推进脚本。所以它的系统设计有工程价值，但评估不是完全自由输入的端到端 agent 评估。

一句话总结：

> AgentHands 把语言回答变成 `speech + structured GestureEvents + spatial anchors + hand animation`，解决空间任务里纯文本/语音需要用户自己做 mental mapping 的问题。

![Figure 1: AgentHands overview](raw/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR/assets/fig1_agenthands_overview.png)

图 1 说明它的目标：在 orchid-care 场景里，agent 可以指向气生根、演示浇水、提示排水、用禁止手势和视觉效果提醒不要过度施肥、用距离手势表达 30cm、最后和用户 high-five。

## 1. 输入/输出/数据类型/模态

这篇必须分两个模式看：object registration mode 和 conversation mode。

### 1.1 Object Registration Mode: 注册物体

这个模式负责把现实世界里的对象变成系统可引用的 `object registry`。

| 阶段                | 输入                                                                              | 数据类型/模态                          | 输出                                                                  |
| ----------------- | ------------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------- |
| 用户触发              | 用户说 "register this" + gaze                                                      | speech text + gaze ray           | 进入对象注册流程                                                            |
| 本地 XR 感知          | eye gaze, scene mesh, head pose, FPV RGB image                                  | 3D ray, mesh, pose matrix, image | 3D mesh intersection point + projected 2D point + cropped/FPV image |
| 后端 multimodal LLM | RGB image + projected intersection point + object registration prompt           | image + structured text prompt   | JSON object description                                             |
| 本地几何处理            | LLM JSON + camera intrinsics/extrinsics + head position + 3D intersection point | JSON + matrices + vectors        | oriented 3D bounding box                                            |
| registry 写入       | objectName, dimensions, semanticMap, 3D bbox                                    | object registry entry            | 后续 GestureEvent 可引用的物体/区域                                           |

对象注册 LLM 的输出是严格 JSON：

```json
{
  "objectName": "orchidPlant",
  "boundingBox2D": [340, 210, 680, 750],
  "dimensions": {
    "width": 0.15,
    "height": 0.4,
    "depth": 0.15
  },
  "defaultRegion": "T_middle_center",
  "semanticMap": {
    "flower": {
      "location": "T_middle_center",
      "description": "The decorative blooms of the plant."
    },
    "rootArea": {
      "location": "F_bottom_center",
      "description": "The base of the plant, including visible roots."
    }
  }
}
```

这比上一篇的 `Aug` 明确很多：这里真的有 schema。

![Figure 3: object registration pipeline](raw/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR/assets/fig3_object_registration_pipeline.png)

### 1.2 Conversation Mode: 生成回答和手势

对象注册完成后，用户开始问问题。核心 workflow 如下：

![Figure 4: AgentHands workflow](raw/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR/assets/fig4_agenthands_workflow.png)

系统输入：

| 输入名 | 来源 | 数据类型/模态 | 作用 |
|---|---|---|---|
| user query | STT | text string | 用户问题，例如 "How do I take care of my orchid?" |
| FPV + gaze | XR headset | image / gaze point / spatial context | 当前第一人称视野和注意点 |
| object registry | object registration | structured object list / semanticMap / region IDs | 给 LLM 可引用的物体和部位 |
| gesture definitions | static prompt | DSL grammar + allowed gesture IDs + few-shot examples | 约束 LLM 输出合法 GestureEvent |

LLM 输出：

| 输出 | 数据类型 | 说明 |
|---|---|---|
| augmented textual response | text with inline DSL tags | 普通自然语言回答中嵌入 `GestureEvent` |
| GestureEvents | structured inline command | 每个 event 绑定到某个 keyword，指定 gesture type 和参数 |

一个典型输出长这样：

```text
You can use [PointObject; spatiality:wateringcan_F_middle_center]this
watering can to water the orchid. Gently
[Action; gesture:hold, spatiality:orchid_R_bottom_center,
dynamics:pitchRotation]pour some water to the soil.
```

这里模型输出不是纯自然语言，也不是直接输出 3D hand pose。它输出的是：

```text
natural language + inline structured GestureEvent DSL
```

本地系统再把这个 DSL 解析成手势动画。

### 1.3 `GestureEvent` 是这篇最重要的中间表示

论文定义的格式：

```text
[id; attribute1:value1, attribute2:value2, ...]keyword
```

关键规则：

- `id`: 手势类型，例如 `PointObject`, `RegionOfObject`, `Action`, `Positive`, `Prohibition`。
- `attribute:value`: 参数，例如 `gesture:point`, `spatiality:orchidPlant_F_bottom_center`, `dynamics:pitchRotation`。
- `keyword`: 触发词，也就是这个手势要和哪一个 spoken word 对齐。
- 默认参数可以省略，减少 token。

工程上可以理解成：

```ts
type GestureEvent = {
  id: string;
  triggerKeyword: string;
  triggerWordIndex?: number;
  handedness?: "single" | "double";
  gesture?: "palm" | "fist" | "point" | "hold" | "grab" | "thumbUp" | "thumbDown" | "one" | "two" | "three" | "cylinder" | "cube" | "sphere";
  dynamics?: "static" | "rollRotation" | "pitchRotation" | "yawRotation" | "xTranslation" | "yTranslation" | "zTranslation";
  interactivity?: "none" | "highFive" | "shakeHand" | "holdHand";
  vfx?: "none" | "burn" | "freeze" | "glow" | "poisoned" | "spoil" | "explode";
  spatiality?: "midAir" | `${objectName}_${face}_${vRegion}_${hRegion}`;
};
```

这段 TypeScript 是我们的工程化理解；论文原始格式是 inline DSL。

### 1.4 Inline tag / DSL 到底是什么？

`inline tag` 的意思是：把动作指令直接嵌在要说的话里面。

论文不是让 LLM 单独输出一段 speech，再单独输出一组 tool calls，而是让模型输出这种混合文本：

```text
You can use [PointObject; spatiality:wateringcan_F_middle_center]this
watering can to water the orchid. Gently
[Action; gesture:hold, spatiality:orchid_R_bottom_center,
dynamics:pitchRotation]pour some water to the soil.
```

这里的：

```text
[PointObject; spatiality:wateringcan_F_middle_center]this
```

意思是：当 TTS 说到 `this` 这个词时，触发 `PointObject` 手势，目标是 `wateringcan_F_middle_center`。

这里的：

```text
[Action; gesture:hold, spatiality:orchid_R_bottom_center, dynamics:pitchRotation]pour
```

意思是：当 TTS 说到 `pour` 这个词时，触发 `Action` 手势，手势形态是 `hold`，目标是 `orchid_R_bottom_center`，动态是 `pitchRotation`。

`DSL` 是 domain-specific language，也就是作者为“手势事件”定义的小语言。它的语法就是：

```text
[gesture_event_id; parameters]trigger_keyword
```

这个设计的核心好处不是“比 tool calling 更高级”，而是它天然保留了 **speech-action alignment**：

```text
说到哪个词 -> 触发哪个动作 -> 指向哪个对象/区域
```

如果用传统 tool calling，通常会长这样：

```json
{
  "speech": "You can use this watering can to water the orchid.",
  "tool_calls": [
    {
      "tool": "PointObject",
      "args": {
        "target": "wateringcan_F_middle_center"
      }
    }
  ]
}
```

这个结构能表达“要调用什么工具”，但不一定表达“说到哪个词时调用”。为了达到论文的效果，传统结构化输出也必须显式加 trigger anchor：

```json
{
  "speech": "You can use this watering can to water the orchid. Gently pour some water to the soil.",
  "events": [
    {
      "type": "PointObject",
      "trigger_text": "this",
      "target": "wateringcan_F_middle_center"
    },
    {
      "type": "Action",
      "trigger_text": "pour",
      "gesture": "hold",
      "target": "orchid_R_bottom_center",
      "dynamics": "pitchRotation"
    }
  ]
}
```

所以准确理解是：

```text
论文形式: speech text + inline GestureEvent tags
工程本质: 一次 LLM 调用同时生成 speech plan 和 action plan
关键约束: action 必须绑定到 speech 里的 trigger word / span
```

对我们做产品，inline tag 适合原型，因为 prompt 简单、parser 直接。但更稳的实现应该是 structured output / function calling 风格，只是必须保留 `trigger_text`、`trigger_span` 或 `trigger_time`，否则 speech 和动作会脱节。

### 1.5 模型输入到底是什么模态？

这篇要比上一篇清楚：

| 模块 | 模型 | 输入模态 | 输出模态 |
|---|---|---|---|
| Object registration LLM | multimodal LLM | RGB image + projected intersection point + prompt | JSON |
| Response generation LLM | LLM / multimodal context | user text + FPV/gaze + object registry + gesture definitions | text + inline `GestureEvent` DSL |
| TTS | Gemini TTS | text | audio |
| local runtime | Unity / parser / scheduler | DSL + audio energy + word timeline + registry | hand pose / motion / VFX / interaction state |

所以它的关键不是“LLM 直接生成机器人动作”，而是：

```text
LLM 生成结构化 gesture command
local runtime 把 command grounded 到 object registry
animation engine 执行手势
```

这个分层对我们做机器人很重要。机器人不要直接相信 LLM 输出的连续控制；更合理的是让 LLM 输出可检查的中间动作符号，再由本地 planner/controller 执行。

### 1.6 结构化信息在这篇里到底给谁消费？

这篇和 `How Humans Naturally Refer to Targets` 的区别很清楚：

- `How Humans...` 主要解决输入侧 grounding：从 speech/gaze/head/hand/timing 推断用户指的目标，没有用 LLM 做这一步。
- `AgentHands` 主要解决输出侧 embodied expression：把已经注册好的 object registry、gesture DSL 和用户 query 给 LLM，让 LLM 生成 speech + GestureEvent。

所以 `AgentHands` 里结构化信息确实进入了 LLM，但不是所有东西都交给 LLM。系统仍然分层：

| 层 | 谁处理 | 作用 |
|---|---|---|
| object registration | multimodal LLM + 本地几何处理 | 生成 object registry 和 3D anchors |
| response/gesture planning | LLM | 输出 speech + inline GestureEvent |
| parsing/validation/scheduling | local runtime | 检查 event、绑定 trigger word、安排时序 |
| animation/execution | hand animation FSM / XR runtime | 播放空间锚定手势 |

这说明一个关键边界：LLM 可以消费结构化 context 并输出符号级 action event，但不应该直接控制连续动作、几何求解和安全执行。

## 2. Hand Gesture Taxonomy

作者先做了 N=10 formative study，归纳什么时候纯语言/文字不够，以及 XR hand agent 应该具备哪些属性。

核心场景包括：

- O1: spatial disambiguation，空间指代消解。
- O2: demonstrations of an action，动作演示。
- O3: conceptual representations，抽象概念可视化。
- O4: precision，尺寸/角度/距离等精确表达。
- O5: social cues，警告、鼓励、注意力、turn-taking 等社交线索。

然后作者定义了 6 个手势维度：

![Figure 2: hand gesture taxonomy](raw/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR/assets/fig2_hand_gesture_taxonomy.png)

| 维度 | 含义 | 对机器人/agent 的启发 |
|---|---|---|
| Handedness | 单手/双手 | 单手减少负担，双手适合比较、尺寸、双手任务 |
| Gesture | palm, fist, point, V-sign 等手形 | agent output 不只是语音，还可以有可解释动作词汇 |
| Spatiality | mid-air, object-anchored, object-region | 关键是把输出锚定到物体或物体局部 |
| Temporal Dynamics | static, rotation, shaking, pouring | 动作时序需要和语言触发词同步 |
| Interactivity | high-five, hold/shake hand | agent 的手不只是输出，也可以成为输入 surface |
| Visual Effects | burn, freeze, glow 等 | XR 可以表达物理机器人难表达的风险和状态 |

这里最值得我们借鉴的是 `Spatiality` 和 `Temporal Dynamics`：

- `spatiality` 解决“说的这个到底指哪里”。
- `temporal dynamics` 解决“动作什么时候出现才不打断理解”。

## 3. Gesture Library

作者把手势库分成三类：

![Figure 5: gesture library](raw/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR/assets/fig5_gesture_library.png)

| 类别 | 例子 | 用途 |
|---|---|---|
| Deictic | PointObject, RegionOfObject, DirectionOfObject | 指向对象、区域、方向 |
| Iconic | Action, ObjectProxy, Geometry1D/2D/3D, Numeric | 演示动作、形状、大小、数字 |
| Expression | Positive, Negative, Attention, Prohibition, Celebration, BurnEffect | 社交反馈、警告、鼓励、庆祝 |

对我们来说，这可以直接转成 robot/agent 的 output act taxonomy：

```text
AgentOutputAct =
  Refer(object/region/direction)
  Demonstrate(action/trajectory/tool-use)
  Quantify(length/area/volume/number)
  Warn(risk/negative consequence)
  Confirm(success/approval)
  Invite(user response / touch / confirmation)
```

## 4. Runtime 怎么把 LLM 输出变成手势？

系统不是让 LLM 直接控制手。它有三步本地执行：

### 4.1 Response Parsing

parser 从原始文本里抽出 `GestureEvent`，生成一个按 word index 查询的字典。

例如：

```text
3  -> PointObject; spatiality:wateringcan_F_middle_center
11 -> Action; gesture:hold; spatiality:orchid_R_bottom_center; dynamics:pitchRotation
```

### 4.2 Word-Level Alignment

TTS 生成语音后，系统要知道“当前播放到哪个词”。论文里做法是：

- 对 audio 计算平滑 RMS energy profile。
- tokenized transcript。
- 用词长、标点、上下文给每个词初始 duration。
- 把 word boundary 往 energy local minimum 附近微调。
- 得到 word-level timeline。

然后当播放到 trigger keyword 时，触发对应 GestureEvent。

### 4.3 Gesture State Machine

每只手有三个子状态：

- transform
- gesture
- vfx

如果是单手 gesture，系统找 idle hand；如果没有 idle hand，就分配给最久未切换的手。如果是双手 gesture，就两只手一起切换。若一段时间没有新 GestureEvent，就回 idle。

交互型动作如 high-five 通过异步 collision check 处理：如果用户手和 agent hand 碰撞，触发 high-five 完成；超时则恢复默认状态。

## 5. 算法/计算部分

这篇没有训练 loss，也没有神经网络模型公式。真正的计算部分主要在 object registration 的 3D bounding box 生成。

![Algorithm 1: 3D bounding box generation](raw/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR/assets/algorithm1_3d_bbox_generation.png)

这个算法输入：

| 输入 | 含义 |
|---|---|
| `bbox2D` | LLM 估计的 2D bounding box |
| `dims` | LLM 估计的真实世界宽高深 |
| `P_head` | 头显位置 |
| `M` | camera view matrix |
| `K` | camera intrinsic matrix |
| `P_intersect_3D` | gaze ray 与 scene mesh 的 3D 交点 |
| `P_intersect_2D` | 对应的屏幕 2D 交点 |
| `V_world_up` | 世界上方向 |

输出：

| 输出 | 含义 |
|---|---|
| `P` | 3D bounding box center |
| `R` | orientation matrix |
| `S` | size |

核心思路：

```text
用 gaze/head/intersection 决定 forward/up/right 坐标系
用 2D bbox center 反投影成 ray
用 ray-plane intersection 找到 box 前表面中心
沿 forward 方向回退 depth/2 得到 box center
```

这部分对机器人很有用，因为它说明了一个 practical trick：LLM/VLM 给语义和 2D/尺寸估计，本地几何模块负责变成稳定的 3D 空间对象。

## 6. STAR 法则精读

### S - Situation: 背景是什么？

空间任务里，纯文本/语音会制造 mental mapping gap。用户听到“把它放在窗户 30cm 外”“找到 3D 打印机的卡槽”“不要碰热端”，需要自己把抽象语言映射到真实空间对象和动作。

XR 提供了感知和显示能力，但很多 XR assistant 仍然依赖文字、语音、箭头、面板。这些能指示方向，却缺少人类面对面交流里的 co-speech gestures：指向、演示、警告、鼓励、确认。

### T - Task: 作者要解决什么？

作者要做一个 XR agent，它可以：

- 理解场景里的对象和区域。
- 生成带手势标记的语言回答。
- 把手势锚定到真实物体或物体局部。
- 让手势和语音中的关键词同步。
- 支持部分交互手势，比如 high-five。

### A - Action: 作者做了什么？

作者做了四件事：

1. 做 formative study (N=10)，归纳手势设计维度。
2. 定义 gesture taxonomy 和 gesture library。
3. 实现 AgentHands 系统，包括 object registration、LLM prompt、GestureEvent DSL、parser、TTS alignment、hand animation FSM。
4. 做 within-subjects user study (N=12)，比较 speech-only baseline 和 AgentHands。

### R - Result: 得到什么结果？

用户研究显示 AgentHands 在空间理解和体验上优于 baseline：

![Figure 8: user study results](raw/2026_CHI_AgentHands_Spatially_Grounded_Agent_Conversations_XR/assets/fig8_user_study_results.png)

显著提升的项目包括：

| 指标 | AgentHands 均值 | 结论 |
|---|---:|---|
| 更容易定位对象 | 6.50 | p < .05 |
| 更容易定位方向 | 6.33 | p < .05 |
| 更容易定位对象局部/组件 | 6.00 | p < .05 |
| 更容易理解动作 | 6.33 | p < .05 |
| 更容易注意到 warning | 6.25 | p < .05 |
| conversation 更 engaging | 6.08 | p < .05 |
| responses 更不难懂 | difficulty M = 1.83 | p < .05 |
| responses 更不难记 | difficulty M = 2.17 | p < .01 |

没有显著差异的项目：

- numeric information: Q6, p > .05。
- emotional expression: Q7, p > .05。
- SUS: AgentHands 80.6 vs baseline 70.4，但 p = .118，没有显著差异。

所以它的可靠结论是：手势对空间定位、动作理解、警告注意、参与感有帮助；对数字和情绪表达的帮助没证明出来。

## 7. 和上一篇 IAI 的关系

上一篇 IAI 说：

```text
T/I/A -> Aug -> G -> A/I
```

这篇 AgentHands 可以看成一个更具体的实现：

```text
T = user utterance after STT
I = gaze, hand interaction, high-five collision
A = object registry, FPV scene, 3D bbox, semanticMap
Aug = response generation prompt + registered objects + gesture definitions
G = Gemini response generation
Output = spoken response + GestureEvents + hand animation
```

关键区别：

- IAI 只说 `Aug` 是增强指令，没有 schema。
- AgentHands 给了一个实际 schema: object registry JSON + inline `GestureEvent` DSL。
- IAI 讲 interaction 进入 instruction；AgentHands 展示 instruction 如何变成 embodied output。

## 8. 对我们机器人/agent harness 的启发

### 8.1 不要让 LLM 直接输出底层控制

AgentHands 的分层是合理的：

```text
LLM: 生成符号级意图
Parser: 检查和解析结构化命令
Grounding: 绑定 object registry
Scheduler: 对齐时间
Controller/Animator: 执行低层动作
```

对应机器人：

```text
LLM: "point to cup", "warn hot surface", "demonstrate pouring"
Grounder: cup -> object_id / 3D pose / affordance region
Planner: generate reachable gesture/trajectory
Controller: execute robot arm/head/gaze/speech
Safety: validate no collision, no unsafe motion
```

### 8.2 `object registry` 是机器人长期交互里的核心对象

这篇的 object registry 很像我们应该有的 scene memory:

```ts
type SceneObject = {
  objectName: string;
  bbox2D?: [number, number, number, number];
  bbox3D?: {
    center: [number, number, number];
    rotation: number[][];
    size: [number, number, number];
  };
  defaultRegion: string;
  semanticMap: Record<string, {
    location: string;
    description: string;
  }>;
};
```

机器人里可以扩展成：

- object identity
- affordance regions
- last seen timestamp
- owner/user preference
- safety status
- manipulation constraints
- memory links

### 8.3 `GestureEvent` 可以泛化成 `EmbodiedActionEvent`

对实体机器人，`GestureEvent` 可以扩展成：

```ts
type EmbodiedActionEvent = {
  id: "PointObject" | "RegionOfObject" | "DemonstrateAction" | "Warn" | "Confirm" | "InviteUser";
  trigger: {
    wordIndex?: number;
    time?: number;
    condition?: string;
  };
  target?: {
    objectId?: string;
    region?: string;
    pose3D?: number[];
  };
  motion?: {
    bodyPart: "hand" | "arm" | "head" | "base" | "screen";
    type: "point" | "trace" | "hold" | "avoid" | "offer" | "nod";
  };
  modality?: {
    speech?: string;
    visual?: string;
    haptic?: string;
  };
  safety?: {
    requiresValidation: boolean;
    maxSpeed?: number;
    keepoutZones?: string[];
  };
};
```

这个比直接 prompt-to-action 安全，因为每个 event 都可以被 validator 检查。

### 8.4 长期陪伴关系里的价值

论文讨论里提到 personalization：用户的 dominant hand、reach comfort zones、环境规律、gesture tempo、对 overlay 的容忍度等，都可以成为 living profile。

对长期陪伴机器人，这对应：

- 用户偏好的解释方式：多演示还是少打断。
- 用户常用物品的位置和语义区域。
- 用户对提醒/警告的接受方式。
- 用户是否喜欢触碰/击掌/确认类互动。
- 文化差异：例如 thumbs-up 在不同文化中不一定合适。

所以这篇对长期记忆的启发不是“记聊天内容”，而是记 **spatial and sensorimotor preferences**。

### 8.5 映射到我们的硬件：显示器 + 单臂支架 + 双摄

我们的机器人不是 XR hands，也不是 humanoid hands，而是：

```text
screen / display
+ single-arm robotic support
+ two cameras
```

所以不能照搬论文里的 `hand gesture`。更合理的是把它抽象成 **embodied display output**：用屏幕、支架/单臂运动、语音、视觉高亮一起表达意图。

AgentHands 的 6 个维度可以改写成：

| AgentHands 维度 | 我们机器人的对应 | 例子 |
|---|---|---|
| Handedness | 输出通道选择：屏幕、单臂、屏幕+单臂协同 | 只在屏幕画箭头；支架转向目标；边说边转屏幕 |
| Gesture | 单臂/支架姿态、屏幕表情、icon、UI 动画 | 指向、点头式运动、摇头式运动、警告图标 |
| Spatiality | 摄像头识别到的对象、人、区域、工作台位置 | `cup_12`, `table_edge_3`, `user_left_hand` |
| Temporal Dynamics | 运动轨迹、屏幕动画、语音触发时机 | 说到“这个”时屏幕转向杯子；说到“危险”时红框闪烁 |
| Interactivity | 用户如何回应机器人表达 | 触屏确认、语音确认、手势、靠近、递物、阻挡 |
| Visual Effects | 屏幕 UI / 光效 / 高亮 / 表情 / 警告色 | bbox、高亮、箭头、红色 warning、笑脸/疑问表情 |

因此，我们不应该直接做 `GestureEvent`，而应该做自己的 `EmbodiedDisplayActionEvent`：

```ts
type EmbodiedDisplayActionEvent = {
  type:
    | "OrientBody"
    | "PointWithArm"
    | "ShowHighlight"
    | "ShowWarning"
    | "AskConfirmation"
    | "IdleMotion"
    | "ExpressEmotion";
  trigger?: {
    text?: string;
    span?: [number, number];
    time?: number;
  };
  target?: {
    objectId?: string;
    region?: string;
    pose3D?: [number, number, number];
  };
  outputChannels: Array<"speech" | "screen" | "arm" | "sound">;
  screen?: {
    visual: "bbox" | "arrow" | "icon" | "text" | "face" | "animation";
    style?: "neutral" | "warning" | "confirming" | "celebratory";
  };
  arm?: {
    motion: "orient" | "point" | "nod" | "shake" | "approach" | "retreat";
    speed?: "slow" | "normal" | "fast";
  };
  safety?: {
    requiresCollisionCheck: boolean;
    keepoutZones?: string[];
  };
};
```

一个典型输出不是：

```text
[PointObject; spatiality:wateringcan_F_middle_center]this
```

而是：

```json
{
  "speech": "你是说这个红色杯子吗？",
  "events": [
    {
      "type": "OrientBody",
      "trigger": { "text": "这个" },
      "target": { "objectId": "cup_12" },
      "outputChannels": ["speech", "arm", "screen"],
      "screen": { "visual": "bbox", "style": "confirming" },
      "arm": { "motion": "orient", "speed": "normal" },
      "safety": { "requiresCollisionCheck": true }
    }
  ]
}
```

双摄的价值在前置感知层：

```text
camera streams
-> object detection / depth / user pose / gesture / attention estimate
-> scene registry
-> LLM structured output
-> screen + arm + speech synchronized execution
```

这篇论文真正对我们有用的不是“生成手势”，而是这条原则：

```text
把要说的话和具身输出绑定到同一个 structured event，
并且让这个 event 指向可验证的空间对象/区域。
```

## 9. 局限和不要误读

### 9.1 它的确有工程实现，但评估不完全端到端

论文系统有真实实现：Unity、Galaxy XR、Gemini、STT/TTS、OpenXR、object registry、parser、animation。

但用户研究任务是 scripted transcript。附录写得很清楚：prototype 是 turn-based conversational system，和 backend server fully decoupled；local STT 只检测用户说话并推进脚本；spontaneous user speech was not processed。

所以不要误读成：他们已经证明了一个开放式 XR LLM agent 在真实自由对话里稳定工作。

### 9.2 Scene understanding 还比较轻

它依赖 pre-scan / pre-registration 的 object registry，适合相对静态环境。作者也承认未来要接 continuous 3D perception、SLAM semantic mapping、online adaptive scene understanding。

### 9.3 手势库是人工有限集合

Gesture library 是人工 curated 的有限集合。作者提到未来可以让 LLM 基于 taxonomy 动态合成新 GestureEvents，但现在还没有真正做到。

### 9.4 不是机器人动作控制论文

它是 XR hand embodiment，不是实体机械臂控制。实体机器人会多出：

- collision constraints
- dynamics
- reachability
- actuator limits
- human safety envelope
- compliance / impedance control

所以我们可以借鉴中间表示和 harness 分层，但不能直接照搬动作执行。

## 10. 这篇到底有没有用？

有，而且比上一篇更有工程价值。

它真正可借鉴的东西：

- `GestureEvent` inline DSL。
- object registry schema。
- region encoding: `objectName_face_vRegion_hRegion`。
- LLM 输出结构化 action event，本地 runtime 执行。
- word-level alignment 让 gesture 和 speech 同步。
- hand/action taxonomy 可转成 robot output act taxonomy。

它不够的地方：

- 用户研究不是真自由对话。
- 感知依赖预注册，动态环境能力弱。
- 没有严肃的安全/validation 层。
- 没有长期记忆实现。
- 没有实体机器人执行约束。

我的判断：这篇可以放进我们技术路线的“具身输出表达 / spatial grounding / action event DSL”模块，不适合作为完整 agent harness 总架构。

## 11. 下一步精读问题

1. `GestureEvent` 能不能扩展成机器人通用 `EmbodiedActionEvent`？
2. object registry 应该如何和长期记忆、场景图、semantic map 合并？
3. LLM 输出 event 后，本地 validator 应该检查哪些字段？
4. 如何处理 LLM 生成了不存在的 object/region？
5. gesture 与 speech 对齐是否应该依赖 TTS timestamps，而不是 RMS heuristic？
6. 对实体机器人，high-five / touch interaction 的 safety envelope 怎么定义？
7. 这套方式能不能用于 non-XR robot，比如实体机器人 + 屏幕/投影/手臂？
