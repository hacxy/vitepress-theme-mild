import type { VitePressPluginTwoslashOptions } from '@shikijs/vitepress-twoslash';
import type { DefaultTheme, RawConfigExports } from 'vitepress';
import { fileURLToPath } from 'node:url';
import { vitePluginForArco } from '@arco-plugins/vite-vue';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import { generateSidebar } from 'vitepress-sidebar';

export interface ThemeConfig {
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
export function defineThemeConfig(config: ThemeConfig = {}): RawConfigExports<ThemeConfig & DefaultTheme.Config> {
  const { twoslash, progressBar = true } = config;
  const codeTransformers = [];
  if (twoslash !== false) {
    codeTransformers.push(transformerTwoslash(twoslash));
  }
  return {
    markdown: {
      codeTransformers
    },
    transformPageData(pageData) {
      // blog页无论如何都关闭sidebar
      if (pageData.frontmatter.layout === 'blog') {
        pageData.frontmatter.sidebar = false;
      }
    },
    themeConfig: {
      progressBar,
      sidebar: generateSidebar({
        documentRootPath: 'docs'
      })

    },
    vite: {
      resolve: {
        alias: [
          {
            find: /^.*\/VPSidebar\.vue$/,
            replacement: fileURLToPath(
              new URL('../src/components/Sidebar.vue', import.meta.url)
            )
          }
        ]
      },
      plugins: [
        vitePluginForArco({
          style: 'css'
        }),
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
    },
  };
}
