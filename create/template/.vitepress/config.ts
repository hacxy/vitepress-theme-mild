import type { ThemeConfig } from 'vitepress-theme-mild';
import { defineConfigWithTheme } from 'vitepress';
import baseConfig from 'vitepress-theme-mild/config';

export default defineConfigWithTheme<ThemeConfig>({
  title: 'Mild Theme',
  description: '简约风格的博客主题',
  extends: baseConfig,
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
    nav: [
      { text: '主页', link: '/' },
      { text: '标签', link: '/pages/tags' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hacxy/vitepress-theme-mild' }
    ],
    footer: {
      copyright:
        'MIT Licensed | Copyright © 2024-Present <a href="https://github.com/hacxy">Hacxy</a>',
    },
  }
});
