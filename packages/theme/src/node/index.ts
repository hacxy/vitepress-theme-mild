import type { Plugin, RawConfigExports, SiteConfig } from 'vitepress';
import type { ThemeConfig } from '../../types';
import { fileURLToPath } from 'node:url';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import { RssPlugin } from 'vitepress-plugin-rss';
import { NOT_ARTICLE_LAYOUTS } from '../shared/constants';
import { imgToImage, insertDocsHeaderInfo } from './plugins/markdown';

function rss(): Plugin {
  let resolveConfig: any;
  return {
    name: 'vitepress-plugin-rss',
    enforce: 'pre',
    configResolved(config: any) {
      if (resolveConfig) {
        return;
      }
      resolveConfig = config;
      // 拿到用户的主题配置, 手动调用hook
      const VPConfig: SiteConfig = config.vitepress;
      if (VPConfig.site?.themeConfig?.rss) {
        return RssPlugin(VPConfig.site.themeConfig.rss).configResolved(config);
      }
    }
  };
}

const baseConfig: RawConfigExports<ThemeConfig> = {
  markdown: {
    config(md) {
      md.use(imgToImage);
      md.use(insertDocsHeaderInfo);
      md.use(groupIconMdPlugin);
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
      rss() as any,
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
