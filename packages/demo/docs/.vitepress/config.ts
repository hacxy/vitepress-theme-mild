import { defineConfig } from "vitepress";
import { defineThemeConfig } from 'vitepress-theme-mild/config'

export default defineConfig({
  title: "Hacxy",
  description: "A hacxy blog",
  extends: defineThemeConfig(),
  lastUpdated: true,
  themeConfig: {
    // logo: "logo.png",
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 4],
      label: "目录",
    },
    sidebar: {},
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/hacxy",
      },
    ],

    footer: {
      copyright:
        'MIT Licensed | Copyright © 2023-Present <a href="https://github.com/hacxy">Hacxy</a>',
      // recordFiling: {
      //   message: "鄂ICP备2021019656号",
      //   link: "https://beian.miit.gov.cn",
      // },
    },
  },
});
