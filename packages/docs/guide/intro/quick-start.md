---
sidebar:
  sort: 1
---

# 快速开始

## 安装

### 前置准备

- Nodejs 18及以上版本
- 通过命令行界面 (CLI) 访问 VitePress 的终端。
- 支持 Markdown 语法的编辑器。
  - 推荐 VSCode 及其官方 Vue 扩展。

`vitepress-theme-mild`可以单独创建, 也可以在现有的vitepress项目中使用

### 安装向导

通过包管理工具可以运行以下命令来启动安装向导

::: code-group

```sh [npm]
npm create mild-theme@latest
```

```sh [yarn]
yarn create mild-theme
```

```sh [pnpm]
pnpm create mild-theme@latest
```

```sh [bun]
bun create mild-theme
```

:::

![](https://hacxy-1259720482.cos.ap-hongkong.myqcloud.com/images/Kapture%202024-12-31%20at%2011.58.09.gif)

## 在现有vitepress项目中安装

在现有的vitepress项目中使用也同样非常简单, 这只需要三步即可完成

### 第一步

安装主题

```sh
npm install vitepress-theme-mild --save-dev
```

### 第二步

在`.vitepress/theme/index.ts`中导出`MildTheme`

```ts [.vitepress/theme/index.ts]
import MildTheme from 'vitepress-theme-mild';

export default MildTheme;
```

### 第三步

在`.vitepress/config.ts`中扩展配置

```ts [.vitepress/config.ts]
import type { ThemeConfig } from 'vitepress-theme-mild';
import { defineConfigWithTheme } from 'vitepress';
import baseConfig from 'vitepress-theme-mild/config';

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  themeConfig: {
    // 类型为 `ThemeConfig`
  },
});

```
