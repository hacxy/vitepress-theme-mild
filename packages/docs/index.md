---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: VitePress Theme Mild
  text: 能力丰富的 VitePress 主题
  tagline: 基于默认主题, 适用于博客和文档
  image:
    src: /logo.png
    alt: VitePress
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/intro/
    - theme: alt
      text: 参考配置
      link: /guide/intro/quick-start
features:
  - icon: 📦
    title: 开箱即用
    details: 基于默认主题, 配置简单且兼容默认主题配置
  - icon: 🌈
    title: 更多布局
    details: 丰富的布局, 适用于个人博客和技术文档站
  - icon: 📖
    title: 文档能力
    details: 图片预览, 文章评论, 视频播放等能力在markdown中变得更简单
  - icon: ✨
    title: 提升效率
    details: 根据目录自动生成侧边栏和文章列表, 支持热更新
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
