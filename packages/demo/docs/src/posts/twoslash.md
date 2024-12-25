---
title: vitepress中typescript代码片段hover提示类型
tags:
  - vitepress
---

# vitepress 中 typescript 代码片段 hover 提示类型

## 效果展示:

![](https://raw.githubusercontent.com/hacxy/hacxy/main/images/Kapture%202024-12-19%20at%2019.57.54.gif)

## 步骤:

安装 `@shikijs/vitepress-twoslash`:

```sh
npm i -D @shikijs/vitepress-twoslash
```

在你的 `.vitepress/config.ts`:

```ts
// .vitepress/config.ts
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { defineConfig } from "vitepress";

export default defineConfig({
  markdown: {
    codeTransformers: [transformerTwoslash()],
  },
});
```

在 `.vitepress/theme/index.ts`:

```ts
// .vitepress/theme/index.ts
import type { EnhanceAppContext } from "vitepress";
import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";
import Theme from "vitepress/theme";

import "@shikijs/vitepress-twoslash/style.css";

export default {
  extends: Theme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue);
  },
};
```

现在可以在你的 Markdown 文件中使用 ts twoslash 来启用漂亮的类型悬停效果:

````md
```ts twoslash
console.log("hello");
//      ^?
```
````

示例:

```ts twoslash
console.log("hello");
```
