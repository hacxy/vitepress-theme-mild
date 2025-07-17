import type { ThemeConfig } from 'vitepress-theme-mild';
import { defineConfigWithTheme } from 'vitepress';
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
    project: {
      list: [
        {
          title: 'AI Chat Assistant',
          description: '基于大语言模型的智能聊天助手，支持多轮对话和上下文理解',
          stars: 1234,
          forks: 89,
          language: 'TypeScript',
          repoUrl: 'https://github.com/username/ai-chat-assistant',
          lastUpdated: '2024-01-15',
          tags: ['AI', 'Next.js', 'OpenAI', 'Tailwind CSS'],
        },
        {
          title: 'React Component Library',
          description: '现代化的React组件库，包含丰富的UI组件和完整的设计系统',
          stars: 856,
          forks: 124,
          language: 'JavaScript',
          repoUrl: 'https://github.com/username/react-ui-lib',
          lastUpdated: '2024-01-12',
          tags: ['React', 'Storybook', 'CSS-in-JS', 'TypeScript'],
        },
        {
          title: 'Mobile Weather App',
          description: '跨平台天气应用，提供实时天气信息和7天预报功能',
          stars: 567,
          forks: 45,
          language: 'Dart',
          repoUrl: 'https://github.com/username/weather-app',
          lastUpdated: '2024-01-10',
          tags: ['Flutter', 'Weather API', 'Mobile', 'Cross-platform'],
        },
        {
          title: 'Database Migration Tool',
          description: '数据库迁移和版本控制工具，支持多种数据库类型',
          stars: 432,
          forks: 67,
          language: 'Go',
          repoUrl: 'https://github.com/username/db-migration-tool',
          lastUpdated: '2024-01-08',
          tags: ['Go', 'Database', 'CLI', 'Migration'],
        },
        {
          title: 'Performance Monitor',
          description: '网站性能监控工具，实时追踪页面加载速度和用户体验指标',
          stars: 789,
          forks: 98,
          language: 'Python',
          repoUrl: 'https://github.com/username/perf-monitor',
          lastUpdated: '2024-01-05',
          tags: ['Python', 'Monitoring', 'Analytics', 'FastAPI'],
        },
        {
          title: 'Code Snippet Manager',
          description: '代码片段管理工具，支持语法高亮、标签分类和快速搜索',
          stars: 345,
          forks: 23,
          language: 'Vue',
          repoUrl: 'https://github.com/username/snippet-manager',
          lastUpdated: '2024-01-03',
          tags: ['Vue.js', 'Electron', 'CodeMirror', 'SQLite'],
        },
      ]
    }
  }
});
