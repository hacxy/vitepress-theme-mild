import { defineConfig } from 'vitepress';
import { defineThemeConfig } from 'vitepress-theme-mild/config';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Mild Theme',
  description: '简约风格的博客主题',
  extends: defineThemeConfig(),
  lang: 'zh',
  themeConfig: {
    search: {
      provider: 'local',
      options: {
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
    ]
  }
});
