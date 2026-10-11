---
type: web_source
title: "Introducing System One Models & Jev (TypeSafe AI 官方发布文)"
slug: "2026-09_TypeSafe_Jev_Launch_Post"
year: 2026
status: skimmed
url: "https://typesafe.ai/blog/introducing-system-one-models-and-jev"
author: "Diogo Almeida"
published: "2026-09-15"
tags: [jev, system-one, decision-model, rlcd]
primary_area: "03_Agents"
added_date: "2026-09-19"
note: "原始网页剪藏（正文忠实保留，图片以占位符略去）。发布日期 2026-09-15，抓取日期 2026-09-19。"
---

# Introducing System One Models & Jev

_Diogo Almeida, founder, TypeSafe_

Models have been superhuman at chat for years, so where is all the automation?

This has been my driving question for the last four years. At OpenAI, I helped build the methods that made language models useful at following instructions and talking with people. That work ended up as the research behind ChatGPT. At the time, I thought maybe chat models would lead to AGI, but despite the hype it became obvious to me that there was something really big missing.

After two years in stealth, countless technical challenges, and research breakthroughs… I am beyond excited to announce that today, TypeSafe AI is releasing our first **System One Model**: a new class of frontier models built to make fast, structured decisions that software can use directly.

We built a new stack entirely focused on automation: with a new model architecture, parallel sampler for maximum efficiency, and training method we call Reinforcement Learning for Calibrated Decisions (RLCD).

Our first public model is **Jev**, available today in early access. Jev achieves similar levels of intelligence on System One tasks compared to existing LLMs, while being two orders of magnitude faster and more efficient. While Jev gives up string generation, it's optimized for structured outputs and _can't_ hallucinate.

Think of Jev as a frontier-intelligence function call: unstructured state in, typed probabilistic decisions out.

## Frontiers, Old and New

| | **Existing LLMs** | **System One + Jev** |
| --- | --- | --- |
| Optimized with | RLHF / RLVR | Reinforcement Learning for Calibrated Decisions (RLCD) |
| Optimizes for | Human preference; verifiable rewards | Calibrated decisions: answers with epistemically honest probabilities on System One tasks |
| Inputs | Unstructured data with emphasis on sequential messages | Unstructured data with emphasis on structured program state |
| Outputs | Strings / generated text; need parsing + validation; risk of going off rails | Type-safe structured values; never makes type errors; calibrated probabilities and confidence scores |
| Sampling | Sequential, one token at a time | Parallel; all outputs in a single query |
| Cost | Input $0.20–$10/MTok; output ~5x input | Input $0.042/MTok ($42 per billion tokens); output FREE |
| Speed | 3–329 seconds end-to-end | 70ms–500ms end-to-end (40x–200x faster) |
| Confidence | Tend to be overconfident and inconsistent | Always communicates calibrated confidence with every output |
| Use cases | Human-in-the-loop tasks; verifiable problems; demos | AI-powered workflows / smart if-statements; map-reduce over big data; real-time applications; verify/guardrail LLM outputs |

## Evidence / Technical Results

Easily verifiable claims:

- **Speed per call:** published evals run from laptops on the West Coast (where the service is based).
- **Cost per call:** transparent pricing; can't prove it isn't subsidized.
- **No type errors:** mathematically impossible by construction (schema matching is guaranteed).

### Side-by-side demonstration

Jev outputs all probabilities in parallel instead of autoregressively generating by token. Nuance: the demo query is simplified with descriptive keys; short dense `state` paints the model in an advantageous light; only disagreement with GPT-5.6 Terra was on "Churn likelihood level" (genuinely ambiguous); GPT-5.6 Terra with default reasoning chosen as most comparable on average.

### Workflow evals

A new evaluation type: assume a correct compute graph ("workflow" in code); use the predictions of the largest, most expensive external models as reference probabilities. Every model gets the same workflow; compared against the average of the smartest models (GPT-6 Astra and Fable 5.1). Claimed result: Jev owns the Pareto frontier for almost 2 orders of magnitude (193.6x faster, 444.6x cheaper figures on homepage; admitted to be on the higher end of real-world gains).

Nuance: workflows were made by TypeSafe's own model capabilities team (potential bias), though not in training distribution; using Astra/Fable average as reference biases toward OpenAI/Anthropic models (likely underestimates DeepSeek etc.); LLMs use TypeSafe's System One LLM wrapper to emit structured decisions.

### Hallucination and Type-safety

LLM hallucination/type-error numbers come from OpenRouter (admitted bias: complex queries routed to better models). Jev's 0% figure is NOT empirical — schema matching is guaranteed, so 0% is added by construction.

### Fun Demos

- **Doom**: ~10 queries/second (~$7/hour); structured state as data structure with text, not images (yet); a non-AI bot could play better; the point was instruction-following reactivity.
- **Wikiracing**: link-traversal game with hundreds–thousands of choices per step. Speedups smaller here because compared against non-reasoning modes (except Astra at lowest reasoning). Jev supports cardinality up to 255; higher cardinality uses a 2-stage system (independent scoring then explicit choice), causing occasional slowdowns.

## What's next

Early access opening; developers coming off the waitlist.

### FAQ (questions listed; several unanswered in post)

- Where do the names come from? — Kahneman's System 1/System 2; "Jev" after William Stanley Jevons (Jevons paradox: every order-of-magnitude drop in the cost of intelligence unlocks orders of magnitude more use cases).
- Why was a new training algorithm needed? — (question posed, no substantive answer given)
- Is Jev just a smaller LLM? — (posed, unanswered)
- How does Jev perform against public benchmarks? — (posed, unanswered)
- Where does training data come from? — (posed, unanswered)

---

相关链接（未剪藏）：docs.typesafe.ai（API 文档）、evals.typesafe.ai（workflow evals 详情）、typesafe.ai/manifesto。
第三方机制分析（已读，未剪藏）：explainx.ai "How Does Jev Actually Work? RLCD and the System One Mechanism"（2026-09-16）——结论：速度/价格的机制解释成立（小输出空间单次前向）；架构未公开；准确率与校准度主张仅依赖内部评测。
