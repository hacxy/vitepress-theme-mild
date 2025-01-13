# 评论

`Mild Theme` 使用 [giscus](https://giscus.app/zh-CN) 评论系统, 用于让阅读者能够对文章进行评论.

## 先决条件

1. 文档仓库存在于github, 并且是公开的
2. [giscus app](https://github.com/apps/giscus) 已安装，否则访客将无法评论和回应。
3. Discussions [功能已在你的仓库中启用](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/enabling-or-disabling-github-discussions-for-a-repository)。
4. 按照 [giscus](https://giscus.app/zh-CN) 的配置指引进行自定义配置, 并记住最终生成的配置代码. 例如, 我的博客最终生成的配置为:

```html
<script
  src="https://giscus.app/client.js"
  data-repo="hacxy/hacxy.cn"
  data-repo-id="R_kgDONKDzuw"
  data-category="Announcements"
  data-category-id="DIC_kwDONKDzu84Cj_Jz"
  data-mapping="title"
  data-strict="1"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="zh-CN"
  crossorigin="anonymous"
  async
></script>
```

## 开启评论

为主题开启文章评论功能, 你只需要在 `themeConfig`中加入`comment`选项, 并按照最终生成的代码添加到对应的配置中:

```ts
import type { ThemeConfig } from 'vitepress-theme-mild';
import { defineConfigWithTheme } from 'vitepress';
import baseConfig from 'vitepress-theme-mild/config';

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
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
      darkTheme: 'catppuccin_macchiato', // 夜间主题
      lightTheme: 'catppuccin_latte' // 浅色主题
    },
  },
});

```

唯一有区别的在于主题: `theme` 这个选项, 我将它区分为了两种情况下分别展示不同颜色的主题:

- `darkTheme` 当处于夜间主题时, 将以此主题进行显示
- `lightTheme` 当处于浅色主题时, 将以此主题进行显示

效果如下:

![](https://hacxy-1259720482.cos.ap-hongkong.myqcloud.com/images/Kapture%202025-01-13%20at%2012.04.28.gif)
