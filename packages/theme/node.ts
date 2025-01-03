import type { VitePressPluginTwoslashOptions } from '@shikijs/vitepress-twoslash';
import type { DefaultTheme, RawConfigExports } from 'vitepress';
import { fileURLToPath } from 'node:url';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import { NOT_ARTICLE_LAYOUTS } from './src/constants';
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
    if (NOT_ARTICLE_LAYOUTS.includes(pageData.frontmatter.layout)) {
      pageData.frontmatter.sidebar = false;
    }
  },
  vite: {
    ssr: {
      noExternal: ['naive-ui']
    },
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL('../src/components/NavBar.vue', import.meta.url)
          )
        },
      ]
    },
    plugins: [
      groupIconVitePlugin(),
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
