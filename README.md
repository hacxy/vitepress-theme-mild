<p align="center">
<img width="240" style="text-align:center;" src="https://raw.githubusercontent.com/hacxy/hacxy/main/images/simple-icons_vitepress%20(1).png"/>
</p>

<h1 align="center">
vitepress-theme-mild
</h1>

<h4 align="center">
A feature-rich VitePress theme for blogs and documentation
</h4>

<p align="center">
 English | <a href=''/>简体中文</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vuepress-theme-plume" target="_blank">
   <img alt="NPM Version" src="https://img.shields.io/npm/v/vitepress-theme-mild?color=32A9C3&labelColor=1B3C4A&label=npm">
  </a>
</p>

- 📦 Ready to use, based on the default theme, with simple configuration and compatibility with default theme configuration

- 📃 Rich layouts, suitable for personal blogs and technical documentation sites

- 📖 Image preview, article comments, video playback, and other capabilities are easier to use in markdown

- 🔥 More flexible automatic sidebar, automatically generates sidebar and article list based on the catalog, supports hot updates

[Documentation](https://theme.hacxy.cn)

## Why Develop This Theme

[The Original Intention of Developing vitepress-theme-mild](https://hacxy.cn/docs/posts/dev-vitepress-theme/)

## Quick Start

### Create using scaffolding tool:

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

### Start and run

```sh

npm run dev

```

The development service should run on http://localhost:5173. Access the URL in the browser to view the running status of the new site!

## About Automatic Sidebar

### Usage

Enhanced on the basis of the default theme, now you only need to define an object, with the key as the path and the value as a fixed value: `auto`, to enable the automatic sidebar.

```js
export default {
  themeConfig: {
    sidebar: {
      // When the user is located in the `guide` directory, this sidebar will be displayed, and the sidebar data will be automatically scanned from the <root>/guide/ directory
      '/guide/': 'auto',
      // When the user is located in the `config` directory, this sidebar will be displayed, and the sidebar data will be automatically scanned from the <root>/config/ directory
      '/config/': 'auto'
    }
  }
};

```

The default theme's sidebar is already sufficient to cover various application scenarios, but it does not support automatic generation of sidebar structure based on directory structure. Although it can be assisted by [community plugins](https://github.com/hacxy/awesome-vitepress?tab=readme-ov-file#community-plugins), the plugins also have shortcomings and cannot meet all my needs:

- Firstly, the data structure, the file directory structure itself is a tree structure, so when scanning the entire directory, it should cover all subdirectories and retain these structures to output the final `sidebar` structure.

- Support for single sidebar, as well as multiple sidebars

- Can control sidebar content and behavior through frontmatter

- Flexible sorting, can sort groups, as well as individual files under each group

- Simple configuration, compatible with the original sidebar configuration rules

- Hot update, when adding or removing `md` files, it can generate the latest sidebar structure and render it to the page, which will greatly improve the document development experience.

- Performance, try not to sacrifice too many resource usage, the hot update process during document writing is smooth and fast.

To meet the above needs, I spent a lot of time rewriting some components and combined them with build-time data loading, and the final effect has reached my expectations. Now the sidebar configuration is more flexible and intelligent, and it is one of my favorite features at present.

More details can be found in: [Automatic Sidebar](https://theme.hacxy.cn/guide/support/sidebar.html)

## Changelog

[CHANGELOG](./packages/docs/CHANGELOG.md)

## License

[MIT](./LICENSE) License &copy; 2024-PRESENT [Hacxy](https://github.com/hacxy)
