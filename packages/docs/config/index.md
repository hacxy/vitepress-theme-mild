---
sidebar:
  title: 参考
---

# 概述

主题配置可以让你能够自定义主题, 和默认主题一样, 通过将 `themeConfig` 添加到配置文件来进行主题配置, `Mild Theme` 中所支持的配置项都将通过`themeConfig`进行配置, 它基于默认主题配置, 属于默认主题的扩展, 这样做的好处是你不需要在另一个地方单独去配置主题内容, 同时也很好的兼容了国际化:

```js
export default {
  // 主题相关配置
  themeConfig: {
    logo: '/logo.svg',
    // ... Other theme config
  }
};
```

## 主题类型提示

### Javascript 智能提示

当使用javascript语言作为配置文件时, 你可以通过类型注释的方式并将它加入到导出语句的上一行, 假设IDE支持它, 那么在 `javascript` 中会触发智能提示:

```js
/** @type {import('vitepress').UserConfigExport<import('vitepress-theme-mild').ThemeConfig>} */
export default {
  title: 'VitePress Mild Theme',
  description: '简约风格的博客主题',
  extends: baseConfig,
  lang: 'zh',
  appearance: 'dark',
  themeConfig: {
    comment: {
      // ...
    },
    progressBar: {
      // ...
    },
    rss: {
      // ...
    },
  },
};
```

### Typescript 智能提示

当使用`typescript`语言作为配置文件时, 你可以使用辅助函数`defineConfigWithTheme`, 并传入 `Mild Theme` 提供的主题配置类型, 假设IDE支持它, 那么在`typescript`中会触发智能提示:

```ts
import type { ThemeConfig } from 'vitepress-theme-mild';
import { defineConfigWithTheme } from 'vitepress';
import baseConfig from 'vitepress-theme-mild/config';

export default defineConfigWithTheme<ThemeConfig>({
  title: 'VitePress Mild Theme',
  description: '简约风格的博客主题',
  extends: baseConfig,
  lang: 'zh',
  appearance: 'dark',
  themeConfig: {
    comment: {
      // ...
    },
    progressBar: {
      // ...
    },
    rss: {
      // ...
    },
  },
});

```
