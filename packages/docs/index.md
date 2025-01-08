---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
features:
  - icon: 📦
    title: 开箱即用
    details: 开箱即用, 扩展默认主题配置创造更多可能
  - icon: 🌈
    title: 博客布局
    details: 提供简约风格的博客布局, 文章列表实时热更新
  - icon: 📖
    title: 文档能力
    details: 更丰富的markdown能力, 例如图片预览
  - icon: ✨
    title: 提升效率
    details: 提供自动扫描文件目录生成侧边栏选项, 状态实时热更新
hero:
  name: VitePress Theme Mild
  text: 使用简单且能力丰富的 VitePress 主题
  tagline: 基于默认主题并扩展增强能力
  image:
    src: /logo.png
    alt: VitePress
  actions:
    - theme: brand
      text: 介绍
      link: /guide/intro/
    - theme: brand
      text: 快速开始
      link: /guide/intro/quick-start
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
