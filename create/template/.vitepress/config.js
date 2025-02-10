/** @type {import('vitepress').UserConfigExport<import('vitepress-theme-mild').ThemeConfig>} */
export default {
  title: 'My Blog',
  description: 'My blog for Mild theme',
  extends: baseConfig,
  lang: 'zh',
  themeConfig: {
    progressBar: {
      speed: 200
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hacxy/vitepress-theme-mild' }
    ],
    sidebar: {
      '/posts/fruit/': 'auto',
      '/posts/category/': 'auto'
    },
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2024-Present <a href="https://github.com/hacxy">Hacxy</a>',
    },
  },
};