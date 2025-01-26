import type { RawConfigExports } from 'vitepress';
import type { ThemeConfig } from '../../types';
import { fileURLToPath } from 'node:url';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import { NOT_ARTICLE_LAYOUTS } from '../shared/constants';
import { imgToImage } from './markdown/imgToImage';
import { insertDocsHeaderInfo } from './markdown/insertDocsHeaderInfo';
import { rss } from './markdown/rss';
import { taskCheckbox } from './markdown/taskCheckbox';

const baseConfig: RawConfigExports<ThemeConfig> = {
  markdown: {
    config(md) {
      md.use(imgToImage);
      md.use(insertDocsHeaderInfo);
      md.use(groupIconMdPlugin);
      md.use(taskCheckbox);
      md.use(tabsMarkdownPlugin);
    },
    codeTransformers: [transformerTwoslash() as any]
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
            new URL('../src/client/components/NavBar.vue', import.meta.url)
          )
        },
      ]
    },
    plugins: [
      groupIconVitePlugin() as any,
      rss(),
    ],
    build: {
      chunkSizeWarningLimit: 2048
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
