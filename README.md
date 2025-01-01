<p align="center">
  <img width="240" style="text-align:center;" src="https://raw.githubusercontent.com/hacxy/hacxy/main/images/simple-icons_vitepress%20(1).png"/>
</p>

<h1 align="center">
 vitepress-theme-mild
</h1>

<h4 align="center">
遵从 Vitepress 本质的简约风格博客主题.
</h4>

![NPM Version](https://img.shields.io/npm/v/vitepress-theme-mild)

- 💡 配置简单, 零帧起手
- 🌈 极致简约的风格
- 📃 自动扫描文章列表, 文件发生变化时同步热更新🔥
- ✨ 根据文章分类自动生成侧边栏分组

## 示例

![](https://raw.githubusercontent.com/hacxy/hacxy/main/images/Kapture%202024-12-26%20at%2015.52.02.gif)

## 计划&进展

- [x] ✅ 文章标签以及标签页
- [x] ✅ 脚手架工具
- [x] ✅ 文章列表默认按照时间倒序排序
- [x] ✅ 文章内容页顶部展示阅读时间、字数等信息
- [x] ✅ 文章列表排序和置顶, 优先级大于默认排序
- [x] ✅ 侧边栏文章的排序
- [x] ✅ 文章内图片预览
- [ ] 🚧 文档站建设
- [ ] 🚧 文章评论
- [ ] ⌛ 开源项目展示页, 展示项目卡片列表
- [ ] ⌛ 文章时间线页面
- [ ] ⌛ 视频播放能力 (youtube, bilibili)
- [ ] ⌛ RSS 订阅
- [ ] ⌛ live2d
- [ ] ⌛ 友情链接页
- [ ] ⌛ AI文章摘要
- [ ] ⌛ AI聊天

## 快速开始

### 在本地创建:

- npm:

```sh
npm create mild-theme@latest
```

- pnpm:

```sh
pnpm create mild-theme@latest
```

- yarn

```sh
yarn create mild-theme
```

- bun

```sh
bun create mild-theme
```

### 在现有项目中使用:

在你的现有项目中, 你只需要三步即可使用本主题的完整内容

- 第一步: 安装

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
article:
   title: Hacxy  # 文章列表顶部标题
   pageSize: 5  # 每页文章的数量
---
```

## 案例

- [hacxy.cn](https://hacxy.cn)

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Hacxy](https://github.com/hacxy)
