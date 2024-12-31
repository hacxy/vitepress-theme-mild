# 快速开始

## 在线尝试

可以直接在 StackBlitz 上进行在线尝试。

## 本地安装

### 前置准备

- Nodejs 18及以上版本
- 通过命令行界面 (CLI) 访问 VitePress 的终端。
- 支持 Markdown 语法的编辑器。
  - 推荐 VSCode 及其官方 Vue 扩展。

`vitepress-theme-mild`可以单独创建, 也可以在现有的vitepress项目中使用

### 使用包管理工具单独创建

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

### 在现有的vitepress项目中安装

在现有vitepress中, 你只需要三步即可使用本主题的完整内容

- 第一步: 安装主题

```sh
npm install vitepress-theme-mild@latest -D
```

- 第二步: 导入主题并聚合配置

  - 在 `.vitepress` 文件夹中新建 `theme/index.ts` (注意文件后缀名取决于你的项目) 导入主题:

    ```ts
    // .vitepress/theme/config.ts
    import MildTheme from 'vitepress-theme-mild';
    export default MildTheme;
    ```

  - 在 `config.ts` 中聚合配置:
    ```ts
    // .vitepress/config.ts
    import { defineConfig } from 'vitepress';
    import { defineThemeConfig } from 'vitepress-theme-mild/config';
    export default defineConfig({
      // ...other config
      extends: defineThemeConfig(),
    });
    ```

- 第三步: 修改 `index.md` 中 layout 的值为: `blog` :

```md
---
layout: blog
---
```

当`layout`为`blog` 时, 将采用主题提供的布局渲染文章列表:

![](https://hacxy-1259720482.cos.ap-hongkong.myqcloud.com/images/202412311523732.png)
