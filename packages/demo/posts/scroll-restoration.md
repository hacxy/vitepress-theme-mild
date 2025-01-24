---
date: 2025-01-24
---

# 浏览器滚动恢复属性

## 背景

最近在开发 vitepress 主题, 发现一个从来没有注意到的问题, 就是每次刷新页面时网页都会回到上一次滚动条的位置, 并且这个过程是不流畅的, 存在一个较长的时间间隔:

![](https://hacxy-1259720482.cos.ap-hongkong.myqcloud.com/images/Kapture%25202025-01-22%2520at%252010.11.28.gif)

## 问题

我的主题需要一个逐行显示的动画效果, 如果每次刷新页面都回到之前的滚动位置, 那么就会存在动画效果还没有播放完毕时, 页面就会回到上一次的位置, 导致页面会出现一段时间的空白:

![](https://hacxy-1259720482.cos.ap-hongkong.myqcloud.com/images/Kapture%25202025-01-22%2520at%252010.08.28.gif)

为此我还向 VitePress 提了一个: [issue](https://github.com/vuejs/vitepress/issues/4506).

## 解决方案

在这个 Issue 得到回复前, 我意外的把这个问题给解决了

一开始我以为是 `VitePress` 故意为之, 直到我找到了这个属性: [History.scrollRestoration](https://developer.mozilla.org/zh-CN/docs/Web/API/History/scrollRestoration#auto)

这个属性默认情况下为`auto` 也就是刷新会自动回到上次滚动条的位置, 如果想关闭它, 则只需要:

```ts
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
```

之后无论页面在哪个位置刷新都会回到最顶部. 完美解决 😎

至于效果嘛, 本页面就是最好的例子.
