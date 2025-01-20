---
sidebar:
  sort: 1
---

# 自动侧边栏

## 背景

默认主题的侧边栏已经足够覆盖各种应用场景, 但唯独不支持自动根据目录结构生成侧边栏结构, 虽然可以借助[社区的插件](https://github.com/hacxy/awesome-vitepress?tab=readme-ov-file#community-plugins), 但插件也存在短板, 不满足我所有的需求:

- 首先是数据结构, 文件目录结构本身是树形结构, 那么在扫描整个目录时, 应该需要覆盖到所有子目录, 并保留这些结构输出最终的 `sidebar` 结构.
- 支持单侧边栏, 同时也支持多侧边栏
- 当frontmatter 的sidebar 属性为false时, 可以隐藏某一个markdwon文件, 或一整个文件夹
- 排序, 可以对分组进行排序, 也可以对每一组下的单个文件进行排序
- 配置简单, 兼容原sidebar配置规则, 并扩展frontmatter
- 热更新, 新增或移除`md`文件时, 能够生成最新的sidebar结构将极大的提升文档开发体验.
- 性能, 尽量不牺牲太多资源占用, 保证文档开发过程是流畅的

为了满足上述需求, 我花费了大量时间重写了部分组件, 并结合构建时数据加载, 最终效果达到了我的预期, 现在侧边栏的配置是更灵活的, 更智能的, 也是我目前最喜欢的功能之一.

## 使用

自动侧边栏基于[默认主题的侧边栏](https://vitepress.dev/zh/reference/default-theme-sidebar)实现, 可以自动扫描某一个路径下所有`md`文件, 并结合实际目录结构组成一颗路径树, 例如: 希望在文档中创建单独的侧边栏，例如“指南”页面和“配置参考”页面。

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

## 侧边栏分组

自动侧边栏在自动生成时会分为"有分组"和"无分组"两种情况.

### 无分组

所有项目同级, 不存在父子关系

- 如果某个目录下的所有文章都不需要分组, 则不应该存在子目录, 并且根目录下也不应该存在`index.md`文件, 也就是说此时你的目录结构应该为:

**_目录结构:_**

```md
    .
    └─ config/
      ├─ three.md
      ├─ four.md
      └─ five.md
```

**_配置:_**

```js{5}
export default {
  themeConfig: {
    sidebar: {
      // 当用户位于 `config` 目录时，会显示此侧边栏
      '/config/': 'auto'
      // ...Other sidebar
    }
  }
};
```

**_实际效果:_**

![](https://hacxy-1259720482.cos.ap-hongkong.myqcloud.com/images/202501201140529.png)

:::tip
默认情况下, 会以文件名作为侧边栏项的文本标签.

:::
你可以通过一级标题或者使用 [`frontmatter` 配置](#frontmatter) 的 `sidebar` 属性来自定义这个标签的内容和排序, 现在 `sidebar` 属性支持更多配置项:

```md
---
sidebar:
  text: 快速开始
---
```

### 有分组

存在一个或多个父子关系

- 如果某个目录下需要对侧边栏进行分组, 则在当前目录中可以存在子文件夹, 并且可以通过`index.md`来定义父级样式

#### 单个分组:

**_目录结构:_**

```md
    .
    └─ guide/
      ├─ index.md
      ├─ one.md
      └─ two.md
```

**_配置:_**

```js{5}
export default {
  themeConfig: {
    sidebar: {
      // 当用户位于 `config` 目录时，会显示此侧边栏
      '/guide/': 'auto'
      // ...Other sidebar
    }
  }
};
```

**_实际效果:_**

![](https://hacxy-1259720482.cos.ap-hongkong.myqcloud.com/images/202501201403958.png)

#### 多个分组

**_目录结构:_**

**_配置:_**

**_实际效果:_**

## Frontmatter

### 示例

```md
---
sidebar:
  text: 概述
  sort: 1
---
```

- `text`:
  - 定义侧边栏文本标签的内容
- `sort`:
  - 定义侧边栏的顺序, 数字越小越靠前. `index.md` 文件不受该属性影响, 将始终保持在最顶部.
