import type { ThemeConfig } from 'vitepress-theme-mild';
import { defineConfigWithTheme } from 'vitepress';
import baseConfig from 'vitepress-theme-mild/config';
import pkg from '../../package.json';

export default defineConfigWithTheme<ThemeConfig>({
  title: 'VitePress Mild Theme',
  description: '简约风格的博客主题',
  extends: baseConfig,
  lang: 'zh',
  appearance: 'dark',
  themeConfig: {
    comment: {
      repo: 'hacxy/vitepress-theme-mild',
      repoId: 'R_kgDOLdAvmA',
      category: 'Announcements',
      categoryId: 'DIC_kwDOLdAvmM4Cl3ba',
      mapping: 'title',
      strict: '1',
      reactionsEnabled: '1',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      darkTheme: 'catppuccin_macchiato',
      lightTheme: 'catppuccin_latte'
    },
    progressBar: {
      speed: 200
    },

    rss: {
      title: 'Hacxy',
      baseUrl: 'https://theme.hacxy.cn',
      copyright: 'Copyright (c) 2024-present, Hacxy'
    },
    logo: '/logo.png',
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: '搜索一下'
          }
        }
      }
    },
    nav: [
      {
        text: '指南',
        link: '/guide/intro/',
        activeMatch: '/guide/'
      },
      {
        text: '参考',
        link: '/config/',
      },
      {
        text: `v${pkg.version}`,
        items: [
          {
            text: '更新日志',
            link: 'https://github.com/hacxy/vitepress-theme-mild/releases'
          }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hacxy/vitepress-theme-mild' }
    ],
    sidebar: {
      '/guide/': 'auto',
      '/config/': 'auto',
    },
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2024-Present <a href="https://github.com/hacxy">Hacxy</a>',
    },
  },
});
