---
title: "Full-Duplex-Bench-v3: Benchmarking Tool Use for Full-Duplex Voice Agents Under Real-World Disfluency"
slug: "2026-04_Full_Duplex_Bench_v3_2604.04847"
year: 2026
type: paper
source: arXiv:2604.04847v1
arxiv: "2604.04847"
url: https://arxiv.org/html/2604.04847v1
status: guided_read_done
area:
  - full-duplex voice agents
  - tool use
  - benchmark
  - disfluency
  - realtime interaction
relevance_to_us: high
pdf: "2026-04_Full_Duplex_Bench_v3_2604.04847.pdf"
updated: 2026-06-08
tags: []
primary_area: "03_Agents"
---

# Full-Duplex-Bench-v3

## 0. 先说结论

这篇不是提出一个新的 full-duplex 语音模型，也不是讲 hidden state 或 Moshi 架构。

它是一篇 benchmark paper，核心问题是：

> 真实用户用不流畅的自然语音说任务时，full-duplex voice agent 能不能正确调用工具、处理打断/停顿/自我修正，并在合理延迟内把结果说回来？

它和我们前面读的 Moshi / hidden-state paper 的关系是：

- Moshi 那条线：底层语音模型怎么一边听一边说。
- hidden-state 那篇：模型内部有没有 turn-taking 信号。
- 这篇 FDB-v3：真实语音 agent 在工具调用任务里表现怎样，尤其面对口误、自我修正和多步 API 调用。

所以这篇更贴近你们的 agent harness / 语音机器人产品评测。

它的价值是：

```text
把 full-duplex voice agent 的评测从“会不会聊天/会不会接话”
推进到：
  真实口语 + disfluency + 多步工具调用 + 延迟 + 打断
```

它的局限也很明确：

```text
它评测现有模型，不提出新算法；
它用 mock APIs，不是真实复杂外部服务；
它不涉及机器人视觉、动作、长期记忆；
它主要是 voice-agent tool-use benchmark。
```

## 1. 白话版：这篇到底在测什么？

想象用户说：

```text
Book me a flight um... to New York — actually, wait... make that Boston.
```

一个好的 voice agent 要做几件事：

1. 不要被 `um...` 这种 filler 干扰。
2. 不要听到 `New York` 就立刻锁死参数。
3. 要听懂用户后来改成了 `Boston`。
4. 要正确调用 `search_flights(destination="Boston")`。
5. 如果需要多步工具调用，还要按顺序执行。
6. 不要太慢。
7. 不要在用户还没说完时抢话。

这篇就是把这些能力做成了一个 benchmark。

![FDB-v3 framework](raw/2026-04_Full_Duplex_Bench_v3_2604.04847/assets/fig1_fdb_v3_framework.png)

## 2. STAR 速读

### Situation

文本 agent 已经能做工具调用，但 voice agent 大多还停留在聊天或简单任务。真实语音交互比文本难：

- 用户会停顿。
- 用户会说 `um`、`uh`。
- 用户会自我修正。
- 用户可能说到一半改意图。
- 系统必须低延迟回应。
- 系统不能随便打断用户。

现有 benchmark 要么用合成语音，要么只测单步工具，要么不测 disfluency。

### Task

作者要构造一个 benchmark，评估 real-time full-duplex voice agents 在真实人声、自然不流畅表达、多步工具调用下的表现。

### Action

他们构建了 `Full-Duplex-Bench-v3`：

- 100 条真实人类录音。
- 12 个 speaker。
- 包含 native / non-native English speakers。
- 录音来自 uncontrolled environments。
- 标注 5 类 disfluency。
- 4 个任务域。
- 本地 mock APIs，确定性返回。
- 每个 scenario 要求一个或多个 API calls。
- 评测 6 个系统：
  - GPT-Realtime
  - Gemini Live 2.5
  - Gemini Live 3.1
  - Grok
  - Ultravox v0.7
  - Cascaded pipeline: Whisper -> GPT-4o -> TTS

### Result

主要结果：

- GPT-Realtime 总体最好，Pass@1 = 0.600，Tool Selection F1 = 0.876，Argument Accuracy = 0.680。
- Gemini Live 3.1 最快，Task Completion Latency = 4.25s，但 turn-take rate 只有 78.0%，有 22 个场景没语音回应。
- Cascaded pipeline turn-take rate = 100%，但最慢，Task Completion Latency = 10.12s。
- Ultravox filler rate = 88.0%，interruption rate = 47.9%，说明它常用 filler 抢先说话，容易打断用户。
- 所有系统都很难处理 self-correction，连 GPT-Realtime 也只有 0.588。

## 3. Benchmark 怎么构造？

### 3.1 四个任务域

论文使用本地 mock APIs，不连真实外部服务。这样做是为了排除网络波动，让延迟主要反映模型处理能力。

4 个 domain：

| Domain | Mock API examples |
|---|---|
| Travel & Identity | search_flights, book_ticket, update_travel_profile |
| Finance & Billing | query_card_benefits, calculate_currency_exchange, modify_autopay_source |
| Housing & Location | search_apartments, update_search_filter |
| E-Commerce Support | check_order_status, cancel_pending_action, process_exchange |

这对我们有启发：做机器人/agent 评测时，也应该先用 deterministic mock APIs，把模型能力和外部系统不稳定性分开。

### 3.2 三个难度等级

场景分成：

- `Easy`：单步工具。
- `Medium`：两步工具，有一定歧义。
- `Hard`：多步工具，有冲突约束。

这不是只测“能不能识别一个函数名”，而是测多步流程、参数传递、状态更新。

### 3.3 五类 disfluency

论文标注了五类真实口语不流畅：

| 类型 | 人话解释 | 主要测试什么 |
|---|---|---|
| filler | `um`, `uh` | 冗余词会不会干扰理解或增加延迟 |
| pause | 中间停顿 | 系统会不会误判用户说完 |
| hesitation | filler + repetition | 犹豫和重复会不会影响工具调用 |
| false start | 说了一个开头又放弃 | 模型能不能丢掉废弃意图 |
| self-correction | 中途改参数/改意图 | 模型能不能 state rollback |

最重要的是 self-correction。

因为真实用户经常这样：

```text
订去 Rome 的机票，不对，改成 Milan，日期也从 June 1 改成 June 3。
```

这个时候 agent 不能把旧参数提前锁死。

## 4. 指标怎么理解？

这篇不是只看一个 accuracy，而是同时看工具调用和语音交互体验。

### 4.1 Tool-use metrics

`Tool Selection F1`：

```text
应该调用哪些工具，实际调用了哪些工具。
漏调会扣 recall，乱调会扣 precision。
```

`Argument Accuracy`：

```text
工具参数是否语义正确。
比如 destination 应该是 Boston，不能还是 New York。
```

论文用 GPT-4o judge 参数语义是否正确，以容忍日期格式、缩写等变化。

`Pass@1`：

```text
最严格：
  工具必须完全正确
  参数必须完全正确
  每个调用都要正确
任何一个失败都算失败
```

`Response Quality`：

```text
工具调用对了以后，说给用户的自然语言回复是否真的满足需求。
```

### 4.2 Turn-taking / latency metrics

`Turn-take rate`：

```text
系统是否在该回应的时候给了自然时机的回应。
```

`Interruption rate`：

```text
系统是否在用户还没说完时开始说话。
```

`Latency`：

论文拆成三类：

- `First Word Latency`：系统第一次开始说话要多久。
- `Tool Call Latency`：第一次 API 调用要多久。
- `Task Completion Latency`：系统说出关键答案要多久。

`Filler Rate`：

```text
系统是否先说“Let me check that”这种没有关键信息的 filler。
```

这个指标很重要，因为很多系统会用 filler 降低“用户感知等待”，但 filler 也可能抢话、打断用户。

## 5. 总结果怎么读？

![Overall performance and turn-taking](raw/2026-04_Full_Duplex_Bench_v3_2604.04847/assets/table2_overall_performance_turn_taking.png)

### 5.1 GPT-Realtime

总体最强：

- Tool Selection F1：0.876
- Argument Accuracy：0.680
- Response Quality：0.792
- Pass@1：0.600
- Interruption：13.5%，最低

它不是最快，但 accuracy / turn-taking balance 最好。

### 5.2 Gemini Live 3.1

最快：

- Latency：4.25s
- Tool Call：2.21s
- First Word：3.95s

但问题是：

- Turn-take rate：78.0%，最低。
- 22 个场景没有语音回复。

论文称它为 `silent worker`：很多时候工具调用做了，但没有把结果说出来。

### 5.3 Cascaded pipeline

传统管线：

```text
Whisper -> GPT-4o -> OpenAI TTS
```

优点：

- Turn-take rate：100%。

缺点：

- Latency：10.12s，最慢。
- Pass@1：0.450，比 GPT-Realtime 低。
- self-correction 很差，只有 0.176。

原因很现实：ASR 可能在用户修正前就把旧内容 finalize 了，后面的 LLM 没机会正确 rollback。

### 5.4 Ultravox

问题比较明显：

- Filler rate：88.0%。
- Interruption：47.9%。

它经常先说 filler，比如 “Let me check that”，但这会打断还没说完的用户，而且工具调用反而晚。

## 6. Disfluency / difficulty / domain

![Disfluency and difficulty breakdown](raw/2026-04_Full_Duplex_Bench_v3_2604.04847/assets/table3_4_disfluency_difficulty.png)

### 6.1 Self-correction 最难

Self-correction 分数：

- GPT-Realtime：0.588
- Gemini Live 2.5：0.471
- Gemini Live 3.1：0.353
- Grok：0.294
- Ultravox：0.353
- Cascaded：0.176

这说明当前模型最大问题不是听不懂 `um`，而是用户中途改意图时，模型已经提前提交了旧参数。

### 6.2 难度越高越掉

Hard 场景中：

- GPT-Realtime：0.433
- Gemini Live 3.1：0.300
- Gemini Live 2.5 / Ultravox：0.267
- Cascaded：0.233
- Grok：0.200

这说明多步 reasoning + disfluent speech 仍然是明显短板。

![Domain and latency breakdown](raw/2026-04_Full_Duplex_Bench_v3_2604.04847/assets/table5_6_domain_latency.png)

### 6.3 Finance 最容易，Housing 最难

Finance 最高，Housing 最低。

论文解释上可以理解为：

- Finance 的工具参数更结构化。
- Housing 涉及多实体、多约束、复杂筛选条件，更难。

## 7. 两个 case study 很关键

![Case studies](raw/2026-04_Full_Duplex_Bench_v3_2604.04847/assets/table7_8_case_studies.png)

### 7.1 Case 1：没有 disfluency 的三步 finance chain

任务：

```text
1. convert 1,000 USD to EUR
2. update credit-card autopay to savings
3. check premium-card benefits
```

结果：

- GPT-Realtime / Gemini Live 2.5 / Gemini Live 3.1 / Grok 都工具和参数全对。
- Gemini Live 3.1 完成最快：3.92s。
- GPT-Realtime：9.20s。

这说明如果用户说得很清楚，并且没有中途修正，快速并发处理很有优势。

### 7.2 Case 2：双重 self-correction

用户中途改了两个参数：

```text
destination: Rome -> Milan
date: June 1 -> June 3
```

结果：

- 只有 GPT-Realtime 完全处理正确。
- Gemini Live 3.1 在用户说完前 2.27s 就调用工具，锁死了旧 destination=Rome。
- Cascaded pipeline 也用了 Rome，因为 Whisper 可能在 correction 到来前 finalize 了旧转写。
- Ultravox 参数对了，但提前 1.36s 开始说无关 filler，打断用户。

这就是这篇最关键的结论：

> 越早处理越快，但越早提交工具参数，越容易在用户改口时锁死旧状态。

## 8. 和我们做 interaction model 的关系

这篇非常值得你们看，因为它把 voice agent 的问题讲到了产品关键点：

```text
不是“模型会不会说话”
而是：
  用户说得乱的时候，它能不能等对时机？
  用户改口的时候，它能不能 rollback？
  它能不能区分暂存参数和确认参数？
  它能不能在不抢话的情况下提前处理？
```

对你们的机器人/agent harness，直接启发是：

### 8.1 需要 provisional state，不要太早 commit

真实系统应该区分：

```text
provisional state:
  用户刚提到，但还可能修改

committed state:
  用户确认过，或者话轮/语义上已经稳定
```

例如：

```text
destination = Rome   # provisional
destination = Milan  # correction after "actually"
```

如果系统一听到 Rome 就调用 `search_flights(Rome)`，就会出现 Gemini Live 3.1 的问题。

### 8.2 turn-taking 不只是“什么时候说”

这篇把 turn-taking 和 tool-use 绑在一起：

```text
什么时候开始说 filler？
什么时候调用工具？
什么时候把参数 commit？
什么时候允许用户继续改？
什么时候播报结果？
```

这些都属于 interaction model。

### 8.3 filler 是把双刃剑

Filler 可以降低用户感知等待：

```text
Sure, let me check that.
```

但如果用户还在说话，filler 就是打断。

所以好的系统不能简单“先说一句 filler”，而要结合：

- VAD / endpointing。
- turn-taking estimator。
- 用户是否处于 pause / hesitation / self-correction。
- 工具是否已经产生可靠结果。

### 8.4 传统 cascaded pipeline 的问题很现实

Whisper -> LLM -> TTS 的结构工程上容易做，但在 self-correction 和实时性上有天然瓶颈：

```text
ASR 可能提前 finalize 错误内容
LLM 拿到的是旧文本
后续 correction 没进入正确状态
TTS 又增加延迟
```

这解释了为什么端到端 voice model 在实时交互里会有优势。

## 9. 这篇不是在解决什么？

这篇没有解决：

- 怎么训练一个 full-duplex 模型。
- hidden state 里有什么 turn-taking 信号。
- 机器人视觉 grounding。
- 机器人动作规划。
- 长期陪伴记忆。
- 真实 API failure / timeout / permission denied。

它做的是评测：

```text
现有 voice agents 在真实口语 + 多步工具调用 + 低延迟场景下，到底哪里失败。
```

## 9.5 Q&A：这些模型的 tool use 是不是 RL 出来的？output 是什么样？

### 9.5.1 tool-use 能力是不是预训练后专门 RL 出来的？

论文没有披露 GPT-Realtime、Gemini Live、Grok 这些专有模型的训练细节，所以不能说它们的工具调用能力一定是 RL 出来的。

更准确的说法是：

```text
这些系统已经具备了产品/API 层面的 tool calling 能力；
FDB-v3 测的是它们暴露出来的实时语音工具调用行为，
而不是分析它们内部到底经过了 SFT、RLHF、RLAIF、DPO、RL 还是其他 post-training。
```

一般现代 agent model 的 tool-use 能力通常来自多种来源组合：

```text
基础预训练
  -> 学语言、世界知识、代码/API 格式、一般推理

instruction tuning / SFT
  -> 学会按工具 schema 输出函数名和参数

偏好优化 / RLHF / RLAIF / DPO / RL
  -> 学会什么时候调用、少乱调、调用后如何继续回复

runtime tool schema + system prompt
  -> 告诉模型当前有哪些工具、参数是什么、什么时候该用
```

但对这篇论文来说，不能把 benchmark 结果反推出“某模型一定是 RL 训练出来的”。论文只评测结果，不打开训练配方。

Ultravox 在相关工作里被描述为 open-weight exception，融合 pretrained backbone 和 Whisper encoder 来支持 native tool use；但论文同样没有在这里展开它的完整训练路线。

### 9.5.2 评测里 output 到底是什么？

这里的 output 不是单一文本。voice agent 实际有两类输出：

```text
1. 工具调用输出：
   function name + arguments

2. 语音/文本回复输出：
   agent 最后对用户说的话，通常会有 transcript 用于评测
```

在 FDB-v3 里，工具调用会被映射到本地 mock APIs，例如：

```text
search_flights(destination="Boston", date="...")
book_ticket(passenger_name="...", flight_id="...")
calculate_currency_exchange(amount=1000, from_currency="USD", to_currency="EUR")
```

评测系统会记录 actual tool calls，然后和 expected tool calls 比较：

```text
expected:
  search_flights(destination="Boston", date="June 3")

actual:
  search_flights(destination="Rome", date="June 1")
```

如果工具名错了，Tool Selection F1 下降。
如果工具名对但参数错了，Argument Accuracy 下降。
如果整个工具链任何一步错了，Pass@1 失败。

### 9.5.3 对外 API 里的 raw output 可能长什么样？

不同厂商 raw schema 不一样，但典型函数调用事件会长得像：

```json
{
  "type": "function_call",
  "name": "search_flights",
  "call_id": "call_xxx",
  "arguments": "{\"destination\":\"Boston\",\"date\":\"June 3\"}"
}
```

工具执行后，应用再把结果作为 tool output 塞回模型：

```json
{
  "type": "function_call_output",
  "call_id": "call_xxx",
  "output": "{\"flight_id\":\"F123\",\"price\":420}"
}
```

然后模型继续生成语音回复：

```text
I found a flight to Boston on June 3 for $420. Would you like me to book it?
```

这篇论文的评测关注的是：

```text
模型有没有在正确时机发出正确 function call；
arguments 是否使用了用户最终确认后的参数；
工具结果有没有被正确说给用户；
说话时机是否打断用户；
总延迟是多少。
```

### 9.5.4 为什么 self-correction 特别难？

因为实时 voice agent 可能在用户还没说完时就已经开始 tool call。

例如用户说：

```text
Book me a flight to Rome... actually make that Milan, June 3.
```

如果模型在听到 `Rome` 后立刻调用：

```text
search_flights(destination="Rome")
```

后面用户改成 Milan，它就需要 rollback。

这要求系统内部区分：

```text
provisional arguments:
  暂存参数，用户刚提到，可能会变

committed arguments:
  已确认参数，可以调用工具
```

这正是 FDB-v3 对我们有启发的地方：voice agent 的 tool-use 不只是“会输出 JSON”，而是要决定什么时候把用户口语中的临时状态变成不可逆的工具调用。

### 9.5.5 tool call 和 World-Action Model 里的 action 有什么区别？

从最抽象的角度看，tool call 确实是一种 action：

```text
agent 观察到用户输入
  -> 选择一个动作
  -> 动作改变外部状态
  -> 得到结果/反馈
```

所以你的直觉是对的。

但 FDB-v3 里的 tool call 和机器人 World-Action Model 里的 action 不是同一层东西。

| 维度 | FDB-v3 tool call | World-Action Model action |
|---|---|---|
| 动作形式 | 离散函数名 + JSON 参数 | 可能是 subgoal、constraint、action chunk、轨迹、控制命令 |
| 作用对象 | 数字 API / mock service | 物理世界、机器人身体、物体、人、环境状态 |
| 执行时间 | 通常一次调用，事务式 | 常常是连续时间、闭环、多步执行 |
| 反馈 | API 返回结构化结果 | 视觉/力觉/语音/状态变化/失败信号 |
| 风险 | 参数错、调用错、状态 rollback 失败 | 碰撞、误抓、误导航、伤人、社交打断、安全边界 |
| 世界模型需求 | 较弱，主要是 schema 和状态更新 | 强，需要预测动作后果、可达性、失败概率 |
| 可逆性 | 有些 API 可撤销，有些不可撤销 | 物理动作经常不可完全撤销 |

所以更准确的关系是：

```text
tool call 是 action 的一种符号化、离散化、API 化特例。
World-Action Model 的 action 是更广义的 embodied / environment action。
```

对 I-WAM 来说，可以这样分层：

```text
Voice / interaction layer:
  decide when to listen, speak, wait, confirm

Agent harness layer:
  decide whether to call tool
  output: function_name + arguments

World-Action Model layer:
  decide subgoal / constraint / value / action plan
  output: robot-relevant action representation

Low-level policy / controller:
  execute motor commands or action chunks
```

所以 FDB-v3 对 I-WAM 的启发不是“tool call 就等于机器人 action”，而是：

```text
在真实交互里，action commit 的时机很关键。
不管是 call API，还是让机器人伸手拿东西，
都要区分 provisional state 和 committed action。
```

例如：

```text
用户：拿那个杯子，不对，拿旁边那个红色的。
```

这和 FDB-v3 的：

```text
Book Rome... actually Milan.
```

结构上很像。

共同难点是：

```text
系统不能太早把临时意图变成不可逆动作。
```

### 9.5.6 但机器人 action 可以先动吗？

可以，而且这正是机器人 action 和 API tool call 的重要区别。

API tool call 往往更像事务：

```text
call search_flights(Rome)
  -> 外部服务返回结果
  -> 旧参数已经进入执行链
```

机器人 action 往往是连续过程：

```text
orient head
move base
reach
pre-grasp
grasp
lift
handover
```

中间很多阶段是可以停、可以改、可以转向的。

所以机器人不一定要等到 100% 确认才开始动作。更合理的是把 action 分成不同 commitment level：

```text
Level 0: perceptual preparation
  看向目标、更新地图、识别物体

Level 1: reversible movement
  朝可能目标移动、调整身体朝向、靠近桌子

Level 2: low-risk pre-action
  伸手到安全预备位、打开夹爪、减速靠近

Level 3: commitment action
  抓取、搬起、倒水、按按钮、开门、提交订单

Level 4: irreversible / high-risk action
  递交药物、付款、删除数据、强力接触、进入人身空间
```

用户中途改口时，系统可以：

```text
如果还在 Level 0-2:
  stop / replan / redirect

如果已经进入 Level 3:
  pause safely / release / undo if possible / ask confirmation

如果将进入 Level 4:
  必须先确认，不能靠“之后再改”
```

所以 FDB-v3 对机器人不是简单地说“不要太早 action”，而是提醒我们：

> action 需要有 staged commitment。越可逆、越安全、越低成本的动作，可以越早开始；越不可逆、越高风险、越影响用户的动作，越需要等待确认。

这也说明 I-WAM 里的 World-Action Model 不应该只输出一个最终动作，而应该输出：

```text
candidate_action
commitment_level
interruptibility
rollback_plan
safety_margin
confirmation_needed
```

这样机器人可以边听边做准备动作，同时保留随时响应用户修正的能力。

## 10. 一句话带走

> FDB-v3 说明，下一代 voice/robot agent 的核心难点不只是降低延迟，而是在用户真实口语的停顿、犹豫、改口中，决定何时暂存、何时提交、何时调用工具、何时说话，以及如何避免打断。
