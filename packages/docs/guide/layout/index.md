---
group:
  sort: 2
  text: 布局
  icon: meteor-icons:layout
sidebar:
  icon: meteor-icons:grid
---

# 概述

`Mild Theme` 提供了额外的布局, 用于搭建博客或搭建技术文档站, 不同的布局用于展示不同的内容.

## 默认主题布局:

- `doc`: 默认布局, 它将整个 Markdown 内容设置为“documentation”外观。它的工作原理是将整个内容包装在 css `vp-doc` 类中，并将样式应用于它下面的元素。

- `page` 布局, page 被视为“空白页”。Markdown 仍然会被解析，所有的 Markdown 扩展 都和 doc 布局一样运行，但它没有任何默认样式。

- `home` 布局, 将生成模板化的“主页”。在此布局中，可以设置额外的选项，例如 hero 和 features 以进一步自定义内容。请访问[默认主题](https://vitepress.dev/zh/reference/default-theme-home-page): 主页了解更多详情。

## 博客布局

- `blog` 布局, 将生成模板化的博客页, 在此布局中, 可以查看由所有文章组成的文章列表, 文章数据取自于`<root>`下所有的`.md`文件, 默认情况下每一页展示5篇文章.

  ![](https://hacxy-1259720482.cos.ap-hongkong.myqcloud.com/images/Kapture%202025-01-13%20at%2014.43.57.gif)

## 标签页布局

- `tag` 布局, 将生成模板化的标签页, 在此布局中, 可以查看文章所使用到的所有标签, 可以根据标签来筛选文章.
