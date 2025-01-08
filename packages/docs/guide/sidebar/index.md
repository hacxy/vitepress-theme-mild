---
sidebar:
  title: 侧边栏
  order: 8
---

# 概述

`Mild Theme` 基于默认主题扩展了一项非常实用的能力, 它由默认主题提供的 [sidebar 配置](https://vitepress.dev/zh/reference/default-theme-sidebar) 所 "进化" 而来, 保留了原有的配置规则, 并提供了一个自动扫描文件路径生成侧边栏的选项.

## 自动侧边栏

自动侧边栏基于多侧边栏实现, 可以根据不同的页面路径来显示不同的侧边栏, 例如: 希望在文档中创建单独的侧边栏，例如“指南”页面和“配置参考”页面。

为此，首先将你的页面组织到每个所需部分的目录中：

```
.
├─ guide/
│  ├─ index.md
│  ├─ one.md
│  └─ two.md
└─ config/
   ├─ index.md
   ├─ three.md
   └─ four.md
```

然后，更新配置以定义每个部分的侧边栏。你可以使用默认的方式传递一个对象, 对象的key必须是从vitepress根路径开始的绝对文件路径, 它必须以`/`做结尾, 这点和默认主题的sidebar多侧边栏配置相同, 不同的是对象的值, 除了可以传递一个数组之外, 还可以使用`"auto"`,这意味着主题会扫描这个路径下所有的`.md`文件, 并自动生成侧边栏.

```js
export default {
  themeConfig: {
    sidebar: {
      // 当用户位于 `guide` 目录时，会显示此侧边栏
      '/guide/': 'auto',
      // 当用户位于 `config` 目录时，会显示此侧边栏
      '/config/': 'auto'
    }
  }
};
```
