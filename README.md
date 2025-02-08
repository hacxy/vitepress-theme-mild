<p align="center">
  <img width="240" style="text-align:center;" src="https://raw.githubusercontent.com/hacxy/hacxy/main/images/simple-icons_vitepress%20(1).png"/>
</p>

<h1 align="center">
 vitepress-theme-mild
</h1>

<h4 align="center">
能力丰富的 VitePress 主题, 适用于博客和文档
</h4>

[![test](https://github.com/hacxy/vitepress-theme-mild/workflows/Test/badge.svg?color=8187ff&labelColor=1b1b1f)](https://github.com/hacxy/vitepress-theme-mild/actions)
[![npm](https://img.shields.io/npm/v/vitepress-theme-mild?color=8187ff&labelColor=1b1b1f&label=npm)](https://www.npmjs.com/package/vitepress-theme-mild)
[![downloads](https://img.shields.io/npm/dm/vitepress-theme-mild?color=8187ff&labelColor=1b1b1f&label=downloads)](https://www.npmjs.com/package/vitepress-theme-mild)

- 📦 开箱即用, 基于默认主题, 配置简单且兼容默认主题配置
- 📃 丰富的布局, 适用于个人博客和技术文档站
- 📖 图片预览, 文章评论, 视频播放等能力在 markdown 中使用变得更简单
- 🔥 更灵活的自动侧边栏, 根据目录自动生成侧边栏和文章列表, 支持热更新

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

### 启动并运行

```sh
npm run dev
```

开发服务应该会运行在 http://localhost:5173 上。在浏览器中访问 URL 以查看新站点的运行情况吧！

## 关于自动侧边栏

### 使用

在默认主题的基础上做了进一步提升, 现在只需要定义一个对象, key 为路径, value 为固定值: `auto`, 即可开启自动侧边栏.

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

## License

[MIT](./LICENSE) License &copy; 2024-PRESENT [Hacxy](https://github.com/hacxy)
