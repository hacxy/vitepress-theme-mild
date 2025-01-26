---
sidebar:
  icon: meteor-icons:hexagon
  order: 9
---

# 代码分组图标

主题默认集成了 [vitepress-plugin-group-icons](https://github.com/yuyinws/vitepress-plugin-group-icons), 你可以在markdwon中像这样使用代码组:

````md
::: code-group

```sh [npm]
npm install vitepress-plugin-group-icons
```

```sh [yarn]
yarn add vitepress-plugin-group-icons
```

```sh [pnpm]
pnpm add vitepress-plugin-group-icons
```

```sh [bun]
bun add vitepress-plugin-group-icons
```

:::
````

它最终将表现为:
::: code-group

```sh [npm]
npm install vitepress-plugin-group-icons
```

```sh [yarn]
yarn add vitepress-plugin-group-icons
```

```sh [pnpm]
pnpm add vitepress-plugin-group-icons
```

```sh [bun]
bun add vitepress-plugin-group-icons
```

:::

该扩展将为代码组展示对应的图标.
