import { defineConfig } from 'vitepress';
import { defineThemeConfig } from 'vitepress-theme-mild/config';

export default defineConfig({
  title: 'Hacxy\'s blog',
  description: 'A VitePress Site',
  extends: defineThemeConfig(),
  themeConfig: {
    logo: '/cat-typing.gif',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tags', link: '/pages/tags' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hacxy/vitepress-theme-mild' }
    ]
  }
});
