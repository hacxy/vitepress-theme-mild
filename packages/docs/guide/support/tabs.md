---
sidebar:
  icon: meteor-icons:table-list
---

# Tabs 面板

内置了插件: [vitepress-plugin-tabs](https://www.npmjs.com/package/vitepress-plugin-tabs)

## 状态不共享

具有非共享选择状态的选项卡

```md
:::tabs
== tab a
a content
== tab b
b content
:::

:::tabs
== tab a
a content 2
== tab b
b content 2
:::
```

:::tabs
== tab a
a content
== tab b
b content
:::

:::tabs
== tab a
a content 2
== tab b
b content 2
:::

## 状态共享

具有共享选择状态的选项卡

```md
:::tabs key:ab
== tab a
a content
== tab b
b content
:::

:::tabs key:ab
== tab a
a content 2
== tab b
b content 2
:::
```

:::tabs key:ab
== tab a
a content
== tab b
b content
:::

:::tabs key:ab
== tab a
a content 2
== tab b
b content 2
:::
