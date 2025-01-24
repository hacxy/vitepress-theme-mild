// .vitepress/config.ts
import { defineConfigWithTheme } from "file:///Users/hacxy/Projects/vitepress-theme-mild/node_modules/.pnpm/vitepress@1.6.1_@algolia+client-search@5.18.0_@types+node@20.14.9_async-validator@4.2.5_light_32gskswphm2krivmguvncrv3kq/node_modules/vitepress/dist/node/index.js";
import baseConfig from "file:///Users/hacxy/Projects/vitepress-theme-mild/packages/theme/config/index.js";
var config_default = defineConfigWithTheme({
  title: "Hacxy's blog",
  description: "A VitePress Site",
  extends: baseConfig,
  themeConfig: {
    logo: "/cat-typing.gif",
    nav: [
      { text: "Home", link: "/" },
      { text: "Tags", link: "/pages/tagsasd" }
    ],
    sidebar: {
      "/posts/orange/": "auto",
      "/posts/": "auto",
      "/config/": "auto",
      "/guide/": "auto",
      "/guide/apple/": "auto"
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/hacxy/vitepress-theme-mild" }
    ],
    footer: {
      message: "MIT Licensed",
      copyright: 'Copyright \xA9 2024-Present <a href="https://github.com/hacxy">Hacxy</a>'
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaGFjeHkvUHJvamVjdHMvdml0ZXByZXNzLXRoZW1lLW1pbGQvcGFja2FnZXMvZGVtby8udml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvaGFjeHkvUHJvamVjdHMvdml0ZXByZXNzLXRoZW1lLW1pbGQvcGFja2FnZXMvZGVtby8udml0ZXByZXNzL2NvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvaGFjeHkvUHJvamVjdHMvdml0ZXByZXNzLXRoZW1lLW1pbGQvcGFja2FnZXMvZGVtby8udml0ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB0eXBlIHsgVGhlbWVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MtdGhlbWUtbWlsZCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWdXaXRoVGhlbWUgfSBmcm9tICd2aXRlcHJlc3MnO1xuaW1wb3J0IGJhc2VDb25maWcgZnJvbSAndml0ZXByZXNzLXRoZW1lLW1pbGQvY29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnV2l0aFRoZW1lPFRoZW1lQ29uZmlnPih7XG4gIHRpdGxlOiAnSGFjeHlcXCdzIGJsb2cnLFxuICBkZXNjcmlwdGlvbjogJ0EgVml0ZVByZXNzIFNpdGUnLFxuICBleHRlbmRzOiBiYXNlQ29uZmlnLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGxvZ286ICcvY2F0LXR5cGluZy5naWYnLFxuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiAnSG9tZScsIGxpbms6ICcvJyB9LFxuICAgICAgeyB0ZXh0OiAnVGFncycsIGxpbms6ICcvcGFnZXMvdGFnc2FzZCcgfVxuICAgIF0sXG4gICAgc2lkZWJhcjoge1xuICAgICAgJy9wb3N0cy9vcmFuZ2UvJzogJ2F1dG8nLFxuICAgICAgJy9wb3N0cy8nOiAnYXV0bycsXG4gICAgICAnL2NvbmZpZy8nOiAnYXV0bycsXG4gICAgICAnL2d1aWRlLyc6ICdhdXRvJyxcbiAgICAgICcvZ3VpZGUvYXBwbGUvJzogJ2F1dG8nXG4gICAgfSxcbiAgICBzb2NpYWxMaW5rczogW1xuICAgICAgeyBpY29uOiAnZ2l0aHViJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9oYWN4eS92aXRlcHJlc3MtdGhlbWUtbWlsZCcgfVxuICAgIF0sXG4gICAgZm9vdGVyOiB7XG4gICAgICBtZXNzYWdlOiAnTUlUIExpY2Vuc2VkJyxcbiAgICAgIGNvcHlyaWdodDpcbiAgICAgICAgJ0NvcHlyaWdodCBcdTAwQTkgMjAyNC1QcmVzZW50IDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vaGFjeHlcIj5IYWN4eTwvYT4nLFxuICAgIH0sXG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsNkJBQTZCO0FBQ3RDLE9BQU8sZ0JBQWdCO0FBRXZCLElBQU8saUJBQVEsc0JBQW1DO0FBQUEsRUFDaEQsT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsU0FBUztBQUFBLEVBQ1QsYUFBYTtBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsRUFBRSxNQUFNLFFBQVEsTUFBTSxJQUFJO0FBQUEsTUFDMUIsRUFBRSxNQUFNLFFBQVEsTUFBTSxpQkFBaUI7QUFBQSxJQUN6QztBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1Asa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsaUJBQWlCO0FBQUEsSUFDbkI7QUFBQSxJQUNBLGFBQWE7QUFBQSxNQUNYLEVBQUUsTUFBTSxVQUFVLE1BQU0sZ0RBQWdEO0FBQUEsSUFDMUU7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFdBQ0U7QUFBQSxJQUNKO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
