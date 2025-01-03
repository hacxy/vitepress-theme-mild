import type { ThemeConfig } from 'vitepress-theme-mild/config';
import { defineConfigWithTheme } from 'vitepress';
import { themeConfig } from 'vitepress-theme-mild/config';
// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  title: 'VitePress Mild Theme',
  description: '简约风格的博客主题',
  extends: themeConfig,
  lang: 'zh',
  appearance: 'dark',
  themeConfig: {
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
    nav: [],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hacxy/vitepress-theme-mild' }
    ],
    outline: [
      2, 4
    ],
    sidebar: {
      '/guide/': 'auto'
    },
    footer: {
      message: 'MIT Licensed',
      copyright:
        'Copyright © 2024-Present <a href="https://github.com/hacxy">Hacxy</a>',
    },
  }
});
