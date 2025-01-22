<p align="center">
  <img width="240" style="text-align:center;" src="https://raw.githubusercontent.com/hacxy/hacxy/main/images/simple-icons_vitepress%20(1).png"/>
</p>

<h1 align="center">
 vitepress-theme-mild
</h1>

<h4 align="center">
具有丰富能力的 VitePress 主题
</h4>

![NPM Version](https://img.shields.io/npm/v/vitepress-theme-mild)

- 📦 基于默认主题, 开箱即用
- 📃 提供简约风格的博客布局, 文章列表实时热更新
- 📖 更丰富的markdown能力, 如图片预览
- 🔥 更灵活的自动侧边栏, 根据目录结构自动生成侧边栏

[查阅文档](https://theme.hacxy.cn)

## 为什么开发这个主题

[开发vitepress-theme-mild的初衷](https://hacxy.cn/docs/posts/dev-vitepress-theme/)

## 快速开始

### 使用脚手架工具创建:

```sh
# Use npm
npm create mild-theme@latest

# Use pnpm
pnpm create mild-theme@latest

# Use yarn
yarn create mild-theme

# Use bun
bun create mild-theme
```

## 关于自动侧边栏

### 使用

在默认主题的基础上做了进一步提升, 现在只需要定义一个对象, key 为路径, value 为固定值: `auto`, 即可开启自动侧边栏 🚀.

```js
export default {
  themeConfig: {
    sidebar: {
      // 当用户位于 `guide` 目录时，会显示此侧边栏, 侧边栏数据自动扫描<root>/guide/目录
      '/guide/': 'auto',
      // 当用户位于 `config` 目录时，会显示此侧边栏, 侧边栏数据自动扫描<root>/config/目录
      '/config/': 'auto'
    }
  }
};
```

默认主题的侧边栏已经足够覆盖各种应用场景, 但唯独不支持自动根据目录结构生成侧边栏结构, 虽然可以借助[社区的插件](https://github.com/hacxy/awesome-vitepress?tab=readme-ov-file#community-plugins), 但插件也存在短板, 无法满足我所有的需求:

- 首先是数据结构, 文件目录结构本身是树形结构, 那么在扫描整个目录时, 应该需要覆盖到所有子目录, 并保留这些结构输出最终的 `sidebar` 结构.
- 支持单侧边栏, 同时也支持多侧边栏
- 可以通过 frontmatter 控制侧边栏内容和行为
- 灵活排序, 可以对分组进行排序, 也可以对每一组下的单个文件进行排序
- 配置简单, 兼容原sidebar配置规则
- 热更新方面, 新增或移除`md`文件时, 能够生成最新的sidebar结构并渲染到页面, 这将极大的提升文档开发体验.
- 性能方面, 尽量不牺牲太多资源占用, 编写文档时的热更新过程是流畅的、快速的.

为了满足上述需求, 我花费了大量时间重写了部分组件, 并结合构建时数据加载, 最终效果达到了我的预期, 现在侧边栏的配置是更灵活的, 更智能的, 也是我目前最喜欢的功能之一.

更多细节请参考: [自动侧边栏](https://theme.hacxy.cn/guide/support/sidebar.html)

## Changelog

[CHANGELOG](./packages/docs/CHANGELOG.md)

## License

[MIT](./LICENSE) License &copy; 2024-PRESENT [Hacxy](https://github.com/hacxy)
