import type { VitePressPluginTwoslashOptions } from '@shikijs/vitepress-twoslash';
import type { DefaultTheme, RawConfigExports } from 'vitepress';
import { fileURLToPath } from 'node:url';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import { imgToImage, insertDocsHeaderInfo } from './src/utils/node/markdown';

export interface SidebarAutoMulti {
  [path: string]: 'auto'
}
export interface ThemeConfig extends Omit<DefaultTheme.Config, 'sidebar'> {
  sidebar?: DefaultTheme.Sidebar | SidebarAutoMulti
  /**
   * Is the progress bar enabled
   * @default true
   */
  progressBar?: boolean

  /**
   * Typescript Twoslash
   * @default true
   */
  twoslash?: false | VitePressPluginTwoslashOptions
}

export const themeConfig: RawConfigExports<DefaultTheme.Config> = {
  markdown: {
    config(md) {
      md.use(imgToImage);
      md.use(insertDocsHeaderInfo);
      md.use(groupIconMdPlugin);
    },
    codeTransformers: [transformerTwoslash()]
  },
  transformPageData(pageData) {
    // blog页无论如何都关闭sidebar
    if (pageData.frontmatter.layout === 'blog') {
      pageData.frontmatter.sidebar = false;
    }
  },
  // themeConfig: {
  //   progressBar,
  // },
  vite: {
    ssr: {
      noExternal: ['naive-ui']
    },
    resolve: {
      alias: [
        // {
        //   find: /^.*\/VPSidebar\.vue$/,
        //   replacement: fileURLToPath(
        //     new URL('../src/components/Sidebar.vue', import.meta.url)
        //   )
        // },
        // {
        //   find: /^.*\/VPContent\.vue$/,
        //   replacement: fileURLToPath(
        //     new URL('../src/components/Content.vue', import.meta.url)
        //   )
        // },
        // {
        //   find: /^.*\/VPFooter\.vue$/,
        //   replacement: fileURLToPath(
        //     new URL('../src/components/Footer.vue', import.meta.url)
        //   )
        // },
        // {
        //   find: /^.*\/VPLocalNav\.vue$/,
        //   replacement: fileURLToPath(
        //     new URL('../src/components/LocalNav.vue', import.meta.url)
        //   )
        // },
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL('../src/components/NavBar.vue', import.meta.url)
          )
        },
        // {
        //   find: /^.*\/VPNavBarTitle\.vue$/,
        //   replacement: fileURLToPath(
        //     new URL('../src/components/NavBarTitle.vue', import.meta.url)
        //   )
        // }
      ]
    },
    plugins: [
      groupIconVitePlugin(),
      // {
      //   name: 'change-sidebar',
      //   config(cfg: any) {
      //     const siteConfig: SiteConfig = cfg.vitepress;
      //     siteConfig.site.themeConfig.mildSidebar = siteConfig.site.themeConfig.sidebar;
      //     siteConfig.site.themeConfig.sidebar = null;
      //   }
      // }
    ],
    build: {
      chunkSizeWarningLimit: 2000
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  }
};
// export function defineThemeConfig(config: ThemeConfig = {}) {
//   // const { twoslash, progressBar = true } = config;
//   // const codeTransformers = [];
//   // if (twoslash !== false) {
//   //   codeTransformers.push(transformerTwoslash(twoslash));
//   // }
//   return {
//     markdown: {
//       config(md) {
//         md.use(imgToImage);
//         md.use(insertDocsHeaderInfo);
//         md.use(groupIconMdPlugin);
//       },
//       codeTransformers: [transformerTwoslash()]
//     },
//     transformPageData(pageData) {
//       // blog页无论如何都关闭sidebar
//       if (pageData.frontmatter.layout === 'blog') {
//         pageData.frontmatter.sidebar = false;
//       }
//     },
//     themeConfig: {
//       progressBar,
//     },
//     vite: {
//       ssr: {
//         noExternal: ['naive-ui']
//       },
//       resolve: {
//         alias: [
//           {
//             find: /^.*\/VPSidebar\.vue$/,
//             replacement: fileURLToPath(
//               new URL('../src/components/Sidebar.vue', import.meta.url)
//             )
//           },
//           {
//             find: /^.*\/VPContent\.vue$/,
//             replacement: fileURLToPath(
//               new URL('../src/components/Content.vue', import.meta.url)
//             )
//           },
//           {
//             find: /^.*\/VPFooter\.vue$/,
//             replacement: fileURLToPath(
//               new URL('../src/components/Footer.vue', import.meta.url)
//             )
//           },
//           {
//             find: /^.*\/VPLocalNav\.vue$/,
//             replacement: fileURLToPath(
//               new URL('../src/components/LocalNav.vue', import.meta.url)
//             )
//           },
//           {
//             find: /^.*\/VPNavBar\.vue$/,
//             replacement: fileURLToPath(
//               new URL('../src/components/NavBar.vue', import.meta.url)
//             )
//           }
//         ]
//       },
//       plugins: [
//         groupIconVitePlugin(),
//         {
//           name: 'change-sidebar',
//           config(cfg: any) {
//             const siteConfig: SiteConfig = cfg.vitepress;
//             siteConfig.site.themeConfig.mildSidebar = siteConfig.site.themeConfig.sidebar;
//             siteConfig.site.themeConfig.sidebar = null;
//           }
//         }
//       ],
//       build: {
//         chunkSizeWarningLimit: 2000
//       },
//       css: {
//         preprocessorOptions: {
//           scss: {
//             api: 'modern',
//           },
//         },
//       },
//     },
//   } as RawConfigExports<DefaultTheme.Config>;
// }
