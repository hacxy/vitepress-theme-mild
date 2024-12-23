// docs/.vitepress/config.ts
import { defineConfig } from "file:///Users/hacxy/Projects/vitepress-theme-hacxy/node_modules/.pnpm/vitepress@1.5.0_@algolia+client-search@5.18.0_@types+node@20.14.9_async-validator@4.2.5_postc_s6a55mnce2vj4g6zgez4az56tu/node_modules/vitepress/dist/node/index.js";
import { defineThemeConfig } from "file:///Users/hacxy/Projects/vitepress-theme-hacxy/packages/theme/dist/index.js";
var config_default = defineConfig({
  title: "Hacxy",
  description: "A hacxy blog",
  extends: defineThemeConfig(),
  lastUpdated: true,
  themeConfig: {
    // logo: "logo.png",
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 4],
      label: "\u76EE\u5F55"
    },
    sidebar: {},
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/hacxy"
      }
    ],
    footer: {
      copyright: 'MIT Licensed | Copyright \xA9 2023-Present <a href="https://github.com/hacxy">Hacxy</a>'
      // recordFiling: {
      //   message: "鄂ICP备2021019656号",
      //   link: "https://beian.miit.gov.cn",
      // },
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9oYWN4eS9Qcm9qZWN0cy92aXRlcHJlc3MtdGhlbWUtaGFjeHkvcGFja2FnZXMvZGVtby9kb2NzLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9oYWN4eS9Qcm9qZWN0cy92aXRlcHJlc3MtdGhlbWUtaGFjeHkvcGFja2FnZXMvZGVtby9kb2NzLy52aXRlcHJlc3MvY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9oYWN4eS9Qcm9qZWN0cy92aXRlcHJlc3MtdGhlbWUtaGFjeHkvcGFja2FnZXMvZGVtby9kb2NzLy52aXRlcHJlc3MvY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVwcmVzc1wiO1xuaW1wb3J0IHsgZGVmaW5lVGhlbWVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MtdGhlbWUtbWlsZC9jb25maWcnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHRpdGxlOiBcIkhhY3h5XCIsXG4gIGRlc2NyaXB0aW9uOiBcIkEgaGFjeHkgYmxvZ1wiLFxuICBleHRlbmRzOiBkZWZpbmVUaGVtZUNvbmZpZygpLFxuICBsYXN0VXBkYXRlZDogdHJ1ZSxcbiAgdGhlbWVDb25maWc6IHtcbiAgICAvLyBsb2dvOiBcImxvZ28ucG5nXCIsXG4gICAgLy8gXHU1QzU1XHU3OTNBIDIsMyBcdTdFQTdcdTY4MDdcdTk4OThcdTU3MjhcdTc2RUVcdTVGNTVcdTRFMkRcbiAgICBvdXRsaW5lOiB7XG4gICAgICBsZXZlbDogWzIsIDRdLFxuICAgICAgbGFiZWw6IFwiXHU3NkVFXHU1RjU1XCIsXG4gICAgfSxcbiAgICBzaWRlYmFyOiB7fSxcbiAgICBzb2NpYWxMaW5rczogW1xuICAgICAge1xuICAgICAgICBpY29uOiBcImdpdGh1YlwiLFxuICAgICAgICBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9oYWN4eVwiLFxuICAgICAgfSxcbiAgICBdLFxuXG4gICAgZm9vdGVyOiB7XG4gICAgICBjb3B5cmlnaHQ6XG4gICAgICAgICdNSVQgTGljZW5zZWQgfCBDb3B5cmlnaHQgXHUwMEE5IDIwMjMtUHJlc2VudCA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2hhY3h5XCI+SGFjeHk8L2E+JyxcbiAgICAgIC8vIHJlY29yZEZpbGluZzoge1xuICAgICAgLy8gICBtZXNzYWdlOiBcIlx1OTEwMklDUFx1NTkwNzIwMjEwMTk2NTZcdTUzRjdcIixcbiAgICAgIC8vICAgbGluazogXCJodHRwczovL2JlaWFuLm1paXQuZ292LmNuXCIsXG4gICAgICAvLyB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVksU0FBUyxvQkFBb0I7QUFDaGEsU0FBUyx5QkFBeUI7QUFFbEMsSUFBTyxpQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsU0FBUyxrQkFBa0I7QUFBQSxFQUMzQixhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUE7QUFBQTtBQUFBLElBR1gsU0FBUztBQUFBLE1BQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUFBLE1BQ1osT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLFNBQVMsQ0FBQztBQUFBLElBQ1YsYUFBYTtBQUFBLE1BQ1g7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ04sV0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLSjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
