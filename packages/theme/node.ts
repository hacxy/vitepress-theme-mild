import type { DefaultTheme, RawConfigExports } from 'vitepress';
import { fileURLToPath } from 'node:url';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import { NOT_ARTICLE_LAYOUTS } from './src/constants';
import { groupIconMdPlugin } from './src/utils/node/group-icons/markdown';
import { groupIconVitePlugin } from './src/utils/node/group-icons/vite';
import { imgToImage, insertDocsHeaderInfo } from './src/utils/node/markdown';

const baseConfig: RawConfigExports<DefaultTheme.Config> = {
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
export default baseConfig;
