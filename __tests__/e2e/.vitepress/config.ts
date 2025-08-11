import type { ThemeConfig } from 'vitepress-theme-mild';
import { defineConfigWithTheme } from 'vitepress';
import { pagefindPlugin } from 'vitepress-plugin-pagefind';
import baseConfig from 'vitepress-theme-mild/config';

export default defineConfigWithTheme<ThemeConfig>({
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  extends: baseConfig,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/projects' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: {
      '/posts/category/': 'auto'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    projects: {
      list: [{ title: '2048-cli-game', description: '2048 game for terminal.', repoUrl: 'https://github.com/hacxy/2048-cli-game', stars: 1, tags: [], forks: 0, language: 'TypeScript', lastUpdated: '2025-07-15 21:39:12' }, { title: 'cli-unbuild-template', description: 'CLI application development template using unbuild as a build tool.', repoUrl: 'https://github.com/hacxy/cli-unbuild-template', stars: 4, tags: ['cli', 'cli-template', 'nodejs', 'ts-cli-template', 'typescript'], forks: 0, language: 'JavaScript', lastUpdated: '2025-03-31 12:35:59' }, { title: 'create-hacxy-app', description: 'This is a demo of a nodejs scaffolding project.', repoUrl: 'https://github.com/hacxy/create-hacxy-app', stars: 1, tags: [], forks: 1, language: 'JavaScript', lastUpdated: '2025-04-22 15:39:39' }, { title: 'create-ts-frame', description: 'This is a scaffolding tool used to quickly create starter project templates with Typescript as the main development language. Templates include but are not limited to web applications, mini programs, CLI command line tools, and more.', repoUrl: 'https://github.com/hacxy/create-ts-frame', stars: 4, tags: ['cli', 'create', 'create-typescript-project', 'typescript-cli', 'typescript-template'], forks: 1, language: 'TypeScript', lastUpdated: '2024-12-16 13:50:51' }, { title: 'json2ts', description: 'Json to typescript types', repoUrl: 'https://github.com/hacxy/json2ts', stars: 1, tags: [], forks: 0, language: 'TypeScript', lastUpdated: '2024-11-01 17:28:17' }, { title: 'json2typebox', description: 'Creating TypeBox code from Json Data', repoUrl: 'https://github.com/hacxy/json2typebox', stars: 6, tags: ['json2typebox', 'typebox', 'typescript'], forks: 0, language: 'TypeScript', lastUpdated: '2024-11-05 00:34:18' }, { title: 'json2typebox-cli', description: 'Convert JSON data into TypeBox types using a command-line tool.', repoUrl: 'https://github.com/hacxy/json2typebox-cli', stars: 4, tags: ['cli', 'json2typebox', 'typebox', 'typescript'], forks: 0, language: 'JavaScript', lastUpdated: '2024-11-06 18:06:33' }, { title: 'l2d', description: '在浏览器中加载Live2D模型更简单', repoUrl: 'https://github.com/hacxy/l2d', stars: 20, tags: ['live2d', 'live2d-web'], forks: 2, language: 'TypeScript', lastUpdated: '2025-07-16 17:29:31' }]
    }
  },
  vite: {
    plugins: [
      pagefindPlugin()
    ]
  }
});
