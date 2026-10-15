import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "LLM Paper Wiki",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "zh-CN",
    // TODO: 部署前替换为实际域名，例如 "<username>.github.io" 或自定义域名
    baseUrl: "remote-controlled-man.github.io/llm-paper-wiki",
    ignorePatterns: ["private", "templates", ".obsidian", ".trash", "arch", "AGENTS.md", "00_Guide.md"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Serif SC",
        body: "Noto Sans SC",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#FAF9F5",
          lightgray: "#E4E1D8",
          gray: "#9A958A",
          darkgray: "#5A564D",
          dark: "#22262B",
          secondary: "#AE3A2C",
          tertiary: "#8A6D5F",
          highlight: "rgba(174, 58, 44, 0.07)",
          textHighlight: "#F3E9D2",
        },
        darkMode: {
          light: "#1B1D20",
          lightgray: "#33363B",
          gray: "#6E6A61",
          darkgray: "#B9B5AA",
          dark: "#E6E4DD",
          secondary: "#D4604E",
          tertiary: "#9C7B6B",
          highlight: "rgba(212, 96, 78, 0.10)",
          textHighlight: "#4A3A26",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // 生成社交分享图会显著增加构建时间，需要时可取消注释
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
