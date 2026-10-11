# Paper Reading Workflow

以后精读论文默认按这个流程整理，尤其是 CHI / HCI / agent interaction / robotics 相关论文。

## 1. 文件组织

每篇论文在 `raw/<slug>/` 下保留：

- 原始 PDF（`<slug>.pdf`）
- 一份同名 Markdown 精读笔记（`<slug>.md`）
- `assets/` 目录，只放 Markdown 实际引用的论文截图

中间产物要删除：

- 整页临时截图
- 临时 OCR / text extract 文件
- 没有被 MD 引用的图片

## 2. Markdown 结构

精读 MD 默认包含：

1. metadata: title, venue, DOI, PDF, tags, status
2. 先给结论: 这篇到底解决什么问题，适不适合我们
3. 输入/输出/数据类型/模态: 明确讲清楚系统或论文里的 input/output 是什么
4. 原图/原表: 从论文截关键 figure/table，不自己编图
5. STAR 法则: Situation, Task, Action, Result
6. 和我们机器人 / agent harness / interaction model 的关系
7. 局限和不要误读
8. 下一步精读问题清单
9. 工程 takeaway
10. 更新 `wiki/deep_read_log.md`: 如果这篇已经精读完成，追加一行一句话总结。

## 3. 图片规则

- 优先使用论文原图、原表、原公式截图。
- 只保留 MD 中实际引用的图片。
- 截图文件名要有语义，例如:
  - `fig1_overview.png`
  - `table1_entities_relations.png`
  - `formula_loss.png`
- 如果论文没有公式，要明确写“论文没有传统数学公式/损失函数/优化目标”，不要编公式。

## 4. 判断文章虚实

每篇都要明确判断：

- 它是概念框架、taxonomy、survey，还是可落地系统？
- 有没有真实 schema / API / model input / output？
- 有没有实验指标和结果？
- 有没有可复用到我们 agent/robot harness 的模块？
- 哪些内容只是术语价值，哪些内容有工程价值？

## 5. 对我们最重要的问题

每篇都必须回答：

- 输入是什么？
- 输出是什么？
- 数据类型是什么？
- 模态是什么？
- 模型吃的到底是什么？
- 中间表示是什么？
- 这和 interaction model、机器人感知、长期记忆、多模态交互、长期陪伴有什么关系？

## 6. 精读完成后的回忆索引

精读完成后，更新 `wiki/deep_read_log.md`：

- 只记录真正精读过的论文。
- 一篇论文一行。
- 总结只写一句，重点是以后快速回忆，不写长段复述。
- 如果后来复读有更准的理解，更新原行即可。

## 7. 阅读队列

当用户确定下一批要读的论文后，更新 `wiki/reading_queue.md`：

- 只放明确准备读的论文，不把整个目录自动塞进去。
- 优先链接到论文 Markdown 笔记。
- 读完并完成精读总结后，从队列移除或标记已完成，并写入 `wiki/deep_read_log.md`。
