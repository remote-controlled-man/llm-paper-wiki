import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/remote-controlled-man/llm-paper-wiki",
    },
  }),
}

// 读者视角的导航排序与命名：知识组织层在前、论文笔记在后
const readerExplorer = Component.Explorer({
  folderDefaultState: "collapsed",
  sortFn: (a, b) => {
    if (a.isFolder && !b.isFolder) return -1
    if (!a.isFolder && b.isFolder) return 1
    const topOrder = ["wiki", "raw"]
    const ia = topOrder.indexOf(a.slugSegment)
    const ib = topOrder.indexOf(b.slugSegment)
    if (ia !== -1 || ib !== -1) {
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    }
    return a.displayName.localeCompare(b.displayName, "zh-CN", { numeric: true })
  },
  mapFn: (node) => {
    const names = {
      wiki: "知识组织层",
      raw: "论文笔记",
      areas: "研究方向",
      concepts: "概念",
      entities: "实体",
      synthesis: "综述",
      queries: "问答",
    } as Record<string, string>
    if (node.isFolder && names[node.slugSegment]) {
      node.displayName = names[node.slugSegment]
    }
  },
})

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    readerExplorer,
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    readerExplorer,
  ],
  right: [],
}
