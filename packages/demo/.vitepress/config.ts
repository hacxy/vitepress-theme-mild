import type { ThemeConfig } from 'vitepress-theme-mild';
import { defineConfigWithTheme } from 'vitepress';
import baseConfig from 'vitepress-theme-mild/config';

export default defineConfigWithTheme<ThemeConfig>({
  title: 'Hacxy\'s blog',
  description: 'A VitePress Site',
  extends: baseConfig,
  themeConfig: {
    logo: '/cat-typing.gif',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tags', link: '/pages/tagsasd' }
    ],
    sidebar: {
      '/posts/orange/': 'auto',
      '/posts/': 'auto'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hacxy/vitepress-theme-mild' }
    ],
    footer: {
      message: 'MIT Licensed',
      copyright:
        'Copyright © 2024-Present <a href="https://github.com/hacxy">Hacxy</a>',
    },
  }
});
