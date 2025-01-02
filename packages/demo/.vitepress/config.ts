import type { ThemeConfig } from 'vitepress-theme-mild/config';
import { defineConfigWithTheme } from 'vitepress';
import { themeConfig } from 'vitepress-theme-mild/config';

export default defineConfigWithTheme<ThemeConfig>({
  title: 'Hacxy\'s blog',
  description: 'A VitePress Site',
  extends: themeConfig,
  themeConfig: {
    logo: '/cat-typing.gif',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tags', link: '/pages/tags' }
    ],
    sidebar: {
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
