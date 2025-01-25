// .vitepress/config.ts
import { defineConfigWithTheme } from "file:///Users/hacxy/Projects/vitepress-theme-mild/node_modules/.pnpm/vitepress@1.6.1_@algolia+client-search@5.18.0_@types+node@20.14.9_async-validator@4.2.5_light_32gskswphm2krivmguvncrv3kq/node_modules/vitepress/dist/node/index.js";
import baseConfig from "file:///Users/hacxy/Projects/vitepress-theme-mild/packages/theme/config/index.js";

// ../theme/package.json
var package_default = {
  name: "vitepress-theme-mild",
  type: "module",
  version: "0.6.0",
  description: "A VitePress theme with rich capabilities.",
  author: {
    name: "Hacxy",
    email: "hacxy.js@outlook.com"
  },
  license: "MIT",
  homepage: "https://github.com/hacxy/vitepress-theme-mild",
  bugs: {
    url: "https://github.com/hacxy/vitepress-theme-mild/issues"
  },
  keywords: [
    "vitepress",
    "vitepress-theme"
  ],
  module: "./index.js",
  types: "./types/index.d.ts",
  files: [
    "config",
    "index.ts",
    "src",
    "types"
  ],
  scripts: {
    dev: "tsup --watch",
    build: "tsup",
    lint: "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:staged": "eslint --fix",
    release: "node scripts/release.js",
    prepublishOnly: "npm run build",
    changelog: "conventional-changelog -p angular -i ../docs/CHANGELOG.md -s"
  },
  dependencies: {
    "@css-render/vue3-ssr": "^0.15.14",
    "@giscus/vue": "^3.1.1",
    "@iconify/vue": "^4.3.0",
    "@nanostores/vue": "^0.11.0",
    "@shikijs/vitepress-twoslash": "^1.24.3",
    "@vueuse/core": "^12.0.0",
    "@vueuse/motion": "^2.2.6",
    "directory-tree": "^3.5.2",
    "fs-extra": "^11.2.0",
    "gray-matter": "^4.0.3",
    "naive-ui": "^2.40.4",
    nanostores: "^0.11.3",
    nprogress: "^0.2.0",
    "reading-time-estimator": "^1.11.0",
    sass: "^1.78.0",
    "simple-git": "^3.27.0",
    tinyglobby: "^0.2.10",
    "typed.js": "^2.1.0",
    "vitepress-plugin-group-icons": "^1.3.2",
    "vitepress-plugin-rss": "^0.3.0",
    vue: "^3.4.21",
    "vue-easy-lightbox": "^1.19.0"
  },
  devDependencies: {
    "@types/fs-extra": "^11.0.4",
    "@types/markdown-it": "^14.1.2",
    "@types/node": "^20.14.9",
    "@types/nprogress": "^0.2.3",
    bumpp: "^9.9.1",
    tsup: "8.3.5",
    typescript: "^5.3.3",
    vitepress: "^1.6.1"
  }
};

// .vitepress/config.ts
var config_default = defineConfigWithTheme({
  title: "VitePress Mild Theme",
  description: "\u7B80\u7EA6\u98CE\u683C\u7684\u535A\u5BA2\u4E3B\u9898",
  extends: baseConfig,
  lang: "zh",
  appearance: "dark",
  themeConfig: {
    comment: {
      repo: "hacxy/vitepress-theme-mild",
      repoId: "R_kgDOLdAvmA",
      category: "Announcements",
      categoryId: "DIC_kwDOLdAvmM4Cl3ba",
      mapping: "title",
      strict: "1",
      reactionsEnabled: "1",
      inputPosition: "bottom",
      lang: "zh-CN",
      darkTheme: "catppuccin_macchiato",
      lightTheme: "catppuccin_latte"
    },
    progressBar: {
      speed: 200
    },
    rss: {
      title: "Hacxy",
      baseUrl: "https://theme.hacxy.cn",
      copyright: "Copyright (c) 2024-present, Hacxy"
    },
    logo: "/logo.png",
    search: {
      provider: "local",
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: "\u641C\u7D22\u4E00\u4E0B"
          }
        }
      }
    },
    nav: [
      {
        text: "\u6307\u5357",
        link: "/guide/intro/",
        activeMatch: "/guide/"
      },
      {
        text: "\u53C2\u8003",
        link: "/config/"
      },
      {
        text: `v${package_default.version}`,
        items: [
          {
            text: "\u66F4\u65B0\u65E5\u5FD7",
            link: "CHANGELOG.md"
          }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/hacxy/vitepress-theme-mild" }
    ],
    sidebar: {
      "/guide/": "auto",
      "/config/": "auto"
    },
    footer: {
      message: "MIT Licensed",
      copyright: 'Copyright \xA9 2024-Present <a href="https://github.com/hacxy">Hacxy</a>'
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcudHMiLCAiLi4vdGhlbWUvcGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2hhY3h5L1Byb2plY3RzL3ZpdGVwcmVzcy10aGVtZS1taWxkL3BhY2thZ2VzL2RvY3MvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2hhY3h5L1Byb2plY3RzL3ZpdGVwcmVzcy10aGVtZS1taWxkL3BhY2thZ2VzL2RvY3MvLnZpdGVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2hhY3h5L1Byb2plY3RzL3ZpdGVwcmVzcy10aGVtZS1taWxkL3BhY2thZ2VzL2RvY3MvLnZpdGVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgdHlwZSB7IFRoZW1lQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzLXRoZW1lLW1pbGQnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnV2l0aFRoZW1lIH0gZnJvbSAndml0ZXByZXNzJztcbmltcG9ydCBiYXNlQ29uZmlnIGZyb20gJ3ZpdGVwcmVzcy10aGVtZS1taWxkL2NvbmZpZyc7XG5pbXBvcnQgcGtnIGZyb20gJy4uLy4uL3RoZW1lL3BhY2thZ2UuanNvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZ1dpdGhUaGVtZTxUaGVtZUNvbmZpZz4oe1xuICB0aXRsZTogJ1ZpdGVQcmVzcyBNaWxkIFRoZW1lJyxcbiAgZGVzY3JpcHRpb246ICdcdTdCODBcdTdFQTZcdTk4Q0VcdTY4M0NcdTc2ODRcdTUzNUFcdTVCQTJcdTRFM0JcdTk4OTgnLFxuICBleHRlbmRzOiBiYXNlQ29uZmlnLFxuICBsYW5nOiAnemgnLFxuICBhcHBlYXJhbmNlOiAnZGFyaycsXG4gIHRoZW1lQ29uZmlnOiB7XG4gICAgY29tbWVudDoge1xuICAgICAgcmVwbzogJ2hhY3h5L3ZpdGVwcmVzcy10aGVtZS1taWxkJyxcbiAgICAgIHJlcG9JZDogJ1Jfa2dET0xkQXZtQScsXG4gICAgICBjYXRlZ29yeTogJ0Fubm91bmNlbWVudHMnLFxuICAgICAgY2F0ZWdvcnlJZDogJ0RJQ19rd0RPTGRBdm1NNENsM2JhJyxcbiAgICAgIG1hcHBpbmc6ICd0aXRsZScsXG4gICAgICBzdHJpY3Q6ICcxJyxcbiAgICAgIHJlYWN0aW9uc0VuYWJsZWQ6ICcxJyxcbiAgICAgIGlucHV0UG9zaXRpb246ICdib3R0b20nLFxuICAgICAgbGFuZzogJ3poLUNOJyxcbiAgICAgIGRhcmtUaGVtZTogJ2NhdHBwdWNjaW5fbWFjY2hpYXRvJyxcbiAgICAgIGxpZ2h0VGhlbWU6ICdjYXRwcHVjY2luX2xhdHRlJ1xuICAgIH0sXG4gICAgcHJvZ3Jlc3NCYXI6IHtcbiAgICAgIHNwZWVkOiAyMDBcbiAgICB9LFxuICAgIHJzczoge1xuICAgICAgdGl0bGU6ICdIYWN4eScsXG4gICAgICBiYXNlVXJsOiAnaHR0cHM6Ly90aGVtZS5oYWN4eS5jbicsXG4gICAgICBjb3B5cmlnaHQ6ICdDb3B5cmlnaHQgKGMpIDIwMjQtcHJlc2VudCwgSGFjeHknXG4gICAgfSxcbiAgICBsb2dvOiAnL2xvZ28ucG5nJyxcbiAgICBzZWFyY2g6IHtcbiAgICAgIHByb3ZpZGVyOiAnbG9jYWwnLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBkZXRhaWxlZFZpZXc6IHRydWUsXG4gICAgICAgIHRyYW5zbGF0aW9uczoge1xuICAgICAgICAgIGJ1dHRvbjoge1xuICAgICAgICAgICAgYnV0dG9uVGV4dDogJ1x1NjQxQ1x1N0QyMlx1NEUwMFx1NEUwQidcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIG5hdjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnXHU2MzA3XHU1MzU3JyxcbiAgICAgICAgbGluazogJy9ndWlkZS9pbnRyby8nLFxuICAgICAgICBhY3RpdmVNYXRjaDogJy9ndWlkZS8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnXHU1M0MyXHU4MDAzJyxcbiAgICAgICAgbGluazogJy9jb25maWcvJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IGB2JHtwa2cudmVyc2lvbn1gLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdcdTY2RjRcdTY1QjBcdTY1RTVcdTVGRDcnLFxuICAgICAgICAgICAgbGluazogJ0NIQU5HRUxPRy5tZCdcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdLFxuICAgIHNvY2lhbExpbmtzOiBbXG4gICAgICB7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2hhY3h5L3ZpdGVwcmVzcy10aGVtZS1taWxkJyB9XG4gICAgXSxcbiAgICBzaWRlYmFyOiB7XG4gICAgICAnL2d1aWRlLyc6ICdhdXRvJyxcbiAgICAgICcvY29uZmlnLyc6ICdhdXRvJyxcbiAgICB9LFxuICAgIGZvb3Rlcjoge1xuICAgICAgbWVzc2FnZTogJ01JVCBMaWNlbnNlZCcsXG4gICAgICBjb3B5cmlnaHQ6XG4gICAgICAgICdDb3B5cmlnaHQgXHUwMEE5IDIwMjQtUHJlc2VudCA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2hhY3h5XCI+SGFjeHk8L2E+JyxcbiAgICB9LFxuICB9LFxufSk7XG4iLCAie1xuICBcIm5hbWVcIjogXCJ2aXRlcHJlc3MtdGhlbWUtbWlsZFwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC42LjBcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkEgVml0ZVByZXNzIHRoZW1lIHdpdGggcmljaCBjYXBhYmlsaXRpZXMuXCIsXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJIYWN4eVwiLFxuICAgIFwiZW1haWxcIjogXCJoYWN4eS5qc0BvdXRsb29rLmNvbVwiXG4gIH0sXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2hhY3h5L3ZpdGVwcmVzcy10aGVtZS1taWxkXCIsXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vaGFjeHkvdml0ZXByZXNzLXRoZW1lLW1pbGQvaXNzdWVzXCJcbiAgfSxcbiAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgXCJ2aXRlcHJlc3NcIixcbiAgICBcInZpdGVwcmVzcy10aGVtZVwiXG4gIF0sXG4gIFwibW9kdWxlXCI6IFwiLi9pbmRleC5qc1wiLFxuICBcInR5cGVzXCI6IFwiLi90eXBlcy9pbmRleC5kLnRzXCIsXG4gIFwiZmlsZXNcIjogW1xuICAgIFwiY29uZmlnXCIsXG4gICAgXCJpbmRleC50c1wiLFxuICAgIFwic3JjXCIsXG4gICAgXCJ0eXBlc1wiXG4gIF0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ0c3VwIC0td2F0Y2hcIixcbiAgICBcImJ1aWxkXCI6IFwidHN1cFwiLFxuICAgIFwibGludFwiOiBcImVzbGludCAuXCIsXG4gICAgXCJsaW50OmZpeFwiOiBcImVzbGludCAuIC0tZml4XCIsXG4gICAgXCJsaW50OnN0YWdlZFwiOiBcImVzbGludCAtLWZpeFwiLFxuICAgIFwicmVsZWFzZVwiOiBcIm5vZGUgc2NyaXB0cy9yZWxlYXNlLmpzXCIsXG4gICAgXCJwcmVwdWJsaXNoT25seVwiOiBcIm5wbSBydW4gYnVpbGRcIixcbiAgICBcImNoYW5nZWxvZ1wiOiBcImNvbnZlbnRpb25hbC1jaGFuZ2Vsb2cgLXAgYW5ndWxhciAtaSAuLi9kb2NzL0NIQU5HRUxPRy5tZCAtc1wiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjc3MtcmVuZGVyL3Z1ZTMtc3NyXCI6IFwiXjAuMTUuMTRcIixcbiAgICBcIkBnaXNjdXMvdnVlXCI6IFwiXjMuMS4xXCIsXG4gICAgXCJAaWNvbmlmeS92dWVcIjogXCJeNC4zLjBcIixcbiAgICBcIkBuYW5vc3RvcmVzL3Z1ZVwiOiBcIl4wLjExLjBcIixcbiAgICBcIkBzaGlraWpzL3ZpdGVwcmVzcy10d29zbGFzaFwiOiBcIl4xLjI0LjNcIixcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMi4wLjBcIixcbiAgICBcIkB2dWV1c2UvbW90aW9uXCI6IFwiXjIuMi42XCIsXG4gICAgXCJkaXJlY3RvcnktdHJlZVwiOiBcIl4zLjUuMlwiLFxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMi4wXCIsXG4gICAgXCJncmF5LW1hdHRlclwiOiBcIl40LjAuM1wiLFxuICAgIFwibmFpdmUtdWlcIjogXCJeMi40MC40XCIsXG4gICAgXCJuYW5vc3RvcmVzXCI6IFwiXjAuMTEuM1wiLFxuICAgIFwibnByb2dyZXNzXCI6IFwiXjAuMi4wXCIsXG4gICAgXCJyZWFkaW5nLXRpbWUtZXN0aW1hdG9yXCI6IFwiXjEuMTEuMFwiLFxuICAgIFwic2Fzc1wiOiBcIl4xLjc4LjBcIixcbiAgICBcInNpbXBsZS1naXRcIjogXCJeMy4yNy4wXCIsXG4gICAgXCJ0aW55Z2xvYmJ5XCI6IFwiXjAuMi4xMFwiLFxuICAgIFwidHlwZWQuanNcIjogXCJeMi4xLjBcIixcbiAgICBcInZpdGVwcmVzcy1wbHVnaW4tZ3JvdXAtaWNvbnNcIjogXCJeMS4zLjJcIixcbiAgICBcInZpdGVwcmVzcy1wbHVnaW4tcnNzXCI6IFwiXjAuMy4wXCIsXG4gICAgXCJ2dWVcIjogXCJeMy40LjIxXCIsXG4gICAgXCJ2dWUtZWFzeS1saWdodGJveFwiOiBcIl4xLjE5LjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAdHlwZXMvZnMtZXh0cmFcIjogXCJeMTEuMC40XCIsXG4gICAgXCJAdHlwZXMvbWFya2Rvd24taXRcIjogXCJeMTQuMS4yXCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMC4xNC45XCIsXG4gICAgXCJAdHlwZXMvbnByb2dyZXNzXCI6IFwiXjAuMi4zXCIsXG4gICAgXCJidW1wcFwiOiBcIl45LjkuMVwiLFxuICAgIFwidHN1cFwiOiBcIjguMy41XCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMy4zXCIsXG4gICAgXCJ2aXRlcHJlc3NcIjogXCJeMS42LjFcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyw2QkFBNkI7QUFDdEMsT0FBTyxnQkFBZ0I7OztBQ0Z2QjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsYUFBZTtBQUFBLEVBQ2YsUUFBVTtBQUFBLElBQ1IsTUFBUTtBQUFBLElBQ1IsT0FBUztBQUFBLEVBQ1g7QUFBQSxFQUNBLFNBQVc7QUFBQSxFQUNYLFVBQVk7QUFBQSxFQUNaLE1BQVE7QUFBQSxJQUNOLEtBQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxVQUFZO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFVO0FBQUEsRUFDVixPQUFTO0FBQUEsRUFDVCxPQUFTO0FBQUEsSUFDUDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULEtBQU87QUFBQSxJQUNQLE9BQVM7QUFBQSxJQUNULE1BQVE7QUFBQSxJQUNSLFlBQVk7QUFBQSxJQUNaLGVBQWU7QUFBQSxJQUNmLFNBQVc7QUFBQSxJQUNYLGdCQUFrQjtBQUFBLElBQ2xCLFdBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2Qsd0JBQXdCO0FBQUEsSUFDeEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsbUJBQW1CO0FBQUEsSUFDbkIsK0JBQStCO0FBQUEsSUFDL0IsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsa0JBQWtCO0FBQUEsSUFDbEIsWUFBWTtBQUFBLElBQ1osZUFBZTtBQUFBLElBQ2YsWUFBWTtBQUFBLElBQ1osWUFBYztBQUFBLElBQ2QsV0FBYTtBQUFBLElBQ2IsMEJBQTBCO0FBQUEsSUFDMUIsTUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsWUFBYztBQUFBLElBQ2QsWUFBWTtBQUFBLElBQ1osZ0NBQWdDO0FBQUEsSUFDaEMsd0JBQXdCO0FBQUEsSUFDeEIsS0FBTztBQUFBLElBQ1AscUJBQXFCO0FBQUEsRUFDdkI7QUFBQSxFQUNBLGlCQUFtQjtBQUFBLElBQ2pCLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLGVBQWU7QUFBQSxJQUNmLG9CQUFvQjtBQUFBLElBQ3BCLE9BQVM7QUFBQSxJQUNULE1BQVE7QUFBQSxJQUNSLFlBQWM7QUFBQSxJQUNkLFdBQWE7QUFBQSxFQUNmO0FBQ0Y7OztBRGpFQSxJQUFPLGlCQUFRLHNCQUFtQztBQUFBLEVBQ2hELE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLFNBQVM7QUFBQSxFQUNULE1BQU07QUFBQSxFQUNOLFlBQVk7QUFBQSxFQUNaLGFBQWE7QUFBQSxJQUNYLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFlBQVk7QUFBQSxNQUNaLFNBQVM7QUFBQSxNQUNULFFBQVE7QUFBQSxNQUNSLGtCQUFrQjtBQUFBLE1BQ2xCLGVBQWU7QUFBQSxNQUNmLE1BQU07QUFBQSxNQUNOLFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxJQUNkO0FBQUEsSUFDQSxhQUFhO0FBQUEsTUFDWCxPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxRQUNQLGNBQWM7QUFBQSxRQUNkLGNBQWM7QUFBQSxVQUNaLFFBQVE7QUFBQSxZQUNOLFlBQVk7QUFBQSxVQUNkO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU0sSUFBSSxnQkFBSSxPQUFPO0FBQUEsUUFDckIsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxhQUFhO0FBQUEsTUFDWCxFQUFFLE1BQU0sVUFBVSxNQUFNLGdEQUFnRDtBQUFBLElBQzFFO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxXQUFXO0FBQUEsTUFDWCxZQUFZO0FBQUEsSUFDZDtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FDRTtBQUFBLElBQ0o7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
